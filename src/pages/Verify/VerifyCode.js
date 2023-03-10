import React from "react";
import {
  Grid,
  Paper,
  Box,
  Avatar,
  Button,
  Typography,
  Link as Nv,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { NavLink, useNavigate } from "react-router-dom";
import { requestUrl } from "../../const/Const";

const VerifyCode = () => {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "60px auto",
  };
  const avatarStyle = { backgroundColor: "#6d7f9f" }; //  #3370bd
  const btnstyle = { marginTop: "28px ", backgroundColor: "#6d7f9f" };

  const [user, setUser] = useState({
    otp: "",
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log("value: ", e.target.name);
  };

  const handleSubmit = () => {
    // your submit logic
    console.log("user:", user.otp);
    const requestObj = {
      method: "GET",
    };
    fetch(`${requestUrl}users/verify?code=${user.otp}`, requestObj).then(
      (response) => {
        if (response.status === 200) {
          alert("Verify account successful");
          navigate("success");
        }
      }
    );
  };

  // Timer

  const [counter, setCounter] = React.useState(59);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Register</h2>
          <h4 style={{ color: "green" }}></h4>
          <Box color="text.secondary">
            <Typography variant="body2">
              Enter OTP Sent to your email
            </Typography>
          </Box>
        </Grid>
        <br />

        <ValidatorForm onSubmit={handleSubmit}>
          <TextValidator
            label="Enter 6 Digit OTP"
            onChange={handleChange}
            variant="outlined"
            inputProps={{ maxLength: 6 }}
            name="otp"
            size="small"
            type="text"
            fullWidth
            validators={["required"]}
            errorMessages={["OTP is required"]}
            value={user.otp}
          />

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            VERIFY
          </Button>
        </ValidatorForm>
      </Paper>
    </Grid>
  );
};

export default VerifyCode;
