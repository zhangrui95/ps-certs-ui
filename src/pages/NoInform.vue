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
          <check-icon class="group-title" v-if="props.item.first" :data="props.item" :value='props.item.groupChecked' @update:value="setGroupChecked">
            {{props.item.dateStr}}
          </check-icon>
          <check-icon class="list-item" :value='props.item.checked' :data="props.item" @update:value='setItemChecked'>
            <span class="item-index">{{props.item.index > 8? props.item.index + 1: '0' + (props.item.index + 1)}}.</span>
            <span class="item-title">{{props.item.name}}</span>
          </check-icon>
        </div>
      </template>
    </list-view>
    <div class="footer-box">
      <check-icon class="btn check-all" :value.sync='all'>
        全部选择({{listData.count}})
      </check-icon>
      <a class="btn" @click="submit">通知</a>
    </div>
  </div>
</template>

<script>
  import { Group, XInput, Datetime, dateFormat } from 'vux'
  import { createNamespacedHelpers } from 'vuex'
  import ListView from '../components/ListView'
  import CheckIcon from '../components/CheckIcon'
  import * as api from '../api/studentCert'

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
        listData: {currLen: 0, count: 0, list: []}
      }
    },
    watch: {
      storeList (newArr) {
        const arr = []
        let idx = 0
        this.listData = {...newArr}
        this.listData.list = newArr.list.map(item => {
          let oldItem = this.listData.list.find(oldItem => oldItem.id === item.id)
          item.dateStr = dateFormat(item.createTime, 'YYYY年MM月DD日')
          item.checked = this.all || (oldItem && !!oldItem.checked)
          if (arr.indexOf(item.dateStr) === -1) {
            item.first = true
            item.groupChecked = this.all || (oldItem && !!oldItem.groupChecked)
            arr.push(item.dateStr)
            idx = 0
          }
          item.index = idx
          idx++
          return item
        })
        this.lastDate = arr[arr.length - 1]
      },
      all (all) {
        if (all) {
          this.listData.list = this.listData.list.map(item => {
            let groupChecked
            if (item.first) {
              groupChecked = true
            }
            return {...item, checked: this.all, groupChecked}
          })
        }
      }
    },
    computed: {
      ...mapState({
        storeList: state => state.list
      })
    },
    methods: {
      ...mapActions({
        list: 'list'
      }),
      pullingUp (pageParams) {
        this.list({state: 1, ...pageParams})
      },
      setItemChecked (value, item) {
        item.checked = value
        const dateStr = item.dateStr
        if (value) {
          this.getGroupChecked(dateStr)
          this.listData.list = this.listData.list.map(item => {
            return {...item, groupChecked: item.first ? (item.dateStr === dateStr ? this.getGroupChecked(dateStr) : item.groupChecked) : item.groupChecked}
          })
        } else {
          this.all = false
          this.listData.list = this.listData.list.map(item => {
            return {...item, groupChecked: item.first ? (item.dateStr === dateStr ? value : item.groupChecked) : item.groupChecked}
          })
        }
      },
      getGroupChecked (dateStr) {
        let ownItems = this.listData.list.filter(item => item.dateStr === dateStr)
        return ownItems.length === ownItems.filter(item => item.checked).length
      },
      setGroupChecked (value, item) {
        item.groupChecked = value
        if (!value) {
          this.all = false
        }
        const dateStr = item.dateStr
        this.listData.list = this.listData.list.map(item => {
          return {...item, checked: item.dateStr === dateStr ? value : item.checked}
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
      async confirm () {
        const params = {all: this.all ? 1 : 0, time: this.dateTime, address: this.address}
        if (!this.all) {
          params.id = this.listData.list.filter(item => item.checked).map(item => item.id).join(',')
          if (this.listData.list.filter(item => item.groupChecked && item.dateStr === this.lastDate).length !== 0) {
            params.dates = this.lastDate
          }
        }
        let rest = await api.notifyUsers(params)
        if (rest.data.state === 0) {
          this.$refs.listView.reload()
        }
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
