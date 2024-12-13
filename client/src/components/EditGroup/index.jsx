import { Button, Stack } from "@mui/material";

const EditGroup = ({ onEditClick, onDeleteClick }) => {
    return (
        <Stack direction={"row"} sx={{ width: "100%" }} spacing={1}>
            <Button
                sx={{ width: "50%", p: 0, textTransform: "none" }}
                variant="contained"
                color="warning"
                onClick={() => onEditClick()}
            >
                Chỉnh sửa
            </Button>
            <Button
                sx={{
                    width: "50%",
                    p: "6px 0",
                    textTransform: "none",
                }}
                variant="contained"
                color="error"
                onClick={() => onDeleteClick()}
            >
                Xóa
            </Button>
        </Stack>
    );
};

export default EditGroup;
