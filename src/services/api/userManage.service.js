import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    //获取账户列表（除机审角色外）
    getAccountList: (params)=> {
        return axios.post(`${ApiBaseUrl}/accountManage/getAccountList`,qs.stringify(params));
    },

    //获得审核员详情
    getAuditorDetailById: (params) => {
        return axios.get(`${ApiBaseUrl}/accountManage/getAuditorDetailById`,{params:params})
    },

    //动态获取权限列表（除机审角色外）
    getPermissionList: () => {
        return axios.get(`${ApiBaseUrl}/accountManage/getPermissionList`)
    },

    //提交表单--添加
    addUserInfo: (params)=> {
        return axios.post(`${ApiBaseUrl}/accountManage/register`,qs.stringify(params));
    },

    //开启/停用 
    updateAuditorStatus: (params)=> {
        return axios.post(`${ApiBaseUrl}/accountManage/updateAuditorStatus`,qs.stringify(params));
    },

    //提交表单--修改
    updateAuditorDetailById: (params)=> {
        return axios.post(`${ApiBaseUrl}/accountManage/updateAuditorDetailById`,qs.stringify(params));
    },
}
