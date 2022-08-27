import styles from '../sing_up/singUp.module.css'
import mainStyles from '../../components/Header/LayOut.module.css'
import phone from '../../images/input_icons/Phone.svg'
import email from '../../images/input_icons/email.svg'
import user from '../../images/input_icons/user.svg'
import calendar from '../../images/input_icons/Calendar.svg'
import {useFormik} from "formik";
import {useNavigate} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLayoutEffect, useState} from "react";
import {useSelector} from "react-redux";
import {registrationUser, setIsLoading} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import PreLoader from "../../components/PreLoader";

export type FormikErrorType = {
    phone?: string
    email?: string
    name?: string
    lastName?: string
    birthday?: any
    login?: any
    password?: any
}


const SingUp = () => {
    const [startDate, setStartDate] = useState(new Date())
    const requestMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    let isSuccessRequest = useSelector<RootState, boolean>(state => state.infoUser.isSuccessRequest as boolean)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoading=useSelector<RootState,boolean>(state => state.infoUser.isLoading as boolean)
    const formik = useFormik({
        initialValues: {
            phone: '',
            email: '',
            name: '',
            lastName: '',
            birthday: '',
            login: '',
            password: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.name) {
                errors.name = "Обязательное поле"
            } else if (values.name.length < 2) {
                errors.name = 'Минимальная длина 2 символа'
            }
            if (!values.login) {
                errors.login = "Обязательное поле"
            } else if (values.login.length < 4) {
                errors.login = 'Минимальная длина 4 символа'
            }
            if (!values.password) {
                errors.password = "Обязательное поле"
            } else if (values.password.length < 2) {
                errors.password = 'Минимальная длина 4 символа'
            }
            if (values.email.length) {
                if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Неверный формат'
                }
            }

            if (!values.phone) {
                errors.phone = 'Обязательное поле'
            }
            return errors
        },
        onSubmit: () => {
            onSubmitClick()
            formik.setTouched({phone: false, login: false, name: false, password: false})
        }
    })

    const validTouched = formik.touched.phone || formik.touched.name || formik.touched.password || formik.touched.login

    const validDate = (date: Date) => {
        let day: string | number = date.getUTCDate()
        let month: string | number = date.getUTCMonth() + 1
        if (day <= 9) {
            day = `0${day}`
        }
        if (month <= 9) {
            month = `0${month}`
        }
        return `${day}.${month}.${date.getUTCFullYear()}`
    }
    const onSubmitClick = () => {
        dispatch(registrationUser(formik.values))
    }

    useLayoutEffect(()=>{
        dispatch(setIsLoading(false))
    },[])

    useLayoutEffect(() => {
        if (isSuccessRequest) {
            navigate('/send_message',{state: {email:formik.values.email,login:formik.values.login}})
        }
    }, [isSuccessRequest])

    return (
        <div className={`${mainStyles.wrapper} ${mainStyles.flexCol}`}>
            {isLoading ? <PreLoader loading={isLoading}/>:
                <main>
                    <div className={mainStyles.container}>
                        <div className={styles.secRegister}>
                            <div className={styles.description}>Введите Ваши данные<br/>для регистрации</div>
                            <div className="form">
                                <form className={styles.form_body} onSubmit={formik.handleSubmit}>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data} type="text"
                                               placeholder="Логин"
                                               {...formik.getFieldProps('login')}
                                        />
                                        <div className={styles.input_icons}>
                                            <img src={user} alt={'login'}/>
                                        </div>
                                        {formik.touched.login && formik.errors.login &&
                                            <div className={styles.formik_errors}>{formik.errors.login}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data} type="text"
                                               placeholder="Пароль"
                                               {...formik.getFieldProps('password')}
                                        />
                                        <div className={styles.input_icons}>
                                            <img src={user} alt={'pass'}/>
                                        </div>
                                        {formik.touched.password && formik.errors.password &&
                                            <div className={styles.formik_errors}>{formik.errors.password}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data} type="tel"
                                               placeholder="+375000000000"
                                               {...formik.getFieldProps('phone')}
                                        />
                                        <div className={styles.input_icons}>
                                            <img src={phone} alt={'phone'}/>
                                        </div>
                                        {formik.touched.phone && formik.errors.phone &&
                                            <div className={styles.formik_errors}>{formik.errors.phone}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data}
                                               type="email" {...formik.getFieldProps('email')}
                                               placeholder="example@company.com"/>
                                        <div className={styles.input_icons} style={{top: "15px"}}>
                                            <img src={email} alt={'email'}/>
                                        </div>
                                        {formik.touched.email && formik.errors.email &&
                                            <div className={styles.formik_errors}>{formik.errors.email}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data}
                                               type="text" {...formik.getFieldProps('name')}
                                               placeholder="Имя"/>
                                        <div className={styles.input_icons}>
                                            <img src={user} alt={'first name'}/>
                                        </div>
                                        {formik.touched.name && formik.errors.name &&
                                            <div className={styles.formik_errors}>{formik.errors.name}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <input className={styles.input_data}
                                               type="text" {...formik.getFieldProps('lastName')}
                                               placeholder="Фамилия"/>
                                        <div className={styles.input_icons}>
                                            <img src={user} alt={'last name'}/>
                                        </div>
                                        {formik.touched.lastName && formik.errors.lastName &&
                                            <div className={styles.formik_errors}>{formik.errors.lastName}</div>}
                                    </div>
                                    <div className={styles.form__item}>
                                        <DatePicker className={`${styles.input_data} ${styles.data_picker}`}
                                                    selected={startDate}
                                                    {...formik.getFieldProps('birthday')}
                                                    onChange={(date) => {
                                                        const correctDate = validDate(date as Date)
                                                        formik.setFieldValue('birthday', correctDate)
                                                        setStartDate(date as Date)
                                                    }}
                                                    placeholderText={'01.01.1999'}
                                        />
                                        <div className={styles.input_icons}>
                                            <img src={calendar} alt={'data'}/>
                                        </div>
                                        {formik.touched.birthday && formik.errors.birthday &&
                                            <div className={styles.formik_errors}>{formik.errors.birthday}</div>}
                                    </div>
                                    {!isSuccessRequest && <div>{requestMessage}</div>}
                                    <button
                                        className={`${styles.submitButton} ${(!formik.isValid || !validTouched)? styles.submitButtonError : ''}`
                                        } type="submit"
                                        disabled={!formik.isValid || !validTouched}
                                    >Продолжить
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            }
        </div>
    )
}

export default SingUp
