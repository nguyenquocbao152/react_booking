import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import UserForm from "./components/form/UserForm";
import Verify from "./components/vetify/Vetify";
import { productInputs, userInputs } from "./formSource";
import Feedback from "./pages/feedback/Feedback";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import New from "./pages/new/New";
import Rout from "./pages/route/Route";
import Single from "./pages/single/Single";
import Station from "./pages/station/Station";
import Trip from "./pages/trip/Trip";
import Vehicle from "./pages/vehicle/Vehicle";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="form" element={<UserForm />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
              <Route path="verify" element={<Verify />} />
            </Route>
            <Route path="trips">
              <Route index element={<Trip />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="routes">
              <Route index element={<Rout />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="vehicles">
              <Route index element={<Vehicle />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="feedbacks">
              <Route index element={<Feedback />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
            <Route path="stations">
              <Route index element={<Station />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
