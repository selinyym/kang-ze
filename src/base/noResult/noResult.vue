<template>
  <div class="no-result">
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
.no-result{
  text-align: center;
  .no-result-text{
    margin-top: 150px;
    font-size: 20px;
  }
}
</style>
