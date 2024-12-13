import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { Fragment, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CategoryYup } from "../../../validations/yup.validations";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import LoadingButton from "@mui/lab/LoadingButton";
import { createCategoryAction } from "../../../hooks/Redux/Category/categoryAction";

export default function CategoryCreateDialog({
    openCategoryCreate,
    setOpenCategoryCreate,
}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { data: categoryData, loading: categoryLoading } = useSelector(
        (state) => state.category
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CategoryYup),
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        console.log(file);
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("image", selectedImage);
        console.log(formData);

        const response = await dispatch(createCategoryAction(formData));
        console.log(response);
        if (response?.error) {
            snackNotify("error")("Tạo danh mục thất bại");
        } else {
            snackNotify("success")("Tạo danh mục thành công");
            reset();
            setOpenCategoryCreate(false);
        }
    };
    return (
        <Fragment>
            <Dialog
                open={openCategoryCreate}
                onClose={() => setOpenCategoryCreate(false)}
            >
                <DialogTitle>Tạo danh mục</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Để tạo danh mục, vui lòng điền Tên danh mục, Mô tả danh
                        mục và chọn hình ảnh đại diện cho danh mục.
                    </DialogContentText>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Tên danh mục"
                            fullWidth
                            margin="normal"
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            size="small"
                        />
                        <TextField
                            label="Mô tả danh mục"
                            fullWidth
                            margin="normal"
                            {...register("description")}
                            error={!!errors.description}
                            helperText={errors.description?.message}
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
                                    className="w-56 "
                                />
                            </Box>
                        )}
                        <Stack
                            spacing={2}
                            direction={"row"}
                            justifyContent="flex-end"
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setOpenCategoryCreate(false)}
                                sx={{ textTransform: "none" }}
                            >
                                Hủy
                            </Button>
                            <LoadingButton
                                variant="contained"
                                type="submit"
                                loading={categoryLoading}
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
