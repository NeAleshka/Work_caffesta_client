import style from './footer.module.css'
import container from '../LayOut/LayOut.module.css'
import profile from '../../images/footer_icons/profile.svg'
import code from '../../images/footer_icons/qr.svg'
import gift from '../../images/footer_icons/gift.svg'
import logoutImg from '../../images/footer_icons/logout.png'
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store";
import {logout} from "../../store/infoUserSlice";

const Footer = () => {
    const navigate=useNavigate()
    const dispatch=useAppDispatch()

  return(
      <div className={style.footer}>
         <div className={`${container.container} ${style.flex}`}>
             <div className={style.wrapper}>
                 <div className={style.item} onClick={()=>navigate('/user/info')}>
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
                 <div className={style.item} onClick={() => dispatch(logout())}>
                     <img className={style.icon} src={logoutImg} alt={"gift"}/>
                     <div className={style.text}>Выход</div>
                 </div>
             </div>
         </div>
      </div>

  )
}
export default Footer
