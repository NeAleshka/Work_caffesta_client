import React from 'react';
import container from '../../../components/Header/LayOut.module.css'
import UserCode from "../../../components/UserCode/UserCode";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import style from './Wallet.module.css'

const Wallet = () => {
    const navigate=useNavigate()
    const userBalls=useSelector<RootState,number>(state => state.infoUser.info?.bonuses?.bonus as number)
    return (
        <div style={{backgroundColor:'#c28f33'}}>
            <div style={{flexDirection:'column'}} className={container.container}>
                <UserCode/>
                <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'start'}}>
                    <div style={{fontSize:'13px'}}>БАЛЛЫ</div>
                    <div style={{fontSize:'80px',lineHeight:'85px'}}>{userBalls}</div>
                </div>
                <button className={style.btn}>КУПИТЬ ЗА БАЛЛЫ</button>
                <hr color={'white'} style={{width:'100%',marginTop:'15px'}}/>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between'}}>
                    <div style={{fontSize:'13px'}}>КЭШБЭК В БАЛЛАХ</div>
                    <div style={{fontSize:'35px',marginTop:'10px'}}>1 BYN=10</div>
                </div>
                <hr color={'white'} style={{width:'100%',marginTop:'30px'}}/>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontSize:'13px'}}>БАЛЛОВ НАКОПЛЕНО</div>
                    <div style={{fontSize:'20px'}}>{userBalls}</div>
                </div>
                <hr color={'white'} style={{width:'100%',marginTop:'5px'}}/>
                <div style={{display:'flex',width:'100%',justifyContent:'space-between',alignItems:'center'}}>
                    <div style={{fontSize:'13px'}}>ВСЕГО ЧЕКОВ</div>
                    <div style={{fontSize:'20px'}}>0</div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',width:'100%',height:'150px',margin:'20px 0 20px 0'}}>
                    <div style={{padding:'10px',borderRadius:'20px',backgroundColor:'#a26a1e',width:'40%',height:'150xp'}}>
                    <div style={{fontSize:'13px',textAlign:'start'}}>АКЦИИ</div>
                    <div style={{height:'80%',marginTop:'30px'}}>8</div>
                    </div>
                    <div style={{padding:'10px',borderRadius:'20px',backgroundColor:'white',width:'40%',height:'150xp'}}>
                        <div style={{color:"black",fontSize:'13px',textAlign:'start'}}>КУПОНЫ</div>
                        <div style={{color:"black",height:'80%',marginTop:'30px'}}>0</div>
                    </div>
                </div>
                <div style={{width:'100%',height:'200px',backgroundColor:'#12d587',borderRadius:'10px',marginBottom:'40px'}}>
                    <div style={{textAlign:'start',padding:'10px'}}>Подписка</div>
                </div>
                <div style={{width:'100%',textAlign:"start",fontSize:'32px'}}>МОИ КУПОНЫ</div>
                <hr color={'white'} style={{width:'100%',marginTop:'5px'}}/>
                <div style={{width:'100%',textAlign:"start",fontSize:'32px'}}>КУПИТЕ ЗА БАЛЛЫ</div>
                <hr color={'white'} style={{width:'100%',marginTop:'5px'}}/>
                <div style={{width:'100%',textAlign:"start",fontSize:'32px'}}>ИСТОРИЯ ЗАКАЗОВ</div>


            </div>
        </div>

    );
};

export default Wallet;