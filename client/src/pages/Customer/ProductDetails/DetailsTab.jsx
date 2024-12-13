import { Box, Typography } from "@mui/material";

export default function DetailsTab({ product }) {
    return (
        <Box>
            <Typography component="h2" variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Mô tả sản phẩm
            </Typography>
            <Typography component="p">{product?.productId?.description}</Typography>
        </Box>
    );
}
