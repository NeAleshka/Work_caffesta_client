import React from 'react';
import wrapperStyle from '../ProfileSettings/ProfileSettings.module.css'
import {useAppDispatch} from "../../store";
import {setThemeType} from "../../store/infoUserSlice";

const ChooseTheme = () => {
    const dispatch=useAppDispatch()
    const clickLight=(event:React.MouseEvent<HTMLDivElement>)=>{
        event.preventDefault()
        event.stopPropagation()
        dispatch(setThemeType(1))
    }



    return (
        <div className={wrapperStyle.settings}>
            <div className={wrapperStyle.settings_item} onClick={()=>{dispatch(setThemeType(0))}}>default</div>
            <div className={wrapperStyle.settings_item} onClick={(event)=>{clickLight(event)}}>light</div>
            <div className={wrapperStyle.settings_item} style={{color:"black"}} onClick={()=>{dispatch(setThemeType(2))}}>dark</div>
        </div>
    );
};

export default ChooseTheme;