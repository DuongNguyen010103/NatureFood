import { Box, Button, Rating, Stack, Typography, Tab, Divider, Avatar, IconButton, Tooltip, Paper, Grid } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ProductImagesCarousel from "./ProductImagesCarousel";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuantitySelector from "../../../components/QuantitySelector";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { TabList, TabPanel, TabContext } from "@mui/lab";
import DetailsTab from "./DetailsTab";
import ReviewTab from "./ReviewTab";
import { getStoreProductApi } from "../../../apis/product.store";
import { formatPrice } from "../../../services/functions";
import { ChipStyled, QuantityInput } from "../../../components";
import { createCartItemAction } from "../../../hooks/Redux/Cart/cartAction";
import useSnackNotify from "../../../components/SnackNotify";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { addFavoriteStoreProductAction, deleteFavoriteStoreProductAction } from "../../../hooks/Redux/Favorite/favoriteAction";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const ProductDetail = () => {
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [valueTab, setValueTab] = useState("2");
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { storeProductId } = useParams();
    const { currentUser, token } = useSelector((state) => state.user);
    const { data: favoriteData } = useSelector((state) => state.favorite);

    const createStoreCartItem = async () => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(createCartItemAction({ storeProduct: product?._id, quantity }));
        if (response?.error) {
            snackNotify("error")("Thêm sản phẩm vào giỏ hàng thất bại");
        } else {
            snackNotify("success")("Đã thêm sản phẩm vào giỏ hàng");
        }
    };

    const handleAddFavoriteStoreProduct = async () => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(addFavoriteStoreProductAction(product?._id));
        if (response?.error) {
            snackNotify("error")("Thêm yêu thích thất bại");
        } else {
            snackNotify("success")("Thêm yêu thích thành công");
        }
    };

    const handleRemoveFavoriteStoreProduct = async () => {
        if (!token) {
            snackNotify("error")("Bạn phải ĐĂNG NHẬP để sử dụng chức năng này");
            return;
        }
        const response = await dispatch(deleteFavoriteStoreProductAction(product?._id));
        if (response?.error) {
            snackNotify("error")("Bỏ yêu thích thất bại");
        } else {
            snackNotify("success")("Bỏ yêu thích thành công");
        }
    };

    const handleGetData = async () => {
        const response = await getStoreProductApi(storeProductId);
        setProduct(response?.data);
        console.log(response);
    };
    useEffect(() => {
        handleGetData();
    }, [storeProductId]);

    const handleTabChange = (event, newValue) => {
        setValueTab(newValue);
    };
    return (
        <Box>
            <Paper className="flex p-4 space-x-6">
                <Box className="w-1/2 relative">
                    <ProductImagesCarousel product={product} />
                    <div className="absolute top-1 z-10 right-11">
                        {favoriteData?.products?.some((f) => f.storeProduct._id == product?._id) ? (
                            <Tooltip title="Bỏ yêu thích">
                                <IconButton color="error" size="small" onClick={handleRemoveFavoriteStoreProduct} sx={{ outline: "1px solid red" }}>
                                    <FavoriteOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Thêm yêu thích">
                                <IconButton
                                    color="error"
                                    size="small"
                                    onClick={handleAddFavoriteStoreProduct}
                                    sx={{ ":hover": { outline: "1px solid red" } }}
                                >
                                    <FavoriteBorderOutlinedIcon fontSize="medium" />
                                </IconButton>
                            </Tooltip>
                        )}
                    </div>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Box className="w-1/2">
                    <Typography component="h2" variant="h5" sx={{ fontWeight: "bold" }}>
                        {product?.productId?.name}
                    </Typography>
                    <Stack direction={"row"} sx={{ mt: 1 }}>
                        <Rating name="size-small" value={5} readOnly size="small" className="flex items-center mr-2 " />
                        <span>(5.0)</span>
                    </Stack>
                    <div className="flex text-[#d26426] items-center">
                        <div>
                            <div className="text-2xl font-bold">
                                {formatPrice(product?.productId.salePrice * (1 - product?.discountPrice))}
                                <sup>đ</sup>
                            </div>
                            {product?.discountPrice > 0 && (
                                <del className="flex items-center ml-3 font-semibold text-gray-500">
                                    <small>₫</small>
                                    {formatPrice(product?.productId.salePrice)}
                                </del>
                            )}
                        </div>
                        {product?.discountPrice > 0 && <ChipStyled label={`Giảm ${product?.discountPrice * 100}%`} color="error" className="ml-3" />}
                    </div>

                    <hr className="my-4" />
                    <Stack direction={"row"}>
                        <Box sx={{ flex: 1 }}>
                            {/* <Typography variant="body1">Kiểu đóng gói</Typography>
                            <Stack direction={"row"} spacing={1} sx={{ mt: 1 }}>
                                <Button size="small" sx={{ textTransform: "none" }} variant="contained" color="warning">
                                    Chai
                                </Button>
                                <Button size="small" sx={{ textTransform: "none" }} variant="contained" color="warning">
                                    Lo
                                </Button>
                                <Button size="small" sx={{ textTransform: "none" }} variant="contained" color="warning">
                                    Gói
                                </Button>
                            </Stack> */}
                            <Typography variant="body1" gutterBottom>
                                Đã bán
                            </Typography>
                            <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
                                {product?.sold}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body1" gutterBottom>
                                Trọng lượng
                            </Typography>
                            <Typography variant="h6" component="h4" sx={{ fontWeight: "bold" }}>
                                500g / chai
                            </Typography>
                        </Box>
                    </Stack>
                    <hr className="my-4" />

                    <Box>
                        <Typography variant="body1" gutterBottom>
                            <strong>Bạn cần nó</strong> - hãy thêm vào giỏ hàng của bạn
                        </Typography>
                        <div className="flex">
                            <QuantityInput
                                quanity={quantity}
                                handleReduce={() => {
                                    quantity > 1 && setQuantity(quantity - 1);
                                }}
                                handleIncrease={() => {
                                    quantity < product?.stock && setQuantity(quantity + 1);
                                }}
                                className={"mr-3"}
                            />
                            <Button
                                variant="contained"
                                color="warning"
                                startIcon={<AddShoppingCartIcon />}
                                size="small"
                                className="na-text-transform-none ml-2"
                                onClick={createStoreCartItem}
                            >
                                Thêm vào giỏ hàng
                            </Button>
                        </div>
                    </Box>
                </Box>
            </Paper>

            <Paper className="p-4 mt-4">
                <div className="flex items-center">
                    <Avatar src={product?.storeId.image.url} sx={{ height: "62px", width: "62px" }} />
                    <div className="ml-4">
                        <p className="text-lg font-semibold">{product?.storeId?.name}</p>
                        <p className="text-sm text-gray-500">Hồ Chí Minh</p>
                        <div className="flex space-x-3 mt-2 mr-6">
                            <Button
                                variant="outlined"
                                color="success"
                                size="small"
                                startIcon={<QuestionAnswerOutlinedIcon />}
                                className="na-text-transform-none"
                            >
                                Nhắn tin
                            </Button>
                            <Button
                                variant="outlined"
                                color="info"
                                size="small"
                                startIcon={<StorefrontOutlinedIcon />}
                                className="na-text-transform-none"
                                onClick={() => navigate(`/store/${product?.storeId?._id}?skip=0&take=10`)}
                            >
                                Xem cửa hàng
                            </Button>
                        </div>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div className="ml-6 flex-1">
                        <Grid container spacing={5}>
                            <Grid item md={4}>
                                <div>
                                    <div className="flex justify-between ">
                                        <p className="text-gray-400">Đánh giá</p>
                                        <p className="text-green-600">3 004</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-400">Sản phẩm</p>
                                        <p className="text-green-600">106</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={4}>
                                <div>
                                    <div className="flex justify-between ">
                                        <p className="text-gray-400">Tỉ lệ phản hồi</p>
                                        <p className="text-green-600">98%</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-400">Thời gian phản hồi</p>
                                        <p className="text-green-600">trong vài giờ</p>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={4}>
                                <div>
                                    <div className="flex justify-between ">
                                        <p className="text-gray-400">Tham gia</p>
                                        <p className="text-green-600">2 tháng trước</p>
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <p className="text-gray-400">Người theo dõi</p>
                                        <p className="text-green-600">106</p>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>

            <Paper className="mt-4">
                <TabContext value={valueTab}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                            <Tab label="Chi tiết sản phẩm" value="1" sx={{ flex: 1 }} />
                            <Tab label="Xếp hạng & đánh giá" value="2" sx={{ flex: 1 }} />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <DetailsTab product={product} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ReviewTab product={product} />
                    </TabPanel>
                </TabContext>
            </Paper>
        </Box>
    );
};

export default ProductDetail;
