<template>
  <div id="basc-app">
    <div class="my-apps">
      <my-header></my-header>
    </div>
    <section class="my-main">
      <div
        class="my-menu"
        :class="{ active: menuState }"
      >
        <my-menu></my-menu>
      </div>
      <div
        class="my-main-right"
        :class="{ active: menuState }"
      >
        <div class="my-tab">
          <my-tab></my-tab>
        </div>
        <div class="my-main-app">
          <keep-alive :exclude="exTab">
            <router-view class="router-box"></router-view>
          </keep-alive>
        </div>
      </div>
    </section>
    <Modal
      v-model="baseDeleteState"
      @on-visible-change="baseDeleteChange"
      width="360"
    >
      <p
        slot="header"
        style="color:#f60;text-align:center"
      >
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>{{ baseDeleteText }}</p>
        <p>是否继续删除?</p>
      </div>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          long
          @click="baseDelete"
        >删除</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// import Cookie from 'js-cookie'
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import Tab from '@/components/Tab.vue'
import * as singleSpa from 'single-spa'
export default {
  name: 'App',
  components: {
    'my-menu': Menu,
    'my-tab': Tab,
    'my-header': Header
  },
  data () {
    return {
      timeer: null
    }
  },
  watch: {
    $route (to, from) {
      this.$store.state.activePath = to.path
      this.loadApp()
    }
  },
  computed: {
    apps () {
      return this.$store.state.apps
    },
    menuState () {
      return this.$store.state.menuShowState
    },
    baseDeleteState () {
      return this.$store.state.baseDeleteState
    },
    baseDeleteText () {
      return this.$store.state.baseDeleteText
    },
    exTab () {
      return this.$store.state.exTab
    }
  },
  mounted () {
    this.$store.dispatch('getModels').then(res => {
      this.loadApp()
    })
  },
  methods: {
    baseDelete () {
      window.baseDeleteBack()
    },
    baseDeleteChange (e) {
      this.$store.state.baseDeleteState = e
    },
    loadApp () {
      this.apps.forEach(app => {
        const state = location.hash.includes(app.base_router)
        if (state) {
          clearInterval(this.timeer)
          if (window.loadApp) {
            window.loadApp(app)
          }
          this.timeer = setInterval(() => {
            if (window.loadApp) {
              window.loadApp(app)
              clearInterval(this.timeer)
            }
          }, 300)
        }
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html,
body,
#basc-app {
  height: 100%;
}
.my-apps {
  height: 60px;
  border-bottom: 10px solid #eee;
}
.my-main {
  overflow: hidden;
  height: calc(100% - 60px);
  .my-menu {
    float: left;
    height: 100%;
    width: 0px;
    overflow: hidden;
    &.active {
      width: 200px;
    }
  }
  .my-main-right {
    float: left;
    height: 100%;
    width: 100%;
    &.active {
      width: calc(100% - 200px);
    }
  }
  .my-main-app {
    height: calc(100% - 50px);
    width: 100%;
    > div {
      width: 100%;
    }
  }
}
.ivu-tabs-nav {
  margin-left: 45px !important;
}
.ivu-tabs-bar {
  background: #eee;
}
.ivu-select-dropdown {
  z-index: 9999;
}
.ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab .ivu-tabs-close {
  margin-left: 5px;
}
.ivu-tabs-tab {
  moz-user-select: -moz-none;
  -moz-user-select: none;
  -o-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.ivu-menu-vertical .ivu-menu-item,
.ivu-menu-vertical .ivu-menu-submenu-title {
  padding: 8px 24px;
}
.ivu-menu-vertical .ivu-menu-item-group-title {
  height: 30px;
  line-height: 30px;
}
.router-box {
  padding: 10px 20px;
  position: relative;
  height: 100%;
  overflow-y: auto;
}
.handel-box {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px;
}
</style>
