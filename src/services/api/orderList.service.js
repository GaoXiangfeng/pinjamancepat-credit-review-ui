/**
 * Created by sunxiaoying on 2017/12/20.
 */
import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = `${config.opapiHost}/credit_audit`
export default {
    //查询工单列表
    getTicketList: (params) => {
        return axios.post(`${ApiBaseUrl}/getOrderListByTicketOptions`,qs.stringify(params))
    },
    //查询订单列表
    getOrderList: (params)=> {
        return axios.post(`${ApiBaseUrl}/getOrderListByOptions`,qs.stringify(params))
    },
}
