import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    searchRes: [],
    searching: false,
    searchErr: null
}

export const search = createAsyncThunk(
    'search/search',
    async (data, thunkApi) => {
        thunkApi.dispatch(searchSlice.actions.searching())
        try {
            let queryString = ""
            if (data.catId !== null) {
                queryString = queryString + `?cat=${data.catId}`
            }
            if (data.subcatId !== null) {
                queryString = queryString + (queryString === "" ? `?subcat=${data.subcatId}` : `&subcat=${data.subcatId}`)
            }
            if (data.keyword !== null) {
                queryString = queryString + (queryString === "" ? `?keyword=${data.keyword}` : `&keyword=${data.keyword}`)
            }

            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/search${queryString}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        searching: (state, action) => {
            state.searching = true
        },
        clear: (state, action) => {
            state.searching = false
            state.searchErr = null
            state.searchRes = []
        }
    },
    extraReducers: {
        [search.fulfilled]: (state, action) => {
            state.searchRes = action.payload
            state.searching = false
        },
        [search.rejected]: (state, action) => {
            state.searching = false
            state.searchErr = action.payload
        }
    }
})