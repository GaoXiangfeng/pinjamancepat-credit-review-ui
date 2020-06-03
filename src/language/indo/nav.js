/**
 *
 * @type
 * 三种角色限制
 * CS:  初审
 * ZS:  终审
 * GLY: 管理员
 *
 */
const msNavIndo = {
    //导航栏
    nav: [
        {
            name: 'Dashboard', //Home
            role: ['CS', 'ZS', 'GLY'],
            path: 'dashboard'
        },
        {
            name: 'Panel Tugas',
            role: ['CS', 'ZS', 'GLY'],
            path: 'taskPanel',
        },
        {
            name: 'Daftar Pesanan',
            role: ['GLY'],
            path: 'orderList',
        },
        {
            name: 'Modul Fungsi',
            role: ['ZS','GLY'],
            path: 'functionalModule',
        },
        {
            name: 'Statistik verifikasi telepon',
            role: ['GLY'],
            path: 'ecStatistics',
        },
        {
            name: 'Manajemen personalia',
            role: ['GLY'],
            path: 'userManage',
        },
    ]
}

export default msNavIndo
