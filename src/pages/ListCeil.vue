<template>
  <div class="list-cell-box">
    <search-top></search-top>
    <div class="search-results" id="search-results"><span class="result-name">查询结果</span><span class="result-news"></span><span class="result-num"><span class="type-blue">90</span></span></div>
    <scroller lock-x height="88%" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
      <div class="box2">
        <!--<p v-for="i in bottomCount">placeholder {{i}}</p>-->
        <swipeout class="vux-1px-tb">
          <swipeout-item transition-mode="follow" v-for="(list,i) in Lists" :key="i">
            <div slot="right-menu">
              <swipeout-button @click.native="onButtonClick('delete')" type="warn" :width="50">删除</swipeout-button>
              <swipeout-button @click.native="onCancelClick" type="warn" :width="50">注销</swipeout-button>
            </div>
            <div slot="content" style="padding:12px 12px 2px 30px;font-size: 18px;">{{list}}</div>
            <div slot="content" class="size-new" style="padding:2px 12px 12px 30px;">饭店、张依依</div>
            <div slot="content"><img src="../assets/list-left.jpg" class="border-right-img-mall"></div>
            <cell slot="content" link="/ComDetail/1"></cell>
          </swipeout-item>
        </swipeout>
        <load-more tip="loading"></load-more>
      </div>
    </scroller>
    <div>
      <confirm v-model="show">
        <p style="text-align:center;">{{title}}</p>
      </confirm>
    </div>
  </div>
</template>

<script>
  import { GroupTitle, Swipeout, SwipeoutItem, SwipeoutButton, XButton, Confirm, Cell, Scroller, LoadMore } from 'vux'
  import SearchTop from '../components/SearchTop'
  import ComfirePop from '../components/ComfirePop'
  let List = []

  export default {
    components: {
      GroupTitle,
      Swipeout,
      SwipeoutItem,
      SwipeoutButton,
      XButton,
      SearchTop,
      ComfirePop,
      Confirm,
      Cell,
      Scroller,
      LoadMore
    },
    data () {
      return {
        disabled: false,
        show: false,
        title: '',
        Lists: List
      }
    },
    created: function () {
      this.$http.post('/example/api/company.json').then(response => {
        for (let i in response.data.list) {
          List.push(response.data.list[i].name)
        }
      })
    },
    methods: {
      onButtonClick (type) {
        this.title = '确定删除此条数据？'
        this.show = true
      },
      onCancelClick () {
        this.title = '确定注销此条数据？'
        this.show = true
      },
      onScrollBottom () {
        if (this.onFetching) {
          // do nothing
        } else {
          this.onFetching = true
          setTimeout(() => {
            this.Lists.length += 10
            this.$nextTick(() => {
              this.$refs.scrollerBottom.reset()
            })
            this.onFetching = false
          }, 2000)
        }
      },
      onScroll (pos) {
        this.scrollTop = pos.top
      },
      onCellClick () {
        window.alert('cell click')
      },
      onClickButton () {
        window.alert('click')
      },
      changeList () {
        this.showList1 = false
        this.$nextTick(() => {
          this.$refs.scroller.reset({
            top: 0
          })
        })
      }
    }
  }
</script>

<style lang="less">
  .demo-content {
    padding: 10px 10px;
  }
  .list-cell-box{
     height:100%;
    .vux-1px-b{
      &:after{
         border: none;
       }
    }
    .vux-1px-t{
      &:before{
         border: none;
       }
    }
    .vux-1px-tb{
      height:88%;
      overflow-y:scroll;
      &:before{
         border: none;
       }
      &:after{
         border: none;
       }
    }
    .weui-search-bar__cancel-btn{
      color: #55A3E7;
    }
    .vux-swipeout-button-warn{
      border-right: 1px solid #fff;
    }
    .vux-swipeout-content{
      border-bottom:1px solid #eee;
      background: transparent;
    }
    .vux-swipeout-item{
      margin-left: 5px;
    }
    .weui-dialog__btn_primary{
      color: #55A3E7;
    }
    .weui-cell_access{
      position: absolute;
      height: 59px;
      width: 92%;
      z-index: 9999;
      top: 0;
      left: 0;
    }
    .weui-cell{
      &:before{
          border-top:none;
       }
    }
    .weui-loadmore{
      margin: 0 auto;
    }
  }
</style>
