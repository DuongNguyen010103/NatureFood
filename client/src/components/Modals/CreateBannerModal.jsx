import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { CircularProgress, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createBannerAction } from "../../hooks/Redux/Banner/bannerAction";
import { useSnackbar } from "notistack";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateBannerYup } from "../../validations/yup.validations";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "8px",
};

const CreateBannerModal = ({ open, setIsOpenCreateBanner }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CreateBannerYup),
    });
    const {
        data: storeData,
        loading: storeLoading,
        error: storeError,
    } = useSelector((state) => state.store);
    const {
        data: bannerData,
        loading: bannerLoading,
        error: bannerError,
    } = useSelector((state) => state.banner);
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();

    const handleClickVariant = (variant) => (message) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    useEffect(() => {});

    const [imageValue, setImageValue] = useState(null);
    const onSubmitHandler = async (data) => {
        const formData = new FormData();
        formData.append("image", imageValue);
        formData.append("storeId", storeData._id);
        formData.append("url", data.url);
        const resultAction = await dispatch(createBannerAction(formData));
        if (createBannerAction.fulfilled.match(resultAction)) {
            handleClickVariant("success")("Đăng ký banner thành công");
            setIsOpenCreateBanner(false);
        } else {
            handleClickVariant("error")(
                `Đăng ký banner thất bại ${resultAction.error.message}`
            );
        }

        reset();
    };

    return (
        <div>
            <Modal
                open={open}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ fontWeight: "bold" }}
                    >
                        Thêm Banner
                    </Typography>

                    <form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Thêm đường dẫn cho banner của bạn
                        </Typography>
                        <TextField
                            {...register("url")}
                            type="text"
                            fullWidth
                            multiline
                            error={!!errors.url}
                            helperText={errors?.url?.message}
                        />
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Chọn hình ảnh bạn muốn đăng ký làm banner
                        </Typography>
                        <Input
                            type="file"
                            onChange={(evt) =>
                                setImageValue(evt.target.files[0])
                            }
                        />
                        <Box className="text-end mt-2 flex justify-end">
                            <Button
                                variant="contained"
                                color="warning"
                                size="small"
                                sx={{ marginRight: 2 }}
                                onClick={() => setIsOpenCreateBanner(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Box className="relative">
                                <Button
                                    variant="contained"
                                    color="success"
                                    size="small"
                                    type="submit"
                                    disabled={bannerLoading}
                                >
                                    Thêm banner
                                </Button>
                                {bannerLoading && (
                                    <CircularProgress
                                        size={24}
                                        sx={{
                                            color: "green",
                                            position: "absolute",
                                            top: 2,
                                            left: "45%",
                                            zIndex: 1,
                                        }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default CreateBannerModal;
