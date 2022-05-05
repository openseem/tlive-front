<template>
    <div id="Register">
        <el-form :model="user" label-width="0" class="register-form">
            <h3>登录</h3>
            <el-form-item>
                <el-input type="text" v-model="user.userName" placeholder="用户名" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="email" v-model="user.name" placeholder="姓名" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="user.userPassword" placeholder="密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input type="password" v-model="passwordAgain" placeholder="重复密码" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-radio-group v-model="roles">
                    <el-radio :label="1">学生</el-radio>
                    <el-radio :label="2">老师</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" class="register-button">注册</el-button>
            </el-form-item>
            <el-alert id="success" title="注册成功" type="success" v-if="success" @close="success = false" />
            <el-alert id="error2" title="用户名过短" type="error" v-if="wrong1" @close="wrong1 = false" />
            <el-alert id="error2" title="用户名重复" type="error" v-if="wrong2" @close="wrong2 = false" />
            <el-alert id="error3" title="用户名过长" type="error" v-if="wrong3" @close="wrong3 = false" />
            <el-alert id="error5" title="两次输入不相同" type="error" v-if="wrong5" @close="wrong5 = false" />

        </el-form>
    </div>
</template>

<script>

export default {
    name: "Register",
    components: {},
    data() {
        return {
            user: {
                userName: '',
                userPassword: '',
                userRole: ''
            },
            passwordAgain: '',
            success: false,
            wrong1: false,
            wrong2: false,
            wrong3: false,
            wrong4: false,
            wrong5: false,
            roles: 1,
        }
    },
    methods: {
        submitForm() {
            let flag = false;
            if (this.user.userPassword !== this.passwordAgain) {
                this.wrong5 = true;
                flag = true;
            }
            if (this.user.userName == '') {
                this.wrong1 = true;
                flag = true;
            }
            if (this.user.userName.length > 40) {
                this.wrong2 = true;
                flag = true;
            }
            if (flag) {
                return
            }
            if (this.roles == 1) {
                this.user.userRole = "student"
            } else {
                this.user.userRole = "teacher"
            }
            this.axios.post('http://localhost:8765/v1/register/user', {
                username: this.user.userName,
                password: this.user.userPassword,
                name: this.user.name,
                role: this.user.userRole
            }).then(Response => {
                if (Response.data.stat === "error") {
                    this.wrong2 = true;
                } else if (Response.data.stat === "ok") {
                    this.success = true;
                }
            })
        }
    }
}
</script>

<style scoped>
#Register {
    background: url("../assets/loginbackground.jpg") no-repeat center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
}

.register-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 15% auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}

.register-button {
    width: 100%;
}
</style>