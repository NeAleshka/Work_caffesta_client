import container from '../../../components/Header/LayOut.module.css'
import inputStyle from '../../sing_up/singUp.module.css'
import styles from '../../sing_up/singUp.module.css'
import infoStyle from './InfoUser.module.css'
import React, {MutableRefObject, RefObject, useEffect, useRef, useState} from "react";
import {useSelector} from 'react-redux'
import {changeUserInfo, getUser, setIsEdit, setShowExitModal} from "../../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../../store";
import {IUserDTO} from "../../../interfaces";
import {useFormik} from "formik";
import {FormikErrorType} from "../../sing_up/SingUp";
import {BounceLoader} from 'react-spinners'
import backArrow from '../../../images/back.svg'
import edit from '../../../images/edit.svg'
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";

/*type Event = MouseEvent | TouchEvent;

const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
    ref: RefObject<T>,
    handler: (event: Event) => void,
) => {
    useEffect(() => {
        const listener = (event: Event) => {
            const el = ref?.current;
            if (!el || el.contains((event?.target as Node) || null)) {
                return;
            }

            handler(event); // Call the handler only if the click is outside of the element passed.
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]); // Reload only if ref or handler changes
};*/



const InfoUser = () => {
    let isNoEdit = useSelector<RootState, boolean>(state => state.infoUser.isEdit as boolean)
    const dataUser = useSelector<RootState, IUserDTO | undefined>(state => state.infoUser?.info)
    const dispatch = useAppDispatch()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const requestErrorMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    let mode = isNoEdit ? 'Редактировать профиль' : 'Сохранить'
    // const ref=useRef<HTMLDivElement>(null)


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
            if (mode === 'Сохранить') {
                dispatch(changeUserInfo(values))
            } else {
                dispatch(setIsEdit(false))
            }
        }
    })

    const wrapperClick = (e: any) => {
        console.log('11')
        e.stopPropagation()
         dispatch(setIsEdit(true))
    }

    const test = (event:any) => {
        console.log('test')
        event.preventDefault()
        event.stopPropagation()
        dispatch(setIsEdit(false))
    }

    // useOnClickOutside(ref, (e) => wrapperClick(e))
//ref={ref}
    return (
        <div className={container.container}>
            {isLoading ? <div>
                    <BounceLoader color={'blue'}/>
                </div> :
                <form className={inputStyle.form_body} onSubmit={formik.handleSubmit}>
                    <div className={styles.profile_header}>
                        <img src={backArrow} alt={'back'}/>
                        <h3 className={styles.header_title}>Профиль</h3>
                        {/*  <button
                            type='submit' >
                            <img src={edit} style={{width:'20px'}} alt={'edit'}/>
                        </button>*/}
                    </div>
                    <div className={inputStyle.form__item}>
                        <span className={inputStyle.title}>Имя</span>
                        <input
                            onClick={(e)=> {
                               e.stopPropagation()
                                return  test(e)
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
                            onFocus={()=>dispatch(setIsEdit(false))}
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
                            onFocus={()=>dispatch(setIsEdit(false))}
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
                            onFocus={()=>dispatch(setIsEdit(false))}
                            className={`${inputStyle.input_data} `}
                               type={'text'}
                               placeholder={dataUser?.email}
                               {...formik.getFieldProps('email')}
                        />
                        <hr color={'grey'} style={{width: '100%'}}/>
                    </div>
                    {formik.touched.email && formik.errors.email && <div className={styles.formik_errors}>{formik.errors.email}</div>}
                    {requestErrorMessage && <div>{requestErrorMessage}</div>}
                    <div>{isNoEdit?'Выход':'Сохранить'}</div>
                </form>
            }
        </div>
    )
}
export default InfoUser
