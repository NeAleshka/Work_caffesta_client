import React from 'react';
import wrapperStyle from '../../../components/ProfileSettings/ProfileSettings.module.css'
import style from './chooseTheme.module.css'
import {useAppDispatch} from "../../../store";
import {setShowExitModal, setThemeType} from "../../../store/infoUserSlice";

const ChooseTheme = () => {
    const dispatch=useAppDispatch()
    const onClick=(event:React.MouseEvent<HTMLDivElement>,type:number)=>{
        event.preventDefault()
        event.stopPropagation()
        dispatch(setThemeType(type))
    }

    return (
        <div className={ style.wrapper} onClick={(event)=>dispatch(setShowExitModal(false))}>
            <div className={style.item} onClick={(event)=>{onClick(event,1)}}>1</div>
            <div className={style.item} onClick={(event)=>{onClick(event,2)}}>2</div>
            <div className={style.item} style={{color:"black"}} onClick={(event)=>{onClick(event,3)}}>3</div>
        </div>
    );
};

export default ChooseTheme;