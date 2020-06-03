<template>
    <table :style="styles">
        <thead>
        <tr>
            <th v-for="item in columns">{{item.title}}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in data">
            <td v-for="list in item">
                {{list.value}}
            </td>
        </tr>
        <tr>
            <td v-if="isFirst">汇总</td>
            <td v-if="isFirst"></td>
            <td v-for="item in data2">
                {{item.value}}
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        props: {
            columns: {
                type: Array,
                default(){
                    return []
                }
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            width: {
                type: [Number, String]
            },
            isFirst: {
                type: Boolean,
                default: false
            },
            data2: {
                type: Array,
                default () {
                    return []
                }
            }
        },
        data () {
            return {}
        },
        computed: {
            styles () {
                let style = {};
                if (this.width) style.width = `${this.width}px`;
                return style;
            },
        }
    }

</script>

<style lang="less" scoped>
    table {
        width: 99%;
        border-collapse: collapse;
        border-spacing: 0;
        border-left: 1px solid #d7dde4;
        border-top: 1px solid #d7dde4;
        background: #efefef;
        color: #657180;
        font-size: 12px;
    }

    th,
    td {
        border-right: 1px solid #d7dde4;
        border-bottom: 1px solid #d7dde4;
        padding: 5px 15px;
    }

    th {
        font-weight: bold;
        /*background: #0af;*/
    }

    td {
        background-color: #fff;
        text-align: center;
    }

    .color1 {
        background: #f5f7f9;
    }

    .color2 {
        background: #0af;
        color: #fff;
    }

</style>
