import axios from 'axios';
import {
    createSlice,
    createAsyncThunk,
} from '@reduxjs/toolkit';
import jwtDecode from "jwt-decode";

const initialState = {
    token: localStorage.getItem("token") || null,
    refresh: localStorage.getItem("refresh") || null,
    isLec: (localStorage.getItem("isLec") === 'true') || false,
    user: {
        "username": "",
        "fullname": "",
        "password": "",
        "email": "",
        "isLec": false
    },
    favList: [],
    updateErr: null,
    passwordErr: null,
    fetching: false,
    updating: false,
    updatingPassword: false,
    signingIn: false,
    signingUp: false,
    signUpErr: null,
    signInErr: null,
    signingOut: false,
    otping: false,
    shouldOtp: false,
    signingUpFinish: false,
    signingInFinish: false,
    updatingFinish: false,
    updatingPasswordFinish: false,
};

export const signin = createAsyncThunk(
    'authen/signin',
    async (userData, thunkAPI) => {
        try {
            thunkAPI.dispatch(authenSlice.actions.loadingSignIn())
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/signin`, {
                "username": userData.username,
                "password": userData.password,
            });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue("login failed: username or password mismatch")
        }
    },
);

export const updateProfile = createAsyncThunk(
    'authen/updateProfile',
    async (userData, thunkAPI) => {
        if (userData.email === "") {
            return thunkAPI.rejectWithValue("update failed: email is missing")
        }
        try {
            thunkAPI.dispatch(authenSlice.actions.updating())
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/update`, {
                "fullname": userData.fullname,
                "email": userData.email,
            }, {
                headers: {
                    'Authorization': `Bearer ${thunkAPI.getState().authen.token}`
                }
            });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue("login failed: username or password mismatch")
        }
    },
);

export const updatePassword = createAsyncThunk(
    'authen/updatePassword',
    async (userData, thunkAPI) => {
        if (userData.repeatPassword !== userData.password) {
            return thunkAPI.rejectWithValue("password and repeat password not matched")
        }
        try {
            thunkAPI.dispatch(authenSlice.actions.updatingPassword())
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/users/updatePassword`, {
                "old_password": userData.oldPassword,
                "new_password": userData.password,
            }, {
                headers: {
                    'Authorization': `Bearer ${thunkAPI.getState().authen.token}`
                }
            });
            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response.data.error)
        }
    },
);

export const fetchProfile = createAsyncThunk(
    'authen/fetchProfile',
    async (_, thunkAPI) => {
        try {
            thunkAPI.dispatch(authenSlice.actions.fetchingProfile())
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${thunkAPI.getState().authen.token}`
                }
            });

            return response.data
        } catch (err) {
            return thunkAPI.rejectWithValue("profile fetching failed, something went wrong")
        }
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
            return thunkAPI.rejectWithValue(err.response.data.error)
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
            return thunkAPI.rejectWithValue(err.response.data.error)
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
        fetchingProfile: (state, action) => {
            state.fetching = true
        },
        otpMode: (state, action) => {
            state.shouldOtp = true
        },
        signupMode: (state, action) => {
            state.shouldOtp = false
        },
        loadingSignUp: (state, _) => {
            state.signingUp = true
        },
        loadingSignIn: (state, _) => {
            state.signingIn = true
        },
        loadingOtp: (state, _) => {
            state.otping = true
        },
        updating: (state, _) => {
            state.updating = true
        },
        updatingPassword: (state, _) => {
            state.updatingPassword = true
        },
        resetSignUpState: (state, _) => {
            state.signingIn = false
            state.signingUp = false
            state.signUpErr = null
            state.signingOut = false
            state.otping = false
            state.shouldOtp = false
            state.signingUpFinish = false
        },
        resetSignInState: (state, _) => {
            state.signingIn = false
            state.signingUp = false
            state.signInErr = null
            state.signingOut = false
            state.signingInFinish = false
        },
        resetPasswordUpdateState: (state, _) => {
            state.passwordErr = null
            state.updatingPassword = false
            state.updatingPasswordFinish = false
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
            state.signingIn = false
            state.signingInFinish = true
            state.token = action.payload.accessToken
            state.isLec = jwtDecode(action.payload.accessToken).isLec
            state.refresh = action.payload.refreshToken
            localStorage.setItem("token", action.payload.accessToken)
            localStorage.setItem("refresh", action.payload.refreshToken)
        },
        [signin.rejected]: (state, action) => {
            state.signingIn = false
            state.signInErr = action.payload
        },
        [signout.fulfilled]: (state, action) => {
            state.token = null
            state.signingOut = false
            localStorage.removeItem("token")
            localStorage.removeItem("refresh")
        },
        [otpConfirm.fulfilled]: (state, action) => {
            state.shouldOtp = false
            state.signingUpFinish = true
        },
        [otpConfirm.rejected]: (state, action) => {
            state.signUpErr = action.payload
        },
        [fetchProfile.fulfilled]: (state, action) => {
            state.user = action.payload
            state.fetching = false
            state.updateErr = null
        },
        [fetchProfile.rejected]: (state, action) => {
            state.updateErr = action.payload
        },
        [updateProfile.fulfilled]: (state, action) => {
            state.user.fullname = action.payload.user
            state.user.email = action.payload.email
            state.updating = false
            state.updatingFinish = true
        },
        [updateProfile.rejected]: (state, action) => {
            state.updating = false
            state.updateErr = action.payload
        },
        [updatePassword.fulfilled]: (state, action) => {
            state.updatingPassword = false
            state.updatingPasswordFinish = true
        },
        [updatePassword.rejected]: (state, action) => {
            console.log(action.payload)
            state.updatingPassword = false
            state.passwordErr = action.payload
        }
    }
})