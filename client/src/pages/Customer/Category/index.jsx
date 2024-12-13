import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "../../../services/functions";
import { useEffect, useState } from "react";
import { getStoreProductsByCategoryApi } from "../../../apis/product.store";
import { Box, Button, Card, Grid, Rating, Stack, Tooltip, Typography, Pagination, Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination as PaginationSwipper } from "swiper/modules";
import { formatPrice } from "../../../services/functions";
import { ChipStyled, Nodata } from "../../../components";
import useSnackNotify from "../../../components/SnackNotify";
import CategoryIcon from "@mui/icons-material/Category";

const productsEachPage = 10;

export default function Cartegory() {
    const [productData, setProductData] = useState({ category: null, products: [], total: 0 });
    const query = useQuery();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
    };

    const handlePaginationChange = (event, value) => {
        navigate(`/product/category/${categoryId}?skip=${(value - 1) * params.take}&take=${params.take}`);
    };

    const handleGetData = async () => {
        const data = {
            categoryId: categoryId,
            params: {
                skip: query.get("skip"),
                take: query.get("take"),
            },
        };
        const response = await getStoreProductsByCategoryApi(data);
        console.log(response);

        if (!response?.success) {
            snackNotify("error")('Lấy danh sách sản phẩm "Lỗi"');
        } else {
            setProductData(response.data);
        }
    };

    useEffect(() => {
        handleGetData();
    }, [useParams().categoryId, query.get("skip"), query.get("take")]);
    return (
        <Box>
            <Box component={Paper} className=" p-[20px] flex justify-between items-center mb-3">
                <Typography variant="body1">
                    Sản phẩm cho danh mục: <strong>{productData?.category?.name}</strong>
                </Typography>
                <div className="flex items-center">
                    <Button
                        component={Link}
                        to="/categories"
                        variant="outlined"
                        color="success"
                        endIcon={<CategoryIcon />}
                        size="small"
                        className="hover:text-white mr-1 na-text-transform-none"
                    >
                        Tất cả danh mục
                    </Button>
                </div>
            </Box>
            {productData?.total == 0 ? (
                <Nodata content={"Không có sản phẩm nào trong danh mục"} />
            ) : (
                <Box>
                    <Grid container spacing={2}>
                        {productData?.products?.map((product) => (
                            <Grid item xs={6} md={2} key={product?._id}>
                                <Box
                                    key={product?._id}
                                    className=" hover:shadow-custom transition-shadow duration-200  relative rounded-xl overflow-hidden"
                                >
                                    <Box className="cursor-pointer border rounded-xl" onClick={() => navigate(`/product/details/${product?._id}`)}>
                                        <Swiper className="product_card-primary_swiper " pagination={true} modules={[PaginationSwipper]}>
                                            {product?.rootProduct?.images?.map((image) => (
                                                <SwiperSlide key={image?._id} className="swiper-slide_styled">
                                                    <div className="h-full flex justify-center">
                                                        <img src={image?.url} alt="product image" className="h-full" />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                    <Box className="px-5 cursor-pointer" onClick={() => navigate(`/product/details/${product?._id}`)}>
                                        <p className="text-base line-clamp-2 leading-5 min-h-[40px] font-semibold">{product?.rootProduct?.name}</p>

                                        <div className="flex text-[#d26426] justify-between items-center">
                                            <div className="min-h-[56px]">
                                                <div className="text-xl font-bold">
                                                    {formatPrice(product?.rootProduct?.salePrice * (1 - product?.discountPrice))}
                                                    <sup>đ</sup>
                                                </div>
                                                {product?.discountPrice > 0 && (
                                                    <del className="flex items-centerfont-semibold text-gray-500">
                                                        <small>₫</small>
                                                        {formatPrice(product?.rootProduct?.salePrice)}
                                                    </del>
                                                )}
                                            </div>
                                            {product?.discountPrice > 0 && (
                                                <ChipStyled label={`Giảm ${product?.discountPrice * 100}%`} color="error" />
                                            )}
                                        </div>
                                        <Typography variant="body2" sx={{ color: "text.secondary", my: 1 }}>
                                            Stock: <span className="text-green-500 font-semibold">{product?.stock}</span>
                                        </Typography>
                                    </Box>
                                    <Box className="px-4 pb-4 flex justify-between">
                                        <Rating name="read-only" value={product?.rating || 4} readOnly />
                                    </Box>
                                    <div className="absolute top-3 -left-2 z-10">
                                        <ChipStyled label={product?.store?.name} color="success" />
                                    </div>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                    <Pagination
                        className="pt-6 flex justify-center"
                        count={Math.floor(productData?.total / parseInt(params.take) + 1)}
                        page={Math.floor(params.skip / parseInt(params.take) + 1)}
                        onChange={handlePaginationChange}
                        color="success"
                    />
                </Box>
            )}
        </Box>
    );
}
