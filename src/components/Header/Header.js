import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [admin, setAdmin] = useState(
    JSON.parse(sessionStorage.getItem("admin"))
  );
  const [contentProfile, setContentProfile] = useState(
    <li className="nav-item profile">
      <li className="nav-item log-in">
        <NavLink className="nav-link" to="/login">
          Đăng nhập
        </NavLink>
      </li>
      <li className="nav-item sign-up">
        <NavLink className="nav-link" to="/register">
          Đăng ký
        </NavLink>
      </li>
    </li>
  );

  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("admin");
    navigate("/");
    window.location.reload(false);
  };

  useEffect(() => {
    if (user) {
      setContentProfile(getProfile(user));
      console.log("admin: ", admin);
    } else {
      setContentProfile(getProfileAdmin(admin));
    }
  }, []);

  const getProfile = (user) => {
    if (user) {
      return (
        <li className="nav-item profile">
          <NavLink className="nav-link profile-content">
            <i className="far fa-user"></i>&nbsp;
            {user.fullname}&nbsp;
          </NavLink>
          <ul className="extra-nav">
            <NavLink className="nav-link profile-content-item" to="/profile">
              Thông tin
            </NavLink>
            <NavLink
              className="nav-link profile-content-item"
              to="/historyTicket"
            >
              Lịch sử đặt vé
            </NavLink>
            <NavLink className="nav-link profile-content-item" to="/password">
              Thay đổi mật khẩu
            </NavLink>
            <a
              className="nav-link profile-content-item .logout"
              onClick={logout}
            >
              Đăng xuất
            </a>
          </ul>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item log-in">
            <NavLink className="nav-link" to="/login">
              Đăng nhập
            </NavLink>
          </li>
          <li className="nav-item sign-up">
            <NavLink className="nav-link" to="/register">
              Đăng ký
            </NavLink>
          </li>
        </>
      );
    }
  };
  const getProfileAdmin = (admin) => {
    if (admin) {
      return (
        <li className="nav-item profile">
          <NavLink className="nav-link profile-content">
            <i className="far fa-user"></i>&nbsp;
            {admin.fullname}&nbsp;
          </NavLink>
          <ul className="extra-nav">
            <NavLink className="nav-link profile-content-item" to="/profile">
              Thông tin
            </NavLink>
            <NavLink className="nav-link profile-content-item" to="/password">
              Thay đổi mật khẩu
            </NavLink>
            <a
              className="nav-link profile-content-item .logout"
              onClick={logout}
            >
              Đăng xuất
            </a>
          </ul>
        </li>
      );
    } else {
      return (
        <>
          <li className="nav-item log-in">
            <NavLink className="nav-link" to="/login">
              Đăng nhập
            </NavLink>
          </li>
          <li className="nav-item sign-up">
            <NavLink className="nav-link" to="/register">
              Đăng ký
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <header className="container-fluid">
      <div className="row">
        <div className="col-lg-3 logo">
          <h2>
            <NavLink to={user != null ? "/" : "/admin"}>
              <i className="fas fa-bus"></i>&nbsp; DT-Booking
            </NavLink>
          </h2>
        </div>
        <div className="col-lg-6 nav-menu">
          <nav className="navbar navbar-expand-sm p-0">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={user != null ? "/" : "/admin"}
                >
                  Trang chủ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Liên hệ
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Về chúng tôi
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-lg-3 nav-btn">
          <nav className="navbar navbar-expand-sm p-0">
            <ul className="navbar-nav">{contentProfile}</ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
