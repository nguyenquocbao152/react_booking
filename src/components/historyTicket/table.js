import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { requestUrl } from "../../const/Const";
import CustomizedDialogs from "../ticketpop/test";
import "./table.scss";
const TableTicket = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [data, setData] = useState([]);
  const [trip, setTrip] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [ticketPop, setTicketPop] = useState(false);
  const [tripData, setTripData] = useState(
    JSON.parse(sessionStorage.getItem("tripData"))
  );
  const handleDate = (e) => {
    var d = new Date(e),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${requestUrl}ticket/getListTicketByUserId?userId=${user.userId}`,
        {
          method: "POST",
        }
      );
      result
        .json()
        .then((json) => {
          console.log("ticket:", json);
          setData(json);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`${requestUrl}trip/getAllTrip`, {
        method: "POST",
      });
      result
        .json()
        .then((json) => {
          console.log("trip:", json);
          setTrip(json);
        })
        .catch((e) => {
          console.log("error: ", e);
        });
    };
    fetchData();
  }, []);
  const handleDataTrip = (tripId) => {
    if (trip.length > 0) {
      for (var i = 0; i < trip.length; i++) {
        if (tripId === trip[i].tripId) {
          sessionStorage.setItem("tripData", JSON.stringify(trip[i]));
          return trip[i].date;
        }
      }
    }
  };
  const handleTrip = (tripId) => {
    if (trip.length > 0) {
      for (var i = 0; i < trip.length; i++) {
        if (tripId === trip[i].tripId) {
          console.log("tripMang: ", trip[i].tripId);
          setTripData(trip[i]);
        }
      }
    }
  };
  const openInPopup = (item) => {
    console.log("tripID: ", item.tripId);
    handleTrip(item.tripId);
    console.log("tripData: ", tripData);
    setTicketPop(item);
    setOpenPopup(true);
  };
  return (
    <div>
      <div className="flex items-center gap-x-5  mt-3">
        <h4>Lịch sử mua vé </h4>
      </div>
      <div className="w-full overflow-x-auto table">
        <table className="table-users">
          <thead>
            <tr>
              <th>Số Vé</th>
              <th>Ngày Đặt Vé</th>
              <th>Ngày Đi</th>
              <th>Trạng Thái</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-x-3">
                    <span>{item.ticketId}</span>
                  </div>
                </td>
                <td>
                  <div className="whitespace-pre-wrap">
                    {handleDate(item.bookingDate)}
                  </div>
                </td>
                <td>{handleDataTrip(item.tripId)}</td>
                <td>{item.status}</td>
                <td>
                  <div className="btn-view" onClick={() => openInPopup(item)}>
                    View
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <Popup
        title="Thông tin chi tiết vé xe"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TicketPop
          dataTicket={ticketPop}
          tripData={JSON.parse(sessionStorage.getItem("trip"))}
        />
      </Popup> */}
      {tripData != null ? (
        <CustomizedDialogs
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          dataTicket={ticketPop}
          tripData={tripData}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TableTicket;
