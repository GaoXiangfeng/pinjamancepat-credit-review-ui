<template>
    <div class="taskPanel">
        <Tabs type="card" closable @on-tab-remove="handleTabRemove">
            <TabPane :label="taskCardData[0].label" v-if="taskCardData[0].tab">
                <ul class="task-ui">
                    <li :class="{disabled: role == 2 || taskList[0].allUnAuditCounts === 'loading',color0 :true}" @click="goToAudit(0)">
                        <a>
                            <span class="text">{{taskList[0].name}}</span><br>
                            <span>
                                <strong class="num">{{taskList[0].allUnAuditCounts}}</strong>
                            </span>
                        </a>
                    </li>
                    <li class="hide task1" v-if="role==2 || taskList[0].allUnAuditCounts === 'loading'" @click="isAuth(0)"></li>
                    <li :class="{disabled: role == 1 || taskList[1].allUnAuditCounts === 'loading',color1 :true}" @click="goToAudit(1)">
                        <a>
                            <span class="text">{{taskList[1].name}}</span><br>
                            <span>
                                <strong class="num">{{taskList[1].allUnAuditCounts}}</strong>
                            </span>
                        </a>
                    </li>
                    <li class="hide task2" v-if="role==1 || taskList[1].allUnAuditCounts === 'loading'" @click="isAuth(1)" ></li>
                    <!--我的案件-->
                    <li :class="{disabled: taskList[2].allUnAuditCounts === 'loading' || taskList[2].allUnAuditCounts== 0,color3 :true}" @click="goToHang()">
                        <a>
                            <span class="text">{{taskList[2].name}}</span><br>
                            <span>
                                <strong class="num">{{taskList[2].allUnAuditCounts}}</strong>
                            </span>
                        </a>
                    </li>
                </ul>
            </TabPane>
            <TabPane :label="taskCardData[1].label" v-if="taskCardData[1]&&taskCardData[1].tab">
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import colTable from '../../components/column-table.vue'
    import taskPanelApi from '../../services/api/taskPanel.service'
    import localStorage from '../../services/localStorage.service'
    import {mapState} from 'vuex';
    export default {
        data () {
            return {
                tab0: true,
                tab1: true,
                tab2: true,
                taskCardData: [],
                taskList: [
                    {
                        name: '待初审',
                        key: 'pre',
                        allUnAuditCounts: 'loading',
                        allCounts: 0,
                    }, {
                        name: '待终审',
                        key: 'final',
                        allUnAuditCounts: 'loading',
                        allCounts: 0,
                    }, {
                        name: '我的案件',
                        key: 'myTickets',
                        allUnAuditCounts: 'loading',
                        allCounts: 0,
                    }
                ],
                noRemainingOrders: '',
                unAuth: '',
                role: 1
            }
        },
        components: {
            colTable
        },
        computed: {
            ...mapState({
                language: state=> state.module.language
            })
        },
        methods: {
            //删除标签
            handleTabRemove (name) {
                this.taskCardData[name].tab = false;
            },
            //切换语言
            changeLanguage(){
                this.$i18n.locale = this.language
                let tabsArr = this.$i18n.messages[this.$i18n.locale].message.taskPanel
                //标签卡
                this.taskCardData = tabsArr.taskCardData
                //待初审、待终审
                this.taskList.forEach((item, i) => {
                    item.name = tabsArr.taskListName[i]
                })
                //无剩余订单提示
                this.noRemainingOrders = tabsArr.noRemainingOrders
                //非法请求提示
                this.unAuth = tabsArr.unAuth

            },
            //获取工单数
            getOrderCount(){
                taskPanelApi.orderCount().then(res => {
                    for (let item of this.taskList) {
                        item.allUnAuditCounts = res[item.key].allUnAuditCounts
                    }
                })
            },
            //防止无权限的人点击
            isAuth(index){
                //双层判断权限
                if(this.role === '1' && index === 1){//角色是初审、点击了终审工单的获取
                    this.$Notice.error({title: this.unAuth})
                }
                if(this.role === '2' && index === 0){
                    this.$Notice.error({title: this.unAuth})//角色是终审、点击了初审工单的获取
                }
            },
            //跳转到待初审的 列表
            goToAudit(index){
                let ticketId = '' //工单id
                let orderId = '' // 订单id
                let auditorName = '' //当前工单的所属人员
                let count = 0 //当前用户所领取的工单数目
                let currentPath = ''
                let task = []
                let type = 0 //默认初审
                //双层判断权限
                if(this.role === '1' && index === 1){//角色是初审、点击了终审工单的获取
                    this.$Notice.error({title: this.unAuth})
                    return
                }
                if(this.role === '2' && index === 0){
                    this.$Notice.error({title: this.unAuth})//角色是终审、点击了初审工单的获取
                    return
                }
                index === 0 ? task.push(taskPanelApi.preAudit()) : task.push(taskPanelApi.finalAudit())
                Promise.all(task).then(res => {
                    if (JSON.stringify(res[0]) === '{}') {//判断空对象
                        this.$Notice.warning({'title': this.noRemainingOrders})
                        return
                    }
                    ticketId = res[0].ticketId
                    orderId = res[0].orderId
                    auditorName =  res[0].auditorName
                    count = res[0].count
                    currentPath = 'detailList'
                    type = res[0].type
                    //将三级面包屑存入store
                    this.$store.commit('CHANGE_THIRD_BREAD', orderId)
                    //二级面包屑存入store \ localstorage
                    localStorage.set('currentPath',currentPath)
                    let param = `ticketId=${ticketId}&type=${type}&auditorName=${auditorName}&count=${count}&index=${type}`
                    param = window.btoa(window.encodeURIComponent(param))//加密
                    //记录当前操作的订单信息
                    localStorage.set('currentOrderInfo',param)
                    
                    orderId = window.btoa(window.encodeURIComponent(orderId))//加密
                    this.$router.push(
                        {
                            path: `/home/taskPanel/detailList/${orderId}`,
                            query: {param:param} //加密
                        })
                })
            },
            //进入挂起订单
            goToHang(){
                let ticketId = '' //工单id
                let orderId = '' // 订单id
                let auditorName = '' //当前工单的所属人员
                let count = 0 //当前用户所领取的工单数目
                let currentPath = ''
                let task = []
                let type = 0 //默认初审

                taskPanelApi.myTickets().then(res => {
                    ticketId = res.ticketId
                    orderId = res.orderId
                    auditorName =  res.auditorName
                    count = res.count
                    currentPath = 'detailList'
                    type = res.type
                    //将三级面包屑存入store
                    this.$store.commit('CHANGE_THIRD_BREAD', orderId)
                    //二级面包屑存入store \ localstorage
                    localStorage.set('currentPath',currentPath)
                    let param = `ticketId=${ticketId}&type=${type}&auditorName=${auditorName}&count=${count}&index=3`
                    param = window.btoa(window.encodeURIComponent(param))//加密
                    //记录当前操作的订单信息
                    localStorage.set('currentOrderInfo',param)

                    orderId = window.btoa(window.encodeURIComponent(orderId))//加密
                    
                    this.$router.push(
                        {
                            path: `/home/taskPanel/detailList/${orderId}`,
                            query: {param:param} //加密
                        })
                })
            }
        },
        watch: {
            language: function () {
                this.changeLanguage()
            }
        },
        created() {
            this.changeLanguage()
        },
        mounted(){
            this.getOrderCount()
            //获取用户权限
            let user = localStorage.get('user')
            if (user && user.role) {
                this.role = user.role
            }
            //如果第一次登录 刷新页面  获取新的nav
            let query = this.$route.query
            if(query && query.isFirst){
                this.$router.replace('/home/taskPanel')
                location.reload()
            }
        }

    }
