import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import { useSelector } from "react-redux";

export default function DialogPassword({ open, setOpen, onSubmit, handleInputChange, formData }) {
    const { loading } = useSelector((state) => state.user);
    return (
        <React.Fragment>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Xác nhận tài khoản</DialogTitle>
                <DialogContent>
                    <DialogContentText>Vui lòng nhập mật khẩu đăng nhập của bạn để tiếp tục</DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="password"
                        label="Mật khẩu đăng nhập"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formData?.password || ""}
                        onChange={handleInputChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                    <LoadingButton loading={loading} loadingPosition="center" onClick={onSubmit}>
                        Xác nhận
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
