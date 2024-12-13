import React, { useEffect, useState } from "react";
import { Typography, Button, IconButton, TextField, Grid, Avatar, Rating, Paper, Pagination } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import SearchIcon from "@mui/icons-material/Search";

import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

import Menu from "@mui/material/Menu";

import Fade from "@mui/material/Fade";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonNa, ProductCardCustomer } from "../../../components";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { tryCatchWrapper } from "../../../utils/asyncHelper";
import { getStoreById } from "../../../apis/store.api";
import useSnackNotify from "../../../components/SnackNotify";
import { useQuery } from "../../../services/functions";

export default function ShopHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [storeData, setStoreData] = useState();
    const open = Boolean(anchorEl);
    const { storeId } = useParams();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const query = useQuery();
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const items = [
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
        {
            title: "Ảnh của sản phẩm",
            price: "1,709,845₫",
            originalPrice: "2,137,306₫",
            discount: "20% off",
            imgSrc: "/assets/images/",
        },
    ];

    const handlePaginationChange = (event, value) => {
        navigate(`/store/${storeId}?skip=${(value - 1) * params.take}&take=${params.take}`);
    };

    useEffect(() => {
        (async () => {
            const { result, error } = await tryCatchWrapper(getStoreById, { storeId, params });
            if (error) {
                snackNotify("error")("Lấy thông tin cửa hàng thất bại");
            } else {
                console.log("Storeeee: ", result);
                setStoreData(result.data);
            }
        })();
    }, [storeId, params.skip, params.take]);
    return (
        <div className="p-6 bg-gray-100 border-b">
            <Paper className="flex items-center justify-between relative space-x-4 px-4">
                <div className="flex items-center  py-10">
                    <Avatar src={storeData?.store?.image.url} sx={{ width: "70px", height: "70px" }} />
                    <div>
                        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" }}>
                            {storeData?.store?.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`Việt Name, ${storeData?.store?.address?.city}`}
                        </Typography>
                        <div className="flex items-center space-x-1">
                            <Typography variant="body2" sx={{ fontWeight: "bold", color: "purple" }}>
                                Đánh giá người bán
                            </Typography>
                            <Typography variant="body2">• 2,889 lượt bán</Typography>
                            <Rating value={5} readOnly />
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2">
                    {[
                        {
                            icon: <LocalShippingIcon className="text-purple-600" />,
                            title: "Vận chuyển suôn sẻ",
                            subtitle: "Đúng hạn và được theo giỏi",
                        },
                        {
                            icon: <EmailIcon className="text-purple-600" />,
                            title: "Hỗ trợ",
                            subtitle: "Trả lời tin nhắn nhanh chóng",
                        },
                        {
                            icon: <StarBorderIcon className="text-purple-600" />,
                            title: "Đánh giá",
                            subtitle: "Đánh giá trung bình cao hơn 4.8 sao",
                        },
                    ].map((info, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            {info.icon}
                            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {info.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                                {info.subtitle}
                            </Typography>
                        </div>
                    ))}
                    {/* <div className="flex flex-col items-center text-center">
                        <img src="/assets/images/logo.png" alt="Contact Icon" className="w-8 h-8 rounded-full" />
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                            NatureFood
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                            Liên hệ
                        </Typography>
                    </div> */}
                </div>
                <div className="absolute -bottom-5 left-24 ">
                    <ButtonNa color="black" variant="outlined" sx={{ textTransform: "none" }}>
                        Theo dõi cửa hàng
                        <FavoriteIcon />
                    </ButtonNa>
                </div>
            </Paper>

            <div className="pt-10 bg-gray-100">
                <div className="flex w-full space-x-6">
                    {/* Sidebar */}
                    <div className="w-1/4">
                        <Paper className="space-y-4 p-4">
                            <div className="flex justify-between ">
                                <Typography component={Link} to={"/"} sx={{ color: "black" }}>
                                    Mặt hàng
                                </Typography>
                                <Typography component={Link} to={"/"} sx={{ color: "black" }}>
                                    đánh giá
                                </Typography>
                                <Typography component={Link} to={"/"} sx={{ color: "black" }}>
                                    Chính sách của hàng
                                </Typography>
                            </div>
                            <div className="space-y-2">
                                {["Tất cả", "đang bán", "Dấu hiệu"].map((category, idx) => (
                                    <Button
                                        key={idx}
                                        variant="text"
                                        sx={{ justifyContent: "space-between", width: "100%", textTransform: "none", color: "black" }}
                                    >
                                        {category} <span className="ml-auto">704</span>
                                    </Button>
                                ))}
                            </div>
                            <Button variant="contained" sx={{ backgroundColor: "black", color: "white", width: "100%" }}>
                                Yêu cầu đặt hàng tùy chỉnh
                            </Button>
                            <Button variant="outlined" sx={{ width: "100%" }}>
                                Liên hệ với chủ của hàng
                            </Button>
                            <Typography variant="body2" color="textSecondary">
                                2889 mặt hàng
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                1002 lượt thích
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Báo cáo của hàng cho NatureFood
                            </Typography>
                        </Paper>
                    </div>

                    {/* Main Content */}
                    <Paper className="w-3/4 px-4 pb-4">
                        <div className="flex items-center justify-between mb-4 border-b py-4">
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                Các sản phẩm của cửa hàng
                            </Typography>
                            <div className="flex items-center space-x-2">
                                <TextField
                                    variant="outlined"
                                    placeholder="Tìm kiếm "
                                    size="small"
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        ),
                                    }}
                                />
                                <div>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                        sx={{
                                            color: "black",
                                            textTransform: "none",
                                            borderRadius: "20px",

                                            ":hover": {
                                                bgcolor: "#EAEAEA",
                                            },
                                        }}
                                    >
                                        Sắp xếp
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        <MenuItem onClick={handleClose}>Mới nhất</MenuItem>
                                        <MenuItem onClick={handleClose}>Thấp tới cao</MenuItem>
                                        <MenuItem onClick={handleClose}>Cao tới thấp </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <Grid container spacing={2}>
                                {storeData?.product?.products?.map((product, index) => (
                                    <Grid item xs={6} md={3} key={index}>
                                        <ProductCardCustomer product={product} />
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    </Paper>
                </div>
                <Pagination
                    className="pt-6 flex justify-center"
                    count={Math.floor(storeData?.product?.total / parseInt(params.take) + 1)}
                    page={Math.floor(parseInt(params.skip) / parseInt(params.take) + 1) || 1}
                    onChange={handlePaginationChange}
                    color="success"
                />
            </div>
        </div>
    );
}
