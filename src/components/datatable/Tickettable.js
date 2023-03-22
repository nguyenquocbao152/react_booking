import { SearchOutlined } from "@mui/icons-material";
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { requestUrl } from "../../const/Const";
const URL = `${requestUrl}ticket/getAllTicket`;
const Tickettable = () => {
  const columns = [
    {
      name: "Họ Và Tên",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Điện Thoại",
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: "Ngày Đặt",
      selector: (row) => {
        return format(parseISO(row.booking_date), "yyyy-MM-dd");
      },
      sortable: true,
    },
    {
      name: "Giá",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "Số Ghế",
      selector: (row) => row.seatNo,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div className="update">Cập Nhật</div>
          <div className="delete">Xóa</div>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL, {
        method: "POST",
      });
      result.json().then((json) => {
        console.log(json.reverse());
        setData(json);
      });
    };
    fetchData();
  }, []);
  return (
    <div className="datatable">
      <div className="datatableTitle">Danh Sách Vé</div>
      <div className="search">
        <input type="text" placeholder="Tìm Kiếm..." />
        <SearchOutlined />
      </div>
      <div style={{ margin: "20px" }}>
        <DataTable columns={columns} data={data} pagination />
      </div>
    </div>
  );
};

export default Tickettable;
