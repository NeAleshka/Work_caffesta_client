import styles from "./LayOut.module.css";
import logo from "../../images/logo.svg";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {CSSProperties, useEffect, useState} from "react";
import {theme1, theme2} from "../../themes";

const LayOut=()=>{
    const isLogin=useSelector<RootState,boolean>(state => state.infoUser.isLogin as boolean)
    let themeType=useSelector<RootState,number>(state => state.infoUser.themeType)
    let [themeProperties,setThemeProperties]=useState<CSSProperties>({})

    useEffect(()=>{
        if(themeType){
            switch (themeType){
                case 1:{
                    setThemeProperties(theme1)
                    break;
                }
                case 2:{
                    setThemeProperties(theme2)
                    break;
                }
                default: themeProperties={}
            }

        }
    },[])

    console.log('themeType', themeType)
    console.log("themeProperties", themeProperties)

    return(
        <div className={styles.flexCol}>
            <header className={styles.header} style={themeProperties}>
                <div className={styles.container}>
                    <div className={styles.logo}><img src={isLogin ? localStorage.getItem('logo') : logo} alt="logo"/>
                        <a className={styles.logoTitle} href={ `${isLogin?'#/user/qr_code':'#/'}` }>{`${localStorage.getItem('organizationName') ? localStorage.getItem('organizationName') : 'Caffesta'}`}</a></div>
                </div>
            </header>
        </div>
    )
}

export default LayOut
