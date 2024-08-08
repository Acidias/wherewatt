// import * as BackgroundFetch from 'expo-background-fetch';
// import * as TaskManager from 'expo-task-manager';
// import getJobDetailsApi from "../api/getJobDetails";
// import { selectAllJobs, updateJobDetails } from "../slices/jobSlice";
// import { store } from "../store";
// import { useAuth } from "../context/AuthContext";

// const TASK_NAME = "BACKGROUND_JOB_UPDATE_TASK";

// TaskManager.defineTask(TASK_NAME, async () => {
//   try {
//     const { user } = useAuth();
//     const dispatch = store.dispatch;
//     const state = store.getState();
//     const jobs = selectAllJobs(state);
//     const jobsToUpdate = jobs.filter(job => ["pending", "arrival", "in progress"].includes(job.status || ""));

//     for (let job of jobsToUpdate) {
//       if (job.jobid) {
//         console.log("Updating job details:", job.jobid);
//         const updatedJobDetails = await getJobDetailsApi(job.jobid, user!.accessToken);
//         dispatch(updateJobDetails(updatedJobDetails));
//       }
//     }
//     return 'newData';
// } catch (error) {
//     console.error("Failed to update job details:", error);
//     return 'failed';
// }
// });

// export const registerBackgroundTask = async () => {
//   console.log("Registering background task");
//   return BackgroundFetch.registerTaskAsync(TASK_NAME, {
//     minimumInterval: 0.5 * 60,  // <-- fetch interval in seconds (e.g. fetch every 0.5 minutes)
//     stopOnTerminate: false,
//     startOnBoot: true,
//   });
// };

// // To check the status
// BackgroundFetch.getStatusAsync()
//   .then(status => {
//     switch (status) {
//       case BackgroundFetch.Status.Restricted:
//         console.log("BackgroundFetch restricted");
//         break;
//       case BackgroundFetch.Status.Denied:
//         console.log("BackgroundFetch denied");
//         break;
//       case BackgroundFetch.Status.Available:
//         console.log("BackgroundFetch is enabled");
//         break;
//       default:
//         break;
//     }
//   });
