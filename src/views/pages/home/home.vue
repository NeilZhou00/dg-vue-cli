<template>
  <div class="home">
    <img alt="Vue logo" src="../../../assets/images/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import HelloWorld from './uiHelloWorld.vue'

export default {
  name: 'home',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('home', ['isLoading', 'userName'])
  },
  methods: {
    ...mapActions('home', ['getHomeInfo']),
    getHomeInfoHanlder () {
      let _this = this
      _this.getHomeInfo({}).then(() => {
        console.log(_this.userName)
      }).catch(err => {
        console.log('error', err)
      })
    }
  },
  created () {
    this.getHomeInfoHanlder()
  },
  components: {
    HelloWorld
  }
}
</script>
