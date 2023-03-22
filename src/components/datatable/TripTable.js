import { SearchOutlined } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { requestUrl } from "../../const/Const";
import TripForm from "../form/TripForm";
import Popup from "../popup/Popup";
const URL = `${requestUrl}trip/getAllTrip`;
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
      name: "Bảng Số Xe",
      selector: (row) => row.liencePlate,
      sortable: true,
    },
    {
      name: "Lộ Trình",
      selector: (row) => row.from + " - " + row.arrival,
      sortable: true,
      wrap: true,
    },
    {
      name: "Tổng Ghế",
      selector: (row) => row.totalSeat + " Available",
      sortable: true,
    },
    {
      name: "Ngày",
      selector: (row) => {
        return format(parseISO(row.date), "yyyy-MM-dd");
      },
      sortable: true,
    },

    {
      name: "Giờ",
      selector: (row) => row.time,
    },
    {
      name: "Chi Phí",
      selector: (row) => row.fare,
      sortable: true,
    },
    {
      name: "Điểm Đi",
      selector: (row) => row.stationStart,
      sortable: true,
      wrap: true,
    },
    {
      name: "Điểm Đến",
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
            Cập Nhật
          </div>
          <div className="delete" onClick={() => handleDelete(row.tripId)}>
            Xóa
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
        setData(json.reverse());
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
      let date = handleChange(trip.date);
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
      const requestUr = `${requestUrl}trip/createTrip`;
      fetch(requestUr, requestObj).then((response) => {
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
    fetch(`${requestUrl}trip/deleteTrip?tripId=${id}`, requestObj).then(
      (response) => {
        if (response.status === 200) {
          alert("Delete trip successful");
        }
      }
    );
  };
  const handleChange = (e) => {
    const dateFormat =
      e.getFullYear() +
      "-" +
      (e.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      e.getDate().toString().padStart(2, "0");
    return dateFormat;
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Danh Sách Chuyến Đi
        <div className="link" onClick={() => setOpenPopup(true)}>
          Thêm Mới
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
