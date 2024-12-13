import { Avatar, Box, Link, Rating, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import TotalSellsChart from "./TotalSellsChart";
import { useEffect, useState } from "react";
import { getReviewsByStoreApi } from "../../../apis/review.api";
import { Nodata } from "@components";
import { formatDate } from "../../../services/functions";

const Index = () => {
    const [reviews, setReviews] = useState();
    const params = {
        skip: 0,
        take: 10,
    };

    useEffect(() => {
        (async () => {
            const response = await getReviewsByStoreApi(params);
            console.log(response);
            if (!response.error) {
                setReviews(response.data);
            }
        })();
    }, []);
    return (
        <Box className="">
            <section className="bg-primary p-6 border-b border-gray-400">
                <p className="font-bold text-2xl">Bảng điều khiển: Seller</p>
                <p className="text-gray-400">Đây là những thống kê trong của hàng của bạn ngay bây giờ</p>
                <div className="flex space-x-6 mt-6">
                    <div className="flex space-x-4">
                        <img src="/assets/icons/icon-order.png" alt="dashboard image" className="w-12" />
                        <div>
                            <p className="font-semibold text-xl">57 đơn mới </p>
                            <p className="text-gray-400 text-sm">Đang chờ xử lý</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <img src="/assets/icons/icon-order-wating.png" alt="dashboard image" className="w-12" />
                        <div>
                            <p className="font-semibold text-xl">5 đơn hàng </p>
                            <p className="text-gray-400 text-sm">Đang chờ xác nhận</p>
                        </div>
                    </div>
                    <div className="flex space-x-4">
                        <img src="/assets/icons/icon-sold-out.png" alt="dashboard image" className="w-12" />
                        <div>
                            <p className="font-semibold text-xl">17 sản phẩm </p>
                            <p className="text-gray-400 text-sm">Đang hết hàng</p>
                        </div>
                    </div>
                </div>
                <div className="mt-6">
                    <TotalSellsChart />
                </div>
            </section>
            <section className="mt-4 p-6">
                <p className="font-bold text-2xl">Các đánh giá mới nhất</p>
                <p className="text-gray-400">Được liệt kê trên tất cả các sản phẩm của cửa hàng</p>
                <div className="mt-4">
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead className="na-table-header-tini">
                                <TableRow>
                                    <TableCell className="na-table-cell-tini" align="left" sx={{ width: "30%" }}>
                                        Sản phẩm
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="left" sx={{ width: "15%" }}>
                                        Tác giả
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="left" sx={{ width: "10%" }}>
                                        Hạng sao
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="left" sx={{ whiteSpace: "nowrap", width: "35%" }}>
                                        Nội dung
                                    </TableCell>
                                    <TableCell className="na-table-cell-tini" align="right" sx={{ whiteSpace: "nowrap", width: "10%" }}>
                                        Thời gian
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody className="na-table-body-tini">
                                {reviews?.map((review) => (
                                    <TableRow
                                        key={review?._id}
                                        sx={{
                                            "&:last-child td, &:last-child th": { border: 0 },
                                        }}
                                        className="na-table-row "
                                    >
                                        <TableCell>
                                            <div className="flex ">
                                                <img src={review?.productId?.images?.[0]?.url} alt="product image" className="w-14 h-14" />
                                                <p className="ml-4">{review?.productId?.name}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left" className="na-fs-16 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Avatar src={review?.authorInfo?.image?.url} />
                                                <p className="ml-4">{review?.authorInfo?.username}</p>
                                            </div>
                                        </TableCell>
                                        <TableCell align="left">
                                            <Rating size="small" name="read-only" value={review?.rating} readOnly />
                                        </TableCell>
                                        <TableCell align="left">
                                            <p>{review?.body}</p>
                                        </TableCell>
                                        <TableCell align="right">
                                            <p>{formatDate(review?.createdAt)}</p>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {reviews?.length == 0 && <Nodata content={"Bạn không có đơn đặt hàng nào"} />}
                        <div className="flex justify-between border-t border-gray-400 py-3">
                            <p>
                                <span>1 - 6 trong 15 đánh giá&nbsp;</span>
                                <Link href="/seller" underline="hover">
                                    Xem tất cả &gt;
                                </Link>
                            </p>
                            <Link href="/seller" underline="hover">
                                Tiếp &gt;
                            </Link>
                        </div>
                    </TableContainer>
                </div>
            </section>
        </Box>
    );
};

export default Index;
