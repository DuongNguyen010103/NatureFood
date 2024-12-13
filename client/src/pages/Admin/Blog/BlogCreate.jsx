import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Checkbox, FormControlLabel, Grid, Box, Typography } from "@mui/material";
import { CreateBlogYup } from "../../../validations/yup.validations";
import { useDispatch, useSelector } from "react-redux";
import { createBlogAction } from "../../../hooks/Redux/Blog/blogAction";
import useSnackNotify from "../../../components/SnackNotify";
import { LoadingButton } from "@mui/lab";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

const Index = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { loading: blogLoading } = useSelector((state) => state.blog);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CreateBlogYup),
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };

    const onSubmit = async (data) => {
        // const formData = new FormData();
        // for(let )
        data.image = selectedImage;
        console.log(data);
        const response = await dispatch(createBlogAction(data));
        console.log(response);
        if (response?.error) {
            snackNotify("error")("Tạo Blog thất bại");
        } else {
            snackNotify("success")("Tạo Blog thành công");
            reset();
            setSelectedImage(null);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                {/* Tiêu đề */}
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        fullWidth
                        label="Tiêu đề"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                </Grid>

                {/* Slug */}
                <Grid item xs={12}>
                    <TextField size="small" fullWidth label="Slug" {...register("slug")} error={!!errors.slug} helperText={errors.slug?.message} />
                </Grid>

                {/* Nội dung */}
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        fullWidth
                        multiline
                        minRows={4}
                        label="Nội dung"
                        {...register("content")}
                        error={!!errors.content}
                        helperText={errors.content?.message}
                    />
                </Grid>

                {/* Tóm tắt */}
                <Grid item xs={12}>
                    <TextField
                        size="small"
                        fullWidth
                        multiline
                        minRows={2}
                        label="Tóm tắt"
                        {...register("excerpt")}
                        error={!!errors.excerpt}
                        helperText={errors.excerpt?.message}
                    />
                </Grid>

                {/* Thumbnail */}
                <Grid item xs={12}>
                    <TextField
                        sx={{
                            ".css-1sh6wjw-MuiInputBase-input-MuiOutlinedInput-input": {
                                py: 2,
                            },
                        }}
                        size="small"
                        type="file"
                        fullWidth
                        label="Ảnh đại diện cho Blog"
                        InputLabelProps={{ shrink: true }}
                        inputProps={{ accept: "image/*" }}
                        onChange={handleImageChange}
                        error={!!errors.image}
                        helperText={errors.image?.message}
                    />
                </Grid>
                {selectedImage && (
                    <Grid item xs={12}>
                        <Typography>Ảnh đã chọn:</Typography>
                        <img src={URL.createObjectURL(selectedImage)} alt="Selected" className="w-1/2 " />
                    </Grid>
                )}

                {/* Nút Submit */}
                <Grid item xs={12}>
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ textTransform: "none" }}
                        endIcon={<HistoryEduIcon />}
                        loading={blogLoading}
                        loadingPosition="end"
                    >
                        Tạo bài viết
                    </LoadingButton>
                </Grid>
            </Grid>
        </form>
    );
};

export default Index;
