import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Nodata, QuantityInput } from "../../../components";
import { formatPrice } from "../../../services/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { adjustmentStoreCartItemAction, deleteStoreCartItemAction, getStoreCartItemsAction } from "../../../hooks/Redux/Cart/cartAction";
import { useEffect, useState } from "react";
import useSnackNotify from "../../../components/SnackNotify";
import { useNavigate } from "react-router-dom";
import { createStoreProductsAction } from "../../../hooks/Redux/StoreProduct/storeProductAction";
import LoadingButton from "@mui/lab/LoadingButton";
import { resetCart } from "../../../hooks/Redux/Cart/cartSlice";

export default function ProductCart() {
    const [isCreated, setIsCreated] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const snackNotify = useSnackNotify();
    const { data: cartData, loading: cartLoading } = useSelector((state) => state.cart);
    const { loading: storeProductLoading } = useSelector((state) => state.storeProduct);

    const handelDeleteStoreCartItem = async (data) => {
        const response = await dispatch(deleteStoreCartItemAction(data?._id));
        if (response?.error) {
            snackNotify("error")("Lỗi, vui lòng thử lại sau");
        } else {
            snackNotify("success")("Đã xóa sản phẩm khỏi giỏ hàng");
        }
    };

    const adjustmentStoreCartItem = async (data) => {
        const response = await dispatch(adjustmentStoreCartItemAction(data));
        if (response?.error) {
            snackNotify("error")("Lỗi, vui lòng thử lại sau");
        } else {
            snackNotify("success")("Cập nhật giỏ hàng");
        }
    };

    const createStoreProducts = async () => {
        const response = await dispatch(createStoreProductsAction());
        if (response?.error) {
            snackNotify("error")("Lỗi, vui lòng thử lại sau");
        } else {
            snackNotify("success")("Tạo sản phẩm thành công");
            dispatch(resetCart());
        }
    };

    const handleGetData = async () => {
        await dispatch(getStoreCartItemsAction());
    };

    useEffect(() => {
        handleGetData();
    }, [isCreated]);
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
                            onClick={() => navigate("/seller/product/list?skip=0&take=10&type=all")}
                        >
                            Tiếp tục mua sắm
                        </Button>

                        <LoadingButton
                            size="small"
                            color="warning"
                            onClick={createStoreProducts}
                            loading={storeProductLoading}
                            loadingPosition="start"
                            startIcon={<ShoppingCartCheckoutIcon />}
                            variant="contained"
                            sx={{ textTransform: "none" }}
                        >
                            Kéo về cửa hàng
                        </LoadingButton>
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
                                                        src={product?.product?.images?.[0]?.url}
                                                        alt="product image"
                                                        className="h-[64px] w-full object-cover"
                                                    />
                                                </div>
                                                <Typography variant="body1" className="text-truncate-3">
                                                    {product?.product?.name}
                                                </Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <QuantityInput
                                                quanity={product?.quantity}
                                                handleReduce={() =>
                                                    adjustmentStoreCartItem({
                                                        id: product?._id,
                                                        quantity: -1,
                                                    })
                                                }
                                                handleIncrease={() =>
                                                    adjustmentStoreCartItem({
                                                        id: product?._id,
                                                        quantity: 1,
                                                    })
                                                }
                                            />
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16 flex justify-center font-semibold ">
                                                <small>₫</small>
                                                {product?.product?.price && formatPrice(product?.product?.price)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <div className="na-fs-16 flex justify-center font-semibold text-orange">
                                                <small>₫</small>
                                                {product?.product?.price && formatPrice(product?.product?.price * product?.quantity)}
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton aria-label="delete" onClick={() => handelDeleteStoreCartItem(product)}>
                                                <DeleteIcon color="error" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                {cartData?.total == 0 && <Nodata content={"Giỏ hàng trống"} />}
            </Paper>
        </Box>
    );
}
