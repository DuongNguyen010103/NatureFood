import React, { Fragment, useEffect, useState } from "react";
import {
    Button,
    Grid,
    Box,
    Typography,
    RadioGroup,
    FormControl,
    FormControlLabel,
    Radio,
    Paper,
    IconButton,
    Tooltip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
} from "@mui/material";
import "../../../assets/styles/main.css";

import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CreaditCard from "./CreaditCard";
import OrderSummary from "./OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserDeliveryAction } from "../../../hooks/Redux/User/userAction";
import { Nodata } from "../../../components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { CheckoutYup } from "../../../validations/yup.validations";
import { createCustomerOrderAction } from "../../../hooks/Redux/Order/orderAction";
import useSnackNotify from "../../../components/SnackNotify";
import { countCartTotal } from "../../../services/functions";
import LoadingButton from "@mui/lab/LoadingButton";
import { resetCart } from "../../../hooks/Redux/Cart/cartSlice";
import { createLinkMoMoPaymentApi } from "../../../apis/payment.api";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CheckoutForm() {
    const [openDialog, setOpenDialog] = useState(false);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const navigate = useNavigate();
    const { delivery } = useSelector((state) => state.user);
    const { data: cartData } = useSelector((state) => state.cart);
    const { loading: orderLoading } = useSelector((state) => state.order);
    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CheckoutYup),
    });

    const [paymentMethod, setPaymentMethod] = useState();
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    const onSubmit = async (data) => {
        data.carts = cartData.products;
        data.totalAmount = countCartTotal(cartData?.products);
        if (data.paymentMethod == 3) {
            const response = await createLinkMoMoPaymentApi({ amount: countCartTotal(cartData?.products) });
            console.log(response);

            if (!response.success) {
                snackNotify("error")("Lỗi, vui lòng chọn phương thức khác");
            } else {
                window.open(response.data.payUrl, "_blank");
                snackNotify("success")("Tạo link thanh toán MOMO thành công, vui lòng thanh toán để tiếp tục");
            }
        } else {
            const response = await dispatch(createCustomerOrderAction(data));
            if (response?.error) {
                snackNotify("error")("Đặt hàng thất bại");
            } else {
                dispatch(resetCart());
                snackNotify("success")("Đặt hàng thành công");
                reset();
                setOpenDialog(true);
            }
        }
    };

    useEffect(() => {
        dispatch(getCurrentUserDeliveryAction());
    }, []);
    return (
        <div className=" ">
            <h2 className=" font-bold text-3xl">Thanh toán</h2>
            <div className=" pt-3 flex">
                <Box className="mr-5 w-2/3">
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div>
                            <Paper>
                                <div className="flex justify-between px-6 py-4 bg-[#f9fafd]">
                                    <Typography variant="h6">Địa chỉ giao hàng của bạn</Typography>
                                    <Button
                                        component={Link}
                                        to="/shipping"
                                        size="small"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        className="na-text-transform-none"
                                    >
                                        Thêm địa chỉ
                                    </Button>
                                </div>
                                {delivery?.total > 0 ? (
                                    <div className="px-6 pb-6" style={errors?.delivery && { border: "1px solid red", borderRadius: 4 }}>
                                        <Controller
                                            name="delivery"
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <RadioGroup {...field}>
                                                    <Grid container spacing={2}>
                                                        {delivery?.delivery?.map((item) => (
                                                            <Grid item xs={12} md={6} key={item._id}>
                                                                <FormControlLabel
                                                                    value={item?._id}
                                                                    control={<Radio color="success" size="small" />}
                                                                    label=""
                                                                />
                                                                <div className="ml-6 rounded-md border-solid border-[1px] border-green-400 p-3 relative">
                                                                    <Box className="flex mb-2">
                                                                        <PersonOutlineIcon sx={{ mr: 1 }} />
                                                                        <p>
                                                                            <span className="font-semibold">Tên:&nbsp;</span>
                                                                            {item?.ownerName}
                                                                        </p>
                                                                    </Box>
                                                                    <Box className="flex mb-2">
                                                                        <LocationOnOutlinedIcon sx={{ mr: 1 }} />
                                                                        <p>
                                                                            <span className="font-semibold">Địa chỉ:&nbsp;</span>
                                                                            {`${item?.address?.street}, ${item?.address?.ward}, ${item?.address?.district}, ${item?.address?.city}`}
                                                                        </p>
                                                                    </Box>
                                                                    <Box className="flex">
                                                                        <PhoneIcon sx={{ mr: 1 }} />
                                                                        <p>
                                                                            <span className="font-semibold">Số điện thoại:&nbsp;</span>
                                                                            {item?.phone}
                                                                        </p>
                                                                    </Box>
                                                                    <Tooltip title="Chỉnh sửa" placement="top">
                                                                        <IconButton
                                                                            aria-label="edit"
                                                                            size="small"
                                                                            sx={{
                                                                                position: "absolute",
                                                                                top: 3,
                                                                                right: 3,
                                                                            }}
                                                                        >
                                                                            <BorderColorIcon fontSize="small" color="success" />
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                </div>
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                    {errors.delivery && <p className="text-red-600 mt-3">{errors.delivery.message}</p>}
                                                </RadioGroup>
                                            )}
                                        />
                                    </div>
                                ) : (
                                    <Nodata content={"Địa chỉ giao hàng của bạn trống"} />
                                )}
                            </Paper>

                            <Paper className="mt-5">
                                <Typography variant="h6" component="div" className="px-6 py-4 bg-[#f9fafd]">
                                    Cách thức giao hàng
                                </Typography>
                                <div className="px-6 pb-6 mt-2" style={errors?.deliveryMethod && { border: "1px solid red", borderRadius: 4 }}>
                                    <Controller
                                        name="deliveryMethod"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <RadioGroup {...field}>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel
                                                            value={0}
                                                            control={<Radio color="success" size="small" />}
                                                            label={
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography fontWeight={700}>
                                                                        Miễn phí giao hàng
                                                                        <Typography component="span" color="green" fontWeight={400}>
                                                                            ₫0.00
                                                                        </Typography>
                                                                    </Typography>
                                                                    <Typography color="gray">Thời gian dự kiến: Jun 21 – Jul 20</Typography>
                                                                    <Typography color="blue">Nhận đơn hàng đúng thời gian !</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel
                                                            value={1}
                                                            control={<Radio color="success" size="small" />}
                                                            label={
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography fontWeight={700}>
                                                                        Giao hành nhanh
                                                                        <Typography component="span" fontWeight={400}>
                                                                            ₫20.00
                                                                        </Typography>
                                                                    </Typography>
                                                                    <Typography color="gray">Thời gian dự kiến: Jun 21 – Jul 20</Typography>
                                                                    <Typography color="blue">
                                                                        Bạn sẽ nhận được hành nhanh hơn với vận chuyển này !
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel
                                                            value={2}
                                                            control={<Radio color="success" size="small" />}
                                                            label={
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography fontWeight={700}>
                                                                        Vận chuyển tiêu chuẩn
                                                                        <Typography component="span" fontWeight={400}>
                                                                            ₫10.00
                                                                        </Typography>
                                                                    </Typography>
                                                                    <Typography color="gray">Thời gian dự kiến: Jun 21 – Jul 20</Typography>
                                                                    <Typography color="blue">Nhận hàng đúng hẹn và tiết kiệm !</Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sm={6}>
                                                        <FormControlLabel
                                                            value={3}
                                                            control={<Radio color="success" size="small" />}
                                                            label={
                                                                <Box display="flex" flexDirection="column">
                                                                    <Typography fontWeight={700}>
                                                                        Giao hàng trong ngày
                                                                        <Typography component="span" fontWeight={400}>
                                                                            ₫30.00
                                                                        </Typography>
                                                                        <Typography
                                                                            component="span"
                                                                            sx={{
                                                                                backgroundColor: "#ffcc00",
                                                                                padding: "2px 5px",
                                                                                borderRadius: "5px",
                                                                                fontSize: "12px",
                                                                                marginLeft: "10px",
                                                                            }}
                                                                        >
                                                                            Nên sử dụng
                                                                        </Typography>
                                                                    </Typography>
                                                                    <Typography color="gray">Thời gian dự kiến: 1 ngày</Typography>
                                                                    <Typography color="blue" className="pb-5">
                                                                        Đơn hàng của bạn sẽ được ưu tiên vận chuyển và nhận trong ngày
                                                                    </Typography>
                                                                </Box>
                                                            }
                                                        />
                                                    </Grid>
                                                </Grid>
                                                {errors?.deliveryMethod && <p className="text-red-600 mt-3">{errors.deliveryMethod.message}</p>}
                                            </RadioGroup>
                                        )}
                                    />
                                </div>
                            </Paper>
                            <hr />
                            <Box className="pt-6">
                                <Typography variant="h6" component="div" className="px-6 py-4 bg-[#f9fafd]">
                                    Phương thức thanh toán
                                </Typography>
                                <div className="px-6" style={errors?.paymentMethod && { border: "1px solid red", borderRadius: 4 }}>
                                    <Controller
                                        name="paymentMethod"
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <RadioGroup
                                                {...field}
                                                onChange={(event) => {
                                                    field.onChange(event);
                                                    handlePaymentMethodChange(event);
                                                }}
                                            >
                                                <div className="flex">
                                                    <FormControlLabel
                                                        value={0}
                                                        control={<Radio color="success" size="small" />}
                                                        label={
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                }}
                                                            >
                                                                Thẻ ngân hàng
                                                                <img
                                                                    src="/assets/images/visa4.png"
                                                                    alt="credit cards"
                                                                    className="w-9 ml-2 rounded-sm"
                                                                />
                                                                <img
                                                                    src="/assets/images/visa3.png"
                                                                    alt="credit cards"
                                                                    className="w-9 ml-2 rounded-sm"
                                                                />
                                                                <img
                                                                    src="/assets/images/visa2.jpg"
                                                                    alt="credit cards"
                                                                    className="w-9 ml-2 rounded-sm"
                                                                />
                                                            </div>
                                                        }
                                                    />
                                                    <FormControlLabel value={1} control={<Radio color="success" size="small" />} label="Tiền mặt" />
                                                    <FormControlLabel value={3} control={<Radio color="success" size="small" />} label="Momo" />
                                                    {/* <FormControlLabel value="Coupon" control={<Radio color="success" />} label="Phiếu giảm giá" /> */}
                                                </div>
                                                {errors?.paymentMethod && <p className="text-red-600 mt-3">{errors.paymentMethod.message}</p>}
                                            </RadioGroup>
                                        )}
                                    />
                                </div>

                                {paymentMethod == 0 && <CreaditCard />}

                                {/* Buttons */}
                                <Box className="mt-3">
                                    <LoadingButton loading={orderLoading} loadingPosition="center" variant="contained" color="success" type="submit">
                                        Xác nhận và thanh toán
                                    </LoadingButton>
                                </Box>
                            </Box>
                        </div>
                    </form>
                </Box>

                <div className="w-1/3">
                    <OrderSummary />
                </div>
            </div>
            <Fragment>
                <Dialog
                    open={openDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => {
                        setOpenDialog(false);
                        navigate("/product/list?skip=0&take=10&date=-1&price=-1&discount=0");
                    }}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>Đặt hàng thành công</DialogTitle>
                    <DialogContent>
                        <div className="flex justify-center">
                            <img src="/assets/images/success-order.png" alt="success image" className="w-52" />
                        </div>

                        <p className="mt-2">
                            Đặt hàng thành công&nbsp;
                            <Link
                                to={"/product/list?skip=0&take=10&date=-1&price=-1&discount=0"}
                                className="hover:underline underline-offset-4  hover:text-green-700"
                            >
                                tiếp tục mua sắm
                            </Link>
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() => {
                                setOpenDialog(false);
                                navigate("/product/list?skip=0&take=10&date=-1&price=-1&discount=0");
                            }}
                        >
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        </div>
    );
}
