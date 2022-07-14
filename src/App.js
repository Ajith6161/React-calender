import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import image from './New.png'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function App() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState([]);

    function handleAddEvent() {
        console.log(newEvent, "newEvent")
        setAllEvents([...allEvents, newEvent]);
    }

    return (
        <div className="App">
            <u><i><h1>Demo-Calendar-view</h1></i></u>
            <blink><h2 style={{ color: "red" }}>Add Event<img src={image} style={{ width: "2%", height: "2%" }} alt="New Logo" /></h2></blink>
            <div >
                <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                <DatePicker showTimeSelect dateFormat="Pp" placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
                <DatePicker showTimeSelect dateFormat="Pp" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
                <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
                    Add Event
                </button>
            </div>
            <Calendar onSelectSlot={(slotInfo) => {
                console.log(slotInfo,"ïnfo")
            }} popup={true} selectable={true} localizer={localizer} events={allEvents} step={15} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
        </div>
    );
}

export default App;
