<template>
  <div class="page up-news-box">
    <div class="page__bd">
      <div id="error" class="error" style="display: none;">
        <img src="../assets/error.png"/>
        <span>当前网络不可用，请检查你的网络设置</span>
      </div>
      <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell">
          <div class="weui-cell__bd cell-unleft">
            <div class="weui-uploader">
              <div class="weui-uploader__bd">
                <ul class="weui-uploader__files" id="uploaderFiles">
                </ul>
                <div class="weui-uploader__input-box file-img">
                  <input id="uploaderInput" class="weui-uploader__input" type="button" />
                  <p class="change-img">从业人员照片</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="p-relative">
        <x-input title="身份证号" v-model="value" placeholder="从业人员身份证号"></x-input>
        <div class="red-star">*</div>
      </div>
      <x-input title="手机号码" v-model="value" placeholder="从业人员11位手机号码"></x-input>
    </div>
    <btn :btn="btn" :goLink="goLink" :clickDics="clickDics"></btn>
  </div>
</template>

<script>
  import { XInput } from 'vux'
  import Btn from '../components/Btn'
  import qs from 'qs'

  export default {
    components: {
      XInput,
      Btn
    },
    data () {
      return {
        value: '',
        btn: '提交',
        goLink: ''
      }
    },
    methods: {
      clickDics: function () {
        this.$http.post('/example/api/task/save.json', qs.stringify({card:this.value,userid:''})
        ).then(function (data) {

        })
      }
    }
  }

</script>

<style>
  .p-relative{
    position: relative;
  }
</style>
