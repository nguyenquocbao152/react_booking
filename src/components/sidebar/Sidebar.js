import React from "react";
import "./Sidebar.scss";
import {
  Dashboard,
  DepartureBoard,
  ExitToApp,
  Feedback,
  LocalShipping,
  LocationOn,
  PersonOutlineOutlined,
  Route,
  Sell,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">Admin Dashboard</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Main</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <Dashboard className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">List</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineOutlined className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
          <Link to="/admin/trips" style={{ textDecoration: "none" }}>
            <li>
              <DepartureBoard className="icon" />
              <span>Chuyến Đi</span>
            </li>
          </Link>
          <Link to="/admin/routes" style={{ textDecoration: "none" }}>
            <li>
              <Route className="icon" />
              <span>Lộ Trình</span>
            </li>
          </Link>
          <Link to="/admin/vehicles" style={{ textDecoration: "none" }}>
            <li>
              <LocalShipping className="icon" />
              <span>Xe</span>
            </li>
          </Link>
          <Link to="/admin/stations" style={{ textDecoration: "none" }}>
            <li>
              <LocationOn className="icon" />
              <span>Bến</span>
            </li>
          </Link>
          <p className="title">User</p>
          <Link to="/admin/feedbacks" style={{ textDecoration: "none" }}>
            <li>
              <Feedback className="icon" />
              <span>Góp Ý</span>
            </li>
          </Link>
          <Link to="/admin/tickets" style={{ textDecoration: "none" }}>
            <li>
              <Sell className="icon" />
              <span>Vé Xe</span>
            </li>
          </Link>
          <li>
            <ExitToApp className="icon" />
            <span>Đăng Xuất</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
