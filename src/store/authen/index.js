import axios from 'axios';
import {
    createSlice,
    configureStore,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {act} from "@testing-library/react";

const initialState = {
    token: null
};

export const signin = createAsyncThunk(
    'authen/signin',
    async (userData, thunkAPI) => {
        // const response = await axios.get(`/api/${type}`);
        return {"token": "abc123"};
    },
);

export const authenSlice = createSlice({
    name: 'authen',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [signin.fulfilled]: (state, action) => {
            state.token = action.payload.token
        }
    }
})