// actions.js
export const createJobSuccess = (job) => ({
  type: "CREATE_JOB_SUCCESS",
  payload: job
});

export const updateJobDetails = (job) => ({
  type: "UPDATE_JOB_DETAILS",
  payload: job
});

export const createJobFailure = (error) => ({
  type: "CREATE_JOB_FAILURE",
  payload: error
});
