import React, { useState } from "react";
import { red } from "../../../theme/colors";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    Divider,
    Container,
    FormControl,
    OutlinedInput,
    InputAdornment,
    IconButton,
    Link,
    FormHelperText,
    Paper,
} from "@mui/material";
import "../../../assets/styles/main.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useSnackNotify from "../../../components/SnackNotify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { RegisterYup } from "../../../validations/yup.validations";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../../hooks/Redux/User/userAction";
import { Link as LinkRouter } from "react-router-dom";

const RegistrationForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const snackNotify = useSnackNotify();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(RegisterYup),
    });

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = async (data) => {
        const response = await dispatch(registerAction(data));
        if (response?.payload?.token) {
            snackNotify("success")("Đăng ký thành công!");
            snackNotify("success")("Bạn được chuyển tới trang chủ!");
            reset();
            return navigate("/home");
        }
        if (!response?.payload?.response?.data?.success) {
            snackNotify("error")(`Lỗi, email đã được sử dụng`);
        }
    };

    return (
        <Box className="min-h-[100vh] grid place-items-center bg-[url('/assets/images/bg-login.jpg')]">
            <Paper className="w-[70%] flex">
                <Box className="bg-[url('/assets/images/bg-login-naturefood.jpg')] bg-center bg-no-repeat bg-cover w-[45%] p-10 relative min-h-full rounded-l-lg">
                    <div className="flex justify-center mb-6">
                        <img src="/assets/images/logo.png" alt="Logo" className="w-[80px]" />
                    </div>
                    <Typography className="text-white">
                        Nature Food cung cấp gia vị thiên nhiên chất lượng, an toàn, giúp bữa ăn thêm ngon và bảo vệ sức khỏe người dùng !
                    </Typography>
                    <Box className="absolute bottom-10 left-0 w-full flex flex-col items-center">
                        <Typography className="text-white" gutterBottom>
                            Bạn đã có tài khoản ?
                        </Typography>
                        <Button component={LinkRouter} to="/login" variant="contained" color="success" size="small">
                            Đăng nhập
                        </Button>
                    </Box>
                </Box>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <form onSubmit={handleSubmit(onSubmit)} className="register-form">
                    <Typography variant="h4" className="register-title">
                        Đăng ký
                    </Typography>
                    <Typography variant="body1" className="" gutterBottom>
                        Tên hiển thị
                    </Typography>
                    <TextField
                        {...register("username")}
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.username}
                        helperText={errors?.username?.message}
                    />
                    <Typography variant="body1" className="pt-3" gutterBottom>
                        Email
                    </Typography>
                    <TextField
                        {...register("email")}
                        type="email"
                        variant="outlined"
                        size="small"
                        fullWidth
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                    />
                    <Box className="flex justify-between pt-3 pb-3">
                        <Box className="w-full mr-3">
                            <Typography variant="body1" className="" gutterBottom>
                                Mật khẩu
                            </Typography>
                            <FormControl variant="outlined" size="small" fullWidth error={!!errors.password}>
                                <OutlinedInput
                                    {...register("password")}
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText>{errors?.password?.message}</FormHelperText>
                            </FormControl>
                        </Box>
                        <Box className="w-full mr-3">
                            <Typography variant="body1" className="" gutterBottom>
                                Nhập lại mật khẩu
                            </Typography>
                            <FormControl variant="outlined" size="small" fullWidth error={!!errors.confirmPassword}>
                                <OutlinedInput
                                    {...register("confirmPassword")}
                                    type={showPassword ? "text" : "password"}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <FormHelperText>{errors?.confirmPassword?.message}</FormHelperText>
                            </FormControl>
                        </Box>
                    </Box>

                    <FormControlLabel
                        control={<Checkbox color="primary" />}
                        label={
                            <Typography className="terms">
                                Tôi chấp nhận <span className="terms-link">điều khoản</span> và <span className="terms-link">bảo mật</span>
                            </Typography>
                        }
                        className="checkbox"
                    />

                    <Button type="submit" variant="contained" color="primary" fullWidth className="register-btn">
                        Đăng ký
                    </Button>

                    <Divider className="divider">hoặc đăng nhập bằng</Divider>

                    <Box className="flex pt-3">
                        <Button
                            variant="outlined"
                            fullWidth
                            className="text-transform-none"
                            sx={{
                                marginRight: 4,
                                color: red[500],
                                "&:hover": {
                                    backgroundColor: "#db4437",
                                    color: "white",
                                },
                            }}
                        >
                            <i className="fa-brands fa-google-plus-g text-xl"></i>
                            &nbsp; Google
                        </Button>
                        <Button
                            variant="outlined"
                            fullWidth
                            className="social-btn facebook-btn text-transform-none"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "blue",
                                    color: "white",
                                },
                            }}
                        >
                            <i className="fab fa-facebook text-xl"></i> &nbsp; Facebook
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};

export default RegistrationForm;
