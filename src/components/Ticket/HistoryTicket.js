import React, { useState } from "react";
import "./HistoryTicket.css";

export default function HistoryTicket() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));

  return (
    <div className="container history">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="title">Xin chào {user.fullname}</h3>
          <p className="description-title">Lịch sử đặt vé</p>
        </div>
      </div>
    </div>
  );
}
