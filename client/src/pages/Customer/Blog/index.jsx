import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBlogApi } from "../../../apis/blog.api";
import useSnackNotify from "../../../components/SnackNotify";

export default function Blog() {
    const [blog, setBlog] = useState();
    const { slug } = useParams();
    const snackNotify = useSnackNotify();
    const handleGetData = async () => {
        const response = await getBlogApi(slug);
        if (response?.error) {
            snackNotify("error")("Không tìm thấy blog");
        } else {
            setBlog(response.data);
            console.log(response);
        }
    };
    useEffect(() => {
        handleGetData();
    }, [slug]);
    return (
        <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
                <img src={blog?.image?.url} alt={blog?.title} className="w-full h-[400px] rounded-lg object-fill" />
            </div>
            <div className="mx-[85px]">
                <h2 className="text-3xl font-semibold mb-6 text-center">{blog?.title}</h2>

                <p className="text-gray-600 mb-5 leading-loose text-justify ">{blog?.content}</p>
            </div>
            <hr />
        </div>
        //fix blog
    );
}
