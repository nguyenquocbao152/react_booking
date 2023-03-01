import React, { useState } from "react";
import "./Contact.css";

export default function Contact() {
  const [fulName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="container contact">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="title">Liên hệ DT-Booking</h3>
          <p className="description-title">
            Cảm ơn các bạn đã ghé thăm website của chúng tôi.
            <br />
            Nếu bạn muốn nhận được thông tin của chúng tôi dễ dàng, hãy điền
            form dưới đây.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <form className="form-contact">
            <div className="row m-4">
              <div className="col-4">
                <label>Họ và tên:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập họ và tên"
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Số điện thoại:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                />
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
                  placeholder="Nhập email"
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Tiêu đề:</label>
              </div>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập tiêu đề"
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Nội dung:</label>
              </div>
              <div className="col-8">
                <textarea
                  className="form-control"
                  type="text"
                  placeholder="Nhập nội dung"
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <button className="btn btn-secondary" type="submit">
                  Gửi
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5177746475074!2d106.7969946145897!3d10.84816759227286!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175273f44f8f587%3A0x287a9b76f00857cd!2zQ2h1bmcgQ8awIEM2LCDEkC4gTWFuIFRoaeG7h24sIFBoxrDhu51uZyBUw6JuIFBow7osIFF14bqtbiA5LCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1676347977800!5m2!1sen!2s"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="row"></div>
    </div>
  );
}
