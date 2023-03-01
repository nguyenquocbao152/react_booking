import React, { useState } from "react";

export default function TripList() {
  const [placeFrom, setPlaceFrom] = useState("");
  const [placeTo, setPlaceTo] = useState("");

  const list = [
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
    {
      placeFrom: "Sài Gòn",
      placeTo: "Đà Lạt",
      distance: "310km",
      time: "20h",
      price: "300.000đ",
      timeStart: "9 giờ",
    },
  ];

  return (
    <div className="container trip-list">
      <div className="row m-4">
        <div className="col-sm-6">
          <input
            className="form-control"
            type="text"
            value={placeFrom}
            placeholder="Tìm điểm đến"
          />
        </div>
        <div className="col-sm-6">
          <input
            className="form-control"
            type="text"
            value={placeTo}
            placeholder="Tìm điểm đi"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tuyến xe</th>
                <th>Quãng đường</th>
                <th>Thời gian</th>
                <th>Giá vé</th>
                <th>Giờ chạy</th>
                <th>Đặt vé</th>
              </tr>
            </thead>
            <tbody>
              {list.map((list, index) => (
                <tr key={index}>
                  <td>
                    {list.placeFrom} - {list.placeTo}
                  </td>
                  <td>{list.distance}</td>
                  <td>{list.time}</td>
                  <td>{list.price}</td>
                  <td>{list.timeStart}</td>
                  <td>
                    <a href="#">Đặt vé</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
