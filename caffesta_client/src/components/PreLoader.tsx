import React, {CSSProperties} from 'react';
import {ClipLoader} from 'react-spinners'

interface loaderProps{
    loading:boolean
    color?:string
    cssOverride?:CSSProperties
    speed?:number
    size?:number
}

const defaultCssProp:CSSProperties={
    margin:"250px auto 0",
    fontWeight:700,
    borderWidth:"5px"
}

const PreLoader = ({loading,color,cssOverride,speed,size}:loaderProps) => {
    return (
        <ClipLoader loading={loading} color={color??"#3c8dbc"} cssOverride={cssOverride??defaultCssProp} speedMultiplier={speed?? 0.4} size={size??200}/>
    );
};

export default PreLoader;
