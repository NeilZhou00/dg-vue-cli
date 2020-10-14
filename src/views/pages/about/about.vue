<template>
  <div class="about">
    <h1>This is an about page</h1>
    
    <InputNumber />
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'about',
  data () {
    return {
    }
  },
  computed: {
    ...mapState('about', ['isLoading', 'userName'])
  },
  methods: {
    ...mapActions('about', ['getAboutInfo']),
    getAboutInfoHanlder () {
      let _this = this
      _this.getAboutInfo({}).then(() => {
        console.log(_this.userName)
      }).catch(err => {
        console.log('error', err)
      })
    }
  },
  created () {
    this.getAboutInfoHanlder()
  }
}
</script>
