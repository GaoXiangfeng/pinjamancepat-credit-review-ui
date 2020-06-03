/**
 * Created by sunxiaoying on 2017/12/12.
 */
const msOrderListEn = {

    //订单列表页-表格-表头
    orderListTitle: [
        'Action',//操作
        'Phone Number', //电话号码
        'Order Number',//订单号
        'Create Time',//创建时间
        'Loan Amount',//借款金额
        'Loan Days',//借款天数
        'Interest Rate',//利率
        'Interest Rate Method',//计息方式
        'Order Status',//计息方式
    ],

    //表格数据
    orderTableData: {
        0: 'Check', //查看
        1: 'After the first interest rate',//先息后本
        2: 'No data' ,//'暂无数据'
        3: 'No screening data' ,//'暂无筛选数据'
    },

    //订单列表页  --搜索条件
    orderSearchItem: {
        0: 'Order Status', //订单状态
        1: 'Search Filed',//查询字段
        2: 'Search Content', //查询内容
        3: 'Create Time', //创建时间
        4: 'Search', //查询
        5: 'None' //空
    },

    //查询条件不足的提示信息
    searchPromptInfo:{
        searchError: 'Order status and query fields can not be empty at the same time！',//订单状态和查询字段不能同事为空
        contentError: 'Query content can not be empty！',//查询内容不能为空
        fieldError: 'Please select the query field！',//请选择查询字段
    },

    //订单列表页-订单状态-下拉框
    searchType: [
        {
            key: 'None', //空
            value: '-1'
        }, {
            key: 'Ticket unverified',//工单未审核
            value: '0'
        }, {
            key: 'First audit passed',//初审通过
            value: '1'
        }, {
            key: 'First audit refused',//初审拒绝
            value: '2'
        }, {
            key: 'Machine audit refused',//系统拒绝
            value: '3'
        }, {
            key: 'Machine audit passed',//系统通过
            value: '4'
        }, {
            key: 'Final audit passed',//终审通过
            value: '5'
        }, {
            key: 'Final audit refused',//终审拒绝
            value: '6'
        }, {
            key: 'Loan refused',//放款失败
            value: '7'
        }, {
            key: 'Loan successfull',//放款成功
            value: '8'
        }
    ],
    //查询字段内容
    searchField: {
        auditField: [
            {
                key: 'Hit Risk',//命中规则
                value: 'highRisk'
            }, {
                key: 'Auditor',//审核人员
                value: 'auditorName'
            }
        ],
        orderField: [
            {
                key: 'Phone Number',//电话号码
                value: 'phoneNo'
            }, {
                key: 'Order Number',//订单号
                value: 'orderId'
            }
        ]
    },

    //订单列表-列表中的订单状态
    orderStatus: {
        0: 'Unapplied orders',//未申请订单
        1: 'Applied successfully',//申请成功
        2: 'Under audit',//审核中
        3: 'Audit rejected',//审核拒绝
        4: 'Audit passed',//审核通过
        5: 'Loan failed',//放款失败
        6: 'Loan successfull',//放款成功
        7: 'Loans settled',//贷款结清
    }
}
export default msOrderListEn
