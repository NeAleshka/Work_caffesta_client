import container from '../../../components/Header/LayOut.module.css'
import style from './qrCode.module.css'
import QRcode from '../../../../public/qr-code.png'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import QRcodeLib from "react-qr-code"
import {useBarcode} from 'next-barcode';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {CSSProperties, useEffect, useLayoutEffect, useRef, useState} from "react";
import {getNews, setDetailsNewsIndex, setIsLoading} from "../../../store/infoUserSlice";
import {INews} from "../../../interfaces";
import { useNavigate} from "react-router-dom";
import TemplateCodePNG from '../../../images/barcode_template.png'
import { useInView } from "react-intersection-observer"

interface NewsItemProps {
    title: string
    index: number
}

const QRCodePage = () => {
    const userName = useSelector<RootState, string>(state => state.infoUser.info?.name as string)
    if (!userName) {
        setTimeout(()=>{
            return <div style={{marginTop: "40vh"}}>Sorry we have some problems on the server</div>
        },3000)
    }
    return <QRCode/>
}
const QRCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info?.cardNumber as string)
    const dispatch = useAppDispatch()
    const QRCodeRef = useRef(null);
    const news=useSelector<RootState,INews[]|null>(state => state.infoUser.news)
    const currentCode = localStorage.getItem('current_type_code') as string
    const [ ref, showTemplateCode ] = useInView({
        threshold: 0,
        rootMargin:'-150px'
    });

    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            width: 3,
            displayValue: true,
            height: 250
        }
    })
    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    })

    useEffect(() => {
        if(!news?.length){
            dispatch(getNews())
        }
    }, [])

    return (
        <div className={container.container} ref={QRCodeRef}>
            <section className={style.wrapper} style={!showTemplateCode? {marginTop:'0'}:{}}>
                {!showTemplateCode && <TemplateCode/>}
                <div ref={ref} >
                    <Carousel
                        className={!showTemplateCode?style.hidden: style.test}
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
                        <div className={style.qrWrapper} style={currentCode === "1" ? {marginRight: '41px'} : {}}>
                            <svg ref={inputRef}/>
                        </div>
                    </Carousel>
                </div>

                <div className={style.descrBottom}>Предъявите его кассиру перед оплатой для начисления бонусов</div>
                <News/>
            </section>

        </div>
    )
}

export default QRCodePage

const News = () => {
    const news = useSelector<RootState, INews[]>(state => state.infoUser.news as [])

    return (
        <div style={{marginTop:'20px'}}>
            {
                news?.map((item, index) => <NewsItem key={`${index}_${item.title}`} index={index} title={item.title}/>)
            }
        </div>
    )
}



const NewsItem = ({title, index}: NewsItemProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goToNews = () => {
        dispatch(setDetailsNewsIndex(index))
        navigate('/user/news')
    }

    return (
        <div onClick={goToNews} style={{height: '300px', backgroundColor:'grey',borderRadius:'10px', marginBottom:'15px'}}>
            <div> {title}</div>
        </div>
    )
}

const TemplateCode=()=>{
    const currentTheme=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.layout as CSSProperties)
    return(
        <img src={TemplateCodePNG}  className={style.template_code} style={currentTheme} alt={'code'}/>
    )
}
