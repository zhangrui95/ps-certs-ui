<template>
  <div class="custom-checker" :style="{height: wrapHeight}" ref="checker">
    <div class="checker-title">
      {{title}}
      <span v-if="btnShow" @click="toggle">{{toggelText}}</span>
    </div>
    <checker v-model="value" selected-item-class="checker-item-selected">
      <checker-item value="">全部</checker-item>
      <checker-item v-for="item in list" :key="item.id" :value="item.id" >{{item.name + (item.num?' ('+item.num+')':'')}}</checker-item>
    </checker>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'

  export default {
    components: {
      Checker, CheckerItem
    },
    props: [
      'ctrl', 'title', 'list'
    ],
    data () {
      return {
        hideHeight: 175,
        toggelText: '展开全部↓',
        wrapHeight: '100%',
        btnShow: true,
        value: ''
      }
    },
    watch: {
      list: function () {
        this.$nextTick(() => {
          this.btnShow = this.ctrl && this.$refs.checker.clientHeight > this.hideHeight
          if (this.btnShow) this.wrapHeight = this.hideHeight+'px'
        }) 
      }
    },
    methods: {
      toggle () {
        if (this.toggelText == '收起↑') {
          this.toggelText = '展开全部↓'
          this.wrapHeight = this.hideHeight+'px'
        } else {
          this.toggelText = '收起↑'
          this.wrapHeight = '100%'
        }
      },
      getValue () {
        return this.value
      },
      reset () {
        this.value = ''
      }
    }
  }
</script>