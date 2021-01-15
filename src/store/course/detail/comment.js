import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    comments: [],
    fetching: false,
    err: null,
    commenting: false,
    success: false,
    myComment: null,
}

export const fetchComments = createAsyncThunk(
    'comment/fetchComments',
    async (data, thunkApi) => {
        thunkApi.dispatch(commentsSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reviews/${data.id}`)

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const fetchMyComment = createAsyncThunk(
    'comment/fetchMyComment',
    async (data, thunkApi) => {
        const token = thunkApi.getState().authen.token

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/reviews/${data.id}/my`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data
        } catch (e) {
            if (e.status === 404) {
                return null
            }
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const sendComment = createAsyncThunk(
    'comment/sendComment',
    async (data, thunkApi) => {
        thunkApi.dispatch(commentsSlice.actions.commenting())
        const token = thunkApi.getState().authen.token

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/reviews/create`,
                {
                    "cid": data.id,
                    "content": data.content,
                    "score": data.score,
                },
                {
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

export const commentsSlice = createSlice({
    name: 'comment',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.fetching = false
            state.comments = []
            state.err = null
            state.success = false
            state.commenting = false
            state.myComment = null
        },
        commenting: (state) => {
            state.commenting = true
        },
        clearSuccess: (state) => {
            state.commenting = false
            state.success = false
        }
    },
    extraReducers: {
        [fetchComments.fulfilled]: (state, action) => {
            state.fetching = false
            state.comments = action.payload
        },
        [fetchComments.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [sendComment.fulfilled]: (state, action) => {
            state.commenting = false
            state.comments = [...state.comments, action.payload]
            state.success = true
            state.myComment = action.payload
        },
        [sendComment.rejected]: (state, action) => {
            state.commenting = false
            state.err = action.payload
        },
        [fetchMyComment.fulfilled]: (state, action) => {
            state.myComment = action.payload
        },
        [fetchComments.rejected]: (state, action) => {
            state.myComment = null
        }
    }
})