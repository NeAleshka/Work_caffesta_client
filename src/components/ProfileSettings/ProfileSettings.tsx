import React, {CSSProperties} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {setShowChooseTheme, setShowExitModal, setShowProfileSettings} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import style from './ProfileSettings.module.css'
import {useSelector} from "react-redux";


const ProfileSettings = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const {pathname}=useLocation()
    const showProfileSettings = useSelector<RootState, boolean>(state => state.infoUser.showProfileSettings)
    const showExitModal=useSelector<RootState,boolean>(state => state.infoUser.showExitModal)

    const infoUserClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        dispatch(setShowExitModal(false))
        navigate('/user/info')
    }

    const themeClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        dispatch(setShowExitModal(false))
        navigate('/user/change_theme')
    }

    const exitClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
        dispatch(setShowExitModal(true))
    }

    const setActive=(active:string):CSSProperties=>{
        if(pathname.includes(active) &&!showExitModal){
            return{color:'grey'}
        }else return  {}
    }

    return (
        <div style={!showProfileSettings ? {display: 'none'} : {}} className={style.settings}>
            <div style={setActive("info")} className={style.settings_item}  onClick={(event) => {
                infoUserClick(event)
            }}>Личные данные
            </div>
            <div  style={setActive("change_theme")} className={style.settings_item} onClick={(event) => {
                themeClick(event)
            }}>Тема
            </div>
            <div className={style.settings_item} onClick={(event) => exitClick(event)}>Выход</div>
        </div>
    );
};

export default ProfileSettings;

