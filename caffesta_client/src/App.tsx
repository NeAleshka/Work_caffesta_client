import React, {useEffect, useState} from 'react';
import './App.css';
import LayOut from "./components/LayOut/LayOut";
import {Route, Routes} from "react-router-dom";
import Main from "./pages/main/Main";
import SingUp from "./pages/sing_up/SingUp";
import SendMessage from "./pages/send_message/SendMessage";
import ConfirmEmail from "./pages/confirmEmail/ConfirmEmail";
import SingIn from "./pages/sing_in/SingIn";
import {RootState, useAppDispatch} from "./store";
import {authMe, setPrompt, setShowChooseTheme, setShowProfileSettings} from './store/infoUserSlice'
import {CookiesProvider, useCookies} from "react-cookie";
import {Helmet} from 'react-helmet'
import {useSelector} from "react-redux";
import {IOrganizationInfo} from "./interfaces";
import User from './pages/user/User'
import favicon from '../src/favicon.ico'


function App() {
    const dispatch = useAppDispatch()
    let [cookies, setCookies] = useCookies()
    const organizationInfo = useSelector<RootState, IOrganizationInfo>(state => state.infoUser.info?.organizationInfo as IOrganizationInfo)
    const [networkStatus, setNetworkStatus] = useState<boolean>(true)

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
        dispatch(setShowProfileSettings(false))
        dispatch(setShowChooseTheme(false))
    }

    return (
        <CookiesProvider>
            <Helmet>
                <title>{localStorage.getItem('organizationName') ?? 'Caffesta'}</title>
                <link rel="icon" href={`${organizationInfo?.logo ?? favicon}`}/>
            </Helmet>
            <div className="App" onClick={(event)=>{hideProfileSettings(event)}}>
                <LayOut/>
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
