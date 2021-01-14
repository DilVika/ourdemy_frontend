import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    err: null,
    success: false
}

export const addFav = createAsyncThunk(
    'fav/addFav',
    async (data, thunkApi) => {
        const token = thunkApi.getState().authen.token

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/fav/${data.id}`, {}, {
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

export const favSlice = createSlice({
    name: 'fav',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.err = null
            state.success = false
        }
    },
    extraReducers: {
        [addFav.fulfilled]: (state, action) => {
            state.success = true
        },
        [addFav.rejected]: (state, action) => {
            state.err = action.payload
        }
    }
})