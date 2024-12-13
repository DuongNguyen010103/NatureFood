import { Chip } from "@mui/material";
import { styled } from "@mui/system";

const ChipStyled = styled(Chip)(({ theme }) => ({
    padding: 0, // Padding tùy chỉnh
    fontSize: "0.75rem", // Font chữ nhỏ hơn
    height: "22px",
}));
export default ChipStyled;
