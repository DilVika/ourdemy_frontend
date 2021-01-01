import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';

const initialState = {
    token: null,
    signingIn: false,
    signingUp: false,
    signUpErr: null,
    signingOut: false,
    otping: false,
    shouldOtp: false,
    signingUpFinish: false,
};

export const signin = createAsyncThunk(
    'authen/signin',
    async (userData, thunkAPI) => {
        // const response = await axios.get(`/api/${type}`);
        return {"token": "abc123"};
    },
);

export const signup = createAsyncThunk(
    'authen/signup',
    async (userData, thunkAPI) => {
        if (userData.password !== userData.repeatPassword) {
            return thunkAPI.rejectWithValue("password and repeat password not match")
        }
        try {
            thunkAPI.dispatch(authenSlice.actions.loadingSignUp())
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
                "fullname": userData.name,
                "username": userData.username,
                "email": userData.email,
                "pass": userData.password,
            });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.error)
        }
    },
);

export const otpConfirm = createAsyncThunk(
    'authen/otpConfirm',
    async (otpData, thunkAPI) => {
        if (otpData.otp.length === 0) {
            return thunkAPI.rejectWithValue("missing otp")
        }
        try {
            thunkAPI.dispatch(authenSlice.actions.loadingOtp())
            const response = await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/otp`, {
                "username": otpData.username,
                "otp": otpData.otp,
            });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.error)
        }
    },
);

export const signout = createAsyncThunk(
    'authen/signout',
    async (_, thunkAPI) => {
        // const response = await axios.get(`/api/${type}`);
    },
);


export const authenSlice = createSlice({
    name: 'authen',
    initialState: initialState,
    reducers: {
        otpMode: (state, action) => {
            state.shouldOtp = true
        },
        signupMode: (state, action) => {
            state.shouldOtp = false
        },
        loadingSignUp: (state, _) => {
            state.signingUp = true
        },
        loadingOtp: (state, _) => {
            state.otping = true
        },
        resetSignUpState: (state, _) => {
            state.signingIn = false
            state.signingUp = false
            state.signUpErr = null
            state.signingOut = false
            state.otping = false
            state.shouldOtp = false
            state.signingUpFinish = false
        }
    },
    extraReducers: {
        [signup.fulfilled]: (state, action) => {
            state.signingUp = false
            state.shouldOtp = true
        },
        [signup.rejected]: (state, action) => {
            state.signUpErr = action.payload
        },
        [signin.fulfilled]: (state, action) => {
            state.token = action.payload.token
            state.signingIn = false
        },
        [signout.fulfilled]: (state, action) => {
            state.token = null
            state.signingOut = false
        },
        [otpConfirm.fulfilled]: (state, action) => {
            state.shouldOtp = false
            state.signingUpFinish = true
        },
        [otpConfirm.rejected]: (state, action) => {
            state.signUpErr = action.payload
        }
    }
})