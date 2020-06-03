<!-- 功能模块 -->
<template>
   <div class="func-modal">
       <h3>1、{{textInfo.dataText.label1}}</h3>
       <Row class="row-padd">
            <Col span="5"><Input v-model="orderId1" placeholder="orderId"></Input></Col>
            <Col span="2"  offset="1"><Button type="primary" @click="getRepayCode">{{textInfo.dataText.search}}</Button></Col>
            <Col span="16">
                <div class="repaycodelist" v-for="(item,index) in oldRepayInfoList" :key="index">
                    <p class="result-area ">{{textInfo.dataText.repayCode}}:{{item.code}}</p>
                    <p class="result-area">{{textInfo.dataText.limitTime}}: {{item.expiryDate}}</p>
                </div>
            </Col>
       </Row>
       <h3>2、{{textInfo.dataText.label2}}</h3>
       <Row class="row-padd">
           <Col span="5"><Input :placeholder="textInfo.dataText.repayCode" v-model="code"></Input></Col>
           <Col span="2" offset="1"><Button type="primary" @click="getExpiryDateByCode">{{textInfo.dataText.search}}</Button></Col>
           <Col span="16"><p class="result-area">{{textInfo.dataText.limitTime}}: {{expiryDate}}</p>
           <p class="result-area">{{textInfo.dataText.orderId}}: {{orderId}}</p></Col>
       </Row>
       <h3>3、{{textInfo.dataText.label3}}</h3>
       <Row class="row-padd">
           <Col span="5"><Input placeholder="orderId" v-model="orderId2"></Input></Col>
           <Col span="2" offset="1"><Button type="primary" @click="createNewRepayCode">{{textInfo.dataText.generate}}</Button></Col>
           <Col span="16"><p class="result-area">{{textInfo.dataText.newRepayCode}}:{{newRepayInfo.code}}</p>
           <p class="result-area">{{textInfo.dataText.limitTime}}: {{newRepayInfo.expiryDate}}</p></Col>
       </Row>
       <h3 v-if="user.role == 3">4、{{textInfo.dataText.label4}}</h3>
       <Row v-if="user.role == 3" class="row-padd">
           <Col span="5"><Input placeholder="orderId" v-model="orderId4"></Input></Col>
           <Col span="5" offset="1">
                <Button type="primary" @click="handleLoansSettled">{{textInfo.dataText.LoansSettled}}</Button>
                <Button type="primary" @click="handleLoanFailed">{{textInfo.dataText.LoanFailed}}</Button>
              
           </Col>
       </Row>
       <h3 v-if="user.role == 3">5、{{textInfo.dataText.label5}}</h3>
       <Row v-if="user.role == 3" class="row-padd">
           <Col span="5"><Input placeholder="orderId1,orderId2,...." v-model="orderId5"></Input></Col>
           <Col span="5" offset="1">
                <Button type="primary" @click="handleHiddencollectionCase">{{textInfo.dataText.submit}}</Button>
           </Col>
       </Row>
   </div>
