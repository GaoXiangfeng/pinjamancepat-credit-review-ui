<style>
    .upload{
        display: block;
        width:100%;
    }
    .upload-pickfiles-lists{
        width:120px;
        padding:2px;
        display:inline-block;
    }
    .xg-upload-pickfiles img{
        width:100px;
        height:100px;
    }
    .upload-container{
        display:inline-block;
        width:100px;
        height:100px;
        text-align: center;
        vertical-align: top;
        border:2px dashed #aaa;
        position: relative;
    }
    .upload-pickfiles{
        width:100px;
        height:100px;
        position: absolute;
        z-index: 10;
        top: 30px;
        left: 0;
    }
</style>
<template>
    <div class="upload" >
        <div style="margin:5px 0">
            <i-button  style="width:100px"  type="primary" :disabled="uploadurlNew.length >= max">上传图片</i-button>
        </div>
        <div class="upload-pickfiles-lists"  v-for="(item,index) in uploadurlNew">
            <div class="xg-upload-pickfiles">
                <img :src="qiniuHost+item">
            </div>
            <i-button type="error" style="width:100px" @click="del(index)">删除</i-button>
        </div>
        <div :id="container" class="upload-container" v-if="uploadurlNew.length < max">
            <div class="upload-pickfiles">
                请上传图片
            </div>
        </div>
    </div>
</template>
<script>
    import config from '../config'
    import {Notice} from 'iview'
    const opapiHost = config.opapiHost
    const qiniuHost = config.qiniuHost
    export default {
        props:{
            // 最大上传数量
            max:{
                type:Number,
                twoWay:true
            },
            // 返回的上传地址
            uploadurl:{
                type: Array,
                twoWay:true,
            },
             //拖拽区域
            container:{
                type: String,
                twoWay:false
            },
            // 多选上传
            multiple:{
                type:Boolean,
                twoWay: false
            }
        },
        data () {
            return {
                qiniuHost:qiniuHost,
                uploadurlNew: this.uploadurl
            }
        },
        watch: {
            uploadurl(val) {
                this.uploadurlNew = val;//新增result的watch，监听变更并同步到myResult上
            }
        },
        ready(){
            this.qiniu()
        },
        created () {
            // 等待DOM渲染完成后执行
            this.$nextTick(() => {
                this.qiniu()
            })
        },
        methods:{
            qiniu(){
                const self = this;
                const uploader = Qiniu.uploader({
                    runtimes: 'html5,flash,html4',    //上传模式,依次退化
                    browse_button: self.$children[0].$el,       //上传选择的点选按钮，**必需**
                    uptoken_url: opapiHost+ '/upload/getToken',            //Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
                    // uptoken : '', //若未指定uptoken_url,则必须指定 uptoken ,uptoken由其他程序生成
                    // unique_names: true, // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
                    save_key: true,   // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
                    domain: qiniuHost,   //bucket 域名，下载资源时用到，**必需**
                    get_new_uptoken: false,  //设置上传文件的时候是否每次都重新获取新的token
                    container: self.container,           //上传区域DOM ID，默认是browser_button的父元素，
                    max_file_size: '100mb',           //最大文件体积限制
                    flash_swf_url: 'js/plupload/Moxie.swf',  //引入flash,相对路径
                    max_retries: 3,                   //上传失败最大重试次数
//                    dragdrop: true,                   //开启可拖曳上传
//                    drop_element: 'container',        //拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                    chunk_size: '4mb',                //分块上传时，每片的体积
                    auto_start: true,                 //选择文件后自动上传，若关闭需要自己绑定事件触发上传
                    multi_selection:self.multiple,   //多选上传
                    filters : {
                        max_file_size : '100mb',
                        prevent_duplicates: false, //不允许选取重复文件
                        mime_types: [
                            { title : 'Image files', extensions : 'JPEG,jpg,png' }, // 限定jpg,gif,png后缀上传
                        ]
                    },
                    init: {
                        FileUploaded(up, file, info) {
                            const domain = up.getOption('domain');
                            const res = JSON.parse(info.response);
                            const sourceLink =  res.hash;
                            if(self.max === 1 && self.uploadurl.length!==0){
                                self.uploadurlNew.splice(0,1,sourceLink)
                                return
                            }
                            self.uploadurlNew.push(sourceLink);
                        },
                        Error(up, err, errTip) {
                            Notice.error({desc: err})
                            // $('table').show();
                            // const progress = new FileProgress(err.file, 'fsUploadProgress');
                            // progress.setError();
                            // progress.setStatus(errTip);
                        }
                    }
                });
            },
            del(index){
                this.uploadurlNew.splice(index, 1);
            }
        },
        mounted() {
        }
    }
</script>
