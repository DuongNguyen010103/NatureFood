import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Collapse, InputAdornment, InputBase, Stack, styled, useTheme } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ProductIcon from "@mui/icons-material/ShoppingCart";
import EventIcon from "@mui/icons-material/Event";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { NavLink, useNavigate } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CategoryIcon from "@mui/icons-material/Category";
import GradingIcon from "@mui/icons-material/Grading";
import MessageIcon from "@mui/icons-material/Message";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import PaymentsIcon from "@mui/icons-material/Payments";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookIcon from "@mui/icons-material/Book";
import Avatar from "@mui/material/Avatar";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { rootColor } from "../theme/colors";
import { Outlet } from "react-router-dom";
import "../assets/styles/admin.css";

const drawerWidth = 240;

const items = [
    {
        to: "/admin/dashboard",
        icon: <DashboardIcon />,
        text: "Dashboard",
    },
    {
        to: "/admin/customer",
        icon: <PeopleIcon />,
        text: "Người dùng",
    },
    {
        to: "/admin/store",
        icon: <SupervisedUserCircleIcon />,
        text: "Cửa hàng",
    },
    {
        to: "/admin/category",
        icon: <CategoryIcon />,
        text: "Danh mục",
    },
    {
        to: "/admin/banner",
        icon: <ViewCarouselIcon />,
        text: "Banner",
    },
    {
        icon: <ProductIcon />,
        text: "Sản phẩm",
        fieldName: "products",
        listItems: [
            {
                to: "/admin/product/list?skip=0&take=10&type=all",
                text: "Danh sách",
            },
            {
                to: "/admin/product/:id",
                text: "Chi tiết",
            },
            {
                to: "/admin/product/create",
                text: "Thêm mới",
            },
        ],
    },
    {
        icon: <BookIcon />,
        text: "Blog",
        fieldName: "blog",
        listItems: [
            {
                to: "/admin/blog/list",
                text: "Danh sách",
            },
            {
                to: "/admin/blog/create",
                text: "Tạo blog",
            },
        ],
    },
    {
        icon: <EventIcon />,
        text: "Sự kiện",
        fieldName: "event",
        listItems: [
            {
                to: "/admin/event",
                text: "Danh sách",
            },
            {
                to: "/admin/event/:id",
                text: "Chi tiết",
            },
            {
                to: "/admin/product/create",
                text: "Thêm mới",
            },
        ],
    },
    {
        to: "/admin/order",
        icon: <GradingIcon />,
        text: "Đơn hàng",
    },
    {
        to: "/admin/message",
        icon: <MessageIcon />,
        text: "Tin nhắn",
    },
    {
        icon: <EmailIcon />,
        text: "Email",
        fieldName: "email",
        listItems: [
            {
                to: "/admin/email/inbox",
                text: "Hộp thư đến",
            },
            {
                to: "/admin/email/create",
                text: "Soạn email",
            },
        ],
    },

    {
        to: "/admin/notify",
        icon: <NotificationsActiveIcon />,
        text: "Thông báo ",
    },
    {
        to: "/admin/bill",
        icon: <PaymentsIcon />,
        text: "Hóa đơn",
    },
    {
        to: "/admin/report",
        icon: <PriorityHighIcon />,
        text: "Báo cáo",
    },
    {
        to: "/admin/profile",
        icon: <AccountCircleIcon />,
        text: " Chỉnh sửa hồ sơ",
    },
];

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
        {
            props: ({ open }) => open,
            style: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            },
        },
    ],
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
    width: drawerWidth,
    height: "100vh",
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",

    variants: [
        {
            props: ({ open }) => open,
            style: {
                ...openedMixin(theme),
                "& .MuiDrawer-paper": {
                    ...openedMixin(theme),
                },
            },
        },
        {
            props: ({ open }) => !open,
            style: {
                ...closedMixin(theme),
                "& .MuiDrawer-paper": {
                    ...closedMixin(theme),
                },
            },
        },
    ],
}));

export default function AdminLayout() {
    const theme = useTheme();
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(!open);
    };

    const handleClick = (menu) => {
        setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
    };

    return (
        <Box sx={{ bgcolor: rootColor.bg_blue, display: "flex" }}>
            <AppBar position="fixed" sx={{ bgcolor: rootColor.bg_blue, color: rootColor.text }}>
                <Toolbar
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Box sx={{ display: "flex" }}>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={[
                                {
                                    marginRight: 5,
                                    color: rootColor.text,
                                },
                            ]}
                        >
                            {open ? <MenuIcon /> : <MenuOpenIcon />}
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                            Nature Food
                        </Typography>
                        {/* Search Bar */}
                        <div
                            style={{
                                position: "relative",
                                marginRight: 16,
                                marginLeft: "65px",
                            }}
                        >
                            <InputBase
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon
                                            sx={{
                                                fontSize: "30px",
                                                paddingLeft: "10px",
                                                opacity: "0.6",
                                            }}
                                        />
                                    </InputAdornment>
                                }
                                placeholder="Search…"
                                style={{
                                    width: "340px",
                                    paddingLeft: "17px",
                                    padding: "3px",
                                    borderRadius: "17px",
                                    backgroundColor: "white",
                                }}
                                inputProps={{ "aria-label": "search" }}
                            />
                        </div>
                    </Box>
                    {/* Icons */}
                    <div style={{ display: "flex" }}>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        <IconButton color="inherit">
                            <SettingsIcon />
                        </IconButton>
                        <Stack>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </Stack>
                    </div>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Box sx={{ py: "32px" }}></Box>
                <List sx={{ bgcolor: rootColor.bg_blue }}>
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
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 2,
                    overflowX: "auto",
                }}
            >
                <Box sx={{ height: "64px" }}></Box>
                <Outlet />
            </Box>
        </Box>
    );
}
