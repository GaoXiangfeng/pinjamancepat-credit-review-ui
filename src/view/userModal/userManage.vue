<template>
    <div class="userManage">
        <div class="operation">
            <Button type="primary" @click="handleAdd">{{uiDisplaySource.operation.add}}</Button>
        </div>
        <div>
            <Table :row-class-name="rowClassName" :columns="columns" :data="dataSource" :no-data-text="uiDisplaySource.orderTableData[2]"></Table>
            <div style="text-align:right;margin:20px 20px 40px 40px;">
                <Page :total="totalItems" :current="form.pageNum"
                      :page-size="form.pageSize" @on-page-size-change="changeSize"
                      @on-change="changePage" size="small" show-total show-elevator show-sizer></Page>
            </div>
        </div>

        <!--修改对话框-->
        <Modal v-model="showModal" width="500" :closable="false" :mask-closable="false">
            <p slot="header" style="text-align:center;font-size:15px;font-weight:600;">
            <span >{{uiDisplaySource.modalDisplay.title}}</span>
            </p>
            <div style="height: 200px;text-align:left;">
                <Form :label-width="150">
                    <FormItem style="margin:5px 5px 5px 0;" :label="uiDisplaySource.modalDisplay.useName">
                        <Input :maxlength="authNameMaxlength" v-model="formUserInfo.auditorName" style="width: 250px"></Input>
                    </FormItem>
                    <FormItem style="margin:5px 5px 5px 0;" :label="uiDisplaySource.modalDisplay.passWord">
                        <Input :maxlength="passwordMaxlegth" v-model="formUserInfo.password" @on-change="handlePassWordChan" style="width: 250px"></Input>
                    </FormItem>
                    <FormItem   style="margin:5px 5px 5px 0;" :label="uiDisplaySource.modalDisplay.auth" >
                        <RadioGroup  v-model="formUserInfo.role">
                            <Radio :disabled="!isAddOrModify" v-for="auth in authList" :key="auth" :value="auth" :label="auth">{{uiDisplaySource.authList[auth]}}</Radio>
                        </RadioGroup>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button :loading="modalLoading" type="primary" @click="handleConfirm">{{uiDisplaySource.modalDisplay.confirm}}</Button>
                <Button type="primary" @click="handleCancel">{{uiDisplaySource.modalDisplay.cancel}}</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    const DEFAULT_AUTH = '1'

    import store from '../../store/index'
    import {mapState} from 'vuex';
    import userManageApi from '../../services/api/userManage.service'
    import moment from 'moment'
    import localStorage from  '../../services/localStorage.service'
    export default {
        data () {
            return {
                isAddOrModify: true,//true 为add，false为modify
                showModal: false,
                modalLoading: false,
                authNameMaxlength: 20,
                passwordMaxlegth: 35,
                uiDisplaySource: {
                    modalDisplay: {},
                    authList: {},
                    operation: {},
                    columnsTitle: [],
                    orderTableData: {},
                },
                dataSource: [],
                totalItems: 0,
                form: {
                    pageNum: 1,
                    pageSize: 10,
                },
                formUserInfo: {
                    auditorId: '',
                    auditorName: '',
                    password: '',
                    role: DEFAULT_AUTH,
                    changePassWord: 0,
                },
                authList: ['1','2','3'],
                columns: [
                     {
                        title: '编号',
                        width: 80,
                        render: (h, params) => {
                            return h('div', params.row._index + 1)
                        }
                    }, {
                        title: '账户',
                        key: 'name',
                    }, {
                        title: '权限',
                        key: 'role',
                        width: 180,
                        render: (h, params) => {
                            return h('div', this.uiDisplaySource.authList[params.row.role])
                        }
                    }, {
                        title: '状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div', params.row.status == 0 ? this.uiDisplaySource.operation.stop : this.uiDisplaySource.operation.enable)
                        }
                    },{
                        title: '挂起订单数',
                        key: 'hangTicketCount',
                    }, {
                        title: '创建时间',
                        key: 'createTime',
                        width: 180,
                        render: (h, params) => {
                            return h('div', this.timeFormat(params.row.createTime))
                        }
                    },{
                        title: '操作',
                        render: (h, params) => {
                            let _btnType,_btnTitle,_toStatus
                            if (params.row.status == 1) {//1:开启, 0：停用
                                _btnType = 'error'
                                _btnTitle = this.uiDisplaySource.operation.stop
                                _toStatus = 0
                            } else {
                                _btnType = 'success'
                                _btnTitle = this.uiDisplaySource.operation.enable
                                _toStatus = 1
                            }
                            return h('div', [
                                h('Button', { //修改
                                    props: {
                                        size: 'large',
                                        type: 'primary'
                                    },
                                    style: {
                                        marginRight: '5px',
                                    },
                                    on: {
                                        click: () => {
                                            this.handleModify( params.row.id )
                                        }
                                    }
                                }, this.uiDisplaySource.operation.modify),
                                h('Button', { //启用 停用
                                    props: {
                                        size: 'large',
                                        type: _btnType
                                    },
                                    on: {
                                        click: () => {
                                            this.handleUpdateStatus(params.row.id,_toStatus)
                                        }
                                    }
                                }, _btnTitle),
                            ])
                        }
                    },
                ],
            }
        },
        methods: {
            changeSize(size){
                this.form.pageSize = size
                this.searchData(1)
            },
            changePage(page){
                this.form.pageNum = page
                this.searchData(page)
            },
            //查询数据
            searchData(pageNo){
                let param = JSON.parse(JSON.stringify(this.form))
                userManageApi.getAccountList({content: JSON.stringify(param)}).then(res => {
                    if(res){
                        this.dataSource = res.auditorList

                        this.totalItems = res.pageDTO.totalNum
                    }
                })
            },
            //修改
            handleModify(auditorId){
                this.isAddOrModify = false
                this.formUserInfo = {
                    auditorId: '',
                    auditorName: '',
                    password: '',
                    role: DEFAULT_AUTH,
                    changePassWord: 0,
                }
                userManageApi.getAuditorDetailById({auditorId: auditorId}).then(res => {
                    if(res){
                        this.formUserInfo.auditorId = res.id
                        this.formUserInfo.auditorName = res.name
                        this.formUserInfo.password = res.password
                        this.formUserInfo.role = res.role
                    }
                })
                this.showModal = true
            },
            //更改状态
            handleUpdateStatus(auditorId,toStatus){
                userManageApi.updateAuditorStatus({auditorId: auditorId,status: toStatus}).then(res => {
                     this.$Notice.success({desc: 'Success!'})
                    this.searchData(1)
                })  
            },
            handleAdd(){
                this.showModal = true
                this.isAddOrModify = true
                this.formUserInfo = {
                    auditorId: '',
                    auditorName: '',
                    password: '',
                    role: DEFAULT_AUTH,
                    changePassWord: 0,
                }
            },
            //密码变更
            handlePassWordChan(){
                this.formUserInfo.changePassWord = 1
            },
            trim(str){    
                return str.replace(/(^\s*)|(\s*$)/g, "");    
            }, 
            //提交表单
            handleConfirm(){
                let param = JSON.parse(JSON.stringify(this.formUserInfo))
                param.auditorName = this.trim(param.auditorName)
                param.password = this.trim(param.password)
                if(param.auditorName == '' || param.password == ''){
                    this.$Notice.error({desc: 'Username or password cannot be empty!'})
                    return
                }
                
                this.modalLoading = true
                if(this.isAddOrModify){ //添加
                    delete param.auditorId
                    delete param.changePassWord
                    //加密密码
                    param.password = window.btoa(param.password)
                    userManageApi.addUserInfo(param).then(res => {
                        this.showModal = false
                        this.$Notice.success({desc: 'Success!'})
                        this.searchData(1)
                    })
                }else{ //修改
                    if(param.changePassWord && param.changePassWord == 1){
                        //加密密码
                        param.password = window.btoa(param.password)
                    }
                    userManageApi.updateAuditorDetailById(param).then(res => {
                        this.showModal = false
                        this.$Notice.success({desc: 'Success!'})
                        this.searchData(1)
                    })
                }
                
            },
            handleCancel(){
                this.showModal = false
            },
            //获取角色列表
            getAuthList(){
                userManageApi.getPermissionList().then(res => {
                    if(res){
                        this.authList = res
                    }
                })
            },
            changeLanguage(){
                this.$i18n.locale = this.language
                this.uiDisplaySource = this.$i18n.messages[this.$i18n.locale].message.userManage
                setTimeout(() => {
                    this.columns.forEach((item, j) => {
                        item.title = this.uiDisplaySource.columnsTitle[j] //表头翻译
                    })
                }, 100)
            },
            //时间格式化
            timeFormat(time){
                return moment(time).format('YYYY-MM-DD HH:mm:ss')
            },
            //table隔行换色
            rowClassName (row, index) {
                if (index%2 == 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            },
        },
        computed: {
            ...mapState({
                language: state => state.module.language
            }),
        },
        watch: {
            language() {
                this.changeLanguage()
            },
            showModal(newVal){
                if(newVal){
                    this.formUserInfo.changePassWord = 0
                }else{
                    this.modalLoading = false
                }
            }
        },
        mounted(){
            this.searchData(1)
            this.getAuthList()
        },
        created() {
            this.changeLanguage()
        },

    }
</script>
<style lang="less" scoped>
    .userManage {
        .operation{
            margin: 10px;
            text-align: right;
        }
    }

</style>
<style lang='less'>
    .userManage{
        //隔行换色
        .ivu-table .demo-table-info-row td{
            background-color: rgb(226, 239, 250);
        }
    }
</style>