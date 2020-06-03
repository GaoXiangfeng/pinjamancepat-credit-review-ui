/**
 *
 * @type
 * 三种角色限制
 * CS:  初审
 * ZS:  终审
 * GLY: 管理员
 *
 */
const msNavCn = {
    //导航栏
    nav: [
        {
            name: 'Dashboard', //Home
            role: ['CS', 'ZS', 'GLY'],
            path: 'dashboard'
        },
        {
            name: '任务面板',
            role: ['CS', 'ZS', 'GLY'],
            path: 'taskPanel',
        },
        {
            name: '订单列表',
            role: ['GLY'],
            path: 'orderList',
        },
        {
            name: '功能模块',
            role: ['ZS','GLY'],
            path: 'functionalModule',
        },
        {
            name: '电核统计',
            role: ['GLY'],
            path: 'ecStatistics',
        },
        {
            name: '人员管理',
            role: ['GLY'],
            path: 'userManage',
        },
    ]
}

export default msNavCn
