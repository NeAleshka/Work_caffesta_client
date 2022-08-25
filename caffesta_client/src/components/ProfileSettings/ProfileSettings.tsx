import React from 'react';
import {useNavigate} from "react-router-dom";
import {logout, setShowProfileSettings} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import style from './ProfileSettings.module.css'
import {useSelector} from "react-redux";



const ProfileSettings = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const showProfileSettings=useSelector<RootState,boolean>(state => state.infoUser.showProfileSettings)

    const infoUserClick=(event:React.MouseEvent<HTMLDivElement>)=>{
        event.stopPropagation()
        dispatch(setShowProfileSettings(false))
        navigate('/user/info')
    }

    return (
        <div style={!showProfileSettings?{display:'none'}:{}} className={style.settings}>
            <div className={style.settings_item} onClick={(event)=>{infoUserClick(event)}}>Личные данные</div>
            <div className={style.settings_item}>Тема</div>
            <div className={style.settings_item} onClick={() => dispatch(logout())}>Выход</div>
        </div>
    );
};

export default ProfileSettings;