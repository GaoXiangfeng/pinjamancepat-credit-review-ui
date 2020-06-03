/**
 * Created by sunxiaoying on 2017/12/15.
 */
import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost
const translateHost = config.translateHost
export default {
    //信审短信列表
    messagesList: (params) => {
        return axios.get(`${ApiBaseUrl}/spider/findAllMessagesV1`,{params:params})
    },
    //信审通讯录列表
    callBooksList: (params)=> {
        return axios.get(`${ApiBaseUrl}/spider/findAllCallBooksV1`,{params:params})
    },
    //信审通话记录列表
    callRecordsList: (params)=> {
        return axios.get(`${ApiBaseUrl}/spider/findAllCallRecordsV1`,{params:params})
    },
    //审核初审工单
    auditPreOrders: (params)=>{
        return axios.post(`${ApiBaseUrl}/credit_audit/updatePreAuditTicketStatus`,qs.stringify(params))
    },
    //审核终审工单
    auditFinalOrders: (params)=>{
        return axios.post(`${ApiBaseUrl}/credit_audit/updateFinalAuditTicketStatus`,qs.stringify(params))
    },

    //命中规则
    riskDetail: (params)=>{
        return axios.get(`${ApiBaseUrl}/spider/findRuleByOrderId`,{params:params})
    },

    //工单详情
    ordersDetail: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/findOrderDetailByOrderId`,{params:params})
    },
    //银行账户姓名与申请人姓名校验 
    bankCheck: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/bankCheck`,{params:params})
    },

    //用户详情
    userDetail: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/findUserDetailByOrderId`,{params:params})
    },

    //审核信息
    auditInfo: (params)=>{
        return axios.get(`${ApiBaseUrl}/credit_audit/findTicketRecords`,{params:params})
    },
    //翻译接口
    transition: (params)=>{
        return axios.get(`${translateHost}/translate`,{params:params})
    },
    //联系次数
    contactCount: (params)=> {
        return axios.get(`${ApiBaseUrl}/credit_audit/getLinkmanCountByOrderId`,{params:params})
    },
    //查询授权项
    spinderInfo: (params)=> {
        return axios.get(`${ApiBaseUrl}/spider/spiderInfo`,{params:params})
    },
    //查询授权项内容
    searchSpinderContent: (params) => {
        return axios.post(`${ApiBaseUrl}/spider/userAuthInfo`,qs.stringify(params))
    },
    //历史借贷
    historyOrderList: (params) => {
        return axios.get(`${ApiBaseUrl}/credit_audit/historyOrderList`, {params:params})
    },
    //获取账户剩余金额
    getMoney: () => {
        return axios.get(`${ApiBaseUrl}/credit_audit/getBalance`)
    },
    //增加电核记录（仅信审）
    addCallRecord: (params) =>{
        return axios.post(`${ApiBaseUrl}/ec/addCallRecord`, qs.stringify(params))
    },
    //获取人脸识别
    faceMatching: (params) => {
        return axios.get(`${ApiBaseUrl}/credit_audit/faceMatching`, {params:params})
    },
}
