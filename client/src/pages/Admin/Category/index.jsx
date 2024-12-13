import { Box, Button, Grid, MenuItem, Paper, Select, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction, getCategoriesAction } from "../../../hooks/Redux/Category/categoryAction";
import { convertDate } from "../../../services/functions";
import useSnackNotify from "../../../components/SnackNotify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import CategoryCreateDialog from "./CategoryCreate";

const Index = () => {
    const [sortby, setSortby] = useState(10);
    const [openDialog, setOpenDialog] = useState(false);
    const [openCategoryCreate, setOpenCategoryCreate] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState();
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { data: categoryData, loading: categoryLoading } = useSelector((state) => state.category);

    const handleSortbyChange = (event) => {
        setSortby(event.target.value);
    };

    const handleDeleteCategory = async () => {
        const response = await dispatch(deleteCategoryAction(selectedCategory?._id));
        if (response?.error) {
            snackNotify("error")("Xóa danh mục thất bại");
        } else {
            snackNotify("success")("Đã xóa danh mục");
            setOpenDialog(false);
        }
    };

    const handleGetData = async () => {
        const response = await dispatch(getCategoriesAction());
        console.log(response);
    };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <Box>
            <Paper className="mb-4 p-[20px] flex justify-between items-center">
                <Typography variant="body1">Hiển thị 1-24 trong 205 danh mục</Typography>
                <div className="flex ">
                    <div className="mr-3">
                        <span className="mr-2">Sắp xếp theo</span>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={sortby}
                            onChange={handleSortbyChange}
                            size="small"
                            sx={{ padding: "2px 8px" }}
                            inputProps={{ sx: { padding: "2px 8px" } }}
                        >
                            <MenuItem value={10}>Ngày tạo</MenuItem>
                            <MenuItem value={20}>Số sản phẩm</MenuItem>
                        </Select>
                    </div>
                    <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => setOpenCategoryCreate(true)}
                        startIcon={<NoteAddIcon />}
                        sx={{ textTransform: "none" }}
                    >
                        Tạo danh mục
                    </Button>
                </div>
            </Paper>
            <Grid container spacing={2}>
                {categoryData?.categories?.map((category) => (
                    <Grid key={category._id} item md={6}>
                        <Paper>
                            <Box className="flex justify-between p-2">
                                <div className="w-[90px] h-[100px] flex justify-center">
                                    <img src={category?.image?.url} alt="category image" className="h-full object-cover" />
                                </div>
                                <div className="px-2 flex-1">
                                    <p className="font-semibold text-truncate-2 text-lg leading-5 mb-1">{category?.name}</p>
                                    <Typography variant="body2" color="text.secondary">
                                        {"Ngày tạo: " + convertDate(category?.createdAt)}
                                    </Typography>
                                </div>
                                <div>
                                    <div className="flex text-[#d26426]">
                                        <div className="text-2xl font-semibold">232</div>
                                        <div className="ml-2 font-medium text-gray-500 mt-2 whitespace-nowrap">sản phẩm</div>
                                    </div>
                                    <Box className="flex mt-1 justify-between">
                                        <Tooltip title="Chỉnh sửa" placement="top">
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    padding: "3px 12px",
                                                    mr: 1,
                                                }}
                                                size="small"
                                                className="btn-product-cart"
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                        </Tooltip>
                                        <Tooltip title="Xóa" placement="top">
                                            <Button
                                                variant="outlined"
                                                sx={{
                                                    padding: "3px 12px",
                                                }}
                                                size="small"
                                                onClick={() => {
                                                    setSelectedCategory(category);
                                                    setOpenDialog(true);
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" color="error" />
                                            </Button>
                                        </Tooltip>
                                    </Box>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
            <ConfirmDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                title={"Xóa danh mục"}
                content={`Bạn có chắc chắn muốn xóa danh mục ${selectedCategory?.name}`}
                object={selectedCategory}
                handleConfirm={handleDeleteCategory}
                loading={categoryLoading}
            />

            <CategoryCreateDialog openCategoryCreate={openCategoryCreate} setOpenCategoryCreate={setOpenCategoryCreate} />
        </Box>
    );
};

export default Index;
