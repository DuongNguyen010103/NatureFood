import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import ApexChart from "./SellWeekly";
import { Grid } from "@mui/material";
import LifeChart from "./lifechart";
import MonthChar from "./MonthChart";
import DonutChart from "./DonutChart";
import TopProductChart from "./TopProductChart";

export default function Dashboard() {
    return (
        <div>
            <Grid container spacing={4}>
                <Grid item md={4}>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold">Bán hàng hàng tuần</h2>
                        <p className="text-3xl font-bold mt-2">47.000 đô la</p>
                        <p className="text-green-500 mt-1">+3,5%</p>
                        <div className="mt-4 rounded">
                            <ApexChart />
                        </div>
                    </div>
                </Grid>

                <Grid item md={4}>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold">Tổng đơn hàng</h2>
                        <p className="text-3xl font-bold mt-2">58,4 nghìn</p>
                        <p className="text-blue-500 mt-1">+13,6%</p>
                        <div className=" mt-4  rounded">
                            <LifeChart />
                        </div>
                    </div>
                </Grid>

                <Grid item md={4}>
                    <div className="bg-white rounded-lg shadow p-6 h-full">
                        <h2 className="text-lg font-semibold">Tỉ lệ đơn hàng</h2>
                        <div className="mx-auto rounded-full flex items-center justify-center mt-4">
                            <DonutChart />
                        </div>
                    </div>
                </Grid>
            </Grid>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-gray-100 min-h-screen">
                {/* Sales Summary */}

                {/* Order Summary */}

                {/* Market Share */}

                {/* Weather */}
                {/* <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-3">
                    <h2 className="text-lg font-semibold">Thời tiết</h2>
                    <div className="flex items-center mt-4">
                        <div className="text-5xl mr-6">☀️</div>
                        <div>
                            <p className="text-xl font-bold">Thành phố Hồ Chí Minh</p>
                            <p>Nhiều nắng</p>
                            <p>Lượng mưa: 50%</p>
                            <p className="text-3xl font-bold">31°C</p>
                        </div>
                    </div>
                </div> */}

                {/* Project Progress */}
                <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold">Tổng doanh số</h2>
                        <select className="border rounded p-2 mt-4">
                            <option>Tháng 1</option>
                            <option>Tháng 2</option>
                            <option>Tháng 3</option>
                            <option>Tháng 4</option>
                            <option>Tháng 5</option>
                            <option>Tháng 6</option>
                            <option>Tháng 7</option>
                            <option>Tháng 8</option>
                            <option>Tháng 9</option>
                            <option>Tháng 10</option>
                            <option>Tháng 11</option>
                            <option>Tháng 12</option>
                        </select>
                    </div>
                    <div className="mt-4  rounded">
                        <MonthChar />
                    </div>
                </div>

                {/* Sales Overview */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold">Sản phẩm bán chạy</h2>
                    <div className="mt-4 space-y-4">
                        {[
                            { name: "Sate cay", progress: 100 },
                            { name: "Giấm táo", progress: 79 },
                            { name: "Nước cốt dừa", progress: 90 },
                            { name: "Muối tây ninh", progress: 40 },
                            { name: "Nước lẩu", progress: 70 },
                        ].map((project, index) => (
                            <div key={index} className="flex items-center">
                                <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-700">
                                    {project.name.charAt(0)}
                                </div>
                                <div className="flex-1 ml-4">
                                    <div className="flex justify-between text-sm">
                                        <span>{project.name}</span>
                                        <span>{project.progress} %</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full mt-1">
                                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
                    <h2 className="text-lg font-semibold mb-4">Sản phẩm bán chạy nhất</h2>
                    <div className="space-y-3">
                        {[
                            { name: "Quạ Pro", category: "Hạ cánh", revenue: "1311 đô la", percent: "39%" },
                            { name: "Giày Bốt4", category: "Danh mục đầu tư", revenue: "860 đô la", percent: "26%" },
                            { name: "Chim ưng", category: "Quản trị viên", revenue: "539 đô la", percent: "16%" },
                            { name: "Trơn tru", category: "Người xây dựng", revenue: "343 đô la", percent: "10%" },
                            { name: "Triều đại Pro", category: "Hãng", revenue: "280 đô la", percent: "8%" },
                        ].map((product, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div>
                                    <p className="font-medium">{product.name}</p>
                                    <p className="text-gray-500 text-sm">{product.category}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="mr-2 text-gray-700">{product.revenue}</p>
                                    <div className="w-32 h-2 bg-gray-200 rounded">
                                        <div className="h-2 bg-blue-500 rounded" style={{ width: product.percent }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <select className="p-2 bg-gray-50 border rounded">
                            <option>7 ngày qua</option>
                            <option>Tháng trước</option>
                            <option>6 tháng qua</option>
                        </select>
                    </div>
                </div> */}

                {/* <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Các tập tin được chia sẻ</h2>
                    <ul className="space-y-2">
                        {[
                            { name: "apple-smart-watch.png", user: "Antony", time: "Vừa mới đây" },
                            { name: "iphone.jpg", user: "Antony", time: "Hôm qua lúc 1:30 PM" },
                            { name: "Chim ưng v1.8.2", user: "Jane", time: "27 tháng 9 lúc 10:30 sáng" },
                            { name: "iMac.jpg", user: "Rowen", time: "23 tháng 9 lúc 6:10 chiều" },
                            { name: "chức năng.php", user: "John", time: "1 tháng 10 lúc 4:30 chiều" },
                        ].map((file, index) => (
                            <li key={index} className="flex justify-between">
                                <div>
                                    <p className="font-medium">{file.name}</p>
                                    <p className="text-gray-500 text-sm">
                                        {file.user} - {file.time}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div> */}

                {/* Container */}

                {/* User Activity */}
                <div className="bg-white rounded-lg shadow p-6 col-span-1 lg:col-span-2">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-700">Sản phẩm hàng đầu</h2>
                        <button className="text-blue-500 hover:underline">Xem chi tiết</button>
                    </div>
                    {/* Place your chart here */}
                    <div className="rounded-lg flex items-center justify-center">
                        <TopProductChart />
                    </div>
                </div>

                {/* Placeholder for Chart */}
                <div className="bg-white shadow-md rounded-lg p-4 lg:col-span-1">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Người dùng mới </h2>
                    <ul className="space-y-3">
                        {/* User List */}
                        {[
                            { name: "Trần Thế Công", role: "Quản trị viên", status: "online" },
                            { name: "Trùng Dương", role: "Người bán", status: "online" },
                            { name: "Mỹ Tâm", role: "Người bán", status: "offline" },
                            { name: "Test", role: "Người dùng", status: "offline" },
                            { name: "Người dùng 1", role: "Người dùng", status: "offline" },
                        ].map((user, index) => (
                            <li key={index} className="flex items-center">
                                <div className={`h-3 w-3 rounded-full ${user.status === "online" ? "bg-green-500" : "bg-gray-400"}`}></div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                                    <p className="text-sm text-gray-500">{user.role}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4">
                        <button className="text-blue-500 hover:underline">Tất cả người dùng đang hoạt động</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
