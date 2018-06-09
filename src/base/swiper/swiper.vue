<template>
  <swiper :options="swiperOption">
    <slot></slot>
  </swiper>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  props: {
    showDot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3.2,
        spaceBetween: 10,
        direction: 'horizontal'
      }
    }
  }
}
</script>
