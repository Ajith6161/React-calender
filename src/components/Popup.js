import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import {
  Calendar,
  dateFnsLocalizer,
  momentLocalizer
} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import moment from "moment";
import Chip from "@mui/material/Chip";
import FaceIcon from "@mui/icons-material/Face";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { VerticalAlignBottom } from "@mui/icons-material";

const localizer = momentLocalizer(moment);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Popup({
  modalIsOpen,
  customStyles,
  setIsOpen,
  eventStartTime,
  eventEndTime,
  OnclickAdd,
  type,
  OnclickCancel
}) {
  return (
    <div className="App">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>{type == "Add" ? "Add Slot Timing" : "Book Slot Timing"}</h1>
        <Chip
          label={
            moment(eventStartTime).format("LLL") +
            " - " +
            moment(eventEndTime).format("LLL")
          }
          variant="outlined"
          icon={<FaceIcon />}
        ></Chip>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {type === "Book" && (
            <Button
              variant="contained"
              style={{ marginTop: 30, marginRight: 20 }}
              onClick={OnclickCancel}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="contained"
            style={{ marginTop: 30 }}
            onClick={OnclickAdd}
          >
            {type == "Add" ? "ADD" : "BOOK"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
