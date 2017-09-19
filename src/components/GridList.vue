<template>
    <div class="grid-box">
      <grid>
        <grid-item v-for="(m,i) in menu" :link=m.link :key="i">
          <img class="icon-grid" slot="icon" :src=m.icon>
          <span slot="label">{{m.label}}</span>
          <badge v-if="m.num!=''" :text=m.num></badge>
        </grid-item>
      </grid>
    </div>
</template>

<script>
  import { Grid, GridItem, GroupTitle, Badge } from 'vux'
  import HeaderTop from './HeaderTop'

  export default {
    components: {
      Grid,
      GridItem,
      GroupTitle,
      Badge,
      HeaderTop
    },
    data () {
      return {

      }
    },
    props: [
      'menu'
    ],
    methods: {
    }
  }
</script>

