import container from '../../../components/Header/LayOut.module.css'
import style from './qrCode.module.css'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../../store";
import {useBarcode} from 'next-barcode';
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {useEffect, useLayoutEffect, useRef} from "react";
import {getNews, setDetailsNewsIndex, setIsLoading, setShowCode} from "../../../store/infoUserSlice";
import {INews} from "../../../interfaces";
import {useNavigate} from "react-router-dom";
import UserCode from "../../../components/UserCode/UserCode";

interface NewsItemProps {
    title: string
    index: number
}

const QRCodePage = () => {
    const userName = useSelector<RootState, string>(state => state.infoUser.info?.name as string)
    if (!userName) {
        setTimeout(() => {
            return <div style={{marginTop: "40vh"}}>Sorry we have some problems on the server</div>
        }, 3000)
    }
    return <QRCode/>
}
const QRCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info?.cardNumber as string)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const news = useSelector<RootState, INews[] | null>(state => state.infoUser.news)
    const showCode = useSelector<RootState, boolean>(state => state.infoUser.showCode)
    const refMain = useRef<HTMLDivElement>(null)


    useEffect(()=>{
        if (!showCode) {
           setTimeout(() => {
               refMain.current?.scrollTo(0, 250)
           },0)
        } else {
            refMain.current?.scrollTo({top: 0, behavior: 'smooth'})
        }
    })

    useLayoutEffect(() => {
        dispatch(setIsLoading(false))
    })

    useEffect(() => {
        if (!news?.length) {
            dispatch(getNews())
        }
    }, [])
    return (
        <div style={{overflow: 'scroll'}} ref={refMain} id={'user_page'} className={container.container}>
            <section className={style.wrapper}>
                <UserCode/>
                <MainNews/>
                <div className={style.list}>
                    <div className={style.list_item} onClick={() => navigate('/user/promotions')}>АКЦИИ</div>
                    <hr color={'grey'} style={{width: '100%'}}/>
                    <div className={style.list_item} onClick={() => navigate('/user/ball_menu')}>МЕНЮ ЗА БАЛЛЫ</div>
                    <hr color={'grey'} style={{width: '100%'}}/>
                    <div className={style.list_item} onClick={() => navigate('/user/wallet')}>КОШЕЛЁК</div>
                </div>
                <News/>
            </section>
        </div>
    )
}

export default QRCodePage

export const MainNews = () => {
    return (
        <NewsItem title={'Главная новость'} index={0}/>
    )
}

const News = () => {
    const news = useSelector<RootState, INews[]>(state => state.infoUser.news as [])
    return (
        <Carousel
            showStatus={false}
            showThumbs={false}
            showArrows={false}
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
            {
                news?.map((item, index) => <NewsItem key={`${index}_${item.title}`} index={index} title={item.title}/>)
            }
        </Carousel>
    )
}

export const NewsItem = ({title, index}: NewsItemProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const goToNews = () => {
        dispatch(setDetailsNewsIndex(index))
        navigate('/user/news')
    }

    return (
        <div onClick={goToNews}
             className={style.item_news}>
            <div className={style.item_news_title}>{title}</div>
        </div>
    )
}

const TemplateCode = () => {
    const infoForCode = useSelector<RootState, string>(state => state.infoUser.info?.cardNumber as string)
    const {inputRef} = useBarcode({
        value: `${infoForCode}`,
        options: {
            background: '#efefef',
            width: 3.1,
            displayValue: false,
            height: 50
        }
    })
    return (
        // <img src={TemplateCodePNG}  className={style.template_code} style={currentTheme} alt={'code'}/>
        <svg ref={inputRef} className={style.template_code}/>
    )
}
{/*    <div ref={ref}>
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
                                    style={!showTemplateCode? {display:"none"}:{}}
                                    className={`${style.controls_dot} ${
                                        isSelected ? style.controls_dot_active : ''
                                    }`}
                //                     onClick={onClickHandler}
                //                     onKeyDown={onClickHandler}
                //                     key={index}
                //                     role="button"
                //                     tabIndex={0}
                                    aria-label={`${label} ${index + 1}`}
                //                 />
                //             );
                        }}
                    >
                        <div className={style.qrWrapper}><QRcodeLib value={`${infoForCode}`} size={300} alt={'QRcode'}/>
                        </div>
                        <div className={style.qrWrapper} style={currentCode === "1" ? {marginRight: '41px'} : {}}>
                            <svg ref={inputRef}/>
                        </div>
                    </Carousel>
                </div>*/
}