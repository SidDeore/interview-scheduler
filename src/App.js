import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ScheduleInterview from "./pages/ScheduleInterview";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // Ensure correct import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InterviewList from "./components/InterviewList";
import EditInterview from "./pages/EditInterview";

function App() {
  return (
    <Provider store={store}>
      <Router>
        {/* Toast Container for Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedule" element={<ScheduleInterview />} />
          <Route path="/interviews" element={<InterviewList />} />
          <Route path="/edit/:id" element={<EditInterview />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;