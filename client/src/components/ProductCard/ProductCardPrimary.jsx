import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import { formatPrice } from "../../services/functions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, Rating, Stack, Tooltip } from "@mui/material";
import useSnackNotify from "../SnackNotify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addProductToStoreCartAction } from "../../hooks/Redux/Cart/cartAction";
import { modifyStoreFavoriteItemAction } from "../../hooks/Redux/Favorite/favoriteAction";

export default function ProductCardPrimary({ product }) {
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
                <Swiper className="product_card-primary_swiper " pagination={true} modules={[Pagination]}>
                    {product?.images?.map((image, index) => (
                        <SwiperSlide key={index} className="swiper-slide_styled">
                            <img src={image?.url} alt="product image" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Box>
            <Box className="px-5">
                <p className="font-semibold text-lg leading-5 line-clamp-2 h-10">{product?.name}</p>
                <div className="flex text-[#d26426]">
                    <div className="text-2xl font-semibold">
                        <small>₫</small>
                        {formatPrice(product?.price)}
                    </div>
                    <del className="flex items-center ml-3 font-semibold text-gray-500">
                        <small>₫</small>
                        {formatPrice(product?.salePrice)}
                    </del>
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
}
