import { Box, Divider, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RegisterStoreYup } from "../../../validations/yup.validations";
import { createStoreAction } from "../../../hooks/Redux/Store/storeAction";
import useSnackNotify from "../../../components/SnackNotify";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const Index = () => {
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const { currentUser, token } = useSelector((state) => state.user);
    const { loading } = useSelector((state) => state.store);
    const dispatch = useDispatch();

    const [imageValue, setImageValue] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(RegisterStoreYup),
    });

    const handleChangeInputFile = (e) => {
        const file = e.target.files[0];
        setImageValue(file);
    };

    const onSubmit = async (data) => {
        const formData = { token: token, data: { ...data, image: imageValue } };
        const response = await dispatch(createStoreAction(formData));
        if (response?.error) {
            snackNotify("error")("Tạo cửa hàng thất bại");
        } else {
            snackNotify("success")("Đăng ký cửa hàng thành công");
            reset();
            navigate("/seller");
        }
    };
    useEffect(() => {
        if (currentUser?.store) {
            navigate("/seller");
        }
    }, []);

    return (
        <Box className="md:p-10 min-h-screen bg-[url('/assets/images/bg-shopping-with-naturefood.jpg')] bg-cover bg-center ">
            <Box className="md:w-1/3">
                <Box className="">
                    <Typography component="h1" variant="h6" sx={{ fontWeight: "bold" }}>
                        Đăng ký bán hàng với Nature Food
                    </Typography>
                    <Typography component="p" variant="" sx={{ fontStyle: "italic" }}>
                        Điền đầy đủ thông tin của cửa hàng vào form để đăng ký bán hàng trong hệ thống
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6">
                        <TextField
                            {...register("name")}
                            margin="normal"
                            label="Tên cửa hàng"
                            type="text"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            size="small"
                            fullWidth
                        />

                        <TextField
                            {...register("description")}
                            margin="normal"
                            label="Giới thiệu về cửa hàng"
                            type="text"
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            size="small"
                            fullWidth
                            multiline
                            minRows={4}
                        />
                        <Divider>Địa chỉ</Divider>

                        <div className="flex">
                            <TextField
                                {...register("city")}
                                margin="normal"
                                label="Thành phố"
                                type="text"
                                error={!!errors.city}
                                helperText={errors.city?.message}
                                size="small"
                                fullWidth
                                className="na-mr-2"
                            />
                            <TextField
                                {...register("district")}
                                margin="normal"
                                label="Quận/huyện"
                                type="text"
                                error={!!errors.district}
                                helperText={errors.district?.message}
                                size="small"
                                fullWidth
                            />
                        </div>

                        <div className="flex">
                            <TextField
                                {...register("ward")}
                                margin="normal"
                                label="Phường/xã"
                                type="text"
                                error={!!errors.ward}
                                helperText={errors.ward?.message}
                                size="small"
                                className="na-mr-2"
                                fullWidth
                            />
                            <TextField
                                {...register("street")}
                                margin="normal"
                                label="Địa chỉ chi tiết"
                                type="text"
                                error={!!errors.street}
                                helperText={errors.street?.message}
                                size="small"
                                className="na-mr-2"
                                fullWidth
                            />
                        </div>
                        <TextField
                            {...register("image")}
                            margin="normal"
                            type="file"
                            size="small"
                            onChange={handleChangeInputFile}
                            fullWidth
                            label="Ảnh đại diện cửa hàng"
                            InputLabelProps={{ shrink: true }}
                            inputProps={{ accept: "image/*" }}
                            error={!!errors.image}
                            helperText={errors?.image?.message}
                        />

                        <Box className="text-center mt-3">
                            <LoadingButton
                                type="submit"
                                variant="contained"
                                color="success"
                                loading={loading}
                                loadingPosition="center"
                                className="na-text-transform-none "
                            >
                                Đăng ký cửa hàng
                            </LoadingButton>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Box>
    );
};

export default Index;
