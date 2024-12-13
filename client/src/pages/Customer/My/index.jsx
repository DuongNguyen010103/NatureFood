import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Outlet } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import GradingOutlinedIcon from "@mui/icons-material/GradingOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";

const drawerWidth = 240;
const links = [
    { text: "Tài khoản", path: "/my/account", icon: <AccountCircleOutlinedIcon /> },
    { text: "Hồ sơ", path: "/my/profile", icon: <AssignmentIndIcon /> },
    { text: "Đơn đặt hàng", path: "/my/orders?skip=0&take=10&status=all", icon: <GradingOutlinedIcon /> },
    { text: "Vận chuyển", path: "/my/delivery", icon: <LocalShippingOutlinedIcon /> },
];

function My() {
    const drawer = (
        <Box sx={{ width: drawerWidth }}>
            <List>
                {links.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center py-2 px-4 text-lg w-full hover:bg-[#f3f4f6] hover:text-green-500 font-normal  ${
                                    isActive ? "bg-[#f3f4f6] text-green-500 font-semibold" : "text-gray-700"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="ml-4">{item.text}</p>
                        </NavLink>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex", maxHeight: "80vh", minHeight: "50vh" }}>
            <Box component="nav" sx={{ minWidth: drawerWidth }} className="bg-white overflow-y-auto rounded-lg h-full" aria-label="mailbox folders">
                {drawer}
            </Box>
            <Box component="main" sx={{ px: 3, overflowY: "scroll", width: "100%" }}>
                <Outlet />
            </Box>
        </Box>
    );
}

My.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * Remove this when copying and pasting into your project.
     */
    window: PropTypes.func,
};

export default My;
