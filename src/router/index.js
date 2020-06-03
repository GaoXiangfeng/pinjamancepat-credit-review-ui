import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import config from '../config'
import localStorage from '../services/localStorage.service'

Vue.use(VueRouter)

const login = r => require.ensure([], () => r(require('../view/common/Login.vue')), 'login')
const home = r => require.ensure([], () => r(require('../view/common/Home.vue')), 'login')
const dashboard = r => require.ensure([], () => r(require('../view/common/Dashboard.vue')), 'dashboard')
const taskPanel = r => require.ensure([], () => r(require('../view/creditReview/taskPanel')), 'taskPanel')
const orderList = r => require.ensure([], () => r(require('../view/creditReview/orderList')), 'orderList')
const detailList = r => require.ensure([], () => r(require('../view/creditReview/detailList')), 'detailList')
const functionalModule = r => require.ensure([], () => r(require('../view/functionModal/functionalModule')), 'functionalModule')
const ecStatistics = r => require.ensure([], () => r(require('../view/ecStatisticsModal/ecStatistics.vue')), 'ecStatistics')
const userManage = r => require.ensure([], () => r(require('../view/userModal/userManage.vue')), 'userManage')

//角色限制
/**
 * 1:CS 初审
 * 2：ZS 终审
 * 3：GLY 管理员
 */
const routes = [
    {
        path: '/',
        redirect: '/home/dashboard',
        meta: {
            role: '1,2,3'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            role: '1,2,3'
        }
    },
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            requireAuth: true,
            role: '1,2,3',
        },
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: dashboard,
                meta: {
                    option: {
                        thirdBread: ''
                    },
                    role: '1,2,3'
                }
            },
            {
                path: 'taskPanel',
                name: 'taskPanel',
                component: taskPanel,
                meta:{
                    role: '1,2,3',
                    option: {
                        currentPath: 'taskPanel',
                        thirdBread: ''
                    }
                }
            },{
                path: 'orderList',
                name: 'orderList',
                component: orderList,
                meta:{
                    role: '3',
                    option: {
                        currentPath: 'orderList',
                        thirdBread: ''
                    }
                } //管理员GLY
            },{
                path: 'taskPanel/detailList/:orderNo',
                name: 'detailList',
                component: detailList,
                meta:{
                    role: '1,2,3',
                    option: {
                        currentPath: 'detailList',
                        thirdBread: ''
                    }
                }
            },{
                path: 'functionalModule',
                name: 'functionalModule',
                component: functionalModule,
                meta:{
                    role: '2,3',
                    option: {
                        currentPath: 'functionalModule',
                        thirdBread: ''
                    }
                }
            },{
                path: 'ecStatistics',
                name: 'ecStatistics',
                component: ecStatistics,
                meta:{
                    role: '3',
                    option: {
                        currentPath: 'ecStatistics',
                        thirdBread: ''
                    }
                } //管理员GLY
            },{
                path: 'userManage',
                name: 'userManage',
                component: userManage,
                meta:{
                    role: '3',
                    option: {
                        currentPath: 'userManage',
                        thirdBread: ''
                    }
                } //管理员GLY
            }]

}]

const router = new VueRouter({
    mode: 'history',
    routes
})

// const router = new VueRouter({
//     mode: 'history',
//     routes: routes
// })

const opRedirectUrl = config.LoginUrl

router.beforeEach(async(to, from, next) => {
    let requireAuth = to.matched.some(route => route.meta.requireAuth)

    if (!requireAuth) {
        return next()
    }

    //判断是否登录
    let user = localStorage.get('user')
    if (!localStorage.get('token') || !user) {
        window.location.href = opRedirectUrl
        //location.reload()
        return
    }

    //如果登录，判断是否有当前路由的权限
    let role = user.role || ''
    to.matched.some(route => {
        if(!route.meta.role.includes(role)){
            window.location.href = opRedirectUrl
            //location.reload()
        }
    })

    //二级、三级目录判断
    let  meta = to.meta
    if(meta.option){
        store.commit('CHANGE_CURRENT_PATH',meta.option.currentPath)
        store.commit('CHANGE_THIRD_BREAD',meta.option.thirdBread)
    }


    next()
})

export default router
