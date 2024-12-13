import LoadingButton from "@mui/lab/LoadingButton";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { forwardRef, Fragment } from "react";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ openDialog, setOpenDialog, object, title, content, loading, handleConfirm }) {
    return (
        <Fragment>
            <Dialog
                open={openDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpenDialog(false)}
                aria-describedby="alert-dialog-slide-description"
                style={{ zIndex: 1400 }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" size="small" onClick={() => setOpenDialog(false)}>
                        Hủy
                    </Button>
                    <LoadingButton size="small" onClick={handleConfirm} loading={loading} loadingPosition="center" variant="contained">
                        Xác nhận
                    </LoadingButton>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}
