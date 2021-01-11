import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    sendErr: null,
    sendSuccess: false,
    resetErr: null,
    resetSuccess: false
}

export const sendRecoveryCode = createAsyncThunk(
    'userResetPassword/sendRecoveryCode',
    async (data, thunkApi) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/resetPassword`, {
                "email": data.email
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'userResetPassword/resetPassword',
    async (data, thunkApi) => {
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/confirmResetPassword`, {
                "email": data.email,
                "new_password": data.password,
                "re_confirm_password": data.rpassword,
                "recover_code": data.recovery
            })

            return res.data
        } catch (e) {
            return thunkApi.rejectWithValue(e.response.data.error)
        }
    }
)

export const userResetPasswordSlice = createSlice({
    name: 'userResetPassword',
    initialState: initialState,
    reducers: {
        reset: (state) => {
            state.sendSuccess = false
            state.sendErr = null
            state.resetSuccess = false
            state.resetErr = null
        }
    },
    extraReducers: {
        [sendRecoveryCode.fulfilled]: (state, action) => {
            state.sendSuccess = true
        },
        [sendRecoveryCode.rejected]: (state, action) => {
            state.sendErr = action.payload
        },
        [resetPassword.fulfilled]: (state, action) => {
            state.resetSuccess = true
        },
        [resetPassword.rejected]: (state, action) => {
            state.resetErr = action.payload
        }
    }
})

