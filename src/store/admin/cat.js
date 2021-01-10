import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    category: [],
    fetching: false,
    err: null
}

export const fetchCatsAdmin = createAsyncThunk(
    'adminCats/fetchCatsAdmin',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(adminCatSlice.actions.fetching())
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/category/all`)

            return res.data
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.data.error)
        }
    }
)

export const createCatAdmin = createAsyncThunk(
    'adminCats/createCatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/admin/create`, {
                "name": data.name
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            return res.data
        } catch (e) {

        }
    }
)
//
export const createSubcatAdmin = createAsyncThunk(
    'adminCats/createSubcatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/admin/sub/create`, {
                "name": data.name,
                "parent_name": data.parent_name
            }, {
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

export const updateCatAdmin = createAsyncThunk(
    'adminCats/updateCatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/admin/update`, {
                "name": data.name,
                "id": data.id
            }, {
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

export const updateSubcatAdmin = createAsyncThunk(
    'adminCats/updateSubcatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/category/admin/sub/update`, {
                "name": data.name,
                "id": data.id
            }, {
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

export const removeCatAdmin = createAsyncThunk(
    'adminCats/removeCatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/admin/delete/${data.id}`, {
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

export const removeSubcatAdmin = createAsyncThunk(
    'adminCats/removeSubcatAdmin',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/category/admin/sub/delete/${data.id}`, {
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

export const adminCatSlice = createSlice({
    name: 'adminCats',
    initialState: initialState,
    reducers: {
        fetching: (state) => {
            state.fetching = true
        },
        clear: (state) => {
            state.category = null
            state.fetching = false
            state.err = null
        },
        clearCatErr: (state) => {
            state.err = null
        }
    },
    extraReducers: {
        [fetchCatsAdmin.fulfilled]: (state, action) => {
            state.fetching = false
            state.category = action.payload
        },
        [fetchCatsAdmin.rejected]: (state, action) => {
            state.fetching = false
            state.err = action.payload
        },
        [createCatAdmin.fulfilled]: (state, action) => {
            state.category = [...state.category, {
                "cid": action.payload.Id,
                "cat_name": action.payload.name,
                "subcats": []
            }]
        },
        [createCatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [removeCatAdmin.fulfilled]: (state, action) => {
            state.category = state.category.filter((cat) => !(cat.cid === action.payload.Id))
        },
        [removeCatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [createSubcatAdmin.fulfilled]: (state, action) => {
            const index = state.category.findIndex((item) => {
                return item.cat_name === action.payload.catName
            })

            state.category[index].subcats = [...state.category[index].subcats, {
                "scid": action.payload.scid,
                "subcat_name": action.payload.name
            }]
        },
        [createSubcatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [removeSubcatAdmin.fulfilled]: (state, action) => {
            const index = state.category.findIndex((item) => {
                return item.cid === action.payload.Cid
            })

            state.category[index].subcats = state.category[index].subcats.filter(item => !(item.scid === action.payload.Id))
        },
        [removeSubcatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [updateCatAdmin.fulfilled]: (state, action) => {
            const index = state.category.findIndex((item) => {
                return item.cid === action.payload.Id
            })

            state.category[index].cat_name = action.payload.name
        },
        [updateCatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        },
        [updateSubcatAdmin.fulfilled]: (state, action) => {
            const index = state.category.findIndex((item) => {
                return item.cid === action.payload.parentCategoryId
            })

            const sindex = state.category[index].subcats.findIndex((item) => {
                return item.scid === action.payload.Id
            })

            state.category[index].subcats[sindex].subcat_name = action.payload.name
        },
        [updateSubcatAdmin.rejected]: (state, action) => {
            state.err = action.payload
        }
    }
})