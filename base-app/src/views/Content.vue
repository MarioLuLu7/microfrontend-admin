<template>
  <div class="Content">
    <div v-for="item in apps" :key="item.name" :id="item.name"></div>
  </div>
</template>

<script>
export default {
  name: 'Content',
  computed: {
    apps() {
      return this.$store.state.apps
    }
  }
}
</script>

<style lang="scss" scoped></style>
