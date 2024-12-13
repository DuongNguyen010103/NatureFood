import React from "react";
import { TextField, Button, MenuItem, Grid, Box, Card, CardContent, Typography } from "@mui/material";
import "../../../assets/styles/main.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CreateDeliveryYup } from "../../../validations/yup.validations";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { createDeliveryAction } from "../../../hooks/Redux/User/userAction";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import OrderSummary from "../Checkout/OrderSummary";

const states = ["California", "Texas", "New York", "Florida"];
const cities = ["Hồ Chí Minh", "Hà Nội", "Nha Trang"];
const countries = ["USA", "Canada", "Mexico"];

export default function CheckoutForm() {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CreateDeliveryYup),
    });

    const onSubmit = async (data) => {
        console.log(data);
        const response = await dispatch(createDeliveryAction(data));
        if (response?.error) {
            snackNotify("error")("Thêm thông tin giao hàng thất bại");
        } else {
            snackNotify("success")("Thêm thông tin giao hàng thành công");
            reset();
            navigate("/checkout");
        }
    };
    return (
        <section className="pt-5 pb-9">
            <div className="container-small cart" style={{ display: "flex", justifyContent: "space-between" }}>
                <Box width="60%" mr={3}>
                    <h2 className="mb-5 font-bold text-3xl">Thanh toán</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className="mb-5 font-bold text-xl pb-5">Thông tin vận chuyển</h3>

                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <TextField
                                    {...register("ownerName")}
                                    fullWidth
                                    label="Tên người nhận"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.ownerName}
                                    helperText={errors.ownerName?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    {...register("phone")}
                                    fullWidth
                                    label="Số điện thoại"
                                    type="tel"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField {...register("city")} fullWidth label="Thành phố/Tỉnh" variant="outlined" size="small" />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField {...register("district")} fullWidth label="Quận/Huyện" variant="outlined" size="small" />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField {...register("ward")} fullWidth label="Phường/Xã" variant="outlined" size="small" />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    {...register("street")}
                                    fullWidth
                                    label="Địa chỉ chi tiết"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    error={!!errors.street}
                                    helperText={errors.street?.message}
                                />
                            </Grid>
                        </Grid>

                        {/* Buttons */}
                        <Box mt={4} display="flex" justifyContent="flex-start" alignItems="center" size="small">
                            <LoadingButton
                                variant="contained"
                                color="primary"
                                size="small"
                                sx={{ mr: 1 }}
                                type="submit"
                                loading={loading}
                                loadingPosition="center"
                                className="na-text-transform-none"
                            >
                                Xác nhận
                            </LoadingButton>
                            <Button variant="outlined" color="warning" size="small" className="na-text-transform-none">
                                Thoát và không lưu
                            </Button>
                        </Box>
                    </form>
                </Box>

                {/* Summary Section */}
                <div className="w-[30%]">
                    <OrderSummary />
                </div>
            </div>
        </section>
    );
}
