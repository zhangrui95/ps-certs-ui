<template>
  <svg class="check-icon" :style="styleObj" xmlns="http://www.w3.org/2000/svg" viewBox="100 100 300 300">
    <path d="M223.9 329.7c-2.4 2.4-5.8 4.4-8.8 4.4s-6.4-2.1-8.9-4.5l-56-56 17.8-17.8 47.2 47.2L340 177.3l17.5 18.1-133.6 134.3z"></path>
  </svg>
</template>

<script>
  export default {
    props: {
      size: {
        type: String,
        default: '20'
      },
      color: {
        type: String,
        default: '#605fbd',
      },
      checked: {
        type: Boolean,
        default: false,
      }
    },
    computed: {
      styleObj () {
        return {
          width: this.size + 'px',
          border: '1px solid ' + this.color,
          background: this.checked? this.color: 'transparent',
        }
      }
    }
  }
</script>

<style lang="less" scoped>
.check-icon{
  width: 30px;
  fill: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  vertical-align: sub;
  margin: 0 5px;
}
</style>


