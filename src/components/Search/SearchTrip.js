import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { requestUrl } from "../../const/Const";
import "./Form.css";
import MuiDatePicker from "./MuiDatePicker";
import SelectRoute from "./SelectRoute";

export default function SearchTrip() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [list, setList] = useState([{ name: "default" }]);
  const [routeId, setRouteId] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${requestUrl}route/getAllRoutes`, requestObj)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  const handleCallbackRouteId = (childData) => {
    setRouteId(childData);
  };

  const handleCallbackDate = (childData) => {
    setDate(childData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(routeId);
    console.log(date);
    if (user) {
      navigate(`/buyTicket?routeid=${routeId}&date=${date}&step=1`);
      window.scrollTo(0, 0);
      window.location.reload(false);
      window.location.reload(false);
    } else {
      navigate("/login");
      window.scrollTo(0, 0);
    }
  };
  return (
    <div className="container">
      <form className="form-search-trip">
        <div className="form-group row">
          <div className="col-lg-5 col-md-12">
            <SelectRoute
              listFormAPI={list}
              parentCallback={handleCallbackRouteId}
            ></SelectRoute>
          </div>
          <div className="col-lg-4 col-md-12">
            <MuiDatePicker parentCallback={handleCallbackDate}></MuiDatePicker>
          </div>
          <div className="button col-lg-3 col-md-12">
            <button
              className="btn btn-secondary"
              type="submit"
              onClick={handleSearch}
            >
              <i className="fas fa-search"></i>&nbsp; Tìm chuyến
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
