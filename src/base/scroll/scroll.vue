<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: [Array, Object, String, Number],
        default: function () {
          return []
        }
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      pullUp: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted() {
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', pos => {
            // 派发事件获取pos 值
            _this.$emit('scroll', pos)
          })
        }
        // 上拉刷新
        if (this.pullUp) {
          // 滚动结束的时候
          this.scroll.on('scrollEnd', () => {
            // => 负值
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              // 滚动到底部
              this.$emit('scrollToEnd')
            }
          })
        }

        // 开始滚动前判断
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

