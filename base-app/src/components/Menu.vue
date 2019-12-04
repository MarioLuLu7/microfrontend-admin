<template>
  <div class="menu">
    <h3>
      菜单
    </h3>
    <Menu
      class="menu-content"
      :theme="theme2"
      :active-name="activeMenuPath"
      @on-select="selectMenu"
    >
      <MenuItem
        v-for="item in menu.menus"
        :key="item.path"
        :name="item.path"
      >{{ item.title }}</MenuItem>
      <MenuGroup
        v-for="(item,index) in menu.group"
        :key="index"
        :title="item.name"
      >
        <MenuItem
          v-for="ite in item.child"
          :key="ite.path"
          :name="ite.path"
        >{{ ite.title }}</MenuItem>
      </MenuGroup>
    </Menu>
    <div class="base-menu">
      <Button
        :type="activePath === '/model'? 'info' : ''"
        shape="circle"
        @click="$router.push('/model')"
        icon="md-analytics"
        size="large"
      ></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu',
  data () {
    return {
      activeName: '',
      activeMenuPath: ''
    }
  },
  computed: {
    menu () {
      let group = [], menus = []
      this.$store.state.menu.forEach(item => {
        let temp = false
        group.forEach(group => {
          if (group.name === item.groupName) {
            temp = true
            group.child.push(item)
          }
        })
        if (!temp) {
          if (!item.groupName) {
            item.name = item.title
            menus.push(item)
          } else {
            group.push({
              name: item.groupName,
              child: [item]
            })
          }
        }
      })
      return {
        group,
        menus
      }
    },
    tabs () {
      return this.$store.state.tabs
    },
    activePath () {
      return this.$store.state.activePath
    }
  },
  watch: {
    activePath () {
      this.setActiveMenu()
    },
    menu () {
      this.setActiveMenu()
    }
  },
  methods: {
    selectMenu (e) {
      this.$router.push(e)
    },
    setActiveMenu () {
      let path = this.activePath
      let temp = false
      this.menu.group.forEach(group => {
        group.child.forEach(item => {
          if (item.path === path) {
            temp = true
          }
        })
      })
      this.menu.menus.forEach(item => {
        if (item.path === path) {
          temp = true
        }
      })
      if (temp) {
        this.$nextTick(() => {
          this.activeMenuPath = this.activePath
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  height: 100%;
  border-top: 1px solid #dcdee2;
  width: 200px !important;
  position: relative;
  h3 {
    line-height: 40px;
    padding-left: 24px;
    border-right: 1px solid #dcdee2;
  }
}
.menu-content {
  height: 100%;
  width: 200px !important;
}
.base-menu {
  position: absolute;
  bottom: 0px;
  left: 0;
  z-index: 950;
  width: 200px;
  padding: 10px 10px;
  button {
    float: right;
    margin-left: 10px;
  }
}
</style>
