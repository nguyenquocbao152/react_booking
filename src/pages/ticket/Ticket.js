import React from "react";
import Tickettable from "../../components/datatable/Tickettable";
import Sidebar from "../../components/sidebar/Sidebar";

const Ticket = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Tickettable />
      </div>
    </div>
  );
};

export default Ticket;
