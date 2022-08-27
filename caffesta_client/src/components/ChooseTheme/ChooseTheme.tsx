import React from 'react';
import wrapperStyle from '../ProfileSettings/ProfileSettings.module.css'
import {useAppDispatch} from "../../store";
import {setThemeType} from "../../store/infoUserSlice";

const ChooseTheme = () => {
    const dispatch=useAppDispatch()
    const onClick=(event:React.MouseEvent<HTMLDivElement>,type:number)=>{
        event.preventDefault()
        event.stopPropagation()
        dispatch(setThemeType(type))
    }

    return (
        <div className={wrapperStyle.settings}>
            <div className={wrapperStyle.settings_item} onClick={(event)=>{onClick(event,1)}}>default</div>
            <div className={wrapperStyle.settings_item} onClick={(event)=>{onClick(event,2)}}>light</div>
            <div className={wrapperStyle.settings_item} style={{color:"black"}} onClick={(event)=>{onClick(event,3)}}>dark</div>
        </div>
    );
};

export default ChooseTheme;