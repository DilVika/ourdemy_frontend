import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import {act} from "@testing-library/react";
import store from "../../index";

const initialState = {
    myCourses: null,
    fetchingMyCourses: false,
    fetchingMyCoursesErr: null,
    currentCourse: null,
    currentCourseFetching: false,
    currentCourseErr: null,
    currentCourseIsExpand: [],
    addingChapter: false,
    addChapterErr: null,
    addingChapterDone: false,
    uploadingVideo: false,
    uploadingVideoDone: false,
    uploadingVideoErr: null,
    progress: 0,
    creatingCourse: false,
    creatingCourseErr: null,
    creatingCourseDone: false,
    updatingCourse: false,
    updatingCourseDone: false,
    updatingErr: null,
    courseContentErr: null,
    changingStatus: false,
    changingStatusDone: false,
    deletingErr: null
}

export const fetchCurrentCourse = createAsyncThunk(
    'leccourse/fetchCurrentCourse',
    async (courseId, thunkAPI) => {
        thunkAPI.dispatch(lecCourseSlice.actions.fetchingCurrentCourse())

        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/full/${courseId}`)

            return res.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    }
)

export const addChapter = createAsyncThunk(
    'leccourse/addChapter',
    async (chapter, thunkApi) => {
        thunkApi.dispatch(lecCourseSlice.actions.addingChapter())

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/chapter`, {
                "cid": chapter.cid,
                "title": chapter.title,
                "previewable": chapter.previewable,
            }, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const uploadVideo = createAsyncThunk(
    'leccourse/uploadVideo',
    async (videoInfo, thunkApi) => {
        thunkApi.dispatch(lecCourseSlice.actions.uploadingVideo())

        try {
            const formData = new FormData()
            formData.append("vid", videoInfo.file)
            formData.append("title", videoInfo.title)

            const res = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/vid/upload/${videoInfo.cid}/${videoInfo.chap_id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }

    }
)

export const deleteVideo = createAsyncThunk(
    'leccourse/deleteVideo',
    async (data, thunkApi) => {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/vid/${data.cid}/${data.chap_id}/${data.vid}`, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const createCourse = createAsyncThunk(
    'leccourse/createCourse',
    async (courseInfo, thunkApi) => {
        try {
            const formData = new FormData()
            if (!courseInfo.ava) {
                return thunkApi.rejectWithValue("missing avatar")
            }
            formData.append("ava", courseInfo.ava[0])
            formData.append("cid", courseInfo.cid)
            formData.append("name", courseInfo.name)
            formData.append("short_desc", courseInfo.short_desc)
            formData.append("full_desc", courseInfo.full_desc)
            formData.append("fee", courseInfo.fee)

            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/create`, formData, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const updateCourse = createAsyncThunk(
    'leccourse/updateCourse',
    async (updateInfo, thunkApi) => {
        thunkApi.dispatch(lecCourseSlice.actions.updatingCourse())
        try {
            const discountF = parseFloat(updateInfo.discount)

            if (Number.isNaN(discountF)) {
                return thunkApi.rejectWithValue("wrong discount format")
            }

            if (discountF > 100.0 || discountF < 0.0) {
                return thunkApi.rejectWithValue("discount must be between 0-1.0")
            }

            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/update/${updateInfo.cid}`, {
                "short_desc": updateInfo.short_desc,
                "full_desc": updateInfo.full_desc,
                "discount": discountF / 100,
            }, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const fetchAllCoursesByMe = createAsyncThunk(
    'leccourse/fetchAllCourseByMe',
    async (_, thunkApi) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/course/allByMe`, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })

            return res.data
        } catch (e) {
            return e.response.data.error
        }
    }
)

export const changeStatus = createAsyncThunk(
    'leccourse/changeStatus',
    async (courseData, thunkApi) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/course/${courseData.changeOption}/${courseData.cid}`, {}, {
                headers: {
                    'Authorization': `Bearer ${thunkApi.getState().authen.token}`
                }
            })
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const lecCourseSlice = createSlice({
    name: 'leccourse',
    initialState: initialState,
    reducers: {
        fetchingMyCourses: (state, action) => {
            state.fetchingMyCourses = true
        },
        clearFetchingMyCoursesState: (state, action) => {
            state.fetchingMyCourses = false
            state.myCourses = null
            state.fetchingMyCoursesErr = null
        },
        fetchingCurrentCourse: (state, action) => {
            state.currentCourseFetching = true
        },
        changingStatus: (state, action) => {
            state.changingStatus = true
        },
        clearCreateCourseState: (state, action) => {
            state.creatingCourse = false
            state.creatingCourseDone = false
            state.creatingCourseErr = null
        },
        clearUploadVideoState: (state, action) => {
            state.uploadingVideo = false
            state.uploadingVideoDone = false
            state.uploadingVideoErr = null
        },
        clearUpdateCourseState: (state, action) => {
            state.myCourses = null
            state.fetchingMyCourses = false
            state.fetchingMyCoursesErr = null
            state.currentCourse = null
            state.currentCourseFetching = false
            state.currentCourseErr = null
            state.updatingCourse = false
            state.updatingErr = null
            state.updatingCourseDone = false
            state.changingStatusDone = false
        },
        clearCourseContentState: (state, action) => {
            state.currentCourse = null
            state.currentCourseFetching = false
            state.currentCourseErr = null
            state.changingStatus = false
            state.changingStatusDone = false
        },
        clearCourseContentDoneState: (state, action) => {
            state.changingStatusDone = false
        },
        updatingCourse: (state, action) => {
            state.updatingCourse = true
        },
        addingChapter: (state, action) => {
            state.addingChapter = true
        },
        clearAddingChapterState: (state, action) => {
            state.addingChapter = false
            state.addChapterErr = null
            state.addingChapterDone = false
        },
        creatingCourse: (state, action) => {
            state.creatingCourse = true
        },
        resetCreatingCourseState: (state, action) => {
            state.creatingCourse = false
            state.creatingCourseErr = null
            state.creatingCourseDone = false
        },
        uploadingVideo: (state, action) => {
            state.uploadingVideo = true
        },
        toggleItem: (state, action) => {
            state.currentCourseIsExpand[action.payload.index].open = action.payload.open
        },
        updateExpandState: (state, action) => {
            state.currentCourseIsExpand = state.currentCourse.chapters.map((chapter, index) => {
                if (!chapter.videos || chapter.videos.length < 1) {
                    return {
                        "expandable": false,
                        "open": false,
                    }
                }
                return {
                    "expandable": true,
                    "open": false,
                }
            })
        }
    },
    extraReducers: {
        [fetchCurrentCourse.fulfilled]: (state, action) => {
            state.currentCourseFetching = false
            state.currentCourse = action.payload
            state.currentCourseIsExpand = action.payload.chapters.map((chapter, index) => {
                if (!chapter.videos || chapter.videos.length < 1) {
                    return {
                        "expandable": false,
                        "open": false,
                    }
                }
                return {
                    "expandable": true,
                    "open": false,
                }
            })
        },
        [fetchCurrentCourse.rejected]: (state, action) => {
            state.currentCourseFetching = false
            state.currentCourseErr = action.payload
            state.currentCourse = {}
        },
        [addChapter.fulfilled]: (state, action) => {
            state.addingChapter = false
            state.currentCourse.chapters.push(action.payload)
            state.currentCourseIsExpand = [...state.currentCourseIsExpand, {
                "open": false,
                "expandable": false,
            }]
            state.addingChapterDone = true
        },
        [addChapter.rejected]: (state, action) => {
            state.addingChapter = false
            state.addChapterErr = action.payload
        },
        [uploadVideo.fulfilled]: (state, action) => {
            state.uploadingVideo = false
            const index = state.currentCourse.chapters.findIndex(chap => {
                return chap.Id === action.payload.chap_id
            })

            state.currentCourse.chapters[index].videos.push(
                {
                    "vid": action.payload.id,
                    "title": action.payload.title
                }
            )
            state.currentCourseIsExpand[index].expandable = true
            state.uploadingVideoDone = true
        },
        [uploadVideo.rejected]: (state, action) => {
            state.uploadingVideo = false
            state.uploadingVideoErr = action.payload
        },
        [createCourse.fulfilled]: (state, action) => {
            state.creatingCourse = false
            state.creatingCourseDone = true
        },
        [createCourse.rejected]: (state, action) => {
            state.creatingCourse = false
            state.creatingCourseErr = action.payload
        },
        [fetchAllCoursesByMe.fulfilled]: (state, action) => {
            state.fetchingMyCourses = false
            state.myCourses = action.payload
        },
        [fetchAllCoursesByMe.rejected]: (state, action) => {
            state.fetchingMyCourses = false
            state.fetchingMyCoursesErr = action.payload
            state.myCourses = []
        },
        [updateCourse.fulfilled]: (state, action) => {
            state.updatingCourse = false
            state.currentCourse = action.payload
            state.updatingCourseDone = true
        },
        [updateCourse.rejected]: (state, action) => {
            state.updatingCourse = false
            state.updatingErr = action.payload
        },
        [changeStatus.fulfilled]: (state, action) => {
            state.changingStatus = false
            state.changingStatusDone = true
            state.currentCourse.is_done = !state.currentCourse.is_done
        },
        [changeStatus.rejected]: (state, action) => {
            state.changingStatus = false
            state.courseContentErr = action.payload
        },
        [deleteVideo.fulfilled]: (state, action) => {
            state.deletingErr = null
            const index = state.currentCourse.chapters.findIndex(chap => {
                return chap.Id === action.payload.chap_id
            })

            const vindex = state.currentCourse.chapters[index].videos.findIndex(vid => {
                return vid.Id === action.payload.Id
            })

            state.currentCourse.chapters[index].videos.splice(vindex, 1)
        },
        [deleteVideo.rejected]: (state, action) => {
            state.deletingErr = action.payload
        },
    }
})