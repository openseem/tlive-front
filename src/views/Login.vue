<template>
  <div id="Login">
    <el-form :model="user" label-width="0" class="login-form">
      <h3>登录</h3>
      <el-form-item>
        <el-input type="text" v-model="user.username" placeholder="用户名" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="user.password" placeholder="密码" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" class="login-button">登录</el-button>
      </el-form-item>
      <el-alert id="error" title="帐号或密码错误" type="error" v-if="wrong" @close="wrong = false" />
      <el-alert id="success" title="登录成功" type="success" v-if="success" @close="success = false" />
    </el-form>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  name: "Login",
  components: {},
  data() {
    return {
      user: {
        userId: '',
        username: '',
        role: '',
        password: '',
        tname: ''
      },
      wrong: false,
      success: false,
    }
  },
  setup: function () {
    const store = new useStore();
    return {
      store
    }
  },
  methods: {
    submitForm() {
      this.axios.post('http://localhost:8765/v1/login/user', {
        username: this.user.username,
        password: this.user.password
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(
        Response => {
          if (Response.data.stat == 'ok') {
            this.user.userId = Response.data.userId
            this.user.username = Response.data.username
            this.user.role = Response.data.role
            this.user.tname = Response.data.name

            this.store.commit('login', this.user)

            this.success = true
          } else {
            this.wrong = true
          }
        }
      )
    }
  }
}
</script>

<style scoped>
#Login {
  background: url("../assets/loginbackground.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.login-form {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 15% auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-button {
  margin-top: 30px;
  width: 100%;
}
</style>