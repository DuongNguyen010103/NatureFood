import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { Modal, Typography, Button, Box } from "@mui/material";
import { updateEmailVerify } from "../../hooks/Redux/User/userAction";
import { verifyEmail } from "../../apis/user.apis";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

let randNumber = Math.floor(Math.random() * 90000) + 100000;

export default function InputOTP({ open, handleClose }) {
    const [otp, setOtp] = useState("");
    const [sendOTP, setSendOTP] = useState(false);
    const [sendOtpStatus, setSendOtpStatus] = useState(false);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleSendOTP = async () => {
        const dataOTP = {
            subject: "Xác thực email",
            otp: randNumber,
        };
        const result = await verifyEmail(dataOTP);
        if (result.data.success) {
            setSendOtpStatus(true);
        }
    };

    const handleChangeInputOtp = (newValue) => {
        setOtp(newValue);
    };

    const handleClickVariant = (variant) => (message) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const handleSubmit = async () => {
        if (otp == randNumber) {
            const dataUpdate = {
                emailVerify: true,
            };
            const resultAction = await dispatch(updateEmailVerify(dataUpdate));
            // Kiểm tra nếu dispatch thành công
            if (updateEmailVerify.fulfilled.match(resultAction)) {
                // Kiểm tra giá trị emailVerify trong state đã được cập nhật hay chưa
                if (resultAction.payload.emailVerify) {
                    handleClickVariant("success")("Xác thực email thành công");
                } else {
                    handleClickVariant("error")("Xác thực email thất bại");
                }
            } else {
                handleClickVariant("error")("Xác thực email thất bại");
            }
        } else {
            handleClickVariant("error")("Mã otp sai");
        }
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography
                    component="h1"
                    variant="h6"
                    sx={{ fontWeight: "bold" }}
                >
                    Xác thực Email để tạo cửa hàng cho riêng mình
                </Typography>
                <Typography component="p">
                    Bấm <strong>Gửi OTP</strong> để nhận mã xác thực: &nbsp;
                    <button
                        className={
                            sendOTP
                                ? "underline decoration-solid text-gray-400"
                                : "underline decoration-solid text-blue-600"
                        }
                        onClick={() => {
                            setSendOTP(true);
                            handleSendOTP();
                        }}
                        disabled={sendOTP}
                    >
                        Gửi OTP
                    </button>
                </Typography>
                <Box sx={{ display: sendOTP ? "block" : "none" }}>
                    <p
                        className={`text-green-500 ${
                            sendOtpStatus ? "block" : "hidden"
                        }`}
                    >
                        Gửi OTP thành công tới email đã đăng ký của bạn, vui
                        lòng nhập mã và "Xác thực"
                    </p>
                    <p
                        className={`text-red-500 ${
                            sendOtpStatus ? "hidden" : "block"
                        }`}
                    >
                        Gặp vấn đề khi Gửi OTP, vui lòng kiểm tra email và thử
                        lại
                    </p>
                </Box>
                <Box textAlign={"end"}>
                    <Button
                        variant="contained"
                        color="success"
                        sx={{ marginTop: 3 }}
                        onClick={handleSubmit}
                    >
                        Xác thực
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
