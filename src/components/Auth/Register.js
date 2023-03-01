import React, { useState } from "react";
import "./Auth.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const optionGender = [
    { value: "male", label: "Nam" },
    { value: "female", label: "Nữ" },
  ];

  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handlePhoneNumber = (e) => {
    setPhoneNumber(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.value);
  };

  const validateEmail = (email) => {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) return true;
    else return false;
  };

  const validatePhoneNumber = (num) => {
    let numFormat = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (num.match(numFormat)) return true;
    else return false;
  };

  const validateData = () => {
    let updateError = {
      fullNameError: "",
      passwordError: "",
      emailError: "",
      phoneNumberError: "",
      genderError: "",
    };
    let validated = true;
    if (password !== confirmPassword) {
      updateError.passwordError = "Xác nhận mật khẩu sai";
      validated = false;
    }
    if (!validateEmail(email)) {
      updateError.emailError = "Email không hợp lệ";
      validated = false;
    }
    if (!validatePhoneNumber(phoneNumber)) {
      updateError.phoneNumberError = "Số điện thoại không hợp lệ";
      validated = false;
    }
    if (!fullName) {
      updateError.fullNameError = "Họ và tên không được bỏ trống";
      validated = false;
    }
    if (!phoneNumber) {
      updateError.phoneNumberError = "Số điện thoại không được bỏ trống";
      validated = false;
    }
    if (!email) {
      updateError.emailError = "Email không được bỏ trống";
      validated = false;
    }
    if (!password && !confirmPassword) {
      updateError.passwordError = "Mật khẩu không được bỏ trống";
      validated = false;
    }
    if (!gender) {
      updateError.genderError = "Chưa chọn giới tính";
      validated = false;
    }
    setError(updateError);
    console.log("Update error", updateError);
    return validated;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validated = validateData();
    if (validated) {
      const userRegisterObj = {
        fullname: fullName,
        phoneNumber: phoneNumber,
        email: email,
        gender: gender,
        password: password,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRegisterObj),
      };
      fetch("http://localhost:8080/users/register", requestObj)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setMessage(data.message);
          if (data.status === 200) {
            alert(data.message);
            navigate("/login");
          }
        });
    } else {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Đăng ký</h3>
            <div className="form-group mt-3">
              <label>Họ và tên</label>
              <input
                value={fullName}
                name="fullName"
                type="text"
                className="form-control mt-1"
                placeholder="Nhập họ và tên"
                required
                onChange={handleFullName}
              />
              <span className="text-danger">{error.fullNameError}</span>
            </div>
            <div className="form-group mt-3">
              <label>Số điện thoại</label>
              <input
                value={phoneNumber}
                name="phone"
                type="tel"
                className="form-control mt-1"
                placeholder="Nhập số điện thoại"
                required
                onChange={handlePhoneNumber}
              />
              <span className="text-danger">{error.phoneNumberError}</span>
            </div>
            <div className="form-group mt-3">
              <label>Giới tính</label>
              <Select
                options={optionGender}
                className="mt-1"
                onChange={handleGender}
              />
              <span className="text-danger">{error.genderError}</span>
            </div>
            <div className="form-group mt-3">
              <label>Email</label>
              <input
                value={email}
                name="email"
                type="email"
                className="form-control mt-1"
                placeholder="Nhập email"
                onChange={handleEmail}
              />
              <span className="text-danger">{error.emailError}</span>
            </div>
            <div className="form-group mt-3">
              <label>Mật khẩu</label>
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
            <div className="form-group mt-3">
              <label>Xác nhận mật khẩu</label>
              <input
                value={confirmPassword}
                name="confirmPassword"
                type="password"
                className="form-control mt-1"
                placeholder="Xác nhận mật khẩu"
                required
                onChange={handleConfirmPassword}
                autoComplete="off"
              />
              <span className="text-danger">{error.passwordError}</span>
            </div>
            <div className="messages">
              <p>{message}</p>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type=""
                className="btn btn-secondary"
                onClick={handleSubmit}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
