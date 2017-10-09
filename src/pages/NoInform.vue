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
    <list-view :list="listData"  @pullingUp="pullingUp" class="approve-list" ref="listView">
      <template scope="props">
        <div class="list-group">
          <div class="group-title" v-if="props.item.first">
            <check-icon :checked='getGroupChecked(props.item.dateStr)' @click.native="setGroupChecked(props.item.dateStr)"/>
            {{props.item.dateStr}}
          </div>
          <div class="list-item">
            <check-icon :checked='props.item.checked' @click.native="setItemChecked(props.item.id)"/>
            <span class="item-index">{{props.index > 8? props.index + 1: '0' + (props.index + 1)}}.</span>
            <span class="item-title">{{props.item.name}}</span>
          </div>
        </div>
      </template>
    </list-view>
    <div class="footer-box">
      <a class="btn check-all">
        <check-icon :checked='getAllChecked()' @click.native="setAllChecked()"/>全部选择({{checkedCount}})</a>
      <a class="btn" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import ListView from '@/components/ListView'
  import TopNav from '@/components/TopNav'
  import CheckIcon from '@/components/CheckIcon'
  import { createNamespacedHelpers } from 'vuex'
  import * as types from '@/store/mutation-types'

  const { mapActions, mapMutations, mapState, mapGetters } = createNamespacedHelpers('studentCert')

  export default {
    components: {
      Group, XInput, Datetime,
      TopNav, ListView, CheckIcon
    },
    data () {
      return {
        dateTime: '',
        address: '',
        listData: []
      }
    },
    created () {
      this.list({state: 1, offset: 0})
    },
    watch: {
      storeList (newArr) {
        let arr = []
        this.listData = newArr.map(item => {
          let oldItem = this.listData.find(oldItem => oldItem.id == item.id )
          item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
          item.checked = oldItem? oldItem.checked : true
          item.groupChecked = oldItem? oldItem.checked : true
          if (arr.indexOf(item.dateStr) == -1) {
            item.first = true
            arr.push(item.dateStr)
          }
          return item
        })
      }
    },
    computed: {
      ...mapState({
        count: state => state.count,
        storeList: state => state.list,
      }),
      allChecked () {
        return true
      },
      checkedCount () {
        return 0
      }
    },
    methods: {
      ...mapActions({
        list: 'list'
      }),
      pullingUp (data) {
        this.list({state: 1})
      },
      setItemChecked (id) {
        this.listData = this.listData.map(item => {
          return { ...item, checked: item.id == id? !item.checked: item.checked }
        })
      },
      getGroupChecked (dateStr) {
        let ownItems = this.listData.filter(item => item.dateStr == dateStr)
        return ownItems.length == ownItems.filter(item => item.checked).length
      },
      setGroupChecked (dateStr) {
        this.listData = this.listData.map(item => {
          return {...item, checked: item.dateStr == dateStr? !this.getGroupChecked(dateStr): item.checked}
        })
      },
      getAllChecked () {
        return this.listData.length == this.listData.filter(item => item.checked).length
      },
      setAllChecked () {
        this.listData = this.listData.map(item => {
          return {...item, checked: !this.getAllChecked()}
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
        post('api/studentCert/notifyUsers.json',{
          id: this.listData.filter(item => item.checked).map(item => item.id).join(','),
          all: this.allChecked? 1: 0,
          time: this.dateTime,
          address: this.address,
        }).then(data => {
          if (data.state === 0) {
            this.$vux.toast.show({text:'发送成功'})
            this.dateTime = ''
            this.address = ''
            this.allClick()
            this.listData = []
            this.$refs.listView.refresh()
          }else{
            this.$vux.toast.text('发送失败')
          }
        })
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
