const protocol = window.location.protocol
const qiniuHost = 'https://oic74zs8j.qnssl.com/'
const opapiHost = `${protocol}//pinjaman-audit.creditpinjam.com` //线上环境
const translateHost = `${protocol}//pinjaman-translate.creditpinjam.com` //线上环境
let LoginUrl = `${protocol}/login`  // 登录页
let domain = ''

export default{
    qiniuHost,
    opapiHost,
    translateHost,
    LoginUrl,
    domain
}
