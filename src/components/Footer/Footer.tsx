import style from './footer.module.css'
import container from '../Header/LayOut.module.css'
import wallet from '../../images/footer_icons/wallet.svg'
import home from '../../images/footer_icons/home.svg'
import home_white from '../../images/footer_icons/home_white.svg'
import gift from '../../images/footer_icons/gift.svg'
import {useLocation, useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import React, {CSSProperties, useEffect, useState} from "react";
import ProfileSettings from "../ProfileSettings/ProfileSettings";
import ChooseTheme from "../../pages/user/ChooseTheme/ChooseTheme";
import {setShowCode, setShowProfileSettings} from "../../store/infoUserSlice";
import {IBonuses} from "../../interfaces";

const Footer = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const path = useLocation().pathname
    const showProfileSetting = useSelector<RootState, boolean>(state => state.infoUser.showProfileSettings)
    const showChooseTheme = useSelector<RootState, boolean>(state => state.infoUser.showChooseTheme)
    const currentTheme = useSelector<RootState, CSSProperties>(state => state.infoUser.currentTheme?.footer as CSSProperties)
    // const activeStyle=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.activeText as CSSProperties)
    const bonuses = useSelector<RootState, IBonuses>(state => state.infoUser.info?.bonuses as IBonuses)
    const isHomePage=path.includes('qr_code')
    const profileClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        dispatch(setShowProfileSettings(true))
        navigate('/user/info')
    }

    const onclick = (to: string) => {
        dispatch(setShowProfileSettings(false))
        navigate(to)
    }

    const clickHomeBtn = () => {
        if(isHomePage){
            document.getElementById('user_page')?.scrollTo({top:0,behavior:'smooth'})
        }else {
            navigate('/user/qr_code')
        }
    }

    return (
        <div>
            {/* <div className={style.profile_settings_wrapper} >
                {showProfileSetting  && <ProfileSettings/>}
                {showChooseTheme && <ChooseTheme/>}
            </div>*/}
            <div className={style.footer} style={currentTheme}>
                <div className={`${style.item} ${style.wallet_wrapper}`}
                     onClick={(event) => onclick('/user/wallet')}>
                    <img className={style.wallet_img} src={wallet} alt={"wallet"}/>
                    <div className={style.wallet_info}>
                        <div style={{lineHeight:'17px'}} className={style.text}>МОЙ КОШЕЛЁК</div>
                        <div className={style.text}>{bonuses.bonus}</div>
                    </div>
                </div>
                <div className={`${container.container} ${style.flex}`}>
                    <div className={style.wrapper}>
                        <div className={style.item} onClick={clickHomeBtn}>
                            <img className={style.icon} src={isHomePage? home:home_white} alt={"QR"}/>
                        </div>
                        <div className={style.item} onClick={() => onclick('/user/accumulation')}>
                            <div className={style.text}>БЛЮДА ЗА БАЛЛЫ</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer
