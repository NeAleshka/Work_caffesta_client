import style from './footer.module.css'
import container from '../Header/LayOut.module.css'
import wallet from '../../images/footer_icons/wallet.svg'
import home from '../../images/footer_icons/home.svg'
import gift from '../../images/footer_icons/gift.svg'
import {useLocation, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import React, {CSSProperties, useEffect, useState} from "react";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import ChooseTheme from "../../pages/user/ChooseTheme/ChooseTheme";
import {setShowProfileSettings} from "../../store/infoUserSlice";
import {IBonuses} from "../../interfaces";

const Footer = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const path=useLocation().pathname
    const showProfileSetting=useSelector<RootState,boolean>(state => state.infoUser.showProfileSettings)
    const showChooseTheme=useSelector<RootState,boolean>(state => state.infoUser.showChooseTheme)
    const currentTheme=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.footer as CSSProperties)
    const activeStyle=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.activeText as CSSProperties)
    const [isProfileActive,setIsProfileActive]=useState<boolean>(false)
    const bonuses=useSelector<RootState,IBonuses>(state => state.infoUser.info?.bonuses as IBonuses)

    const profileClick=(event:React.MouseEvent<HTMLDivElement>)=>{
        event.stopPropagation()
        dispatch(setShowProfileSettings(true))
        setIsProfileActive(true)
        navigate('/user/info')
    }

   useEffect(()=>{
       if(path.includes('info') || path.includes('change_theme')|| showProfileSetting){
           setIsProfileActive(true)
       } else setIsProfileActive(false)
   },[isProfileActive])

    const onclick=(to:string)=>{
        dispatch(setShowProfileSettings(false))
        setIsProfileActive(false)
        navigate(to)
    }
    return(
        <div>
            <div className={style.profile_settings_wrapper} >
                {showProfileSetting  && <ProfileSettings/>}
                {showChooseTheme && <ChooseTheme/>}
            </div>
            <div className={style.footer} style={currentTheme}>
                <div className={`${container.container} ${style.flex}`}>
                    <div className={style.wrapper}>
                        <div className={`${style.item} ${style.wallet_wrapper}`} onClick={(event)=>profileClick(event)}>
                                <img src={wallet} alt={"wallet"}/>
                                <div className={style.wallet_info}>
                                    <div style={isProfileActive? activeStyle:{}}  className={style.text}>МОЙ КОШЕЛЁК</div>
                                    <div className={style.text}>{bonuses.bonus}</div>
                                </div>
                            </div>
                        <div className={style.item} onClick={()=>onclick('/user/qr_code')}>
                                <img className={style.icon} src={home} alt={"QR"}/>
                            </div>
                        <div className={style.item}  onClick={()=>onclick('/user/accumulation')}>
                                    <div style={path.includes('accumulation')?activeStyle:{}} className={style.text}>БЛЮДА ЗА БАЛЛЫ</div>
                                </div>
                    </div>
                </div>
            </div>
        </div>


  )
}
export default Footer
