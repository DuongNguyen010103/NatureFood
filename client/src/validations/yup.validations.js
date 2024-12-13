import * as yup from "yup";

export const RegisterStoreYup = yup.object().shape({
    name: yup.string().min(2).required(),
    description: yup.string().min(2).required(),
    city: yup.string().min(2).required(),
    district: yup.string().min(2).required(),
    street: yup.string().min(2).required(),
    image: yup.mixed().required("Image is required"),
    ward: yup.string().required("Phường/Xã là bắt buộc"),
    // .test(
    //     "fileSize",
    //     "Tệp không được vượt quá 5MB",
    //     (value) => value && value[0]?.size <= 5 * 1024 * 1024
    // )
    // .test(
    //     "fileType",
    //     "Chỉ chấp nhận các tệp ảnh JPG, PNG hoặc PDF",
    //     (value) =>
    //         value &&
    //         ["image/jpeg", "image/png", "application/pdf"].includes(
    //             value[0]?.type
    //         )
    // ),
});

export const CreateProductYup = yup.object().shape({
    name: yup.string().min(2).required(),
    description: yup.string().min(2).required(),
    price: yup.number().min(0).max(1000000).required(),
    salePrice: yup.number().min(0).max(1000000).required(),
    weight: yup.number().min(0).required(),
    category: yup.string().required(),
    inventory: yup.number().min(0).max(1000000).required(),
    tags: yup.array().required(),

    // images: yup
    //     .array()
    //     .min(1, "Vui lòng chọn ít nhất một hình ảnh")
    //     .max(5, "Bạn chỉ được phép chọn tối đa 5 hình ảnh")
    //     .of(
    //         yup.object().shape({
    //             name: yup.string().required("Vui lòng nhập tên hình ảnh"),
    //             size: yup
    //                 .number()
    //                 .positive("Kích thước hình ảnh không hợp lệ")
    //                 .max(
    //                     5 * 1024 * 1024,
    //                     "Kích thước hình ảnh không được vượt quá 5MB"
    //                 )
    //                 .required("Vui lòng chọn hình ảnh"),
    //         })
    //     ),
});

export const CreateBannerYup = yup.object().shape({
    url: yup.string().required("Vui lòng thêm đường dẫn cho banner của bạn"),
});

export const CreateReviewYup = yup.object().shape({
    body: yup.string().required("Bạn cảm thấy chất lượng sản phẩm như thế nào"),
});

export const CreateReviewFeedbackYup = yup.object().shape({
    feedback: yup.string().required("Nhập phản hồi cho đánh giá"),
});

export const LoginYup = yup.object().shape({
    email: yup.string().email("Vui lòng nhập một địa chỉ email hợp lệ").required("Vui lòng nhập email"),
    password: yup.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự").required("Vui lòng nhập mật khẩu"),
});

export const RegisterYup = yup.object().shape({
    email: yup.string().email("Vui lòng nhập một địa chỉ email hợp lệ").required("Vui lòng nhập email"),

    username: yup.string().required("Vui lòng nhập tên người dùng").min(3, "Tên người dùng phải có ít nhất 3 ký tự"), // Thay đổi theo yêu cầu của bạn

    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa") // Kiểm tra chữ cái viết hoa
        .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số"), // Kiểm tra chữ số

    confirmPassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"), // So sánh với password
});

export const CategoryYup = yup.object().shape({
    name: yup
        .string()
        .required("Tên danh mục là bắt buộc")
        .min(3, "Tên danh mục phải có ít nhất 3 ký tự")
        .max(50, "Tên danh mục không được vượt quá 50 ký tự"),

    description: yup.string().required("Mô tả là bắt buộc").max(200, "Mô tả không được vượt quá 200 ký tự"),

    // image: yup
    //     .mixed()
    //     .required("Hình ảnh là bắt buộc")
    //     .test("fileSize", "Kích thước file quá lớn", (value) => {
    //         return value && value.size <= 2000000; // Kích thước tối đa 2MB
    //     })
    //     .test("fileType", "Chỉ cho phép định dạng hình ảnh", (value) => {
    //         return (
    //             value &&
    //             ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    //         );
    //     }),
});

