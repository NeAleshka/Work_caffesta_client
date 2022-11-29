import React from 'react';
import style from './Menu.module.css'
import {useSelector} from "react-redux";
import {RootState, useAppDispatch} from "../../store";
import {setShowMenu} from "../../store/infoUserSlice";

const Menu = () => {
    const showMenu=useSelector<RootState,boolean>(state => state.infoUser.showMenu)
    const dispatch=useAppDispatch()

    return (
            <div className={`${style.menu} ${showMenu? `${style.active}`:''}`}  >
                <ul onClick={(event)=>event.preventDefault()} >
                    <div style={showMenu?{transform:'translateX(0)'}:{}} className={`${style.blur} ${showMenu? `${style.active}`:''}`} onClick={()=>dispatch(setShowMenu(false))}></div>
                    <li style={{color:'white'}} onClick={()=>dispatch(setShowMenu(false))}>Меню</li>
                    <li style={{color:'white'}} onClick={()=>dispatch(setShowMenu(false))}>Меню</li>
                    <li style={{color:'white'}} onClick={()=>dispatch(setShowMenu(false))}>Меню</li>
                </ul>
            </div>


    );
};

export default Menu;