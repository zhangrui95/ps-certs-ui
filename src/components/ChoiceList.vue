<template>
  <div class="classification-box">
    <div class="choice-title">{{title}}
      <!--<span class="cover-blue" @click="open">{{clear}}</span>-->
    </div>
    <div class="cover-all-box">
      <ul class="classification" id="classification">
        <checker v-model="checked" type="checkbox" default-item-class="demo5-item" selected-item-class="demo5-item-selected">
          <checker-item :key="0" :value="0"><span class="item-name">全部</span></checker-item>
          <checker-item v-for="(lis,i) in list" :key="i+1" :value="i+1"><span class="item-name">{{lis.name}}</span><span><span> {{lis.num}}</span></span></checker-item>
          <div class="more" @click="more" v-if="tag"><span class="item-name">……</span></div>
        </checker>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Checker, CheckerItem } from 'vux'
  export default {
    components: {
      Checker,
      CheckerItem
    },
    data () {
      return {
        checked: [0],
        show: 'true',
        clear: '展开全部'
      }
    },
    props: [
      'list',
      'title',
      'more',
      'tag'
    ],
    methods: {
      open () {
        this.show = !this.show
        if (this.show) {
          this.clear = '展开全部'
        } else {
          this.clear = '收起'
        }
      }
    }
  }
</script>

<style scoped>
  .box {
    padding: 0 15px;
  }
  .demo5-item {
    /*float: left;*/
    /*padding: 2px 10px;*/
    /*margin: 5px;*/
    /*cursor: pointer;*/
    /*border: 1px dashed #FFFFFF;*/
    float: left;
    margin: 6px 1%;
    cursor: pointer;
    width: 31%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: #f5f5f5;
    border-radius: 50px;
    font-size: 14px;
    color: #666;

  }
  .demo5-item-selected {
    background:-moz-linear-gradient(left, #6a95fd, #467bed);/*Mozilla*/
    background:-webkit-gradient(linear,0 50%,100% 50%,from(#6a95fd),to(#467bed));/*Old gradient for webkit*/
    background:-webkit-linear-gradient(left,#6a95fd,#467bed);/*new gradient for Webkit*/
    background:-o-linear-gradient(left,#6a95fd,#467bed); /*Opera11*/
    color: #ffffff;
    box-shadow: 0px 1px 8px #9db8f6;
  }
  .more{
    float: left;
    margin: 6px 1%;
    cursor: pointer;
    width: 31%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    background: #f5f5f5;
    border-radius: 50px;
    font-size: 14px;
    color: #666;
    position: absolute;
    top: 175px;
    right: 2%;
  }
</style>
