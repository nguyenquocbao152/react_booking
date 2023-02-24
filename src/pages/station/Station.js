import React from "react";
import StationTable from "../../components/datatable/StationTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

const Station = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <StationTable />
      </div>
    </div>
  );
};

export default Station;
