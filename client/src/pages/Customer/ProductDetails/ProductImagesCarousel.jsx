import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImagesCarousel({ product }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productIamges p-[10px] "
            >
                {product?.productId?.images?.map((item) => (
                    <SwiperSlide key={item?._id}>
                        <div className="h-full flex justify-center">
                            <img src={item?.url} alt="product image" className="h-full" />
                        </div>
                        {/* <div className="h-full">
                            <img src={item?.url} alt="image store product" className="object-cover" />
                        </div> */}
                    </SwiperSlide>
                ))}

                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={5}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="productIamgesThumbnail bg-[#f3f4f6] mt-4"
            >
                {product?.productId?.images?.map((item) => (
                    <SwiperSlide key={item?._id}>
                        <div className="h-full flex justify-center">
                            <img src={item?.url} alt="product image" className="h-full" />
                        </div>
                    </SwiperSlide>
                ))}
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
