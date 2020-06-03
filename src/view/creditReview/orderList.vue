<template>
    <div class="orderPanel">
        <Form :label-width="130" slot="title">
            <!--订单状态-->
            <FormItem :label="orderSearchItem[0]" class="order-form-item">
                <Select v-model="form.status" @on-change="changeStatus">
                    <Option v-for="item in searchType" :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
            </FormItem>
            <!--查询字段-->
            <FormItem :label="orderSearchItem[1]" class="order-form-item">
                <Select v-model="form.field" @on-change="changeField">
                    <Option value="-1">{{orderSearchItem[5]}}</Option>
                    <Option v-if="form.status== -1 || form.status<=6" v-for="item in searchField.auditField"
                            :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                    <Option v-if="form.status== -1 || form.status>6" v-for="item in searchField.orderField"
                            :key="item.value" :value="item.value">{{item.key}}
                    </Option>
                </Select>
            </FormItem>
            <!--查询内容-->
            <FormItem :label="orderSearchItem[2]" class="order-form-item">
                <Input :disabled="form.field === 'highRisk'" v-model="form.content"
                       :placeholder="orderSearchItem[2]"></Input>
            </FormItem>
            <br>
            <!----创建时间-->
            <div class="order-form-item ivu-form-item create-time">
                <label class="ivu-form-item-label create-label">{{orderSearchItem[3]}}</label>
                <DatePicker v-model="form.time" type="datetimerange" style="width: 280px"
                            :options="timeLimit" @on-change="timeClear"></DatePicker>
            </div>
            <FormItem class="order-form-item order-button">
                <Button type="primary" icon="ios-search" @click="searchData(1)">{{orderSearchItem[4]}}</Button>
                <Button :disabled="data1.length==0" type="primary" @click="sortByCreateTime">{{orderSearchItem[3]}}
                    <Icon type="arrow-up-c" size="16" v-if="timeSort"></Icon>
                    <Icon size="16" type="arrow-down-c" v-if="!timeSort"></Icon>
                </Button>
            </FormItem>
        </Form>
        <div>
            <Table :row-class-name="rowClassName" :columns="columns1" :data="data1" :no-data-text="orderTableData[2]"></Table>
            <div style="text-align:right;margin:20px 0 40px 40px;">
                <Page :total="totalItems" :current="form.page"
                      :page-size="form.pageSize" @on-page-size-change="changeSize"
                      @on-change="changePage" size="small" show-total show-elevator show-sizer></Page>
            </div>
        </div>
    </div>
