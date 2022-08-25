import axios from "axios";
import {IUserInfo, ILoginResponse, IUserDTO, IErrorRequest, IServerResponse} from "./interfaces";


const instants=axios.create({
    baseURL: 'http://localhost:5000/',
    withCredentials: true
})

const userApi={
    reg(data:IUserInfo){
        return instants.post<IUserInfo, { data: ILoginResponse }>('/app/client/registration',{...data}).then(res=>res.data)
    },
    me(refreshToken: string){
        return instants.get('/app/client/authMe', {
            headers: {
                'cookies': refreshToken
            }
        }).then(res=>res.data)
    },
    userVerification( verificationCode: string){
        return instants.post<{data:{verificationCode:string,login:string} },{data: { success: boolean, error: IErrorRequest,userData:IUserDTO }}>('/app/client/verification',{verificationCode}).then(res=>res.data)
    },
    sendVerificationCode(email:string){
        return instants.post<{email:string}, { data: { success: boolean }}>('/app/client/confirm_email',{email}).then(res=>res.data)
    },
    login(login:string,password:string){
        return instants.post<{login:string,password:string},{ data: ILoginResponse}>('/app/client/login',{login,password}).then(res=>res.data)
    },
    logout(){
        return instants.post('/app/client/logout')
    },
    changeInfo(data:IUserDTO) {
        return instants.put<IUserDTO, { data: IUserDTO,success:boolean }>('/app/client/change_info',{...data})
    },
    getUser(accessToken:string){
        return instants.get<IServerResponse>('/app/client/get_user',{headers:{
                'cookies': accessToken
            }}).then(res=>res.data)
    }
}

export default userApi
