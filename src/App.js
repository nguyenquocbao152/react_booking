import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Footer from "./components/Footer/Footer";
import UserForm from "./components/form/UserForm";
import Header from "./components/Header/Header";
import HomeUser from "./components/MainPage/Home";
import ChangePassword from "./components/Profile/ChangePassword";
import Profile from "./components/Profile/Profile";
import TripList from "./components/TripList/TripList";
import SearchTrip from "./pages/About/About";
import BuyTicket from "./pages/BuyTicket/BuyTicket";
import Success from "./pages/BuyTicket/Success";
import Contact from "./pages/Contact/Contact";
import Feedback from "./pages/feedback/Feedback";
import HomeAdmin from "./pages/home/Home";
import List from "./pages/list/List";
import Rout from "./pages/route/Route";
import Station from "./pages/station/Station";
import Ticket from "./pages/ticket/Ticket";
import Trip from "./pages/trip/Trip";
import Vehicle from "./pages/vehicle/Vehicle";
import VerifyCode from "./pages/Verify/VerifyCode";
import VerifySuccess from "./pages/Verify/VerifySuccess";

function App() {
  const PrivateRoutes = () => {
    const isAuth = JSON.parse(sessionStorage.getItem("admin"));

    return isAuth ? <HomeAdmin /> : <Navigate to="/login" />;
  };
  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AddU57tauCNjWXZ0ps1h-1V9gQxTBCkqxthJMK-GEDqMu-DGOInDrugVNAd69Qtcbeqb-_aPHzXe48u-",
      }}
    >
      <div className="App">
        <Header></Header>
        <Routes>
          <Route path="/">
            <Route index element={<HomeUser />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="tour" element={<TripList />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<SearchTrip />} />
            <Route path="profile" element={<Profile />} />
            <Route path="password" element={<ChangePassword />} />
            <Route path="buyTicket" element={<BuyTicket />}></Route>
            <Route path="buyTicketSuccess" element={<Success />}></Route>
            <Route path="form" element={<UserForm />} />
            <Route path="register/verify" element={<VerifyCode />} />
            <Route path="register/verify/success" element={<VerifySuccess />} />
            <Route path="admin">
              <Route index element={PrivateRoutes()} />
              <Route path="users" element={<List />} />
              <Route path="trips" element={<Trip />} />
              <Route path="routes" element={<Rout />} />
              <Route path="vehicles" element={<Vehicle />} />
              <Route path="feedbacks" element={<Feedback />} />
              <Route path="stations" element={<Station />} />
              <Route path="tickets" element={<Ticket />} />
            </Route>
          </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </PayPalScriptProvider>
  );
}

export default App;
