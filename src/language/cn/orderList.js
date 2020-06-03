const msOrderListCn = {

    //订单列表页-表格-表头
    orderListTitle: [
        '操作',//操作
        '电话号码', //电话号码
        '订单号',//订单号
        '创建时间',//创建时间
        '借款金额',//借款金额
        '借款天数',//借款天数
        '利率',//利率
        '计息方式',//计息方式
        '订单状态',//订单状态
    ],

    //表格数据
    orderTableData: {
        0: '查看', //查看
        1: '先息后本',//先息后本
        2: '无数据' ,//'暂无数据'
        3: '暂无筛选数据' ,//'暂无筛选数据'
    },

    //订单列表页  --搜索条件
    orderSearchItem: {
        0: '订单状态', //订单状态
        1: '查询字段',//查询字段
        2: '查询内容', //查询内容
        3: '创建时间', //创建时间
        4: '查询', //查询
        5: '空', //空
    },

    //查询条件不足的提示信息
    searchPromptInfo:{
        searchError: '订单状态和查询字段不能同时为空！',
        contentError: '查询内容不能为空！',
        fieldError: '请选择查询字段！',
    },

    //订单列表页-订单状态-下拉框
    searchType: [
        {
            key: '空',
            value: '-1'
        }, {
            key: '工单未审核',
            value: '0'
        }, {
            key: '初审通过',
            value: '1'
        }, {
            key: '初审拒绝',
            value: '2'
        }, {
            key: '系统拒绝',
            value: '3'
        }, {
            key: '系统通过',
            value: '4'
        }, {
            key: '终审通过',
            value: '5'
        }, {
            key: '终审拒绝',
            value: '6'
        }, {
            key: '放款失败',
            value: '7'
        }, {
            key: '放款成功',
            value: '8'
        }
    ],
    //查询字段内容
    searchField: {
        auditField: [
            {
                key: '命中规则',
                value: 'highRisk'
            }, {
                key: '审核人员',
                value: 'auditorName'
            }
        ],
        orderField: [
            {
                key: '电话号码',
                value: 'phoneNo'
            }, {
                key: '订单号',
                value: 'orderId'
            }
        ]
    },

    //订单列表-列表中的订单状态
    orderStatus: {
        0: '未申请订单',
        1: '申请成功',
        2: '审核中',
        3: '审核拒绝',
        4: '审核通过',
        5: '放款失败',
        6: '放款成功',
        7: '贷款结清',
    }

}

export default msOrderListCn
