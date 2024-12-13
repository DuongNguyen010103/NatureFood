import { Checkbox, FormControlLabel, Grid, MenuItem, TextField } from "@mui/material";

const states = ["VietinBank", "VietcomBank", "Agribank", "Anh bank cho iem"];
const cities = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const countries = ["2012", "2013", "2014"];
export default function CreaditCard() {
    return (
        <Grid container spacing={3} mt={2}>
            {/* Select card */}
            <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Loại thẻ ngân hàng" variant="outlined" defaultValue="VietcomBank" size="small">
                    {states.map((city) => (
                        <MenuItem key={city} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            {/* Card number */}
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Nhập số ngân hàng" variant="outlined" size="small" />
            </Grid>

            {/* Full name */}
            <Grid item xs={12}>
                <TextField fullWidth label="Tên người dùng" variant="outlined" size="small" />
            </Grid>

            {/* Expiry date */}
            <Grid item xs={6} sm={3}>
                <TextField fullWidth select label="Tháng" variant="outlined" defaultValue="1" size="small">
                    {cities.map((city) => (
                        <MenuItem key={city} value={city}>
                            {city}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item xs={6} sm={3}>
                <TextField fullWidth select label="Loại thẻ ngân hàng" variant="outlined" defaultValue="2012" size="small">
                    {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                            {country}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            {/* CVC */}
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label=" Mã CVC" variant="outlined" size="small" />
            </Grid>

            {/* Save card details */}
            <Grid item xs={12}>
                <FormControlLabel control={<Checkbox />} label="Lưu chi tiết thẻ" />
            </Grid>
        </Grid>
    );
}
