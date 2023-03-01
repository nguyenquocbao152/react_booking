import TripTable from "../../components/datatable/TripTable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Trip.scss";
const Trip = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <TripTable />
      </div>
    </div>
  );
};

export default Trip;
