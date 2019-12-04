<template>
  <div class="home">
    <img
      alt="Vue logo"
      :src="baseUrl + '/img/logo.png'"
    >
    <h1>{{ $store.state.a }}</h1>
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

export default {
  name: 'home',
  mounted () {
    this.baseSetTab('模块1 主页xxx', 'home')
  },
  methods: {
  }
}
</script>
