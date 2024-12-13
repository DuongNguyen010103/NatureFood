import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, Pagination, Paper, Rating, Tooltip } from "@mui/material";
import { formatPrice, useQuery } from "../../../services/functions";
import { ChipStyled, Nodata } from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import useSnackNotify from "../../../components/SnackNotify";
import { deleteFavoriteStoreProductAction, getFavoriteStoreProductsAction } from "../../../hooks/Redux/Favorite/favoriteAction";
import { useNavigate } from "react-router-dom";

const productsEachPage = 10;
const Favorite = () => {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const query = useQuery();
    const { data: favoriteData } = useSelector((state) => state.favorite);
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
    };

    const handleRemoveFavoriteStoreProduct = async (storeProductId) => {
        const response = await dispatch(deleteFavoriteStoreProductAction(storeProductId));
        if (response?.error) {
            snackNotify("error")("Bỏ yêu thích thất bại");
        } else {
            snackNotify("success")("Bỏ yêu thích thành công");
        }
    };

    const handlePaginationChange = (event, value) => {
        navigate(`/wishlist?skip=${(value - 1) * productsEachPage}&take=${productsEachPage}`);
    };

    const handleGetData = async () => {
        const response = await dispatch(getFavoriteStoreProductsAction(params));
        if (response?.error) {
            snackNotify("error")("Lấy sản phẩm yêu thích thất bại");
        }
    };

    useEffect(() => {
        handleGetData();
    }, [params.skip, params.take]);
    return (
        <div>
            <Paper className="mb-4">
                <div className="flex justify-between items-center">
                    <div className=" px-4 border-b-2 border-orange-500 py-4">
                        Hiển thị 1 - 10 trong&nbsp;<strong className="text-orange">{favoriteData?.total}&nbsp;</strong>yêu thích
                    </div>
                    <div className="mr-4">
                        <Button variant="contained" color="success" size="small" className="na-text-transform-none">
                            Xem sản phẩm danh mục
                        </Button>
                    </div>
                </div>
            </Paper>
            <Grid container spacing={1}>
                {favoriteData?.products.map((product) => (
                    <Grid item xs={6} md={2} key={product?._id}>
                        <div className="hover:shadow-custom transition-shadow duration-200 rounded-xl relative overflow-hidden">
                            <div className="p-2 h-[210px] flex justify-center">
                                <img
                                    src={product?.storeProduct?.productId?.images?.[0]?.url}
                                    alt="product image"
                                    className="h-full rounded-lg object-contain"
                                />
                            </div>

                            <div className="px-3 pb-3">
                                <p className="text-base line-clamp-2 leading-5 min-h-[40px]">{product?.storeProduct?.productId?.name}</p>
                                <div className="mt-2">
                                    <Rating value={4} readOnly size="small" />
                                </div>

                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="text-xl font-bold text-orange">
                                            {formatPrice(product?.storeProduct?.productId?.salePrice * (1 - product?.storeProduct?.discountPrice))}
                                        </span>
                                        <span style={{ textDecoration: "line-through", color: "#777", marginLeft: "8px" }}>
                                            {formatPrice(product?.storeProduct?.productId?.salePrice)}
                                        </span>
                                    </div>
                                    {product?.storeProduct?.discountPrice > 0 && (
                                        <ChipStyled label={`-${product?.storeProduct?.discountPrice * 100}%`} color="error" />
                                    )}
                                </div>
                                <p style={{ color: "green" }}>Miễn phí vận chuyển</p>
                                <div className="mt-1">
                                    <Button
                                        sx={{
                                            borderRadius: "15px",
                                            backgroundColor: "#F5F5F5",
                                            color: "black",
                                            transition: "all 0.2s ease",
                                            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                                            textTransform: "none",
                                            fontSize: "14px",
                                            "&:hover": {
                                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                                                backgroundColor: "white",
                                            },
                                        }}
                                    >
                                        Mua ngay
                                    </Button>
                                </div>
                                <div className="absolute top-1 -left-2 z-10">
                                    <ChipStyled label="The Cong" color="success" />
                                </div>
                                <div className="absolute top-1 z-10 right-1">
                                    <Tooltip title="Bỏ yêu thích">
                                        <IconButton
                                            color="error"
                                            onClick={() => handleRemoveFavoriteStoreProduct(product?.storeProduct?._id)}
                                            size="small"
                                            sx={{ ":hover": { outline: "1px solid red" } }}
                                        >
                                            <FavoriteOutlinedIcon fontSize="medium" />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
            {favoriteData?.total == 0 && <Nodata content={"Giỏ hàng của bạn trống"} />}
            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(favoriteData?.total / productsEachPage + 1)}
                page={Math.floor(query.get("skip") / productsEachPage + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </div>
    );
};

export default Favorite;
