import styles from "./LayOut.module.css";
import logo from "../../images/logo.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {CSSProperties} from "react";
import {useNavigate} from "react-router-dom";

interface IHeaderThemeStyle{
    themeStyle:CSSProperties
}

const Header = ({themeStyle}:IHeaderThemeStyle) => {
    const isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    const navigate=useNavigate()

    return (
        <div className={styles.flexCol}>
            <header className={styles.header} style={themeStyle}>
                <div className={styles.container}>
                    <div className={styles.logo}><img src={isLogin ? localStorage.getItem('logo') : logo} alt="logo"/>
                        <div className={styles.logoTitle}
                           onClick={()=> navigate(`${isLogin ? '/user/qr_code' : '/'}`) }>{`${localStorage.getItem('organizationName') ? localStorage.getItem('organizationName') : 'Caffesta'}`}</div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
