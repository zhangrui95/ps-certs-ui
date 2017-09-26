<template>
  <group title="选择入口">
      <cell-box @click.native="changeHref" data-hash="Student" data-menu="2" :border-intent="false" is-link>学生办理居住证明入口</cell-box>
      <cell-box @click.native="changeHref" data-hash="Student" data-menu="1" :border-intent="false" is-link>学生身份证办理入口</cell-box>
      <cell-box @click.native="changeHref" data-hash="Approve" data-menu="2" :border-intent="false" is-link>民警居住证明入口</cell-box>
      <cell-box @click.native="changeHref" data-hash="Approve" data-menu="1" :border-intent="false" is-link>民警身份证入口</cell-box>
      <cell-box @click.native="changeHref" data-hash="Console" :border-intent="false" is-link>Console</cell-box>
  </group>
</template>

<script>
import { Cell, CellBox, Group, querystring } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellBox
  },
  methods: {
    changeHref (e) {
      let { hash, menu } = e.target.dataset
      let userid = querystring.parse().userid || 'value'
      this.$router.push(`/${hash}?userid=${userid}&type=${menu}`)
    }
  }
}
</script>
