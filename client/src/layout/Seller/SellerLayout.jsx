import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { green, rootColor } from "../../theme/colors";
import PeopleIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import EmailIcon from "@mui/icons-material/Email";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import MessageIcon from "@mui/icons-material/Message";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PaymentsIcon from "@mui/icons-material/Payments";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Avatar, Badge, Collapse, InputAdornment, InputBase } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentStoreAction } from "../../hooks/Redux/Store/storeAction";
import { AppBar, Drawer, DrawerHeader } from "./Drawer";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import useSnackNotify from "@components/SnackNotify";

const items = [
    {
        to: "/seller",
        icon: <DashboardIcon />,
        text: "Bảng điều khiển",
    },
    {
        icon: <ProductIcon />,
        text: "Sản phẩm cty",
        fieldName: "products",
        listItems: [
            {
                to: "/seller/product/list?skip=0&take=10&type=all",
                text: "Danh sách",
            },
            {
                to: "/seller/product/cart",
                text: "Giỏ hàng",
            },
        ],
    },
    {
        to: "/seller/store-product/list?skip=0&take=10&type=",
        icon: <PeopleIcon />,
        text: "Sản phẩm cửa hàng",
    },
    // {
    //     icon: <EventIcon />,
    //     text: "Sự kiện",
    //     fieldName: "event",
    //     listItems: [
    //         {
    //             to: "/seller/event",
    //             text: "Danh sách",
    //         },
    //         {
    //             to: "/seller/event/:id",
    //             text: "Chi tiết",
    //         },
    //         {
    //             to: "/seller/product/create",
    //             text: "Thêm mới",
    //         },
    //     ],
    // },
    {
        to: "/seller/orders?skip=0&take=10&date=-1&status=-1",
        icon: <GradingIcon />,
        text: "Đơn hàng",
    },
    // {
    //     to: "/seller/message",
    //     icon: <MessageIcon />,
    //     text: "Tin nhắn",
    // },
    // {
    //     icon: <EmailIcon />,
    //     text: "Email",
    //     fieldName: "email",
    //     listItems: [
    //         {
    //             to: "/seller/email/inbox",
    //             text: "Hộp thư đến",
    //         },
    //         {
    //             to: "/seller/email/create",
    //             text: "Soạn email",
    //         },
    //     ],
    // },

    {
        to: "/seller/notification?skip=0&take=10&isRead=-1",
        icon: <NotificationsActiveIcon />,
        text: "Thông báo ",
    },
    // {
    //     to: "/seller/bill",
    //     icon: <PaymentsIcon />,
    //     text: "Hóa đơn",
    // },
    // {
    //     to: "/seller/report",
    //     icon: <PriorityHighIcon />,
    //     text: "Báo cáo",
    // },
    // {
    //     to: "/seller/profile",
    //     icon: <AccountCircleIcon />,
    //     text: "Hồ sơ",
    // },
];

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const { currentStore } = useSelector((state) => state.store);
    const { unreadNotificationsTotal } = useSelector((state) => state.notification);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const handleClick = (menu) => {
        setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    useEffect(() => {
        (async () => {
            const response = await dispatch(getCurrentStoreAction());
            // if (!response.error && !currentStore) {
            //     snackNotify("error")("Bạn không phải là chủ cửa hàng");
            //     navigate("/");
            // }
        })();
    }, [currentStore]);
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ bgcolor: green[100], color: "inherit" }}>
                <Toolbar>
                    <Box className="flex items-center justify-between  w-full">
                        <div className="flex items-center justify-start">
                            {!open && (
                                <div className="flex">
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={[
                                            {
                                                marginRight: 5,
                                            },
                                            // open && { display: "none" },
                                        ]}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <Box className="max-h-[55px] p-1" component={Link} to="/">
                                        <img src="/assets/images/logo.png" alt="logo" className="object-cover h-full" />
                                    </Box>
                                </div>
                            )}
                        </div>

                        <div style={{ display: "flex" }}>
                            <IconButton color="inherit" onClick={() => navigate("/seller/notification?skip=0&take=10&isRead=-1")}>
                                <Badge badgeContent={unreadNotificationsTotal} color="secondary" showZero>
                                    <NotificationsNoneOutlinedIcon />
                                </Badge>
                            </IconButton>
                            <div className="flex items-center bg-white rounded-[18px] border border-rose-600 pr-1 ml-2">
                                <Avatar alt="store image" src={currentStore?.image?.url} sx={{ width: "36px", height: "36px" }} />
                                <p className="font-lg font-bold ml-1 whitespace-nowrap">{currentStore?.name}</p>
                            </div>
                        </div>
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <Box className="h-[65px] p-2 w-full flex justify-center" component={Link} to="/">
                        <img src="/assets/images/logo.png" alt="logo" className="object-cover h-full" />
                    </Box>
                    <IconButton onClick={handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {items.map((item, index) =>
                        item?.to ? (
                            <NavLink
                                key={index}
                                to={item.to}
                                className={({ isActive }) =>
                                    isActive ? "group text-green-700 font-semibold" : "group text-inherit  hover:font-semibold font-normal"
                                }
                            >
                                <ListItemButton>
                                    <ListItemIcon className="group-hover:text-green-700 ">{item.icon}</ListItemIcon>
                                    <p className="group-hover:text-green-700">{item.text}</p>
                                </ListItemButton>
                            </NavLink>
                        ) : (
                            <Box key={index}>
                                <ListItemButton onClick={() => handleClick(item.fieldName)}>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                    {open[item.fieldName] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open[item.fieldName]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.listItems.map((i, ind) => (
                                            <ListItemButton key={`collaspse-${ind}`} sx={{ pl: 9 }}>
                                                <NavLink
                                                    to={i.to}
                                                    className={({ isActive }) =>
                                                        isActive
                                                            ? "text-green-700 font-semibold hover:text-green-700 w-full"
                                                            : "text-inherit hover:text-green-700 hover:font-semibold w-full font-normal"
                                                    }
                                                >
                                                    {i.text}
                                                </NavLink>
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </Box>
                        )
                    )}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, overflowX: "auto" }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}
