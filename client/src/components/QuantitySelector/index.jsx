import { IconButton, Stack, styled, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const StyledTextField = styled(TextField)({
    // Loại bỏ mũi tên tăng giảm trong Chrome, Safari, Edge, Opera
    "& input[type=number]": {
        MozAppearance: "textfield", // Firefox
        WebkitAppearance: "none", // Chrome, Safari, Edge, Opera
        appearance: "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
        {
            WebkitAppearance: "none",
            margin: 0,
        },
    "& .MuiOutlinedInput-root": {
        border: "none", // Loại bỏ viền
    },
    "& .MuiInputBase-input": {
        padding: 0, // Loại bỏ padding
    },
    "& .MuiOutlinedInput-notchedOutline": {
        border: "none", // Loại bỏ viền trong outline variant
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        border: "none", // Loại bỏ viền khi hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "none", // Loại bỏ viền khi focus
    },
});

export default function QuantitySelector({ quantity, setQuantity }) {
    const handleQuantityChange = (num) => {
        if (quantity + num > 0) {
            setQuantity(quantity + num);
        }
    };
    return (
        <Stack
            direction={"row"}
            style={{ border: "1px solid grey", padding: 6, borderRadius: 6 }}
        >
            <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleQuantityChange(-1)}
            >
                <RemoveIcon />
            </IconButton>
            <StyledTextField
                value={quantity}
                inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                }}
                type="number"
                size="small"
                style={{ width: "40px", margin: 0 }}
            />
            <IconButton
                sx={{ padding: 0 }}
                onClick={() => handleQuantityChange(1)}
            >
                <AddIcon />
            </IconButton>
        </Stack>
    );
}
