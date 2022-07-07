import container from '../../../components/LayOut/LayOut.module.css'
import style from './qrCode.module.css'
import QRcode from '../../../images/qr-code.png'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import QRcodeLib from "react-qr-code"
import {IUserDTO} from "../../../interfaces";
import {useBarcode} from 'next-barcode';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {BounceLoader} from 'react-spinners'
import {useEffect, useState} from "react";
import {setIsLoading} from "../../../store/infoUserSlice";

const QRCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info.cardNumber as string)
    const userName= useSelector<RootState, string>(state => state.infoUser.info.name as string)
    const isLoading=useSelector<RootState,boolean>(state => state.infoUser.isLoading)
    console.log('isLoading in component', isLoading)

    const isLogin = useSelector<RootState,boolean>(state => state.infoUser.isLogin)
    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            format: 'ean13',
            background: '#efefef',
            marginRight:30,
            width:3,
            displayValue:false
        }
    })

   /* const dispatch = useAppDispatch();

    const [isLoad,setIsLoad] = useState(true);

    useEffect(()=>{
        if (isLogin){
            dispatch(setIsLoading(false));
        }
    })*/

    // console.log(isLoading)

    return (
        <div className={container.container}>
            {isLoading && (
                <div style={{color:'red',fontSize:'100px',textAlign:'center'}}> Loading...
                    <BounceLoader  loading={isLoading} color={'blue'}/>
                </div>
            )
            }
            <section className={style.wrapper}>
                    <div>Здравствуйте,<br/>{userName}!</div>
                    <div className={style.titleQr}>Ваш личный код</div>
                    <Carousel
                        className={style.test}
                        showStatus={false}
                        showThumbs={false}
                        showArrows={false}
                        infiniteLoop
                        swipeable
                        dynamicHeight={true}
                        renderIndicator={(onClickHandler, isSelected, index, label) => {
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
                        <div className={style.qrWrapper}><QRcodeLib value={`${infoForCode}`} size={300} alt={'QRcode'}/></div>
                        <svg ref={inputRef}/>
                    </Carousel>
                    <div className={style.descrBottom}>Предъявите его кассиру перед оплатой для начисления бонусов</div>
                </section>
        </div>
    )
}

export default QRCode
