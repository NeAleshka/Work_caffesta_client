import container from '../../../components/Header/LayOut.module.css'
import style from './qrCode.module.css'
import QRcode from '../../../../public/qr-code.png'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import QRcodeLib from "react-qr-code"
import {useBarcode} from 'next-barcode';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {useLayoutEffect} from "react";
import {setIsLoading} from "../../../store/infoUserSlice";


const QRCodePage = () => {
    const userName = useSelector<RootState, string>(state => state.infoUser.info?.name as string)
    if (!userName) {
        return <div style={{marginTop: "40vh"}}>Sorry we have some problems on the server</div>
    }
    return <QRCode/>
}
const QRCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info?.cardNumber as string)
    const userName = useSelector<RootState, string>(state => state.infoUser.info?.name as string)
    const dispatch = useAppDispatch()
    const currentCode = localStorage.getItem('current_type_code') as string

    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            marginRight: 30,
            width: 3,
            displayValue: true
        }
    })


    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    })

    return (
        <div className={container.container}>
            <section className={style.wrapper}>
                <Carousel
                    className={style.test}
                    showStatus={false}
                    showThumbs={false}
                    showArrows={false}
                    infiniteLoop
                    swipeable
                    selectedItem={+currentCode}
                    dynamicHeight={true}
                    renderIndicator={(onClickHandler, isSelected, index, label) => {
                        {
                            isSelected && localStorage.setItem('current_type_code', index.toString())
                        }
                        return (
                            <span
                                className={`${style.controls_dot} ${
                                    isSelected ? style.controls_dot_active : ''
                                }`}
                                onClick={onClickHandler}
                                onKeyDown={onClickHandler}
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-label={`${label} ${index + 1}`}
                            />
                        );
                    }}
                >
                    <div className={style.qrWrapper}><QRcodeLib value={`${infoForCode}`} size={300} alt={'QRcode'}/>
                    </div>
                    <div className={style.qrWrapper}>
                        <svg ref={inputRef}/>
                    </div>
                </Carousel>
                <div className={style.descrBottom}>Предъявите его кассиру перед оплатой для начисления бонусов</div>
            </section>
        </div>
    )
}

export default QRCodePage


