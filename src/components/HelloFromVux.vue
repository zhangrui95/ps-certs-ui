<template>
  <div>
    <group title="选择入口">
      <cell title="所领导入口" link='/LeaderGrid'></cell>
      <cell
        title="民警入口"
        is-link :border-intent="false"
        :arrow-direction="policeRoleShow ? 'up' : 'down'"
        @click.native="policeRoleShow = !policeRoleShow"></cell>
      <template v-if="policeRoleShow">
        <cell-box link='/PoliceGrid'>民警</cell-box>
        <cell-box link='/PoliceGrid'>企业管理员</cell-box>
        <cell-box link='/PoliceGrid'>值班管理员</cell-box>
        <cell-box link='/PoliceGrid'>综合管理员</cell-box>
      </template>
      <cell
        title="企业入口"
        is-link :border-intent="false"
        :arrow-direction="companyRoleShow ? 'up' : 'down'"
        @click.native="companyRoleShow = !companyRoleShow">
      </cell>
      <template v-if="companyRoleShow">
        <cell-box link='/Company'>企业</cell-box>
        <cell-box link='/Hotel'>旅店洗浴</cell-box>
        <cell-box link='/Station'>加油站</cell-box>
      </template>
      <cell title="社区楼长入口" link='/'></cell>
      <cell title="社区领导入口" link='/'></cell>
      <cell title="游客入口" link='/Visitors'></cell>
      <cell title="Console" link='/'></cell>
      <cell title="Dome" link="https://vux.li/demos/v2/?x-page=v2-doc-home#/demo"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'

export default {
  components: {
    Group,
    Cell,
    CellBox
  },
  data () {
    return {
      policeRoleShow: false,
      companyRoleShow: false
    }
  },
  methods: {

  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
