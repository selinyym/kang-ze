<template>
  <div class="title">
    <p :class="hotClass">{{desc.title}}</p>
    <span>{{desc.englishName}}</span>
  </div>
</template>

<script>
export default {
  props: {
    desc: {
      type: Object,
      default: function () {
        return{
          title:"热门科室",
          englishName:"DEPART MENT",        
          class: "hot"
        }
      }
    }
  },
  computed: {
    hotClass() {
      if (this.desc.title === '猜你喜欢') {
        return 'hot'
      } else {
        return ''
      }
    }
  }
};
</script>

<style scoped lang="scss">
.title{
  text-align: center;
  font-size: 18px;
  padding: 30px 0;
  p{
    font-size: 26px;
    color: #fa6176;
    font-weight: 600;
    &.hot{
      color: #bd1225;
    }
  }
  span{
    display: block;
    margin-top: 10px;
    color: $color-text;
  }
}
</style>
