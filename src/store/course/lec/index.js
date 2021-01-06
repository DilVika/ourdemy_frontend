import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

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
    uploadingVideo: false,
    uploadingVideoErr: null,
    progress: 0,
    creatingCourse: false,
    creatingCourseErr: null,
    creatingCourseDone: false,
}

export const fetchCurrentCourse = createAsyncThunk(
    'leccourse/fetchCurrentCourse',
    async (courseId, thunkAPI) => {
        thunkAPI.dispatch(lecCourseSlice.actions.fetchingCurrentCourse())

        return {
            "cid": "Co001",
            "chapters": [
                {
                    "ccid": "C0001",
                    "title": "Getting started",
                    "previewable": true,
                    "videos": [
                        {
                            "vid": "V0001",
                            "title": "How to roll gacha"
                        },
                        {
                            "vid": "V0002",
                            "title": "How to upgrade your character"
                        },
                        {
                            "vid": "V0003",
                            "title": "How to upgrade artifact"
                        }
                    ]
                },
                {
                    "ccid": "C0002",
                    "title": "Basic",
                    "previewable": false,
                    "videos": [
                        {
                            "vid": "V0021",
                            "title": "Movement"
                        },
                        {
                            "vid": "V0022",
                            "title": "Combat"
                        },
                        {
                            "vid": "V0023",
                            "title": "Equipments"
                        }
                    ]
                },
                {
                    "ccid": "C0003",
                    "title": "Advanced",
                    "previewable": false,
                    "videos": []
                },
                {
                    "ccid": "C0004",
                    "title": "Extras",
                    "previewable": true,
                    "videos": [],
                }
            ],
            "isDone": true
        }
    }
)

export const addChapter = createAsyncThunk(
    'leccourse/addChapter',
    async (chapter, thunkApi) => {
        thunkApi.dispatch(lecCourseSlice.actions.addingChapter())

        return {
            "id": "cc" + Math.random(),
            "title": chapter.title,
            "cid": chapter.cid,
            "previewable": chapter.previewable,
        }
    }
)

export const uploadVideo = createAsyncThunk(
    'leccourse/uploadVideo',
    async (videoInfo, thunkApi) => {
        thunkApi.dispatch(lecCourseSlice.actions.uploadingVideo())

        const formData = new FormData()
        formData.append("vid", videoInfo.file)
        formData.append("title", videoInfo.title)

        return {
            "id": "v" + Math.random(),
            "title": videoInfo.title,
            "cid": videoInfo.cid,
            "chap_id": videoInfo.chap_id,
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

export const lecCourseSlice = createSlice({
    name: 'leccourse',
    initialState: initialState,
    reducers: {
        fetchingMyCourses: (state, action) => {
            state.fetchingMyCourses = true
        },
        fetchingCurrentCourse: (state, action) => {
            state.currentCourseFetching = true
        },
        addingChapter: (state, action) => {
            state.addingChapter = true
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
        },
        [addChapter.fulfilled]: (state, action) => {
            state.addingChapter = false
            state.currentCourse.chapters.push(action.payload)
            state.currentCourseIsExpand = [...state.currentCourseIsExpand, {
                "open": false,
                "expandable": false,
            }]
        },
        [addChapter.rejected]: (state, action) => {
            state.addingChapter = false
            state.addChapterErr = action.payload
        },
        [uploadVideo.fulfilled]: (state, action) => {
            state.uploadingVideo = false
            const index = state.currentCourse.chapters.findIndex(chap => chap.ccid === action.payload.chap_id)

            state.currentCourse.chapters[index].videos.push(
                {
                    "vid": action.payload.id,
                    "title": action.payload.title
                }
            )
            state.currentCourseIsExpand[index].expandable = true
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
        },
    }
})