const msTaskPanelEn = {
    //任务面板
    taskCardData: [
        {
            label: 'Task panel', //任务面板
            tab: true
        }
        // ,{
        //     label: 'Audit tatistics' , //审核统计
        //     tab: true
        // }
    ],

    //任务面板-列表
    taskListName: [
        'To Be First Review', //待初审
        'To Be Final Review', //待终审
        'My Order', //我的案件
    ],

    //任务面板-无剩余订单-提示信息
    noRemainingOrders: 'No remaining orders!',//无剩余订单

    unAuth: 'Unauthorized!',//无权限

    //任务面板-审核统计-表头
    taskAuditTitle: [
        'Statistics Item', //统计项
        'To Be First Review',//待初审
        'To Be Final Review',//待种审
        'Loans Have To Be Paid Off',//已放款待还清
        'Rejected',//已拒绝
        'First Review Dismissed',//初审驳回
        'Final Review Dismissed',//终审驳回
        'Paid Off',//已还清
        'Failed To Mention Cash',//提现失败
        'All pplications',//所有申请
    ] ,
    taskAuditData: [
        'Today', //今日
        'All', //所有
    ],

}

export default msTaskPanelEn
