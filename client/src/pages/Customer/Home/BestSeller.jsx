import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBestSellerAction } from "../../../hooks/Redux/StoreProduct/storeProductAction";
import { ProductCardCustomer } from "../../../components";

const BestSeller = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { bestSeller, loading } = useSelector((state) => state.storeProduct);

    useEffect(() => {
        dispatch(getBestSellerAction());
    }, []);
    return (
        <div>
            <Swiper
                slidesPerView={6}
                spaceBetween={20}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper w-full h-auto na-p-4 "
            >
                {bestSeller?.map((product) => (
                    <SwiperSlide key={product?._id} className="border-none my-2 shadow-lg shadow-black-500/50 rounded-xl">
                        <ProductCardCustomer product={product} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
export default BestSeller;
