import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { countCartTotal, formatPrice } from "../../../services/functions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Nodata, QuantityInput } from "../../../components";
import { Link, useNavigate } from "react-router-dom";
import useSnackNotify from "../../../components/SnackNotify";
import { adjustmentCartItemAction, deleteCartItemAction } from "../../../hooks/Redux/Cart/cartAction";

export default function Cart() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const snackNotify = useSnackNotify();
    const { data: cartData, loading: cartLoading } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.user);

    const handelDeleteCartItem = async (data) => {
        const response = await dispatch(deleteCartItemAction(data));
        if (response?.error) {
            snackNotify("error")("Xóa sản phẩm khỏi giỏ hàng thất bại");
        } else {
            snackNotify("success")("Đã xóa sản phẩm khỏi giỏ hàng");
        }
    };

    const adjustmentCartItem = async (data) => {
        const response = await dispatch(adjustmentCartItemAction(data));
        if (response?.error) {
            snackNotify("error")("Cập nhật giỏ hàng thất bại");
        } else {
            snackNotify("success")("Cập nhật giỏ hàng thành công");
        }
    };

    useEffect(() => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            navigate("/login");
            return;
        }
    }, [token]);
    return (
        <Box>
            <Paper>
                <div className=" p-[20px] flex justify-between items-center">
                    <Typography variant="body1">Hiển thị 1-24 trong 205 sản phẩm</Typography>
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
                                    <TableCell className="na-table-cell-tini" sx={{ minWidth: "400px" }}>
                                        Sản phẩm
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="center">
                                        Số lượng
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="center" sx={{ minWidth: "120px" }}>
                                        Giá
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="center" sx={{ minWidth: "150px" }}>
                                        Tổng
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="right" sx={{ whiteSpace: "nowrap" }}>
                                        Tùy chọn
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="na-table-body-tini">
                                {cartData?.products?.map((product) => (
                                    <TableRow
                                        key={product?._id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                        className="na-table-row "
                                    >
                                        <TableCell>
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
                                        </TableCell>
                                        <TableCell align="right">
                                            <QuantityInput
                                                quanity={product?.quantity}
                                                handleReduce={() =>
                                                    adjustmentCartItem({
                                                        id: product?._id,
                                                        quantity: -1,
                                                    })
                                                }
                                                handleIncrease={() =>
                                                    adjustmentCartItem({
                                                        id: product?._id,
                                                        quantity: 1,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16 flex justify-center font-semibold ">
                                                <small>₫</small>
                                                {formatPrice(
                                                    product?.storeProduct?.productId?.salePrice * (1 - product?.storeProduct?.discountPrice)
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16 flex justify-center font-semibold text-orange">
                                                <small>₫</small>
                                                {formatPrice(
                                                    product?.storeProduct?.productId?.salePrice *
                                                        (1 - product?.storeProduct?.discountPrice) *
                                                        product?.quantity
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" onClick={() => handelDeleteCartItem(product?._id)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {cartData?.total > 0 && (
                                    <TableRow>
                                        <TableCell align="right"></TableCell>
                                        <TableCell align="right"> </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16  font-semibold ">Tổng:</div>
                                        </TableCell>
                                        <TableCell align="right">
                                            (<span className="na-fs-16 font-semibold text-orange">{cartData?.total}</span> sản phẩm)
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16 flex  font-bold text-red-600 underline">
                                                <small>₫</small>
                                                {cartData?.products && formatPrice(countCartTotal(cartData?.products))}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                        {cartData?.total == 0 && <Nodata content={"Giỏ hàng của bạn trống"} />}
                    </TableContainer>
                </Box>
            </Paper>
            <Box className="pt-3 text-end">
                <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    to="/checkout"
                    className="hover:text-white"
                    disabled={cartData?.total == 0}
                >
                    Thanh toán
                </Button>
            </Box>
        </Box>
    );
}
