import { useParams } from "react-router-dom";
import { useQuery } from "../../../services/functions";
import useSnackNotify from "../../../components/SnackNotify";
import { getStoreProductsByProductApi } from "../../../apis/product.store";
import { useEffect, useState } from "react";
import { Box, Button, Grid, MenuItem, Pagination, Paper, Select } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProductCardCustomer } from "../../../components";

const productsEachPage = 10;

export default function GroupByProduct() {
    const { productId } = useParams();
    const query = useQuery();
    const snackNotify = useSnackNotify();
    const [productData, setProductData] = useState();
    const navigate = useNavigate();

    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
        price: query.get("price"),
        date: query.get("date"),
        discount: query.get("discount"),
    };

    const handlePaginationChange = (event, value) => {
        navigate(
            `/group-by-product/${productId}?skip=${(value - 1) * productsEachPage}&take=${productsEachPage}&date=${params.date}&price=${
                params.price
            }&discount=${params.discount}`
        );
    };

    const handleGetData = async () => {
        const response = await getStoreProductsByProductApi(productId);
        console.log(response);
        if (response?.success) {
            setProductData(response.data);
        } else {
            snackNotify("error")("Lỗi khi lấy danh sách sản phẩm");
        }
    };
    useEffect(() => {
        handleGetData();
    }, [productId, params.skip, params.take, params.price, params.discount, params.date]);

    return (
        <Box>
            <Paper className="p-4">
                <div className="flex justify-between items-center">
                    <p>
                        Hiển thị&nbsp;
                        <strong className="text-orange">{productsEachPage > productData?.total ? productData?.total : productsEachPage}</strong>
                        &nbsp;trong&nbsp;
                        <strong className="text-green-700">{productData?.total}</strong>&nbsp;sản phẩm
                    </p>
                    <div className="flex space-x-2 items-center">
                        <p className=" text-gray-600">Sắp xếp theo:</p>
                        <Button
                            variant={params.date == "-1" ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            onClick={() =>
                                navigate(
                                    `/group-by-product/${productId}&take=${params.take}&date=${params.date == "-1" ? 1 : -1}&price=${
                                        params.price
                                    }&discount=${params.discount}`
                                )
                            }
                        >
                            Mới nhất
                        </Button>
                        {/* <Button
                            variant={params.discount == "1" ? "contained" : "outlined"}
                            size="small"
                            color="success"
                            onClick={() =>
                                navigate(
                                    `/group-by-product/${productId}&take=${params.take}&date=${params.date}&price=${params.price}&discount=${
                                        params.discount == "1" ? 0 : 1
                                    }`
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
                                    `/group-by-product/${productId}&take=${params.take}&date=${params.date}&price=${e.target.value}&discount=${params.discount}`
                                )
                            }
                            sx={{ minWidth: "140px" }}
                        >
                            <MenuItem value={-1}>Giá giảm dần</MenuItem>
                            <MenuItem value={1}>Giá tăng dần</MenuItem>
                        </Select> */}
                    </div>
                </div>
            </Paper>
            <section className="mt-4">
                <Grid container spacing={2}>
                    {productData?.products?.map((product) => (
                        <Grid item xs={6} md={2} key={product?._id}>
                            <ProductCardCustomer product={product} />
                        </Grid>
                    ))}
                </Grid>
            </section>
            <Pagination
                className="pt-6 flex justify-center"
                count={Math.floor(productData?.total / productsEachPage + 1)}
                page={Math.floor(query.get("skip") / productsEachPage + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </Box>
    );
}
