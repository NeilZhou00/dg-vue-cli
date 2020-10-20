<template>
  <div>
    <div class="hello-view">
      <div class="flex">1111</div>
      <div class="flex">2222</div>
    </div>
    <div class="rem">333</div>
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
$baseFontSize: 192;
@function px2rem($px){
  @return $px / $baseFontSize * 1rem;
}

.hello-view {
  display: flex;
  & > .flex {
    height: 300px;
    line-height: 300px;
    text-align: center;
    background-color: #999;
    color: #000;
    flex: 1;
  }
}
.rem {
  width: px2rem(500);
  background: forestgreen;
  font-size: px2rem(24)
}
</style>
