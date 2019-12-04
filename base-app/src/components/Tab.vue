<template>
  <div class="tab">
    <Icon
      :type="menuState ? 'md-arrow-back' : 'md-arrow-forward'"
      class="my-tab-icon my-tab-hidden"
      @click="hiddenMenu"
    />
    <Tabs
      class="my-tab"
      type="card"
      :closable="tabs.length > 1"
      @on-tab-remove="handleTabRemove"
      @on-click="handleTabClick"
      v-model="mypath"
      :animated="false"
    >
      <TabPane
        v-for="(item) in tabs"
        :key="item.path"
        :label="item.title"
        :name="item.path"
      ></TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data () {
    return {
      clickIndex: 0,
      mypath: this.activePath
    }
  },
  computed: {
    tabs () {
      return this.$store.state.tabs
    },
    activePath () {
      return this.$store.state.activePath
    },
    menuState () {
      return this.$store.state.menuShowState
    },
    keepAliveEXAct () {
      return this.$store.state.keepAliveEXAct
    }
  },
  watch: {
    activePath () {
      this.mypath = this.activePath
    },
    mypath () {
      this.$router.push(this.mypath)
    }
  },
  methods: {
    handleTabClick (e) {
      this.$router.push(e)
    },
    handleTabRemove (e) {
      this.tabs.forEach((item, index) => {
        if (item.path === e) {
          this.$store.state.tabs.splice(index, 1)
          if (item.name) {
            if (item.fromApp === 'baseapp') {
              this.$store.state.exTab.push(item.name)
            } else {
              this.$store.state.keepAliveTabs[item.fromApp].push(item.name)
            }
          }
        }
      })
    },
    hiddenMenu () {
      this.$store.state.menuShowState = !this.menuState
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  position: relative;
}
.my-tab-icon {
  position: absolute;
  top: 0px;
  z-index: 999;
  font-size: 20px;
  line-height: 32px;
  cursor: pointer;
  width: 40px;
  &:hover {
    color: #2db7f5;
  }
}
.my-tab-hidden {
  left: 0px;
}
</style>
