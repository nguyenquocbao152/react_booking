import {
  DepartureBoardOutlined,
  KeyboardArrowUp,
  LocalShippingOutlined,
  PersonOutlined,
  RouteOutlined,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { requestUrl } from "../../const/Const";
import "./Widget.scss";

const Widget = ({ type }) => {
  const [dataUser, setDataUser] = useState([]);
  const [dataRoute, setDataRoute] = useState([]);
  const [dataTrip, setDataTrip] = useState([]);
  const [dataVehicle, setDataVehicle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${requestUrl}users/getAllUser`, {
        method: "POST",
      });
      result.json().then((json) => {
        setDataUser(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${requestUrl}route/getAllRoutes`, {
        method: "POST",
      });
      result.json().then((json) => {
        setDataRoute(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${requestUrl}trip/getAllTrip`, {
        method: "POST",
      });
      result.json().then((json) => {
        setDataTrip(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${requestUrl}vehicle/getAllVehicle`, {
        method: "POST",
      });
      result.json().then((json) => {
        setDataVehicle(json);
      });
    };
    fetchData();
  }, []);
  let data;

  //temporary
  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        amount: dataUser.length,
        icon: (
          <PersonOutlined
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "route":
      data = {
        title: "ROUTES",
        isMoney: false,
        link: "View all routes",
        amount: dataRoute.length,
        icon: (
          <RouteOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "trip":
      data = {
        title: "TRIPS",
        isMoney: false,
        link: "View all trips",
        amount: dataTrip.length,
        icon: (
          <DepartureBoardOutlined
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "vehicle":
      data = {
        title: "VEHICLE",
        isMoney: false,
        link: "See details",
        amount: dataVehicle.length,
        icon: (
          <LocalShippingOutlined
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUp />
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
