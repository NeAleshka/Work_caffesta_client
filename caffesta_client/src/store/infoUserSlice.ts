import {createAction, createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import userApi from "../api";
import {
    IServerResponse, IErrorRequest,
    ILoginResponse,
    IUserDTO,
    IUserInfo, INewsResponse, INews,
} from "../interfaces";
import {ITheme} from "../themes";


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

export const getNews = createAsyncThunk<INewsResponse, undefined, { rejectValue: { error: IErrorRequest } }>('infoUser/getNews',
    async (_, {rejectWithValue, dispatch}) => {
        dispatch(setIsLoading(true))
        try {
            return userApi.getNews()
        } catch (e) {
            return rejectWithValue(e.response.data)
        } finally {
            dispatch(setIsLoading(false))
        }
    })

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

export const changeUserInfo = createAsyncThunk<IServerResponse, IUserDTO, { rejectValue: { error: IErrorRequest } }>(
    'infoUser/changeInfo',
    async (data, {rejectWithValue}) => {
        try {
            return userApi.changeInfo(data)
        } catch (e) {
            return rejectWithValue(e.response)
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
export const setIsLogin = createAction('infoUser/setIsLogin', (isLogin: boolean = false) => {
    return {
        payload: {
            isLogin
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
    (showProfileSettings:boolean) => {
        return {
            payload: {
                showProfileSettings
            }
        }
    })

export const setShowChooseTheme = createAction('infoUser/setShowChooseTheme',
    (showChooseTheme:boolean) => {
        return {
            payload: {
                showChooseTheme
            }
        }
    }
)

export const setThemeType = createAction('infoUser/setThemeType',
    (themeType) => {
        return {
            payload: {
                themeType
            }
        }
    })

export const setCurrentTheme = createAction('infoUser/setCurrentTheme',
    (currentTheme:ITheme) => {
        return {
            payload: {
                currentTheme
            }
        }
    })

export const setDetailsNewsIndex = createAction('infoUser/setDetailsNewsIndex',
    (currentIndex:number) => {
        return {
            payload: {
                currentIndex
            }
        }
    })

export const setShowExitModal = createAction('infoUser/setShowExitModal',
    (showExitModal:boolean) => {
        return {
            payload: {
                showExitModal
            }
        }
    })

export const setShowMenu = createAction('infoUser/setShowMenu',
    (setShowMenu:boolean) => {
        return {
            payload: {
                setShowMenu
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
    themeType: number
    currentTheme: ITheme | null
    news:INews[] | null
    detailsNewsIndex:number
    showExitModal:boolean
    showMenu:boolean
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
    themeType: 0,
    currentTheme: null,
    news: null,
    detailsNewsIndex:0,
    showExitModal:false,
    showMenu:false,
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
                    localStorage.setItem('auth','success')
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
                    state.isInitialized=true
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
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            })
            .addCase(changeUserInfo.fulfilled, (state, action) => {
                state.isEdit = true
                if (action.payload.success) {
                    console.log(action.payload)
                    state.info = action.payload.userData
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
            .addCase(setShowChooseTheme, (state, action) => {
                state.showChooseTheme = action.payload.showChooseTheme
            })
            .addCase(setThemeType, (state, action) => {
                localStorage.setItem('current_theme_type', action.payload.themeType as string)
                state.themeType = action.payload.themeType
            })
            .addCase(setCurrentTheme, (state, action) => {
                state.currentTheme = action.payload?.currentTheme
            })
            .addCase(getNews.fulfilled, (state, action) => {
                if (action.payload.success && action.payload.news) {
                  state.news=action.payload.news
                }else {
                    state.requestMessage=action.payload.error?.message|| 'Something error'
                }
            })
            .addCase(getNews.rejected,(state,action)=>{
                state.requestMessage=action.error.message|| 'Something error'
            })
            .addCase(setDetailsNewsIndex,(state, action)=>{
                state.detailsNewsIndex=action.payload.currentIndex
            })
            .addCase(setShowExitModal,(state, action)=>{
                state.showExitModal=action.payload.showExitModal
            })
            .addCase(setIsLogin,(state, action)=>{
                state.isLogin=action.payload.isLogin
            })
            .addCase(setShowMenu,(state, action)=>{
                state.showMenu=action.payload.setShowMenu
            })
    }
})

export default infoUserSlice.reducer
