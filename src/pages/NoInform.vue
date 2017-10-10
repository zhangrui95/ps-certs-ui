<template>
  <div class="flex-page">
    <div class="header-box">未通知({{listData.count}})</div>
    <group class="no-margin">
      <datetime
        v-model="dateTime"  title="领取时间" placeholder="请选择"
        year-row="{value}年" month-row="{value}月" day-row="{value}日"
        :start-date="new Date() | dateFormat('YYYY-MM-DD')"/>
      <x-input title="领取地址" :show-clear="false" v-model="address" text-align="right"></x-input>
    </group>
    <list-view :list="listData.list" :total="listData.count" :currLen="listData.currLen" @pullingUp="pullingUp" class="approve-list" ref="listView">
      <template scope="props">
        <div class="list-group">
          <div class="group-title" v-if="props.item.first">
            <check-icon :checked='getGroupChecked(props.item.dateStr)' @click.native="setGroupChecked(props.item.dateStr)"/>
            {{props.item.dateStr}}
          </div>
          <div class="list-item">
            <check-icon :checked='props.item.checked' @click="setItemChecked(props.item)"/>
            <span class="item-index">{{props.item.index > 8? props.item.index + 1: '0' + (props.item.index + 1)}}.</span>
            <span class="item-title">{{props.item.name}}</span>
          </div>
        </div>
      </template>
    </list-view>
    <div class="footer-box">
      <a class="btn check-all">
        <check-icon :checked='all' @click="setAllChecked"/>全部选择({{listData.count}})</a>
      <a class="btn" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import ListView from '../components/ListView'
  import CheckIcon from '../components/CheckIcon'
  import { createNamespacedHelpers } from 'vuex'

  const { mapActions, mapState } = createNamespacedHelpers('studentCert')

  export default {
    components: {
      Group, XInput, Datetime, ListView, CheckIcon
    },
    data () {
      return {
        dateTime: '',
        address: '',
        all: true,
        lastDate: '',
//        listData: {currLen: 0, count: 0, list: []}
      }
    },
//    watch: {
//      storeList (newArr) {
//        const arr = []
//        let idx = 0
//        this.listData = {...newArr}
//        this.listData.list = newArr.list.map(item => {
//          let oldItem = this.listData.list.find(oldItem => oldItem.id === item.id)
//          item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
//          item.checked = oldItem ? oldItem.checked : true
//          item.groupChecked = oldItem ? oldItem.groupChecked : true
//          if (arr.indexOf(item.dateStr) === -1) {
//            item.first = true
//            arr.push(item.dateStr)
//            idx = 0
//          }
//          item.index = idx
//          idx++
//          return item
//        })
//        this.lastDate = arr[arr.length - 1]
//      }
//    },
    computed: {
      ...mapState({
//        storeList: state => state.list
        listData: state => {
          const arr = []
          let idx = 0
          const listData = {...state.list}
          listData.list = state.list.list.map(item => {
            let oldItem = listData.list.find(oldItem => oldItem.id === item.id)
            item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
            item.checked = oldItem ? oldItem.checked : true
            item.groupChecked = oldItem ? oldItem.groupChecked : true
            if (arr.indexOf(item.dateStr) === -1) {
              item.first = true
              arr.push(item.dateStr)
              idx = 0
            }
            item.index = idx
            idx++
            return item
          })
          this.lastDate = arr[arr.length - 1]
          return listData
        }
      })
    },
    methods: {
      ...mapActions({
        list: 'list',
        notifyUsers: 'notifyUsers'
      }),
      pullingUp (pageParams) {
        this.list({state: 1, ...pageParams})
      },
      setItemChecked (item) {
        item.checked = !item.checked
//        this.listData.list = this.listData.list.map(item => {
//          if (this.all && item.checked) {
//            this.all = false
//          }
//          return { ...item, checked: item.id === id ? !item.checked : item.checked }
//        })
      },
      getGroupChecked (dateStr) {
        let ownItems = this.listData.list.filter(item => item.dateStr === dateStr)
        return ownItems.length === ownItems.filter(item => item.checked).length
      },
      setGroupChecked (dateStr) {
        const gChk = this.getGroupChecked(dateStr)
        if (this.all && gChk) {
          this.all = false
        }
        this.listData.list = this.listData.list.map(item => {
          return {...item, checked: item.dateStr === dateStr ? !gChk : item.checked}
        })
      },
      setAllChecked () {
        this.all = !this.all
        this.listData.list = this.listData.list.map(item => {
          return {...item, checked: this.all}
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
        this.notifyUsers({id: this.listData.list.filter(item => item.checked).map(item => item.id).join(','), all: this.all ? 1 : 0, time: this.dateTime, address: this.address})
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
