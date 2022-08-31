import React, {useEffect, useState} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {Route, Routes, useLocation} from "react-router-dom";
import Main from "./pages/main/Main";
import SingUp from "./pages/sing_up/SingUp";
import SendMessage from "./pages/send_message/SendMessage";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import SingIn from "./pages/sing_in/SingIn";
import {RootState, useAppDispatch} from "./store";
import {
    authMe,
    setCurrentTheme,
    setPrompt,
    setShowChooseTheme,
    setShowExitModal,
    setShowProfileSettings
} from './store/infoUserSlice'
import {CookiesProvider, useCookies} from "react-cookie";
import {Helmet} from 'react-helmet'
import {useSelector} from "react-redux";
import {IOrganizationInfo} from "./interfaces";
import User from './pages/user/User'
import favicon from '../src/favicon.ico'
import {darkTheme, defaultTheme, ITheme, lightTheme} from "./themes";


function App() {
    const dispatch = useAppDispatch()
    let [cookies] = useCookies()
    const {pathname}=useLocation()
    const organizationInfo = useSelector<RootState, IOrganizationInfo>(state => state.infoUser.info?.organizationInfo as IOrganizationInfo)
    const [networkStatus, setNetworkStatus] = useState<boolean>(true)
    let themeType = useSelector<RootState, number>(state => state.infoUser.themeType)
    const themeProperties=useSelector<RootState,ITheme| null>(state => state.infoUser.currentTheme)

    window.addEventListener('online', () => {
        setNetworkStatus(true)
    })
    window.addEventListener('offline', () => {
        setNetworkStatus(false)
    })

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        dispatch(setPrompt(e))
    });


    useEffect(() => {
        if (networkStatus) {
            dispatch(authMe(cookies.refreshToken))
        }
    }, [networkStatus])

    const hideProfileSettings= (event: React.MouseEvent<HTMLDivElement>)=>{
        event.stopPropagation()
        dispatch(setShowExitModal(false))
        if(!pathname.includes('info')){
            dispatch(setShowProfileSettings(false))
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('current_theme_type')){
            themeType= +JSON.parse(localStorage.getItem('current_theme_type') as string)
        }
        switch (themeType) {
            case 1: {
                dispatch(setCurrentTheme(defaultTheme))
                break;
            }
            case 2: {
                dispatch(setCurrentTheme(lightTheme))
                break;
            }
            case 3: {
                dispatch(setCurrentTheme(darkTheme))
                break;
            }
            default:
                dispatch(setCurrentTheme(defaultTheme))
        }
    },[themeType])


    return (
        <CookiesProvider>
            <Helmet>
                <title>{localStorage.getItem('organizationName') ?? 'Caffesta'}</title>
                <link rel="icon" href={`${organizationInfo?.logo ?? favicon}`}/>
            </Helmet>
            <div className="App" onClick={(event)=>{hideProfileSettings(event)}} style={themeProperties?.layout}>
                <Header themeStyle={themeProperties?.header??{} }/>
                <Routes>
                    <Route path={'/'} element={
                        <Main/>
                    }/>
                    <Route path={'/sing_up'} element={
                        <SingUp/>
                    }/>
                    <Route path={'/send_message'} element={
                        <SendMessage/>
                    }/>
                    <Route path={'/confirm_email'} element={
                        <ConfirmEmail/>
                    }/>
                    <Route path={'/sing_in'} element={
                        <SingIn/>
                    }/>
                    <Route path={'/user/*'} element={
                        <User/>
                    }>
                    </Route>
                </Routes>
            </div>
        </CookiesProvider>
    );
}

export default App;
