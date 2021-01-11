import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    currentCourse: null,
    fetching: false,
    err: null,
    timeMark: 0,
    vidUrl: "",
    currentVid: null,
}

export const fetchVidCurrentCourse = createAsyncThunk(
    'video/fetchVidCurrentCourse',
    async (data, thunkApi) => {
        thunkApi.dispatch(videoSlice.actions.fetching())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/full/${data.cid}`)

            thunkApi.dispatch(videoSlice.actions.setVidUrl(
                {
                    "cid": data.cid,
                    "vid": data.vid,
                    "token": thunkApi.getState().authen.token
                }
            ))

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const markTime = createAsyncThunk(
    'video/markTime',
    async (data, thunkApi) => {

        const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/time/${data.vid}`, {
            "cur_time": Math.floor(data.curTime)
        }, {
            headers: {
                'Authorization': `Bearer ${thunkApi.getState().authen.token}`
            }
        })
    }
)

export const getTime = createAsyncThunk(
    'video/getTime',
    async (data, thunkApi) => {
       try {
           const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/time/${data.vid}`, {
               headers: {
                   'Authorization': `Bearer ${thunkApi.getState().authen.token}`
               }
           })

           return res.data
       } catch (e) {
           return 0
       }
    }
)

export const videoSlice = createSlice(
    {
        name: 'video',
        initialState: initialState,
        reducers: {
            fetching: (state, action) => {
                state.currentCourse = null
                state.fetching = true
            },
            clear: (state, action) => {
                state.fetching = false
                state.currentCourse = null
                state.err = null
                state.timeMark = 0
                state.currentVid = null
            },
            setVidUrl: (state, action) => {
                state.vidUrl = `${process.env.REACT_APP_BACKEND_URL}/vid/download/${action.payload.vid}?auth=${action.payload.token}`
            },
            markTime: (state, action) => {
                state.timeMark = action.payload.time
            }
        },
        extraReducers: {
            [fetchVidCurrentCourse.fulfilled]: (state, action) => {
                state.fetching = false
                state.currentCourse = action.payload
            },
            [fetchVidCurrentCourse.rejected]: (state, action) => {
                state.fetching = false
                state.err = action.payload
            },
            [getTime.fulfilled]: (state, action) => {
                state.timeMark = action.payload
            },
            [getTime.rejected]: (state, action) => {
                state.timeMark = 0
            }
        }
    }
)