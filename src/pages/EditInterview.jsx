import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateInterview } from "../redux/interviewSlice";
import { Button, Form, Container, Card } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const EditInterview = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const interview = useSelector((state) =>
    state.interviews.interviews.find((i) => i.id === Number(id))
  );

  const [candidate, setCandidate] = useState("");
  const [interviewer, setInterviewer] = useState("");
  const [datetime, setDatetime] = useState("");
  const [type, setType] = useState("Technical");

  useEffect(() => {
    if (interview) {
      setCandidate(interview.candidate);
      setInterviewer(interview.interviewer);
      setDatetime(interview.datetime);
      setType(interview.type);
    }
  }, [interview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInterview({ id: interview.id, candidate, interviewer, datetime, type }));
    navigate("/");
  };

  return interview ? (
    <Container className="d-flex mt-5 flex-column align-items-center vh-100">
    <h1 className="text-center mb-4">Edit Interview</h1>

    <Button
      variant="link"
      className="position-absolute top-0 start-0 p-3"
      onClick={() => navigate("/interviews")}
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
          Save Changes
        </Button>
      </Form>
    </Card>
  </Container>
  ) : (
    <p>Interview not found</p>
  );
};

export default EditInterview;