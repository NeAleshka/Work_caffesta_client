import style from './footer.module.css'
import container from '../LayOut/LayOut.module.css'
import profile from '../../images/footer_icons/profile.svg'
import code from '../../images/footer_icons/qr.svg'
import gift from '../../images/footer_icons/gift.svg'
import logoutImg from '../../images/footer_icons/logout.png'
import {useNavigate} from "react-router-dom";
import {RootState, useAppDispatch} from "../../store";
import {logout, setShowProfileSettings} from "../../store/infoUserSlice";
import {useSelector} from "react-redux";
import React from "react";


const Footer = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()
    const showProfileSetting=useSelector<RootState,boolean>(state => state.infoUser.showProfileSettings)

    const click=(event:React.MouseEvent<HTMLDivElement>)=>{
        event.stopPropagation()
        dispatch(setShowProfileSettings(!showProfileSetting))
    }

    return(
      <div className={style.footer}>
         <div className={`${container.container} ${style.flex}`}>
             <div className={style.wrapper}>
                 <div className={style.item} onClick={(event)=>click(event)}>
                     <img src={profile} alt={"profile"}/>
                     <div className={style.text}>Профиль</div>
                 </div>
                 <div className={style.item} onClick={()=>navigate('/user/qr_code')}>
                     <img className={style.icon} src={code} alt={"QR"}/>
                     <div className={style.text}>Мой QR</div>
                 </div>
                 <div className={style.item} onClick={()=>navigate('/user/accumulation')}>
                     <img className={style.icon} src={gift} alt={"gift"}/>
                     <div className={style.text}>Накопления</div>
                 </div>
             </div>
         </div>
      </div>

  )
}
export default Footer
