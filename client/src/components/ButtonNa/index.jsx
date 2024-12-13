import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ButtonNa = styled(Button)(({ theme }) => ({
    border: "2px solid #545454",
    borderRadius: "25px",
    transition: "all 0.2s ease",
    boxShadow: "0px 0px 0px rgba(0, 0, 0, 0)",
    fontSize: "12px",
    backgroundColor: "white",
    "&:hover": {
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.5)",
    },
}));
export default ButtonNa;
