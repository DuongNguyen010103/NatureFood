import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import "../../../assets/styles/main.css";
import { Container, Grid, Typography } from "@mui/material";
import NoteIcon from "@mui/icons-material/Note";

const Index = () => {
    return (
        <footer className="footer">
            <Container className="flex py-6" maxWidth="xl">
                <div className="w-1/3">
                    <div className="flex">
                        <div className="">
                            <img src="/assets/images/logo.png" alt="Phoenix Logo" className="w-[80px] h-[40px]" />
                        </div>
                        <div className="">
                            <p className="text-3xl font-bold ml-3">NatureFood</p>
                        </div>
                    </div>
                    <p className="mt-3">
                        NatureFood là một mẫu bảng điều khiển quản trị với các tính năng thú vị và bố cục tuyệt vời. Mẫu này tương thích với tất cả
                        các trình duyệt chính và tương thích với tất cả các thiết bị và kích thước màn hình có sẵn.
                    </p>
                </div>
                <div className="w-2/3 ">
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <div className="footer-column">
                                <h3>Về NatureFood</h3>
                                <a href="#">Cơ Hội Nghề Nghiệp</a>
                                <a href="#">Chương Trình Liên Kết</a>
                                <a href="#">Chính Sách Bảo Mật</a>
                                <a href="#">Điều Khoản & Điều Kiện</a>
                            </div>
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <div className="footer-column">
                                <h3>Giữ Liên Lạc</h3>
                                <a href="http://localhost:5173/blog/list?skip=0&take=10&date=-1">
                                    <NoteIcon />
                                    &nbsp;Blog
                                </a>
                                <a href="https://www.facebook.com/the.cong.790">
                                    <FacebookIcon /> Facebook
                                </a>
                                <a href="#">
                                    <TwitterIcon /> Twitter
                                </a>
                            </div>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <div className="footer-column">
                                <h3>Dịch Vụ Khách Hàng</h3>
                                <a href="https://www.facebook.com/profile.php?id=61568904243860&mibextid=LQQJ4d">Trung Tâm Giúp Đỡ</a>
                                <a href="https://www.facebook.com/profile.php?id=61568904243860&mibextid=LQQJ4d">Hỗ Trợ 24/7</a>
                                <a href="https://www.facebook.com/profile.php?id=61568904243860&mibextid=LQQJ4d">Cộng Đồng NatureFood</a>
                            </div>
                        </Grid>

                        <Grid item xs={6} md={3}>
                            <div className="footer-column">
                                <h3>Phương Thức Thanh Toán</h3>
                                <a href="http://localhost:5173/checkout">Thanh Toán Khi Nhận Hàng</a>
                                <a href="http://localhost:5173/checkout">Thanh Toán Trực Tuyến</a>
                                <a href="http://localhost:5173/checkout">PayPal</a>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </footer>
    );
};

export default Index;
