/**
 *
 * @type
 * 三种角色限制
 * CS:  初审
 * ZS:  终审
 * GLY: 管理员
 *
 */
const msNavEn = {
    //导航栏
    nav: [
        {
            name: 'Dashboard', //Home
            role: ['CS', 'ZS', 'GLY'],
            path: 'dashboard'
        },
        {
            name: 'Task Panel',//任务面板
            role: ['CS', 'ZS', 'GLY'],
            path: 'taskPanel',
        },
        {
            name: 'Order List',//订单列表
            role: ['GLY'],
            path: 'orderList',
        },
        {
            name: 'Functional Module',
            role: ['ZS','GLY'],
            path: 'functionalModule',
        },
        {
            name: 'Ec Statistics',
            role: ['GLY'],
            path: 'ecStatistics',
        },
        {
            name: 'User management',
            role: ['GLY'],
            path: 'userManage',
        },
    ]
}

export default msNavEn
