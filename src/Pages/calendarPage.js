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
import Popup from "../components/Popup";
import { color } from "@mui/system";
import Tooltip from 'react-bootstrap/Tooltip';
import CancelPopUp from "../components/CancelPopup";
import Toolbar from "../components/Navbar/Navbar";

const localizer = momentLocalizer(moment);

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
const userList = [
  {
    id: 1,
    label: "My Calender"
  },
  {
    id: 2,
    label: "User 1"
  },
  {
    id: 3,
    label: "User 2"
  }
];
const eventList = [
  {
    id: 1,
    start: new Date(2022, 6, 27, 12, 0),
    end: new Date(2022, 6, 27, 13, 0),
    color: "blue",
    eventId: 1,
    title: "Booked"
  },
  {
    id: 2,
    eventId: 2,
    color: "green",
    start: new Date(2022, 6, 27, 9, 0),
    end: new Date(2022, 6, 27, 10, 0),
    title: "Available"
  },
  {
    id: 3,
    eventId: 3,
    color: "red",
    start: new Date(2022, 6, 25, 9, 0),
    end: new Date(2022, 6, 25, 10, 0),
    title: "Cancelled"
  }
];
function CalendarPage() {
  const [newEvent, setNewEvent] = useState([{ title: "", start: "", end: "" }]);
  const [allEvents, setAllEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [eventStartTime, setEventStartTime] = useState();
  const [eventEndTime, setEventEndTime] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(1);
  const [selectedSlotTiming, setSelectedSlotTiming] = useState({});
  const [open, setOpen] = React.useState({
    open: false
  });
  const [isCanclePopUp,setIsCancelPopup] = useState(false)

  const [openBookingPopup, setOpenBookingPopup] = useState(false);

  const [event, setEvent] = useState("");

  useEffect(() => {
    if (user == 1) {
      const Data = JSON.parse(localStorage.getItem("Even"));
      if (Data) {
        const eventsList = Data.map((item) => ({
          title: item.title,
          start: moment(item.start).toDate(),
          end: moment(item.end).toDate(),
          color:item.color,
          eventId:item.eventId

        }));
        console.log("eventsList")

        console.log(eventsList)
        setNewEvent(eventsList);
      }
    }
    if (user == 2) {
      const Data = JSON.parse(localStorage.getItem("Events2"));
      if (Data) {
        const eventsList = Data.map((item) => ({
          title: item.title,
          start: moment(item.start).toDate(),
          end: moment(item.end).toDate()
        }));
        setNewEvent(eventsList);
      }
    }
    if (user == 3) {
      const Data = JSON.parse(localStorage.getItem("Events3"));
      if (Data) {
        const eventsList = Data.map((item) => ({
          title: item.title,
          start: moment(item.start).toDate(),
          end: moment(item.end).toDate()
        }));
        setNewEvent(eventsList);
      }
    }
    // setNewEvent(eventList);
  }, [user]);

  function handleAddEvent(event) {
    setIsOpen(true);
    setEventStartTime(event.start);
    setEventEndTime(event.end);
    console.log(event.start);
  }
  const OnclickAdd = () => {

    let id=Math.random()
    newEvent.push({
      title: "Available",
      start: new Date(eventStartTime),
      end: new Date(eventEndTime),
      color:'green',
      eventId:id,
      id:id,

    });
    if (user == 1) {
      localStorage.setItem("Even", JSON.stringify(newEvent));
    }
    if (user == 2) {
      localStorage.setItem("Events2", JSON.stringify(newEvent));
    }
    if (user == 3) {
      localStorage.setItem("Events3", JSON.stringify(newEvent));
    }
    setIsOpen(false);
  };
  const handleOptionSelected = (event, value, reason) => {
    setUser(value.id);
    // if (value != null) {
    //   let selctedUserList = newEvent.filter((val) => {
    //     if (val.id === value.id) {
    //       return val;
    //     }
    //   });

    //   let event = [];

    //   selctedUserList.forEach((element) => {
    //     event.push({
    //       title: "Available",
    //       start: new Date(element.start),
    //       end: new Date(element.end)
    //     });
    //   });
    //   setNewEvent(selctedUserList);
    // } // do the rest
    if(value!=null)
    {
     if(value.id==2)
     {

      setNewEvent(newEvent);

     }
     else{
      setNewEvent([]);

     }

    }
  };

  const OnSelectEvent = (event) => {
    console.log(event,"event");
    if (event.title !== "Cancelled") {
      setOpenBookingPopup(true);
      console.log(event);
      setSelectedSlotTiming({
        start: event.start,
        end: event.end,
        id: event.id,

        eventId: event.eventId
      });
    }
    if(event.title == "Available"){
      setIsCancelPopup(true)
    }
  };

  const OnclickBook = () => {
    newEvent.forEach((element) => {
      if (element.eventId === selectedSlotTiming.eventId) {
        element.title = "Booked";
        element.color = "blue";
      }
    });
    setNewEvent(newEvent);
    setEvent("Booked");

    setOpenBookingPopup(false);
    handleClick();
  };
//   const onDeleteClick = React.useCallback(() => {
//     deleteEvent(tempEvent);
//     setOpen(false);
// }, [deleteEvent, tempEvent]);

  const OnclickCancel = () => {
    newEvent.forEach((element) => {
      if (element.eventId === selectedSlotTiming.eventId) {
        element.title = "Cancelled";
        element.color = "red";
      }
    });
    setNewEvent(newEvent);
    setEvent("Cancelled");
    setOpenBookingPopup(false);
    handleClick();
    setIsCancelPopup(false)
  };
  
  const handleClick = () => {
    setOpen({ open: true });
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ open: false });
  };
  function eventStyleGetter(event, start, end, isSelected) {
    console.log(event);
    var style = {
      backgroundColor: event.color,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block"
    };
    return {
      style: style
    };
  }
  const handleHide=()=>{
    setIsCancelPopup(false)
  }
  return (


    <div className="App">
      <Toolbar/>
      <CancelPopUp show={isCanclePopUp} handleHide={handleHide} handleCancel={OnclickCancel} />
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {"Slot " + event + " Successfully"}
        </Alert>
      </Snackbar>
      {isAdmin && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h2>User Availabilty</h2>
        </div>
      )}
      {isAdmin && (
        <Autocomplete
          style={{ marginLeft: 50 }}
          disablePortal
          onChange={handleOptionSelected}
          id="combo-box-demo"
          options={userList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select user" />
          )}
        />
      )}
      <Calendar
        // eventPropGetter={(event, start, end, isSelected) => ({
        //   event,
        //   start,
        //   end,
        //   isSelected,
        //   style: { backgroundColor: "green" }
        // })}
        eventPropGetter={eventStyleGetter}
        views={[ "week", "day"]}
        onSelectSlot={handleAddEvent}
        onSelectEvent={OnSelectEvent}
        defaultView='week'
        popup={true}
        selectable={isAdmin ? false : true}
        localizer={localizer}
        events={newEvent}
        step={15}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        messages={{
          previous: "<",
          today: "Today",
          next: ">",
          month: "Month",
          week: "Week",
          day: "Day"
        }}
        onDoubleClickEvent={()=>console.log("wdjiwdj")}
      />
      <Popup
        modalIsOpen={modalIsOpen}
        customStyles={customStyles}
        setIsOpen={() => setIsOpen(false)}
        eventStartTime={eventStartTime}
        eventEndTime={eventEndTime}
        OnclickAdd={OnclickAdd}
        OnclickCancel={OnclickCancel}
        type="Add"
        
      />
                {/* {isEdit ? <div className="mbsc-button-group"><Button className="mbsc-button-block" color="danger" variant="outline" onClick={onDeleteClick}>Delete event</Button></div> : null} */}
     {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>Add Slot Timing</h1>
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
          <Button
            variant="contained"
            style={{ marginTop: 30 }}
            onClick={OnclickAdd}
          >
            ADD
          </Button>
        </div>
      </Modal> */}
      {isAdmin && (
        <Popup
          modalIsOpen={openBookingPopup}
          customStyles={customStyles}
          setIsOpen={() => setOpenBookingPopup(false)}
          eventStartTime={selectedSlotTiming.start}
          eventEndTime={selectedSlotTiming.end}
          OnclickAdd={OnclickBook}
          OnclickCancel={OnclickCancel}
          type="Book"
       
        />
         
        
      )}
 {/* <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Tooltip!</Tooltip>}>
      <span className="d-inline-block">
        <Button enabled style={{ pointerEvents: 'none' }}>
          Enabled button
        </Button>
      </span>
    </OverlayTrigger> */}

      {/* <Modal
        isOpen={openBookingPopup}
        onRequestClose={() => setOpenBookingPopup(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h1>Book Slot Timing</h1>
        <Chip
          label={
            moment(selectedSlotTiming.start).format("LLL") +
            " - " +
            moment(selectedSlotTiming.end).format("LLL")
          }
          variant="outlined"
          icon={<FaceIcon />}
        ></Chip>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            style={{ marginTop: 30 }}
            onClick={OnclickBook}
          >
            Book
          </Button>
        </div>
      </Modal> */}
    </div>
  );
}

export default CalendarPage;
