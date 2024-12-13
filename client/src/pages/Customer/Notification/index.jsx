import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "@components/SnackNotify";
import { getNotificationsAction, updateNotificationAction, updateNotificationsAction } from "../../../hooks/Redux/Notification/notificationAction";
import { useQuery, convertTimeDuration } from "@services/functions";
import { Nodata } from "@components";
import { ICON_MAPING } from "../../../constants/enum";
import NotificationIcon from "@mui/icons-material/Notifications";
import { Avatar, Box, Button, MenuItem, Pagination, Paper, Select } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ConfirmDialog from "../../../components/ConfirmDialog";

const NotificationItem = ({ notification }) => {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const handleClick = async () => {
        const response = await dispatch(updateNotificationAction(notification._id));
        if (response.error) {
            snackNotify("error")("Lỗi, vui lòng thử lại sau");
        }
    };
    return (
        <div className={`flex p-4 border-b border-gray-300 items-center ${!notification?.isRead ? "bg-gray-200" : "bg-gray-50"} `}>
            <Avatar src={notification.imageUrl} sx={{ width: 56, height: 56 }} />
            <Box component={Link} to={notification?.url || "/notification"} className="flex-1 ml-3" onClick={handleClick}>
                <p className="text-gray-800 font-semibold">{notification.message}</p>
                <div className="flex items-center text-gray-500 text-sm">
                    <span>{convertTimeDuration(notification.createdAt)}</span>
                    <span className="ml-2">{ICON_MAPING[notification.type] || <NotificationIcon />}</span>
                </div>
            </Box>
        </div>
    );
};

const productsEachPage = 10;

export default function NotificationList() {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const query = useQuery();
    const navigate = useNavigate();
    const { data: notificationData, unreadNotificationsTotal, loading } = useSelector((state) => state.notification);
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
        isRead: query.get("isRead"),
    };
    const handlePaginationChange = (event, value) => {
        navigate(`/notification?skip=${(value - 1) * productsEachPage}&take=${productsEachPage}&isRead=${params.isRead}`);
    };

    const MakeIsReadAll = async () => {
        const response = await dispatch(updateNotificationsAction());
        if (response.error) {
            snackNotify("error")("Cập nhật danh sách thông báo thất bại");
        } else {
            snackNotify("success")("Cập nhật danh sách thông báo thành công");
            setOpenDialog(false);
        }
    };
    useEffect(() => {
        (async () => {
            const response = await dispatch(getNotificationsAction(params));
            if (response.error) {
                snackNotify("error")("Lấy danh sách thông báo thất bại");
            }
        })();
    }, [params.skip, params.take, params.isRead]);
    return (
        <div>
            <div className=" md:w-2/3 mx-auto pb-3 ">
                <Paper className="flex justify-between p-4 border-b border-gray-300">
                    <h2 className="text-xl font-bold text-gray-800">Thông báo</h2>
                    <div className="flex space-x-4">
                        <Select
                            variant="standard"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={params.isRead}
                            size="small"
                            onChange={(e) => navigate(`/notification?skip=${params.skip}&take=${params.take}&isRead=${e.target.value}`)}
                        >
                            <MenuItem value={-1}>Tất cả thông báo</MenuItem>
                            <MenuItem value={0}>Thông báo chưa đọc</MenuItem>
                            <MenuItem value={1}>Thông báo đã đọc</MenuItem>
                        </Select>
                        <Button variant="text" size="" className="na-text-transform-none" onClick={() => setOpenDialog(true)}>
                            Đánh dấu tất cả đã đọc ({unreadNotificationsTotal})
                        </Button>
                    </div>
                </Paper>
                {notificationData?.total == 0 ? (
                    <Nodata content="Danh sách thông báo trống" />
                ) : (
                    <Paper className="mt-3">
                        {notificationData.notifications.map((notification) => (
                            <NotificationItem key={notification._id} notification={notification} />
                        ))}
                    </Paper>
                )}
                <Pagination
                    className="pt-6 flex justify-center"
                    count={Math.floor(notificationData?.total / productsEachPage + 1)}
                    page={Math.floor(query.get("skip") / productsEachPage + 1) || 1}
                    onChange={handlePaginationChange}
                    color="success"
                />
            </div>
            <ConfirmDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                title={"Đánh dấu đã đọc tất cả thông báo"}
                loading={loading}
                handleConfirm={MakeIsReadAll}
                content={'Sau khi bấm "Xác nhận" các thông báo của bạn sẽ được cập nhật thành đã đọc. Bạn chắc chắn rằng muốn tiếp tục thay đổi này?'}
            />
        </div>
    );
}