</script>
<style lang="less">
    .taskPanel {
        margin: 20px;
        .task-ui {
            position: relative;
            .disabled {
                pointer-events: none;
            }
            .color0 {
                background-color: #0d92c2;
            }
            .color1 {
                background-color: #00bc4e;
            }
            .color3 {
                background-color: #d19240;
            }
            li.hide {
                background-color: #ddd;
                width: 300px;
                position: absolute;
                height: 300px;
                opacity: 0.5;
                z-index: 1;
            }
            li.task1 {
                left: 0;
            }
            li.task2 {
                left: 323px;
            }
            li {
                width: 300px;
                height: 300px;
                border-radius: 5%;
                text-align: center;
                vertical-align: middle;
                padding-top: 90px;
                display: inline-block;
                margin:10px 20px 0 0;
                .text {
                    font-size: 16px;
                    color: #fff;
                    font-weight: bold;
                }
                .num {
                    font-size: 80px;
                    color: #fff;
                }
            }
        }
        .dirFinAudit{
            margin-top: 20px;
            .title{
                margin-bottom: 10px;
            }
        }
        .ivu-table td.table-info-column {
            background-color: #fe6c0f;
            color: #fff;
        }
        .ivu-table td.table-success-column {
            background-color: green;
            color: #fff;
        }
        .ivu-table td.table-error-column {
            background-color: red;
            color: #fff;
        }
    }
    
    .ivu-table th {
        text-align: center;
        white-space: nowrap;
    }

    .ivu-table td {
        text-align: center;
    }
    .ivu-btn-primary {
    background-color: #346f9b;
    border-color:  #346f9b;
}

</style>
