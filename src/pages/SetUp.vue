<template>
  <div class="index-list">
    <scroll
      ref="indexList"
      :listen-scroll="listenScroll"
      :probe-type="probeType"
      :data="data"
      :click="true"
      @scroll="scroll">
      <div class="index-list-content">
        <div v-for="(group, index) in data" :key="index" ref="listGroup">
          <group :title="group.name">
            <cell v-for="(item, index) in group.polices" :key="index" @click.native="setValue(item.id)">
              <div slot="title">
                <i v-show="value==item.id" class="weui-icon weui_icon_success weui-icon-success"></i>
                <i v-show="value!=item.id" class="weui-icon weui_icon_circle weui-icon-circle"></i>
                <img :src="item.avatar || 'static/images/head.jpg'">
                <span>{{item.name}}</span>
              </div>
            </cell>
          </group>
        </div>
      </div>
    </scroll>
    <div class="index-list-nav" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul><li v-for="(item, index) in shortcutList" :key="index" :data-index="index" :class="{current: currentIndex === index}">{{item}}</li></ul>
    </div>
    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">{{fixedTitle}}</div>
    <btn btn="确定" goLink="" :clickDics="submit"></btn>
  </div>
</template>

<script>
  import { Cell, Group, XButton } from 'vux'
  import Scroll from '@/components/Scroll'
  import Btn from '@/components/Btn'
  import { post } from '@/utils/ajax'

  const SUBTITLE_HEIGHT = 40
  const ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18

  export default {
    components: {
      Cell, Group, XButton,
      Scroll, Btn,
    },
    data() {
      return {
        currentIndex: 0,
        scrollY: -1,
        diff: -1,
        probeType: 3,
        listenScroll: true,
        listHeight: [],
        touch: {},
        data: [],
        value: '',
      }
    },
    created () {
      post('/example/api/user/role.json').then(data => {
        let RuleByInitial = [],
        InitialArr = []
        data.forEach(item => {
          let Initial = (item.phonetic || '*').substring(0,1).toUpperCase()
          if (InitialArr.indexOf(Initial) === -1) {
            InitialArr.push(Initial)
            RuleByInitial.push({ name: Initial, polices: [] })
          }{
            RuleByInitial[InitialArr.indexOf(Initial)].polices.push(item)
          }
        })
        this.data = RuleByInitial
      })
    },
    mounted() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    computed: {
      fixedTitle() {
        if (this.scrollY > 0) {
          return ''
        }
        return this.data[this.currentIndex] ? this.data[this.currentIndex].name : ''
      },
      shortcutList() {
        return this.data.map((group) => {
          return group.name.substr(0, 1)
        })
      }
    },
    methods: {
      setValue (id) {
        this.value = id
      },
      submit () {
         post('/example/api/rota/allot.json',{uid: this.value}).then(data => {
          this.$router.back();
         }).catch(err => {
            this.$vux.alert.show({
                title: err || '当前网络不可用，请检查你的网络设置'
            })
         })
      },
      refresh() {
        this.$refs.indexList.refresh()
      },
      selectItem(item) {
        console.log(item)
      },
      scroll(pos) {
        this.scrollY = pos.y
      },
      onShortcutTouchStart(e) {
        let anchorIndex = e.target.getAttribute('data-index')
        let firstTouch = e.touches[0]
        this.touch.y1 = firstTouch.pageY
        this.touch.anchorIndex = anchorIndex

        this._scrollTo(anchorIndex)
      },
      onShortcutTouchMove(e) {
        let firstTouch = e.touches[0]
        this.touch.y2 = firstTouch.pageY
        let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
        let anchorIndex = parseInt(this.touch.anchorIndex) + delta

        this._scrollTo(anchorIndex)
      },
      _calculateHeight() {
        const list = this.$refs.listGroup
        if (!list) {
          return
        }
        this.listHeight = []
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      },
      _scrollTo(index) {
        if (!index && index !== 0) {
          return
        }
        if (index < 0) {
          index = 0
        } else if (index > this.listHeight.length - 2) {
          index = this.listHeight.length - 2
        }
        this.$refs.indexList.scrollToElement(this.$refs.listGroup[index], 0)
        this.scrollY = this.$refs.indexList.scroll.y
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this._calculateHeight()
        }, 20)
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < SUBTITLE_HEIGHT) ? newVal - SUBTITLE_HEIGHT : 0
        if (this.fixedTop === fixedTop) {
          return
        }
        this.fixedTop = fixedTop
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
      },
      scrollY(newY) {
        const listHeight = this.listHeight
        // 在中间部分滚动
        for (let i = 0; i < listHeight.length - 1; i++) {
          let height1 = listHeight[i]
          let height2 = listHeight[i + 1]
          if (-newY >= height1 && -newY < height2) {
            this.currentIndex = i
            this.diff = height2 + newY
            return
          }
        }
        // 当滚动到顶部，newY>0
        if (newY > 0) {
          this.currentIndex = 0
          return
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2
      }
    },
  }

</script>

<style lang="less">
  .index-list{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    .index-list-content{
      padding-bottom: 70px;
      .weui-cells__title{
        height: 20px;
        line-height: 20px;
        padding-left: 25px;
        color: #787878;
        background: #f0f0f6;
        font-size: 14px;
        margin: 0;
      }
      .weui-cell{
        .vux-label{
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            vertical-align: middle;
            margin-right: 20px;
          }
          i{
            vertical-align: middle;
          }
          span{
            vertical-align: middle;
          }
        }

      }
    }
    .index-list-fixed{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      height: 20px;
      line-height: 20px;
      padding-left: 25px;
      color: #787878;
      background: #f0f0f6;
      font-size: 14px;
      margin: 0;
    }
    .index-list-nav{
      position: absolute;
      z-index: 30;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-family: Helvetica;
      ul{
        padding: 0;
        margin: 0;
        list-style: none;
        li{
          padding: 8px 16px 0 16px;
          line-height: 1;
          text-align: center;
          box-sizing: border-box;
          font-size: 14px;
          color: #333;
          &.current{
            color: #55a3e7;
          }
        }
      }
    }
  }
</style>
