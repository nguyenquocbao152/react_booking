import { SearchOutlined } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import RouteForm from "../form/RouteForm";
import Popup from "../popup/Popup";
import "./RoutTable.scss";
const URL = "http://localhost:8080/route/getAllRoutes";
const RouteTable = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredRoute, setFilteredRoute] = useState([]);
  const [data, setData] = useState([]);
  const columns = [
    {
      name: "Điểm Đi",
      selector: (row) => row.from,
      sortable: true,
    },
    {
      name: "Điểm Đến",
      selector: (row) => row.arrive,
      sortable: true,
    },
    {
      name: "Tổng giờ",
      selector: (row) => row.travelTime,
      sortable: true,
    },
    {
      name: "Khoảng Cách",
      selector: (row) => row.distance,
      sortable: true,
    },
    {
      name: "Chi Phí",
      selector: (row) => row.fare,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div
            className="update"
            onClick={() =>
              openInPopup({
                id: row.routeId,
                from: row.from,
                to: row.arrive,
                travelTime: row.travelTime,
                distance: row.distance,
                fare: row.fare,
              })
            }
          >
            Cập Nhật
          </div>
          <div className="delete" onClick={() => handleDelete(row.routeId)}>
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
        console.log("Route:", json);
        setData(json);
        setFilteredRoute(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const result = data.filter((route) => {
      return route.from.toLowerCase().match(search.toLowerCase());
    });
    setFilteredRoute(result);
  }, [search]);
  const addOrEdit = (route, resetForm) => {
    if (route.id === "") {
      console.log("insert");
      console.log("From:", route.from);
      console.log("To:", route.to);
      console.log("Travel Time:", route.travelTime);
      console.log("Distance", route.distance);
      console.log("Fare:", route.fare);
      const rout = {
        from: route.from,
        arrive: route.to,
        travelTime: route.travelTime,
        distance: route.distance,
        image: "https://futabus.vn/_nuxt/img/commonRoutes_7.5828590.png",
        fare: route.fare,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rout),
      };
      const requestUrl = "http://localhost:8080/route/createRoute";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Add route successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
        }
      });
    } else {
      console.log("update");
      console.log("route:", route);
      console.log("routeId:", route.id);
      console.log("From:", route.from);
      console.log("To:", route.to);
      console.log("Travel Time:", route.travelTime);
      console.log("Distance", route.distance);
      console.log("Fare:", route.fare);
      const rout = {
        routeId: route.id,
        from: route.from,
        arrive: route.to,
        travelTime: route.travelTime,
        distance: route.distance,
        image: "https://futabus.vn/_nuxt/img/commonRoutes_7.5828590.png",
        fare: route.fare,
        status: "active",
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rout),
      };
      const requestUrl = "http://localhost:8080/route/updateRoute";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Update route successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
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
  const handleDelete = (id) => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/route/deleteRoute?routeId=${id}`,
      requestObj
    ).then((response) => {
      if (response.status === 200) {
        alert("Delete route successful");
      }
    });
  };
  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Routes
        <div
          className="link"
          onClick={() => {
            setOpenPopup(true);
            setRecordForEdit(null);
          }}
        >
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
        <DataTable columns={columns} data={filteredRoute} pagination />
      </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <RouteForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default RouteTable;