</template>
<script>
    import store from '../../store/index'
    import {mapState} from 'vuex';
    import orderListApi from '../../services/api/orderList.service'
    import moment from 'moment'
    import localStorage from  '../../services/localStorage.service'
    //import debug from 'debug';
    //const mylog = debug('app:components/PDFData')
    //import { get } from 'lodash';
    
    const getAndSet = function (name) {
        return {
            // getter
            get: function () {
                return this.$store.state.module[name];
            },
            // setter
            set: function (newValue) {
                this.$store.state.module[name] = newValue;
            }
        }
    }
    export default {
        data () {
            return {
                isMoreMinutes:'',
                divWidth: '300px',
                labelWidth: '130px',//中英 130   印尼200
                orderCardData: [],
                value: '',
                totalItems: 0,
                timeSort: false,
                columns1: [
                    {
                        title: '操作',
                        key: 'action',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'primary'
                                    },
                                    on: {
                                        click: () => {
                                            if(params.row.orderId !== 'undefined'){
                                                localStorage.set('currentOrderInfo',null)
                                                localStorage.set('currentPath','detailList')
                                                let orderId = window.btoa(window.encodeURIComponent(params.row.orderId))//加密
                                                this.$router.push({
                                                    path: `/home/taskPanel/detailList/${orderId}`,
                                                    query: {isCheck: true}
                                                })
                                            }else{
                                                this.$Notice.error({title: 'orderId  undefined!'})
                                            }
                                        }
                                    }
                                }, this.orderTableData[0])
                            ])
                        }
                    }, {
                        title: '电话号码',
                        key: 'phoneNo',
                    }, {
                        title: '订单号',
                        key: 'orderId',
                    }, {
                        title: '创建时间',
                        key: 'createTime',
                        width: 180
                    }, {
                        title: '借款金额',
                        key: 'principal',
                        render: (h, params) => {
                            return h('div', Number(params.row.principal).toFixed(0))
                        }
                    }, {
                        title: '借款天数',
                        key: 'days',
                    }, {
                        title: '利率',
                        key: 'rate',
                        render: (h, params) => {
                            return h('div', `${this.multiply(params.row.rate , 100)}%`)
                        }
                    }, {
                        title: '计息方式',
                        key: 'interestReckon',
                        width: 150,
                        render: (h, params) => {
                            return h('div', this.orderTableData[1]) //先息后本
                        }
                    }, {
                        title: '订单状态',
                        key: 'status',
                        render: (h, params) => {
                            return h('div', this.orderStatus[Number(params.row.status)]) //订单状态
                        }
                    }

                ],
                orderTableData: {},
                data1: [],
                orderSearchItem: [],
                searchType: [],
                orderStatus: [],
                searchField: {
                    auditField: [],
                    orderField: [],
                },
                timeLimit: {
                    disabledDate (date) {
                        return date && (date.valueOf() < Date.now() - 86400000 * 90 || date.valueOf() > Date.now());
                    }
                },
                searchPromptInfo: {},
                formCopy: {}
            }
        },
        methods: {
            //利率精度矫正
            multiply(arg1, arg2) { 
                var m = 0, s1 = arg1.toString(), s2 = arg2.toString(); 
                try{
                    m +=s1.split(".")[1].length
                } catch(e){} 
                try{
                    m+=s2.split(".")[1].length
                } catch(e){}  
                return Number(s1.replace(".","")) * Number(s2.replace(".","")) / Math.pow(10,m) 
            },
            //清除时间
            timeClear(time){
                this.form.time = time
                if (this.form.time[0] === '') {
                    this.form.time = []
                } else {
                    this.form.time[1] = this.form.time[1].replace('00:00:00','23:59:59')
                }
            },
            //根据创建时间排序
            sortByCreateTime(){
                this.timeSort = !this.timeSort
                this.form.sort = this.timeSort ? 'ASC' : 'DESC'
                this.searchData(1)
            },
            //订单状态决定查询字段
            changeStatus(){
                if (this.form.status !== '-1') {
                    this.form.field = '-1' //默认为空
                }
            },
            //查询字段修改后 内容默认为空
            changeField(){
                this.form.content = ''
            },
            //查询数据
            searchData(pageNo){
                /**
                 * 分情况讨论
                 * 1、status=-1：field 为highRisk\auditorName || orderId\phoneNo
                 * 2、-1<status<=6 field 为highRisk\auditorName
                 * 3、status>6 field 为orderId\phoneNo
                 **/
                this.form.page = pageNo
                let task = []
                if (this.form.field === 'highRisk') {
                    this.form.content = 1
                }
                let param = JSON.parse(JSON.stringify(this.form))

                if (this.form.time.length > 0 && this.form.time[0]) {
                    param.from = moment(this.form.time[0]).format("YYYY-MM-DD HH:mm:ss")
                    param.to = moment(this.form.time[1]).format("YYYY-MM-DD HH:mm:ss")
                }

                if (param.status === '-1') {
                    param.status = ''
                    param.field = this.form.field === '-1' ? '' : this.form.field

                    if (this.form.field === '-1') {
                        this.$Notice.error({desc: this.searchPromptInfo.searchError})
                        return
                    }
                    if (this.form.field === 'highRisk' || this.form.field === 'auditorName') {
                        if (!this.form.content) {//查询内容不能为空
                            this.$Notice.error({desc: this.searchPromptInfo.contentError})
                            return
                        }
                        task.push(orderListApi.getTicketList(param))

                    }
                    if (this.form.field === 'orderId' || this.form.field === 'phoneNo') {
                        if (!this.form.content) {//查询内容不能为空
                            this.$Notice.error({desc: this.searchPromptInfo.contentError})
                            return
                        }
                        task.push(orderListApi.getOrderList(param))
                    }
                } else if (Number(this.form.status) > -1 && Number(this.form.status) <= 6) {
                    if (this.form.content && !this.form.field) {//有查询内容  必须有查询字段
                        //查询字段不能为空
                        this.$Notice.error({desc: this.searchPromptInfo.fieldError})
                        return
                    }
                    task.push(orderListApi.getTicketList(param))
                } else {
                    if (this.form.content && !this.form.field) {
                        this.$Notice.error({desc: this.searchPromptInfo.fieldError})
                        return
                    }
                    task.push(orderListApi.getOrderList(param))
                }
                Promise.all(task).then(res => {
                    //table
                    this.columns1.forEach((item, j) => {
                        item.title = this.orderListTitle[j]
                    })
                    if (res && res[0].orderList.length === 0) {
                        this.$Notice.success({title: this.orderTableData[3]})
                        this.data1 = []
                    } else {
                        this.data1 = res && res[0].orderList
                        this.totalItems = res && res[0].pageDTO && Number(res[0].pageDTO.totalNum)
                    }

                    if (this.form.field === 'highRisk') this.form.content = ''

                    //let _result = this._.get(res[0],'pageDTO.totalPageNum')
                    //console.log(_result)
                })
            },
//            //校验电话号码
//            checkValue(){
//                if (this.select === '1') return
//                let pattern = /^08[0-9]{8,11}$/
//                if (!pattern.test(this.value)) {
//                    this.$Notice.error({title: '请输入10-13位正确的手机号哟~'})
//                }
//            },
            changeLanguage(){
                this.$i18n.locale = this.language
                let tabsArr = this.$i18n.messages[this.$i18n.locale].message.orderList
                document.querySelector('.create-time').style.width = this.language === 'indo' ? '485px' : '410px'
                document.querySelector('.create-label').style.width = this.language === 'indo' ? '200px' : '130px'
                //tabs
                this.orderCardData = tabsArr.orderCardData

                //search
                this.orderSearchItem = tabsArr.orderSearchItem //搜索条件
                this.orderListTitle = tabsArr.orderListTitle //表头
                this.orderTableData = tabsArr.orderTableData  //查看、先息后本、无数据
                this.searchPromptInfo = tabsArr.searchPromptInfo //查询条件不足的提示语
                this.searchType = []
                this.orderStatus = []
                this.searchField = {}

                setTimeout(() => {
                    this.searchType = tabsArr.searchType
                    this.orderStatus = tabsArr.orderStatus
                    this.searchField = tabsArr.searchField
                    if(this.formCopy.status){
                        this.form = this.formCopy
                    }
                    if (this.form.status !== '-1' && this.form.field !== '-1') {
                        this.searchData(this.form.page) //为了保持当前有数据的情况下切换语言  依然是当前列表
                    } else {
                        //table
                        this.columns1.forEach((item, j) => {
                            item.title = this.orderListTitle[j] //表头翻译
                        })
                    }
                }, 100)
            },
            //改变页码-
            changePage (page) {
                this.form.page = page
                this.searchData(page)
            },
            //改变每页显示数量-
            changeSize (size) {
                this.form.pageSize = size
                this.searchData(1)
            },
            //table隔行换色
            rowClassName (row, index) {
                if (index%2 == 1) {
                    return 'demo-table-info-row';
                } 
                return '';
            }
        },
        computed: {
            language: getAndSet('language'),
            form: getAndSet('form')
        },
        watch: {
            language: function () {
                this.formCopy = JSON.parse(JSON.stringify(this.form))
                this.changeLanguage()
            }
        },
        mounted(){
            this.changeLanguage()
            if (this.$route.query.isSearch) {
                if (this.form.status !== -1 && this.form.field !== -1) {
                    this.searchData(this.form.page)
                }
            }
            //debug.log('log');
        }

    }
</script>
<style lang="less">
    .orderPanel {
        margin: 10px;
        .order-form-item {
            width: 330px;
            display: inline-block;
            margin-bottom: 10px;
            margin-right: 15px;
        }
        .order-button {
            display: inline-block;
            width: 450px;
        }
        .ivu-table th {
            text-align: center;
            white-space: nowrap;
        }
        .ivu-table td {
            text-align: center;
        }
        .ivu-table-cell {
            padding: 5px 0;
        }

    }
    .ivu-btn-primary {
        background-color: #346f9b;
        border-color:  #346f9b;
}

</style>
<style lang='less'>
    .orderPanel{
        //隔行换色
        .ivu-table .demo-table-info-row td{
            background-color: rgb(226, 239, 250);
        }
        
    }
</style>