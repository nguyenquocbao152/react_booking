import React from "react";
import "./Footer.css";

function getYear() {
  var today = new Date();
  return today.getFullYear();
}

export default function Footer() {
  return (
    <footer className="container-fluid">
      <hr className="short-line" />
      <div className="row footer">
        <div className="col-lg-4 box-logo-footer">
          <h1 className="logo-footer">
            DT-Booking
            <br />
            <span className="description-logo">eTransportationSystem</span>
          </h1>
        </div>
        <div className="col-lg-4">
          <h3 className="title">Về chúng tôi</h3>
          <p>
            CÔNG TY CỔ PHẦN XE KHÁCH DT-BOOKING
            <br />
            Địa chỉ: Man Thiện, Thành phố Thủ Đức, TPHCM, Việt Nam
            <br />
            Email:{" "}
            <a className="link-color" href="mailto:hotro@dtb.vn">
              hotro@dtb.vn
            </a>
            <br />
            Điện thoại:{" "}
            <a className="link-color" href="tel:012345678">
              012345678
            </a>
          </p>
        </div>
        <div className="col-lg-4 text-center">
          <h3 className="title">Liên hệ</h3>
          <p>TỔNG ĐÀI ĐẶT VÉ VÀ CHĂM SÓC KHÁCH HÀNG:</p>
          <h2>
            <a href="tel:19000000" className="cskh-phone">
              1900 0000
            </a>
          </h2>
          <div className="icon-contact">
            <a href="https://www.youtube.com/">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="https://www.facebook.com">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <br />
      <div className="copyright">
        <p>
          &copy; {getYear()} | Bản quyền thuộc về Công ty Cổ phần Xe Khách
          DT-Booking | Chịu trách nhiêm nội dung: Nguyễn Anh Thoại
        </p>
      </div>
      <hr className="short-line" />
    </footer>
  );
}
