import { SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import VehicleForm from "../form/VehicleForm";
import Popup from "../popup/Popup";
import "./VehiclTable.scss";
const URL = "http://localhost:8080/vehicle/getAllVehicle";
const Vehicletable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredVehicle, setFilteredVehicle] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const columns = [
    {
      name: "Bảng Số Xe",
      selector: (row) => row.licensePlates,
      sortable: true,
    },
    {
      name: "Màu Sắc",
      selector: (row) => row.color,
      sortable: true,
    },
    {
      name: "Tổng Ghế",
      selector: (row) => row.seat,
    },
    {
      name: "Loại Xe",
      selector: (row) => row.vehicleTypeId,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div
            className="update"
            onClick={() => {
              openInPopup({
                id: row.vehicalId,
                licensePlates: row.licensePlates,
                color: row.color,
                seat: row.seat,
                type: row.vehicleTypeId,
              });
            }}
          >
            Update
          </div>
          <div className="delete" onClick={() => handleDelete(row.vehicalId)}>
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
        console.log("vehicle:", json);
        setData(json);
        setFilteredVehicle(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const result = data.filter((vehicle) => {
      return vehicle.licensePlates.toLowerCase().match(search.toLowerCase());
    });
    setFilteredVehicle(result);
  }, [search]);
  const addOrEdit = (vehicle, resetForm) => {
    if (vehicle.id === "") {
      console.log("Insert");
      console.log("vehicle:", vehicle);
      console.log("licensePlates:", vehicle.licensePlates);
      console.log("color:", vehicle.color);
      console.log("seat:", vehicle.seat);
      console.log("type:", vehicle.type);
      const vehicl = {
        licensePlates: vehicle.licensePlates,
        color: vehicle.color,
        seat: vehicle.seat,
        vehicleTypeId: vehicle.type,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicl),
      };
      const requestUrl = "http://localhost:8080/vehicle/createVehicle";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Add vehicle successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
        }
      });
    } else {
      console.log("update");
      console.log("vehicle:", vehicle);
      console.log("vehicleId:", vehicle.id);
      console.log("licensePlates:", vehicle.licensePlates);
      console.log("color:", vehicle.color);
      console.log("seat:", vehicle.seat);
      console.log("type:", vehicle.type);
      const vehicl = {
        vehicalId: vehicle.id,
        licensePlates: vehicle.licensePlates,
        color: vehicle.color,
        seat: vehicle.seat,
        vehicleTypeId: vehicle.type,
        status: "active",
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vehicl),
      };
      const requestUrl = "http://localhost:8080/vehicle/updateVehicle";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Update vehicle successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
        }
      });
    }
  };
  const handleDelete = (id) => {
    console.log("VehicleId:", id);
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/vehicle/deleteVehicle?vehicleId=${id}`,
      requestObj
    ).then((response) => {
      if (response.status === 200) {
        alert("Delete vehicle successful");
      }
    });
  };
  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Vehicle
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
        <DataTable columns={columns} data={filteredVehicle} pagination />
      </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <VehicleForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default Vehicletable;
