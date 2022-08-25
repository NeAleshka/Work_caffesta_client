import container from '../../../components/LayOut/LayOut.module.css'
import style from './qrCode.module.css'
import QRcode from '../../../../public/qr-code.png'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import QRcodeLib from "react-qr-code"
import {useBarcode} from 'next-barcode';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {useEffect, useLayoutEffect, useState} from "react";
import {setIsLoading, setPrompt} from "../../../store/infoUserSlice";


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
    const isInstalled = localStorage.getItem('isInstalled') as string
    const [showNotify, setShowNotify] = useState<boolean>(true)
    let promptEvent: Event | null = null

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        promptEvent = e
    });

  /*  const presentAddToHome = () => {
        setShowNotify(false)
        // @ts-ignore
        promptEvent?.prompt();  // Wait for the user to respond to the prompt
        // @ts-ignore
        promptEvent?.userChoice
            .then((choice: { outcome: string; }) => {
                if (choice.outcome === 'accepted') {
                    localStorage.setItem('isInstalled', '1')
                } else {
                    localStorage.setItem('isInstalled', '0')
                }
            })
    }*/

    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            marginRight: 30,
            width: 3,
            displayValue: true
        }
    })
    useEffect(() => {
            // @ts-ignore
            setTimeout(() => {
                // @ts-ignore
                promptEvent?.prompt()
                // @ts-ignore
                console.log(promptEvent);
            }, 3000)

            // promptEvent?.prompt()
        },
        [])

    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    })

    const closeNotifay = () => {
        setShowNotify(false)

    }

    return (
        <div className={container.container}>
            <section className={style.wrapper}>
                <div>Здравствуйте,<br/>{userName}!</div>
                <div className={style.titleQr}>Ваш личный код</div>
                {/*{ showNotify && <NotifyForInstall closeNotify={closeNotifay} showInstall={presentAddToHome}/>}*/}
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

type NotifyType = {
    closeNotify: () => void
    showInstall: () => void
}

const NotifyForInstall = ({closeNotify, showInstall}: NotifyType) => {
    return (
        <div style={{
            position: 'absolute',
            top: '50',
            left: '50',
            zIndex: '30',
            color: 'white',
            backgroundColor: '#373b40',
            opacity: '0.9',
            display: "flex",
            flexDirection: "column",
            borderRadius: '10px'
        }}>
            <div style={{margin: '15px'}}>Хотите установить приложение</div>
            <div style={{
                marginTop: '20px',
                marginBottom: '5px',
                display: 'flex',
                justifyContent: "flex-end",
                paddingRight: '10px'
            }}>
                <button style={{
                    width: '55px',
                    height: '40px',
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: '5px',
                    marginRight: '10px'
                }} onClick={showInstall}>Да
                </button>
                <button style={{background: 'red', borderRadius: '5px', width: '55px', height: '40px'}}
                        onClick={closeNotify}>Нет
                </button>
            </div>
        </div>
    )
}
