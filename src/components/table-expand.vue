<template>
    <div>
        <div v-for="(item,index) in infors" :key="index" style="padding-left:20px;">
            <Row class="expand-row" >
                <Col span="8">
                    <span class="expand-key">audit time: </span>
                    <span class="expand-value">{{ item.auditTime }}</span>
                </Col>
                <Col span="5">
                    <span class="expand-key">level: </span>
                    <span class="expand-value">{{ item.level }}</span>
                </Col>
                <Col span="7">
                    <span class="expand-key">audit result: </span>
                    <span class="expand-value">{{ item.action }}</span>
                </Col>
                <Col span="4">
                    <span class="expand-key">auditor: </span>
                    <span class="expand-value">{{ item.auditor }}</span>
                </Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="24">
                    <span class="expand-key">remark: </span>
                    <span class="expand-value">{{ item.remark }}</span>
                </Col>
            </Row>
             <hr v-if="index!==infors.length-1">
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            infors: Array
        }
    }
</script>
<style lang="less" scoped>
    .expand-row{
        margin-bottom: 5px;
    }
    .expand-key{
        font-size: 14px;
        font-weight: 800;
        margin-right:5px;
    }
    .expand-value{
        word-break: break-all;
    }
</style>
