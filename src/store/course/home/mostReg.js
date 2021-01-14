import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchMostReg = createAsyncThunk(
    'mostReg/fetchMostReg',
    async (_, thunkApi) => {
        thunkApi.dispatch(mostRegSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/mostReg`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const mostRegSlice = createSlice({
    name: 'mostReg',
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
        [fetchMostReg.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchMostReg.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})