import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Grid } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { getNewestProductsAction } from "../../../hooks/Redux/Product/productAction";
import { Link } from "react-router-dom";

const NewProductSection = () => {
    const dispatch = useDispatch();
    const { data: newestProductsData, loading: newestProductsLoading } = useSelector((state) => state.newestProducts);

    useEffect(() => {
        dispatch(getNewestProductsAction());
    }, []);
    return (
        <div>
            <Swiper
                slidesPerView={3}
                grid={{
                    rows: 2,
                    fill: "row",
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Grid, Pagination]}
                className="mySwiperGrid"
            >
                {newestProductsData?.map((product) => (
                    <SwiperSlide key={product?._id} className="rounded-lg bg-white overflow-hidden border-solid shadow-lg shadow-blue-500/50">
                        <Box className="flex p-4 max-h-[200px] w-full bg-gray-300">
                            <Box className="w-1/3 bg-white rounded-md flex justify-center">
                                <img src={product?.images?.[0]?.url} alt="newest product" className="h-full" />
                            </Box>

                            <Box className="w-2/3 ml-4">
                                <Typography
                                    component="p"
                                    variant="h6"
                                    sx={{
                                        fontWeight: "bold",
                                        textAlign: "left",
                                        color: "black",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        WebkitLineClamp: 2,
                                        lineClamp: 2,
                                        height: "2.8em",
                                        lineHeight: 1.4,
                                        mt: 2,
                                    }}
                                >
                                    {product?.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        textAlign: "left",
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        WebkitLineClamp: 2,
                                        lineClamp: 2,
                                        height: "3em",
                                        mt: 1,
                                    }}
                                >
                                    {product?.description}
                                </Typography>
                                <Box className="flex justify-between mt-2">
                                    <Button
                                        component={Link}
                                        to={`/group-by-product/${product?._id}?skip=0&take=10`}
                                        startIcon={<ListAltIcon color="white" />}
                                        variant="contained"
                                        color="success"
                                        size="middle"
                                        className="hover:text-white na-text-transform-none"
                                    >
                                        Các cửa hàng hiện có
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default NewProductSection;
