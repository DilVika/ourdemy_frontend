import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    reg: [],
    fetching: false,
    err: null
}

export const fetchRegList = createAsyncThunk(
    'regList/fetchRegList',
    async (_, thunkApi) => {
        const token = thunkApi.getState().authen.token

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/regList`, {
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

export const regListSlice = createSlice({
    name: 'regList',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.fetching = false
            state.err = null
            state.reg = []
        }
    },
    extraReducers: {
        [fetchRegList.fulfilled]: (state, action) => {
            state.fetching = false
            state.reg = action.payload
        },
        [fetchRegList.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        }
    }
})