import { Box, Button, CircularProgress, Link } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CreateBannerModal from "../../../components/Modals/CreateBannerModal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannersByCurrentUserAction } from "../../../hooks/Redux/Banner/bannerAction";
import { Nodata } from "../../../components";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const headerItems = ["Hình ảnh", "Ngày đk", "Ngày hết hạn", "Link", "Tùy chọn"];
const Index = () => {
    const dispatch = useDispatch();
    const { data: bannerData, loading: bannerLoading, error: bannerError } = useSelector((state) => state.banner);
    const [isOpenCreateBanner, setIsOpenCreateBanner] = useState(false);
    useEffect(() => {
        dispatch(getBannersByCurrentUserAction());
    }, [dispatch]);

    return (
        <Box className="">
            <Box className="flex justify-between p-2">
                <p>Tìm kiếm</p>
                <Button variant="contained" color="success" sx={{ textTransform: "none" }} onClick={() => setIsOpenCreateBanner(true)}>
                    Đăng ký Banner
                </Button>
            </Box>

            {bannerLoading ? (
                <Box className="grid h-96 place-items-center border-t-2" sx={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
                    <CircularProgress color="warning" />
                </Box>
            ) : bannerData.length === 0 ? (
                <Nodata content="Bạn chưa đăng ký banner nào" />
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: "black" }}>
                            <TableRow>
                                {headerItems.map((item, index) => (
                                    <TableCell key={`header cell ${index}`} sx={{ color: "white" }} align={index === 0 ? "left" : "right"}>
                                        {item}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bannerData?.banners?.map((banner, index) => (
                                <TableRow
                                    key={`banner-${index}`}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <img src={banner.image.url} alt="" width="150px" />
                                    </TableCell>
                                    <TableCell align="right">{banner.createdAt}</TableCell>
                                    <TableCell align="right">{banner.updatedAt}</TableCell>
                                    <TableCell
                                        align="right"
                                        sx={{
                                            textDecoration: "none",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "150px", // Đặt chiều rộng tối đa để hiệu ứng ẩn hoạt động
                                        }}
                                    >
                                        <Link
                                            href={banner.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                textDecoration: "none",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                maxWidth: "150px", // Đặt chiều rộng tối đa để hiệu ứng ẩn hoạt động
                                            }}
                                        >
                                            {banner.url}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box>
                                            <Button
                                                variant="contained"
                                                color="warning"
                                                size="small"
                                                sx={{
                                                    mr: 1,
                                                    textTransform: "none",
                                                }}
                                            >
                                                Sửa
                                            </Button>
                                            <Button variant="contained" color="error" size="small" sx={{ textTransform: "none" }}>
                                                Xóa
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <CreateBannerModal open={isOpenCreateBanner} setIsOpenCreateBanner={setIsOpenCreateBanner} />
        </Box>
    );
};

export default Index;
