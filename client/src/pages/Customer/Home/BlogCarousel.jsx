import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { getBlogsAction } from "../../../hooks/Redux/Blog/blogAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function BlogCarousel() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: blogData } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(getBlogsAction({ skip: 0, take: 10, type: "enable" }));
    }, []);
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            freeMode={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[FreeMode, Pagination, Navigation]}
            className="mySwiper w-full px-2 py-4 h-auto"
        >
            {blogData?.blogs?.map((blog) => (
                <SwiperSlide key={blog?._id} className="border-none cursor-pointer" onClick={() => navigate(`/blog/${blog?.slug}`)}>
                    <Card sx={{}} className="w-full">
                        <CardMedia component="img" style={{ height: 240, objectFit: "cover" }} image={blog?.image?.url} title="blog img" />
                        <CardContent>
                            <Typography variant="h6" component="div" textAlign="left" noWrap sx={{ fontWeight: "bold" }}>
                                {blog?.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary",
                                    display: "-webkit-box",
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    WebkitLineClamp: 3,
                                    lineClamp: 3,
                                    height: "4.2em",
                                    textAlign: "left",
                                }}
                            >
                                {blog?.excerpt}
                            </Typography>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
