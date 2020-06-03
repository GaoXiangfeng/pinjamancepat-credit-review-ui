<template>
    <div style="margin-top:20px;">
        <Table border :columns="columns" :height="height" :data="data" @on-select="selectOne"
               @on-select-all="selectAll" @on-selection-change="unSelectAll"></Table>
    </div>
</template>
<script>
    export default {
        props: {
            columns: {
                type: Array,
                default: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '商品spu名称',
                        key: 'productName',
                        width: 160
                    },
                    {
                        title: 'spu ID',
                        key: 'id',
                    }, {
                        title: '供货商',
                        key: 'supplierName',
                    }, {
                        title: '售价',
                        key: 'sellPrice',
                    }, {
                        title: '供货价',
                        key: 'supplierPrice',
                    }, {
                        title: '利润率',
                        key: 'profitRate',
                    }],
            },
            data: {
                type: Array,
                default: [
                    {productName: 'name1', id: 111, supplierName: 'suppler1', sellPrice: 190, profitRate: '50%'},
                    {productName: 'name2', id: 211, supplierName: 'suppler2', sellPrice: 290, profitRate: '50%'},
                    {productName: 'name3', id: 311, supplierName: 'suppler3', sellPrice: 390, profitRate: '60%'},
                    {productName: 'name4', id: 411, supplierName: 'suppler4', sellPrice: 490, profitRate: '70%'},
                ]
            },
            idsArr: {
                type: Array,
                default: []
            },
            id: {
                type: String,
                default: 'id'
            },
            height: {
                type:[String,Number],
                default: ''
            }
        },
        data () {
            return {}
        },
        methods: {
            //全选
            selectAll(selection){
                this.getProductIds(selection)
            },
            //全不选/状态发生改变
            unSelectAll(selection){
                if (selection.length === 0 || selection.length < this.idsArr.length) {//全不选或者取消某一项
                    this.data.forEach(item => {
                        let index = this.idsArr.indexOf(item[this.id])
                        if (index !== -1) {
                            this.idsArr.splice(index, 1)
                        }
                    })

                }
                this.getProductIds(selection)
            },
            //选择某一项
            selectOne(selection){
                this.getProductIds(selection)
            },
            //获取productIds
            getProductIds(selection){
                selection.forEach(item => {
                    if (this.idsArr.indexOf(item[this.id]) === -1) {
                        this.idsArr.push(item[this.id])
                    }
                });
            },
        },
        mounted(){

        }

    }
</script>
<style>

</style>
