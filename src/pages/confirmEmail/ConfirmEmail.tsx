import style from '../send_message/sendMessage.module.css'
import container from '../../components/Header/LayOut.module.css'
import otherStyle from '../sing_up/singUp.module.css'
import {useFormik} from "formik";
import {useLocation, useNavigate} from "react-router-dom";
import {verificationUser} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import {useSelector} from "react-redux";
import PreLoader from "../../components/PreLoader";

type FormikError = {
    email?: string
}

interface CustomizedState {
    sendingEmail: string
    login: string
}

const SendMessage = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const locationState = location.state as CustomizedState
    const {sendingEmail: userEmail} = locationState;
    const isLoading=useSelector<RootState,boolean>(state => state.infoUser.isLoading as boolean)
    const isLogin = useSelector<RootState, boolean>(state => state.infoUser.isLogin as boolean)
    const requestMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikError = {}
            if (values.email.length) {
                errors.email = 'Обязательное поле'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(verificationUser(values.email))
        }
    })

    const checkInputs = () => {
        return (!!Object.keys(formik.errors).length || !formik.getFieldProps('email').value)
    }


    if (isLogin) {
        navigate('/user/qr_code', {state: locationState.login})
    }


    return (
        <div className={container.container}>
            {isLoading? <PreLoader loading={isLoading}/> :
                <section className={style.sec_conf_1}>
                <div className={otherStyle.description}>На почтовый ящик: <span
                    className={style.nowrap}>"{userEmail}",</span> <span
                    className={style.nowrap}>был отправлен код</span> для подтверждения регистрации
                </div>

                <div>
                    <form className={otherStyle.form_body} onSubmit={formik.handleSubmit}>
                        <div className={otherStyle.form__item}>
                            <label className={style.label}>Введите полученный код</label>
                            <input className={style.valid}
                                   placeholder="0000000"
                                   type={'number'}
                                   {...formik.getFieldProps('email')}/>
                        </div>
                        {formik.touched.email && formik.errors.email && <div>{formik.errors.email}</div>}
                        <button
                            className={`${otherStyle.submitButton} ${style.send_button} ${checkInputs() ? otherStyle.submitButtonError : ""}`}
                            type="submit"
                            disabled={checkInputs()}
                        >Войти в аккаунт
                        </button>
                        {!isLogin && <div>{requestMessage}</div>}
                    </form>
                </div>
            </section>}
        </div>
    )
}
export default SendMessage
