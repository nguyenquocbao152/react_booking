import FeedbackTable from "../../components/datatable/Feedbacktable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./Feedback.scss";
const Feedback = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <FeedbackTable />
      </div>
    </div>
  );
};

export default Feedback;
