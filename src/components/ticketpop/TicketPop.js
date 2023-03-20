import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TicketPop = (props) => {
  const { dataTicket, tripData } = props;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "ticket-detail",
    onAfterPrint: () => alert("Print success"),
  });
  return (
    <div>
      <div ref={componentRef} className="modal-body">
        <p>Seat Number: {dataTicket.ticketId}</p>
        <p>Vehicle Number: {tripData.liencePlate} </p>
        <p>
          Chuyến Đi: {tripData.from} - {tripData.arrival}
        </p>
        <p>Date: {tripData.date}</p>
        <p>Time: {tripData.time}</p>
        <p>Amount Paid: {tripData.fare}</p>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handlePrint}
        >
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketPop;
