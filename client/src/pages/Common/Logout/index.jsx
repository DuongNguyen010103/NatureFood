import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { logout } from "../../../hooks/Redux/User/userSlice";
import { useNavigate } from "react-router-dom";
export default function Logout() {
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logout());
        snackNotify("success")("Đăng xuất thành công");
        window.location.href = "/";
    }, []);
    return <div>logout</div>;
}
