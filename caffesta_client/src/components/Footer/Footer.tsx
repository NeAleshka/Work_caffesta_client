import style from './footer.module.css'
import container from '../LayOut/LayOut.module.css'
import profile from '../../images/footer_icons/profile.svg'
import code from '../../images/footer_icons/qr.svg'
import gift from '../../images/footer_icons/gift.svg'
import {useLocation, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store";
import {setShowChooseTheme, setShowProfileSettings} from "../../store/infoUserSlice";
import {useSelector} from "react-redux";
import React from "react";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import ChooseTheme from "../ChooseTheme/ChooseTheme";


const Footer = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const path=useLocation().pathname
    console.log('path',path)
    const showProfileSetting=useSelector<RootState,boolean>(state => state.infoUser.showProfileSettings)
    const showProfileSettings=useSelector<RootState,boolean>(state => state.infoUser.showProfileSettings)
    const showChooseTheme=useSelector<RootState,boolean>(state => state.infoUser.showChooseTheme)

    const profileClick=(event:React.MouseEvent<HTMLDivElement>)=>{
        event.stopPropagation()
        dispatch(setShowChooseTheme(false))
        dispatch(setShowProfileSettings(!showProfileSetting))
    }

    return(
        <div>
            <div className={style.profile_settings_wrapper} >
                {showProfileSettings && <ProfileSettings/>}
                {showChooseTheme && <ChooseTheme/>}
            </div>
            <div className={style.footer}>
                <div className={`${container.container} ${style.flex}`}>
                    <div className={style.wrapper}>
                        <div className={style.item} onClick={(event)=>profileClick(event)}>
                            <img src={profile} alt={"profile"}/>
                            <div className={style.text}>Профиль</div>
                        </div>
                        <div className={style.item} onClick={()=>navigate('/user/qr_code')}>
                            <img className={style.icon} src={code} alt={"QR"}/>
                            <div className={style.text}>Мой QR</div>
                        </div>
                        <div className={style.item} onClick={()=>navigate('/user/accumulation')}>
                            <img className={style.icon} src={gift} alt={"gift"}/>
                            <div className={style.text}>Накопления</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


  )
}
export default Footer
