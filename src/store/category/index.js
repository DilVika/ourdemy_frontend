import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {signin} from "../authen";

const initialState = {
    category: [],
    error: null
}

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        if (state.cat.category && state.cat.category.length < 1) {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/all`)
            return res.data
        }
        else {
            return state.cat.category
        }
    }
)

export const catSlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            console.log(`payload: ${action.payload}`)
            state.category = action.payload
        },
        [fetchCategories.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})