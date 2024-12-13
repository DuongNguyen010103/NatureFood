import { Avatar, Box, Button, Collapse, Rating, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertTimeDuration } from "../../../services/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateReviewFeedbackYup } from "../../../validations/yup.validations";
import { useForm } from "react-hook-form";
import useSnackNotify from "../../../components/SnackNotify";
import { deleteReviewAction, updateReviewAction } from "../../../hooks/Redux/Review/reviewAction";
import { ChipStyled } from "../../../components";

export default function ReviewTag({ review, product }) {
    const [isOpenFeedback, setIsOpenFeedBack] = useState(false);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { currentUser } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CreateReviewFeedbackYup),
    });

    const deleteReview = async () => {
        const response = await dispatch(deleteReviewAction(review?._id));
        if (response?.error) {
            snackNotify("error")("Xóa đánh giá lỗi");
        } else {
            snackNotify("success")("Xóa đánh giá thành công");
        }
    };

    const onSubmit = async (data) => {
        data.reviewId = review?._id;
        const response = await dispatch(updateReviewAction(data));
        if (response?.error) {
            snackNotify("error")("Thêm phản hồi lỗi");
        } else {
            snackNotify("success")("Thêm phản hồi thành công");
            reset();
            setIsOpenFeedBack(false);
        }
    };
    return (
        <Box sx={{ display: "flex", mt: 3 }}>
            <Avatar src="/assets/images/no-avatar.png" sizes="small" />
            <Box className="p-2 w-full">
                <div className="flex items-center ">
                    <p className="font-semibold mr-2">{review?.author?.username}</p>
                    <Rating name="read-only" value={review.rating} readOnly />
                </div>
                <p className="text-base mt-3">{review?.body}</p>
                <Box className="flex justify-between items-center w-full">
                    <Typography variant="body2" component="h4" color="textSecondary">
                        {`Đã đăng: ${convertTimeDuration(review?.createdAt)}`}
                    </Typography>
                    <div>
                        {currentUser?._id == review?.author?._id && (
                            <Button variant="text" color="warning" size="small" className="na-text-transform-none" onClick={deleteReview}>
                                Xóa
                            </Button>
                        )}

                        {currentUser?.store?._id == product?.storeId?._id && (
                            <Button
                                variant="text"
                                color="primary"
                                size="small"
                                sx={{ textTransform: "none" }}
                                onClick={() => setIsOpenFeedBack(!isOpenFeedback)}
                            >
                                {isOpenFeedback ? "Đóng" : "Trả lời"}
                            </Button>
                        )}
                    </div>
                </Box>
                <Collapse in={isOpenFeedback} timeout="auto" unmountOnExit>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            {...register("feedback")}
                            minRows={5}
                            multiline
                            size="small"
                            variant="outlined"
                            placeholder="Đánh giá của bạn về sản phẩm này ..."
                            className="mt-1 w-full na-my-2"
                            error={!!errors.feedback}
                            helperText={errors.feedback && errors.feedback.message}
                        />
                        <Button type="submit" variant="contained" color="success" size="small" className="mt-2">
                            Thêm trả lời
                        </Button>
                    </form>
                </Collapse>

                {review?.feedback && (
                    <Box className="mt-1 p-2 bg-[#FFF7ED] flex">
                        <Avatar>Store</Avatar>
                        <Box sx={{ margin: 1 }}>
                            <div className="flex items-center">
                                <p className="font-semibold mr-2">{product?.storeId?.name}</p>
                                <ChipStyled label={"Chủ shop"} color="success" />
                            </div>
                            <p className="text-base mt-3">{review?.feedback}</p>
                            <Typography variant="body2" component="h4" color="textSecondary">
                                Ngay bây giờ
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
