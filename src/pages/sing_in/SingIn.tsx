import {useFormik} from "formik";
import styles from '../sing_up/singUp.module.css'
import mainStyles from '../../components/Header/LayOut.module.css'
import belarus from "../../images/belarus.png";
import russia from "../../images/russia.png";
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import {login, setIsLoading} from "../../store/infoUserSlice";
import {ChangeEvent, useEffect, useLayoutEffect, useState} from "react";
import PreLoader from "../../components/PreLoader";


type FormikErrorType = {
    phone?: string
    password?: string
}


const SingIn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const requestMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    const isVerification = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const [phonePrefix, setPhonePrefix] = useState('+375')
    const [countryIcon,setCountryIcon]=useState(belarus)
    const formik = useFormik({
        initialValues: {
            phone: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.phone) {
                errors.phone = "Обязательное поле"
            } else if (values.phone.length < 9) {
                errors.phone = 'Минимальная длина 9 символа'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(login({login: values.phone, password: values.password}))
        }
    })
    const checkInputs = () => {
        return (!!Object.keys(formik.errors).length || !formik.getFieldProps('phone').value)
    }

    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    }, [])

    /*useEffect(() => {
        if (isVerification) {
            navigate('/user/qr_code', {state: formik.values.phone})
        }
    }, [isVerification])*/

    navigate('/user/qr_code', {state: formik.values.phone})

    const changeCountry = (event: ChangeEvent<HTMLSelectElement>) => {
        switch (event.currentTarget.value) {
            case'Беларусь': {
                setPhonePrefix('+375')
                setCountryIcon(belarus)
            }
                break;
            case 'Россия': {
                setPhonePrefix('+7')
                setCountryIcon(russia)
            }
                break;
            default: {
                setPhonePrefix('+375')
                setCountryIcon(belarus)
            }
        }
    }


    return (
        <div className={`${mainStyles.wrapper} ${mainStyles.flexCol}`}>
            {isLoading ? <PreLoader loading={isLoading}/> :
                <main>
                    <div className={mainStyles.container}>
                        <section className={styles.secRegister}>
                            <div className={styles.description}>Ваш телефон
                            </div>
                            <div className="form">
                                <form className={styles.form_body} onSubmit={formik.handleSubmit}>
                                    <div className={styles.form__item}>
                                        <div style={{color: 'white'}} className={styles.phone_prefix}>{phonePrefix} </div>
                                        <input maxLength={9} className={styles.input_data} type="text"
                                               {...formik.getFieldProps('phone')}
                                        />

                                    </div>

                                    <hr color={'grey'} style={{width: '100%'}}/>
                                    {formik.touched.phone && formik.errors.phone &&
                                        <div className={styles.formik_errors}>{formik.errors.phone}</div>}
                                    <div className={styles.change_country}>
                                        <img style={{width:'25px'}} src={countryIcon} alt={''}/>
                                        <select onChange={(event) => changeCountry(event)}
                                                className={`${styles.country}`}>
                                            <option>
                                                Беларусь
                                            </option>
                                            <option>Россия</option>
                                        </select>
                                    </div>

                                    {/*<div className={styles.form__item}>
                                        <input className={styles.input_data} type="password"
                                               placeholder="Пароль"
                                               {...formik.getFieldProps('password')}
                                        />
                                        <div className={styles.input_icons}>
                                            <img src={user} alt={'pass'}/>
                                        </div>
                                        {formik.touched.password && formik.errors.phone &&
                                            <div className={styles.formik_errors}>{formik.errors.password}</div>}
                                    </div>*/}
                                    <button style={{maxWidth:'100%',fontSize:'17px',height:'42px',marginTop:'100px'}}
                                        className={`${styles.submitButton} ${checkInputs() ? styles.submitButtonError : ''}`
                                        } onClick={()=>navigate('/confirm_phone',{state:{phone:`${phonePrefix}${formik.values.phone}`}})} disabled={checkInputs()}
                                    >ВХОД
                                    </button>
                                    {<div>{requestMessage}</div>}
                                </form>
                            </div>
                        </section>
                    </div>
                </main>
            }
        </div>
    )
}

export default SingIn
