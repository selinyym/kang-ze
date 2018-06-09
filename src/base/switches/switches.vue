<template>
  <ul class="switches">
    <li
      class="switch-item"
      v-for="(item,index) in switches"
      :class="{'active':currentIndex === index}"
      @click="switchItem(index)"
    >
      <span>{{item.name}} </span>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="scss">
  .switches{
    text-align: center;
    background: #fff;
    padding-top: 20px;
    .switch-item{
      display: inline-block;
      @include ht(60px);
      padding: 0 20px;
      cursor: pointer;
      border-radius: 20px;
      border: 2px solid #fff;
      font-size: 28px;
      color: #000;
      &.active{
        border-color: #ff0000;
      }
    }
  }      
</style>
