import React, { useState, useEffect } from "react";
import { Button, Radio, RadioGroup, FormControlLabel, FormControl, Paper, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import dayjs from "dayjs";
import useSnackNotify from "../../../../components/SnackNotify";
import { updateCurrentUserAction } from "../../../../hooks/Redux/User/userAction";
import DialogPassword from "./DialogPassword";

function ProfileSettings() {
    const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const [formData, setFormData] = useState({
        username: "",
        phone: "",
        gender: 0,
        birthday: "",
        password: "",
    });

    const handleInputChange = (e) => {
        if (e?.target) {
            const { name, value, type, checked } = e.target;
            setFormData({
                ...formData,
                [name]: type === "checkbox" ? checked : value,
            });
        } else {
            setFormData({
                ...formData,
                birthday: e ? dayjs(e).format("DD-MM-YYYY") : "",
            });
        }
    };

    const onSubmit = async () => {
        const response = await dispatch(updateCurrentUserAction(formData));
        console.log(response);

        if (response?.error) {
            snackNotify("error")(response.payload.response.data.data.split("\n")[0]);
        } else {
            snackNotify("success")("Cập nhật thông tin thành công");
            setOpen(false);
        }
    };

    useEffect(() => {
        setFormData({
            username: currentUser?.username,
            phone: currentUser?.phone,
            gender: currentUser?.gender,
            birthday: currentUser?.birthday,
            password: "",
        });
    }, [currentUser]);
    return (
        <Paper className="p-6 mb-3">
            <div className="">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center mb-3  ">
                        <img
                            src={
                                (formData?.image && URL.createObjectURL(formData?.image)) ||
                                currentUser?.image?.url ||
                                "/assets/images/famale-no-avatar.png"
                            }
                            alt="avatar"
                            className="object-cover h-full w-full rounded-full"
                        />
                    </div>
                    <div>
                        <input
                            accept="image/*"
                            style={{ display: "none" }}
                            id="upload-button-file"
                            type="file"
                            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                        />
                        <Button variant="outlined" color="warning" size="small" className="na-text-transform-none">
                            <label htmlFor="upload-button-file">Tải ảnh lên</label>
                        </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                        Phải là tệp .jpg, .gif hoặc .png có kích thước nhỏ hơn 10MB và có kích thước tối thiểu là 400px x 400px.
                    </p>
                </div>

                <div className="flex items-center mb-2">
                    <label className="text-gray-700 font-semibold mr-2">Tên của bạn:&nbsp;</label>
                    <TextField value={formData?.username || ""} onChange={handleInputChange} variant="standard" name="username" />
                </div>

                <hr className="mt-6 mb-3" />
                <div className="flex items-center mb-2">
                    <label className="text-gray-700 font-semibold mr-2">Số điện thoại:&nbsp;</label>
                    <TextField
                        variant="standard"
                        placeholder="Số điện thoại"
                        size="small"
                        value={formData?.phone || ""}
                        required
                        name="phone"
                        onChange={handleInputChange}
                    />
                </div>

                <hr className="mt-6 mb-3" />
                <FormControl component="fieldset" className="w-full mb-3">
                    <RadioGroup row value={formData?.gender || 0} name="gender" onChange={handleInputChange}>
                        <FormControlLabel value={2} control={<Radio />} label="Nữ" />
                        <FormControlLabel value={1} control={<Radio />} label="Nam" />
                        <FormControlLabel value={0} control={<Radio />} label="Không muốn tiết lộ" />
                    </RadioGroup>
                </FormControl>

                <hr className="mt-6 mb-3" />

                <div className="mb-4">
                    <label className="text-gray-700 font-semibold mr-2">Ngày sinh:&nbsp;</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            placeholder="Ngày sinh"
                            format="DD-MM-YYYY"
                            size="small"
                            name="birthday"
                            value={dayjs(formData?.birthday || "")}
                            onChange={handleInputChange}
                        />
                    </LocalizationProvider>
                </div>
            </div>

            <div className="text-center">
                <Button variant="contained" color="success" size="small" onClick={() => setOpen(true)}>
                    Lưu thay đổi
                </Button>
            </div>
            <DialogPassword open={open} setOpen={setOpen} onSubmit={onSubmit} formData={formData} handleInputChange={handleInputChange} />
        </Paper>
    );
}

export default ProfileSettings;
