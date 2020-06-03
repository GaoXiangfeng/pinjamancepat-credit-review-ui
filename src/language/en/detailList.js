const msDetailListEn = {
    //提示文案
    promptText:{
        text1: 'The total loan numbers of user',//用户贷款的总次数
        text2: 'Overdue days of the latest loan',//用户上笔贷款的逾期天数
        text3: 'Whether transfer is failed of the latest loan',//上笔贷款是否是放款失败
    },
    //命中规则
    hitRiskText: {
        hitRisk: 'Hit The Rules', //命中规则
        beforeReview: 'Please read carefully the contents of the risk alert before the review !!',//审核前，请仔细阅读风险提示的内容!!
        isBind: 'The ID card has been used, you can only to choose to refuse！！！',//该身份证已被使用，只能选择拒绝操作！！！
    },
    //订单列表页
    detailCardData: [
        {
            label: 'Order Information', //订单信息
            tab: true
        }, {
            label: 'User Information', //用户信息
            tab: true
        }, {
            label: 'Audit Information',//审核信息
            tab: true
        }, {
            label: 'Historical loan', //历史借贷
            tab: true
        }, {
            label: 'Data crawling',//数据爬取
            tab: true
        }
    ],
    //历史借贷
    historyLoanTitle: {
        0: '',//查看
        1: 'Order number',//订单号
        2: 'Create time',//创建时间
        3: 'Audit result',//审核结果
        4: 'Closing time',//结清时间
        5: 'Repayment count',//还款次数
        6: 'Days Overdue',//逾期天数
    },

    //订单信息-标题
    orderTitle: {
        orderInfo :'Order Information', //订单信息
        bankInfo :'Loan Bank Account Information', //放款银行信息
        repayBankInfo :'Repayment Bank Account Information', //还款银行信息
    },

    //订单信息-订单信息
    userOrderInfo: [
        {
            label: 'Loan Type',//贷款状态
            key: 'orderStatus',
            value: '',//值
        }, {
            label: 'Loan Name',//贷款名称
            key: 'loanName',
            value: '',//值
        }, {
            label: 'Loan mount ',//借款金额
            key: 'principal',
            value: '',//值
        }, {
            label: 'One-time Deduction of Fees',//砍头费
            key: 'interest', //
            value: '',//值
        }, {
            label: 'Loan Days',//借款天数
            key: 'days',
            value: '',//值
        }, {
            label: 'Rate',//利率
            key: 'rate', //
            value: '',//值
        }, {
            label: 'Way to alculate Interest',//计息方式
            key: 'rateType',
            value: '',//值
        }, {
            label: 'Application Time',//申请时间
            key: 'orderTime',
            value: '',//值
        }
    ],

    //订单信息-放款银行账号
    userBankInfo: [
        {
            label: "Cardholder's Name",//持卡人姓名
            key: 'applyUserName',
            value: '',//值
        }, {
            label: 'ID Number',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: 'Advance Ai Result',//风控校验账户姓名
            key: 'verifyUserName',
            value: '',//值
        }, {
            label: 'Bank Name',//银行名称
            key: 'bankName', //
            value: '',//值
        }, {
            label: 'Bank Account',//银行账号
            key: 'bankAccount',
            value: '',//值
        }, {
            label: 'Verification of Name Rule ',//姓名规则校验
            key: 'authStatus',
            value: '',//值
        }, {
            label: 'Payment channel',//支付渠道
            key: 'fundingName',
            value: '',//值
        }
    ],
    //银行账户姓名与申请人姓名校验 
    bankInfoMatch:{
        title: 'Bank account name and applicant name verification',
        holderName: 'Bank account name',
        applyName: 'Applicant name',
        matchScore: 'Match score'
    },
    //订单信息-还款银行账号信息
    userPayInfo: [
        {
            label: 'Bank Payment Code',//银行付款码
            value: '',//值
        }, {
            label: 'Bank Name',//银行名称
            value: '',//值
        }
    ],

    //后端返回的订单详情的国际化
    //订单信息-贷款状态
    loanTypeText: {
        0: 'Unapplied orders',//未申请订单
        1: 'Applied successfully',//申请成功
        2: 'Under audit',//审核中
        3: 'Audit rejected',//审核拒绝
        4: 'Audit passed',//审核通过
        5: 'Loan failed',//放款失败
        6: 'Loan successfull',//放款成功
        7: 'Loans settled',//贷款结清
    },

    //订单详情-借款天数
    loanDay: 'days',

    //订单详情-利率
    rate: 'Daily Interest',

    //订单详情-计息方式
    rateTypeText: {
        0: 'After the first interest rate'
    },

    //放款银行账号-姓名规则校验
    nameValid: {
        0:'Not verified',//未校验
        1: 'Checking',//校验中
        2: 'Consistent',//一致
        3: 'Inconsistent'//不一致
    },

    //还款银行账号信息-为找到记录
    nonePay: 'No Record Found',

    //用户信息-四个标题-后端返回数据的文案
    userTitle: {
        //标题
        userInfo: 'User Information',//用户信息
        photo: 'Certified photo',//认证照片
        callBook: 'Call Book',//本地通讯录
        emergencyPerson: 'Emergency Contacts',//紧急联系人
        message: 'Message',//本地短信
        callRecord: 'Call Records',//通话记录
        //认证照片
        lastPhoto: 'Last picture',//上次图片
        recentPhoto: 'This photo',//本次照片
        //button
        phone: 'Phone number',//手机号
        count: 'Number of contacts',//联系次数
        sendOrAcceptTime: 'Receive and send time',//收发时间
        riskMessage: 'Risk Message',//风险短信
        callTime: 'Call time',//通话时间
        callDuration: 'Length of talk',//通话时长
        //短信列表返回的数据的文案
        haveRead: 'Have read',//已读
        unread: 'unread',//未读
        receive: 'receive',//接收
        send: 'send',//发送
        isRisk: 'Yes',//是
        noRisk: 'NO',//否
        //时分秒、通话类型、通话状态
        h: 'hour',//小时
        m: 'minute',//分钟
        s: 'second',//秒
        out:'exhale',//呼出
        in:'Inbound',//呼入
        reject: 'Reject',//拒接
        no: 'Not connected',//未接通
        yes: 'Connected',//接通
        loanInfo: 'Loan Information',//借款信息
        unknown: 'Unknown',//未知
        powerOff: 'Power off',//关机
        //submit
        action: 'Operation', //操作
        rejectReason: 'Reject Reason',//拒绝原因
        remark: 'Remarks',//备注
        submit: 'Submit',
        //通过、拒绝操作弹框
        title:'Whether to submit the audit operation？',//是否提交审核操作
        auditWarning: 'Submit the audit failed, the ticket has been released!',//提交审核失败,该工单已被释放
        confirm: 'Confirm',//确认
        cancel: 'Cancel',//取消
        goBack: 'Return',//返回订单列表页
        goTop: 'Top',//返回顶部
        loading: 'Under review',//审核中
        //历史借贷
        createTime: 'Create time',//创建时间
        platformUser: 'Platform user',//平台用户
        validNumCount: 'Valid number',//有效号码
        invalidNumcount: 'Invalid number',//无效号码
        opera: 'check',//查看
    },

    //用户信息-用户信息
    userInfo: [
        {
            label: 'Phone Number',//电话号码
            key: 'userPhoneNo',
            value: '',//值
        }, {
            label: 'Actual Name',//真实姓名
            key: 'userName',
            value: '',//值
        }, {
            label: "Mother's Name",//母亲姓名
            key: 'motherName',
            value: '',//值
        }, {
            label: 'Gender',//男
            key: 'gender',
            value: '',//值
        }, {
            label: 'ID Number',//身份证号
            key: 'idCardNo',
            value: '',//值
        }, {
            label: 'Education',//学历
            key: 'education',
            value: '',//值
        }, {
            label: 'Tax ID',//税号
            key: 'taxNo',
            value: '',//值
        }, {
            label: 'Address',//详细地址
            key: 'deatailAddress',
            value: '',//值
        }, {
            label: 'Purpose of Loan',//借款目的
            key: 'purpose',
            value: '',//值
        }, {
            label: 'Occupation',//职业
            key: 'occupation',
            value: '',//值
        }, {
            label: 'Monthly Salary',//月薪
            key: 'salary',
            value: '',//值
        }, {
            label: 'Payday',//发薪日
            key: 'payTime',
            value: '',//值
        }, {
            label: 'Company Name',//公司名称
            key: 'companyName',
            value: '',//值
        }, {
            label: 'Company Phone',//公司电话
            key: 'companyPhoneNo',
            value: '',//值
        }, {
            label: 'Company Address',//公司地址
            key: 'companyAddress',
            value: '',//值
        },
    ],

    //用户信息-联系人信息
    contactText: [
        {
            label: 'Contact Name#1',//联系人姓名#1
            value: '',//值
        }, {
            label: 'Contact Name#2',//联系人姓名#2
            value: '',//值
        }, {
            label: 'Contact Relationship#1',//联系人关系#1
            value: '',//值
        }, {
            label: 'Contact Relationship#2',//联系人关系#2
            value: '',//值
        }, {
            label: 'Contact Number#1',//联系人电话#1
            value: '',//值
        }, {
            label: 'Contact Number#2',//联系人电话#2
            value: '',//值
        }, {
            label: 'Contact Count#1',//联系次数#1
            value: '',//值
        }, {
            label: 'Contact Count#2',//联系次数#2
            value: '',//值
        }, {
            label: 'Platform user#1',//平台用户#1
            value: '',//值
        }, {
            label: 'Platform user#2',//平台用户#2
            value: '',//值
        },
    ],
    //是否平台用户
    isOurUser: {
        0: 'No',
        1: 'Yes',
    },

    //用户信息-table无数据的展示
    tableNoText: 'no data',

    //用户信息-认证照片
    userPhotoTitle: {
        0: 'protrait photo',//正面照片
        1: 'Handheld photos',//手持照片
        2: 'Face photo',//人脸照片
        3: 'Salary Photos',//工资照片
        4: 'Bank flow',//银行流水
        5: 'ID Photo',//证件照片
    },
    //用户信息-紧急联系人-表头
    userEmergencyContactsTitle: {
        0: 'Name',//姓名
        1: 'Gender',//性别
        2: 'Relationship',//关系
        3: 'Phone number',//手机号
    },
    //用户信息-本地通讯录-表头
    userCallBookTitle: {
        0: 'Name',//姓名
        1: 'relationship',//关系
        2: 'Phone number',//手机号
        3: 'Number of contacts',//联系次数
        4: 'Platform user',//平台用户
    },
    //用户信息-本地通讯录-表头-已读-短信类型
    userMessageTitle: {
        0: 'Name',//姓名
        1: 'Receive and send time',//收发时间
        2: 'Phone number',//手机号
        3: 'Risk Message',//风险短信
        4: 'Have read',//已读
        5: 'SMS type',//短信类型
        6: 'SMS content',//短信内容
    },

    //用户信息-本地通话记录-表头
    userCallRecordTitle: {
        0: 'Call time',//通话时间
        1: 'Name',//姓名
        2: 'Phone number',//手机号
        3: 'Length of talk',//通话时长
        4: 'Type of call',//通话类型
        5: 'Status of call',//通话状态
    },

    //用户信息-后端返回数据的对应text
    /**
     * genderText: 性别 professionText: 职业 educationText:学历  relationText: 关系 purposeText: 借款目的
     */
    genderText: {
        0: 'Female',
        1: 'Male'
    },
    occupationText: {
        0: 'Private employee',//私人雇员
        1: 'Entrepreneur' ,//企业家
        2: 'Employees of state-owned enterprises' ,//国有企业员工
        3: 'Civil servants',//公务员
        4: 'Student',//学生
        5: 'Policemen',//警察
        6: 'Retirement',//退休
        7: 'Doctors',//医生
        8: 'Lawyer',//律师
        9: 'Unemployment',//失业
        10: 'Other',//其他
    },
    educationText: {
        0: 'Primary school',//小学
        1: 'Junior high school' ,//初中
        2: 'High school' ,//高中
        3: 'College',//大专
        4: 'the University',//大学
        5: "Master's degree",//硕士
        6: 'Dr.',//博士
    },
    relationText: {
        0: 'Parents',//父母
        1: 'Spouse' ,//配偶
        2: 'Child' ,//孩子
        3: 'Relative',//亲戚
        4: 'Friend',//朋友
        5: 'Colleague',//同事
        6: 'Partner',//合作伙伴
        7: 'Classmate',//同学

        8: 'Parents',//父母
        9: 'Spouse',//配偶
        10: 'Child',//孩子
        11: 'Relative',//亲戚
        12: 'Others',//其他
        13: 'Friend',//朋友
        14: 'Colleague',//同事
        99: 'Company',//公司
        100: 'Self',//本人
    },
    purposeText: {
        0: 'Health care',//健康医疗
        1: 'Repay loan' ,//偿还债务
        2: 'Part-time entrepreneurship' ,//兼职创业
        3: 'Digital product',//数码产品
        4: 'Education and training',//教育培训
        5: 'Cosmetic plastic surgery',//美容整形
        6: 'Travel expenses',//旅行消费
        7: 'Home or renovation',//家居／装修
        8: 'Renting',//租房
        9: 'Operating turnover',//运营周转
        10: 'Marry',//结婚
        11: 'Buy a car',//买车
        12: 'Buy a house',//买房
    },

    //审核信息表头
    auditInfoTitle: {
        0: 'Audit time',
        1: 'Level',
        2: 'Audit results',
        3: 'Auditor',
        4: 'Audit opinion'
    },
    //后台返回是审核信息
    auditLevelText: {
        '0': 'Not reviewed',
        '1': 'First audit',
        '2': 'Final audit',
        '3': 'Machine audit',
    },
    auditActionText: {
        '0': 'initialization',
        '1': 'First audit passed',
        '2': 'First audit refused',
        '3': 'Machine audit refused',
        '4': 'Machine audit passed',
        '5': 'Final audit passed',
        '6': 'Final audit refused'
    },


    //最后的提交表单
    auditForm: {
        status: '2',
        rejectReason: 'Inconsistent national ID info',
        remark: ''
    },

    //拒绝原因
    rejectReason: {
        1: 'Inconsistent national ID info', //身份证信息不一致
        2: 'Inconsistent job info', //工作信息不一致
        3: 'Abnormal call log', //通话记录异常
        4: 'Fake info', //提交虚假信息
        5: 'Hand hold photo mismatch', //手持身份证与借款人不一致
        6: 'Abnormal mobile numbers', //电话号码异常
        7: 'Bank account info mismatch', //银行卡信息与本人不一致
        8: 'inability of repayment', //还款能力不足
        9: 'Historical repayment is overdue', //历史还款逾期
        10: 'Multiple pending loans', //多头借贷
        11: 'Difficult to contact', //难以联系
        12: 'Negative comments', //负面信息
        13: 'Photo is wrong', //照片有误
        14: 'EC is abnormal', //紧急联系人异常
        15: 'blacklist', //黑名单
        16: 'others', //其他
    },

    actionText: [
        {
            key: '1',
            value: 'Passed'
        }, {
            key: '2',
            value: 'Refused'
        },
    ],
    crawDataTabTitle: {
        advance: 'Advance',
    },
    tabResult:{
        scoreTitle: 'Scoring result',//得分结果
        score: 'Score',//得分
        suggest: 'Final suggestion',//最终建议
        finalResult: 'Final result',//最终结果
        finalReview: 'Final review',//最终审核
        remark: 'Approval note',//审批备注
        pass: 'Pass',//通过
        reject: 'Reject',//拒绝
        waitPersonReview: 'Manual intervention review',//人工介入复查
        detailReport: 'detail report',//详细报告
    },
    faceIdentification:{
        title: 'Face matching',//人脸匹配
        similarity: 'Similarity',//相似度
        compareCount: 'Comparison times',//对比次数
        countTip: 'The user has checked more than 10 times, it is recommended to reject',//该用户校验超过10次，建议拒绝
        reviewSuggestion: 'Review recommendations',//审核建议
    }
}

export default msDetailListEn
