import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchAllCourse = createAsyncThunk(
    'list/fetchAllCourse',
    async (data, thunkApi) => {
        thunkApi.dispatch(listSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/all`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const fetchAllCourseByCat = createAsyncThunk(
    'list/fetchAllCourseByCat',
    async (data, thunkApi) => {
        thunkApi.dispatch(listSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/all/cat/${data.id}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const fetchAllCourseBySubcat = createAsyncThunk(
    'list/fetchAllCourseBySubcat',
    async (data, thunkApi) => {
        thunkApi.dispatch(listSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/all/subcat/${data.id}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const listSlice = createSlice({
    name: 'list',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.fetching = false
            state.err = null
            state.courses = []
        }
    },
    extraReducers: {
        [fetchAllCourse.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchAllCourse.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [fetchAllCourseByCat.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchAllCourseByCat.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [fetchAllCourseBySubcat.fulfilled]: (state, action) => {
            state.fetching = false
            state.courses = action.payload
        },
        [fetchAllCourseBySubcat.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
    }
})