const msTaskPanelIndo = {
    //任务面板
    taskCardData: [
        {
            label: 'Panel Tugas', //任务面板
            tab: true
        }
        // ,{
        //     label: 'Statistik Pemeriksaan' , //审核统计
        //     tab: true
        // },{
        //     label: 'Peraturan Sekarang',//当前规则
        //     tab: true
        // }
    ],

    //任务面板-列表
    taskListName: [
        'Belum Lulus Pemeriksaan Awal', //待初审
        'Belum Lulus Pemeriksaan Akhir', //待终审
        '我的订单',
    ],
    //任务面板-无剩余订单-提示信息
    noRemainingOrders: 'Tidak ada perintah yang tersisa!',//无剩余订单

    unAuth: 'Tiada hak!',//无权限

    //任务面板-审核统计-表头
    taskAuditTitle: [
        'Term Statistik', //统计项
        'Belum Lulus Pemeriksaan wal ',//待初审
        'Belum Lulus Pemeriksaan Akhir',//待终审
        'Telah Dipinjamkan Belum Dilunasi',//已放款待还清
        'Telah Ditolak',//已拒绝
        'Ditolak Dalam Pemeriksaan Awal',//初审驳回
        'Ditolak Dalam Pemeriksaan Akhir',//终审驳回
        'Telah Dilunasi',//已还清
        'Penarikan Tunai Gagal',//提现失败
        'Semua Permintaan',//所有申请
    ] ,

    taskAuditData: [
        'Hari Ini', //今日
        'Semua', //所有
    ],
}

export default msTaskPanelIndo
