import { useEffect, useState } from "react";
import FeedbackTable from "../../components/datatable/Feedbacktable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Feedback.scss";
const Feedback = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <FeedbackTable />
      </div>
    </div>
  );
};

export default Feedback;
