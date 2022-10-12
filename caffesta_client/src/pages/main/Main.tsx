import styles from './main.module.css'
import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {setIsLoading} from "../../store/infoUserSlice";

const Main=()=>{
    const isLogin=useSelector<RootState,boolean>(state => state.infoUser.isLogin as boolean)
    const navigate=useNavigate()
    const dispatch=useAppDispatch()

    if(isLogin){
        navigate('/user/qr_code')
    }

    const onClick = (goTo:string) => {
        dispatch(setIsLoading(true))
        navigate(goTo,{replace:true})
    }

    return(
        <div className={styles.flexCol}>
            <main>
                <div className={styles.container}>
                    <section className={styles.sec_login}>
                        <div className="form">
                            <form className={styles.form__body} >
                                <button className={styles.type1} onClick={()=>onClick("/sing_up")}>
                                    <div className={styles.button_text}
                                    >Зарегистрироваться</div>
                                </button>
                            </form>
                            <form className={styles.form__body} >
                                <button className={`${styles.type1} ${styles.type2}`} onClick={()=>onClick('/sing_in')}>
                                    <div className={styles.button_text} >Уже клиент заведения?</div>
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </main>
            <Outlet/>
        </div>
    )
}

export default Main
