import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    fetching: false,
    err: null,
    promote: [],
    pFetching: false,
    pErr: null,
}

export const fetchUsersAdmin = createAsyncThunk(
    'adminUsers/fetchUsersAdmin',
    async (_, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        thunkApi.dispatch(adminUsersSlice.actions.fetching())
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/users`, {
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

export const fetchPromote = createAsyncThunk(
    'adminUsers/fetchPromote',
    async (_, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        thunkApi.dispatch(adminUsersSlice.actions.fetchingP())
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admin/promote`, {
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

export const banUser = createAsyncThunk(
    'adminUsers/banUser',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/users/ban/${data.id}`,{}, {
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

export const promoteUser = createAsyncThunk(
    'adminUsers/promoteUser',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/promote/${data.id}`,{}, {
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

export const denyPromoteUser = createAsyncThunk(
    'adminUsers/denyPromoteUser',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/admin/promote/${data.id}`, {
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

export const unbanUser = createAsyncThunk(
    'adminUsers/unbanUser',
    async (data, thunkApi) => {
        const token = thunkApi.getState().adminAuth.adminToken

        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin/users/unban/${data.id}`,{}, {
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

export const adminUsersSlice = createSlice(
    {
        name: 'adminUsers',
        initialState: initialState,
        reducers: {
            fetching: (state) => {
                state.fetching = true
            },
            fetchingP: (state) => {
                state.pFetching = true
            },
            clearUsersErr: (state) => {
                state.err = null
            },
            clearPErr: (state) => {
                state.pErr = null
            }
        },
        extraReducers: {
            [fetchUsersAdmin.fulfilled]: (state, action) => {
                state.fetching = false
                state.users = action.payload
            },
            [fetchUsersAdmin.rejected]: (state, action) => {
                state.fetching = false
                state.err = action.payload
            },
            [banUser.fulfilled]: (state, action) => {
                const index = state.users.findIndex((user) => {
                    return user.Id === action.payload.Id
                })

                state.users[index] = action.payload
            },
            [banUser.rejected]: (state, action) => {
                state.err = action.payload
            },
            [unbanUser.fulfilled]: (state, action) => {
                const index = state.users.findIndex((user) => {
                    return user.Id === action.payload.Id
                })

                state.users[index] = action.payload
            },
            [unbanUser.rejected]: (state, action) => {
                state.err = action.payload
            },
            [fetchPromote.fulfilled]: (state, action) => {
                state.pFetching = false
                state.promote = action.payload
            },
            [fetchPromote.rejected]: (state, action) => {
                state.pFetching = false
                state.pErr = action.payload
            },
            [promoteUser.fulfilled]: (state, action) => {
                const index = state.users.findIndex((user) => {
                    return user.Id === action.payload.Id
                })

                state.users[index] = action.payload

                state.promote = state.promote.filter((p) => !(p.lid === action.payload.Id))
            },
            [promoteUser.rejected]: (state, action) => {
                state.pErr = action.payload
            },
            [denyPromoteUser.fulfilled]: (state, action) => {
                state.promote = state.promote.filter((p) => !(p.lid === action.payload.Id))
            },
            [denyPromoteUser.rejected]: (state, action) => {
                state.pErr = action.payload
            },
        }
    }
)