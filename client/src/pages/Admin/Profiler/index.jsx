import { Button } from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const ProfileSettings = () => {
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        birthday: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex bg-gray-100 min-h-screen p-7 flex-col items-center">
            {/* Profile Settings Header */}
            <h3 className="text-3xl font-bold mb-6">Tài khoản</h3>

            <div className="flex w-full max-w-8xl">
                {/* Sidebar */}
                <div className="w-1/4 bg-white p-4 shadow-md">
                    <ul>
                        <li className="mb-2">
                            <NavLink
                                to="/overview"
                                className="text-[#47484A] hover:bg-blue-100 hover:text-blue p-2 rounded"
                                activeClassName="font-bold"
                            >
                                Tổng quan
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/operators"
                                className="text-[#47484A] hover:bg-blue-100 hover:text-blue p-2 rounded"
                                activeClassName="font-bold"
                            >
                                Người điều hành
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/admin-accounts"
                                className="text-[#47484A] hover:bg-blue-100 hover:text-blue p-2 rounded"
                                activeClassName="font-bold"
                            >
                                Tài khoản quản trị
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/mail-settings"
                                className="text-[#47484A] hover:bg-blue-100 hover:text-blue p-2 rounded"
                                activeClassName="font-bold"
                            >
                                Cài đặt Mail
                            </NavLink>
                        </li>
                        <li className="mb-2">
                            <NavLink
                                to="/newsletter"
                                className="text-[#47484A] hover:bg-blue-100 hover:text-blue p-2 rounded"
                                activeClassName="font-bold"
                            >
                                Bản tin
                            </NavLink>
                        </li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="w-3/4 flex">
                    {/* Form Section */}
                    <div className="w-2/3 p-6 bg-white shadow-md mr-4">
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-gray-700">Tên</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={form.firstName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Họ và tên lót</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={form.lastName}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700">Email</label>
                                <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>
                            <div>
                                <label className="block text-gray-700">Số điện thoại</label>
                                <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Địa chỉ</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700">Ngày sinh</label>
                                <input
                                    type="date"
                                    name="birthday"
                                    value={form.birthday}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6">Lưu thay đổi</button>
                    </div>

                    {/* Avatar Section */}
                    <div className="w-1/3 flex flex-col items-center justify-center bg-white shadow-md p-4">
                        <img src="/assets/images/anhdeptroai2.jpg" alt="Profile" className="rounded-full w-32 h-32 object-cover mb-4" />
                        <button className="bg-gray-200 px-4 py-2 rounded border">Đổi ảnh đại diện</button>
                    </div>
                </div>
            </div>

            {/* Password and Remove Account Section */}
            <div className="w-full max-w-8xl mt-8 flex justify-between">
                <div className="bg-slate-200 shadow-md p-4 w-1/2 mr-2">
                    <h4 className="text-gray-700 font-semibold mb-2">Mật khẩu</h4>
                    <p className="text-gray-600">Bạn có thể thay đổi mật khẩu bằng cách nhấn vào biểu tượng bên dưới</p>
                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "8px",
                            border: "2px solid white",
                        }}
                    >
                        Thay đổi
                    </Button>
                </div>
                <div className=" shadow-md p-4 w-1/2 ml-2 bg-slate-200">
                    <h4 className="text-gray-700 font-semibold mb-2  ">Xóa tài khoản</h4>
                    <p className="text-gray-600">Một khi bạn xóa tài khoản, sẽ không có cách nào quay lại được nữa.</p>
                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: "white",
                            color: "red",
                            borderRadius: "8px",
                            border: "2px solid white", // Đặt viền màu trắng
                        }}
                    >
                        Hủy kích hoạt
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
