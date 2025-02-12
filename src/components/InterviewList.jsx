import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { deleteInterview } from "../redux/interviewSlice";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const InterviewList = () => {
  const interviews = useSelector((state) => state.interviews.interviews);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteInterview = (id) => {
    dispatch(deleteInterview(id));
    toast.error("Interview Deleted!");
  };

  return (
    <Container className="mt-4 text-center">
     <Button
          variant="link"
          className="position-absolute top-0 start-0 p-3"
          onClick={() => navigate("/")}
          style={{ fontSize: "1.5rem", color: "#000" }}
        >
          <FaArrowLeft />
        </Button>
      <h2 className="mb-4">Scheduled Interviews</h2>

      {interviews.length === 0 ? (
        <p>No interviews scheduled.</p>
      ) : (
        <Table striped bordered hover responsive="sm" className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "5%" }}>#</th>
              <th style={{ width: "25%" }}>Candidate</th>
              <th style={{ width: "25%" }}>Interviewer</th>
              <th style={{ width: "25%" }}>Date & Time</th>
              <th style={{ width: "20%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, index) => (
              <tr key={interview.id}>
                <td>{index + 1}</td>
                <td>{interview.candidate}</td>
                <td>{interview.interviewer}</td>
                <td>{new Date(interview.datetime).toLocaleString()}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    className="me-2"
                    style={{ minWidth: "75px" }}
                    onClick={() => handleDeleteInterview(interview.id)}
                  >
                    Delete
                  </Button>
                  <Link to={`/edit/${interview.id}`}>
                    <Button variant="primary" size="sm" style={{ minWidth: "75px" }}>
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default InterviewList;