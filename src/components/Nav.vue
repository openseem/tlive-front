<template>
  <el-menu :default-active="'/index'" router mode="horizontal" background-color="white" text-color="#222"
    active-text-color="red" style="min-width: 1300px">
    <el-menu-item v-for="(item, i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">在线授课系统</span>
    <span id="welcome">{{ welcome }}</span>
  </el-menu>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: "Nav",
  setup: function () {
    const store = new useStore();
    return {
      store
    }
  },
  data() {
    return {
      signed: false,
      navList: [
        { name: '/index', navItem: '首页' },
        { name: '/login', navItem: '登录' },
        { name: '/register', navItem: '注册' },
        { name: '/openCourse', navItem: '创建课程'},
        { name: '/selectCourse', navItem: '选择课程' }
      ],
    }
  },
  methods: {
    goToUser() {
      this.$router.push("/userFrontPage?userId=" + this.$store.state.user.userId)
    }
  },
  computed: {
    welcome() {
      return this.store.state.user.userId ? '欢迎  ' + this.store.state.user.tname : '还未登录'
    }
  }
}
</script>

<style scoped>
#nav {
  width: 100%;
}

.login {
  float: right;
}

.register {
  float: right;
}

#welcome {
  position: absolute;
  padding-top: 20px;
  right: 6%;
  font-size: 18px;
  font-weight: bold
}
</style>