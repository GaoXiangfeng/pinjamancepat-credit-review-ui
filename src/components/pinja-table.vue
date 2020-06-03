<template>
    <Card class="detail-card">
        <p slot="title" v-if="title" class="title-label">{{title}}</p>
        <div class="user-info">
            <Row v-if="isHaveData">
                <Col :span="isSingle.indexOf(index)!=-1?24:12" v-for="(item,index) in tableInfor" :key="index"
                     class="user-col">
                    <span class="info-label" :class="{'address':isSingle.indexOf(index)!=-1}">{{item.label}}:</span>
                    <span class="info-value">
                        <Strong :class="{isInfo: item.color && item.color === 'info' && isSuccess  === 0,
                            isWarning:item.color && item.color === 'warning' && isSuccess  === 1,
                            isOk:item.color && item.color === 'success' && isSuccess  === 2,
                            isError:item.color && item.color === 'error' && isSuccess  === 3
                            }" style="word-break: break-all;">{{item.value}}</Strong>
                    </span>
                </Col>
            </Row>
            <Row v-if="!isHaveData">
                <Col class="user-col">
                {{noDataText}}</Col>
            </Row>
            <Row>
                <slot name="otherInfo"></slot>
            </Row>
        </div>
    </Card>
</template>
<script>
    export default {
        name: 'pinja-table',
        props: {
            isSingle: {//单行显示的项
                type: [String, Array],
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            tableInfor: {
                type: Array,
                default (){
                    return [
//                        {
//                            label: '贷款状态',//贷款状态
//                            key: 'orderStatus',
//                            value: '审核中',//值
//                            color: 'info'
//                        }, {
//                            label: '贷款名称',//贷款名称
//                            key: 'loanName',
//                            value: 'sss',//值
//                        }, {
//                            label: '借款金额',//借款金额
//                            key: 'principal',
//                            value: '120000',//值
//                        }, {
//                            label: '砍头费',//砍头费
//                            key: 'interest', //
//                            value: '4200',//值
//                        }, {
//                            label: '借款天数',//借款天数
//                            key: 'days',
//                            value: '14',//值
//                        }, {
//                            label: '利率',//利率
//                            key: 'rate', //
//                            value: '1%',//值
//                        }, {
//                            label: '计息方式',//计息方式
//                            key: 'rateType',
//                            value: '先息后本',//值
//                        }, {
//                            label: '申请时间',//申请时间
//                            key: 'orderTime',
//                            value: '2018-01-23',//值
//                        }
                    ]
                }
            },
            isSuccess: {
                type: Number,
                default: -1
            },
            isHaveData: {
                type: Boolean,
                default: true
            },
            noDataText: {
                type: String,
                default: '未找到记录'
            }
        },
        data () {
            return {}
        },
        methods: {},
    }
</script>
<style lang="less">
    .detail-card {
        margin-bottom: 5px;
        .title-label {
            /*font-size: 18px;*/
        }
        .user-info {
            padding-left: 15px;
            .user-col {
                margin-bottom: 20px;
                height: 15px;
                .info-label {
                    text-align: right;
                    width: 36%;
                    display: inline-block;
                    // word-wrap: break-word;
                    // word-break: normal;
                    white-space:nowrap;
                }
                .address {
                    width: 18%;
                }
                .info-value {
                    margin-left: 20px;
                    word-wrap: break-word;
                    word-break: break-all;
                    .isOk {
                        border: 1px solid #2ed272;
                        border-radius: 5px;
                        color: #2ed272;
                        padding: 5px;
                    }

                    .isError {
                        border: 1px solid #ff4b58;
                        border-radius: 5px;
                        color: #ff4b58;
                        padding: 5px;
                    }

                    .isInfo {
                        border: 1px solid #2d8cf0;
                        border-radius: 5px;
                        color: #2d8cf0;
                        padding: 5px;
                    }

                    .isWarning {
                        border: 1px solid #ecc23d;
                        border-radius: 5px;
                        color: #ecc23d;
                        padding: 5px;
                    }
                }
            }
        }
    }
</style>
