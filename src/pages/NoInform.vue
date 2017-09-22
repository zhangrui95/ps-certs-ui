<template>
  <div class="flex-page">
    <div class="header-box">未通知({{count}})</div>
    <group>
      <datetime
        v-model="dateTime"  title="领取时间"
        year-row="{value}年" month-row="{value}月" day-row="{value}日"
        :start-date="new Date() | dateFormat"/>
      <x-input title="领取地址" :show-clear="false" v-model="address"></x-input>
    </group>
    <list-view url="/example/api/studentCert.json">
      <div class="list-wrap">
        <div class="list-group" v-for="(group, index) in listData" :key="index">
          <div class="group-title">
            <check-icon :checked='group.checked' @click.native="groupClick(index)"/>
            {{group.dateStr}}
          </div>
          <div class="list-item" v-for="(item, itemIndex) in group.items" :key="item.id">
            <check-icon :checked='item.checked' @click.native="itemClick(item.id)"/>
            <span class="item-index">{{itemIndex>=10?itemIndex:'0'+(itemIndex+1)}}.</span>
            <span class="item-title">{{item.name}}</span>
          </div>
        </div>
      </div>
    </list-view>
    <div class="btn-box">
      <a class="btn-min check-all">
        <check-icon :checked='checkAll' @click="checkAllClick"/>全部选择({{choiseNum}})</a>
      <a class="btn-min" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import ListView from '@/components/ListView'
  import TopNav from '@/components/TopNav'
  import CheckIcon from '@/components/CheckIcon'
  import { post } from '@/utils/ajax'

  export default {
    components: {
      Group, XInput, Datetime,
      TopNav, ListView, CheckIcon
    },
    data () {
      return {
        count: 0,
        dateTime: dateFormat(new Date(), 'YYYY-MM-DD'),
        address: '',
        listData: [],
        choiseNum: 0,
        checkAll: true,
      }
    },
    computed: {
      storeListData () {
        let result = []
        let dateStrArr = []
        this.$store.state.listData.forEach(item => {
          let dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
          let iof = dateStrArr.indexOf(dateStr)
          item.checked = true
          if (iof == -1) {
            dateStrArr.push(dateStr)
            result.push({ dateStr: dateStr, checked: true, items: [item] })
          } else {
            result[iof].items.push(item)
          }
        })
        return result
      },
    },
    watch: {
      storeListData: function (newVal) {
        this.listData = newVal
      }
    },
    created () {
      this.$store.commit('updateFiltrate', { state: 1 })
      post('/example/api/studentCert.json').then(data => {
        this.count = data.count
      })
    },
    methods: {
      submit () {
        let ids = ''
        this.listData.forEach(group => {
          group.items.forEach(item => {
            if (!item.checked) ids += item.id + ','
          })
        })
        ids = ids.substring(0,ids.length-1)
        console.log(ids)
      },
      checkAllClick () {
        this.checkAll = !this.checkAll;
        this.listData = this.listData.map(group => {
          group.items.map(item => {
            item.checked = !this.checkAll         
            return item
          })
          group.checked = !this.checkAll
          return group
        })
      },
      groupClick (i) {
        this.checkAll = true
        this.listData = this.listData.map((group, index) => {
          if ( index == i ) {
            group.checked = !group.checked
            group.items.forEach(item => item.checked = group.checked)
          }
          if (!group.checked) this.checkAll = false
          return group
        })
      },
      itemClick (id) {
        this.checkAll = true
        this.listData = this.listData.map(group => {
          group.checked = true
          group.items.map(item => {
            if (item.id == id) {
              item.checked = !item.checked
              } 
            if (!item.checked) {
              group.checked = false
            }              
            return item
          })
          if (!group.checked) this.checkAll = false
          return group
        })
      }
    }
  }
</script>

<style lang="less">
.check-all{
  background: none;
  color: #000;
  text-align: left;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
}
</style>
