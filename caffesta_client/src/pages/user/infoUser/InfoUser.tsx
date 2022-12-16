import container from '../../../components/Header/LayOut.module.css'
import inputStyle from '../../sing_up/singUp.module.css'
import styles from '../../sing_up/singUp.module.css'
import infoStyle from './InfoUser.module.css'
import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {useSelector} from 'react-redux'
import {changeUserInfo, getUser, logout, setIsEdit, setShowExitModal} from "../../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../../store";
import {IUserDTO} from "../../../interfaces";
import {useFormik} from "formik";
import {FormikErrorType} from "../../sing_up/SingUp";
import {BounceLoader} from 'react-spinners'
import backArrow from '../../../images/back.svg'
import edit from '../../../images/edit.svg'
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import Button from "../../../components/Button";

const InfoUser = () => {
    let isEdit = useSelector<RootState, boolean>(state => state.infoUser.isEdit as boolean)
    const dataUser = useSelector<RootState, IUserDTO | undefined>(state => state.infoUser?.info)
    const dispatch = useAppDispatch()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const navigate=useNavigate()
    const requestMessage=useSelector<RootState,string>(state => state.infoUser.requestMessage as string)



    const formik = useFormik({
        initialValues: {
            phone: dataUser?.phone || 'Нет данных',
            email: dataUser?.email || 'Нет данных',
            name: dataUser?.name || 'Нет данных',
            lastName: dataUser?.lastName || 'Нет данных'
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (values.name.length < 2) {
                errors.name = 'Минимальная длина 2 символа'
            }
            if (values.lastName) {
                errors.lastName = 'Минимальная длина 2 символа'
            }
            if (!values.phone) {
                errors.phone = 'Обязательное поле'
            }
            if (!values.email.length) {
                errors.email = 'Обязательное поле'
            } else if (!/^[A-Z\d._%+-]+@[A-Z\d.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Неверный формат'
            }
        },
        onSubmit: (values) => {
            if (isEdit) {
                dispatch(changeUserInfo(values))
            } else {
                dispatch(logout())
            }
        }
    })

    const inputClick = (event:React.MouseEvent<HTMLInputElement>) => {
        event.stopPropagation()
        dispatch(setIsEdit(true))
    }

    return (
        <div className={container.container} onClick={(event)=>event.stopPropagation()}>
            {isLoading ? <div>
                    <BounceLoader color={'blue'}/>
                </div> :
                <form className={inputStyle.form_body} onSubmit={formik.handleSubmit}>
                    <div className={styles.profile_header}>
                        <img src={backArrow} alt={'back'} onClick={()=>navigate(-1)} />
                        <h3 className={styles.header_title}>Профиль</h3>
                        {/*  <button
                            type='submit' >
                            <img src={edit} style={{width:'20px'}} alt={'edit'}/>
                        </button>*/}
                    </div>
                    <div style={{color:'green',marginBottom:'20px'}}>{requestMessage}</div>

                    <div className={inputStyle.form__item}>
                        <span className={inputStyle.title}>Имя</span>
                        <input
                            onClick={(e)=> {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                               placeholder={dataUser?.name}
                               {...formik.getFieldProps('name')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.name && formik.errors.name && <div className={styles.formik_errors}>{formik.errors.name}</div>}
                    <div className={inputStyle.form__item}>
                        <span className={inputStyle.title}>Фамилия</span>
                        <input
                            onClick={(e)=> {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                               placeholder={dataUser?.lastName}
                               {...formik.getFieldProps('lastName')}
                        />

                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.lastName && formik.errors.lastName && <div className={styles.formik_errors}>{formik.errors.lastName}</div>}
                    <div className={`${inputStyle.form__item} ${infoStyle.form_body}`}>
                        <span className={inputStyle.title}>Ваш телефон</span>
                        <input
                            onClick={(e)=> {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                               type={'tel'}
                               placeholder={dataUser?.phone}
                               {...formik.getFieldProps('phone')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.phone && formik.errors.phone && <div className={styles.formik_errors}>{formik.errors.phone}</div>}
                    <div className={inputStyle.form__item}>
                        <span className={inputStyle.title}>Email</span>
                        <input
                            onClick={(e)=> {
                                return inputClick(e)
                            }}
                            className={`${inputStyle.input_data} `}
                               type={'text'}
                               placeholder={dataUser?.email}
                               {...formik.getFieldProps('email')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.email && formik.errors.email && <div className={styles.formik_errors}>{formik.errors.email}</div>}
                    {/*<div>{isNoEdit?'Выход':'Сохранить'}</div>*/}
                    <Button className={styles.logout_btn} type={"submit"} text={isEdit?'Сохранить':'Выход'}></Button>
                </form>
            }
        </div>
    )
}
export default InfoUser
