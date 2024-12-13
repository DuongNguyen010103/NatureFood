import {
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Rating,
    Select,
    styled,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { getProductsAction } from "../../../hooks/Redux/Product/productAction";
import { getStoreFavoriteItemsAction } from "../../../hooks/Redux/Favorite/favoriteAction";
import { useQuery } from "../../../services/functions";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination as PaginationSwiper } from "swiper/modules";
import { formatPrice } from "../../../services/functions";
import useSnackNotify from "../../../components/SnackNotify";
import { ChipStyled } from "../../../components";
import CloseIcon from "@mui/icons-material/Close";
import { getStoreProductsByStoreAction, updateStoreProductAction } from "../../../hooks/Redux/StoreProduct/storeProductAction";
import LoadingButton from "@mui/lab/LoadingButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const Index = () => {
    const [selectedProduct, setSelectedProduct] = useState();
    const [openEdit, setOpenEdit] = useState(false);
    const [formData, setFormData] = useState({ status: true, stock: 0, discountPrice: 0 });
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const [sortby, setSortby] = useState(10);
    const snackNotify = useSnackNotify();
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
        type: query.get("type"),
    };

    const { data: productData, loading } = useSelector((state) => state.storeProduct);

    const handleSortbyChange = (event) => {
        setSortby(event.target.value);
    };

    const hanldeFormDataChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const onSubmit = async () => {
        const response = await dispatch(updateStoreProductAction({ storeProductId: selectedProduct?._id, formData }));
        console.log(response);
        if (response.error) {
            snackNotify("error")("Cập nhật sản phẩm thất bại");
        } else {
            snackNotify("success")("Cập nhật sản phẩm thành công");
        }
    };
    const handlePaginationChange = (event, value) => {
        navigate(`/seller/product/list?skip=${(value - 1) * params.take}&take=${params.take}&type=all`);
    };
    const handleGetData = async () => {
        const response = await dispatch(getStoreProductsByStoreAction(params));
        if (response.error) {
            snackNotify("error")("Lấy sản phẩm cửa hàng thất bại");
        }
    };
    useEffect(() => {
        handleGetData();
    }, [params.skip, params.take, params.type]);

    useEffect(() => {
        setFormData({ status: selectedProduct?.status || true, stock: selectedProduct?.stock, discountPrice: selectedProduct?.discountPrice });
    }, [selectedProduct]);
    return (
        <Box className="p-6">
            <Paper className="mb-4 p-[20px] flex justify-between items-center">
                <p>
                    Hiển thị&nbsp;
                    <strong className="text-orange">{params.take > productData?.total ? productData?.total : params.take}</strong>
                    &nbsp;trong&nbsp;
                    <strong className="text-green-700">{productData?.total}</strong>&nbsp;sản phẩm
                </p>
                <div className="flex items-center">
                    <div className="mr-3">
                        <span className="mr-2">Sắp xếp theo</span>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={sortby}
                            onChange={handleSortbyChange}
                            size="small"
                            sx={{ padding: "2px 8px" }}
                            inputProps={{ sx: { padding: "2px 8px" } }}
                        >
                            <MenuItem value={10}>Ngày tạo</MenuItem>
                            <MenuItem value={20}>Số sản phẩm</MenuItem>
                        </Select>
                    </div>
                </div>
            </Paper>
            <Grid container spacing={2}>
                {productData?.products?.map((product) => (
                    <Grid item md={2} key={product._id}>
                        <Card className="product_card-primary relative">
                            <Box>
                                <Swiper className="product_card-primary_swiper " pagination={true} modules={[PaginationSwiper]}>
                                    {product?.productId?.images?.map((image, index) => (
                                        <SwiperSlide key={index} className="swiper-slide_styled">
                                            <div className="h-full flex justify-center">
                                                <img src={image?.url} alt="product image" className="h-full" />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </Box>
                            <Box className="px-5">
                                <p className="font-semibold text-lg leading-5 line-clamp-2 h-10">{product?.productId?.name}</p>
                                <div className="flex text-[#d26426] justify-between mt-1">
                                    <div>
                                        <div className="text-2xl font-semibold">
                                            <small>₫</small>
                                            {formatPrice(product?.productId.salePrice * (1 - product?.discountPrice))}
                                        </div>
                                        {product?.discountPrice > 0 ? (
                                            <del className="flex items-center ml-3 font-semibold text-gray-500">
                                                <small>₫</small>
                                                {formatPrice(product?.productId.salePrice)}
                                            </del>
                                        ) : (
                                            <p>&nbsp;</p>
                                        )}
                                    </div>
                                    {product?.discountPrice > 0 && <ChipStyled label={`Giảm ${product?.discountPrice * 100}%`} color="error" />}
                                </div>
                                <Typography variant="body2" sx={{ color: "text.secondary", my: 1 }}>
                                    Sẵn có:&nbsp;
                                    <span className="text-green-500 font-semibold">{product?.stock}</span>
                                </Typography>
                            </Box>
                            <Box className="px-4 pb-4 flex justify-between">
                                <Rating name="read-only" value={product?.rating || 4} readOnly />
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    className="na-text-transform-none"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setOpenEdit(true);
                                    }}
                                >
                                    Chỉnh sửa
                                </Button>
                            </Box>
                            <div className="absolute top-3 -left-2 z-10">
                                <ChipStyled label={product?.status ? "Đang bán" : "Tạm ngưng"} color={product?.status ? "success" : "warning"} />
                            </div>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* dialog */}
            <Fragment>
                <BootstrapDialog onClose={() => setOpenEdit(false)} aria-labelledby="customized-dialog-title" open={openEdit}>
                    <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                        Chỉnh sửa sản phẩm cửa hàng
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={() => setOpenEdit(false)}
                        sx={(theme) => ({
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <DialogContent dividers>
                        <div>
                            <strong>Tên sản phẩm:&nbsp;</strong>
                            {selectedProduct?.productId.name}
                        </div>
                        <div>
                            <strong>Đăng bán trong cửa hàng:&nbsp;</strong>
                            <Switch checked={formData.status} color="success" name="status" onChange={hanldeFormDataChange} />
                        </div>
                        <div className="flex">
                            <strong className="whitespace-nowrap">Số lượng sẵn có:&nbsp;</strong>
                            <TextField
                                type="number"
                                size="small"
                                value={formData.stock || 0}
                                onChange={hanldeFormDataChange}
                                name="stock"
                                variant="standard"
                                fullWidth
                                sx={{ width: 50, ml: 1 }}
                                inputProps={{
                                    min: 0,
                                    step: 1,
                                }}
                            />
                        </div>
                        <div className="flex mt-4">
                            <div className="flex mr-3 w-1/2">
                                <strong className="whitespace-nowrap">Giảm giá:&nbsp;</strong>
                                <TextField
                                    type="number"
                                    size="small"
                                    fullWidth
                                    value={formData.discountPrice || 0}
                                    onChange={hanldeFormDataChange}
                                    name="discountPrice"
                                    variant="standard"
                                    sx={{ ml: 1 }}
                                    inputProps={{
                                        min: 0.0,
                                        max: 1.0,
                                        step: 0.01,
                                    }}
                                />
                            </div>

                            <div className="flex">
                                <strong className="whitespace-nowrap">Giá sau giảm:&nbsp;</strong>
                                <p className="font-semibold text-orange whitespace-nowrap">
                                    {formatPrice(selectedProduct?.productId.salePrice * (1 - formData.discountPrice))}
                                    <sup>vnđ</sup>
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="outlined" size="small" onClick={() => setOpenEdit(false)}>
                            Hủy
                        </Button>
                        <LoadingButton loading={loading} loadingPosition="center" variant="contained" color="success" size="small" onClick={onSubmit}>
                            Lưu thay đổi
                        </LoadingButton>
                    </DialogActions>
                </BootstrapDialog>
            </Fragment>
            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(productData?.total / parseInt(params.take) + 1)}
                page={Math.floor(parseInt(params.skip) / parseInt(params.take) + 1)}
                onChange={handlePaginationChange}
                color="success"
            />
        </Box>
    );
};
export default Index;
