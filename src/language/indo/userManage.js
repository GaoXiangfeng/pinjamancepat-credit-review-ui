const msUserManage = {
    modalDisplay: {
        title: 'Informasi debitur',//用户信息
        confirm: 'konfirmasi',//确认
        cancel: 'batal',//取消
        useName: 'nama debitur:',//用户名
        passWord: 'kata sandi:',//密码
        auth: 'batasan:',//权限
    },
    authList: {
        1: 'review awal',//初审
        2: 'review akhir',//终审
        3: 'admin',//管理员
    },
    operation: {
         add: 'menambah',//添加
         modify: 'merubah',//修改
         stop: 'berhenti menggunakan',//停用
         enable: 'mulai menggunakan',//启用
    },
    columnsTitle: [
        'nomor',//编号
        'akun',//账户
        'batasan',//权限
        'keadaan',//状态
        'Jumlah pesanan yang tertunda',//挂起订单数
        'waktu membuat',//创建时间
        'operasi',//操作
    ],
    //表格数据
    orderTableData: {
        0: 'Lihat', //查看
        1: 'Bunga dulu kapital kemudian',//先息后本
        2: 'Tidak ada data' ,//'暂无数据'
        3: 'Tidak ada data screening' ,//'暂无筛选数据'
    },
}

export default msUserManage
