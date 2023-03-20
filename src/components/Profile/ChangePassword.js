import React, { useState } from "react";
import { requestUrl } from "../../const/Const";

export default function ChangePassword() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmNewPass, setConfirmNewPass] = useState("");
  const [error, setError] = useState({});

  const handleOldPass = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmNewPass(e.target.value);
  };

  const validateData = () => {
    let updateError = {
      errorOldPass: "",
      errorNewPass: "",
      errorConfirmNewPass: "",
    };
    let validated = true;
    if (!oldPass) {
      updateError.errorOldPass = "Mật khẩu cũ không được bỏ trống";
      validated = false;
    }
    if (!newPass) {
      updateError.errorNewPass = "Mật khẩu mới không được bỏ trống";
      validated = false;
    }
    if (newPass !== confirmNewPass) {
      updateError.errorConfirmNewPass = "Xác nhận mật khẩu sai";
      validated = false;
    }
    setError(updateError);
    return validated;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validated = validateData();
    if (validated) {
      const changePassObj = {
        phoneNumber: user.phoneNumber,
        oldPassword: oldPass,
        newPassword: newPass,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(changePassObj),
      };
      fetch(`${requestUrl}users/changePassword`, requestObj)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === 417) {
            alert(`${data.message}`);
          } else if (data.status === 200) {
            alert(`${data.message}`);
            window.location.reload(false);
          }
        });
    } else {
      console.log(error);
    }
  };

  return (
    <div className="container pass">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="title">Xin chào {user.fullname}</h3>
          <p className="description-title">Thay đổi mật khẩu</p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form className="form-pass">
            <div className="row m-4">
              <div className="col-4">
                <label>Nhập mật khẩu cũ: </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="password"
                  onChange={handleOldPass}
                />
                <span className="text-danger">{error.errorOldPass}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Nhập mật khẩu mới: </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="password"
                  onChange={handleNewPass}
                />
                <span className="text-danger">{error.errorNewPass}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Xác nhận mật khẩu mới: </label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="password"
                  onChange={handleConfirmPassword}
                />
                <span className="text-danger">{error.errorConfirmNewPass}</span>
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <button
                  className="btn btn-secondary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Thay đổi mật khẩu
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
