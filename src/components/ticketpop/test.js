import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useReactToPrint } from "react-to-print";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
    minWidth: "600px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(3),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  const { openPopup, setOpenPopup, dataTicket, tripData } = props;
  const [open, setOpen] = React.useState(false);
  const [trip, setTrip] = React.useState(
    JSON.parse(sessionStorage.getItem("tripData"))
  );

  const handleClickOpen = () => {
    setOpen(true);
    setOpenPopup(true);
  };
  const handleClose = () => {
    setOpen(false);
    setOpenPopup(false);
  };
  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "ticket-detail",
    onAfterPrint: () => alert("Print success"),
  });

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openPopup}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Thông Tin Chi Tiết Về Vé Xe
        </BootstrapDialogTitle>
        <DialogContent dividers ref={componentRef}>
          <Typography gutterBottom>Seat Number: {dataTicket.seatNo}</Typography>
          <Typography gutterBottom>
            Vehicle Number: {tripData.liencePlate}
          </Typography>
          <Typography gutterBottom>
            Chuyến Đi: {tripData.from} - {tripData.arrival}
          </Typography>
          <Typography gutterBottom>
            Date: {tripData.date} Time: {tripData.time}
          </Typography>
          <Typography gutterBottom>Amount Paid: {tripData.fare}</Typography>
        </DialogContent>
        {dataTicket.status === "expired" ? (
          <DialogActions>
            <Button autoFocus className="bg-danger bg-gradient text-white">
              Vé Hết Hạn
            </Button>
          </DialogActions>
        ) : (
          <DialogActions>
            <Button
              autoFocus
              onClick={handlePrint}
              className="bg-primary bg-gradient text-white"
            >
              In Vé
            </Button>
          </DialogActions>
        )}
      </BootstrapDialog>
    </div>
  );
}
