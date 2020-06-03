const msUserManage = {
    modalDisplay: {
        title: 'user information',//用户信息
        confirm: 'confirm',//确认
        cancel: 'cancel',//取消
        useName: 'user name:',//用户名
        passWord: 'password:',//密码
        auth: 'limit:',//权限
    },
    authList: {
        1: 'first review',//初审
        2: 'final review',//终审
        3: 'administrator',//管理员
    },
    operation: {
         add: 'add',//添加
         modify: 'modify',//修改
         stop: 'stop using',//停用
         enable: 'start using',//启用
    },
    columnsTitle: [
        'Serial number',//编号
        'Account',//账户
        'Limit',//权限
        'Condition',//状态
        'Number of pending orders',//挂起订单数
        'Creation time',//创建时间
        'Operation',//操作
    ],
    //表格数据
    orderTableData: {
        0: 'Check', //查看
        1: 'After the first interest rate',//先息后本
        2: 'No data' ,//'暂无数据'
        3: 'No screening data' ,//'暂无筛选数据'
    },
}

export default msUserManage
