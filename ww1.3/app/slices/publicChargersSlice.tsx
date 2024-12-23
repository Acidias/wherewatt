import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Base API URL
const url = "http://10.32.75.56:3010";

// Async thunk to fetch chargers from MongoDB
export const fetchPublicChargers = createAsyncThunk(
  'publicChargers/fetchPublicChargers',
  async () => {
    console.log('Fetching public chargers');
    const response = await axios.get(`${url}/api/publicchargers`);
    console.log(response.data.length);
    return response.data;
  }
);

const publicChargersSlice = createSlice({
  name: 'publicChargers',
  initialState: {
    chargers: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublicChargers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPublicChargers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.chargers = action.payload;
      })
      .addCase(fetchPublicChargers.rejected, (state, action) => {
        state.status = 'failed';
        // state.error = action.error.message || null;
      });
  },
});

export default publicChargersSlice.reducer;
