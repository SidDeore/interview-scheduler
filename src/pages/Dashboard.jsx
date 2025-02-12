import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Link } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Dashboard.css";

const localizer = momentLocalizer(moment);

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    date: "",
    interviewer: "",
    candidate: ""
  });

  useEffect(() => {
    const storedInterviews = JSON.parse(localStorage.getItem("interviews")) || [];
    
    const filteredInterviews = storedInterviews.filter((interview) => {
      const { date, interviewer, candidate } = filters;

      const isDateMatch = date ? interview.datetime.startsWith(date) : true;
      const isInterviewerMatch = interviewer
        ? interview.interviewer && interview.interviewer.toLowerCase().includes(interviewer.toLowerCase())
        : true;
      const isCandidateMatch = candidate
        ? interview.candidate && interview.candidate.toLowerCase().includes(candidate.toLowerCase())
        : true;
      
      return isDateMatch && isInterviewerMatch && isCandidateMatch;
    });

    const formattedEvents = filteredInterviews.map((interview) => ({
      id: interview.id,
      title: `${interview.type} Interview with ${interview.candidate}`,
      start: new Date(interview.datetime),
      end: new Date(new Date(interview.datetime).getTime() + 60 * 60 * 1000),
    }));
    setEvents(formattedEvents);
  }, [filters]);

  useEffect(() => {
    if (events.length) {
      const interviews = events.map((event) => ({
        id: event.id,
        candidate: event.title.split(" ")[3],
        type: event.title.split(" ")[0],
        datetime: event.start.toISOString(),
      }));
      localStorage.setItem("interviews", JSON.stringify(interviews));
    }
  }, [events]);

  const handleEventDrop = ({ event, start, end }) => {
    const updatedEvents = events.map((e) => {
      if (e.id === event.id) {
        return { ...e, start, end };
      }
      return e;
    });
    setEvents(updatedEvents);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div>
      <div className="dashboard-container">
        <h2>Interview Dashboard</h2>

        <div className="filter-section">
          <label>
            Filter by Date:
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Filter by Interviewer:
            <input
              type="text"
              name="interviewer"
              placeholder="Enter interviewer's name"
              value={filters.interviewer}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Filter by Candidate:
            <input
              type="text"
              name="candidate"
              placeholder="Enter candidate's name"
              value={filters.candidate}
              onChange={handleFilterChange}
            />
          </label>
        </div>

        <div className="calendar-container">
          <DndProvider backend={HTML5Backend}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              onEventDrop={handleEventDrop}
              style={{ height: 500 }}
            />
          </DndProvider>
        </div>

        <div className="Action-Buttons">
          <Link to="/schedule">
            <button>Go to Schedule Interview</button>
          </Link>
          <Link to="/interviews">
            <button>View Scheduled Interviews</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;