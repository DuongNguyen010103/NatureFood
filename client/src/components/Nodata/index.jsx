import { Box } from "@mui/material";

export default function Nodata({ content }) {
    return (
        <Box className="flex flex-col items-center py-8">
            <img src="/assets/images/no-data.png" alt="no data" className="w-[100px]" />
            <p>{content}</p>
        </Box>
    );
}
