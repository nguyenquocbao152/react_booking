import React, { useEffect, useState } from "react";
import UserForm from "../form/UserForm";
import Popup from "../popup/Popup";
import "./Datatable.scss";
import DataTable from "react-data-table-component";
import { SearchOutlined } from "@mui/icons-material";
import UpdateUser from "../form/UpdateUser";
const URL = "http://localhost:8080/users/getAllUser";
const Datatable = () => {
  const columns = [
    {
      name: "Họ Và Tên",
      selector: (row) => row.fullname,
      sortable: true,
    },
    {
      name: "Giới Tính",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Vai Trò",
      selector: (row) => row.role,
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
                id: row.phoneNumber,
                fullName: row.fullname,
                email: row.email,
                role: row.role,
                gender: row.gender,
              });
            }}
          >
            Cập Nhật
          </div>
          <div className="delete" onClick={() => handleDelete(row.phoneNumber)}>
            Xóa
          </div>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [openUpdatePop, setUpdatePop] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const handleDelete = (id) => {
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:8080/users/deleteUser?phoneNumber=${id}`,
      requestObj
    ).then((response) => {
      if (response.status === 200) {
        alert("Delete user successful");
      }
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        method: "POST",
      });
      result.json().then((json) => {
        setData(json);
        setFilteredUser(json);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((user) => {
      return user.fullname.toLowerCase().match(search.toLowerCase());
    });
    setFilteredUser(result);
  }, [search]);

  const addOrEdit = (user, resetForm) => {
    if (user.id === "") {
      console.log("Insert");
      console.log("Full name:", user.fullName);
      console.log("Email:", user.email);
      console.log("Phone:", user.mobile);
      console.log("Gender:", user.gender);
      const users = {
        password: "123",
        fullname: user.fullName,
        gender: user.gender,
        phoneNumber: user.mobile,
        email: user.email,
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      };
      const requestUrl = "http://localhost:8080/users/register";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Add user successful");
          resetForm();
          setRecordForEdit(null);
          setOpenPopup(false);
        }
      });
    } else {
      console.log("update");
      console.log("Full name:", user.fullName);
      console.log("Email:", user.email);
      console.log("Phone:", user.id);
      console.log("Gender:", user.gender);
      const users = {
        fullname: user.fullName,
        gender: user.gender,
        phoneNumber: user.id,
        email: user.email,
        status: "active",
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(users),
      };
      const requestUrl = "http://localhost:8080/users/updateUser";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Update user successful");
          resetForm();
          setRecordForEdit(null);
          setUpdatePop(false);
        }
      });
    }
  };
  const openInPopup = (item) => {
    console.log("item:", item);
    setRecordForEdit(item);
    setUpdatePop(true);
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        List All Users
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
        <DataTable columns={columns} data={filteredUser} pagination />
      </div>
      <Popup
        title="User Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Popup
        title="User Form"
        openPopup={openUpdatePop}
        setOpenPopup={setUpdatePop}
      >
        <UpdateUser recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default Datatable;
