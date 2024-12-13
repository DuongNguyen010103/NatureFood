import { Card, Grid, Rating, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductsAction } from "../../../hooks/Redux/Product/productAction";
import { useQuery } from "../../../services/functions";

//import Button from "@mui/material/Button";
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from "swiper/modules";
import { formatPrice } from "../../../services/functions";
import useSnackNotify from "../../../components/SnackNotify";

const Index = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const { data: productData, loading: productLoading } = useSelector((state) => state.product);

    useEffect(() => {
        const params = {
            skip: query.get("skip"),
            take: query.get("take"),
            type: query.get("type"),
        };
        dispatch(getProductsAction(params));
    }, [query.get("skip"), query.get("take"), query.get("type")]);
    return (
        <Box sx={{ width: "100%" }}>
            <Grid container spacing={2}>
                {productData?.products?.map((product) => (
                    <Grid item md={3} key={product?._id}>
                        <Card className="product_card-primary">
                            <Box>
                                <Swiper className="product_card-primary_swiper " pagination={true} modules={[Pagination]}>
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
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
export default Index;
