import { useEffect, useState } from "react";
import { getProductsEachCategoryApi } from "../../../apis/category.api";
import useSnackNotify from "../../../components/SnackNotify";
import { Box, Button, Card, CardActions, Divider, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Pagination as PaginationSwipper } from "swiper/modules";
import { formatPrice } from "../../../services/functions";

export default function Categories() {
    const [categoryData, setCategoryData] = useState();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();

    const handleGetData = async () => {
        const response = await getProductsEachCategoryApi();
        if (response?.success) {
            setCategoryData(response);
        } else {
            snackNotify("error")('Lấy thông tin danh mục "Lỗi"');
        }
    };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <div>
            {categoryData?.data?.map((item) => (
                <div key={item?._id}>
                    <Paper className="mb-6">
                        <div className="flex justify-between items-center">
                            <div className="text-xl font-semibold px-4 border-b-2 border-orange-500 py-3">{item?.categoryName}</div>
                            <div className="mr-4">
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    className="na-text-transform-none"
                                    onClick={() => navigate(`/product/category/${item?._id}?skip=0&take=10`)}
                                >
                                    Xem sản phẩm danh mục
                                </Button>
                            </div>
                        </div>
                        <Divider />
                        <div className="p-4">
                            <Swiper
                                slidesPerView={6}
                                spaceBetween={20}
                                pagination={{
                                    clickable: true,
                                }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                className="mySwiper w-full h-auto bg-primary na-px-4"
                                initialSlide={2}
                            >
                                {item?.products?.map((product) => (
                                    <SwiperSlide key={product?._id} className="border-none my-2 shadow-lg shadow-black-500/50">
                                        <Card className="product_card-primary" key={product?._id}>
                                            <Box className="cursor-pointer">
                                                <Swiper className="product_card-primary_swiper " pagination={true} modules={[PaginationSwipper]}>
                                                    {product?.images?.map((image) => (
                                                        <SwiperSlide key={image?._id} className="swiper-slide_styled">
                                                            <div className="h-full flex justify-center">
                                                                <img src={image?.url} alt="product image" className="h-full" />
                                                            </div>
                                                        </SwiperSlide>
                                                    ))}
                                                </Swiper>
                                            </Box>
                                            <Box className="px-5 cursor-pointer">
                                                <p className="font-semibold text-truncate-2 text-lg leading-5 text-left">{product?.name}</p>
                                                <div className="flex text-[#d26426]">
                                                    <div className="text-2xl font-semibold">
                                                        <small>₫</small>
                                                        {formatPrice(product?.salePrice)}
                                                    </div>
                                                </div>
                                            </Box>
                                            <CardActions>
                                                <Button
                                                    component={Link}
                                                    to={`/group-by-product/${product?._id}?skip=0&take=10`}
                                                    variant="contained"
                                                    color="warning"
                                                    size="small"
                                                    className="na-text-transform-none hover:text-white"
                                                >
                                                    Các cửa hàng hiện có
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </Paper>
                </div>
            ))}
        </div>
    );
}
