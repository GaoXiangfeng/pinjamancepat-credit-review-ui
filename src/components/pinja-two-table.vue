<template>
    <div style="margin:0 10px">
        <table border="1" cellspacing="0" cellpadding="0" class="package-table package-th-color">
            <thead>
            <tr>
                <th v-for="large in largeColumn" :key="large.key" :style="largeThWidth">{{large.title}}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in largeData" :key="index">
                <td :style="largeTdWidth" v-for="i in largeColumn.length">{{item[largeColumn[i-1].key]}}</td>
            </tr>
            <tr >
                <td colspan="3">
                    <table class="package-table" cellspacing="0">
                        <tr>
                            <th :style="smallThWidth" v-for="small in smallColumn" :key="small.key">{{small.title}}</th>
                        </tr>
                        <tr v-for="(item,index) in smallData" :key="index">
                            <td :style="smallTdWidth" v-for="i in smallColumn.length">{{item[smallColumn[i-1].key]}}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    export default {
        props: {
            largeColumn: {
                type: Array,
                default (){
                    return [
                        {
                            key: 'key1',
                            title: '包裹状态'
                        }, {
                            key: 'key2',
                            title: '配送状态'
                        }, {
                            key: 'key3',
                            title: '卖家'
                        },
                    ]
                }
            },
            largeData: {
                type: Array,
                default (){
                    return [
                        {
                            key1: 'key1',
                            key2: 'key2',
                            key3: 'key3',
                        }
                    ]
                }
            },
            smallColumn: {
                type: Array,
                default (){
                    return [
                        {
                            key: 'key1',
                            title: '商品数量'
                        }, {
                            key: 'key2',
                            title: '价格'
                        }, {
                            key: 'key3',
                            title: '数量'
                        },
                    ]
                }
            },
            smallData: {
                type: Array,
                default (){
                    return [
                        {
                            key1: 'key1',
                            key2: 'key2',
                            key3: 'key3',
                        },{
                            key1: 'key1',
                            key2: 'key2',
                            key3: 'key3',
                        },{
                            key1: 'key1',
                            key2: 'key2',
                            key3: 'key3',
                        },{
                            key1: 'key1',
                            key2: 'key2',
                            key3: 'key3',
                        },
                    ]
                }
            },
            width: {
                type: [Number, String]
            },
            TWidth: {
                type: [Number, String]
            },
            DWidth: {
                type: [Number, String]
            },
            tWidth: {
                type: [Number, String]
            },
            dWidth: {
                type: [Number, String]
            },
        },
        computed: {
            styles () {
                let style = {};
                if (this.width) style.width = `${this.width}px`;
                return style;
            },
            largeThWidth () {
                let style = {};
                if (this.TWidth) style.width = `${this.TWidth}px`;
                else style.width = `${(100/this.largeColumn.length)}%`
                return style;
            },
            largeTdWidth () {
                let style = {};
                if (this.DWidth) style.width = `${this.DWidth}px`;
                else style.width = `${(100/this.largeColumn.length)}%`
                return style;
            },
            smallThWidth () {
                let style = {};
                if (this.tWidth) style.width = `${this.tWidth}px`;
                else style.width = `${(100/this.smallColumn.length)}%`
                return style;
            },
            smallTdWidth () {
                let style = {};
                if (this.dWidth) style.width = `${this.dWidth}px`;
                else style.width = `${(100/this.smallColumn.length)}%`
                return style;
            },
        },
        methods: {},
        mounted(){

        }

    }
</script>
<style lang="less">
    .package-table{
        height: 100%;
        width: 100%;
        overflow: hidden;
        color: #495060;
        font-size: 12px;
        background-color: #fff;
        box-sizing: border-box;
        th{
            background-color: #e4e7ea;
            height: 30px;
        }
        td{
            text-align: center;
            height: 30px;
        }
    }
    .package-th-color>thead>tr>th{
        background-color: #3f8ef4;
        color: #fff;
    }

</style>
