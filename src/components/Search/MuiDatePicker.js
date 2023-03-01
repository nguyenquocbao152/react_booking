import { Box, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useEffect } from "react";

export default function MuiDatePicker(props) {
  const [value, setValue] = useState(null);
  const handleChange = (e) => {
    const dateFormat =
      e.getFullYear() +
      "-" +
      (e.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      e.getDate() +
      " 00:00:00.0";
    props.parentCallback(dateFormat);
  };

  return (
    <Box sx={{ height: "1" }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Chọn ngày"
          inputFormat="DD/MM/YYYY"
          labelFormat="DD/MM/YYYY"
          value={value}
          onChange={(newValue) => {
            handleChange(new Date(newValue.$d));
            setValue(newValue);
          }}
          renderInput={(props) => <TextField {...props} />}
        ></DatePicker>
      </LocalizationProvider>
    </Box>
  );
}
