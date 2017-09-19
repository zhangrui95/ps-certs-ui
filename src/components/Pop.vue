<template>
  <div class="blank active" id="alert" style="display: block; opacity: 1;" v-if="show">
    <div class="fixed-top"></div>
    <div class="td-style" v-for="n in news">
      <div class="td-name">{{n.name}}</div>
      <input type="text" id="n.id" :placeholder="n.placeholder">
    </div>
    <div class="prompt" id="hite"></div>
    <div class="button-box" data-id="employee_list">
      <a class="imported-left none-style" href="javascript:" id="dis-none2" data-id="police-company_list" @click="HidePop">取消</a>
      <a class="btn-bg bg-style" href="javascript:" id="new-save" data-id="police-company_list">确定</a>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    props: [
      'show',
      'news'
    ],
    methods: {
      HidePop: function () {
        this.show = false
        this.$emit('addLegal', false)
      }
    }
  }
</script>
