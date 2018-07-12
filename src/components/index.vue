<template>
  <div data-index-box>
      这是{{page}}页面
      <div class="div3"></div>
  </div>
</template>
<script>
export default {
  data(){
      return {
          page: 'index'
      }
  }
}
</script>
<style lang="sass">
    div[data-index-box] {
        .div3 {
            width: 100px;
            height: 100px;
            background-color: aqua;
        }
    }
</style>


