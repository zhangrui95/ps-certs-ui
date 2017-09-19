<template>
  <div class="custom-checker" :style="{height: wrapHeight}" ref="checker">
    <div class="checker-title">
      {{title}}
      <span v-if="btnShow" @click="toggle">{{toggelText}}</span>
    </div>
    <checker v-model="value" type="checkbox" selected-item-class="checker-item-selected">
      <checker-item value="all" @on-item-click="reset">全部</checker-item>
      <checker-item v-for="item in list" :key="item.id" :value="item.id" @on-item-click="setValue($event)">{{item.name + (item.num?' ('+item.num+')':'')}}</checker-item>
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
        value: ['all'],
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
      setValue () {
        this.value = this.value.filter(item => item != 'all')
      },
      getValue () {
        var str = ''
        this.value.forEach(item => str += item + ',')
        str = str == 'all,'?'':str.substring(0,str.length-1)
        return str
      },
      reset () {
        this.value = ['all']
      }
    }
  }
</script>

<style lang="less">
  .custom-checker{
    overflow: hidden;
    font-size: 16px;
    .checker-title{
      color:#55a3e7 ;
      font-weight: 900;
      margin: 10px;
      span{
        float: right;
        font-size: 13px;
        padding-top: 5px;
        color: #bbb;
      }
    }
    .vux-checker-box{
      margin: 10px;
      .vux-checker-item{
        float: left;
        padding: 2px 10px;
        margin: 5px;
        cursor: pointer;
        border: 1px solid #fff;
      }
      .checker-item-selected {
        border: 1px dashed #55a3e7;
        border-radius: 5px;
        color: #55a3e7;
        background: transparent;
      }
    }
  }
  .theme-blue{
    .custom-checker{
      .checker-title{
        color:#ff5a54 ;
      }
      .checker-item-selected {
        border: 1px dashed #ff5a54;
        color: #ff5a54;
      }
    }
  }
</style>
