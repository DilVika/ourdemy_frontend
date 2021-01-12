import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialStates = {
    joined: false,
    fetching: false,
    err: null
}

export const checkJoin = createAsyncThunk(
    'courseJoin/fetchCourse',
    async (data, thunkApi) => {
        thunkApi.dispatch(joinSlice.actions.fetching())

        const token = thunkApi.getState().authen.token

        if (!token)
            return false

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/checkJoined/${data.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const joinCourse = createAsyncThunk(
    'courseJoin/joinCourse',
    async (data, thunkApi) => {
        thunkApi.dispatch(joinSlice.actions.fetching())

        const token = thunkApi.getState().authen.token
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/buy/${data.id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const joinSlice = createSlice({
    name: "courseJoin",
    initialState: initialStates,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.joined = false
            state.fetching = false
            state.err = null
        }
    },
    extraReducers: {
        [checkJoin.fulfilled]: (state, action) => {
            state.fetching = false
            state.joined = action.payload
        },
        [checkJoin.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [joinCourse.fulfilled]: (state, action) => {
            state.fetching = false
            state.joined = true
        },
        [joinCourse.rejected]: (state, action) => {
            state.fetching
            state.err = action.payload
        }
    }
})