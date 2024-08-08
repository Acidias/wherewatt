// jobSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { JobType } from '../types/types';

type JobState = {
  jobs: JobType[];
  currentJob: JobType | null;
  error: string | null;
};

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  error: null,
};


const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    createJobSuccess: (state, action) => {
      state.jobs.push(action.payload); // Add new job to the jobs array
      state.currentJob = action.payload;
      state.error = null;
    },
    updateJobDetails: (state, action) => {
      // Find and update the specific job in the jobs array if needed
      const jobIndex = state.jobs.findIndex(job => job.jobid === action.payload.jobid);
      if (jobIndex !== -1) {
        state.jobs[jobIndex] = { ...state.jobs[jobIndex], ...action.payload };
      }
      state.currentJob = { ...state.currentJob, ...action.payload };
    },
    createJobFailure: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { createJobSuccess, updateJobDetails, createJobFailure } = jobSlice.actions;
export const selectAllJobs = (state: { job: JobState }) => state.job.jobs;
export const selectCurrentJob = (state: { job: JobState }) => state.job.currentJob;

export default jobSlice.reducer;
