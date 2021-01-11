import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialStates = {
    course: null,
    fetching: false,
    err: null
}

export const fetchCourse = createAsyncThunk(
    'courseDetail/fetchCourse',
    async (data, thunkApi) => {
        thunkApi.dispatch(detailSlice.actions.fetching())
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/full/${data.id}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const detailSlice = createSlice({
    name: "courseDetail",
    initialState: initialStates,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.course = null
            state.fetching = false
            state.err = null
        }
    },
    extraReducers: {
        [fetchCourse.fulfilled]: (state, action) => {
            state.fetching = false
            state.course = action.payload
        },
        [fetchCourse.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})