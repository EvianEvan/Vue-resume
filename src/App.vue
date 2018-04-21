<template>
  <div id="app">
    <left></left>
    <right></right>
  </div>
</template>

<script>
  import left from './component/left.vue'
  import right from './component/right.vue'

  export default {
    name: 'app',
    components: {
      left, right
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    height:98vh
    margin:0 auto
    display: flex
    flex-direction: row
    justify-content: center
    align-items: flex-start

</style>
