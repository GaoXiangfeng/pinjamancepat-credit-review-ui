<template>
    <table :style="styles">
        <tr v-for="r in row">
            <template v-for="c in column" v-if="(r-1)*column+(c-1) < data.length">
                <th :style="thWidth" :class="{color1:isDefault, color2:isActive}">{{data[(r - 1) * column + (c - 1)].name}}</th>
                <td :colspan="(r-1)*column+(c-1) === data.length-1 ? lastColspan : 1" :style="tdWidth">
                    <ul v-if="data[(r - 1) * column + (c - 1)].innerHtml">
                        <li v-for="url in urls">
                            <a v-if="isClick" target="_blank"  @click="down(url)">{{url}}</a>
                            <span v-else>{{url}}</span>
                        </li>
                    </ul>
                    <span v-else-if="data[(r - 1) * column + (c - 1)].isBlue"
                          v-for="item in data[(r - 1) * column + (c - 1)].value">
                        <a v-if="item.isBlue">{{item.value}}</a>
                        <span v-else>{{item.value}}</span>
                    </span>
                    <span v-else>{{data[(r - 1) * column + (c - 1)].value}}</span>
                </td>
            </template>
        </tr>
    </table>
</template>
<script>
    export default {
        props: {
            column: {
                type: Number,
                default: 3
            },
            data: {
                type: Array,
                default () {
                    return []
                }
            },
            urls: {
                type: Array,
            },
            isClick: {
                type: Boolean,
                default: true
            }, isBlue: {
                type: Boolean,
                default: false
            },
            width: {
                type: [Number, String]
            },
            tWidth: {
                type: [Number, String]
            },
            dWidth: {
                type: [Number, String]
            },
            isDefault: {
                type: Boolean,
                default: true
            },
            isActive: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {}
        },
        computed: {
            row () {
                return Math.ceil(this.data.length / this.column) || 0
            },
            lastColspan () {
                return (this.column - this.data.length % this.column) * 2 + 1
            },
            styles () {
                let style = {};
                if (this.width) style.width = `${this.width}px`;
                return style;
            },
            thWidth () {
                let style = {};
                if (this.tWidth) style.width = `${this.tWidth}px`;
                return style;
            },
            tdWidth () {
                let style = {};
                if (this.dWidth) style.width = `${this.dWidth}px`;
                return style;
            },
        },
        methods: {
            down(url){
                this.$emit('down', url)
            }
        },
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
    }

    .color1 {
        background: #f5f7f9;
    }

    .color2 {
        background: #0af;
        color: #fff;
    }

</style>
