import { Button, MenuItem, Pagination, Paper, Select, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { formatDate, useQuery } from "../../../services/functions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useSnackNotify from "../../../components/SnackNotify";
import { useEffect } from "react";
import { getBlogsAction } from "../../../hooks/Redux/Blog/blogAction";

const productsEachPage = 10;

export default function Blogs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const snackNotify = useSnackNotify();
    const query = useQuery();
    const { data: blogData } = useSelector((state) => state.blog);
    const params = {
        skip: query.get("skip"),
        take: query.get("take"),
        date: query.get("date"),
        type: "enable",
    };

    const handlePaginationChange = (event, value) => {
        navigate(`/blog/list?skip=${(value - 1) * productsEachPage}&take=${productsEachPage}&date=${params.date}`);
    };

    useEffect(() => {
        (async () => {
            console.log("boggggg: ", params);
            const response = await dispatch(getBlogsAction(params));

            if (response?.error) {
                snackNotify("error")("Lấy blogs lỗi");
            }
        })();
    }, [params.skip, params.take, params.date]);
    return (
        <div>
            <Paper className="p-4">
                <div className="flex justify-between items-center">
                    <p>
                        Hiển thị&nbsp;
                        <strong className="text-orange">{productsEachPage > blogData?.total ? blogData?.total : productsEachPage}</strong>
                        &nbsp;trong&nbsp;
                        <strong className="text-green-700">{blogData?.total}</strong>&nbsp;bài viết
                    </p>
                    <div className="flex space-x-2 items-center">
                        <p className=" text-gray-600">Sắp xếp theo:</p>
                        <Select
                            variant="standard"
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={params.date}
                            size="small"
                            onChange={(e) => navigate(`/blog/list?skip=${params.skip}&take=${params.take}&date=${e.target.value}`)}
                            sx={{ minWidth: "100px" }}
                        >
                            <MenuItem value={-1}>Mới nhất</MenuItem>
                            <MenuItem value={1}>Cũ nhất</MenuItem>
                        </Select>
                    </div>
                </div>
            </Paper>
            <div className="mt-4">
                {blogData?.blogs.map((item) => (
                    <div key={item?._id}>
                        <div className="flex">
                            <div className="w-1/4 h-[180px]">
                                <img src={item?.image?.url} alt="" className="h-full object-cover rounded-xl" />
                            </div>
                            <div className="w-full text-truncate-3 pl-6">
                                <p className="text-xl font-bold">{item?.title}</p>
                                <p className="text-truncate-2 mt-3">{item?.content}</p>
                                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                                    Ngày viết:&nbsp;{formatDate(item?.createdAt)}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="warning"
                                    size="small"
                                    sx={{ mt: 2, textTransform: "none" }}
                                    onClick={() => navigate(`/blog/${item?.slug}`)}
                                >
                                    Đọc tiếp
                                </Button>
                            </div>
                        </div>
                        <hr className="my-8" />
                    </div>
                ))}
            </div>
            <Pagination
                className=" flex justify-center"
                count={Math.floor(blogData?.total / productsEachPage + 1)}
                page={Math.floor(params.skip / productsEachPage + 1) || 1}
                onChange={handlePaginationChange}
                color="success"
            />
        </div>
        //fix blog
    );
}
