import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    relevance: [],
    fetching: false,
    err: null,
}

export const fetchRelevance = createAsyncThunk(
    'rel/fetchRelevance',
    async (data, thunkApi) => {
        thunkApi.dispatch(relSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/relevance/${data.id}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const relSlice = createSlice({
    name: 'rel',
    initialState: initialState,
    reducers: {
        fetching: (state, action) => {
            state.fetching = true
        },
        clear: (state, action) => {
            state.fetching = false
            state.err = null
            state.relevance = []
        }
    },
    extraReducers: {
        [fetchRelevance.fulfilled]: (state, action) => {
            state.fetching = false
            state.relevance = action.payload
        },
        [fetchRelevance.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})