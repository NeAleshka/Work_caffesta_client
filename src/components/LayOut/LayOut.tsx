import styles from "./LayOut.module.css";
import logo from "../../images/logo.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

const LayOut=()=>{
    const isLogin=useSelector<RootState,boolean>(state => state.infoUser.isLogin)


    return(
        <div className={styles.flexCol}>
            <header className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.logo}><img src={`${localStorage.getItem('logo') ? localStorage.getItem('logo') : logo}`} alt="logo"/>
                        <a className={styles.logoTitle} href={ `${isLogin?'#/user/qr_code':'#/'}` }>{`${localStorage.getItem('organizationName') ? localStorage.getItem('organizationName') : 'Caffesta'}`}</a></div>
                </div>
            </header>
        </div>
    )
}

export default LayOut
