import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    courseContent: null,
    fetching: false,
    err: null
}

export const fetchContent = createAsyncThunk(
    'content/fetchContent',
    async (data, thunkApi) => {
        thunkApi.dispatch(contentSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/full/${data.id}`)

            console.log(res.data)
            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const contentSlice = createSlice({
    name: 'content',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.fetching = false
            state.err = null
            state.courseContent = null
        }
    },
    extraReducers: {
        [fetchContent.fulfilled]: (state, action) => {
            state.fetching = false
            state.courseContent = action.payload
        },
        [fetchContent.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})