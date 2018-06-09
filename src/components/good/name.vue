<template>
  <div class="good-name">
    <h2>{{good.details[currentIndex].title}}</h2>
  </div>
</template>
<script>
import { goodPropsMixin } from 'common/js/mixin'

export default {
  mixins: [goodPropsMixin]
}
</script>
<style scoped lang="scss">
.good-name{
  width: 100%;
  background: #fff;
  h2{
    line-height: 60px;
    font-size: 28px;
    font-weight: normal;
    @include toe(85%);
    padding-left: 20px;
  }
}
</style>
