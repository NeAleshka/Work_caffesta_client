import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import React, {useEffect, useRef} from "react";
import InfoUser from "./infoUser/InfoUser";
import Accumulation from "./accumulation/accumulation";
import QRCode from "./qrCode/QRCode";
import PreLoader from "../../components/PreLoader";
import {authMe, getUser, logout, setShowExitModal} from "../../store/infoUserSlice";
import {useCookies} from "react-cookie";
import DetailsNews from "../news/DetailsNews";
import style from './User.module.css'
import Button from "../../components/Button";
import ChooseTheme from "./ChooseTheme/ChooseTheme";
import Wallet from "./Wallet/Wallet";
import Promotions from "./promotions/promotions";
import BallsMenu from "./BallsMenu/BallsMenu";


const User = () => {
    let isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    let isInitialized = useSelector<RootState, boolean>(state => state.infoUser.isInitialized as boolean)
    const navigate = useNavigate()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const isOnline = navigator.onLine
    const dispatch = useAppDispatch()
    const showExitModal = useSelector<RootState, boolean>(state => state.infoUser.showExitModal)
    let [cookies] = useCookies()
    let promptEvent = useSelector<RootState, Event | undefined>(state => state.infoUser.prompt)
    const path = useLocation().pathname
    let backGround=''
    const ref=useRef<HTMLDivElement>(null)
    const showCode = useSelector<RootState, boolean>(state => state.infoUser.showCode)
    useEffect(() => {
        if (isOnline && !isLogin && isInitialized) {
            navigate('/')
        }
    }, [isInitialized, isLogin])

    useEffect(() => {
        if (!isOnline) {
            isLogin = true
            isInitialized = true
        }
    }, [isOnline])

    useEffect(() => {
        dispatch(authMe(cookies.accessToken))
        dispatch(getUser(cookies.accessToken))
        setTimeout(() => {
            // @ts-ignore
            promptEvent?.prompt()
        }, 1000)
    }, [])

    if(path.includes('wallet')){
        backGround='#c28f33'
    }

    useEffect(()=>{
        if(!showCode){
            path.includes('wallet') && ref.current?.scrollTo({top:230})
        }else {
            ref.current?.scrollTo({top:0,behavior:'smooth'})
        }
    })

    return (
        isLoading ? <PreLoader loading={isLoading}/> :
            isLogin && isInitialized ?
                <div className={style.wrapper} ref={ref} style={{backgroundColor:`${backGround}`}}>
                    <div className={style.user_wrapper}>
                        {isLoading ? <PreLoader loading={isLoading}/> :
                            <Routes>
                                <Route path={'info'} element={<InfoUser/>}/>
                                <Route path={'accumulation'} element={<Accumulation/>}/>
                                <Route path={'qr_code'} element={<QRCode/>}/>
                                <Route path={'news'} element={<DetailsNews/>}/>
                                <Route path={'change_theme'} element={<ChooseTheme/>}/>
                                <Route path={'wallet'} element={<Wallet/>}/>
                                <Route path={'promotions'} element={<Promotions/>}/>
                                <Route path={'balls_menu'} element={<BallsMenu/>}/>
                            </Routes>}
                    </div>
                    {path.includes('user') && <Footer/>}
                </div>
                : <div></div>)
}

export default User

const ExitModal = () => {
    const dispatch = useAppDispatch()
    const confirmExit = () => {
        dispatch(setShowExitModal(false))
        dispatch(logout())
    }

    const click = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.stopPropagation()
    }

    return (
        <div style={{position: 'absolute', top: '50%', width: '100%', display: "flex", justifyContent: 'center'}}
             onClick={(event) => click(event)}>
            <div style={{background: 'white', width: 'fit-content'}}>
                <div>Выйти из приложения?</div>
                <div>
                    <Button onClick={confirmExit} text={'Да'}></Button>
                    <Button onClick={() => dispatch(setShowExitModal(false))} text={'Нет'}></Button>
                </div>
            </div>
        </div>

    )
}