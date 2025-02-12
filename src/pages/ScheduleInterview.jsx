import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addInterview } from "../redux/interviewSlice";
import { Button, Form, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import "./ScheduleInterview.css"

const ScheduleInterview = () => {
  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [datetime, setDatetime] = useState("");
  const [type, setType] = useState("Technical");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const existingInterviews = JSON.parse(localStorage.getItem("interviews")) || [];

  const checkForConflicts = (candidate, interviewer, datetime) => {
    const newStart = new Date(datetime);
    const newEnd = new Date(newStart.getTime() + 60 * 60 * 1000);

    for (let interview of existingInterviews) {
      const interviewStart = new Date(interview.datetime);
      const interviewEnd = new Date(new Date(interview.datetime).getTime() + 60 * 60 * 1000);

      if (
        (interview.candidate === candidate &&
          (newStart < interviewEnd && newEnd > interviewStart)) ||
        (interview.interviewer === interviewer &&
          (newStart < interviewEnd && newEnd > interviewStart))
      ) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!candidate || !interviewer || !datetime) {
      toast.error("All fields are required!");
      return;
    }

    if (checkForConflicts(candidate, interviewer, datetime)) {
      toast.error("Conflict detected! The candidate or interviewer is already scheduled for this time.");
      return;
    }
    dispatch(addInterview({ id: Date.now(), candidate, interviewer, datetime, type }));

    const updatedInterviews = [...existingInterviews, { id: Date.now(), candidate, interviewer, datetime, type }];
    localStorage.setItem("interviews", JSON.stringify(updatedInterviews));

    toast.success("Interview scheduled successfully!");

    navigate("/");
  };

  return (
    <Container className="d-flex mt-5 flex-column align-items-center vh-100">
      <h1 className="text-center mb-4">Schedule New Interview</h1>

      <Button
        variant="link"
        className="position-absolute top-0 start-0 p-3"
        onClick={() => navigate("/")}
        style={{ fontSize: "1.5rem", color: "#000" }}
      >
        <FaArrowLeft />
      </Button>

      <Card className="p-4 shadow-lg" style={{ width: "450px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Candidate</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter candidate name"
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Interviewer</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter interviewer name"
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Interview Type</Form.Label>
            <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
              <option value="Behavioral">Behavioral</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Schedule Interview
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default ScheduleInterview;