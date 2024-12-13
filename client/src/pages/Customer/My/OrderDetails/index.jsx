import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../../components/SnackNotify";
import { getCustomerOrderAction, updateCustomerOrderAction } from "../../../../hooks/Redux/Order/orderAction";
import { formatDate, formatPrice, formatTime, splitDeliveryString } from "../../../../services/functions";
import { ChipStyled, Nodata } from "../../../../components";
import { DELIVERY_METHOD, ORDER_STATUS, ORDER_STATUS_COLOR, PAYMENT_METHOD } from "../../../../constants/enum";
import { Button, Typography } from "@mui/material";

const OrderDetails = () => {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { orderId } = useParams();
    const { order, loading: orderLoading } = useSelector((state) => state.order);
    const status = useRef(0);
    const [reRender, setRender] = useState(false);

    const updateCustomerOrder = async () => {
        const data = { orderId, data: { status: status.current } };
        const response = await dispatch(updateCustomerOrderAction(data));
        if (response.error) {
            snackNotify("error")("Cập nhật đơn hàng lỗi");
        } else {
            snackNotify("success")("Cập nhật đơn hàng thành công");
            setRender(!reRender);
        }
    };

    const handleGetData = async () => {
        const response = await dispatch(getCustomerOrderAction(orderId));
        if (response?.error) {
            snackNotify("error")("Lấy thông tin đơn hàng lỗi");
        }
    };

    useEffect(() => {
        handleGetData();
    }, [orderId, reRender]);
    return (
        <div>
            {order ? (
                <div>
                    {/* Order Details Header */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-lg font-semibold">Chi tiết đơn hàng:&nbsp;{orderId}</h2>
                                <p className="text-gray-500">{`${formatDate(order?.createdAt)}, ${formatTime(order?.createdAt)}`}</p>
                            </div>
                            <div>
                                <ChipStyled label={ORDER_STATUS[order?.status]} color={ORDER_STATUS_COLOR[order?.status]} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(() => {
                            const deliveryString = splitDeliveryString(order?.delivery);

                            return (
                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="font-semibold">Địa chỉ thanh toán</h3>
                                    <p>Người nhận:&nbsp;{deliveryString?.ownerName}</p>
                                    <p>Người số diện thoại:&nbsp;{deliveryString?.phone}</p>
                                    <p>
                                        Địa chỉ:&nbsp;
                                        {`${deliveryString?.street}, ${deliveryString?.ward}, ${deliveryString?.district}, ${deliveryString?.city}`}
                                    </p>
                                </div>
                            );
                        })()}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-semibold">Phương thức giao hàng</h3>
                            <p>{DELIVERY_METHOD[order?.deliveryMethod]}</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="font-semibold">Phương thức thanh toán</h3>
                            <p>{PAYMENT_METHOD[order?.paymentMethod]}</p>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold px-4 border-b-2 border-orange-500">Sản phẩm</div>
                        </div>
                        <table className="min-w-full table-auto mt-3">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="px-4 py-2 font-semibold text-gray-600">Sản phẩm</th>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Cửa hàng</th>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Số lượng</th>
                                    <th className="px-4 py-2 font-semibold text-gray-600">Đơn giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order?.products.map((product) => (
                                    <tr key={product?._id}>
                                        <td className="border px-4 py-2">
                                            <div className="flex">
                                                <div className="min-w-[90px] h-full mr-3 rounded-sm overflow-hidden">
                                                    <img
                                                        src={product?.storeProduct?.productId?.images?.[0]?.url}
                                                        alt="product image"
                                                        className="h-[64px] w-full object-contain"
                                                    />
                                                </div>
                                                <Typography variant="body1" className="text-truncate-3">
                                                    {product?.storeProduct?.productId?.name}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2">{order?.store?.name}</td>
                                        <td className="border px-4 py-2">{product?.quantity}</td>
                                        <td className="border px-4 py-2">{product?.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                            <p className="font-semibold text-lg mr-4">
                                Tổng cộng:&nbsp;<span className="text-xl font-bold text-orange">{formatPrice(order?.totalAmount)}</span>
                                <sup className=" text-orange">đ</sup>
                            </p>
                            {order?.status == 2 ? (
                                <Button
                                    variant="outlined"
                                    color="success"
                                    size="small"
                                    className="na-text-transform-none"
                                    sx={{ ":hover": { bgcolor: "orange", color: "white", borderColor: "yellow" } }}
                                    onClick={() => {
                                        status.current = 3;
                                        updateCustomerOrder();
                                    }}
                                >
                                    Đã nhận được hàng
                                </Button>
                            ) : (
                                order?.status == 3 && (
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        size="small"
                                        className="na-text-transform-none"
                                        sx={{ ":hover": { bgcolor: "orange", color: "white", borderColor: "yellow" } }}
                                        onClick={() => {
                                            status.current = 5;
                                            updateCustomerOrder();
                                        }}
                                    >
                                        Hoàn trả
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <Nodata content={`Không tìm thấy đơn hàng ${orderId}`} />
            )}
        </div>
    );
};

export default OrderDetails;
