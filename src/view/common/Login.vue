<template>
    <div class="wrapper">
        <div class="login">
            <i-form ref="form" :model="form" :rules="ruleInline" :label-width="120">
                <Form-item>
                    <h1>{{loginPage.title}}</h1>
                </Form-item>
                <Form-item prop="name" :label="loginPage.userName">
                    <Input v-model="form.name"></Input>
                </Form-item>
                <Form-item prop="password" :label="loginPage.passWord">
                    <Input v-model="form.password" type="password" @on-enter="handleSubmit('form')"></Input>
                </Form-item>
                <Form-item>
                    <i-button type="info" @click.native="handleSubmit('form')" long>{{loginPage.login}}</i-button>
                </Form-item>
            </i-form>
        </div>
    </div>
</template>

<script>
    import Cookie from 'js-cookie'
    import localStorage from '../../services/localStorage.service'
    import loginApi from '../../services/api/user.service'
    import store from '../../store/index'
    export default {
        data () {
            return {
                form: {
                    name: '',
                    password: ''
                },
                ruleInline: {
                    name: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '',
                        trigger: 'blur'
                    }, {
                        type: 'string',
                        min: 3,
                        message: '',
                        trigger: 'blur'
                    }]
                },
                loginPage: {}
            }
        },
        computed: {
            language: {
                // getter
                get: function () {
                    return this.$store.state.language;

                },
                // setter
                set: function (newValue) {
                    this.$store.state.language = newValue;

                }
            }
        },
        methods: {
            //切换语言
            changeLanguage(){
                this.$i18n.locale = this.language
                let message = this.$i18n.messages[this.$i18n.locale].message
                this.loginPage = message.home.loginPage
                this.ruleInline.name[0].message = this.loginPage.messageName
                this.ruleInline.password[0].message = this.loginPage.messagePwd
                this.ruleInline.password[1].message = this.loginPage.messagePwdLength
                //将语言类型 存入store
                this.$store.commit('modifyLanguage', this.language)
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        loginApi.login(this.form).then(res => {
                            if (res.businessCode === '0003') {//用户名或密码错误
                                this.$Notice.error({title: this.loginPage.loginError})
                                return
                            }
                            Cookie.set('flow-token', Date.now(), {expires: 7})
                            localStorage.set('user', res)
                            localStorage.set('token', res.token)
                            localStorage.set('currentPath', 'taskPanel')
                            this.$Notice.success({title: this.loginPage.successMessage})
                            //this.$router.push({path:'/home/taskPanel',query:{'isFirst': true}})
                            this.$router.push({path:'/home/Dashboard'})
                            if(this.$route.path != '/login'){
                                location.reload(true)
                            }
                        })
                    } else {
                        this.$Message.error(this.loginPage.errorMessage)
                    }
                })
            }
        },
        created(){
            //刷新的时候 从localstorage中读取语言 (初次登录 时候没有语言 默认显示英文)
            if(!localStorage.get('language')){
                localStorage.set('language','en')
            }
           this.language = localStorage.get('language')
        },
        mounted(){
            this.changeLanguage()
        }
    }

</script>
<style lang="less" scoped>
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        padding-top: 150px;
        padding-bottom: 200px;
    }

    .wrapper h1 {
        text-align: center;
        vertical-align: middle;
        margin-bottom: 20px;
        color: #000;
    }

    .login {
        margin: 0 auto;
        padding: 200px auto;
        width: 400px;
        height: 100%;
    }

</style>
