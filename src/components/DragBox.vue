<template>
  <div
    ref='DragBox'
    @touchstart="start"
    @mousedown="start"
    @touchmove="move"
    @mousemove="move"
    @mouseout="end"
    @mouseup="end">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      distX: 0,
      distY: 0,
      initX: 0,
      initY: 0,
      transformX: 0,
      transformY: 0,
      mouseIsDown: false
    }
  },
  mounted () {
    this.initY = this.$refs.DragBox.offsetTop
    this.initX = this.$refs.DragBox.offsetLeft
  },
  methods: {
    start (ev) {
      const touch = ev.touches ? ev.touches[0] : ev
      this.distX = touch.pageX - this.$refs.DragBox.offsetLeft - this.transformX
      this.distY = touch.pageY - this.$refs.DragBox.offsetTop - this.transformY
      this.mouseIsDown = true
    },
    move (ev) {
      if (this.mouseIsDown) {
        const touch = ev.touches ? ev.touches[0] : ev 
        this.transformX = touch.pageX - this.initX - this.distX
        this.transformY = touch.pageY - this.initY - this.distY
        this.$refs.DragBox.style.transform = 'translate3d(' + this.transformX + 'px, '+ this.transformY +'px, 0)'
        ev.preventDefault()
      }
    },
    end () {
      this.mouseIsDown = false
    }
  }
}
</script>
