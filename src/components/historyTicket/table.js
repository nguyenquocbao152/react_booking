import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { requestUrl } from "../../const/Const";
import Popup from "../popup/Popup";
import CustomizedDialogs from "../ticketpop/test";
import TicketPop from "../ticketpop/TicketPop";
import "./table.scss";
const TableTicket = () => {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [data, setData] = useState([]);
  const [trip, setTrip] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [ticketPop, setTicketPop] = useState(false);
  const [tripData, setTripData] = React.useState(
    JSON.parse(sessionStorage.getItem("trip"))
  );
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
          sessionStorage.setItem("trip", JSON.stringify(trip[i]));
          return trip[i].date;
        }
      }
    }
  };
  const openInPopup = (item) => {
    console.log("item:", item);
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
              <th>Ticket Number</th>
              <th>Booking Date</th>
              <th>Trip Date</th>
              <th>Status</th>
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
                  <div className="whitespace-pre-wrap">{item.bookingDate}</div>
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
          tripData={JSON.parse(sessionStorage.getItem("trip"))}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default TableTicket;
