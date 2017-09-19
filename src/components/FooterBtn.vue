<template>
  <div class="footer-btn-box">
    <slot></slot>
  </div>
</template>

<style lang="less">
  .footer-btn-box {
    display: flex;
    width: 100%;
    background: #fff;
    border-top: 1px solid #eee;
    position: fixed;
    bottom: 0;
    z-index: 1000;
    .weui-btn {
      flex: 1;
      margin: 15px;
    }
  }
</style>
