import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import userApi from "../api";
import {
    IServerResponse, IErrorRequest,
    ILoginResponse,
    IUserDTO,
    IUserInfo,
} from "../interfaces";


export const registrationUser = createAsyncThunk<ILoginResponse, IUserInfo, {
    rejectValue: { error: IErrorRequest }
}>(
    'infoUser/registrationUser',
    async (data: IUserInfo, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.reg(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)

export const authMe = createAsyncThunk<IServerResponse, string>(
    'infoUser/authMe',
    async (refreshToken, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.me(refreshToken)
        } catch (e) {
            return rejectWithValue(e.response.data.isLogin)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)


export const getUser = createAsyncThunk<IServerResponse, string, {
    rejectValue: IErrorRequest
}>('infoUser/getUser',
    async (accessToken: string, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return userApi.getUser(accessToken)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)

export const verificationUser = createAsyncThunk<IServerResponse, string, {
    rejectValue: IErrorRequest
}>(
    'infoUser/verification',
    async (verificationCode, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.userVerification(verificationCode)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)

export const sendVerificationCode = createAsyncThunk<{ success: boolean, error?: IErrorRequest }, { email: string }, { rejectValue: IErrorRequest }>(
    'infoUser/sendVerificationCode',
    async ({email}, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.sendVerificationCode(email)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    }
)


export const login = createAsyncThunk<ILoginResponse, { login: string, password: string }, {
    rejectValue: { isVerification: boolean, message: string }
}>('infoUser/login',
    async ({login, password}, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return await userApi.login(login, password)
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    })

export const logout = createAsyncThunk(
    'infoUser/logout',
    async () => {
        try {
            return await userApi.logout()
        } catch (e) {
            console.log(e)
        }
    })

export const changeUserInfo = createAsyncThunk<{ data?: IUserDTO, success: boolean, error?: IErrorRequest }, IUserDTO, { rejectValue: { error: IErrorRequest } }>(
    'infoUser/changeInfo',
    async (data, {rejectWithValue}) => {
        try {
            return userApi.changeInfo(data)
        } catch (e) {
            return rejectWithValue(e.response.data)
        }
    }
)

export const setIsEdit = createAction('infoUser/setIsEdit', (isEdit: boolean = false) => {
    return {
        payload: {
            isEdit
        },
    }
})

export const setIsLoading = createAction('infoUser/setIsLoading',
    (isLoading: boolean) => {
        return {
            payload: {
                isLoading
            }
        }
    })

export const setPrompt = createAction('infoUser/setPrompt',
    (prompt) => {
        return {
            payload: {
                prompt
            }
        }
    }
)
export const setShowProfileSettings = createAction('infoUser/setShowProfileSettings',
    (showProfileSettings) => {
        return {
            payload: {
                showProfileSettings
            }
        }
    })

export const setShowChooseTheme = createAction('infoUser/setShowChooseTheme',
    (showChooseTheme) => {
        return {
            payload: {
                showChooseTheme
            }
        }
    }
)

export const setThemeType=createAction('infoUser',
    (themeType)=>{
    return{
        payload:{
            themeType
        }
    }
    })

const initial: IUserDTO = {
    phone: '',
    email: '',
    name: '',
    lastName: '',
    bonuses: {
        bonus: 0,
        points: 0,
        check: 0,
        sum: 0
    },
    cardNumber: "0",
    id: '',
    organizationInfo: {
        name: '',
        logo: ''
    }
}

interface IInitial {
    isEdit?: boolean,
    isLogin?: boolean,
    isVerification?: boolean,
    isSuccessRequest?: boolean,
    info?: IUserDTO,
    requestMessage?: string,
    isLoading?: boolean,
    isInitialized?: boolean,
    prompt?: Event,
    showProfileSettings: boolean
    showChooseTheme: boolean
    themeType:number
}

const initialState: IInitial = {
    isEdit: true,
    isLogin: false,
    isVerification: false,
    isSuccessRequest: false,
    info: initial,
    requestMessage: '',
    isLoading: false,
    isInitialized: false,
    prompt: undefined,
    showProfileSettings: false,
    showChooseTheme: false,
    themeType:0
}

const infoUserSlice = createSlice({
    name: "infoUser",
    initialState: initialState,
    reducers: {
        changeInfo(state, action) {
            state.isEdit = !state.isEdit
            state.info = action.payload
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload.isLoading
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registrationUser.fulfilled, (state, action) => {
                console.log(action.payload)
                if (action.payload.success) {
                    state.requestMessage = ''
                    state.isSuccessRequest = true
                } else {
                    state.isSuccessRequest = false
                    state.requestMessage = action.payload.error?.message || "Something Error"
                }
            })
            .addCase(registrationUser.rejected, (state, action) => {
                state.requestMessage = action.payload?.error?.message || 'Something Error'
                state.isSuccessRequest = false

            })
            .addCase(authMe.pending, (state) => {
                state.requestMessage = ''
            })
            .addCase(authMe.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.isLogin = true
                    state.isInitialized = true
                    state.requestMessage = ''
                } else {
                    state.requestMessage = action.payload.error?.message
                }
            })
            .addCase(authMe.rejected, (state,) => {
                state.isLogin = false
                state.isInitialized = true
            })

            .addCase(getUser.fulfilled, (state, action) => {
                if (action.payload.success && action.payload.userData) {
                    state.info = action.payload.userData
                    localStorage.setItem('logo', action.payload.userData.organizationInfo?.logo ?? "")
                    localStorage.setItem('organizationName', action.payload.userData.organizationInfo?.name ?? "")
                } else {
                    state.requestMessage = action.payload.error?.message
                }
            })
            .addCase(getUser.rejected, (state, action) => {
                state.requestMessage = action.payload?.message
            })
            .addCase(verificationUser.fulfilled, (state, action) => {
                state.requestMessage = ''
                state.isSuccessRequest = false
                if (action.payload.success) {
                    state.isLogin = true
                } else {
                    state.isLogin = false
                    state.requestMessage = action.payload.error?.message || "Something Error"
                }
            })
            .addCase(verificationUser.rejected, (state, action) => {
                state.isSuccessRequest = false
                state.requestMessage = action.payload?.message || 'Sorry,we have some problem(( '
            })

            .addCase(sendVerificationCode.fulfilled, (state, action) => {
                if (action.payload.success) {
                    state.requestMessage = ''
                    state.isVerification = true
                } else {
                    state.isVerification = false
                    state.requestMessage = action.payload.error?.message || "Something Error"
                }
            })
            .addCase(sendVerificationCode.rejected, (state, action) => {
                state.isVerification = false
                state.requestMessage = action.payload?.message || "Something Error"
            })
            .addCase(login.fulfilled, (state, action) => {
                state.requestMessage = ''
                if (action.payload.success && action.payload.userData) {
                    state.isLogin = true
                    state.isVerification = true
                    localStorage.setItem('accessToken', action.payload.userData.accessToken)
                    localStorage.setItem('refreshToken', action.payload.userData.refreshToken)
                } else {
                    state.isLogin = false
                    state.requestMessage = action.payload.error?.message || 'Error'
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.isLogin = false
                state.requestMessage = action.payload?.message || "Sorry,we have some problem(( "
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.requestMessage = ''
                state.isLogin = false
                state.isVerification = false
                state.isSuccessRequest = false
                state.isEdit = true
                state.isLoading = false
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                state.isEdit = true
                if (action.payload.success) {
                    state.info = action.payload.data
                } else {
                    state.requestMessage = action.payload.error?.message || 'Something error'
                }
            })
            .addCase(changeUserInfo.rejected, (state, action) => {
                state.isEdit = true
                state.requestMessage = action.payload?.error?.message || 'Something error'
            })
            .addCase(setIsEdit, (state, action) => {
                state.isEdit = action.payload.isEdit
            })
            .addCase(setPrompt, (state, action) => {
                state.prompt = action.payload.prompt
            })
            .addCase(setShowProfileSettings, (state, action) => {
                state.showProfileSettings = action.payload.showProfileSettings
            })
            .addCase(setShowChooseTheme,(state, action)=>{
                state.showChooseTheme=action.payload.showChooseTheme
            })
            .addCase(setThemeType,(state, action)=>{
                localStorage.setItem('current_theme_type',action.payload.themeType as string)
                state.themeType=action.payload.themeType
            })
    }
})

export default infoUserSlice.reducer
