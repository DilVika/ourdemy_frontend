import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchMostViewed = createAsyncThunk(
    'mostViewed/fetchMostViewed',
    async (_, thunkApi) => {
        thunkApi.dispatch(mostViewedSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/mostWatch`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const mostViewedSlice = createSlice({
    name: 'mostViewed',
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
        [fetchMostViewed.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchMostViewed.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})