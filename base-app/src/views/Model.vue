<template>
  <div class="model">
    <div class="handel-box">
      <Button
        shape="circle"
        icon="md-add"
        size="large"
        @click="addModel"
      ></Button>
    </div>
    <Table
      border
      :columns="columns"
      :data="listData"
    >
      <template
        slot-scope="{ row }"
        slot="action"
      >
        <Button
          class="list-edit-btn"
          type="info"
          size="small"
          @click="edit(row)"
        >修改</Button>
        <Button
          type="error"
          size="small"
          @click="remove(row)"
        >删除</Button>
      </template>
    </Table>
    <Modal
      v-model="modelState"
      draggable
      scrollable
      :title="itemData.id ? itemData.name: '新增模块'"
      @on-ok="submit"
      @on-cancel="cancel"
      :styles="{top: '200px'}"
      loading
    >
      <Form
        ref="formCustom"
        :model="itemData"
        :label-width="80"
      >
        <FormItem
          label="模块名称"
          prop="show_name"
        >
          <Input
            type="text"
            v-model="itemData.show_name"
          ></Input>
        </FormItem>
        <FormItem
          label="入口名称"
          prop="name"
        >
          <Input
            type="text"
            v-model="itemData.name"
          ></Input>
        </FormItem>
        <FormItem
          label="加载地址"
          prop="url"
        >
          <Input
            type="text"
            v-model="itemData.url"
          ></Input>
        </FormItem>
        <FormItem
          label="默认路由"
          prop="base_router"
        >
          <Input
            type="text"
            v-model="itemData.base_router"
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'model',
  data () {
    return {
      modelState: false,
      columns: [
        {
          title: '模块名称',
          key: 'show_name'
        },
        {
          title: '入口名称',
          key: 'name'
        },
        {
          title: '加载地址',
          key: 'url'
        },
        {
          title: '默认路由',
          key: 'base_router'
        },
        {
          title: '操作',
          slot: 'action',
          width: 150
        }
      ],
      itemData: {},
      autoData: {
        name: '',
        base_router: '',
        url: '',
        show_name: ''
      }
    }
  },
  computed: {
    listData () {
      return this.$store.state.apps
    }
  },
  created () {
    this.baseSetTab('模块', 'model', 'baseapp')
  },
  mounted () {
    this.getModelList()
  },
  methods: {
    getModelList () {
      this.$store.dispatch('getModels')
    },
    edit (data) {
      this.itemData = JSON.parse(JSON.stringify(data))
      this.modelState = true
    },
    remove (data) {
      this.deleteModal(null, () => {
        let apps = sessionStorage.getItem('apps')
        apps = apps ? JSON.parse(apps) : []
        apps.forEach((item, index) => {
          if (item.id === data.id) {
            apps.splice(index, 1)
          }
        })
        sessionStorage.setItem('apps', JSON.stringify(apps))
        this.$Message.success({
          background: true,
          content: '删除成功'
        })
        this.getModelList()
      })
    },
    addModel () {
      this.itemData = JSON.parse(JSON.stringify(this.autoData))
      this.modelState = true
    },
    submit () {
      let data = JSON.parse(JSON.stringify(this.itemData))
      if (!data.name || !data.base_router || !data.url) {
        this.$Message.error({
          background: true,
          content: '请填写完整'
        })
        this.modelState = false
        setTimeout(() => {
          this.modelState = true
        }, 0)
        return
      }

      let apps = sessionStorage.getItem('apps')
      apps = apps ? JSON.parse(apps) : []

      let temp = false
      apps.forEach(item => {
        if (data.id && item.id === data.id) {
          for (let key in data) {
            item[key] = data[key]
          }
          temp = true
        }
      })
      console.log(data)
      if (!temp) {
        data.id = parseInt(Math.random() * 10000000)
        apps.push(data)
      }
      sessionStorage.setItem('apps', JSON.stringify(apps))
      this.$Message.success({
        background: true,
        content: '保存成功'
      })
      this.modelState = false
      this.getModelList()
    },
    cancel () {
      this.itemData = JSON.parse(JSON.stringify(this.autoData))
    }
  }
}
</script>

<style lang="scss" scoped>
.list-edit-btn {
  margin-right: 10px;
}
</style>