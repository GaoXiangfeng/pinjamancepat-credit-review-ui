const msDetailListCn = {
    //提示文案
    promptText:{
        text1: '用户贷款的总次数',//用户贷款的总次数
        text2: '用户上笔贷款的逾期天数',//用户上笔贷款的逾期天数
        text3: '上笔贷款是否是放款失败',//上笔贷款是否是放款失败
    },
    //命中规则
    hitRiskText: {
        hitRisk: '命中规则',
        beforeReview: '审核前，请仔细阅读风险提示的内容!!',
        isBind: '该身份证已被使用，只能选择拒绝操作！！！'
    },
    //订单列表-详情页
    detailCardData: [
        {
            label: '订单信息', //订单信息
            tab: true
        }, {
            label: '用户信息', //用户信息
            tab: true
        }, {
            label: '审核信息',//审核信息
            tab: true   
        }, {
            label: '历史借贷', //历史借贷
            tab: true
        }, {
            label: '数据爬取',//数据爬取
            tab: true
        }
    ],
    //历史借贷
    historyLoanTitle: {
        0: '',//查看
        1: '订单号',//订单号
        2: '创建时间',//创建时间
        3: '审核结果',//审核结果
        4: '结清时间',//结清时间
        5: '还款次数',//还款次数
        6: '逾期天数',//逾期天数
    },

    //订单信息-标题
    orderTitle: {
        orderInfo: '订单信息', //订单信息
        bankInfo: '放款银行账号信息', //放款银行信息
        repayBankInfo: '还款银行账号信息', //还款银行信息
    },

    //订单信息-订单信息
    userOrderInfo: [
        {
            label: '贷款状态',//贷款状态
            key: 'orderStatus',
            value: '',//值
        }, {
            label: '贷款名称',//贷款名称
            key: 'loanName',
            value: '',//值
        }, {
            label: '借款金额',//借款金额
            key: 'principal',
            value: '',//值
        }, {
            label: '砍头费',//砍头费
            key: 'interest', //
            value: '',//值
        }, {
            label: '借款天数',//借款天数
            key: 'days',
            value: '',//值
        }, {
            label: '利率',//利率
            key: 'rate', //
            value: '',//值
        }, {
            label: '计息方式',//计息方式
            key: 'rateType',
            value: '',//值
        }, {
            label: '申请时间',//申请时间
            key: 'orderTime',
            value: '',//值
        }
    ],

    //订单信息-放款银行账号
    userBankInfo: [
        {
            label: '持卡人姓名',//持卡人姓名
            key: 'applyUserName',
            value: '',//值
        }, {
            label: '身份证号',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: '风控校验账户姓名',//风控校验账户姓名
            key: 'verifyUserName',
            value: '',//值
        }, {
            label: '银行名称',//银行名称
            key: 'bankName', //
            value: '',//值
        }, {
            label: '银行账号',//银行账号
            key: 'bankAccount',
            value: '',//值
        }, {
            label: '姓名规则校验',//姓名规则校验
            key: 'authStatus',
            value: '',//值
        }, {
            label: '支付渠道',//支付渠道
            key: 'fundingName',
            value: '',//值
        }
    ],
    //银行账户姓名与申请人姓名校验 
    bankInfoMatch:{
        title: '银行账户姓名与申请人姓名校验',
        holderName: '银行账户姓名',
        applyName: '申请人姓名',
        matchScore: '匹配分数'
    },
    //订单信息-还款银行账号信息
    userPayInfo: [
        {
            label: '银行付款码',//银行付款码
            value: ''
        }, {
            label: '银行名称',//银行名称
            value: ''
        }
    ],

    //后端返回的订单详情的国际化
    //订单信息-贷款状态
    loanTypeText: {
        0: '未申请订单',
        1: '申请成功',
        2: '审核中',
        3: '审核拒绝',
        4: '审核通过',
        5: '放款失败',
        6: '放款成功',
        7: '贷款结清',
    },

    //订单详情-借款天数
    loanDay: '天',

    //订单详情-利率
    rate: '日息',

    //订单详情-计息方式
    rateTypeText: {
        0: '先息后本'
    },

    //放款银行账号-姓名规则校验
    nameValid: {
        0:'未校验',
        1: '校验中',
        2: '一致',
        3: '不一致'
    },

    //还款银行账号信息-为找到记录
    nonePay: '未找到记录',


    //用户信息-四个标题-后端返回数据的文案
    userTitle: {
        //标题
        userInfo: '用户信息',//用户信息
        photo: '认证照片',//认证照片
        callBook: '本地通讯录',//本地通讯录
        emergencyPerson: '紧急联系人',//紧急联系人
        message: '本地短信',//本地短信
        callRecord: '通话记录',//通话记录
        //认证照片
        lastPhoto: '上次图片',//上次图片
        recentPhoto: '本次照片',//本次照片
        //button
        phone: '手机号',//手机号
        count: '联系次数',//联系次数
        sendOrAcceptTime: '收发时间',//收发时间
        riskMessage: '风险短信',//风险短信
        callTime: '通话时间',//通话时间
        callDuration: '通话时长',//通话时长
        //短信列表返回的数据的文案
        haveRead: '已读',//已读
        unread: '未读',//未读
        receive: '接收',//接收
        send: '发送',//发送
        isRisk: '是',//是
        noRisk: '否',//否
        //时分秒、通话类型、通话状态
        h: '小时',//小时
        m: '分钟',//分钟
        s: '秒',//秒
        out:'呼出',//呼出
        in:'呼入',//呼入
        // reject: '拒接',//拒接
        no: '未接通',//未接通
        yes: '接通',//接通
        loanInfo:'借款信息',//借款信息
        unknown: '未知',//未知
        powerOff: '关机',//关机
        //submit
        action: '操作',
        rejectReason: '拒绝原因',
        remark: '备注',
        submit: '提交',
        //通过、拒绝操作弹框
        title:'是否提交审核操作？',//是否提交审核操作
        auditWarning: '提交审核失败,该工单已被释放!',//提交审核失败,该工单已被释放
        confirm: '确认',//确认
        cancel: '取消',//取消
        goBack: '返回',//返回订单列表页,
        goTop: '返回顶部',//返回顶部
        loading: '审核中',//审核中,
        //历史借贷
        createTime: '创建时间',//创建时间
        //数据抓取-Lazada
        addressInfoLa: '地址信息',//地址信息
        deliveryAddressLa: '配送地址',//配送地址
        billsAddressLa: '账单地址',//账单地址
        otherAddress: '其他地址',//其他地址
        orderInfoLa: '订单信息',//订单信息
        packageInfoLa: '包裹信息',//包裹信息
        collectionInfoLa: '收藏',//收藏
        platformUser: '平台用户',//平台用户
        validNumCount: '有效号码',//有效号码
        invalidNumcount: '无效号码',//无效号码
        opera: '查看', //查看
    },
    //用户信息-用户信息
    userInfo: [
        {
            label: '电话号码',//电话号码
            key: 'userPhoneNo',
            value: '',//值
        }, {
            label: '真实姓名',//真实姓名
            key: 'userName',
            value: '',//值
        }, {
            label: '母亲姓名',//母亲姓名
            key: 'motherName',
            value: '',//值
        }, {
            label: '性别',//男
            key: 'gender',
            value: '',//值
        }, {
            label: '身份证号',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: '学历',//学历
            key: 'education',
            value: '',//值
        }, {
            label: '税号',//税号
            key: 'taxNo',
            value: '',//值
        }, {
            label: '详细地址',//详细地址
            key: 'deatailAddress',
            value: '',//值
        }, {
            label: '借款目的',//借款目的
            key: 'purpose',
            value: '',//值
        }, {
            label: '职业',//职业
            key: 'occupation',
            value: '',//值
        }, {
            label: '月薪',//月薪
            key: 'salary',
            value: '',//值
        }, {
            label: '发薪日',//发薪日
            key: 'payTime',
            value: '',//值
        }, {
            label: '公司名称',//公司名称
            key: 'companyName',
            value: '',//值
        }, {
            label: '公司电话',//公司电话
            key: 'companyPhoneNo',
            value: '',//值
        }, {
            label: '公司地址',//公司地址
            key: 'companyAddress',
            value: '',//值
        }
    ],

    //用户信息-联系人信息
    contactText: [
        {
            label: '联系人姓名#1',//联系人姓名#1
            value: '',//值
        }, {
            label: '联系人姓名#2',//联系人姓名#2
            value: '',//值
        }, {
            label: '联系人关系#1',//联系人关系#1
            value: '',//值
        }, {
            label: '联系人关系#2',//联系人关系#2
            value: '',//值
        }, {
            label: '联系人电话#1',//联系人电话#1
            value: '',//值
        }, {
            label: '联系人电话#2',//联系人电话#2
            value: '',//值
        }, {
            label: '联系次数#1',//联系次数#1
            value: '',//值
        }, {
            label: '联系次数#2',//联系次数#2
            value: '',//值
        }, 
        // {
        //     label: '平台用户#1',//平台用户#1
        //     value: '',//值
        // }, {
        //     label: '平台用户#2',//平台用户#2
        //     value: '',//值
        // },
    ],
    //是否平台用户
    isOurUser: {
        0: '否',
        1: '是',
    },

    //用户信息-table无数据的展示
    tableNoText: '无数据',

    //用户信息-认证照片
    userPhotoTitle: {
        0: '正面照片',//正面照片
        1: '手持照片',//手持照片
        2: '人脸照片',//人脸照片
        3: '工资照片',//工资照片
        4: '银行流水',//银行流水
        5: '证件照片',//证件照片
    },
    //用户信息-紧急联系人-表头
    userEmergencyContactsTitle: {
        0: '姓名',//姓名
        1: '性别',//性别
        2: '关系',//关系
        3: '手机号',//手机号
    },
    //用户信息-本地通讯录-表头
    userCallBookTitle: {
        0: '姓名',//姓名
        1: '关系',//关系
        2: '手机号',//手机号
        3: '联系次数',//联系次数
        4: '平台用户',//平台用户
    },
    //用户信息-本地短信-表头
    userMessageTitle: {
        0: '姓名',//姓名
        1: '收发时间',//收发时间
        2: '手机号',//手机号
        3: '风险短信',//风险短信
        4: '已读',//已读
        5: '短信类型',//短信类型
        6: '短信内容',//短信内容
        7: '短信翻译',//短信翻译
    },

    //用户信息-本地通话记录-表头
    userCallRecordTitle: {
        0: '通话时间',//通话时间
        1: '姓名',//姓名
        2: '手机号',//手机号
        3: '通话时长',//通话时长
        4: '通话类型',//通话类型
        5: '通话状态',//通话状态
    },

    //用户信息-后端返回数据的对应text
    /**
     * genderText: 性别 professionText: 职业 educationText:学历  relationText: 关系 purposeText: 借款目的
     */
    genderText: {
        0: '女',
        1: '男'
    },
    occupationText: {
        0: '私人雇员',//私人雇员
        1: '企业家',//企业家
        2: '国有企业员工',//国有企业员工
        3: '公务员',//公务员
        4: '学生',//学生
        5: '警察',//警察
        6: '退休',//退休
        7: '医生',//医生
        8: '律师',//律师
        9: '失业',//失业
        10: '其他',//其他
    },
    educationText: {
        0: '小学',//小学
        1: '初中',//初中
        2: '高中',//高中
        3: '大专',//大专
        4: '大学',//大学
        5: '硕士',//硕士
        6: '博士',//博士
    },
    relationText: {
        0: '父母',//父母
        1: '配偶',//配偶
        2: '孩子',//孩子
        3: '亲戚',//亲戚
        4: '朋友',//朋友
        5: '同事',//同事
        6: '合作伙伴',//合作伙伴
        7: '同学',//同学
       

        8: '父母',//父母
        9: '配偶',//配偶
        10: '孩子',//孩子
        11: '亲戚',//亲戚
        12: '其他',//其他
        13: '朋友',//朋友
        14: '同事',//同事
        99: '公司',//公司
        100: '本人',//本人
    },
    purposeText: {
        0: '健康医疗',//健康医疗
        1: '偿还债务',//偿还债务
        2: '兼职创业',//兼职创业
        3: '数码产品',//数码产品
        4: '教育培训',//教育培训
        5: '美容整形',//美容整形
        6: '旅行消费',//旅行消费
        7: '家居／装修',//家居／装修
        8: '租房',//租房
        9: '运营周转',//运营周转
        10: '结婚',//结婚
        11: '买车',//买车
        12: '买房',//买房
    },

    //审核信息表头
    auditInfoTitle: {
        0: '审核时间',
        1: '阶段',
        2: '审核结果',
        3: '审核人员姓名',
        4: '审核意见'
    },
    //后台返回是审核信息
    auditLevelText: {
        '0': '未审核',
        '1': '初审',
        '2': '终审',
        '3': '机审',
    },
    auditActionText: {
        '0': '初始化',
        '1': '初审通过',
        '2': '初审拒绝',
        '3': '机审拒绝',
        '4': '机审通过',
        '5': '终审通过',
        '6': '终审拒绝'
    },
    crawDataTabTitle: {
        advance: 'Advance',
    },
    //数据爬取 - 基本信息-Lazada
    crawlingBaseDataLa: [
        {
            label: '用户名',//用户名
            key: 'name',
            value: ''
        },{
            label: '真实姓名',//真实姓名
            key: 'real_name',
            value: ''
        },{
            label: '身份证号',//身份证号
            key: 'identity_code',
            value: ''
        },{
            label: '手机号码',//手机号码
            key: 'user_mobile',
            value: ''
        },{
            label: '性别',//性别
            key: 'gender',
            value: ''
        },{
            label: '邮箱',//邮箱
            key: 'email_address',
            value: ''
        },{
            label: '生日',//生日
            key: 'birthday',
            value: ''
        },
    ],

    //数据爬取 - 地址信息-配送--Lazada
    crawlingAddrDeliveryDataLa: [
        {
            label: '姓名',//姓名
            key: 'name',
            value: ''
        },{
            label: '电话',//电话
            key: 'phone_number',
            value: ''
        },{
            label: '地址',//地址
            key: 'address',
            value: ''
        },{
            label: '地区',//地区
            key: 'area',
            value: ''
        }
    ],
    //数据爬取 - 地址信息-账单--Lazada
    crawlingAddrBillsDataLa: [
        {
            label: '姓名',//姓名
            key: 'name',
            value: ''
        },{
            label: '电话',//电话
            key: 'phone_number',
            value: ''
        },{
            label: '地址',//地址
            key: 'address',
            value: ''
        },{
            label: '地区',//地区
            key: 'area',
            value: ''
        }
    ],
    //数据爬取 - 地址信息-其他地址--Lazada
    crawlingAddrOtherDataLa: [
        {
            label: '姓名',//姓名
            key: 'name',
            value: ''
        },{
            label: '电话',//电话
            key: 'phone_number',
            value: ''
        },{
            label: '地址',//地址
            key: 'address',
            value: ''
        },{
            label: '地区',//地区
            key: 'area',
            value: ''
        }
    ],
    //数据爬取 - 订单信息-基本信息-Lazada
    crawlingBaseOrderDataLa: [
        {
            label: '订单号',//订单号
            key: 'order_no',
            value: ''
        },{
            label: '订单日期',//订单日期
            key: 'order_time',
            value: ''
        },{
            label: '总金额',//总金额
            key: 'grand_total',
            value: ''
        },{
            label: '订单金额',//订单金额
            key: 'sub_total',
            value: ''
        },{
            label: '配送费',//配送费
            key: 'shipping_cost',
            value: ''
        },{
            label: '优惠金额',//优惠金额
            key: 'promotion',
            value: ''
        }
    ],

    //数据爬取 - 订单信息-配送--Lazada
    crawlingOrderDeliveryDataLa: [
        {
            label: '姓名',//姓名
            key: 'name',
            value: ''
        },{
            label: '电话',//电话
            key: 'phone_number',
            value: ''
        },{
            label: '地址',//地址
            key: 'address',
            value: ''
        }
    ],
    //数据爬取 - 订单信息-账单--Lazada
    crawlingOrderBillsDataLa: [
        {
            label: '姓名',//姓名
            key: 'name',
            value: ''
        },{
            label: '电话',//电话
            key: 'phone_number',
            value: ''
        },{
            label: '地址',//地址
            key: 'address',
            value: ''
        }
    ],
    //数据爬取 - 订单信息-包裹信息--Lazada
    crawlingOrderPackageDataLa: [
        {
            label: '包裹状态',//包裹状态
            key: 'status',//包裹状态
        },{
            label: '配送方式',//配送方式
            key: 'shipping',
        },{
            label: '卖家',//卖家
            key: 'sold_by',
        }
    ],
    //数据爬取 - 订单信息-包裹-商品信息--Lazada
    crawlingOrderPackageGoodDataLa: [
        {
            label: '商品名称',//商品名称
            key: 'name'
        },{
            label: '价格',//价格
            key: 'price'
        },{
            label: '数量',//数量
            key: 'amount'
        }
    ],
    //数据爬取 - 订单信息-收藏信息--Lazada
    crawlingOrderCollDataLa: [
        {
            label: '心愿单名称',//心愿单名称
            key: 'name',//包裹状态
        },{
            label: '数量',//数量
            key: 'total_item',
        }
    ],
    //数据爬取 - 订单信息-收藏-商品信息--Lazada
    crawlingOrderCollGoodDataLa: [
        {
            label: '商品名称',//商品名称
            key: 'name'
        },{
            label: '库存',//库存
            key: 'availability'
        },{
            label: '价格',//价格
            key: 'price'
        }
    ],


    //最后的提交表单
    auditForm: {
        status: '2',
        rejectReason: '身份证信息不一致',
        remark: ''
    },

    //拒绝原因
    rejectReason: {
        1: '身份证信息不一致', //身份证信息不一致
        2: '工作信息不一致', //工作信息不一致
        3: '通话记录异常', //通话记录异常
        4: '提交虚假信息', //提交虚假信息
        5: '手持身份证与借款人不一致', //手持身份证与借款人不一致
        6: '电话号码异常', //电话号码异常
        7: '银行卡信息与本人不一致', //银行卡信息与本人不一致
        8: '还款能力不足', //还款能力不足
        9: '历史还款逾期', //历史还款逾期
        10: '多头借贷', //多头借贷
        11: '难以联系', //难以联系
        12: '负面信息', //负面信息
        13: '照片有误', //照片有误
        14: '紧急联系人异常', //紧急联系人异常
        15: '黑名单', //黑名单
        16: '其他', //其他
    },

    //拒绝、通过
    actionText: [
        {
            key: '1',
            value: '通过'
        }, {
            key: '2',
            value: '拒绝'
        },
    ],
    tabResult:{
        scoreTitle: '得分结果',//得分结果
        score: '得分',//得分
        suggest: '最终建议',//最终建议
        finalResult: '最终结果',//最终结果
        finalReview: '最终审核',//最终审核
        remark: '审批备注',//审批备注
        pass: '通过',//通过
        reject: '拒绝',//拒绝
        waitPersonReview: '人工介入复查',//人工介入复查
        detailReport: '详细报告',//详细报告
    },
    faceIdentification:{
        title: '人脸匹配',//人脸匹配
        similarity: '相似度',//相似度
        compareCount: '对比次数',//对比次数
        countTip: '该用户校验超过10次，建议拒绝',//该用户校验超过10次，建议拒绝
        reviewSuggestion: '审核建议',//审核建议
    }
}

export default msDetailListCn
