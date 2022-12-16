import React, {useEffect, useLayoutEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import mainStyles from "../../components/Header/LayOut.module.css";
import PreLoader from "../../components/PreLoader";
import styles from "../sing_up/singUp.module.css";
import pageStyle from './confirmPhone.module.css'
import {useFormik} from "formik";
import {login, setIsLoading} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";

type locationType = {
    phone: string
}

type FormikErrorType = {
    code?: string
}

//Todo:добавить функцию повторной отправки кода

const ConfirmPhone = () => {
    const location = useLocation().state as locationType
    const dispatch = useAppDispatch()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const isVerification = useSelector<RootState, boolean>(state => state.infoUser.isVerification as boolean)
    const requestMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.code) {
                errors.code = "Введите код"
            }
            return errors
        },
        onSubmit: values => {
            //dispatch(login({login: values.phone, password: values.password}))
        }
    })
    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    }, [])

    useEffect(() => {
        if (formik.values.code.length === 4) {
            dispatch(setIsLoading(true))
            dispatch(login({login: 'test', password: '1111'}))
        }
    }, [formik.values.code.length])

    useEffect(() => {
        if (isVerification) {
            navigate('/user/qr_code')
        }
    }, [isVerification])

    return (
        <div className={`${mainStyles.wrapper} ${mainStyles.flexCol}`}>
            <main>
                <div className={mainStyles.container}>
                    <section className={styles.secRegister}>
                        <div style={{lineHeight: '20px', marginBottom: '30px'}} className={styles.description}>4
                            последние цифры номера телефона или код подтверждения из SMS
                        </div>
                        <div className="form">
                            <form className={styles.form_body} onSubmit={formik.handleSubmit}>
                                <div className={styles.form__item}>
                                    <input maxLength={4} className={styles.input_data} type="text"
                                           {...formik.getFieldProps('code')}
                                    />
                                </div>

                                <hr color={'grey'} style={{width: '100%'}}/>
                                {formik.touched.code && formik.errors.code &&
                                    <div className={styles.formik_errors}>{formik.errors.code}</div>}
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
                                <div className={styles.description} style={{marginTop: '10px', color: 'gray'}}>
                                    Сейчас вам поступит автоматический звонок или SMS с кодом на номер <span
                                    style={{fontWeight: '700', color: 'white'}}>{location?.phone}</span>
                                </div>

                                {
                                    isLoading ? <PreLoader size={20} color={'orange'} cssOverride={{marginTop:'0'}} loading={isLoading}/> :
                                        <button
                                        className={`${styles.submitButton} ${pageStyle.repeat_sms}`
                                        } onClick={() => navigate('/confirm_phone')}
                                        disabled={formik.values.code.length < 4}
                                    >ОТПРАВИТЬ SMS ЕЩЁ РАЗ
                                    </button>
                                }
                                {<div>{requestMessage}</div>}
                            </form>
                        </div>
                    </section>
                </div>
            </main>

        </div>
    );
};

export default ConfirmPhone;