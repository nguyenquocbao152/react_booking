import TripTable from "../../components/datatable/TripTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Trip.scss";
const Trip = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <TripTable />
      </div>
    </div>
  );
};

export default Trip;
