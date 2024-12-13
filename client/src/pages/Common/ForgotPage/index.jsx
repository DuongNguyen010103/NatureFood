import React, { useState } from "react";
import { TextField, Button, Typography, Link, Box, Grid, Container, Paper } from "@mui/material";
import { Link as LinkRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ForgotYup } from "../../../validations/yup.validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordApi, forgotPasswordConfirmOTPApi } from "../../../apis/user.apis";
import LoadingButton from "@mui/lab/LoadingButton";
import useSnackNotify from "@components/SnackNotify";
import OtpInput from "react-otp-input";
import { tryCatchWrapper } from "../../../utils/asyncHelper";

const ForgotPage = () => {
    const [loading, setLoading] = useState(false);
    const [sentOTP, setSentOTP] = useState(false);
    const [otpInput, setOtpInput] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const snackNotify = useSnackNotify();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(ForgotYup),
    });

    const onSubmit = async (data) => {
        if (sentOTP) {
            if (formData.password != formData.confirmPassword) {
                return snackNotify("error")("Mật khẩu phải giống Mật khẩu xác thực");
            }
            setLoading(true);
            const { result, error } = await tryCatchWrapper(forgotPasswordConfirmOTPApi, { ...data, ...formData, OTP: otpInput });
            setLoading(false);
            if (result) {
                snackNotify("success")("Mật khẩu của bạn đã được thay đổi");
                setSentOTP(true);
                reset();
            } else {
                snackNotify("error")("Lỗi, Mã OTP không đúng");
            }
        } else {
            setLoading(true);
            const { result, error } = await tryCatchWrapper(forgotPasswordApi, data);
            setLoading(false);
            console.log(result, error);
            if (result) {
                snackNotify("success")("Gửi OTP thành công");
                setSentOTP(true);
            } else {
                snackNotify("error")("Email của bạn chưa được đăng ký");
            }
        }
    };
    return (
        <Box className="min-h-[100vh]  grid place-items-center bg-[url('/assets/images/bg-login.jpg')]">
            <Paper className="w-[60%]">
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={5}
                        className="bg-[url('/assets/images/bg-login-naturefood.jpg')] bg-center bg-cover bg-no-repeat rounded-l-md"
                    >
                        <Box sx={{ textAlign: "center", padding: 4 }}>
                            <Box component={LinkRouter} to="/" className="flex justify-center mb-6">
                                <img src="/assets/images/logo.png" alt="Logo" className="w-[80px] " />
                            </Box>

                            <Typography
                                variant="body1"
                                sx={{
                                    color: "white",
                                    mb: 3,
                                    paddingBottom: "130px",
                                }}
                            >
                                Nature Food cung cấp gia vị thiên nhiên chất lượng, an toàn, giúp bữa ăn thêm ngon và bảo vệ sức khỏe người dùng !
                            </Typography>
                            {/* Footer */}

                            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                <Link href="#" sx={{ color: "white" }}>
                                    Điều khoản{" "}
                                </Link>{" "}
                                và{" "}
                                <Link href="#" sx={{ color: "white" }}>
                                    Dịch vụ
                                </Link>
                                .
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Side: Account Login Form */}
                    <Grid item xs={12} md={6} lg={7} style={{ padding: "2rem" }}>
                        <Box className="font-bold text-center">
                            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                                Quên mật khẩu
                            </Typography>
                        </Box>
                        <span>Nhập mail đăng ký tài khoản của bạn</span>
                        {/* Login Form */}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextField
                                {...register("email")}
                                fullWidth
                                type="email"
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                size="small"
                                error={!!errors.email}
                                helperText={errors?.email?.message}
                            />
                            {sentOTP && (
                                <div>
                                    <p>Mã otp đã được gửi, Vui lòng kiểm tra email và điền mã OTP được kèm theo vào bên dưới để tiếp tục</p>
                                    <div className="flex justify-center items-center my-5">
                                        <OtpInput
                                            value={otpInput}
                                            onChange={setOtpInput}
                                            numInputs={6}
                                            renderSeparator={<span className="mx-2 text-2xl">-</span>} // Dấu phân cách
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    className="text-2xl text-center border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500 transition duration-200"
                                                    maxLength={1} // Đảm bảo chỉ nhập một ký tự
                                                />
                                            )}
                                        />
                                    </div>
                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Mật khẩu mới"
                                        variant="outlined"
                                        margin="normal"
                                        size="small"
                                        name="password"
                                        onChange={handleInputChange}
                                    />

                                    <TextField
                                        fullWidth
                                        type="text"
                                        label="Nhập lại mật khẩu mới"
                                        variant="outlined"
                                        margin="normal"
                                        size="small"
                                        name="confirmPassword"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading={loading}
                                loadingIndicator="Đang gửi..."
                                sx={{
                                    my: 2,
                                    fontWeight: 800,
                                    textTransform: "none",
                                }}
                            >
                                Gửi
                            </LoadingButton>
                        </form>

                        <Link href="/login" underline="hover">
                            {"Trang đăng nhập"}
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default ForgotPage;
