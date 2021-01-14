import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchHighlights = createAsyncThunk(
    'highlight/fetchHighlights',
    async (_, thunkApi) => {
        thunkApi.dispatch(highLightSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/home/highlights`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const highLightSlice = createSlice({
    name: 'highlight',
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
        [fetchHighlights.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchHighlights.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})