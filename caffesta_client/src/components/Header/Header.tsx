import styles from "./LayOut.module.css";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import React, {CSSProperties} from "react";
import {useNavigate} from "react-router-dom";
import user from '../../images/profile.svg'
import feed from '../../images/notification.svg'
import {setShowMenu} from "../../store/infoUserSlice";

interface IHeaderThemeStyle{
    themeStyle:CSSProperties
}

const Header = ({themeStyle}:IHeaderThemeStyle) => {
    const isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const showMenu=useSelector<RootState,boolean>(state => state.infoUser.showMenu)

    return (
        <div className={styles.flexCol}>
            <header className={styles.header} style={themeStyle}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        {isLogin && <img src={user} alt="logo" onClick={()=>dispatch(setShowMenu(!showMenu))}/>}
                        <div className={styles.logoTitle}
                           onClick={()=> navigate(`${isLogin ? '/user/qr_code' : '/'}`) }>{`${localStorage.getItem('organizationName') ? localStorage.getItem('organizationName') : 'Caffesta'}`}</div>
                        {isLogin && <img src={feed}/>}
                    </div>

                </div>
            </header>
        </div>
    )
}

export default Header
