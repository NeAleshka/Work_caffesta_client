import container from '../../../components/Header/LayOut.module.css'
import inputStyle from '../../sing_up/singUp.module.css'
import styles from '../../sing_up/singUp.module.css'
import infoStyle from './InfoUser.module.css'
import React from "react";
import {useSelector} from 'react-redux'
import {changeUserInfo, logout, setIsEdit} from "../../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../../store";
import {IUserDTO} from "../../../interfaces";
import {useFormik} from "formik";
import {FormikErrorType} from "../../sing_up/SingUp";
import {BounceLoader} from 'react-spinners'
import backArrow from '../../../images/back.svg'
import {useNavigate} from "react-router-dom";
import Button from "../../../components/Button";


const InfoUser = () => {
    let isEdit = useSelector<RootState, boolean>(state => state.infoUser.isEdit as boolean)
    const dataUser = useSelector<RootState, IUserDTO>(state => state.infoUser.info as IUserDTO)
    const dispatch = useAppDispatch()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const navigate = useNavigate()
    const requestMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    const birthday=dataUser.birthday.split('.')


    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            phone: dataUser.phone|| 'Нет данных',
            email: dataUser.email.toUpperCase() || 'Нет данных',
            name: dataUser.name.toUpperCase() || 'Нет данных',
            lastName: dataUser.lastName.toUpperCase() || 'Нет данных',
            id: dataUser.id,
            birthdayDay:birthday[0] ||'Нет данных',
            birthdayMoth:birthday[1] ||'Нет данных',
            birthdayYear:birthday[2] ||'Нет данных',
            birthday:''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (values.name.length < 2) {
                errors.name = 'Минимальная длина 2 символа'
            }
            if (values.lastName) {
                errors.lastName = 'Минимальная длин а 2 символа'
            }
            if (!values.phone) {
                errors.phone = 'Обязательное поле'
            }

            if (!values.email.length) {
                errors.email = 'Обязательное поле'
            } else {

                if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                    errors.email = 'Неверный формат'
                }
            }
        },
        onSubmit: (values) => {
            values.birthday=`${values.birthdayDay}.${values.birthdayMoth}.${values.birthdayYear}`
            if (isEdit) {
                dispatch(changeUserInfo(values))
            } else {
                dispatch(logout())
            }
        }
    })

    const inputClick = (event: React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation()
        dispatch(setIsEdit(true))
    }

    return (
        <div className={container.container} onClick={(event) => event.stopPropagation()}>
            {isLoading ? <div>
                    <BounceLoader color={'blue'}/>
                </div> :
                <form className={inputStyle.form_body} onSubmit={formik.handleSubmit}>
                    <div className={styles.profile_header}>
                        <img src={backArrow} alt={'back'} onClick={() => navigate(-1)}/>
                        <h3 className={styles.header_title}>Профиль</h3>
                    </div>
                    <div style={{color: 'green', marginBottom: '20px'}}>{requestMessage}</div>

                    <div className={`${inputStyle.form__item} ${inputStyle.sing_up_item}`}>
                        <span className={inputStyle.title}>Имя</span>
                        <input
                            onClick={(e) => {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data}`}
                            {...formik.getFieldProps('name')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.name && formik.errors.name &&
                        <div className={styles.formik_errors}>{formik.errors.name}</div>}

                    <div className={`${inputStyle.form__item} ${inputStyle.sing_up_item}`}>
                        <span className={inputStyle.title}>Фамилия</span>
                        <input
                            onClick={(e) => {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                            {...formik.getFieldProps('lastName')}
                        />

                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.lastName && formik.errors.lastName &&
                        <div className={styles.formik_errors}>{formik.errors.lastName}</div>}
                    <div className={`${inputStyle.form__item} ${inputStyle.sing_up_item}`}>
                        <span className={inputStyle.title}>Дата рождения</span>
                        <div className={infoStyle.birthday_wrapper}>
                            <div>
                                <input
                                    onClick={(e) => {
                                        return inputClick(e)
                                    }}
                                    className={`${inputStyle.input_data} `}
                                    {...formik.getFieldProps('birthdayDay')}
                                />
                                <hr color={'grey'} style={{width: '100%',marginTop:'5px'}}/>
                            </div>
                            <div>
                                <input
                                    onClick={(e) => {
                                        return inputClick(e)
                                    }}
                                    className={`${inputStyle.input_data} `}
                                    {...formik.getFieldProps('birthdayMoth')}
                                />
                                <hr color={'grey'} style={{width: '100%',marginTop:'5px'}}/>
                            </div>
                           <div>
                               <input
                                   onClick={(e) => {
                                       return inputClick(e)
                                   }}
                                   className={`${inputStyle.input_data} `}
                                   style={{width:'70px'}}
                                   {...formik.getFieldProps('birthdayYear')}
                               />
                               <hr color={'grey'} style={{width: '100%',marginTop:'5px'}}/>
                           </div>
                        </div>

                    </div>
                    {formik.touched.lastName && formik.errors.lastName &&
                        <div className={styles.formik_errors}>{formik.errors.lastName}</div>}

                    <div style={{margin:'30px 0 20px'}}>Контакты</div>
                    <div className={`${inputStyle.form__item} ${inputStyle.sing_up_item}`}>
                        <span className={inputStyle.title}>Ваш телефон</span>
                        <input
                            onClick={(e) => {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                            type={'tel'}
                            {...formik.getFieldProps('phone')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.phone && formik.errors.phone &&
                        <div className={styles.formik_errors}>{formik.errors.phone}</div>}

                    <div className={`${inputStyle.form__item} ${inputStyle.sing_up_item}`}>
                        <span className={inputStyle.title}>Email</span>
                        <input
                            onClick={(e) => {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                            style={{fontSize:'1.3rem'}}
                            type={'text'}
                            {...formik.getFieldProps('email')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.email && formik.errors.email &&
                        <div className={styles.formik_errors}>{formik.errors.email}</div>}
                    <div className={infoStyle.button_wrapper}>
                        <Button className={styles.logout_btn} type={"submit"}
                                text={isEdit ? 'Сохранить' : 'Выход'}></Button>
                    </div>
                </form>
            }
        </div>
    )
}
export default InfoUser
