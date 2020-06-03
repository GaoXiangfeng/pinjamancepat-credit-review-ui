<template>
    <Row type="flex">
        <Col span='8'>
            <div class="drag-content">
                <div class='drag-item' draggable='true' v-for='(item, index) in source.leftData' @dragstart='startLeft($event)'
                     :id="item.id" :data-index="index" style="border-bottom: 1px solid #CCCCCC">
                    <img class="channel-img" :src="item.logoUrl" draggable="false"/>
                    <span class="channel-name" draggable="false" >{{item.name}}</span>
                </div>
            </div>
        </Col>

        <Col span='8' offset='1'>
            <div class="drag-content" @drop='onDragDrop($event)' @dragover='allowDrop($event)'>
                <div class='drag-item' v-for='(item, index) in source.rightData' draggable='true'
                     :id="item.id" :data-index="index" @dragstart='startRight($event)' style="border-bottom: 1px solid #CCCCCC">
                    <img class="channel-img" :src="item.logoUrl" draggable="false"/>
                    <span class="channel-name" draggable="false">{{item.name}}</span>
                    <Button type="error" draggable="false" @click="remove(index)" size="small">删除</Button>
                </div>
            </div>
            <div>
                <Button style="margin-left: 10px" type="primary" @click="save" :disabled="!source.rightData.length">保存</Button>
            </div>
        </Col>
    </Row>
</template>

<script>
  export default {
    props: {
      source: {
        type: Object,
        default: function () {
          return {
            leftData: [],
            rightData: []
          }
        }
      },

    },

    data () {
      return {
        dragSrcEl: null
      }
    },

    methods: {
      startLeft (e) {
        this.dragSrcEl = e.target
        e.dataTransfer.effectAllowed = 'copy'
        e.dataTransfer.dropEffect = 'copy'

        e.dataTransfer.setData('text', 'left')
      },
      startRight (e) {
        this.dragSrcEl = e.target
        this.dragSrcEl.style.background="#eaeaea"
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.dropEffect = 'move'
        e.dataTransfer.setData('text', 'right')
      },
      onDragDrop (e) {
        e.preventDefault()
        e.stopPropagation()

        let from = this.dragSrcEl
        let end = e.target.draggable ? e.target : e.target.parentElement
        from.style.background="#FFFFFF"
	      
        let dragFrom = e.dataTransfer.getData('text')
        let fromIndex = from.getAttribute('data-index')
        let endIndex = end.getAttribute('data-index') === null
          ? this.source.rightData.length : end.getAttribute('data-index')

        // 从左往右拖动
        if (dragFrom === 'left') {
          let exist = this.source.rightData.some(function (ele) {
            return ele.id === +from.id
          })

          // 右边已经存在，则不增加
          if (exist) {
            return
          }

          // 插入
          this.source.rightData.splice(endIndex, 0, this.source.leftData[fromIndex])
          return
        }

        // 右侧拖动排序
        let dummy = this.source.rightData[fromIndex]

        // drop到列表最后空白处，和最后的元素交换
        if (endIndex === this.source.rightData.length) {
          this.source.rightData.splice(fromIndex, 1)
          this.source.rightData.push(dummy)
          return
        }

        // drop到列表某元素，交换位置
//        this.source.rightData.splice(fromIndex, 1, this.source.rightData[endIndex])
//        this.source.rightData.splice(endIndex, 1, dummy)
          this.source.rightData.splice(fromIndex, 1)
          this.source.rightData.splice(endIndex, 0, dummy)
      },
      allowDrop (event) {
        event.preventDefault()
      },
      remove (index) {
        this.source.rightData.splice(index, 1)
      },
      save () {
        this.$emit('save')
      }
    }
  }

</script>


<style lang="less" scoped>
    .drag-content {
        margin: 10px;
        border: 1px solid gainsboro;
        height: 600px;
        padding: 10px 10px 50px 10px;
        /*max-height: 400px;*/
        overflow-y: scroll;
    }
    .drag-item {
        line-height: 55px;
        margin-bottom: 10px;
    }
    .channel-img {
        width: 50px;
        vertical-align: middle;
    }
    .channel-name {
        line-height: 30px;
        margin-left: 20px;
        margin-right: 20px;
        display: inline-block;
        width: 100px;
    }

</style>