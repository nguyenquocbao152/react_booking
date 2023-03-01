import React from "react";
import "./Verify.css";

const VerifySuccess = () => {
  return (
    <div className="card-container">
      <div className="card-content">
        <div className="card-title">
          <h4>Email has been verified</h4>
        </div>
        <div className="card-body">
          <i className="card-icon fa-regular fa-circle-check fa-3x"></i>
          <p>You can log in now</p>
        </div>
      </div>
    </div>
  );
};

export default VerifySuccess;
