import { StepLabel, Stepper, Step } from "@mui/material";
import React, { useContext, useEffect, useState, createContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaypalCheckoutButton from "../../components/checkout/PaypalCheckoutButton";
import { requestUrl } from "../../const/Const";
import "./BuyTicket.css";
const myContext = createContext();

export default function BuyTicket() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [routeId, setRouteId] = useState(searchParams.get("routeid"));
  const [date, setDate] = useState(searchParams.get("date"));
  const [step, setStep] = useState(Number(searchParams.get("step")));
  const [listTrip, setListTrip] = useState([{ name: "default" }]);
  const [screen, setScreen] = useState(<ConfirmRoute />);
  const [id, setId] = useState("");

  const nextStep = (id) => {
    setStep((currentStep) => Number(currentStep) + 1);
    setId(id);
  };

  useEffect(() => {
    if (step === 1) {
      setScreen(<ConfirmRoute />);
      setSearchParams({ ...Object.fromEntries(searchParams), step: "1" });
    }
    if (step === 2) {
      setScreen(<ConfirmInfor />);
      setSearchParams({ ...Object.fromEntries(searchParams), step: "2" });
    }
    if (step === 3) {
      setScreen(<Payment />);
      setSearchParams({ ...Object.fromEntries(searchParams), step: "3" });
    }
  }, [step]);

  const prevStep = () => {
    if (step >= 0) {
      setStep((currentStep) => currentStep - 1);
    }
  };

  useEffect(() => {
    const routeObj = {
      routeId: routeId,
      date: date,
    };
    const requestObj = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(routeObj),
    };

    fetch(`${requestUrl}trip/getAllTripByDate`, requestObj)
      .then((response) => response.json())
      .then((data) => {
        console.log("search trip:", data);
        setListTrip(data);
      });
  }, []);

  return (
    <div className="container buy-ticket">
      <Stepper activeStep={step}>
        <Step>
          <StepLabel>Chọn tuyến</StepLabel>
        </Step>
        <Step>
          <StepLabel>Xác nhận lộ trình</StepLabel>
        </Step>
        <Step>
          <StepLabel>Xác nhận thông tin</StepLabel>
        </Step>
        <Step>
          <StepLabel>Thanh toán</StepLabel>
        </Step>
        {/* <Step>
                    <StepLabel>Thanh toán</StepLabel>
                </Step> */}
      </Stepper>
      <myContext.Provider value={{ listTrip, nextStep, id }}>
        {screen}
      </myContext.Provider>
      <button className="btn btn-warning" onClick={() => prevStep()}>
        Trở về
      </button>
      {/* <button onClick={() => nextStep()}>Next</button> */}
    </div>
  );
}

function ConfirmRoute() {
  const [searchParams] = useSearchParams();
  const context = useContext(myContext);
  const handleDate = (date) => {
    var tempDate = new Date(date);
    var formattedDate = [
      tempDate.getDate(),
      tempDate.getMonth() + 1,
      tempDate.getFullYear(),
    ].join("/");
    return formattedDate;
  };

  const handleChooseTrip = (e) => {
    context.nextStep(e.target.id);
  };
  return (
    <div className="container confirm-route">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="mt-4">
            {context.listTrip[0].from} - {context.listTrip[0].arrival}
          </h3>
          <p>
            <i>{handleDate(searchParams.get("date").slice(0, 10))}</i>
          </p>
        </div>
      </div>
      <div className="row">
        {context.listTrip?.map((list, index) => (
          <div className="col-12 card" key={index}>
            <div className="row">
              <div className="col-10">
                <p className="time">Giờ khởi hành: {list.time}</p>
                <p className="description">
                  <span>Giá tiền: {list.fare}</span>
                  <span>Biển số xe: {list.liencePlate}</span>
                  <span>Số chỗ ngồi: {list.totalSeat}</span>
                </p>
                <p>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <i className="text-success far fa-dot-circle"></i>&nbsp;
                      {list.from}
                    </div>
                    <div className="col-12 col-sm-6">
                      <b>Điểm lên xe:</b> {list.stationStart}
                    </div>
                  </div>
                </p>
                <p>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <i className="text-danger fas fa-map-marker-alt"></i>
                      &nbsp;
                      {list.arrival}
                    </div>
                    <div className="col-12 col-sm-6">
                      <b>Điểm xuống xe:</b> {list.stationEnd}
                    </div>
                  </div>
                </p>
              </div>
              <div className="col-2 button-choose">
                <button
                  className="btn btn-primary"
                  id={index}
                  onClick={handleChooseTrip}
                >
                  Chọn
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConfirmInfor() {
  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [fullName, setFullName] = useState(user.fullname);
  const [email, setEmail] = useState(user.email);
  const context = useContext(myContext);
  const navigate = useNavigate();
  const handleDate = (date) => {
    var tempDate = new Date(date);
    var formattedDate = [
      tempDate.getDate(),
      tempDate.getMonth() + 1,
      tempDate.getFullYear(),
    ].join("/");
    return formattedDate;
  };
  const handleConfirmInfor = (e) => {
    e.preventDefault();
    context.nextStep(e.target.id);
    sessionStorage.setItem(
      "trip",
      JSON.stringify(context.listTrip[context.id])
    );
  };
  return (
    <div className="container confirm-infor">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="mt-4 text-center">Xác nhận thông tin đặt xe</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3"></div>
        <div className="col-lg-6">
          <form className="form-infor">
            <div className="row m-4">
              <div className="col-4">
                <label>Số điện thoại:</label>
              </div>
              <div className="col-8">
                <input
                  readOnly
                  className="form-control"
                  type="tel"
                  value={phoneNumber}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Họ và tên:</label>
              </div>
              <div className="col-8">
                <input className="form-control" type="text" value={fullName} />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Email:</label>
              </div>
              <div className="col-8">
                <input className="form-control" type="email" value={email} />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Chuyến xe:</label>
              </div>
              <div className="col-8">
                <input
                  readOnly
                  className="form-control"
                  type="text"
                  value={
                    context.listTrip[context.id].from +
                    " - " +
                    context.listTrip[context.id].arrival
                  }
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Ngày:</label>
              </div>
              <div className="col-8">
                <input
                  readOnly
                  className="form-control"
                  type="text"
                  value={handleDate(
                    context.listTrip[context.id].date.slice(0, 10)
                  )}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-4">
                <label>Giờ:</label>
              </div>
              <div className="col-8">
                <input
                  readOnly
                  className="form-control"
                  type="text"
                  value={context.listTrip[context.id].time}
                />
              </div>
            </div>
            <div className="row m-4">
              <div className="col-12">
                <button
                  className="btn btn-secondary"
                  id={context.id}
                  onClick={handleConfirmInfor}
                  type="submit"
                >
                  Xác nhận thông tin
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}

function Payment() {
  const trip = JSON.parse(sessionStorage.getItem("trip"));
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <h3 className="mt-4 text-center">Thanh toán</h3>
          <p>
            <i>Khách hàng có thể thanh toán bằng các hình thức</i>
          </p>
        </div>
      </div>
      <div className="button-checkout">
        <PaypalCheckoutButton trip={trip}></PaypalCheckoutButton>
      </div>
    </div>
  );
}
