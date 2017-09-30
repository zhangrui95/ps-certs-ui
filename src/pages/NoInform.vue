<template>
  <div class="flex-page">
    <div class="header-box">未通知({{count}})</div>
    <group class="no-margin">
      <datetime
        v-model="dateTime"  title="领取时间" placeholder="请选择"
        year-row="{value}年" month-row="{value}月" day-row="{value}日"
        :start-date="new Date() | dateFormat('YYYY-MM-DD')"/>
      <x-input title="领取地址" :show-clear="false" v-model="address" text-align="right"></x-input>
    </group>
    <list-view url="api/studentCert.json" ref="listView" :list="listData" :params="params" :startY="scrollTop" @update="update">
      <div class="approve-list">
        <div class="list-group" v-for="group in groups" :key="group.dateStr">
          <div class="group-title">
            <check-icon :checked='group.checked' @click.native="groupClick(!group.checked, group.dateStr)"/>
            {{group.dateStr}}
          </div>
          <div class="list-item" v-for="(item, index) in group.items" :key="item.id" v-if="group.dateStr == item.dateStr">
            <check-icon :checked='item.checked' @click.native="itemClick(item.id)"/>
            <span class="item-index">{{index>8?index+1:'0'+(index+1)}}.</span>
            <span class="item-title">{{item.name}}</span>
          </div>
        </div>
      </div>
    </list-view>
    <div class="footer-box">
      <a class="btn check-all">
        <check-icon :checked='allChecked' @click.native="allClick(!allChecked)"/>全部选择({{checkedCount}})</a>
      <a class="btn" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import ListView from '@/components/ListView'
  import TopNav from '@/components/TopNav'
  import CheckIcon from '@/components/CheckIcon'
  import { post } from '@/utils/ajax'
  import { createNamespacedHelpers } from 'vuex'

  const { mapActions, mapState } = createNamespacedHelpers('studentCert')

  export default {
    components: {
      Group, XInput, Datetime,
      TopNav, ListView, CheckIcon
    },
    data () {
      return {
        count: 0,
        dateTime: '',
        address: '',
        scrollTop: 0,
        params: {},
        listData: []
      }
    },
    created () {
      this.params = { state: 1 }
    },
    computed: {
      ...mapState({

      }),
      groups () {
        return this.listData
          .map(item => dateFormat(item.createTime, 'YYYY年MM月DD日'))
          .filter((dateStr, i, arr) =>  arr.indexOf(dateStr, i+1) == -1 )
          .map(dateStr => {
            return { dateStr,
              checked: this.listData.every(item => !(item.dateStr == dateStr && !item.checked)),
              items: this.listData.filter(item => item.dateStr == dateStr)
            }
          })
      },
      allChecked () {
        return this.listData.filter(item => item.checked).length === this.listData.length
      },
      checkedCount () {
        return this.listData.filter(item => item.checked).length
      }
    },
    methods: {
      ...mapActions({
        notifyUsers: 'notifyUsers'
      }),
      update (data) {
        this.count = data.count
        this.listData = [ ...this.listData, ...data.list.map(item => {
          return {...item, dateStr:dateFormat(item.createTime, 'YYYY年MM月DD日'), checked: true,}
        })]
      },
      allClick (checked) {
        this.listData = this.listData.map(item => {
          return {...item, checked}
        })
      },
      groupClick (checked, dateStr) {
        this.listData = this.listData.map(item => {
          return {...item, checked: item.dateStr == dateStr? checked: item.checked}
        })
      },
      itemClick (id) {
        this.listData = this.listData.map(item => {
          return {...item, checked: item.id == id? !item.checked: item.checked}
        })
      },
      submit () {
        if (!this.dateTime || !this.address) {
          this.$vux.toast.text('请填写领取地址与领取时间')
          return
        }
        let that = this
        this.$vux.confirm.show({
          title: '是否确认发送通知',
          onConfirm () {
            that.confirm()
          }
        })
      },
      confirm () {
        this.notifyUsers({id: this.listData.filter(item => item.checked).map(item => item.id).join(','), all: this.allChecked? 1: 0, time: this.dateTime, address: this.address})
//        post('api/studentCert/notifyUsers.json',{
//          id: this.listData.filter(item => item.checked).map(item => item.id).join(','),
//          all: this.allChecked? 1: 0,
//          time: this.dateTime,
//          address: this.address,
//        }).then(data => {
//          if (data.state === 0) {
//            this.$vux.toast.show({text:'发送成功'})
//            this.dateTime = ''
//            this.address = ''
//            this.allClick()
//            this.listData = []
//            this.$refs.listView.refresh()
//          }else{
//            this.$vux.toast.text('发送失败')
//          }
//        })
      }
    }
  }
</script>

<style lang="less">
.no-margin{
  .vux-no-group-title{
    margin-top: 0;
  }
}
.check-all{
  background: none;
  color: #000;
  text-align: left;
  font-size: 16px;
  position: relative;
  box-sizing: border-box;
}
</style>
