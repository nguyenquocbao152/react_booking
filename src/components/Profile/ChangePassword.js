import React, { useState } from "react";

export default function ChangePassword() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

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
                <input className="form-control" type="password" />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Nhập mật khẩu mới: </label>
              </div>
              <div className="col-8">
                <input className="form-control" type="password" />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Xác nhận mật khẩu mới: </label>
              </div>
              <div className="col-8">
                <input className="form-control" type="password" />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <button className="btn btn-secondary" type="submit">
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
