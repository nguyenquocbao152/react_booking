import React from "react";
import "./Verify.css";
const Verify = () => {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <div className="col-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Email has been verify</h5>
              <div className="icon">
                <i className="fa-regular fa-circle-check"></i>
              </div>
              <p className="card-text">You can log in now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
