import React from 'react';
import wrapperStyle from '../ProfileSettings/ProfileSettings.module.css'
import style from './chooseTheme.module.css'

const ChooseTheme = () => {
    return (
        <div className={wrapperStyle.settings}>
            <div>light</div>
            <div>dark</div>
        </div>
    );
};

export default ChooseTheme;