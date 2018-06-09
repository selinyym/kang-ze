<template>
  <div class="details-wrapper">
    <switches
      @switch="select"
      :switches="switches"
      :currentIndex="classIndex"
    >
    </switches>
    <div class="list-wrapper">
      <div v-if="classIndex===0">
        <img
          :src="item"
          v-for="(item, index) in good.details[currentIndex].pic"
          v-show="index < good.details[currentIndex].pic.length-1"
        />
      </div>
      <div v-if="classIndex===1">
        <img
          :src="item"
          v-for="(item, index) in good.details[currentIndex].pic"
          v-show="index >= good.details[currentIndex].pic.length-1"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Switches from 'base/switches/switches'
import { goodPropsMixin } from 'common/js/mixin'

export default {
  mixins: [goodPropsMixin],
  data() {
    return {
      switches: [
        {
          name: '产品详细'
        },
        {
          name: '说明书'
        }
      ],
      classIndex: this.currentIndex
    }
  },
  methods: {
    select(index) {
      this.classIndex = index
      this.$emit('changeInfor', index)
    }
  },
  components: {
    Switches
  }
}
</script>
<style scoped lang="scss">
.details-wrapper{
  background: #fff;
  .list-wrapper{
    padding-bottom: 160px;
    img{
      display: block;
      margin: 20px auto;
      width: 95%;
    }
  }
}
</style>
