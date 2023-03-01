import React from "react";
import Vehicletable from "../../components/datatable/Vehicletable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Vehicle.scss";
const Vehicle = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Vehicletable />
      </div>
    </div>
  );
};

export default Vehicle;
