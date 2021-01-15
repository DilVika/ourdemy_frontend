import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialStates = {
    courses: [],
    fetching: false,
    err: null
}

export const fetchCoursesAdmin = createAsyncThunk(
    'adminCourses/fetchCoursesAdmin',
    async (_, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        thunkApi.dispatch(adminCoursesSlice.actions.fetching())
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/courses`, {
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

export const forceDeleteCourseAdmin = createAsyncThunk(
    'adminCourses/forceDeleteCourseAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/course/${data.id}`, {
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

export const disableCourseAdmin = createAsyncThunk(
    'adminCourses/disableCourseAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/course/disable/${data.id}`, {}, {
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

export const enableCourseAdmin = createAsyncThunk(
    'adminCourses/enableCourseAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/course/enable/${data.id}`, {}, {
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


export const adminCoursesSlice = createSlice({
    name: 'adminCourses',
    initialState: initialStates,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clearErr: (state) => {
            state.err = null
        }
    },
    extraReducers: {
        [fetchCoursesAdmin.fulfilled]: (state, action) => {
            state.fetching = false
            const tuned = action.payload.map((course) => {
                const id = course.id.split("\"")[1]

                return {
                    ...course,
                    "id": id
                }
            })
            state.courses = tuned
        },
        [fetchCoursesAdmin.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [forceDeleteCourseAdmin.fulfilled]: (state, action) => {
            state.courses = state.courses.filter((course) => !(course.id === action.payload.Id))
        },
        [forceDeleteCourseAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [enableCourseAdmin.fulfilled]: (state, action) => {
            const index = state.courses.findIndex((course) => {
                return course.id === action.payload.Id
            })

            state.courses[index].disabled = false
        },
        [enableCourseAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [disableCourseAdmin.fulfilled]: (state, action) => {
            const index = state.courses.findIndex((course) => {
                return course.id === action.payload.Id
            })

            state.courses[index].disabled = true
        },
        [disableCourseAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
    }
})