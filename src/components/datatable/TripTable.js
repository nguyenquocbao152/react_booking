import { SearchOutlined } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import TripForm from "../form/TripForm";
import Popup from "../popup/Popup";
const URL = "http://localhost:8080/trip/getAllTrip";
const customStyles = {
  rows: {
    style: {
      fontSize: "13px",
      whiteSpace: "pre",
    },
  },
  cells: {
    style: {
      wordBreak: "break-word",
    },
  },
};

const TripTable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredTrip, setFilteredTrip] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const columns = [
    {
      name: "License Plate",
      selector: (row) => row.liencePlate,
      sortable: true,
    },
    {
      name: "Route",
      selector: (row) => row.from + " - " + row.arrival,
      sortable: true,
      wrap: true,
    },
    {
      name: "Total Seats",
      selector: (row) => row.totalSeat + " Available",
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => {
        return format(parseISO(row.date), "yyyy-MM-dd");
      },
      sortable: true,
    },

    {
      name: "Time",
      selector: (row) => row.time,
    },
    {
      name: "Fare",
      selector: (row) => row.fare,
      sortable: true,
    },
    {
      name: "Station Start",
      selector: (row) => row.stationStart,
      sortable: true,
      wrap: true,
    },
    {
      name: "Station End",
      selector: (row) => row.stationEnd,
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div
            className="update"
            onClick={() => {
              openInPopup({
                id: row.tripId,
                vehicalId: row.vehicleId,
                date: row.date,
                time: row.time,
                routeId: row.routeId,
                stationId: row.stationId,
              });
            }}
          >
            Update
          </div>
          <div className="delete" onClick={() => handleDelete(row.tripId)}>
            Delete
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        method: "POST",
      });
      result.json().then((json) => {
        console.log("trip:", json);
        setData(json);
        setFilteredTrip(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const result = data.filter((trip) => {
      const route = trip.from + " - " + trip.arrival;
      return route.toLowerCase().match(search.toLowerCase());
    });
    setFilteredTrip(result);
  }, [search]);

  const addOrEdit = (trip, resetForm) => {
    if (trip.id === "") {
      console.log("Insert");
      var event = new Date(trip.date);

      let date = JSON.stringify(event);
      date = date.slice(1, 11);
      console.log("date format:", date);
      console.log("trip:", trip);
      console.log("vehicalId:", trip.vehicalId);
      console.log("date:", trip.date);
      console.log("time:", trip.time);
      console.log("routeId:", trip.routeId);
      console.log("stationId:", trip.stationId);
      const tri = {
        vehicalId: trip.vehicalId,
        date: date,
        time: trip.time,
        routeId: trip.routeId,
        stationId: trip.stationId,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tri),
      };
      const requestUrl = "http://localhost:8080/trip/createTrip";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Add trip successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
        }
      });
    } else {
      console.log("update");
    }
  };
  const openInPopup = (item) => {
    console.log("item:", item);
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const handleDelete = (id) => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/trip/deleteTrip?tripId=${id}`,
      requestObj
    ).then((response) => {
      if (response.status === 200) {
        alert("Delete trip successful");
      }
    });
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Trips
        <div className="link" onClick={() => setOpenPopup(true)}>
          Add New
        </div>
      </div>
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <SearchOutlined />
      </div>
      <div style={{ margin: "20px" }}>
        <DataTable
          columns={columns}
          data={filteredTrip}
          pagination
          customStyles={customStyles}
        />
      </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TripForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default TripTable;
