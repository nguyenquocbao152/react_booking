import React from "react";

export default function Content() {
  return (
    <div className="container content">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="title">DTBooking - Chất lượng là Danh dự</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <h1 className="title-label">
            <i className="fas fa-user-friends"></i>&nbsp; 10M
          </h1>
        </div>
        <div className="col-4">
          <h1 className="title-label">
            <i className="fas fa-gas-pump"></i>&nbsp; 100
          </h1>
        </div>
        <div className="col-4">
          <h1 className="title-label">
            <i className="fas fa-bus"></i>&nbsp; 1000
          </h1>
        </div>
      </div>
    </div>
  );
}