</template>
<script>
import store from '../../store/index'
import {mapState} from 'vuex'
import functionModuleApi from '../../services/api/functionalModule.service'
import localStorage from '../../services/localStorage.service'
export default {
    data () {
        return {
            textInfo: {//国际化文案
                dataText:{} 
            },
            isCanClear: true,
            orderId1: '', //根据id查询还款码
            orderId2: '', //根据id生成还款码
            orderId: '', //2、查询还款码有效期中的订单号
            orderId4: '', //4、更改订单状态
            orderId5: '',//5.隐藏催收案件
            code: '', //根据还款码查询有效期
            oldRepayInfoList: [], //还款码信息
            expiryDate: '', //根据还款码查询的有效期
            newRepayInfo: { //新的还款码信息
                code: '',
                expiryDate: ''
            },
            isSearch1: false,
            isSearch2: false,
            isCreate: false,
            isSearch4: false,
            isItem5: false,//第五项
            user: {},
        }
    },

    components: {},

    computed: {},

    methods: {
        //切换语言
        changeLanguage(){
            this.$i18n.locale = this.language
            let dataText = this.$i18n.messages[this.$i18n.locale].message.functionalModule
            this.$nextTick(()=> {
                this.textInfo = dataText
            })
        },
        //失去焦点后 输入校验
        validate(value) {
            if(!/^[\d]+$/.test(value)){
                this.$Notice.error({title: 'please enter number~'})
                return false
            }else{
                return true
            }
        },
        //根据id查询还款码
        getRepayCode() {
            if(!this.isSearch1){
                if(this.validate(this.orderId1)){
                    this.oldRepayInfoList = []
                    this.isSearch1 =  true
                    functionModuleApi.getRepayCodeById({orderId: this.orderId1}).then(res => {
                        if(res.length > 0){
                            this.$Notice.success({title: 'Successfully!'})
                            this.oldRepayInfoList = res
                        }else{
                            this.$Notice.warning({title: 'No query data ~'})
                        }
                        this.isSearch1 = false
                    })
                }
            } 
        },
        //根据还款码查询有效期
        getExpiryDateByCode() {
            if(!this.isSearch2){
                if(/^[a-zA-Z0-9]+$/.test(this.code)){
                    this.expiryDate = ''
                    this.isSearch2 = true
                    functionModuleApi.getExpiryDateByCode({code: this.code}).then(res => {
                        if(res.expiryDate){
                            this.$Notice.success({title: 'Successfully!'})
                            this.expiryDate = res.expiryDate
                            this.orderId = res.orderId
                        }else{
                            this.$Notice.warning({title: 'No query data ~'})
                        }
                        this.isSearch2 = false
                    })
                }else{
                    this.$Notice.error({title: 'please enter correct code!'})
                }  
            } 
        },
        //生成还款码
        createNewRepayCode() {
            if(!this.isCreate){
                if(this.validate(this.orderId2)){
                    this.newRepayInfo = ''
                    this.isCreate = true
                    functionModuleApi.createNewRepayCode({orderId: this.orderId2}).then(res => {
                        this.$Notice.success({title: 'Successfully!'})
                        this.newRepayInfo = res
                        this.isCreate = false
                    })
                }
            }
        },
        //贷款结清
        handleLoansSettled(){
            if(!this.isSearch4){
                if(this.validate(this.orderId4)){
                    this.isSearch4 =  true
                    functionModuleApi.updateOrder({orderId: this.orderId4,orderStatus: 7}).then(res => {
                        if(res.code == 0){
                            this.$Notice.success({title: 'Successfully!'})
                        }else{
                            this.$Notice.error({title: res.Msg})
                        }
                        this.orderId4 = ''
                        this.isSearch4 = false
                    })
                }
            } 
        },
        //放款失败
        handleLoanFailed(){
            if(!this.isSearch4){
                if(this.validate(this.orderId4)){
                    this.isSearch4 =  true
                    functionModuleApi.updateOrder({orderId: this.orderId4,orderStatus: 5}).then(res => {
                        if(res.code == 0){
                            this.$Notice.success({title: 'Successfully!'})
                        }else{
                            this.$Notice.error({title: 'error'})
                        }
                        this.orderId4 = ''
                        this.isSearch4 = false
                    })
                }
            } 
        },
        //5.隐藏催收案件
        handleHiddencollectionCase(){
            if(!this.isItem5){
                this.isItem5 =  true
                functionModuleApi.hiddencollectionCase({orderIds: this.orderId5}).then(res => {
                    if(res.code == 0){
                        this.$Notice.success({title: 'Successfully!'})
                    }else{
                        this.$Notice.error({title: 'error'})
                    }
                    this.orderId5 = ''
                    this.isItem5 = false
                })
            } 
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
        }
    },
    created() {
        this.changeLanguage()
        this.user = localStorage.get('user');
    },
    mounted () {}
}

</script>
<style lang='less' scoped>
    .func-modal{
        padding: 20px;
        h3{
            margin-top: 20px;
        }
        .row-padd{
            padding: 10px;
            .repaycodelist{
                margin-bottom: 10px!important;
            }
        }
        .input-w{
            width: 200px;
            display: inline-block;
        }
        .result-area{
            width: 240px;
            height: 30px;
            line-height: 30px;
            display: inline-block;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding-left: 10px;
            margin-left: 15px;
        }
    }
</style>