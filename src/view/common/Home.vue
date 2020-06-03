<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 4}">
        <Row type="flex" class="layout-container">
            <i-col :span="spanLeft" class="layout-menu-left ivu-col-span-4">
                <div class="layout-logo-left">
                    <h3>{{homePage.creditReview}}</h3>
                </div>
                <Menu :active-name="activeName" theme="dark" width="auto" :open-names="openNames" accordion
                      class="ivu-menu-dark"
                      @on-select="select">
                    <MenuItem :name="index + '-0'"  v-for="(items,index) in page" :key="index">
                        <Icon v-if="page[index].path=='dashboard'" type="ios-time" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='taskPanel'" type="ios-keypad" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='orderList'" type="android-settings" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='functionalModule'" type="ios-color-filter" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='offlineRepayList'" type="flag" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='blackList'" type="person" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='ecStatistics'" type="ios-paper" :size="iconSize"></Icon>
                        <Icon v-if="page[index].path=='userManage'" type="android-person" :size="iconSize"></Icon>
                        <span class="layout-text">{{page[index].name}}</span>
                    </MenuItem>
                </Menu>
            </i-col>
            <i-col :span="spanRight" class="layout-menu-right">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <Select v-model="language" size="small" @on-change="changeLanguage" class="language">
                        <Option value="cn">中文</Option>
                        <Option value="en">English</Option>
                        <Option value="indo">Bahasa Indonesia</Option>
                    </Select>
                    <!--<p class="welcome-style" style="margin-right:10px" v-if="homePage.welcome">{{homePage.welcome}}</p>-->
                    <div class="layout-ceiling-main">
                        <span>{{userName}}</span>
                        <Button @click="showConfirmDia" size="small" type="primary">{{homePage.hang}}</Button>
                        <Button @click="freed" size="small" type="primary">{{homePage.freed}}</Button>
                        <Button @click="logout" size="small" type="primary">{{homePage.signOut}}</Button>
                    </div>
                </div>
                <div class="layout-breadcrumb">
                    <Breadcrumb>
                        <Breadcrumb-item>{{homePage.currentPathNameParent}}</Breadcrumb-item>
                        <Breadcrumb-item>{{homePage.currentPathName[currentPath]}}</Breadcrumb-item>
                        <Breadcrumb-item v-if="thirdBread">{{thirdBread}}</Breadcrumb-item>
                    </Breadcrumb>
                </div>
                <div class="layout-content">
                    <transition name="router-fade" mode="out-in">
                        <router-view></router-view>
                    </transition>
                </div>
                <div class="layout-copy">2014-2018 &copy; QuantGroup</div>
            </i-col>
        </Row>
        <!-- 用户领取工单数超过10的提醒弹窗 -->
        <Modal v-model="modalhangup" width="450">
            <p slot="header" style="text-align:center">
            <span>{{homePage.hangupModalTitle}}</span>
            </p>
            <h3 style="text-align:center">{{homePage.hangupModalMessage}}</h3>
            <div slot="footer" style="text-align:center">
                <Button type="primary" @click="hang">{{homePage.hangupModalBtn}}</Button>
            </div>
        </Modal>
         <!-- 释放前30分钟弹窗提醒 -->
        <Modal :value="isMoreMinutes" width="400" :closable="true" :mask-closable="false"> 
            <p style="min-height:30px;">{{homePage.tips}}</p>
            <p>{{tipData}}</p>
            <div slot="footer" style="text-align:center">
                <Button style="height:50px;" type="primary" @click="handleCloseMoreMinutes">{{homePage.moreThanBtn}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import router from '../../router/index'
    import config from '../../config'
    import localStorage from '../../services/localStorage.service'
    import taskPanelApi from '../../services/api/taskPanel.service'
    import userApi from '../../services/api/user.service'
    import Bus from '../../services/bus.service'
    import store from '../../store/index'
    import page from '../../config/nav.config'
    import { mapState } from 'vuex'
    const pageCn = page.menuCn
    const pageEn = page.menuEn
    const pageIndo = page.menuIndo
    const LoginUrl = `${config.LoginUrl}`
    const getAndSet = function (name) {
        return {
            // getter
            get: function () {
                return this.$store.state.module[name];
            },
            // setter
            set: function (newValue) {
                this.$store.state.module[name] = newValue;
            }
        }
    }


    export default {
        data () {
            return {
                // isMoreMinutes:true,
                user: {},
                spanLeft: 4,
                spanRight: 20,
                activeName: '0-0',
                openNames: ['0'],
                page: pageCn,
                homePage: {},
                userName: '',
                modalhangup: false,
                tipData:'',
            }
        },
        computed: {
            ...mapState({
                isMoreMinutes: state => state.module.isMoreMinutes,
            }),
            iconSize () {
                return this.spanLeft === 4 ? 14 : 24;
            },
            language: getAndSet('language'),
            currentPath: getAndSet('currentPath'),
            thirdBread: getAndSet('thirdBread'),
        },
        methods: {
            select (name) {
                name += ''
                let current = this.page[name.split('-')[0]]
                let currentPath = current.path
                this.$router.push({
                    path: `/home/${currentPath}`
                })

                //二级面包屑
                localStorage.set('currentPath', currentPath)

            },
            toggleClick () {
                if (this.spanLeft === 4) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 4;
                    this.spanRight = 20;
                }
            },
            showConfirmDia(){
                let currentOrderInfo = localStorage.get('currentOrderInfo')
                if(currentOrderInfo == null) return
                this.modalhangup = true
            },
            //挂起
            hang(){
                //获取当前挂起订单的信息
                let currentOrderInfo = localStorage.get('currentOrderInfo')
                if(currentOrderInfo == null) return
                let param = window.decodeURIComponent(window.atob(localStorage.get('currentOrderInfo')))
                let tempArr = param.split('&')
                tempArr.forEach((item,i) => {
                    tempArr[i] = item.split("=")
                })
                let ticketId = tempArr[0][1]|| ''
                let type = Number(tempArr[1][1]) || 1
                this.modalhangup = false
                taskPanelApi.hang({auditTicketId: ticketId,ticketType: type}).then(res => {
                    localStorage.set('currentPath', 'taskPanel')
                    this.$Notice.success({title: this.homePage.hangSuccess})
                    setTimeout(()=>{
                        this.$router.push('/home/taskPanel')
                    },500)
                })
            },
            //释放订单
            freed(){
                taskPanelApi.releaseOrders().then(res => {
                    localStorage.set('currentPath', 'taskPanel')
                    this.$Notice.success({title: this.homePage.releaseSuccess})
                    setTimeout(()=>{
                        this.$router.push('/home/taskPanel')
                        location.reload()
                    },500)
                })
            },
            //退出登录
            logout(){
                userApi.logout().then(res => {
                    localStorage.set('user', '')
                    localStorage.set('token', '')
                    window.location.href = LoginUrl
                })

            },
            //切换语言
            changeLanguage(){
                this.$i18n.locale = this.language
                //为了在登录页面刷新页面的时候也能读到 退出登录前的语言
                localStorage.set('language', this.language)
                let message = this.$i18n.messages[this.$i18n.locale].message
                this.homePage = message.home.homePage
                let messagePage = message.nav.nav
                switch (this.$i18n.locale) {
                    case 'cn':
                        this.page = pageCn
                        break
                    case 'en':
                        this.page = pageEn
                        break
                    case 'indo':
                        this.page = pageIndo
                        break
                }
                //经过权限限制的nav
                let nav = []
                for (let i in messagePage) {
                    for (let k in this.page) {
                        if (messagePage[i].name === this.page[k].name) {
                            nav.push(this.page[k])
                        }
                    }
                }
                this.page = nav
                //将语言类型 存入store
                this.$store.commit('CHANGE_LANGUAGE', this.language)
                localStorage.set('language', this.language)
            },
             //释放前30分钟弹窗提醒
            thanMinutes(){
                taskPanelApi.greaterThanMinutes().then(res => {
                    console.log(res)
                    if(res.data != '' && res.data != null){ //data不为空 提醒
                        this.tipData = res.data
                        this.$store.commit('MORE_THAN_THREEDAYS', true)
                    }else{
                        this.$store.commit('MORE_THAN_THREEDAYS', false)

                    }
                })
            },
            //定时任务
            timeTask(){
                this.thanMinutes()
                setInterval(()=>{
                    this.thanMinutes()
                },300000);
            },
            handleCloseMoreMinutes(){
                this.$store.commit('MORE_THAN_THREEDAYS', false)
            }
        },
        watch: {
            thirdBread: function () {
                return this.$store.state.thirdBread
            }
        },
        created() {
            this.language = localStorage.get('language')
            this.changeLanguage()

            //二级面包屑
            this.$store.commit('CHANGE_CURRENT_PATH', localStorage.get('currentPath'))

            //三级面包屑
            this.$route.params.orderNo ? this.$store.commit('CHANGE_THIRD_BREAD', this.$route.params.orderNo)
                : this.$store.commit('CHANGE_THIRD_BREAD', '')

            let flag = true
            this.page.forEach((parent, parentIndex) => {
                if (this.$route.path.indexOf(parent.path) !== -1) {
                    this.activeName = `${parentIndex}-0`
                    flag = false
                }
            })

            this.$set(this.openNames, 0, this.activeName.split('-')[0].toString())
            if (flag) {
                this.select(this.activeName)
            }
        },
        mounted () {
             if(this.user.role != 3){
                this.timeTask()
            }     
            // this.thanMinutes()
            Bus.$on('commonShowLoading', () => (this.showLoading = true))
            Bus.$on('commonHideLoading', () => (this.showLoading = false))
            this.userName = localStorage.get('user') && localStorage.get('user').userName || '' 
                
        }

    }

