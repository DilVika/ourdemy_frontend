import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    adminToken: null,
    logingIn: false,
    err: null
}

export const adminLogin = createAsyncThunk(
    'adminAuthen/adminLogin',
    async (data, thunkApi) => {
        thunkApi.dispatch(adminAuthenSlice.actions.login())

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/signin`, {
                "username": data.username,
                "password": data.password
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const adminSignOut = createAsyncThunk(
    'adminAuthen/adminSignOut',
    async (_, thunkApi) => {
        thunkApi.dispatch(adminAuthenSlice.actions.clear())
    }
)

export const adminAuthenSlice = createSlice({
    name: 'adminAuthen',
    initialState: initialState,
    reducers: {
        login: (state) => {
            state.logingIn = true
        },
        clear: (state) => {
            state.adminToken = null
            state.logingIn = false
            state.err = null
        }
    },
    extraReducers: {
        [adminLogin.fulfilled]: (state, action) => {
            state.logingIn = false
            state.adminToken = action.payload.accessToken
        },
        [adminLogin.rejected]: (state, action) => {
            state.logingIn = false
            state.err = action.payload
        }
    }
})