import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { countCartTotal, formatPrice } from "../../../services/functions";

export default function OrderSummary() {
    const { data: cartData } = useSelector((state) => state.cart);

    return (
        <Card className="w-full">
            <div className="flex justify-between px-4 py-4 bg-[#f9fafd]">
                <Typography variant="h6" component="div">
                    Đơn hàng
                </Typography>
                <Typography
                    variant="text"
                    size="small"
                    component={Link}
                    to="/cart"
                    className="hover:text-teal-400 hover:underline underline-offset-4 na-text-transform-none flex items-center text-green-700"
                >
                    Chỉnh sửa giỏ hàng
                </Typography>
            </div>
            <CardContent>
                <Box>
                    <Box display="flex" justifyContent="space-between">
                        <Box>
                            {cartData?.products?.map((item) => (
                                <div className="pb-3 flex items-center" key={item?._id}>
                                    <div className="w-[20%] mr-2">
                                        <img src={item?.storeProduct?.productId?.images?.[0]?.url} className=" w-full object-contain" />
                                    </div>
                                    <div className="text-sm text-truncate-2 w-full">{item?.storeProduct?.productId?.name}</div>
                                    <div className="text-sm w-[20%] text-center">x{item?.quantity}</div>
                                    <div className="text-sm w-[35%] text-right whitespace-nowrap text-orange">
                                        ₫
                                        {formatPrice(
                                            item?.storeProduct?.productId?.salePrice * (1 - item?.storeProduct?.discountPrice) * item?.quantity
                                        )}
                                    </div>
                                </div>
                            ))}
                        </Box>
                    </Box>
                </Box>

                <hr className="border-dashed border-bottom border-translucent my-4" />

                <Box className="flex justify-between mb-2">
                    <div className="text-sm">Tổng số tiền:</div>
                    <div className="text-sm text-orange">₫{formatPrice(countCartTotal(cartData?.products))}</div>
                </Box>
                <Box className="flex justify-between mb-2">
                    <div className="text-sm">Giảm giá:</div>
                    <div className="text-sm text-red-500">-₫0</div>
                </Box>
                <Box className="flex justify-between mb-2">
                    <div className="text-sm">Thuế:</div>
                    <div className="text-sm">₫0</div>
                </Box>
                <Box className="flex justify-between mb-2">
                    <div className="text-sm">Phí vận chuyển:</div>
                    <div className="text-sm">₫0</div>
                </Box>

                <hr className="border-dashed border-bottom border-translucent" />

                <Box className="flex justify-between mt-3">
                    <Typography variant="h6">Thành tiền:</Typography>
                    <Typography variant="h6" className="text-orange">
                        ₫{formatPrice(countCartTotal(cartData?.products))}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
