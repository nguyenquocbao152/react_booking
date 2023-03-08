import React, { useEffect, useState } from "react";
import { requestUrl } from "../../const/Const";
import "./TripList.css";

export default function SpecialTrip() {
  const [list, setList] = useState([{ name: "default" }]);

  useEffect(() => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${requestUrl}route/getAllRoutes`, requestObj)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setList(data);
        console.log(list);
      });
  }, []);

  return (
    <div className="container special-trip">
      <div className="row">
        <div className="col-sm-12">
          <h1 className="title">Tuyến phổ biến</h1>
        </div>
      </div>
      <div className="row">
        {list?.map((trip, index) => (
          <div className="col-lg-6 col-12" key={index}>
            <a className="card">
              <div className="row">
                <div className="col-4">
                  <img className="img-trip" src={trip.image} />
                </div>
                <div className="col-8">
                  <div className="row">
                    <div className="col-12">
                      <h3>
                        {trip.from} - {trip.arrive}
                      </h3>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-4">
                      <p>
                        <i className="fas fa-map-marker-alt"></i>&nbsp;
                        {trip.distance}
                      </p>
                    </div>
                    <div className="col-4">
                      <p>
                        <i className="fas fa-clock"></i>&nbsp;
                        {trip.travelTime}
                      </p>
                    </div>
                    <div className="col-4">
                      <p className="price">
                        <i className="fas fa-money-bill-wave-alt"></i>&nbsp;
                        {trip.fare}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
