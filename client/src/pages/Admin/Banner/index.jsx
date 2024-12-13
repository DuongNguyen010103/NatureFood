import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Select,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertDate } from "../../../services/functions";
import useSnackNotify from "../../../components/SnackNotify";
import ConfirmDialog from "../../../components/ConfirmDialog";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import BannerCreateDialog from "./BannerCreate";
import {
    deleteBannerAction,
    getBannersAction,
    updateBannerAction,
} from "../../../hooks/Redux/Banner/bannerAction";
import { ChipStyled } from "../../../components";

export default function Index() {
    const [sortby, setSortby] = useState(10);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openBannerCreate, setOpenBannerCreate] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState();
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const { data: bannerData, loading: bannerLoading } = useSelector(
        (state) => state.banner
    );

    const handleSortbyChange = (event) => {
        setSortby(event.target.value);
    };

    const handleUpdateBanner = async (banner) => {
        const updateData = {
            id: banner?._id,
            data: { status: banner?.status == 0 ? 1 : 0 },
        };
        const response = await dispatch(updateBannerAction(updateData));
        if (response?.payload?._id) {
            snackNotify("success")("Đã xóa danh mục");
            setOpenConfirmDialog(false);
        } else {
            snackNotify("error")("Xóa danh mục thất bại");
        }
    };

    const handleDeleteBanner = async () => {
        const response = await dispatch(
            deleteBannerAction(selectedBanner?._id)
        );
        if (response?.payload?._id) {
            snackNotify("success")("Đã xóa danh mục");
            setOpenConfirmDialog(false);
        } else {
            snackNotify("error")("Xóa danh mục thất bại");
        }
    };

    const handleGetData = async () => {
        const response = await dispatch(getBannersAction());
        console.log(response);
    };
    useEffect(() => {
        handleGetData();
    }, []);
    return (
        <Box>
            <Paper className="mb-4 p-[20px] flex justify-between items-center">
                <Typography variant="body1">
                    Hiển thị 1-24 trong 205 banner
                </Typography>
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
                        onClick={() => setOpenBannerCreate(true)}
                        startIcon={<NoteAddIcon />}
                        sx={{ textTransform: "none" }}
                    >
                        Thêm banner
                    </Button>
                </div>
            </Paper>
            <Grid container spacing={2}>
                {bannerData?.banners?.map((banner) => (
                    <Grid key={banner._id} item md={6}>
                        <Paper>
                            <Box className="flex justify-between p-2">
                                <div className="w-[200px] h-[100px]">
                                    <img
                                        src={banner?.image?.url}
                                        alt="banner image"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="px-2 flex-1">
                                    <p className="font-semibold text-truncate-2 text-lg leading-5 mb-1">
                                        {banner?.name}
                                    </p>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        className="text-truncate-3"
                                    >
                                        {banner?.description}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {"Ngày tạo: " +
                                            convertDate(banner?.createdAt)}
                                    </Typography>
                                </div>
                                <div className="flex flex-col">
                                    {banner?.status ? (
                                        <div className="flex flex-col">
                                            <ChipStyled
                                                label="Đã khóa"
                                                variant="outlined"
                                                color="warning"
                                            />
                                            <Button
                                                variant="contained"
                                                color="success"
                                                sx={{
                                                    mt: 1,
                                                    textTransform: "none",
                                                }}
                                                size="small"
                                                onClick={() => {
                                                    handleUpdateBanner(banner);
                                                }}
                                            >
                                                Mở banner
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            <ChipStyled
                                                label="Đang hoạt động"
                                                variant="outlined"
                                                color="success"
                                            />
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                sx={{
                                                    mt: 1,
                                                    textTransform: "none",
                                                }}
                                                size="small"
                                                onClick={() => {
                                                    handleUpdateBanner(banner);
                                                }}
                                            >
                                                Khóa banner
                                            </Button>
                                        </div>
                                    )}

                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        sx={{ mt: 1, textTransform: "none" }}
                                        onClick={() => {
                                            setSelectedBanner(banner);
                                            setOpenConfirmDialog(true);
                                        }}
                                    >
                                        Xóa banner
                                    </Button>
                                </div>
                            </Box>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <BannerCreateDialog
                openBannerCreate={openBannerCreate}
                setOpenBannerCreate={setOpenBannerCreate}
            />

            <ConfirmDialog
                openDialog={openConfirmDialog}
                setOpenDialog={setOpenConfirmDialog}
                title={"Xóa banner"}
                content={`Bạn có chắc chắn muốn xóa banner ${selectedBanner?.name}`}
                handleConfirm={handleDeleteBanner}
                loading={bannerLoading}
            />
        </Box>
    );
}
