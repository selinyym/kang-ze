<template>
  <slider ref="slider">
    <div v-for="item in good.details[currentIndex].pic">
      <img :src="item"></img>
    </div>
  </slider>
</template>
<script>
import Slider from 'base/slide/slide'
import { goodPropsMixin } from 'common/js/mixin'

export default {
  mixins: [goodPropsMixin],
  components: {
    Slider
  },
  watch: {
    currentIndex() {
      this.$refs.slider.update()
    }
  }
}
</script>
