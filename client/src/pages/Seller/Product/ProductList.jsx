import { Button, Card, Grid, MenuItem, Pagination, Paper, Rating, Select, Stack, Switch, Tooltip, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProductsAction } from "../../../hooks/Redux/Product/productAction";
import { getStoreFavoriteItemsAction } from "../../../hooks/Redux/Favorite/favoriteAction";
import { useQuery } from "../../../services/functions";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination as PaginationSwiper } from "swiper/modules";
import { formatPrice } from "@services/functions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import useSnackNotify from "@components/SnackNotify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToStoreCartAction } from "../../../hooks/Redux/Cart/cartAction";
import { modifyStoreFavoriteItemAction } from "../../../hooks/Redux/Favorite/favoriteAction";

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { data: favoriteData } = useSelector((state) => state.favorite);
    const { currentStore } = useSelector((state) => state.store);

    //favorite features
    const modifyStoreFavoriteItem = async () => {
        const response = await dispatch(modifyStoreFavoriteItemAction(product?._id));
        if (response?.error) {
            snackNotify("error")("Cập nhật danh sách yêu thích thất bại");
        } else {
            snackNotify("success")("Đã cập nhật danh sách yêu thích");
        }
    };

    //Cart features
    const createStoreCartItem = async () => {
        const response = await dispatch(addProductToStoreCartAction({ quantity: 1, productId: product?._id }));
        if (response?.error) {
            snackNotify("error")("Thêm vào giỏ hàng thất bại");
        } else {
            snackNotify("success")("Đã thêm vào giỏ hàng");
        }
        console.log(response);
    };
    return (
        <Card className="product_card-primary">
            <Box>
                <Swiper className="product_card-primary_swiper " pagination={true} modules={[PaginationSwiper]}>
                    {product?.images?.map((image, index) => (
                        <SwiperSlide key={index} className="swiper-slide_styled">
                            <div className="h-full flex justify-center">
                                <img src={image?.url} alt="product image" className="h-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box className="px-5">
                <p className="font-semibold text-base leading-5 line-clamp-2 h-10">{product?.name}</p>
                <div className="flex items-center">
                    <p>Giá kho:&nbsp;</p>
                    <div className="flex text-[#d26426]">
                        <div className="text-2xl font-semibold">
                            <small>₫</small>
                            {formatPrice(product?.price)}
                        </div>
                    </div>
                </div>
                <div className="flex items-center">
                    <p>
                        Giá bán ra: {formatPrice(product?.salePrice)}
                        <sup>đ</sup>
                    </p>
                </div>
                <Typography variant="body2" sx={{ color: "text.secondary", my: 1 }}>
                    Sẵn có:&nbsp;
                    <span className="text-green-500 font-semibold">{product?.inventory}</span>
                </Typography>
            </Box>
            <Box className="px-4 pb-4 flex justify-between">
                <Rating name="read-only" value={product?.rating} readOnly />
                <Stack direction={"row"} spacing={1}>
                    {favoriteData?.products?.some((f) => f.product == product._id) ? (
                        <Tooltip title="Bỏ yêu thích" placement="top">
                            <Button
                                variant="outlined"
                                sx={{ padding: "3px 12px", minWidth: "10px" }}
                                size="small"
                                className="btn-product-cart"
                                onClick={modifyStoreFavoriteItem}
                            >
                                <FavoriteIcon fontSize="small" color="error" />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Thêm vào yêu thích" placement="top">
                            <Button
                                variant="outlined"
                                sx={{ padding: "3px 12px", minWidth: "10px" }}
                                size="small"
                                className="btn-product-cart"
                                onClick={modifyStoreFavoriteItem}
                            >
                                <FavoriteBorderIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    )}

                    <Tooltip title="Thêm vào giỏ hàng" placement="top">
                        <Button variant="outlined" sx={{ padding: "3px 12px", minWidth: "10px" }} size="small" onClick={createStoreCartItem}>
                            <AddShoppingCartIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                </Stack>
            </Box>
        </Card>
    );
};

const Index = () => {
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
    const { data: productData, loading: productLoading } = useSelector((state) => state.product);

    const handlePaginationChange = (event, value) => {
        navigate(`/seller/store-product/list?skip=${(value - 1) * params.take}&take=${params.take}&type=all`);
    };

    const handleSortbyChange = (event) => {
        setSortby(event.target.value);
    };
    const handleGetData = async () => {
        await dispatch(getProductsAction(params));
        await dispatch(getStoreFavoriteItemsAction());
    };
    useEffect(() => {
        handleGetData();
    }, [params.skip, params.take]);
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
                        <ProductCard product={product} />
                    </Grid>
                ))}
            </Grid>
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
