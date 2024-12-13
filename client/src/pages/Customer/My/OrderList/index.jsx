import React, { useEffect, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Box, Button, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ChipStyled, Nodata } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrdersAction } from "../../../../hooks/Redux/Order/orderAction";
import { formatDate, formatPrice, splitDeliveryString, useQuery } from "../../../../services/functions";
import useSnackNotify from "../../../../components/SnackNotify";
import { ORDER_STATUS, ORDER_STATUS_COLOR } from "../../../../constants/enum";
import { useNavigate } from "react-router-dom";

const productsEachPage = 10;

const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const snackNotify = useSnackNotify();
    const { data: orderData, loading: orderLoading } = useSelector((state) => state.order);

    const handleGetData = async () => {
        const params = {
            skip: query.get("skip"),
            take: query.get("take"),
            status: query.get("status"),
            date: query.get("date"),
        };
        const response = await dispatch(getCustomerOrdersAction(params));
        if (response?.error) {
            snackNotify("error")("Lấy danh sách đơn hàng thất bại");
        }
    };

    const handlePaginationChange = (event, value) => {
        navigate(
            `/my/orders?skip=${(value - 1) * productsEachPage}&take=${productsEachPage}&type=${query.get("status")}&date=${query.get("date") || -1}`
        );
    };

    useEffect(() => {
        handleGetData();
    }, [query.get("skip"), query.get("take"), query.get("type"), query.get("date")]);
    return (
        <Box>
            <Paper>
                <div className=" p-[20px] flex justify-between items-center">
                    <p className="text-xl font-bold">Đơn hàng</p>
                    <div className="flex items-center">
                        <Button
                            variant="outlined"
                            startIcon={<NavigateBeforeIcon />}
                            size="small"
                            sx={{ textTransform: "none", mr: 1 }}
                            onClick={() => navigate("/product/list?skip=0&take=10&date=-1&price=-1&discount=0")}
                        >
                            Tiếp tục mua sắm
                        </Button>
                    </div>
                </div>
                <Box>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead className="na-table-header-tini">
                                <TableRow>
                                    <TableCell className="na-table-cell-tini">Địa chỉ nhận</TableCell>
                                    <TableCell className="na-table-cell-tini" align="right">
                                        Ngày đặt
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="right">
                                        Tổng tiền
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="right">
                                        Trạng thái
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="right" sx={{ whiteSpace: "nowrap" }}>
                                        Tùy chọn
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="na-table-body-tini">
                                {orderData?.orders?.map((order) => (
                                    <TableRow
                                        key={order?._id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                        className="na-table-row "
                                    >
                                        <TableCell>
                                            <div className="na-fs-16 min-w-[200px]">
                                                {(() => {
                                                    const deliveryString = splitDeliveryString(order?.delivery);
                                                    return (
                                                        <div>
                                                            <p className="line-clamp-1">{`${deliveryString.street}, ${deliveryString.ward}, ${deliveryString.district}, ${deliveryString.city}`}</p>
                                                            <p className="text-sm text-gray-500">{deliveryString.ownerName}</p>
                                                        </div>
                                                    );
                                                })()}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right" className="na-fs-16 whitespace-nowrap">
                                            {formatDate(order?.createdAt)}
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16  font-semibold text-orange whitespace-nowrap">
                                                <small>₫</small>
                                                {formatPrice(order?.totalAmount)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <ChipStyled label={ORDER_STATUS[order?.status]} color={ORDER_STATUS_COLOR[order?.status]} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="success"
                                                size="small"
                                                className="na-text-transform-none whitespace-nowrap"
                                                onClick={() => navigate(`/my/order/${order?._id}`)}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {orderData?.total == 0 && <Nodata content={"Bạn chưa có đơn đặt hàng nào"} />}
                    </TableContainer>
                </Box>
            </Paper>
            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(orderData?.total / productsEachPage + 1)}
                page={Math.floor(query.get("skip") / productsEachPage + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </Box>
    );
};

export default OrderList;
