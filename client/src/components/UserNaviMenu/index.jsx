import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, Button, Stack, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import { AccountCircle } from "@mui/icons-material";
import NotificationsIcon from "@mui/icons-material/Notifications";

import AuthActions from "../Dialogs/AccountMenu";
import InputOTP from "../Modals/InputOtpModal";

const UserNaviMenu = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useSelector((state) => state.user);

    const [anchorEl, setAnchorEl] = useState(null);
    const [openOTPModel, setOpenOTPModel] = useState(false);

    const handleClose = () => setOpenOTPModel(false);

    const handleClickAccountIcon = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAccountIcon = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        {
            text_color: "text-amber-500",
            color: "error",
            icon: <ForumIcon />,
        },
        {
            text_color: "text-amber-500",
            color: "error",
            icon: <NotificationsIcon />,
        },
        {
            text_color: "",
            color: "",
            icon: <AccountCircle onClick={handleClickAccountIcon} />,
        },
    ];
    return (
        <Stack
            spacing={1}
            direction={"row"}
            display={data !== undefined ? "flex" : "none"}
            className="items-center"
        >
            <Typography display="block">
                <Button
                    variant="contained"
                    color="success"
                    size="small"
                    sx={{
                        fontWeight: "bold",
                        display: data?.role === "user" ? "block" : "none",
                    }}
                    className="hover:text-white"
                    onClick={() => {
                        if (data.emailVerify) {
                            return navigate("register-store");
                        }
                        setOpenOTPModel(!openOTPModel);
                    }}
                >
                    Đăng ký bán hàng
                </Button>

                <NavLink
                    to={data?.role}
                    className={data?.role !== "user" ? "block" : "hidden"}
                >
                    {({ isActive }) => (
                        <Button
                            size="small"
                            sx={{
                                color: "black",
                                fontWeight: "bold",
                                backgroundColor: isActive
                                    ? "#196f3d"
                                    : "inherit",
                                border: "1px solid black",
                            }}
                            className="hover:text-white"
                        >
                            {data?.role}
                        </Button>
                    )}
                </NavLink>

                <InputOTP open={openOTPModel} handleClose={handleClose} />
            </Typography>

            {menuItems.map((items, index) => (
                <Typography className={items.text_color} key={index}>
                    <Badge
                        badgeContent={items.color === "" ? "" : 10}
                        color={items.color}
                    >
                        {items.icon}
                    </Badge>
                </Typography>
            ))}

            <AuthActions
                open={true}
                anchorEl={anchorEl}
                handleCloseAccountIcon={handleCloseAccountIcon}
            />
        </Stack>
    );
};

export default UserNaviMenu;
