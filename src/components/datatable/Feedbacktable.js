import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import FeedbackForm from "../form/FeedbackForm";
import Popup from "../popup/Popup";

import "./FeedTable.scss";
const URL =
  "https://ticket-booking-production.up.railway.app/feedback/getAllFeedBack";
const FeedbackTable = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const columns = [
    {
      name: "Khách Hàng",
      selector: (row) => row.userId,
      sortable: true,
    },
    {
      name: "Tin Nhắn",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Phản Hồi",
      selector: (row) => row.response,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="cellAction">
          <div
            className={row.response === "" ? "relyButton" : "noAction"}
            onClick={() => {
              openInPopup({
                id: row.feedbackId,
                message: row.message,
                rely: row.response,
              });
            }}
          >
            {row.response === "" ? "Phản Hồi" : "No action"}
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
        console.log("feedback:", json);
        setData(json);
      });
    };
    fetchData();
  }, []);
  useEffect(() => {
    const requestUrl =
      "https://ticket-booking-production.up.railway.app/users/getAllUser";
    const fetchData = async () => {
      const result = await fetch(requestUrl, {
        method: "POST",
      });
      result.json().then((json) => {
        console.log("User:", json);
        setUser(json);
      });
    };
    fetchData();
  }, []);
  const addOrEdit = (feedback, resetForm) => {
    if (feedback.id === "") {
      console.log("Insert");
    } else {
      console.log("update");
      console.log("Feedback", feedback);
      console.log("FeedbackId", feedback.id);
      console.log("Message", feedback.message);
      console.log("Response", feedback.rely);
      const feeback = {
        feedbackId: feedback.id,
        message: feedback.message,
        response: feedback.rely,
        status: "active",
      };
      const requestObj = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(feeback),
      };
      const requestUrl =
        "https://ticket-booking-production.up.railway.app/feedback/updateFeedBack";
      fetch(requestUrl, requestObj).then((response) => {
        if (response.status === 200) {
          alert("Response passenger successful");
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
  const getAllFeedback = () => {
    return data.map((x) => ({
      ...x,
      userId: getFullName(x.userId),
    }));
  };
  const getFullName = (userId) => {
    let fullName = "";
    user.map((user) => {
      if (user.userId === userId) {
        fullName = user.fullname;
      }
    });
    return fullName;
  };

  return (
    <div style={{ margin: "20px" }}>
      <DataTable
        title="Danh Sách Góp Ý"
        columns={columns}
        data={getAllFeedback()}
        pagination
      />
      <Popup
        title="Phản Hồi Góp Ý Của Người Dùng"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FeedbackForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
    </div>
  );
};

export default FeedbackTable;
