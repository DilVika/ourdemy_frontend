import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
    currentCourse: null,
    currentCourseFetching: false,
    currentCourseErr: null,
    currentCourseIsExpand: []
}

export const fetchCurrentCourse = createAsyncThunk(
    'leccourse/fetchCurrentCourse',
    async (courseId, thunkAPI) => {
        thunkAPI.dispatch(lecCourseSlice.actions.fetchingCurrentCourse())

        return {
            "chapters": [
                {
                    "ccid": "C0001",
                    "name": "Getting started",
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
                    "name": "Basic",
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
                    "name": "Advanced",
                    "videos": []
                },
                {
                    "ccid": "C0004",
                    "name": "Extras",
                    "videos": [],
                }
            ],
            "isDone": true
        }
    }
)

export const lecCourseSlice = createSlice({
    name: 'leccourse',
    initialState: initialState,
    reducers: {
        fetchingCurrentCourse: (state, action) => {
            state.currentCourseFetching = true
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
        }
    }
})