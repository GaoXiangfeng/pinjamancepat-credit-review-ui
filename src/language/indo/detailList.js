const msDetailListIndo = {
    //提示文案
    promptText:{
        text1: 'Jumlah total pinjaman pengguna',//用户贷款的总次数
        text2: 'Beberapa hari terakhir pinjaman terakhir',//用户上笔贷款的逾期天数
        text3: 'Apakah transfer gagal dari pinjaman terakhir',//上笔贷款是否是放款失败
    },
    //命中规则
    hitRiskText: {
        hitRisk: 'Peraturan hit',//命中规则
        beforeReview: 'Bacalah peringatan risiko dengan teliti!!',//审核前，请仔细阅读风险提示的内容!!
        isBind: 'KTP telah digunakan, hanya bisa memilih menolak beroperasi'//该身份证已被使用，只能选择拒绝操作！！！
    },
    //订单列表-详情页
    detailCardData: [
        {
            label: 'Informasi Pesanan', //订单信息
            tab: true
        }, {
            label: 'Informasi Pengguna', //用户信息
            tab: true
        }, {
            label: 'Informasi Pemeriksaan',//审核信息
            tab: true
        }, {
            label: 'Pinjaman historis', //历史借贷
            tab: true
        }, {
            label: 'Pengambilan data',//数据爬取
            tab: true
        }
    ],
    //历史借贷
    historyLoanTitle: {
        0: '',//查看
        1: 'Nomor pesanan',//订单号
        2: 'Waktu pembuatan',//创建时间
        3: 'Hasil Periksa',//审核结果
        4: 'Batas terakhir',//结清时间
        5: 'Yang harus dikembalikan',//还款次数
        6: 'Hari keterlambatan',//逾期天数
    },
    //订单信息-标题
    orderTitle: {
        orderInfo :'Informasi Pesanan', //订单信息
        bankInfo :'Informasi Rekening Bank Peminjam', //放款银行信息
        userInfo :'Informasi Pengguna', //还款银行信息
    },

    //订单信息-订单信息
    userOrderInfo: [
        {
            label: 'Keadaan Pinjaman',//贷款状态
            key: 'orderStatus',
            value: '',//值
        }, {
            label: 'Nama Pinjaman',//贷款名称
            key: 'loanName',
            value: '',//值
        }, {
            label: 'Jumlah Uang Pinjaman',//借款金额
            key: 'principal',
            value: '',//值
        }, {
            label: 'Ongkos Prosedur',//砍头费
            key: 'interest', //
            value: '',//值
        }, {
            label: 'Jumlah Hari Pinjaman',//借款天数
            key: 'days',
            value: '',//值
        }, {
            label: 'Suku Bunga',//利率
            key: 'rate', //
            value: '',//值
        }, {
            label: 'Metode Suku Bunga',//计息方式
            key: 'rateType',
            value: '',//值
        }, {
            label: 'Waktu Mengajukan Pesanan',//申请时间
            key: 'orderTime',
            value: '',//值
        }
    ],

    //订单信息-放款银行账号
    userBankInfo: [
        {
            label: 'Nama Pemegang Kartu',//持卡人姓名
            key: 'applyUserName',
            value: '',//值
        }, {
            label: 'Nomor Identitas',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: 'Advance Ai Hasil',//风控校验账户姓名
            key: 'verifyUserName',
            value: '',//值
        }, {
            label: 'Nama Bank',//银行名称
            key: 'bankName', //
            value: '',//值
        }, {
            label: 'Rekening Bank',//银行账号
            key: 'bankAccount',
            value: '',//值
        }, {
            label: 'Pengecekan Nama',//姓名规则校验
            key: 'authStatus',
            value: '',//值
        }, {
            label: 'Saluran pembayaran',//支付渠道
            key: 'fundingName',
            value: '',//值
        }
    ],

    //银行账户姓名与申请人姓名校验 
    bankInfoMatch:{
        title: 'Nama rekening bank dan verifikasi nama pemohon',
        holderName: 'Nama rekening bank',
        applyName: 'Nama pemohon',
        matchScore: 'Skor pertandingan'
    },

    //订单信息-还款银行账号信息
    userPayInfo: [
        {
            label: 'Code Pembayaran Bank',//银行付款码
            value: ''
        }, {
            label: 'Nama Bank',//银行名称
            value: ''
        }
    ],

    //后端返回的订单详情的国际化
    //订单信息-贷款状态
    loanTypeText: {
        0: 'Pesanan yang belum diajukan',//未申请订单
        1: 'Aplikasi berhasil',//申请成功
        2: 'Sedang diperiksa',//审核中
        3: 'Sitolak pemeriksaan',//审核拒绝
        4: 'Lulus pemeriksaan',//审核通过
        5: 'Peminjaman gagal',//放款失败
        6: 'Sudah dipinjamkan',//放款成功
        7: 'Sudah dilunasi',//贷款结清
    },

    //订单详情-借款天数
    loanDay: 'hari',

    //订单详情-利率
    rate: 'Suku Bunga Harian',

    //订单详情-计息方式
    rateTypeText: {
        0: 'Bunga dulu kapital kemudian'
    },

    //放款银行账号-姓名规则校验
    nameValid: {
        0:'Tidak diverifikasi',//未校验
        1: 'Memeriksa',//校验中
        2: 'Konsisten',//一致
        3: 'Tidak konsisten'//不一致
    },

    //还款银行账号信息-为找到记录
    nonePay: 'Tidak ditemukan rekaman',

    //用户信息-四个标题-后端返回数据的文案
    userTitle: {
        //标题
        userInfo: 'Informasi Pengguna',//用户信息
        photo: 'Sertifikasi Foto',//认证照片
        callBook: 'Kontak Lokal',//本地通讯录
        emergencyPerson: 'EC',//紧急联系人
        message: 'SMS Lokal',//本地短信
        callRecord: 'Riwayat Panggilan',//通话记录
        //认证照片
        lastPhoto: 'Foto Kali Terakhir',//上次图片
        recentPhoto: 'Foto Kali Ini',//本次照片
        //button
        phone: 'omor HP',//手机号
        count: 'Frekuensi Hubungan',//联系次数
        sendOrAcceptTime: 'waktu kirim',//收发时间
        riskMessage: 'Risiko SMS',//风险短信
        callTime: 'waktu panggila',//通话时间
        callDuration: 'duriasi panggilan',//通话时长
        //短信列表返回的数据的文案
        haveRead: 'sudah dibaca',//已读
        unread: 'belum dibaca',//未读
        receive: 'diterima',//接收
        send: 'kirim',//发送
        isRisk: 'Ya',//是
        noRisk: 'Tidak',//否
        //时分秒、通话类型、通话状态
        h: 'jam',//小时
        m: 'menit',//分钟
        s: 'detik',//秒
        out:'pemanggil',//呼出
        in:'penjawab',//呼入
        reject: 'ditolak',//拒接
        no: 'tdk dijawab',//未接通
        yes: 'dijawab',//接通
        loanInfo:'Thông tin cho vay',//借款信息
        unknown: 'tidak diketahui',//未知
        powerOff: 'mati daya',//关机
        //submit
        action: 'Operasi',//操作
        rejectReason: 'Alasan Tolak',//拒绝原因
        remark: 'Kterangan',//备注
        submit: 'Aju',//提交
        //通过、拒绝操作弹框
        title:'Apakah akan menyerahkan operasi audit？',//是否提交审核操作
        auditWarning: 'Kirim persetujuan gagal, perintah kerja telah lepas!',//提交审核失败,该工单已被释放
        confirm: 'Konfirmasi',//确认
        cancel: 'Batal',//取消
        goBack: 'Kembali',//返回订单列表页
        goTop: 'Atas',//返回顶部
        loading: 'Sedang dalam peninjauan',//审核中
        //历史借贷
        createTime: 'Waktu pembuatan',//创建时间
        platformUser: 'Người dùng nền tảng',//平台用户
        validNumCount: 'Số hợp lệ',//有效号码
        invalidNumcount: 'Số không hợp lệ',//无效号码

        opera: 'Lihat',//查看
    },


    //用户信息
    userInfo: [
        {
            label: 'Nomor Telepon',//电话号码
            key: 'userPhoneNo',
            value: '',//值
        }, {
            label: 'Nama Asli',//真实姓名
            key: 'userName',
            value: '',//值
        }, {
            label: 'Nama Ibu',//母亲姓名
            key: 'motherName',
            value: '',//值
        }, {
            label: 'Jenis Kelamin',//男
            key: 'gender',
            value: '',//值
        }, {
            label: 'Nomor Identitas',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: 'Riwayat Pendidikan Resmi',//学历
            key: 'education',
            value: '',//值
        }, {
            label: 'Nomor Pajak',//税号
            key: 'taxNo',
            value: '',//值
        }, {
            label: 'Alamat Terinci',//详细地址
            key: 'deatailAddress',
            value: '',//值
        }, {
            label: 'Tujuan Pinjaman',//借款目的
            key: 'purpose',
            value: '',//值
        }, {
            label: 'Profesi',//职业
            key: 'occupation',
            value: '',//值
        }, {
            label: 'Gaji Bulanan',//月薪
            key: 'salary',
            value: '',//值
        }, {
            label: 'Hari Gajian',//发薪日
            key: 'payTime',
            value: '',//值
        }, {
            label: 'Nama Perusahaan',//公司名称
            key: 'companyName',
            value: '',//值
        }, {
            label: 'Nomor Telepon Perusahaan',//公司电话
            key: 'companyPhoneNo',
            value: '',//值
        }, {
            label: 'Alamat Perusahaan',//公司地址
            key: 'companyAddress',
            value: '',//值
        }
    ],

    //用户信息-联系人信息
    contactText: [
        {
            label: 'Nama Konta#1',//联系人姓名#1
            value: '',//值
        }, {
            label: 'Nama Konta#2',//联系人姓名#2
            value: '',//值
        }, {
            label: 'Hubungan Dengan Kontak#1',//联系人关系#1
            value: '',//值
        }, {
            label: 'Hubungan Dengan Kontak#2',//联系人关系#2
            value: '',//值
        }, {
            label: 'Nomor Telepon Kontak#1',//联系人电话#1
            value: '',//值
        }, {
            label: 'Nomor Telepon Kontak#2',//联系人电话#2
            value: '',//值
        }, {
            label: 'Jumlah Kontak#1',//联系次数#1
            value: '',//值
        }, {
            label: 'Jumlah Kontak#2',//联系次数#2
            value: '',//值
        }, {
            label: 'Người dùng nền tảng hệ 1',//平台用户#1
            value: '',//值
        }, {
            label: 'Người dùng nền tảng hệ 2',//平台用户#2
            value: '',//值
        }, 
    ],
    //是否平台用户
    isOurUser: {
        0: 'Không',
        1: 'Là/Có/Đúng',
    },

    //用户信息-table无数据的展示
    tableNoText: 'Tidak ada data',

    //用户信息-认证照片
    userPhotoTitle: {
        0: 'Foto Sisi Muka',//正面照片
        1: 'Foto Anda Memegang Kartu',//手持照片
        2: 'Foto wajah',//人脸照片
        3: 'Foto Bukti Gaji',//工资照片
        4: 'Mutasi rekening',//银行流水
        5: 'Foto Anda Memegang Kerja',//证件照片
    },
    //用户信息-紧急联系人-表头
    userEmergencyContactsTitle: {
        0: 'Nama lengkap',//姓名
        1: 'Gender',//性别
        2: 'Hubungan',//关系
        3: 'Nomor HP',//手机号
    },
    //用户信息-本地通讯录-表头
    userCallBookTitle: {
        0: 'Nama',//姓名
        1: 'Hubungan',//关系
        2: 'Nomor HP',//手机号
        3: 'Frekuensi Hubungan',//联系次数
        4: 'Pengguna platform',//平台用户
    },
    //用户信息-本地短信-表头-已读-短信类型
    userMessageTitle: {
        0: 'Nama',//姓名
        1: 'Waktu Kirim',//收发时间
        2: 'Nomor HP',//手机号
        3: 'Risiko SMS',//风险短信
        4: 'Sudah Dibaca',//已读
        5: 'Jenis SMS',//短信类型
        6: 'Isi SMS',//短信内容
    },

    //用户信息-本地通话记录-表头
    userCallRecordTitle: {
        0: 'Waktu panggilan',//通话时间
        1: 'Nama',//姓名
        2: 'Nomor HP',//手机号
        3: 'Duriasi Panggilan',//通话时长
        4: 'Jenis panggilan',//通话类型
        5: 'Keadaan panggilan',//通话状态
    },

    //用户信息-后端返回数据的对应text
    /**
     * genderText: 性别 professionText: 职业 educationText:学历  relationText: 关系 purposeText: 借款目的
     */
    genderText: {
        0: 'Perempuan',
        1: 'Lelaki'
    },
    occupationText: {
        0: 'Karyawan Swasta',//私人雇员
        1: 'Pengusaha' ,//企业家
        2: 'Karyawan Nasional' ,//国有企业员工
        3: 'Pegawai Negeri Sipil',//公务员
        4: 'Pelajar',//学生
        5: 'Polisi',//警察
        6: 'Pensiunan',//退休
        7: 'Dokter',//医生
        8: 'Pengacara',//律师
        9: 'Menganggur',//失业
        10: 'Other',//其他
    },
    educationText: {
        0: 'Sekolah Dasar',//小学
        1: 'SMP' ,//初中
        2: 'SMA' ,//高中
        3: 'Perguruan tinggi',//大专
        4: 'Universitas',//大学
        5: 'Master',//硕士
        6: 'Dr.',//博士
    },
    relationText: {
        0: 'Orang tua',//父母
        1: 'Jodoh' ,//配偶
        2: 'Anak' ,//孩子
        3: 'Kaum kerabat',//亲戚
        4: 'Sahabat',//朋友
        5: 'Teman sekerja',//同事
        6: 'Partner koperasi',//合作伙伴
        7: 'Teman sekolah',//同学

        8: 'Orang tua',//父母
        9: 'Jodoh',//配偶
        10: 'Anak',//孩子
        11: 'Kaum kerabat',//亲戚
        12: 'Lainnya',//其他
        13: 'Sahabat',//朋友
        14: 'Teman sekerja',//同事
        99: 'Perusahaan',//公司
        100: 'Saya sendiri',//本人
    },
    purposeText: {
        0: 'Kesehatan dan pengobatan',//健康医疗
        1: 'Pelunasan hutang' ,//偿还债务
        2: 'Merangkap jabatan dan memulai usaha' ,//兼职创业
        3: 'Produk digital',//数码产品
        4: 'Pendidikan dan pelatihan',//教育培训
        5: 'Kecantikan dan kosmetologi',//美容整形
        6: 'Perjalanan dan konsumsi',//旅行消费
        7: 'Mebel/dekorasi rumah',//家居／装修
        8: 'Penyewaan rumah',//租房
        9: 'Pengusahaan',//运营周转
        10: 'Pernikahan',//结婚
        11: 'Pembelian mobil',//买车
        12: 'Pembelian rumah',//买房
    },

    //审核信息表头
    auditInfoTitle: {
        0: 'Waktu Periksa',//审核时间
        1: 'Tahap',//阶段
        2: 'Hasil Periksa',//审核结果
        3: 'Nama Pemeriksa',//审核人员姓名
        4: 'Komentar Periksa'//审核意见
    },
    //后台返回是审核信息
    auditLevelText: {
        '0': 'Belum diperiksa',//未审核
        '1': 'Pemeriksaan awal',//初审
        '2': 'Pemeriksaan akhir',//终审
        '3': 'Diperiksa mesin',//机审
    },
    auditActionText: {
        '0': 'Inisialisasi',//初始化
        '1': 'Lulus pemeriksaan awal',//初审通过
        '2': 'Ditolak dalam pemeriksaa',//初审拒绝
        '3': 'Ditolak sistem',//机审拒绝
        '4': 'Diluluskan sistem',//机审通过
        '5': 'Lulus pemeriksaan akhir',//终审通过
        '6': 'Ditolak dalam pemeriksaan akhir'//终审拒绝
    },


    //最后的提交表单
    auditForm: {
        status: '2',
        rejectReason: 'Inconsistent national ID info',
        remark: ''
    },

    //拒绝原因
    rejectReason: {
        1: 'Data KTP tidak sesuai', //身份证信息不一致
        2: 'Data debitur tidak sesuai', //工作信息不一致
        3: 'Riwayat telepon tidak normal', //通话记录异常
        4: 'Data yg di berikan palsu', //提交虚假信息
        5: 'KTP dengan debitur sendiri tidak sama', //手持身份证与借款人不一致
        6: 'Nomor telepon tidak normal', //电话号码异常
        7: 'Data di kartu ATM tidak sama dengan debitur', //银行卡信息与本人不一致
        8: 'Pengembalian dana susah', //还款能力不足
        9: 'Riwayat terdapat keterlambatan', //历史还款逾期
        10: 'Banyak melakukan peminjaman online', //多头借贷
        11: 'Susah di hubungi', //难以联系
        12: 'Informasi yg tidak bagus', //负面信息
        13: 'Foto tidak sesuai', //照片有误
        14: 'kontak EC tidak normal', //紧急联系人异常
        15: 'Black list', //黑名单
        16: 'Dll', //其他
    },

    actionText: [
        {
            key: '1',
            value: 'Pass'
        }, {
            key: '2',
            value: 'Tolak'
        },
    ],
    crawDataTabTitle: {
        advance: 'Advance',
    },
    tabResult:{
        scoreTitle: 'Hasil akhir',//得分结果
        score: 'Skor akhir',//得分
        suggest: 'Saran terakhir',//最终建议
        finalResult: 'Hasil akhir',//最终结果
        finalReview: 'Audit Akhir',//最终审核
        remark: 'Catatan persetujuan',//审批备注
        pass: 'disetujui',//通过
        reject: 'tidak disetujui',//拒绝
        waitPersonReview: 'Bantuan pemeriksaan manual',//人工介入复查
        detailReport: 'Laporan terperinci',//详细报告
    },
    faceIdentification:{
        title: 'pencocokan wajah',//人脸匹配
        similarity: 'Kesamaan pencocokan',//相似度
        compareCount: 'Waktu perbandingan',//对比次数
        countTip: 'Pengguna telah memverifikasi lebih dari 10 kali dan disarankan untuk di tolakPengguna telah memverifikasi lebih dari 10 kali dan disarankan untuk di tolak',//该用户校验超过10次，建议拒绝
        reviewSuggestion: 'Saran pemeriksaan',//审核建议
    }
}

export default msDetailListIndo
