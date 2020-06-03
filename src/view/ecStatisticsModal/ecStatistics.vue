<template>
   <div class="ecstatistics">
       <Form :label-width="130" slot="title">
            <!--时间-->
            <FormItem  :label="uiDisplaySource.searchCondition.startTime" class="order-form-item order-form-date">
                <DatePicker  @on-change="timeClearForApprove" type="datetimerange" style="width: 300px" v-model="formSearch.recordTime"></DatePicker>
                <Button class="operabtn" type="primary"  @click="searchData">{{uiDisplaySource.searchCondition.search}}</Button>
            </FormItem>
        </Form>
        <div>
            <Table :row-class-name="rowClassName" :columns="columnsResult" :data="serachResult"   :no-data-text="uiDisplaySource.orderTableData[2]"></Table>
        </div>
   </div>
</template>
<script>
import store from '../../store/index'
import {mapState} from 'vuex'
import ecStatisticsApi from '../../services/api/ecStatistics.service'
import localStorage from '../../services/localStorage.service'
import moment from 'moment'
export default {
    data () {
        return {
            uiDisplaySource: {
                searchCondition: {},
                columnsTitle: [],
                orderTableData: {}
            },
            formSearch: {
                startTime: '',
                endTime: '',
                recordTime: [],
            },
            columnsResult:[//表头数据
                {
                    title: '审核人姓名',
                    key: 'auditorName',
                    width: 300,
                },{
                    title: '联系次数',
                    key: 'contactCount',
            
                },{
                    title: '接通次数',
                    key: 'connectCount',
                    
                },{
                    title: '未接通次数',
                    key: 'noConnectCount',
                    
                },
            ],
            serachResult:[], //查询结果数据 
        }
    },

    components: {},

    computed: {},

    methods: {
        //查询数据
        searchData(){
            let param = JSON.parse(JSON.stringify(this.formSearch))
            if(this.formSearch.recordTime.length > 0 &&  this.formSearch.recordTime[0]){
                param.startTime = moment(this.formSearch.recordTime[0]).format("YYYY-MM-DD HH:mm:ss")
                param.endTime = moment(this.formSearch.recordTime[1]).format("YYYY-MM-DD HH:mm:ss")
            }
            
            delete param.recordTime
            this.$store.dispatch('change_spin_show',true)
            ecStatisticsApi.getECDetailByOptions({content: JSON.stringify(param)}).then(res => {
                this.$Notice.success({title: 'Successed!'})
                this.serachResult = res
                this.$store.dispatch('change_spin_show',false)
            })
        },
        timeClearForApprove(time){
            this.formSearch.recordTime = time
            if (this.formSearch.recordTime[0] === '') {
                this.formSearch.recordTime = []
            } else {
                this.formSearch.recordTime[1] = this.formSearch.recordTime[1].replace('00:00:00','23:59:59')
            }
        },
        sortChange(column) {
            this.formSearch.sortBy = column.key || 'createTime'
            if(column.order === 'normal') column.order = 'asc'
            this.formSearch.sort = column.order && column.order.toUpperCase() || 'DESC'
            this.searchData()
        },
        //改变页码-
        changePage (page) {
            this.formSearch.pageNum = page
            this.searchData(page)
        },
        //改变每页显示数量-
        changeSize (size) {
            this.formSearch.pageSize = size
            this.searchData(1)
        },
        //切换语言
        changeLanguage(){
            this.$i18n.locale = this.language
            this.uiDisplaySource = this.$i18n.messages[this.$i18n.locale].message.ecStatistics
            this.$nextTick(()=> {
                this.columnsResult.forEach((item, j) => {
                    item.title = this.uiDisplaySource.columnsTitle[j] //表头翻译
                })
            })
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
        ...mapState({
            language: state => state.module.language
        }),
    },
    watch: {
        language() {
            this.changeLanguage()
        }
    },
    created() {
        this.changeLanguage()
    },
    mounted () {}
}

</script>
<style lang='less' scoped>
    .ecstatistics{
        padding: 20px;
        .operabtn{
            margin-left: 20px;
        }
        //隔行换色
        .ivu-table .demo-table-info-row td{
            background-color: rgb(226, 239, 250);
        }
    }
</style>
<style lang='less'>
    .ecstatistics{
        //隔行换色
        .ivu-table .demo-table-info-row td{
            background-color: rgb(226, 239, 250);
        }
        
    }
</style>
