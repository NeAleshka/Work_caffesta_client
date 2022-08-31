import container from '../../../components/Header/LayOut.module.css'
import inputStyle from '../../sing_up/singUp.module.css'
import styles from '../../sing_up/singUp.module.css'
import infoStyle from './InfoUser.module.css'
import React, {useEffect, useState} from "react";
import {useSelector} from 'react-redux'
import {changeUserInfo, setIsEdit, setShowExitModal} from "../../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../../store";
import {IUserDTO, IUserInfo} from "../../../interfaces";
import {useFormik} from "formik";
import {FormikErrorType} from "../../sing_up/SingUp";
import {BounceLoader} from 'react-spinners'
import Button from "../../../components/Button";

const InfoUser = () => {
    let isNoEdit = useSelector<RootState, boolean>(state => state.infoUser.isEdit as boolean)
    const disabledStyle = isNoEdit ? `${infoStyle.disabled}` : ''
    const dataUser = useSelector<RootState, IUserDTO | undefined>(state => state.infoUser?.info)
    const dispatch = useAppDispatch()
    const isLoading = useSelector<RootState, boolean>(state => state.infoUser.isLoading as boolean)
    const [infoUser, setInfoUser] = useState(dataUser)
    const requestErrorMessage = useSelector<RootState, string>(state => state.infoUser.requestMessage as string)
    let mode = isNoEdit ? 'Редактировать профиль' : 'Сохранить'

    const formik = useFormik({
        initialValues: {
            phone: infoUser?.phone ?? 'Нет данных',
            email: infoUser?.email ?? 'Нет данных',
            name: infoUser?.name ?? 'Нет данных',
            lastName: infoUser?.lastName ?? 'Нет данных'
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

    useEffect(() => {
        setInfoUser(dataUser)
    }, [])

    const wrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
        dispatch(setShowExitModal(false))
    }

    return (
        <div className={container.container} onClick={(event) => wrapperClick(event)}>
            {isLoading ? <div>
                    <BounceLoader color={'blue'}/>
                </div> :
                <form className={inputStyle.form_body} onSubmit={formik.handleSubmit}>
                    <h3 style={{fontWeight: '400', marginTop: '30px'}}>{dataUser?.name ?? 'User Name'}</h3>
                    <div className={`${inputStyle.form__item} ${infoStyle.form_body}`}>
                        <input className={`${inputStyle.input_data} ${disabledStyle}`} disabled={isNoEdit}
                               type={'tel'}
                               placeholder={infoUser?.phone}
                               {...formik.getFieldProps('phone')}
                        />
                    </div>
                    {formik.touched.phone && formik.errors.phone &&
                        <div className={styles.formik_errors}>{formik.errors.phone}</div>}
                    <div className={inputStyle.form__item}>
                        <input className={`${inputStyle.input_data} ${disabledStyle}`} disabled={isNoEdit}
                               type={'text'}
                               placeholder={infoUser?.email}
                               {...formik.getFieldProps('email')}
                        />
                    </div>
                    {formik.touched.email && formik.errors.email &&
                        <div className={styles.formik_errors}>{formik.errors.email}</div>}
                    <div className={inputStyle.form__item}>
                        <input className={`${inputStyle.input_data} ${disabledStyle}`} disabled={isNoEdit}
                               placeholder={infoUser?.name}
                               {...formik.getFieldProps('name')}
                        />
                    </div>
                    {formik.touched.name && formik.errors.name &&
                        <div className={styles.formik_errors}>{formik.errors.name}</div>}
                    <div className={inputStyle.form__item}>
                        <input className={`${inputStyle.input_data} ${disabledStyle}`}
                               disabled={isNoEdit}
                               placeholder={infoUser?.lastName}
                               {...formik.getFieldProps('lastName')}
                        />
                    </div>
                    {formik.touched.lastName && formik.errors.lastName &&
                        <div className={styles.formik_errors}>{formik.errors.lastName}</div>}
                    <Button
                        className={`${infoStyle.button} ${infoStyle.blue_button} ${isNoEdit ? '' : infoStyle.save_change}`}
                        type='submit' text={mode}/>
                    {requestErrorMessage && <div>{requestErrorMessage}</div>}
                </form>
            }
        </div>
    )
}
export default InfoUser
