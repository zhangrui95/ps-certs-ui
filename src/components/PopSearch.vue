<template>
  <div class="filtrate-header">
    <div class="fire-header-left-top">筛选条件</div>
    <div class="fire-header-right" @click="Default()">取消</div>
    <div class="input-border">
      <div class="weui-search-bar__box">
        <i class="weui-icon-search"></i>
        <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="请输入您要查询的企业名称" required/>
        <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    methods: {
      Default: function () {
        this.popShow = false
//        this.$emit('popShow', false)
      }
    }
  }
</script>
