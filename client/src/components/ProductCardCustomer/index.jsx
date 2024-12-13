import { formatPrice, useQuery } from "@services/functions";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Button, Card, Grid, MenuItem, Pagination, Paper, Rating, Select, Stack, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "@components/SnackNotify";
import { Pagination as PaginationSwipper } from "swiper/modules";
import { ChipStyled, Nodata } from "@components";
import { useNavigate } from "react-router-dom";
import { createCartItemAction } from "../../hooks/Redux/Cart/cartAction";
import { addFavoriteStoreProductAction, deleteFavoriteStoreProductAction } from "../../hooks/Redux/Favorite/favoriteAction";

export default function ProductCardCustomer({ product }) {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const query = useQuery();
    const { search: searchData, loading: searchLoading } = useSelector((state) => state.storeProduct);
    const { data: favoriteData } = useSelector((state) => state.favorite);
    const { token } = useSelector((state) => state.user);
    const params = {
        keyword: query.get("keyword"),
        skip: query.get("skip"),
        take: query.get("take"),
        date: query.get("date"),
        price: query.get("price"),
        discount: query.get("discount"),
    };

    const handleAddToCart = async (storeProductId) => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(createCartItemAction({ storeProduct: storeProductId, quantity: 1 }));
        if (response?.error) {
            snackNotify("error")("Thêm vào giỏ thất bại");
        } else {
            snackNotify("success")("Thêm vào giỏ thành công");
        }
    };

    const handleAddFavoriteStoreProduct = async (storeProductId) => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(addFavoriteStoreProductAction(storeProductId));
        if (response?.error) {
            snackNotify("error")("Thêm yêu thích thất bại");
        } else {
            snackNotify("success")("Thêm yêu thích thành công");
        }
    };

    const handleRemoveFavoriteStoreProduct = async (storeProductId) => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(deleteFavoriteStoreProductAction(storeProductId));
        if (response?.error) {
            snackNotify("error")("Bỏ yêu thích thất bại");
        } else {
            snackNotify("success")("Bỏ yêu thích thành công");
        }
    };
    return (
        <Box className="hover:shadow-custom transition-shadow duration-200  relative rounded-xl overflow-hidden">
            <Box className="cursor-pointer relative" onClick={() => navigate(`/product/details/${product?._id}`)}>
                <Swiper className="product_card-primary_swiper " pagination={true} modules={[PaginationSwipper]}>
                    {product?.productId?.images?.map((image) => (
                        <SwiperSlide key={image?._id} className="swiper-slide_styled bg-inherit">
                            <div className="h-full flex justify-center">
                                <img src={image?.url} alt="product image" className="h-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {product?.discountPrice > 0 && (
                    <div className="absolute right-1 bottom-1 z-10">
                        <ChipStyled label={`Giảm ${product?.discountPrice * 100}%`} color="error" />
                    </div>
                )}
            </Box>
            <Box className="px-5 cursor-pointer" onClick={() => navigate(`/product/details/${product?._id}`)}>
                <p className="text-base line-clamp-2 leading-5 min-h-[40px] font-semibold">{product?.productId?.name}</p>
                <div className="flex text-[#d26426] justify-between items-center">
                    <div className="min-h-[56px]">
                        <div className="text-xl font-bold">
                            {formatPrice(product?.productId?.salePrice * (1 - product?.discountPrice))}
                            <sup>đ</sup>
                        </div>
                        {product?.discountPrice > 0 && (
                            <del className="flex items-centerfont-semibold text-gray-500">
                                <small>₫</small>
                                {formatPrice(product?.productId?.salePrice)}
                            </del>
                        )}
                    </div>
                    {product?.sold > 0 && <p className="text-gray-400">{product.sold} đã bán</p>}
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                    <p className="">
                        Sẵn có: <span className="text-green-500 font-semibold">{product?.stock}</span>
                    </p>
                    <p>{product?.storeId?.address?.city}</p>
                </div>
            </Box>
            <Box className="px-4 pb-4 flex justify-between mt-2">
                <Rating name="read-only" value={product?.rating || 5} readOnly size="small" />
                <Stack direction={"row"} spacing={1}>
                    {favoriteData?.products?.some((f) => f?.storeProduct?._id == product?._id) ? (
                        <Tooltip title="Bỏ yêu thích" placement="top">
                            <Button
                                variant="outlined"
                                sx={{
                                    padding: "3px 12px",
                                    minWidth: "10px",
                                }}
                                size="small"
                                className="btn-product-cart"
                                onClick={() => handleRemoveFavoriteStoreProduct(product?._id)}
                            >
                                <FavoriteIcon fontSize="small" color="error" />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Thêm vào yêu thích" placement="top">
                            <Button
                                variant="outlined"
                                sx={{
                                    padding: "3px 12px",
                                    minWidth: "10px",
                                }}
                                size="small"
                                className="btn-product-cart"
                                onClick={() => handleAddFavoriteStoreProduct(product?._id)}
                            >
                                <FavoriteBorderIcon fontSize="small" />
                            </Button>
                        </Tooltip>
                    )}

                    <Tooltip title="Thêm vào giỏ hàng" placement="top">
                        <Button
                            variant="outlined"
                            sx={{
                                padding: "3px 12px",
                                minWidth: "10px",
                            }}
                            size="small"
                            onClick={() => handleAddToCart(product?._id)}
                        >
                            <AddShoppingCartIcon fontSize="small" />
                        </Button>
                    </Tooltip>
                </Stack>
            </Box>
            <div className="absolute top-3 -left-2 z-10">
                <ChipStyled label={product?.storeId?.name} color="success" />
            </div>
        </Box>
    );
}
