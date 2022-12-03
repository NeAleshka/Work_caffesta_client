import React from 'react';
import style from './Menu.module.css'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {setShowMenu} from "../../store/infoUserSlice";
import {IUserDTO} from "../../interfaces";
import {useNavigate} from "react-router-dom";

const Menu = () => {
    const showMenu=useSelector<RootState,boolean>(state => state.infoUser.showMenu)
    const dispatch=useAppDispatch()
    const userInfo=useSelector<RootState,IUserDTO>(state => state.infoUser.info as IUserDTO)
    const navigate=useNavigate()

    const itemClick = (goTo:string) => {
        navigate(goTo)
        dispatch(setShowMenu(false))
    }

    return (
            <div className={`${style.menu} ${showMenu? `${style.active}`:''}`}>
                <ul onClick={(event)=>event.preventDefault()} >
                    <div style={showMenu?{transform:'translateX(0)'}:{}} className={`${style.blur} ${showMenu? `${style.active}`:''}`} onClick={()=>dispatch(setShowMenu(false))}></div>
                    <div className={style.info_user}>
                        <div className={style.user_name}>{`${userInfo.name} ${userInfo.lastName}`}</div>
                        <div className={style.user_number}>{userInfo.phone}</div>
                    </div>
                    <div className={style.item_wrapper}>
                        <div className={style.menu_item} onClick={()=>itemClick('/user/promotions')}>АКЦИИ</div>
                        <hr color={'grey'} style={{width: '90%',marginLeft:'0'}}/>
                        <div className={style.menu_item} onClick={()=>itemClick('user/info')}>ПРОФИЛЬ</div>
                        <hr color={'grey'} style={{width: '90%',marginLeft:'0'}}/>
                        <div className={style.menu_item} onClick={()=>dispatch(setShowMenu(false))}>НАСТРОЙКИ</div>
                        <hr color={'grey'} style={{width: '90%',marginLeft:'0'}}/>
                        <div className={style.menu_item} onClick={()=>dispatch(setShowMenu(false))}>ПРОМОКОД</div>
                        <hr color={'grey'} style={{width: '90%',marginLeft:'0'}}/>
                        <div className={style.menu_item} onClick={()=>dispatch(setShowMenu(false))}>ЗАКАЗЫ</div>
                    </div>
                </ul>
            </div>
    );
};

export default Menu;