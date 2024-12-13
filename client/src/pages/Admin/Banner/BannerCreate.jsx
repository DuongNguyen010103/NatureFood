import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { BannerYup } from "../../../validations/yup.validations";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import LoadingButton from "@mui/lab/LoadingButton";
import { createBannerAction } from "../../../hooks/Redux/Banner/bannerAction";

export default function BannerCreateDialog({
    openBannerCreate,
    setOpenBannerCreate,
}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { loading: bannerLoading } = useSelector((state) => state.banner);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(BannerYup),
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("url", data.url);
        formData.append("image", selectedImage);
        console.log(formData);

        const response = await dispatch(createBannerAction(formData));
        if (response?.error) {
            snackNotify("error")("Tạo banner thất bại");
        } else {
            snackNotify("success")("Tạo banner thành công");
            reset();
            setOpenBannerCreate(false);
        }
    };
    return (
        <Fragment>
            <Dialog
                open={openBannerCreate}
                onClose={() => setOpenBannerCreate(false)}
            >
                <DialogTitle>Tạo banner</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Để tạo banner, vui lòng điền Tên banner, Mô tả danh mục,
                        đường liên kết khi người dùng truy cập và chọn hình ảnh
                        đại diện cho banner.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Tên banner"
                            fullWidth
                            margin="normal"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            size="small"
                        />
                        <TextField
                            label="Mô tả banner"
                            fullWidth
                            margin="normal"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            size="small"
                        />
                        <TextField
                            label="Đường liên kết"
                            fullWidth
                            margin="normal"
                            {...register("url")}
                            error={!!errors.url}
                            helperText={errors.url?.message}
                            size="small"
                        />
                        <TextField
                            type="file"
                            label="Thêm ảnh"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: "image/*" }}
                            onChange={handleImageChange}
                            fullWidth
                            margin="normal"
                        />
                        {selectedImage && (
                            <Box mt={2}>
                                <Typography>Ảnh đã chọn:</Typography>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Selected"
                                    className="w-full "
                                />
                            </Box>
                        )}
                        <Stack
                            sx={{ mt: 2 }}
                            spacing={2}
                            direction={"row"}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenBannerCreate(false)}
                                sx={{ textTransform: "none" }}
                            >
                                Hủy
                            </Button>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={bannerLoading}
                                loadingPosition="center"
                                size="small"
                                sx={{ textTransform: "none" }}
                            >
                                Xác nhận
                            </LoadingButton>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </Fragment>
    );
}
