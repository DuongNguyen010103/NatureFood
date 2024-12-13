import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../hooks/Redux/Category/categoryAction";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: categoryData, loading: categoryLoading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(getCategoriesAction());
    }, []);
    return (
        <div>
            <Swiper
                slidesPerView={6}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper w-full h-auto"
            >
                {categoryData?.categories?.map((item) => (
                    <SwiperSlide key={item?._id} className="border-none my-2 shadow-lg shadow-black-500/50">
                        <Card className="w-full cursor-pointer" onClick={() => navigate(`/product/category/${item?._id}?skip=0&take=10`)}>
                            <CardMedia
                                component="img"
                                style={{ height: 200, width: "100%", objectFit: "cover" }}
                                image={item?.image?.url}
                                alt="category img"
                            />
                            <div className="px-4 py-2">
                                <p className="line-clamp-1 text-xl text-left">{item?.name}</p>
                            </div>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default CategoryCarousel;
