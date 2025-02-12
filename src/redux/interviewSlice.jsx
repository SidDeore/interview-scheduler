import { createSlice } from '@reduxjs/toolkit';

const loadInterviewsFromLocalStorage = () => {
  const savedInterviews = localStorage.getItem('interviews');
  return savedInterviews ? JSON.parse(savedInterviews) : [];
};

const initialState = {
  interviews: loadInterviewsFromLocalStorage(),
};

const interviewSlice = createSlice({
  name: 'interviews',
  initialState,
  reducers: {
    addInterview: (state, action) => {
      state.interviews.push(action.payload);
      localStorage.setItem('interviews', JSON.stringify(state.interviews));
    },
    deleteInterview: (state, action) => {
      state.interviews = state.interviews.filter(
        (interview) => interview.id !== action.payload
      );
      localStorage.setItem('interviews', JSON.stringify(state.interviews));
    },
    updateInterview: (state, action) => {
      const { id, candidate, interviewer, datetime, type } = action.payload;
      const interviewIndex = state.interviews.findIndex(
        (interview) => interview.id === id
      );
      if (interviewIndex !== -1) {
        state.interviews[interviewIndex] = { id, candidate, interviewer, datetime, type };
        localStorage.setItem('interviews', JSON.stringify(state.interviews));
      }
    },
  },
});

export const { addInterview, deleteInterview, updateInterview } = interviewSlice.actions;

export default interviewSlice.reducer;