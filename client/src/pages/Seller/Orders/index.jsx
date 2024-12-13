import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { useEffect, useState } from "react";
import { getCustomerOrdersMyStoreAction } from "../../../hooks/Redux/Order/orderAction";
import { formatDate, formatPrice, splitDeliveryString, useQuery } from "../../../services/functions";
import { Box, Button, MenuItem, Pagination, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { ChipStyled, Nodata } from "../../../components";
import { ORDER_STATUS, ORDER_STATUS_COLOR } from "../../../constants/enum";
import OrderDetails from "./OrderDetails";

const productsEachPage = 10;

export default function Index() {
    const [selectedOrder, setSelectedOrder] = useState();
    const [openDetails, setOpenDetails] = useState(false);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const query = useQuery();
    const { data: orderData, loading } = useSelector((state) => state.order);
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
        status: query.get("status"),
        date: query.get("date"),
    };

    const handlePaginationChange = (event, value) => {
        navigate(`/seller/orders?skip=${(value - 1) * params.take}&take=${params.take}&date=${params.date}&status=${query.get("status")}`);
    };

    useEffect(() => {
        (async () => {
            await dispatch(getCustomerOrdersMyStoreAction(params));
        })();
    }, [params.skip, params.take, params.status, params.date]);
    return (
        <Box className="p-6">
            <Paper>
                <div className=" p-[20px] flex justify-between items-center">
                    <p className="text-xl font-bold">Đơn hàng</p>
                    <div className="flex space-x-2 items-center">
                        <p className=" text-gray-600">Sắp xếp theo:</p>
                        <Button
                            variant={params.date == "-1" ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            onClick={() =>
                                navigate(
                                    `/seller/orders?skip=${params.skip}&take=${params.take}&date=${params.date == "-1" ? 1 : -1}&status=${
                                        params.status
                                    }`
                                )
                            }
                        >
                            Mới nhất
                        </Button>
                        <Select
                            variant="standard"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={params.status}
                            size="small"
                            onChange={(e) =>
                                navigate(`/seller/orders?skip=${params.skip}&take=${params.take}&date=${params.date}&status=${e.target.value}`)
                            }
                            sx={{ minWidth: "140px" }}
                        >
                            <MenuItem value={-1}>Tất cả trạng thái</MenuItem>
                            <MenuItem value={0}>Đang xác minh</MenuItem>
                            <MenuItem value={1}>Đã xác minh</MenuItem>
                            <MenuItem value={2}>Đang vận chuyện</MenuItem>
                            <MenuItem value={3}>Đã nhận được hàng</MenuItem>
                            <MenuItem value={4}>Đã hủy</MenuItem>
                            <MenuItem value={5}>Đang hoàn trả</MenuItem>
                        </Select>
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
                                                onClick={() => {
                                                    setSelectedOrder(order);
                                                    setOpenDetails(true);
                                                }}
                                            >
                                                Xem chi tiết
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {orderData?.total == 0 && <Nodata content={"Bạn không có đơn đặt hàng nào"} />}
                    </TableContainer>
                </Box>
            </Paper>
            <OrderDetails order={selectedOrder} openDetails={openDetails} setOpenDetails={setOpenDetails} />
            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(orderData?.total / params.take + 1)}
                page={Math.floor(query.get("skip") / params.take + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </Box>
    );
}
