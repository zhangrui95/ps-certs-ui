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
      <div class="center-box">
        <div v-for="(group, index) in listData" :key="index" class="weui-cells weui-cells_checkbox">
          <div class="time-box time-top">
            <label class="checkbox" :class="{'cancle': group.cancle}">
              <img src="../assets/checked.png" alt="" @click="groupClick(index)">
            </label>
            <span class="time-title">{{group.dateStr}}</span>
          </div>
          <div class="list" v-for="item in group.items" :key="item.id">
            <div class="time-box">
              <label class="checkbox" :class="{cancle: item.cancle}">
                <img src="../assets/checked.png" alt="" @click="itemClick(item.id)">
              </label>
              <div class="number checkbox-left-num number-line-height">{{index>=10?index:'0'+(index+1)}}.</div>
              <div class="list-news">
                <div class="name-color name-color-line">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </list-view>
    <div class="btn-box">
      <a class="btn-min check-all">
        <label class="checkbox" :class="{'cancle': !checkAll}" >
          <img src="../assets/checked.png" alt="" @click="checkAllClick">
        </label>全部选择({{choiseNum}})</a>
      <a class="btn-min" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import ListView from '@/components/ListView'
  import TopNav from '@/components/TopNav'
  import { post } from '@/utils/ajax'

  export default {
    components: {
      Group, XInput, Datetime,
      TopNav, ListView
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
          if (iof == -1) {
            dateStrArr.push(dateStr)
            result.push({ dateStr: dateStr, items: [item] })
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
            if (!item.cancle) ids += item.id + ','
          })
        })
        ids = ids.substring(0,ids.length-1)
        console.log(ids)
      },
      checkAllClick () {
        this.checkAll = !this.checkAll;
        this.listData = this.listData.map(group => {
          group.items.map(item => {
            item.cancle = !this.checkAll         
            return item
          })
          group.cancle = !this.checkAll
          return group
        })
      },
      groupClick (i) {
        this.checkAll = true
        this.listData = this.listData.map((group, index) => {
          if ( index == i ) {
            group.cancle = !group.cancle
            group.items.forEach(item => item.cancle = group.cancle)
          }
          if (group.cancle) this.checkAll = false
          return group
        })
      },
      itemClick (id) {
        this.checkAll = true
        this.listData = this.listData.map(group => {
          group.cancle = false
          group.items.map(item => {
            if (item.id == id) {
              item.cancle = !item.cancle
              } 
            if (item.cancle) {
              group.cancle = true
            }              
            return item
          })
          if (group.cancle) this.checkAll = false
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
  padding-left: 24px;
  box-sizing: border-box;
  .checkbox{
    top: 13px;
    left: 0;
    margin: 0;
    line-height: 12px;
  }
}
</style>
