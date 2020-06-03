import axios from 'axios'
import {Notice} from 'iview'
import Bus from './bus.service'
import Promise from './promise.service'
import localStorage from './localStorage.service'
import config from '../config'

let CancelToken = axios.CancelToken //axios中断取消请求
let httpQueue = [] // 请求队列
let cancelArr = [] //存储取消方法
let timeout = 200 // 延时loading
let loadingTimeOut
let closeTimeOut
const opRedirectUrl = config.LoginUrl

axios.defaults.headers.common['X-Auth-Token'] = localStorage.get('token')

function beforeRequest(model) {
    if (!model) model = 'common'
    httpQueue.push(model)
    loadingTimeOut = setTimeout(() => {
        if (httpQueue.length !== 0) {
            Bus.$emit(`${model}ShowLoading`)
        }
    }, timeout)
    closeTimeOut = setTimeout(() => {
        Bus.$emit(`${model}HideLoading`)
    }, 30 * 60 * 1000)
}
function afterRequest(model) {
    if (!model) model = 'common'
    clearTimeout(loadingTimeOut)
    var index = httpQueue.indexOf(model)
    if (index > -1) {
        httpQueue.splice(index, 1)
    }
    if (httpQueue.indexOf(model) === -1) {
        clearTimeout(closeTimeOut)
        setTimeout(() => {
            Bus.$emit(`${model}HideLoading`)
        }, 100)
    }
}
function clearRequest() {
    let modelArr = Array.from(new Set(httpQueue))
    for (let i = 0; i < modelArr.length; i++) {
        Bus.$emit(`${modelArr[i]}HideLoading`)
    }
    httpQueue = []
}
// http request 拦截器
axios.interceptors.request.use(
    config => {
        beforeRequest(config.headers._loading)
        if (localStorage.get('token')) {
            config.headers.common['X-Auth-Token'] = localStorage.get('token') || ''
            config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
        }
        return config;

    },
    error => {
        return Promise.reject(error);
    });

axios.interceptors.response.use(
    response => {
        afterRequest(response.config.headers._loading)
        if (response.headers['content-type'] == 'application/octet-stream'
            || response.headers['content-type'] == 'application/vnd.ms-excel;charset=UTF-8'
            && response.data.byteLength !== 'undefied') {
            return response.data
        }
        if (response.config.responseType === 'arraybuffer') {
            return response.data
        }

        // http error
        // 200 - 300 之间的都是正常响应
        if (response.status < 200 || response.status > 300
            || response.data.code === 1
            // || !response.data.businessCode
            || response.data.code === '0001'
            || response.data.businessCode === '0001') {
            Notice.error({
                desc: response && response.data && response.data.msg || '后端服务异常',
                // desc: ''
            })

            return Promise.reject(response && response.data)
        }
        // code equals 0000 and businessCode equals 0000, return data.data
        if (response.data && ((response.data.code === '0000' && response.data.businessCode === '0000')
            || response.data.code === 0)) {
            return response.data.data || response.data
        }

        // eg: file response does not have data
        return response.data
    },
    error => {
        if (axios.isCancel(error)) {
            clearRequest()
            // console.log('Request canceled')
        } else {
            // console.log('error.response.config:', error)
            afterRequest(error.response.config.headers._loading)
            if (error.response) {
                switch (error.response.status) {
                    case 401:
                      window.location.href = opRedirectUrl
                    return
                }
            }
        }
        return Promise.reject(error)
    })

export default {
    get (url, options) {
        return new Promise((resolve, reject) => {
            axios.get(url, Object.assign({}, options, {
                cancelToken: new CancelToken((c) => {
                    cancelArr.push(c)
                })
            })).then(res => {
                resolve(res)
            }).catch(e => {
                if (!axios.isCancel(e)) {
                    // Bus.$Notice.error({
                    //   title: '请求错误',
                    //   desc: e
                    // })
                    reject(e)
                }
            })
        })
    },
    post (url, data, options) {
        return new Promise((resolve, reject) => {
            axios.post(url, data, Object.assign({}, options, {
                cancelToken: new CancelToken((c) => {
                    cancelArr.push(c)
                })
            })).then(res => {
                resolve(res)
            }).catch(e => {
                if (!axios.isCancel(e)) {
                    // Bus.$Notice.error({
                    //   title: '请求错误',
                    //   desc: e
                    // })
                    reject(e)
                }
            })
        })
    },
    put (url, data, options) {
        return new Promise((resolve, reject) => {
            axios.put(url, data, Object.assign({}, options, {
                cancelToken: new CancelToken((c) => {
                    cancelArr.push(c)
                })
            })).then(res => {
                resolve(res)
            }).catch(e => {
                if (!axios.isCancel(e)) {
                    // Bus.$Notice.error({
                    //   title: '请求错误',
                    //   desc: e
                    // })
                    reject(e)
                }
            })
        })
    },
    delete (url, options) {
        return new Promise((resolve, reject) => {
            axios.delete(url, Object.assign({}, options, {
                cancelToken: new CancelToken((c) => {
                    cancelArr.push(c)
                })
            })).then(res => {
                resolve(res)
            }).catch(e => {
                if (!axios.isCancel(e)) {
                    // Bus.$Notice.error({
                    //   title: '请求错误',
                    //   desc: e
                    // })
                    reject(e)
                }
            })
        })
    },
    cancel () {
        cancelArr.map(cancel => cancel())
    }
}
