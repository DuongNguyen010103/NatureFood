import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { getCustomerOrderAction, updateCustomerOrderAction } from "../../../hooks/Redux/Order/orderAction";
import { formatDate, formatPrice, formatTime, splitDeliveryString } from "../../../services/functions";
import { ChipStyled, Nodata } from "../../../components";
import { DELIVERY_METHOD, ORDER_STATUS, ORDER_STATUS_COLOR, PAYMENT_METHOD } from "../../../constants/enum";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ConfirmDialog from "../../../components/ConfirmDialog";
import { sendNotification } from "../../../services/socket";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderDetails({ order, openDetails, setOpenDetails }) {
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState();
    const [status, setStatus] = useState();
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { loading } = useSelector((state) => state.order);

    const updateCustomerOrder = async () => {
        const data = { orderId: order?._id, data: { status } };
        const response = await dispatch(updateCustomerOrderAction(data));
        if (response.error) {
            snackNotify("error")("Cập nhật đơn hàng lỗi");
        } else {
            snackNotify("success")("Cập nhật đơn hàng thành công");
            setOpenDialog(false);
            setOpenDetails(false);
        }
    };
    return (
        <div>
            <Dialog fullScreen open={openDetails} onClose={() => setOpenDetails(false)} TransitionComponent={Transition}>
                <AppBar sx={{ position: "relative" }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={() => setOpenDetails(false)} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Chi tiết đơn hàng:
                        </Typography>
                        {order?.status < 2 && (
                            <div>
                                <Button
                                    variant="contained"
                                    autoFocus
                                    color="warning"
                                    size="small"
                                    onClick={() => {
                                        setOpenDialog(true);
                                        setTitle(
                                            order?.status == 0
                                                ? "Chấp nhận và cam kết chuẩn bị đầy đủ cho đơn hàng ?"
                                                : "Xác nhận Đã giao cho đơn vị vận chuyển"
                                        );
                                        setStatus(order?.status + 1);
                                    }}
                                    sx={{ mr: 1 }}
                                >
                                    {order?.status == 0 ? "Chấp nhận đơn hàng?" : "Chuyển cho đơn vị vận chuyển"}
                                </Button>
                                <Button
                                    variant="contained"
                                    autoFocus
                                    color="error"
                                    size="small"
                                    onClick={() => {
                                        setOpenDialog(true);
                                        setTitle("Xác nhận hủy đơn hàng");
                                        setStatus(4);
                                    }}
                                >
                                    Hủy đơn
                                </Button>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
                <div>
                    {order ? (
                        <div className="p-6">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <div className="">
                                    <h2 className="text-lg font-semibold">Chi tiết đơn hàng:&nbsp;{order?._id}</h2>
                                    <p className="text-gray-500">{`${formatDate(order?.createdAt)}, ${formatTime(order?.createdAt)}`}</p>
                                    <div className="flex">
                                        <p className="font-bold mr-3">Tình trạng đơn hàng: </p>
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
                                                                className="h-[64px] w-full object-cover"
                                                            />
                                                        </div>
                                                        <Typography variant="body1" className="text-truncate-3">
                                                            {product?.storeProduct?.productId?.name}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className="border px-4 py-2">{product?.quantity}</td>
                                                <td className="border px-4 py-2">{product?.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="flex justify-end mt-4">
                                    <span className="text-lg font-semibold">Tổng cộng:&nbsp;{formatPrice(order?.totalAmount)}</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Nodata content={`Không tìm thấy đơn hàng ${order?._id}`} />
                    )}
                </div>
            </Dialog>
            {/* dialog xác nhận Chấp nhận đơn hàng */}
            <ConfirmDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                title={title}
                loading={loading}
                handleConfirm={updateCustomerOrder}
            />
        </div>
    );
}
