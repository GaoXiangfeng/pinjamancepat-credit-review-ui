const protocol = window.location.protocol
const qiniuHost = 'https://oic74zs8j.qnssl.com/'
// const opapiHost = `${protocol}//192.168.29.39:9012` //开发环境
// const opapiHost = `${protocol}//192.168.2.213:9012` //晓航开发环境
//const opapiHost = `${protocol}//101.201.238.13:9002` //测试环境
const opapiHost = `${protocol}//39.100.43.194:9002` //新测试环境
// const translateHost = `${protocol}//localhost:12001` //开发环境 本地起
const translateHost = `${protocol}//translate-dongmeifeng1.q-gp.com` //测试环境
let LoginUrl = `${protocol}/login`  // 登录页
let domain = ''

export default{
    qiniuHost,
    opapiHost,
    translateHost,
    LoginUrl,
    domain
}
