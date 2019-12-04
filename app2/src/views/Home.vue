<template>
  <div class="home">
    <img
      alt="Vue logo"
      :src="baseUrl + '/img/logo.png'"
    >
    模块1 主页
    {{a}}
    <button @click="send">发送数据给模块1</button>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'home',
  data () {
    return {
      a: 0
    }
  },
  mounted () {
    this.baseSetTab('模块2主页', 'home')
    this.a = Math.random()
  },
  methods: {
    send () {
      this.$store.state.singleApp1.setData('我是模块2 的数据')
    }
  }
}
</script>
