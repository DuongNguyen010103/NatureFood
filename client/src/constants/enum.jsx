import OrderIcon from "@mui/icons-material/ShoppingCart"; // Biểu tượng cho "order"
import FavoriteIcon from "@mui/icons-material/Favorite"; // Biểu tượng cho "favorite"
import GiftIcon from "@mui/icons-material/CardGiftcard"; // Biểu tượng cho "gift"
import CalendarIcon from "@mui/icons-material/CalendarToday"; // Biểu tượng cho "calendar"
import CheckIcon from "@mui/icons-material/CheckCircle"; // Biểu tượng cho "check"
import NotificationIcon from "@mui/icons-material/Notifications";

export const STORE_STATUS = {
    0: "Đang xác minh",
    1: "Đang hoạt động",
    2: "Đang tạm khóa",
};

export const ORDER_STATUS = {
    0: "Đang xác minh",
    1: "Người bán đang chuẩn bị hàng",
    2: "Đã giao cho đơn vị vận chuyển",
    3: "Đã giao thành công",
    4: "Đã hủy bỏ",
    5: "Đang tiến hành hoàn trả",
};

export const ORDER_STATUS_COLOR = {
    0: "",
    1: "warning",
    2: "secondary",
    3: "success",
    4: "error",
};

export const PAYMENT_METHOD = {
    0: "Tiền mặt",
    1: "Chuyển khoản ngân hàng",
    2: "VNPay",
    3: "MoMo",
};

export const DELIVERY_METHOD = {
    0: "Miễn phí giao hàng",
    1: "Vận chuyển tiêu chuẩn",
    2: "Giao hành nhanh",
    3: "Giao hàng trong ngày",
};

export const USER_STATUS = {
    0: "Hoạt động",
    1: "Tạm khóa",
};

export const REFUND_STATUS = {
    0: "Chưa giải quyết",
    1: "Đang giải quyết",
    2: "Từ chối",
    3: "Hoàn thành",
};

export const BANNER_STATUS = {
    0: "Đang hoạt động",
    1: "Đã dừng",
};
export const ICON_MAPING = {
    order: <OrderIcon color="success" />,
    favorite: <FavoriteIcon color="error" />,
    gift: <GiftIcon color="warning" />,
    calendar: <CalendarIcon color="primary" />,
    check: <CheckIcon />,
    notification: <NotificationIcon color="secondary" />,
};
