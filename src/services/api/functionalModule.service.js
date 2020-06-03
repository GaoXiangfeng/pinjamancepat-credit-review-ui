/**
 * Created by sunxiaoying on 2018/08/13.
 */
import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
export default {
    //根据id查询还款码
    getRepayCodeById: (params) => {
        return axios.get(`${ApiBaseUrl}/invoice/getCodeByOrderId`,{params:params})
    },
    //根据还款码查询有效期
    getExpiryDateByCode: (params) => {
        return axios.get(`${ApiBaseUrl}/invoice/getExpiryDateByCode`,{params:params})
    },
    //生成还款码
    createNewRepayCode: (params) => {
        return axios.get(`${ApiBaseUrl}/invoice/createXenditInvoice`,{params:params})
    },
    //根据id放款失败,贷款结清
    updateOrder: (params) => {
        return axios.post(`${ApiBaseUrl}/credit_audit/updateOrder`,qs.stringify(params))
    },
    //隐藏催收案件
    hiddencollectionCase: (params) => {
        return axios.post(`${ApiBaseUrl}/functional/collection/disappear`,qs.stringify(params))
    }
}