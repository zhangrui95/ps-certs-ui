<template>
  <div>
    <drag-box class="drag-box" @click.native="show=true" :style="{background: color}">
      <img src="../assets/Iconset.png" class="choice-img">
    </drag-box>
    <div class="flex-page filtrate" v-show="show">
    <div class="filtrate-header" :style="{background: color}">
      <div class="fire-header-left-top">筛选条件</div>
      <div class="fire-header-right" @click="onCancle">取消</div>
      <div class="input-border" v-if="inputShow">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <x-input v-model="searchInput" :placeholder="placeholder" ></x-input>
        </div>
      </div>
    </div>
    <div class="filtate-content">
      <slot></slot>
    </div>
    <div class="footer-box">
      <span class="btn btn-reset" @click="onReset" v-if="reset" :style="{color: color}">重置</span>
      <span class="btn" @click="onSubmit" :style="{background: color}">确定</span>
    </div>
  </div>
</div>

</template>

<script>
  import { XInput } from 'vux'
  import DragBox from '@/components/DragBox'
  export default {
    components: {
      XInput, DragBox
    },
    props: {
      placeholder: {
        type: String,
        default: '请输入关键字'
      }, 
      color: {
        type: String,
        default: '#5f60bd'
      }, 
      reset: {
        type: Boolean,
        default: false
      }, 
      inputShow: {
        type: Boolean,
        default: true
      },
    },
    data () {
      return {
        searchInput: '',
        show: false,
      }
    },
    methods: {
      onCancle () {
        this.show = false
        this.onReset()
      },
      onReset () {
        this.searchInput = '',
        this.$emit('reset')
      },
      onSubmit () {
        this.$emit('submit', this.searchInput)
        this.onCancle()
      }
    }
  }
</script>

<style lang="less">
  .btn-reset{
    background: none!important;
    color: #605fbd;
    width: 60px;
    display: block;
    flex: inherit;
    margin-right: 30px;
    font-size: 16px;
  }
  .drag-box{
    position: fixed;
    top: 78%;
    right: 20px;
    width: 50px;
    height: 50px;
    background: #5f60bd;
    border-radius: 50px;
    z-index: 100;
  }
  .choice-img{
    width: 24px;
    margin: 14px 0 0 14px;
  }
  .filtrate{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.94);
    position: absolute;
    top:0;
    left: 0;
    z-index: 9999;
    font-family: "Microsoft YaHei", "\5b8b\4f53", "Arial", "Helvetica", "sans-serif";
  .filtrate-header{
    padding: 0 20px;
    padding-bottom: 16px;
    background: #605fbd;
    color: #FFFFFF;
    font-size: 16px;
    font-family:"Microsoft YaHei", "\5b8b\4f53", "Arial", "Helvetica", "sans-serif";
    .fire-header-left-top{
      float: left;
      margin-top: 15px;
    }
  }
  .filtate-content{
    margin-bottom: 77px;
    flex: 1;
  }
  .classification-box,.area-box{
    border: none;
    margin: 0;
    background: transparent;
  }
  .choice-after {
    border: 1px dashed #605fbd;
    border-radius: 5px;
    color: #605fbd;
    background: transparent;
  }
  .cover-blue{
    color:#999 ;
    display: block;
    font-weight:700;
  }
  .choice-title{
    color:#605fbd ;
    font-weight: 900;
  }
  .imported-left{
    color: #605fbd;
    width: 15%;
    text-align: center;
    margin: 0 0 0 20px;
    float: left;
    height: 46px;
    line-height: 46px;
  }
  .btn-bg{
    background: #605fbd;
    width: 65%;
    height: 46px;
    line-height: 46px;
    margin: 0 20px 0 0;
    float: right;
    text-align: center;
    border-radius: 5px;
    font-size: 18px;
    font-family: "Microsoft YaHei", "\5b8b\4f53", "Arial", "Helvetica", "sans-serif";
    color: #fff;
  &:active{
     background: #605fbd;
   }
  }
    .weui-cell{
      padding: 7px 15px;
      &:before{
        border: 0;
      }
    }
    .weui-input{
      margin-left: 20px;
    }
  }
  .fire-header-right{
    float: right;
    font-size: 16px;
    margin-top: 15px;
    cursor: pointer;
  }
  .input-border{
    position: relative;
    height: 40px;
    background: #fff;
    width: 100%;
    margin-top: 14px;
    float: left;
    border-radius: 20px;
    .weui-icon-search{
      font-size: 16px;
      margin-top: 6px;
      position: absolute;
      left: 10px;
      top: 0;
      line-height: 28px;
    }
    .weui-icon-clear{
      margin-top: 6px;
      position: absolute;
      top: 0;
      right: 0;
      padding: 0 10px;
      line-height: 28px;
    }
    .weui-input{
      color: #000;
    }
  }
</style>
