import React from "react";
import StationTable from "../../components/datatable/StationTable";
import Sidebar from "../../components/sidebar/Sidebar";

const Station = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <StationTable />
      </div>
    </div>
  );
};

export default Station;
