<template>
  <div class="hello-view">
    <div>1111</div>
    <div>2222</div>
  </div>
</template>

<script>
export default {
  name: 'helloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.hello-view {
  display: flex;
  & > div {
    height: 300px;
    line-height: 300px;
    text-align: center;
    background-color: #999;
    color: #000;
    flex: 1;
  }
}
</style>