</script>
<style scoped lang="less">
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100%;
        .layout-container {
            height: 100%;
            .layout-menu-left {
                position: relative;
                background: #1c2438;
                overflow: scroll;
                height: auto;
                .layout-logo-left {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    z-index: 10000;
                    height: 50px;
                    background: #5b6270;
                    border-radius: 3px;
                    font-size: 16px;
                    line-height: 50px;
                    color: white;
                    text-align: center;
                    vertical-align: middle;
                    overflow: hidden;
                }
                
            }
            .layout-menu-right {
                //position: relative;
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow: auto;
                .layout-header {
                    height: 45px;
                    line-height: 45px;
                    background: #fff;
                    box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
                    .layout-ceiling-main {
                        float: right;
                        margin-right: 15px;
                        .reset{
                            cursor: pointer;
                            color: #2d8cf0;
                            margin-right: 5px;
                        }
                    }
                    .layout-ceiling-main a {
                        color: #9ba7b5;
                    }
                    .language {
                        width: 150px;
                        display: inline-block;
                        margin-right: 10px;
                    }
                }
                .layout-breadcrumb {
                    height: 30px;
                    padding: 10px 15px 0;
                }
                .layout-content {
                    flex: 1;
                    height: 500px;
                    margin: 15px;
                    overflow: auto;
                    background: #fff;
                    border-radius: 4px;
                }
                .layout-copy {
                    text-align: center;
                    padding: 10px 0 20px;
                    color: #9ea7b4;
                }
            }
        }
    }


    .layout-content-main {
        padding: 10px;
    }

    .ivu-spin-fix{
        opacity: .8;
    }

    .ivu-menu-dark {
        background: #1c2438;
        margin-top: 50px;
    }

    .layout-hide-text .layout-text {
        display: none;
    }

    .ivu-col {
        transition: width .2s ease-in-out;
    }

    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }

    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }

    .welcome-style {
        display: inline-block;
        width: 60%;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
    }

</style>
