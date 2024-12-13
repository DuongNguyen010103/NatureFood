import {
    Backdrop,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    FormControl,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    styled,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateProductYup } from "../../../validations/yup.validations";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../../../hooks/Redux/Category/categoryAction";
import { getTagsAction } from "../../../hooks/Redux/Tag/tagAction";
import { useSnackbar } from "notistack";
import { rootColor } from "../../../theme/colors";
import { createProductAction } from "../../../hooks/Redux/Product/productAction";
import useSnackNotify from "../../../components/SnackNotify";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    padding: "10px",
    borderRadius: "10px",
}));

const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: 48 * 4.5 + 8,
            width: 250,
        },
    },
};

//main
const Index = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();

    const { data: categoryData, loading } = useSelector((state) => state.category);
    const { data: tagData } = useSelector((state) => state.tag);
    console.log(tagData);

    const { loading: productLoading } = useSelector((state) => state.product);
    const [images, setImages] = useState([]);
    const [imagesData, setImagesData] = useState([{}]);
    const [categorySelected, setCategorySelected] = useState("");
    const [tagsSelected, setTagsSelected] = useState([]);
    const [isOpenBackdrop, setisOpenBackdrop] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(CreateProductYup),
    });

    const handleTagSelectedChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagsSelected(typeof value === "string" ? value.split(",") : value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagesData(files);
        const imagesUrl = files.map((file) => URL.createObjectURL(file));
        setImages(imagesUrl);
    };

    const snackResultSubmit = (variant) => (message) => {
        // variant could be success, error, warning, info, or default
        enqueueSnackbar(message, { variant });
    };

    const onSubmit = async (formData) => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            if (key === "tags" && Array.isArray(formData[key])) {
                formData[key].forEach((tag) => formDataToSend.append("tags", tag));
            } else {
                formDataToSend.append(key, formData[key]);
            }
        }
        imagesData.forEach((image, index) => {
            formDataToSend.append(`images`, image);
        });
        const response = await dispatch(createProductAction(formDataToSend));
        if (response?.payload?._id) {
            setTagsSelected([]);
            setCategorySelected("");
            setImages([]);
            reset();
            snackNotify("success")("Tạo sản phẩm thành công");
        } else {
            snackNotify("error")("Tạo sản phẩm thất bại");
        }
    };

    useEffect(() => {
        dispatch(getCategoriesAction());
        dispatch(getTagsAction());
    }, []);
    return (
        <Box sx={{ pb: "24px", bgcolor: rootColor.bg_blue }}>
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Box className="flex">
                    <Item elevation={2} className="w-2/3 mr-6">
                        <p className="text-lg font-semibold text-black">Thông tin chung</p>
                        <div>
                            <label htmlFor="name" className="text-base text-black ">
                                Tên sản phẩm
                            </label>
                            <TextField
                                {...register("name")}
                                className="mt-1 w-full"
                                id="name"
                                size="small"
                                placeholder="Tên cửa hàng"
                                variant="outlined"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <label htmlFor="description" className="text-base text-black">
                                Mô tả sản phẩm
                            </label>
                            <TextField
                                {...register("description")}
                                minRows={5}
                                multiline
                                size="small"
                                variant="outlined"
                                placeholder="Giới thiệu sản phẩm ..."
                                className="mt-1 w-full"
                                id="description"
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                required
                            />
                        </div>
                    </Item>
                    <Item elevation={2} className="w-1/3 flex flex-col" sx={{ position: "relative" }}>
                        <p className="text-lg font-semibold text-black">Quảng bá sản phẩm</p>
                        <p className="text-base text-black">Hình ảnh</p>
                        <Swiper effect={"cards"} grabCursor={true} modules={[EffectCards]} className="swiper-create-product mt-1 px-5">
                            {images.map((image, index) => (
                                <SwiperSlide key={`iamge-${index}`} className="swiper-slide_styled">
                                    <img src={image} alt={`upload-${index}`} />
                                </SwiperSlide>
                            ))}

                            {images.length < 1 ? (
                                <SwiperSlide className="swiper-slide-styled">
                                    <p className="text-center text-black">Chọn ảnh cho sản phẩm</p>
                                </SwiperSlide>
                            ) : null}
                        </Swiper>

                        <Input
                            // {...register("image")}
                            type="file"
                            // multiple
                            // accept="image/*"
                            inputProps={{ multiple: true }}
                            id="images"
                            name="images"
                            onChange={handleImageChange}
                            required
                            // error={!!errors?.images}
                        />
                        {errors?.images ? <p className="text-red-500">{errors.images.message}</p> : null}
                    </Item>
                </Box>

                {/* PRICE - weight */}
                <Box className="mt-6 flex">
                    <Item elevation={2} className="w-2/3 mr-6">
                        <p className="text-lg font-semibold text-black">Giá thành - Đơn vị tính</p>
                        <Grid container spacing={2}>
                            <Grid item md={6}>
                                <div>
                                    <label htmlFor="price" className="text-base text-black ">
                                        Giá đại lý
                                    </label>

                                    <FormControl variant="outlined" className="w-full pr-10">
                                        <OutlinedInput
                                            {...register("price")}
                                            className="mt-1 w-1/2"
                                            fullWidth
                                            id="price"
                                            size="small"
                                            error={!!errors.price}
                                            required
                                            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                                        />
                                        <p className="text-red-500">{errors?.price ? errors.price.message : null}</p>
                                    </FormControl>
                                </div>
                            </Grid>
                            <Grid item md={6}>
                                <div>
                                    <label htmlFor="price" className="text-base text-black ">
                                        Giá thị trường
                                    </label>

                                    <FormControl variant="outlined" className="w-full pr-10">
                                        <OutlinedInput
                                            {...register("salePrice")}
                                            className="mt-1 w-1/2"
                                            id="price"
                                            size="small"
                                            fullWidth
                                            error={!!errors.price}
                                            required
                                            endAdornment={<InputAdornment position="end">VNĐ</InputAdornment>}
                                        />
                                        <p className="text-red-500">{errors?.price ? errors.price.message : null}</p>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item md={6}>
                                <div className="mt-4">
                                    <p className="text-nowrap text-base text-black ">Đơn vị tính</p>

                                    <FormControl fullWidth>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={20}
                                            onChange={() => {}}
                                            className="mt-1"
                                            size="small"
                                        >
                                            <MenuItem value={10}>Thùng</MenuItem>
                                            <MenuItem value={20}>Chai</MenuItem>
                                            <MenuItem value={30}>Gói</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </Grid>

                            <Grid item md={6}>
                                <div className="mt-4">
                                    <label htmlFor="name" className="text-base text-black ">
                                        Cân nặng
                                    </label>
                                    <FormControl variant="outlined" className="w-full pr-10">
                                        <OutlinedInput
                                            {...register("weight")}
                                            className="mt-1"
                                            id="price"
                                            size="small"
                                            error={!!errors.weight}
                                            required
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <Select
                                                        value={0}
                                                        label="Age"
                                                        onChange={(event) => {}}
                                                        className="mt-1"
                                                        sx={{
                                                            ".MuiOutlinedInput-notchedOutline": {
                                                                border: "none",
                                                            },
                                                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                                                border: "none",
                                                            },
                                                        }}
                                                        size="small"
                                                    >
                                                        <MenuItem value={0}>miligram</MenuItem>
                                                        <MenuItem value={1}>gram</MenuItem>
                                                        <MenuItem value={2}>kg</MenuItem>
                                                    </Select>
                                                </InputAdornment>
                                            }
                                        />
                                        <p className="text-red-500">{errors?.weight ? errors.weight.message : null}</p>
                                    </FormControl>
                                </div>
                            </Grid>
                        </Grid>
                    </Item>

                    {/* Product type */}
                    <Item elevation={2} className="w-1/3">
                        <p className="text-lg font-semibold text-black">Phân loại</p>
                        <p className="text-base text-black">Danh mục</p>
                        <Select
                            {...register("category", {
                                required: "Category is required",
                            })}
                            value={categorySelected || ""}
                            onChange={(e) => {
                                setCategorySelected(e.target.value);
                                console.log(e.target.value);
                            }}
                            className="mt-1 w-full"
                            size="small"
                            error={!!errors.category}
                            required
                        >
                            {categoryData?.categories?.map((category, index) => (
                                <MenuItem key={`category-${index}`} value={category?._id}>
                                    {category?.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <p className="text-red-500">{errors?.category ? errors.category.message : null}</p>

                        <FormControl className="w-full" sx={{ mt: 4 }}>
                            <InputLabel id="demo-multiple-checkbox-label">#HangTag</InputLabel>
                            <Select
                                {...register("tags")}
                                multiple
                                value={tagsSelected || ""}
                                onChange={handleTagSelectedChange}
                                size="small"
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                                input={<OutlinedInput label="#HangTag" />}
                            >
                                {tagData?.tags?.map((item) => (
                                    <MenuItem key={item?._id} value={item?._id.toString()}>
                                        <Checkbox checked={tagsSelected.indexOf(item?._id.toString()) > -1} />
                                        <ListItemText primary={item?.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Item>
                </Box>
                <Box className="mt-6">
                    <Item elevation={2} className="w-2/3 mr-6">
                        <p className="text-lg font-semibold text-black">Số lượng</p>
                        <div>
                            <label htmlFor="inventory" className="text-base text-black ">
                                Kho
                            </label>

                            <TextField
                                {...register("inventory")}
                                className="mt-1 w-full"
                                placeholder="Tên cửa hàng"
                                variant="outlined"
                                id="inventory"
                                size="small"
                                error={!!errors.inventory}
                                helperText={errors.inventory?.message}
                                required
                            />
                        </div>
                    </Item>
                </Box>
                <Box className="text-center">
                    <LoadingButton
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ mt: "24px", textTransform: "none" }}
                        loading={productLoading}
                        loadingPosition="end"
                        endIcon={<AddIcon />}
                    >
                        Tạo sản phẩm
                    </LoadingButton>
                </Box>
            </form>
        </Box>
    );
};

export default Index;
