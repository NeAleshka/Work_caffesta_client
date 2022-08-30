import {CSSProperties} from "react";

export interface ITheme {
    header: CSSProperties
    layout: CSSProperties
    footer: CSSProperties
    activeText?:CSSProperties
    button?:CSSProperties
}

export const defaultTheme:ITheme={
    header: {},
    layout:{},
    footer:{},
    activeText:{
        color:'black'
    }
}

export const lightTheme: ITheme = {
    header: {
        background: 'red'
    },
    layout:{
        background:'#104939'
    },
    footer:{
        background:'red'
    },
    activeText:{
        color:'black'
    }
}

export const darkTheme: ITheme = {
    header: {
        background: 'black',
        color: "white"
    },
    layout:{
        background: 'orange',
        color: "white"
    },
    footer:{
        background: 'black',
        color: "white"
    },
    activeText:{
        color:'#a47f7f'
    },
    button:{
        background:'#0e3851'
    }
}