export const BannerYup = yup.object().shape({
    name: yup
        .string()
        .required("Tên banner là bắt buộc")
        .min(3, "Tên banner phải có ít nhất 3 ký tự")
        .max(50, "Tên banner không được vượt quá 50 ký tự"),

    description: yup.string().required("Mô tả là bắt buộc"),
    url: yup.string().required("Đường dẫn là bắt buộc"),
    // image: yup
    //     .mixed()
    //     .required("Hình ảnh là bắt buộc")
    //     .test("fileSize", "Kích thước file quá lớn", (value) => {
    //         return value && value.size <= 2000000; // Kích thước tối đa 2MB
    //     })
    //     .test("fileType", "Chỉ cho phép định dạng hình ảnh", (value) => {
    //         return (
    //             value &&
    //             ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    //         );
    //     }),
});

export const CreateBlogYup = yup.object().shape({
    title: yup.string().required("Tiêu đề là bắt buộc"),
    slug: yup.string().min(5, "Slug phải có ít nhất 5 ký tự").required("Slug là bắt buộc"),
    content: yup.string().required("Nội dung là bắt buộc"),
    excerpt: yup.string().min(5, "Tóm tắt phải có ít nhất 5 ký tự").required("Tóm tắt là bắt buộc"),
});

export const CreateDeliveryYup = yup.object().shape({
    ownerName: yup.string().min(2, "Tên người nhận phải nhiều hơn 2 ký tự").required("Tên người nhận là bắt buộc"),
    phone: yup.string().min(9, "Số điện thoại không hợp lệ").required("Số điện thoại là bắt buộc"),
    city: yup.string().required("Thành phố/Tỉnh là bắt buộc"),
    district: yup.string().required("Quận/Huyện là bắt buộc"),
    ward: yup.string().required("Phường/Xã là bắt buộc"),
    street: yup.string().required("Địa chỉ chi tiết là bắt buộc"),
});

export const CheckoutYup = yup.object().shape({
    delivery: yup.string().required("Thông tin giao hàng là bắt buộc"),
    paymentMethod: yup.number().required("Phương thức thanh toán là bắt buộc"),
    deliveryMethod: yup.number().required("Cách thức giao hàng là bắt buộc"),
});

export const ChangePasswordYup = yup.object().shape({
    currentPassword: yup
        .string()
        .required("Vui lòng nhập mật khẩu hiện tại")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa") // Kiểm tra chữ cái viết hoa
        .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số"), // Kiểm tra chữ số

    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa") // Kiểm tra chữ cái viết hoa
        .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số"), // Kiểm tra chữ số

    confirmPassword: yup
        .string()
        .required("Vui lòng xác nhận mật khẩu")
        .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp"),
});

export const ChangeEmailYup = yup.object().shape({
    email: yup.string().email("Vui lòng nhập một địa chỉ email hợp lệ").required("Vui lòng nhập email"),
    password: yup
        .string()
        .required("Vui lòng nhập mật khẩu")
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .matches(/[A-Z]/, "Mật khẩu phải có ít nhất một chữ cái viết hoa") // Kiểm tra chữ cái viết hoa
        .matches(/\d/, "Mật khẩu phải có ít nhất một chữ số"), // Kiểm tra chữ số
});

export const ProfileYup = yup.object().shape({
    username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username must be at most 30 characters long"),

    phone: yup
        .string()
        .required("Phone number is required")
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"), // Ví dụ: số điện thoại 10 chữ số

    gender: yup.number().required("Gender is required").oneOf([0, 1, 2], "Gender must be one of the following: 0 (Male), 1 (Female), 2 (Other)"),

    birthday: yup.date().required("Birthday is required").max(new Date(), "Birthday cannot be in the future"), // Ngày sinh không được lớn hơn ngày hiện tại
});

export const ForgotYup = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email đăng ký của bạn"),
});
