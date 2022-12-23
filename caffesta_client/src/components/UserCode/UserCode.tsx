import React from 'react';
import style from "../../pages/user/qrCode/qrCode.module.css";
import {setShowCode} from "../../store/infoUserSlice";
import {RootState, useAppDispatch} from "../../store";
import {useBarcode} from "next-barcode";
import {useSelector} from "react-redux";

const UserCode = () => {
    const dispatch=useAppDispatch()
    const infoForCode=useSelector<RootState,string>(state => state.infoUser.info?.cardNumber as string)

    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            width: 3.1,
            displayValue: false,
            height: 250
        }
    })

    return (
        <div className={style.qr_content}>
            <div className={style.qrWrapper}>
                <svg onClick={() => dispatch(setShowCode(true))} ref={inputRef}/>
            </div>
        </div>
    );
};

export default UserCode;