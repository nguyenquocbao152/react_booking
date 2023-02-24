import React from "react";
import RouteTable from "../../components/datatable/RouteTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Route.scss";

const Rout = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <RouteTable />
      </div>
    </div>
  );
};

export default Rout;
