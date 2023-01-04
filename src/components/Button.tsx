import React, {ButtonHTMLAttributes, CSSProperties, DetailedHTMLProps} from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../store";
import button from "./Button";
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type IButtonProps=DefaultButtonPropsType& {
    text:string
}


const Button = ({text,...restProps}: IButtonProps) => {
    const theme=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.button as CSSProperties)
    return (
        <button className={restProps.className} style={theme} onClick={restProps.onClick}>
            {text}
        </button>
    );
};

export default Button;