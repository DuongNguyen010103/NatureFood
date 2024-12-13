import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper, InputAdornment, IconButton, Link, Divider } from "@mui/material";
import { styled } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../../../../services/functions";
import { Link as LinkRouter } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangeEmailYup, ChangePasswordYup } from "../../../../validations/yup.validations";
import { tryCatchWrapper } from "../../../../utils/asyncHelper";
import { changePasswordApi } from "../../../../apis/user.apis";
import useSnackNotify from "../../../../components/SnackNotify";
import { updateCurrentUserAction } from "../../../../hooks/Redux/User/userAction";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginBottom: theme.spacing(4),
    width: "100%",
    borderRadius: "10px",
}));

function Account() {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const snackNotify = useSnackNotify();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(ChangePasswordYup),
    });

    const {
        register: registerChangeEmail,
        handleSubmit: handleSubmitChangeEmail,
        formState: { errors: errorsChangeEmail },
    } = useForm({
        resolver: yupResolver(ChangeEmailYup),
    });

    const toggleShowPassword = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const onSubmitPassword = async (data) => {
        const { result, error } = await tryCatchWrapper(changePasswordApi, data);
        console.log(result, error);
        if (error) {
            snackNotify("error")(error?.response?.data?.data.split("\n")[0]);
        } else {
            snackNotify("success")(result.message);
            reset();
        }
    };

    const onSubmitEmail = async (data) => {
        const response = await dispatch(updateCurrentUserAction(data));
        console.log(response);
        if (response.error) {
            snackNotify("error")(response.payload.response.data.data.split("\n")[0]);
        } else {
            snackNotify("success")("Cập nhật thông tin thành công");
        }
    };

    return (
        <Box className="flex flex-col items-center bg-gray-100 min-h-screen">
            <StyledPaper elevation={3}>
                <Typography variant="h6" className="mb-4 font-semibold">
                    Thông tin người dùng
                </Typography>
                <Box className="mb-4">
                    <Typography variant="body1">Tên:</Typography>
                    <Typography variant="body1" color="textSecondary" className="font-semibold">
                        {currentUser?.username}
                    </Typography>
                </Box>
                <Box className="mb-4">
                    <Typography variant="body1">Là thành viên từ ngày:</Typography>
                    <Typography variant="body1" color="textSecondary" className="font-semibold">
                        {formatDate(currentUser?.createdAt)}
                    </Typography>
                </Box>
                <Button
                    component={LinkRouter}
                    to="/my/profile"
                    sx={{
                        border: "2px solid #545454",
                        borderRadius: "25px",
                        backgroundColor: "white",
                        color: "black",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                        fontSize: "12px",
                        "&:hover": {
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
                            backgroundColor: "white",
                        },
                    }}
                >
                    Chỉnh sửa hồ sơ
                </Button>
            </StyledPaper>

            {/* <StyledPaper
                elevation={3}
                className="w-3/4"
                sx={{
                    borderRadius: "14px",
                }}
            >
                <Typography variant="h6" className="mb-4 font-semibold">
                    Cài đặt vị trí
                </Typography>
                <Box className="mb-4">
                    <Typography variant="body1" color="textSecondary">
                        Đất nước
                    </Typography>
                    <Select fullWidth defaultValue="Vietnam" size="small" sx={{ width: "70%" }}>
                        <MenuItem value="Vietnam">Vietnam</MenuItem>
                        <MenuItem value="United States">United States</MenuItem>
                        <MenuItem value="Canada">Canada</MenuItem>
                    </Select>
                </Box>
                <Box className="mb-4">
                    <Typography variant="body1" color="textSecondary">
                        Ngôn ngữ
                    </Typography>
                    <Select fullWidth defaultValue="English (US)" size="small" sx={{ width: "70%" }}>
                        <MenuItem value="English (US)">English (US)</MenuItem>
                        <MenuItem value="Vietnamese">Vietnamese</MenuItem>
                        <MenuItem value="French">French</MenuItem>
                    </Select>
                </Box>
                <Box className="mb-4">
                    <Typography variant="body1" color="textSecondary">
                        Tiền tệ
                    </Typography>
                    <Select fullWidth defaultValue="VND" size="small" sx={{ width: "70%" }}>
                        <MenuItem value="VND">Vietnamese Dong (VND)</MenuItem>
                        <MenuItem value="USD">US Dollar (USD)</MenuItem>
                        <MenuItem value="EUR">Euro (EUR)</MenuItem>
                    </Select>
                </Box>
                <Button
                    sx={{
                        border: "2px solid #545454",
                        borderRadius: "25px",
                        backgroundColor: "black",
                        color: "white",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                        fontSize: "12px",
                        "&:hover": {
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.6)",
                            backgroundColor: "black",
                        },
                    }}
                >
                    Lưu cài đặt
                </Button>
            </StyledPaper> */}
            <StyledPaper elevation={3}>
                <form onSubmit={handleSubmit(onSubmitPassword)}>
                    <Typography variant="h6" gutterBottom>
                        Mật khẩu
                    </Typography>
                    <TextField
                        {...register("currentPassword")}
                        label="Mật khẩu hiện tại"
                        variant="outlined"
                        type={showPassword.current ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword && errors.currentPassword.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => toggleShowPassword("current")} edge="end">
                                        {showPassword.current ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        {...register("password")}
                        label="Mật khẩu mới"
                        variant="outlined"
                        type={showPassword.new ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!errors.password}
                        helperText={errors.password && errors.password.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => toggleShowPassword("new")} edge="end">
                                        {showPassword.new ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        {...register("confirmPassword")}
                        label="Nhập lại mật khẩu mới "
                        variant="outlined"
                        type={showPassword.confirm ? "text" : "password"}
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword && errors.confirmPassword.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => toggleShowPassword("confirm")} edge="end">
                                        {showPassword.confirm ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        sx={{
                            border: "2px solid #545454",
                            borderRadius: "25px",
                            backgroundColor: "black",
                            color: "white",
                            transition: "all 0.2s ease",
                            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                            fontSize: "12px",
                            "&:hover": {
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
                                backgroundColor: "#333",
                            },
                        }}
                        type="submit"
                    >
                        Lưu thay đổi mật khẩu
                    </Button>
                    {/* <Typography variant="body2" sx={{ marginTop: 2, textAlign: "center" }}>
                    Cần trợ giúp ?{" "}
                    <Link href="https://help.etsy.com" target="_blank" rel="noopener">
                        Tìm câu trả lời tại Trung tâm trợ giúp NatureFood
                    </Link>
                </Typography> */}
                </form>
            </StyledPaper>

            <StyledPaper elevation={3}>
                <Typography variant="h6" gutterBottom>
                    Email
                </Typography>
                <Typography variant="body2">Email hiện tại</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }} gutterBottom>
                    {currentUser?.email}
                </Typography>
                <Typography variant="body2">Trạng thái </Typography>

                {currentUser?.emailVerify ? (
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "green" }}>
                        Đã xác nhận
                    </Typography>
                ) : (
                    <Typography component={LinkRouter} variant="body1" sx={{ fontWeight: "bold", color: "orange" }}>
                        Chưa xác thực
                    </Typography>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                    Cập nhật email
                </Typography>
                <form onSubmit={handleSubmitChangeEmail(onSubmitEmail)}>
                    <TextField
                        {...registerChangeEmail("email")}
                        label="Email mới"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!errorsChangeEmail.email}
                        helperText={errorsChangeEmail.email && errorsChangeEmail.email.message}
                    />
                    <TextField
                        {...registerChangeEmail("password")}
                        label="Mật khẩu đăng nhập vào Nature Food"
                        variant="outlined"
                        type="password"
                        fullWidth
                        margin="normal"
                        size="small"
                        error={!!errorsChangeEmail.password}
                        helperText={errorsChangeEmail.password && errorsChangeEmail.password.message}
                    />
                    <Button
                        sx={{
                            border: "2px solid #545454",
                            borderRadius: "25px",
                            backgroundColor: "black",
                            color: "white",
                            transition: "all 0.2s ease",
                            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                            fontSize: "12px",
                            "&:hover": {
                                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
                                backgroundColor: "#333",
                            },
                        }}
                        type="submit"
                    >
                        Lưu thay đổi
                    </Button>
                </form>
            </StyledPaper>

            {/* <Box
                sx={{
                    width: "75%",
                    margin: "auto",
                    padding: 3,
                    border: "1px solid #ddd",
                    borderRadius: "14px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Giao tiếp từ NatureFood
                </Typography>
                <FormControlLabel
                    control={<Switch checked={postalMail} onChange={(e) => setPostalMail(e.target.checked)} />}
                    label="Thông báo mail"
                />
                <Typography variant="body2" sx={{ ml: 4 }}>
                    Cho phép NatureFood thông báo
                </Typography>

                <FormControlLabel
                    control={<Switch checked={phoneCalls} onChange={(e) => setPhoneCalls(e.target.checked)} />}
                    label="Gọi điện thoại"
                />
                <Typography variant="body2" sx={{ ml: 4 }} className="pb-6">
                    Cho phép NatureFood liên lạc qua điện thoại
                </Typography>
                <Button
                    sx={{
                        border: "2px solid #545454",
                        borderRadius: "25px",
                        backgroundColor: "black",
                        color: "white",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                        fontSize: "12px",
                        "&:hover": {
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
                            backgroundColor: "#333",
                        },
                    }}
                >
                    Lưu sở thích giao tiếp
                </Button>
            </Box> */}
            <StyledPaper elevation={3}>
                <Typography variant="h6" className="font-bold mb-2">
                    Khóa tài khoản của bạn
                </Typography>
                <Typography className="mb-4">Điều gì xảy ra khi bạn đóng tài khoản?</Typography>
                <ul className="list-disc list-inside mb-4 text-sm text-gray-600 space-y-1">
                    <li>Tài khoản của bạn sẽ không hoạt động cho đến khi bạn mở lại.</li>
                    <li>Hồ sơ của bạn sẽ không còn xuất hiện ở bất kỳ đâu trên NatureFood.</li>
                    <li>Chúng tôi sẽ đóng mọi trường hợp không giao hàng mà bạn đã mở.</li>
                    <li>Cài đặt tài khoản của bạn sẽ vẫn nguyên vẹn và không ai có thể sử dụng tên người dùng của bạn.</li>
                </ul>
                <Typography className="mb-4 text-sm text-gray-600">
                    Bạn có thể mở lại tài khoản của mình bất cứ lúc nào. Chỉ cần đăng nhập lại vào NatureFood hoặc{" "}
                    <Link href="#" underline="hover">
                        liên hệ hỗ trợ NatureFood
                    </Link>{" "}
                    để được giúp đỡ.
                </Typography>
                {/* <Typography className="mb-4 text-sm text-gray-600">
                    Bạn muốn xóa vĩnh viễn tài khoản của mình? Hãy đến{" "}
                    <Link href="#" underline="hover">
                        Cài đặt quyền riêng tư
                    </Link>{" "}
                    và nhấp vào "Yêu cầu xóa dữ liệu của bạn".
                </Typography> */}
                <hr />
                <Button
                    sx={{
                        marginTop: "10px",
                        border: "2px solid #545454",
                        borderRadius: "25px",
                        backgroundColor: "black",
                        color: "white",
                        transition: "all 0.2s ease",
                        boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
                        fontSize: "12px",
                        "&:hover": {
                            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.7)",
                            backgroundColor: "#333",
                        },
                    }}
                >
                    Khóa tài khoản
                </Button>
            </StyledPaper>
            <StyledPaper elevation={3}>
                <Typography className="mb-2 font-bold">Các thiết lập khác</Typography>
                <Link href="#" underline="hover" className="block mb-1">
                    Ứng dụng
                </Link>
                <Link href="#" underline="hover" className="block">
                    Nguyên mẫu
                </Link>
            </StyledPaper>
        </Box>
    );
}

export default Account;
