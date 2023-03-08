import React, { useState } from "react";
import { requestUrl } from "../../const/Const";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [fullName, setFullName] = useState(user.fullname);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [status, setStatus] = useState("active");
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const handleFullName = (e) => {
    setFullName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleGender = (e) => {
    setGender(e.value === "Nam" ? "male" : "female");
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
      emailError: "",
      genderError: "",
    };
    let validated = true;
    if (!validateEmail(email)) {
      updateError.emailError = "Email không hợp lệ";
      validated = false;
    }
    if (!fullName) {
      updateError.fullNameError = "Họ và tên không được bỏ trống";
      validated = false;
    }
    if (!email) {
      updateError.emailError = "Email không được bỏ trống";
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

  const handelSubmit = (e) => {
    e.preventDefault();
    let validated = validateData();
    if (validated) {
      // Call API Update data user
      const useObj = {
        fullname: fullName,
        gender: gender,
        phoneNumber: phoneNumber,
        email: email,
        status: status,
      };
      console.log(useObj);
      const reqObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(useObj),
      };
      fetch(`${requestUrl}users/updateUser`, reqObj)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 200) {
            setMessage(data.message);
            alert(data.message);
            sessionStorage.setItem("user", JSON.stringify(useObj));
          }
        });
    } else {
      console.log("Lỗi quá trời");
    }
  };

  return (
    <div className="container user">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="title">Xin chào {user.fullname}</h3>
          <p className="description-title">Thông tin cá nhân</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form className="form-profile">
            <div className="row m-4">
              <div className="col-4">
                <label>Số điện thoại:</label>
              </div>
              <div className="col-8">
                <input
                  readOnly
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Họ và tên:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  value={fullName}
                  onChange={handleFullName}
                />
                <span className="text-danger">{error.fullNameError}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Email:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  onChange={handleEmail}
                />
                <span className="text-danger">{error.emailError}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Giới tính:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  value={gender === "male" ? "Nam" : "Nữ"}
                  onChange={handleGender}
                />
                <span className="text-danger">{error.genderError}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <button
                  onClick={handelSubmit}
                  className="btn btn-secondary"
                  type="submit"
                >
                  Cập nhật thông tin
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}
