/**
 * Created by sunxiaoying on 2017/12/14.
 */
import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    //登录
    login: (params)=> {
        params.password = window.btoa(params.password)
        return axios.post(`${ApiBaseUrl}/auth/login`,qs.stringify(params));
    },
    //退出
    logout: ()=> {
        return axios.get(`${ApiBaseUrl}/auth/logout`);
    },
}
