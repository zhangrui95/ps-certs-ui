<template>
  <div class="page page-list student-page">
    <div class="position-choice" id="choice-alert" @click="PopShow">
      <img src="../assets/Iconset.png" class="choice-img">
    </div>
    <div class="header-box">已完成</div>
    <div class="center-box center-box-detail padding-min">
      <div class="time-box time-top">
        <span class="time-title">2017年08月08日</span>
      </div>
      <div class="list" data-id="detail" data-tid="1" @click="goDetail">
        <div class="time-box">
          <div class="number number-line-height">01.</div>
          <div class="list-news">
            <div class="name-color name-color-line">test三1</div>
          </div>
        </div>
        <div class="outed active">已退回</div>
      </div>
      <div class="list" data-id="detail" data-tid="2">
        <div class="time-box">
          <div class="number number-line-height">02.</div>
          <div class="list-news">
            <div class="name-color name-color-line">test三2</div>
          </div>
        </div>
        <div class="outed active">已退回</div>
      </div>
    </div>
    <pop-choice :popShow="popShow" :choice="choice"></pop-choice>
  </div>
</template>

<script>
  import PopChoice from '../components/PopChoice'

  export default {
    components: {
      PopChoice
    },
    data () {
      return {
        popShow: false,
        tag: true,
        choice: false
      }
    },
    methods: {
      PopShow:function () {
        this.popShow = this.tag
      },
      goDetail:function () {
        let id = this.$route.params.id
        this.$router.push({path: '/DoneDetail', query:{id: id}})
      }
    }
  }
</script>
