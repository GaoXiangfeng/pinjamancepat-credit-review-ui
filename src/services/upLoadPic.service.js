/**
 * Created by sunxiaoying on 2017/7/28.
 */
import config from '../config'
const opapiHost = config.opapiHost
const qiniuHost = config.qiniuHost
export function uploadQiniu(uploadPic) {
        let vm = this
        let uploader = Qiniu.uploader({
            runtimes: 'html5,flash,html4', //上传模式,依次退化
            browse_button: uploadPic, //上传选择的点选按钮，**必需**
            uptoken_url: opapiHost + '/upload/getToken', //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            domain: qiniuHost, //bucket 域名，下载资源时用到，**必需**
            get_new_uptoken: false, //设置上传文件的时候是否每次都重新获取新的token
            max_file_size: '10mb', //最大文件体积限制
            chunk_size: '4mb', //分块上传时，每片的体积
            auto_start: true, //选择文件后自动上传，若关闭需要自己绑定事件触发上传
            filters : {
                max_file_size : '100mb',
                prevent_duplicates: false, //不允许选取重复文件
                mime_types: [
                    { title : 'Image files', extensions : 'JPEG,jpg,png' }, // 限定jpg,gif,png后缀上传
                ]
            },
            init: {
                FileUploaded(up, file, info) {
                    let res = JSON.parse(info.response);
                    let hash = res.hash;
                    console.log(hash)
                }
            }
        })
}
