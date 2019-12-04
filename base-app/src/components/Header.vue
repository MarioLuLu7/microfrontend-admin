<template>
  <div class="header">
    <div class="my-left-box">
      <img
        src="../assets/logo.png"
        class="logo"
      />
      <Dropdown
        trigger="click"
        class="my-dropdown"
        @on-click="clickDrop"
      >
        <Button type="text">
          {{ nowApp.show_name || '请选择模块' }}
          <Icon type="ios-arrow-down"></Icon>
        </Button>
        <DropdownMenu slot="list">
          <DropdownItem
            v-for="item in apps"
            :key="item.name"
            :name="item.name"
          >{{ item.show_name }}</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="my-right-box">
      <Dropdown
        trigger="click"
        class="my-dropdown-user"
        @on-click="clickDropUser"
      >
        <a href="javascript:void(0)">
          <Avatar>USER</Avatar>
          {{ me.username.toLocaleUpperCase() }}
          <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
          <DropdownItem name="logout">注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
// import Cookie from 'js-cookie'
export default {
  name: 'header',
  data () {
    return {
    }
  },
  computed: {
    nowApp () {
      return this.$store.state.nowApp
    },
    apps () {
      return this.$store.state.apps
    },
    me () {
      return this.$store.state.me
    }
  },
  methods: {
    clickDrop (e) {
      this.apps.forEach(item => {
        if (item.name === e) {
          this.$store.state.nowApp = item
          this.$router.push(item.autoRouter || item.base_router)
        }
      })
    },
    clickDropUser (e) {
      if (e === 'logout') {
        // this.$router.push('/login')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.header {
  height: 100%;
  width: 100%;
}
.my-dropdown {
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 40px;
}
.my-left-box {
  height: 100%;
  margin-left: 24px;
  float: left;
  > * {
    float: left;
  }
  .logo {
    height: 50%;
    margin-top: 5%;
  }
}
.my-right-box {
  margin-right: 24px;
  float: right;
}
.my-dropdown-user {
  line-height: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 5px;
}
</style>
