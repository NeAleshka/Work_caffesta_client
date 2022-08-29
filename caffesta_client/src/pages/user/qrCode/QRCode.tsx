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
import {Navigate, useNavigate} from "react-router-dom";
import TemplateCodeSVG from '../../../images/templateCode.svg'


const QRCodePage = () => {
    const userName = useSelector<RootState, string>(state => state.infoUser.info?.name as string)
    if (!userName) {
        return <div style={{marginTop: "40vh"}}>Sorry we have some problems on the server</div>
    }
    return <QRCode/>
}
const QRCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info?.cardNumber as string)
    const dispatch = useAppDispatch()
    const QRCodeRef = useRef(null);
    const currentCode = localStorage.getItem('current_type_code') as string
    const [showTemplateCode, setShowTemplateCode]=useState<boolean>(false)

    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            width: 3,
            displayValue: true,
            height: 250
        }
    })

    const scrollHandler = () => {
        if(QRCodeRef.current){
            // @ts-ignore
            const test=Math.ceil(QRCodeRef.current.getBoundingClientRect().y)
            // @ts-ignore
            console.log(Math.ceil(QRCodeRef.current.getBoundingClientRect().top))
            if (test<-40 && !showTemplateCode){
                setShowTemplateCode(true)
            }else if(test>-40  ){
               setShowTemplateCode(false)
            }
        }

    };
    useEffect(()=>{
        window.addEventListener("scroll", scrollHandler, true);
        // @ts-ignore
    },[])



    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    })

    useEffect(() => {
        dispatch(getNews())
    }, [])


    return (
        <div className={container.container} style={{maxHeight: '100%'}} ref={QRCodeRef}>
            <section className={style.wrapper}>
                {showTemplateCode && <TemplateCode/>}
                <Carousel
                        className={showTemplateCode?style.hidden: style.test}
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
        <div>
            {
                news?.map((item, index) => <NewsItem key={`${index}_${item.title}`} index={index} title={item.title}/>)
            }
        </div>
    )
}

interface NewsItemProps {
    title: string
    index: number
}

const NewsItem = ({title, index}: NewsItemProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goToNews = () => {
        dispatch(setDetailsNewsIndex(index))
        navigate('/user/news')
    }

    return (
        <div onClick={goToNews} style={{height: '300px'}}>
            <div> {title}</div>
        </div>
    )
}

const TemplateCode=()=>{
    const currentTheme=useSelector<RootState,CSSProperties>(state => state.infoUser.currentTheme?.layout as CSSProperties)
    return(
      <img src={"https://static.vecteezy.com/system/resources/previews/001/199/360/non_2x/barcode-png.png"} style={{height:'50px',width:'360px',margin:'0 auto',position:'fixed',left:"0",right:'0',backgroundColor:''}}/>
    )
}
