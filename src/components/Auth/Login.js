import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      phoneNumber: phoneNumber,
      password: password,
    };
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userObj),
    };

    fetch(
      "https://ticket-booking-production.up.railway.app/users/login",
      requestObj
    )
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        console.log(data.message);
        if (data.status === 200) {
          sessionStorage.setItem("user", JSON.stringify(data.data));
          navigate("/");
          window.location.reload(false);
        }
      });
  };

  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Đăng nhập</h3>
            <div className="form-group mt-3">
              <label>Nhập số điện thoại:</label>
              <input
                value={phoneNumber}
                name="phoneNumber"
                type="number"
                className="form-control mt-1"
                placeholder="Nhập số điện thoại"
                required
                onChange={handlePhoneNumber}
              />
            </div>
            <div className="form-group mt-3">
              <label>Nhập mật khẩu:</label>
              <input
                value={password}
                name="password"
                type="password"
                className="form-control mt-1"
                placeholder="Nhập mật khẩu"
                required
                onChange={handlePassword}
                autoComplete="off"
              />
            </div>
            <div className="messages">
              <p>{message}</p>
            </div>
            <div className="d-grid gap-2 mt-3 row col-lg-12">
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={handleSubmit}
              >
                Đăng nhập
              </button>
            </div>
            <p className="forgot-password text-right mt-2">
              Bạn chưa có tài khoản?&nbsp;
              <NavLink to="/register" className="text-danger">
                Đăng ký
              </NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
