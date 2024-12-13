import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBannersAction } from "../../../hooks/Redux/Banner/bannerAction";

import CategoryCarousel from "./CategoryCarousel";
import NewProductSection from "./NewProductsSection";
import BlogCarousel from "./BlogCarousel";
import { NavLink, useNavigate } from "react-router-dom";
import BestSeller from "./BestSeller";
import { ButtonNa } from "../../../components";

const Index = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: bannerData, loading: bannerLoading } = useSelector((state) => state.banner);

    useEffect(() => {
        dispatch(getBannersAction({ skip: 0, take: 10, type: "enable" }));
    }, []);
    return (
        <Box className="relative">
            <section>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    loop={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper rounded-md"
                >
                    {bannerData?.banners?.map((banner, index) => (
                        <SwiperSlide key={`swipperSlide-${index}`} className="text-black bg-white">
                            <div className="w-full h-[400px]">
                                <img src={banner.image.url} alt="banner image" className="object-cover w-full h-full" />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="flex space-x-4 h-[300px] mt-4">
                    <div className="w-1/2 h-full bg-[url('/assets/images/bg-register-seller.jpg')] rounded-lg bg-center bg-cover bg-no-repeat flex flex-col  justify-center pl-14">
                        <p className="text-white text-2xl font-bold leading-normal">
                            <span className="text-green-600">Giảm 10%</span> với tất cả <br /> các đơn hàng trên{" "}
                            <span className="text-orange-600">100.000 vnđ</span>
                        </p>
                        <div className="mt-2">
                            <ButtonNa disabled className="na-text-transform-none">
                                Xem ngay
                            </ButtonNa>
                        </div>
                    </div>
                    <div className="w-1/2 h-full bg-[url('/assets/images/free-ship.png')] rounded-lg bg-center bg-cover bg-no-repeat flex flex-col items-end  justify-end pr-14">
                        <p className="text-inherit text-2xl font-bold leading-normal">
                            <span className="text-orange-600">Miễn phí vận chuyển</span> <br /> các đơn hàng
                            <span className="text-green-600">&nbsp;dưới 2km</span>
                        </p>
                        <div className="mt-2 opacity-70">
                            <ButtonNa className="na-text-transform-none">
                                <NavLink to={"/cart?skip=0&take=10"}>Mua sắm ngay</NavLink>
                            </ButtonNa>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-6 mt-6">
                <div className="flex flex-col items-center mb-3">
                    <p className="text-3xl font-bold mr-2">Sản phẩm mới nhất</p>
                    <p className="w-1/2 text-slate-500 text-md text-center test-bg">
                        Hãy khám phá bộ sưu tập gia vị mới nhất của chúng tôi để nâng tầm bữa ăn của bạn!
                    </p>
                </div>
                <BestSeller />
            </section>
            <section className="py-6 px-3  bg-[#FFF7ED] rounded-md mt-6">
                <div className="flex  flex-col items-center mb-3">
                    <Box className="flex justify-center">
                        <div className="flex items-center">
                            <p className="text-3xl font-bold mr-2">Danh mục</p>
                            <img src="/src/assets/icons/icon_fire.png" alt="icon fire" width="22px" className="h-7" />
                        </div>
                    </Box>
                    <p className="w-1/2 text-slate-500 text-md text-center">Hãy khám phá và thêm gia vị sạch vào bữa ăn của bạn ngay hôm nay!</p>
                </div>
                <CategoryCarousel />
            </section>

            <section className="py-6 mt-6">
                <div className="flex flex-col items-center mb-3">
                    <p className="text-3xl font-bold mr-2">Sản phẩm mới nhất</p>
                    <p className="w-1/2 text-slate-500 text-md text-center test-bg">
                        Hãy khám phá bộ sưu tập gia vị mới nhất của chúng tôi để nâng tầm bữa ăn của bạn!
                    </p>
                </div>
                <NewProductSection />
            </section>

            <section className="py-6 mt-6 px-3 bg-[#FFF7ED] rounded-md">
                <Box className="flex justify-between items-center">
                    <p className="text-3xl font-bold mr-2 w-1/3">Những bài viết hữu ích và thú vị</p>
                    <p className="w-1/2 text-slate-500 text-md">
                        Những bài viết thú vị về ẩm thực của chúng tôi, nơi khám phá mối liên hệ giữa gia vị, ẩm thực và văn hóa xung quanh!
                    </p>
                </Box>
                <BlogCarousel />
            </section>

            <Box className="bg-[url('/assets/images/bg-shopping-with-naturefood.jpg')] bg-cover bg-center mt-6 rounded-md">
                <Box className="px-16 py-20">
                    <p className="text-3xl font-bold mr-2 w-2/3 mb-3">Cùng Nature Food đưa đến các gia vị ngon-sạch-mới-lạ đến các gia đình Việt</p>
                    <p className="w-1/2 text-slate-500 text-md mb-3">Tham gia bán hàng cùng Nature Food</p>
                    <Button variant="contained" color="warning" onClick={() => navigate("/register-seller")}>
                        Đăng ký
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default Index;
