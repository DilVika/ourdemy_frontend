import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchNewest = createAsyncThunk(
    'newest/fetchNewest',
    async (_, thunkApi) => {
        thunkApi.dispatch(newestSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/newest`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const newestSlice = createSlice({
    name: 'newest',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state, action) => {
            state.fetching = false
            state.err = null
            state.courses = []
        }
    },
    extraReducers: {
        [fetchNewest.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchNewest.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})