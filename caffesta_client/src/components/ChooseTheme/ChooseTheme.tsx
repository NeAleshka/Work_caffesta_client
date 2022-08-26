import React from 'react';
import wrapperStyle from '../ProfileSettings/ProfileSettings.module.css'
import {useAppDispatch} from "../../store";
import {setThemeType} from "../../store/infoUserSlice";

const ChooseTheme = () => {
    const dispatch=useAppDispatch()


    return (
        <div className={wrapperStyle.settings}>
            <div className={wrapperStyle.settings_item} onClick={()=>{dispatch(setThemeType(1))}}>default</div>
            <div className={wrapperStyle.settings_item} onClick={(event)=>{dispatch(setThemeType(2))}}>light</div>
            <div className={wrapperStyle.settings_item} style={{color:"black"}} onClick={()=>{dispatch(setThemeType(3))}}>dark</div>
        </div>
    );
};

export default ChooseTheme;