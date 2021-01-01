import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {signin} from "../authen";
import {act} from "@testing-library/react";

const initialState = {
    category: [],
    error: null
}

export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState()
        if (state.cat.category.length === 0) {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/all`)
            return res.data
        }
        else {
            return state.category
        }
    }
)

export const catSlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {

    },
    extraReducers: {
        [fetchCategories.fulfilled]: (state, action) => {
            state.category = action.payload
        },
        [fetchCategories.rejected]: (state, action) => {
            state.error = action.error
        }
    }
})