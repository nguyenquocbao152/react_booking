import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function SelectRoute(props) {
  const [routeId, setRouteId] = useState("");

  const handleChange = (e) => {
    props.parentCallback(e.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { width: "1" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-route"
          select
          label="Chọn tuyến xe"
          defaultValue=""
          onChange={handleChange}
        >
          {props.listFormAPI.map((option) => (
            <MenuItem key={option.routeId} value={option.routeId}>
              {option.from} - {option.arrive}
            </MenuItem>
          ))}
        </TextField>
      </div>
    </Box>
  );
}
