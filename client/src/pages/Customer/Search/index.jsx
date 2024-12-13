import { searchCustomerAction } from "../../../hooks/Redux/StoreProduct/storeProductAction";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { useEffect } from "react";
import { Box, Button, Card, CardMedia, Grid, MenuItem, Pagination, Paper, Select } from "@mui/material";
import { useQuery } from "../../../services/functions";
import { Nodata, ProductCardCustomer } from "../../../components";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination as PaginationSwiper } from "swiper/modules";

const productsEachPage = 10;

export default function Search() {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const query = useQuery();
    const { search: searchData, loading: searchLoading } = useSelector((state) => state.storeProduct);
    const params = {
        keyword: query.get("keyword"),
        skip: query.get("skip"),
        take: query.get("take"),
        date: query.get("date"),
        price: query.get("price"),
        discount: query.get("discount"),
    };

    const handlePaginationChange = (event, value) => {
        navigate(
            `/search?keyword=${params.keyword}&skip=${(value - 1) * productsEachPage}&take=${productsEachPage}&date=${params.date}&price=${
                params.price
            }&discount=${params.discount}`
        );
    };

    useEffect(() => {
        (async () => {
            const response = await dispatch(searchCustomerAction(params));
            console.log(response);

            if (response?.error) {
                snackNotify("error")("Tìm sản phẩm thất bại");
            }
        })();
    }, [params.skip, params.take, params.keyword, params.date, params.price, params.discount]);
    return (
        <Box>
            <Paper className="p-4 mb-4">
                <div className="flex justify-between items-center">
                    <p>
                        Kết quả tìm kiếm: "<strong className="text-green-600">{params.keyword}</strong>"
                    </p>
                    <div className="flex space-x-2 items-center">
                        <p className=" text-gray-600">Sắp xếp theo:</p>
                        <Button
                            variant={params.date == "-1" ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            onClick={() =>
                                navigate(
                                    `/search?keyword=${params.keyword}&skip=${params.skip}&take=${productsEachPage}&date=${
                                        params.date == "-1" ? 1 : -1
                                    }&price=${params.price}&discount=${params.discount}`
                                )
                            }
                        >
                            Mới nhất
                        </Button>
                        <Button
                            variant={params.discount == "1" ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            onClick={() =>
                                navigate(
                                    `/search?keyword=${params.keyword}&skip=${params.skip}&take=${productsEachPage}&date=${params.date}&price=${
                                        params.price
                                    }&discount=${params.discount == "1" ? 0 : 1}`
                                )
                            }
                        >
                            Khuyến mãi
                        </Button>
                        <Select
                            variant="standard"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={params.price}
                            size="small"
                            onChange={(e) =>
                                navigate(
                                    `/search?keyword=${params.keyword}&skip=${params.skip}&take=${productsEachPage}&date=${params.date}&price=${e.target.value}&discount=${params.discount}`
                                )
                            }
                            sx={{ minWidth: "140px" }}
                        >
                            <MenuItem value={-1}>Giá giảm dần</MenuItem>
                            <MenuItem value={1}>Giá tăng dần</MenuItem>
                        </Select>
                    </div>
                </div>
            </Paper>
            <section>
                <Paper className="p-4">
                    <div className="text-xl font-bold mb-3  flex">
                        <div className=" border-b-2 border-green-600 pr-6">Sản phẩm</div>
                    </div>
                    {searchData?.product?.total != 0 ? (
                        <Grid container spacing={2}>
                            {searchData?.product?.products?.map((product) => (
                                <Grid item xs={6} md={2} key={product?._id}>
                                    <ProductCardCustomer product={product} />
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Nodata content={`Không tìm thấy sản phẩm nào cho từ khóa "${params.keyword}"`} />
                    )}
                </Paper>
            </section>
            {searchData?.categories?.length > 0 && (
                <section className="mt-4">
                    <Paper className=" p-4">
                        <div className="text-xl font-bold mb-3  flex">
                            <div className=" border-b-2 border-green-600 pr-6">Danh mục</div>
                        </div>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[PaginationSwiper, Navigation]}
                            className="mySwiper w-full h-auto bg-primary na-px-4"
                        >
                            {searchData?.categories?.map((item) => (
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
                    </Paper>
                </section>
            )}

            {searchData?.stores?.length > 0 && (
                <section className="mt-4">
                    <Paper className=" p-4">
                        <div className="text-xl font-bold mb-3  flex">
                            <div className=" border-b-2 border-green-600 pr-6">Cửa hàng</div>
                        </div>
                        <Swiper
                            slidesPerView={6}
                            spaceBetween={30}
                            pagination={{
                                clickable: true,
                            }}
                            navigation={true}
                            modules={[PaginationSwiper, Navigation]}
                            className="mySwiper w-full h-auto bg-primary na-px-4"
                        >
                            {searchData?.stores?.map((item) => (
                                <SwiperSlide key={item?._id} className="border-none my-2 shadow-lg shadow-black-500/50">
                                    <Card className="w-full cursor-pointer" onClick={() => navigate(`/store/${item?._id}`)}>
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
                    </Paper>
                </section>
            )}

            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(searchData?.product?.total / productsEachPage + 1)}
                page={Math.floor(params.skip / productsEachPage + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </Box>
    );
}
