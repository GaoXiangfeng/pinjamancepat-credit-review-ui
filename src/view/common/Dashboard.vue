<template>
    <div style="text-align: center">
        <h2 v-if="homePage.welcome">{{homePage.welcome}}</h2>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data () {
            return {
                homePage: {}
            }
        },
        computed: {
            language: {
                // getter
                get: function () {
                    return this.$store.state.module['language']
                },
                // setter
                set: function (newValue) {
                    this.$store.state.module['language'] = newValue
                }
            }
        },
        methods: {
            //切换语言
            changeLanguage () {
                this.$i18n.locale = this.language
                let message = this.$i18n.messages[this.$i18n.locale].message
                this.homePage = message.home.homePage
                //将语言类型 存入store
                this.$store.commit('CHANGE_LANGUAGE', this.language)
            }
        },
        watch: {
            language () {
                this.changeLanguage()
            }
        },
        mounted () {
            this.changeLanguage()
        }
    }
</script>
