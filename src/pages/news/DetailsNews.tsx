import React from 'react';
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {INews} from "../../interfaces";
import {useNavigate} from "react-router-dom";

const DetailsNews = () => {
    const news=useSelector<RootState,INews[]>(state => state.infoUser.news as [])
    const newsIndex=useSelector<RootState,number>(state => state.infoUser.detailsNewsIndex)
    const navigate=useNavigate()

    return (
        <div>
            <div onClick={()=>navigate(-1)}>Назад</div>
            <div>{news[newsIndex]?.title}</div>
            <div>{news[newsIndex]?.description}</div>
        </div>
    );
};

export default DetailsNews;