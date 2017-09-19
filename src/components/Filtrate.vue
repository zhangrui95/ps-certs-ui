<template>
  <div :class="[themeClass]">
    <span @click="show = !show">
      <x-icon type="ios-search" class="fixed-btn" size="50"></x-icon>
    </span>
    <div class="filtrate-box" v-show="show">
      <div class="header">
        <div class="left">筛选条件</div>
        <div class="right" @click="cancle">取消</div>
        <div class="input-border">
          <div class="weui-search-bar__box">
            <i class="weui-icon-search"></i>
            <input type="search" v-model="searchInput" class="weui-search-bar__input" placeholder="请输入您要查询的企业名称" required/>
            <a href="javascript:" class="weui-icon-clear" @click="searchInput = ''"></a>
          </div>
        </div>
      </div>
      <slot></slot>  
      <div class="btn-box">
        <div class="btn-reset" @click="reset">重置</div>
        <button class="weui-btn" @click="submit">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { Search, XButton } from 'vux'

  export default {
    components: {
      Search, XButton
    },
    props: {
      themeClass: String,
    },
    data () {
      return {
        show: false,
        searchInput: '',
      }
    },
    methods: {
      cancle () {
        this.show = false
        this.reset()
      },
      reset () {
        this.searchInput = '',
        this.$emit('reset')
      },
      submit () {
        this.$emit('submit', this.searchInput)
        this.cancle()
      }
    }
  }
</script>

<style lang="less">
  .filtrate-box{
    width: 100%;
    height: 100%;
    background:rgba(255,255,255,0.94);
    position: fixed;
    top:0;
    left: 0;
    z-index: 9999;
    font-family: '微软雅黑';
    .header{
      padding: 0 20px;
      height: 110px;
      background: #55a3e7;
      color: #FFFFFF;
      font-size: 16px;
      font-family: '微软雅黑';
      .left{
        float: left;
        margin-top: 15px;
      }
      .right{
        float: right;
        font-size: 16px;
        margin-top: 15px;
        cursor: pointer;
      }
      .input-border{
        height: 40px;
        background: #fff;
        width: 100%;
        margin-top: 14px;
        float: left;
        border-radius: 20px;
        .weui-search-bar__input{
          font-size: 16px;
          margin: 6px 0 0 5px;
        }
        .weui-icon-search{
          font-size: 16px;
          margin-top: 6px;
        }
        .weui-icon-clear{
          margin-top: 6px;
        }
      }
    }
    .btn-box{
      width: 100%;
      padding-top:15px;
      background: #FFFFFF;
      border-top:1px solid #eee;
      position: absolute;
      height: 57px;
      bottom: 0;
      .btn-reset{
        float: left;
        height: 40px;
        line-height: 40px;
        color: #55a3e7;
        width: 15%;
        text-align: center;
        margin: 0 0 0 20px;
      }
      .weui-btn{
        float: right;
        width: 65%;
        margin-right: 20px;
        background: #55a3e7;
      }
    }
  }
  .theme-red{
    .filtrate-box{
      .header{
        background: #ff5a54;
      }
      .btn-box{
        .btn-reset{
          color: #ff5a54;
        }
        .weui-btn{
          background: #ff5a54;
        }
      }
    } 
  }
</style>
