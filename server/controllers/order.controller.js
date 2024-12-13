import { BaseResponse } from "../config/BaseResponse.config.js";
import { statusCode } from "../config/statusCode.config.js";
import OrderModel from "../models/order.model.js";
import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";
import { io, userSockets } from "../config/socket.js";
import NotificationModel from "../models/notifycation.model.js";
import StoreModel from "../models/store.models.js";
import mongoose from "mongoose";

const OrderController = {
    async getCustomerOrder(req, res) {
        const { orderId } = req.params;
        const order = await OrderModel.findById(orderId).populate("store").populate({
            path: "products.storeProduct",
            populate: "productId",
        });
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy thông tin đơn hàng thành công", order));
    },

    async getCustomerOrders(req, res) {
        const user = req.user._id;
        const { skip, take, status, date } = req.query;
        const filter = { user, ...(status !== "all" && { status: parseInt(status) }) };

        const [orders, total] = await Promise.all([
            OrderModel.find(filter)
                .populate("store")
                .sort({ createdAt: parseInt(date) || -1 })
                .skip(skip)
                .limit(take || 10),
            OrderModel.countDocuments(filter),
        ]);

        return res.status(statusCode.OK).json(BaseResponse.success("Lấy các đơn hàng thành công", { orders, total }));
    },

    async getCustomerOrdersByStore(req, res) {
        const { skip, take, status, date = -1 } = req.query;
        const filter = { store: req.user.store, ...(status !== "-1" && { status: parseInt(status) }) };
        const sorts = { createdAt: parseInt(date) };
        const [orders, total] = await Promise.all([
            OrderModel.find(filter)
                .populate("user")
                .populate({ path: "products.storeProduct", populate: "productId" })
                .sort(sorts)
                .skip(skip)
                .limit(take),
            OrderModel.countDocuments({ store: req.user.store }),
        ]);
        return res.status(statusCode.OK).json(BaseResponse.success("Lấy các đơn hàng thành công", { orders, total }));
    },

    async createSellerOrders(req, res) {
        const orders = req.body.orders;

        for (let order of orders) {
            const orderData = new OrderModel(order);
            orderData.user = req.user._id;
            await orderData.save();
        }
        return res.status(statusCode.CREATED).json(BaseResponse.success("Tạo đơn hàng thành công", null));
    },

    async createCustomerOrders(req, res) {
        const { delivery, paymentMethod, deliveryMethod, carts } = req.body;

        const user = req.user._id;
        const groupProducts = carts.reduce((acc, product) => {
            const storeId = product.storeProduct.storeId.toString();
            if (!acc[storeId]) {
                acc[storeId] = [];
            }
            acc[storeId].push(product);
            return acc;
        }, {});

        for (let store in groupProducts) {
            let products = [];
            let totalAmount = 0;
            for (let product of groupProducts[store]) {
                const item = {
                    storeProduct: product.storeProduct._id,
                    quantity: product.quantity,
                    price: product.storeProduct.productId.salePrice * (1 - product.storeProduct.discountPrice),
                };
                totalAmount += product.storeProduct.productId.salePrice * (1 - product.storeProduct.discountPrice) * product.quantity;
                products.push(item);
            }
            const userDetails = await UserModel.findById(user).populate("delivery.address");
            const deliveryDetails = userDetails.delivery.find((d) => d._id.toString() == delivery);
            const deliveryString = `ownerName: ${deliveryDetails.ownerName}, phone: ${deliveryDetails.phone}, street: ${deliveryDetails.address.street}, ward: ${deliveryDetails.address.ward}, district: ${deliveryDetails.address.district}, city: ${deliveryDetails.address.city}`;

            const order = new OrderModel({ user, delivery: deliveryString, paymentMethod, deliveryMethod, totalAmount, products, store });
            const newOrder = await order.save();

            //Tạo thông báo
            const storeInfo = await StoreModel.findById(store);
            const notifyData = {
                user: storeInfo.owner,
                // imageUrl: updatedOrder.store.image.url,
                message: `Có đơn hàng mới. Địa chỉ nhận: ${deliveryDetails.address.street}, ${deliveryDetails.address.ward}, ${deliveryDetails.address.district}, ${deliveryDetails.address.city}`,
                url: "/seller/orders?skip=0&take=10&status=all",
                type: "order",
            };
            const notify = new NotificationModel(notifyData);
            await notify.save();

            const userSocketId = userSockets.get(storeInfo.owner.toString());
            if (userSocketId) {
                io.to(userSocketId).emit("receiveNotification", notifyData);
            }

            //Xóa cart
            if (newOrder?._id) {
                await CartModel.deleteMany({ user });
            }
        }
        return res.status(statusCode.CREATED).json(BaseResponse.success("Tạo đơn hàng thành công", null));
    },

    async updateCustomerOrder(req, res) {
        const { orderId } = req.params;
        const { status } = req.body;
        const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, { status: status }, { new: true, runValidators: true })
            .populate("user")
            .populate({ path: "products.storeProduct", populate: "productId" })
            .populate("store");
        if (!updatedOrder) {
            throw new Error("Lỗi, không tìm thấy đơn hàng");
        }

        //gửi thông báo qua socket io
        let message = "";
        switch (updatedOrder.status) {
            case 1:
                message = "Đơn hàng của bạn đã được chấp nhận, người bán đang chuẩn bị hàng";
                break;
            case 2:
                message = "Đơn hàng của bạn đã được giao cho đơn vị vận chuyển, vui lòng để ý điện thoại nhận hàng";
                break;
            case 3:
                message = "Đơn hàng của bạn đã được giao thành công, cảm ơn bạn đã sử dụng dịch vụ";
                break;
            case 4:
                message = "Đơn hàng của bạn đã bị hủy";
                break;
            case 5:
                message = "Yêu cầu hủy đơn hàng";
                break;
        }
        const notifyData = {
            user: updatedOrder.user._id,
            imageUrl: updatedOrder.store.image.url,
            message,
            url: `/my/order/${updatedOrder._id}`,
            type: "order",
        };
        const notify = new NotificationModel(notifyData);
        const newNotify = await notify.save();

        const userSocketId = userSockets.get(updatedOrder.user._id.toString());
        if (userSocketId) {
            io.to(userSocketId).emit("receiveNotification", notifyData);
        }
        return res.status(statusCode.OK).json(BaseResponse.success("Cập nhật đơn hàng thành công", updatedOrder));
    },

    async getOrdersCountByDay(req, res) {
        const storeId = req.user.store;
        const today = new Date();
        const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay())); // Tính ngày đầu tuần hiện tại
        const startOfLastWeek = new Date(startOfWeek);
        startOfLastWeek.setDate(startOfLastWeek.getDate() - 7); // Tính ngày đầu tuần trước

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(endOfWeek.getDate() + 7); // Tính ngày cuối tuần hiện tại

        const currentWeekStart = startOfWeek.toISOString();
        const currentWeekEnd = endOfWeek.toISOString();
        const lastWeekStart = startOfLastWeek.toISOString();
        const lastWeekEnd = startOfWeek.toISOString();

        const currentWeekOrders = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(currentWeekStart),
                        $lt: new Date(currentWeekEnd),
                    },
                    store: new mongoose.Types.ObjectId(storeId),
                },
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" }, // Nhóm theo ngày trong tuần (1: Chủ nhật, 7: Thứ bảy)
                    count: { $sum: 1 },
                },
            },
        ]);

        const lastWeekOrders = await OrderModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(lastWeekStart),
                        $lt: new Date(lastWeekEnd),
                    },
                    store: new mongoose.Types.ObjectId(storeId),
                },
            },
            {
                $group: {
                    _id: { $dayOfWeek: "$createdAt" },
                    count: { $sum: 1 },
                },
            },
        ]);
        lastWeekOrders.sort((a, b) => a._id - b._id);
        currentWeekOrders.sort((a, b) => a._id - b._id);

        return res.status(statusCode.OK).json(BaseResponse.success("Thành công", { currentWeekOrders, lastWeekOrders }));
    },
};

export default OrderController;
