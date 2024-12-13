import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getcurrentUserAction } from "./hooks/Redux/User/userAction";
import { io } from "socket.io-client";
import { Alert, Slide, Snackbar } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { getNotificationsAction, getUnreadNotificationsAction, updateNotificationAction } from "./hooks/Redux/Notification/notificationAction";
import { increaseUnreadNotificationsTotal } from "./hooks/Redux/Notification/notificationSlice";
import useSnackNotify from "@components/SnackNotify";

const socket = io(import.meta.env.VITE_APP_DOMAIN);

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const snackNotify = useSnackNotify();
    const [open, setOpen] = useState(false);
    const { token, currentUser } = useSelector((state) => state.user);
    const [notifyData, setNotifyData] = useState();

    const handleClick = async () => {
        const response = await dispatch(updateNotificationAction(notifyData._id));
        if (response.error) {
            snackNotify("error")("Lỗi, vui lòng thử lại");
        }
        navigate(notifyData?.url || "/notification?skip=0&take=10&isRead=-1");
    };

    const handleGetData = async () => {
        await dispatch(getcurrentUserAction(token));
        await dispatch(getUnreadNotificationsAction());
    };
    useEffect(() => {
        handleGetData();
    }, [token]);

    useEffect(() => {
        if (currentUser?._id) {
            socket.emit("registerUser", currentUser?._id);
            console.log("đã gửi yêu cầu đăng ký socket cho: ", currentUser?._id);

            socket.on("receiveNotification", (data) => {
                console.log("Notification received:", data);
                setNotifyData(data);
                setOpen(true);
                dispatch(increaseUnreadNotificationsTotal());
            });
        }
        return () => {
            socket.off("receiveNotification");
        };
    }, [currentUser]);
    return (
        <>
            <Outlet />
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClick={handleClick}
                className="cursor-pointer"
            >
                <Alert
                    onClose={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                    }}
                    severity="warning"
                    variant="filled"
                    sx={{ maxWidth: "300px" }}
                    icon={<NotificationsActiveOutlinedIcon />}
                >
                    {notifyData?.message || "Bạn có thông báo mới"}
                </Alert>
            </Snackbar>
        </>
    );
}

export default App;
