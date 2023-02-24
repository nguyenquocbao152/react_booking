import React, { useState } from "react";
import { useEffect } from "react";
import Vehicletable from "../../components/datatable/Vehicletable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Vehicle.scss";
const URL = "http://localhost:8080/users/getAllUser";
const Vehicle = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Vehicletable />
      </div>
    </div>
  );
};

export default Vehicle;
