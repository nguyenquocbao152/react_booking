import React from "react";
import Chart from "../../components/chart/Chart";
import Featured from "../../components/featured/featured";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/wiget/Widget";
import "./Home.scss";

const HomeAdmin = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="datatableTitle">Dashboard</div>
        <div className="widgets">
          <Widget type="user" />
          <Widget type="route" />
          <Widget type="trip" />
          <Widget type="vehicle" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
