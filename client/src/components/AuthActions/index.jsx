import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

const AuthActions = ({ display }) => {
    return (
        <Stack spacing={1} direction={"row"} display={display}>
            <Button
                type="button"
                variant="contained"
                size="small"
                component={Link}
                to="/login"
                sx={{ textTransform: "none" }}
                className="hover:text-teal-400"
            >
                Đăng nhập
            </Button>
            <Button
                type="button"
                variant="contained"
                size="small"
                component={Link}
                to="/register"
                sx={{ textTransform: "none" }}
                color="success"
                className="hover:text-cyan-400"
            >
                Đăng ký
            </Button>
        </Stack>
    );
};

export default AuthActions;
