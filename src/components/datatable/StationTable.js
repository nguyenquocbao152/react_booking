import { SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import StationForm from "../form/StationForm";

import Popup from "../popup/Popup";

const URL = "http://localhost:8080/station/getAllStation";
const StationTable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState([]);
  const [filteredStation, setFilteredStation] = useState([]);
  const [search, setSearch] = useState("");
  const [recordForEdit, setRecordForEdit] = useState(null);
  const handleDelete = (id) => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/station/deleteStation?stationId=${id}`,
      requestObj
    ).then((response) => {
      if (response.status === 200) {
        alert("Delete station successful");
      }
    });
  };
  const columns = [
    {
      name: "Bến Đi",
      selector: (row) => row.stationStart,
      sortable: true,
    },
    {
      name: "Bến Đến",
      selector: (row) => row.stationEnd,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div
            className="update"
            onClick={() => {
              openInPopup({
                id: row.stationId,
                stationStart: row.stationStart,
                stationEnd: row.stationEnd,
              });
            }}
          >
            Cập Nhật
          </div>
          <div className="delete" onClick={() => handleDelete(row.stationId)}>
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
        console.log("station:", json);
        setData(json);
        setFilteredStation(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const result = data.filter((station) => {
      return station.stationStart.toLowerCase().match(search.toLowerCase());
    });
    setFilteredStation(result);
  }, [search]);
  const addOrEdit = (station, resetForm) => {
    if (station.id === "") {
      console.log("Insert");
      console.log("station:", station);
      console.log("stationStart:", station.stationStart);
      console.log("stationEnd:", station.stationEnd);
      const statio = {
        stationStart: station.stationStart,
        stationEnd: station.stationEnd,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statio),
      };
      const requestUrl = "http://localhost:8080/station/createStation";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Add station successful");
        }
      });
    } else {
      console.log("update");
      console.log("station:", station);
      console.log("stationId:", station.id);
      console.log("stationStart:", station.stationStart);
      console.log("stationEnd:", station.stationEnd);
      const statio = {
        stationId: station.id,
        stationStart: station.stationStart,
        stationEnd: station.stationEnd,
        status: "active",
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(statio),
      };
      const requestUrl = "http://localhost:8080/station/updateStation";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Update station successful");
        }
      });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Stations
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
        <DataTable columns={columns} data={filteredStation} pagination />
      </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <StationForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default StationTable;
