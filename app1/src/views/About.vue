<template>
  <div class="about">
    <h1>模块1关于 {{ parseInt(Math.random() * 1000) }}</h1>
  </div>
</template>
<script>

export default {
  name: 'about',
  mounted () {
    this.baseSetTab('模块1关于', 'about')
  }
}
</script>
