import axios from '../http.service'
import qs from 'qs'
import config from '../../config'
const ApiBaseUrl = config.opapiHost

export default {
    getECDetailByOptions: (params) => {
        return axios.post(`${ApiBaseUrl}/ec/getECDetailByOptions`,qs.stringify(params))
    },
}