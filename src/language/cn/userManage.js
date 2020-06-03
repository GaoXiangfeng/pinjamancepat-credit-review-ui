const msUserManage = {
    modalDisplay: {
        title: '用户信息',//用户信息
        confirm: '确认',//确认
        cancel: '取消',//取消
        useName: '用户名:',//用户名
        passWord: '密码:',//密码
        auth: '权限:',//权限
    },
    authList: {
        1: '初审',//初审
        2: '终审',//终审
        3: '管理员',//管理员
    },
    operation: {
         add: '添加',//添加
         modify: '修改',//修改
         stop: '停用',//停用
         enable: '启用',//启用
    },
    columnsTitle: [
        '编号',//编号
        '账户',//账户
        '权限',//权限
        '状态',//状态
        '挂起订单数',//挂起订单数
        '创建时间',//创建时间
        '操作',//操作
    ],
    //表格数据
    orderTableData: {
        0: '查看', //查看
        1: '先息后本',//先息后本
        2: '无数据' ,//'暂无数据'
        3: '暂无筛选数据' ,//'暂无筛选数据'
        4: '两次金额输入不一致,请重新输入'
    },
}

export default msUserManage
