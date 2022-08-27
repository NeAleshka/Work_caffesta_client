import style from './sendMessage.module.css'
import container from '../../components/Header/LayOut.module.css'
import otherStyle from '../sing_up/singUp.module.css'
import {useFormik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useLayoutEffect} from "react";
import {RootState, useAppDispatch} from "../../store";
import {sendVerificationCode, setIsLoading} from "../../store/infoUserSlice";
import {useSelector} from "react-redux";
import PreLoader from "../../components/PreLoader";

type FormikError = {
    email?: string
}

type locationStateType = {
    email: string
    login: string
}

const SendMessage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const stateLocation = useLocation().state as locationStateType
    const isVerification=useSelector<RootState,boolean>(state => state.infoUser.isVerification as boolean)
    const isLoading=useSelector<RootState,boolean>(state => state.infoUser.isLoading as boolean)

    const formik = useFormik({
        initialValues: {
            email: stateLocation?.email
        },
        validate: (values) => {
            const errors: FormikError = {}
            if (values.email.length) {
                if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Неверный формат'
                }
            }
            return errors
        },
        onSubmit: () => {
            dispatch(sendVerificationCode({email:formik.values.email}))
        }
    })
    const checkInputs = () => {
        return (!!Object.keys(formik.errors).length || !formik.getFieldProps('email').value)
    }

    useEffect(()=>{
        if(isVerification){
            navigate('/confirm_email', {state: {sendingEmail: formik.values.email, login: stateLocation.login}})
        }
    },[isVerification])

    console.log('sendMessage ', isLoading);

    return (
        <div className={container.container}>
            {isLoading ? <PreLoader loading={isLoading}/>:
                <section className={style.sec_conf_1}>
                    <div className={otherStyle.description}>Для входа нужно указать <span
                        className={style.nowrap}>E-mail,</span> <span
                        className={style.nowrap}>с которого</span> была регистрация <span
                        className={style.nowrap}>и ввести</span> полученный код
                    </div>
                    <div className="form">
                        <form className={otherStyle.form_body} onSubmit={formik.handleSubmit}>
                            <div className={otherStyle.form__item}>
                                <label className={style.label}>Введите Ваш E-mail</label>
                                <input className={style.valid}
                                       placeholder="example@company.com"
                                       {...formik.getFieldProps('email')}/>
                            </div>
                            {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                            <button
                                className={`${otherStyle.submitButton} ${style.send_button} ${checkInputs() ? otherStyle.submitButtonError : ""}`}
                                type="submit"
                                disabled={checkInputs()}>Получить код
                            </button>
                            {!isVerification}
                        </form>
                    </div>
                </section>
            }
        </div>
    )
}
export default SendMessage
