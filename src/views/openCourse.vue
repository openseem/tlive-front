<template>
    <div id="openCourse">
        <el-form :model="user" label-width="0" class="login-form">
            <h3>创建课程</h3>
            <el-form-item>
                <el-input type="text" v-model="course.courseName" placeholder="课程名称" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="level" class="m-2" placeholder="上课星期" style="width: 140px;">
                    <el-option v-for="item in weeks" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                &nbsp&nbsp&nbsp
                <el-select v-model="day" class="m-2" placeholder="上课节次" style="width: 140px;">
                    <el-option v-for="item in days" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
                &nbsp&nbsp
                <el-button type="primary" @click="addLesson" class="mb-4" style="width: 80px;">添加</el-button>
                <el-button type="primary" @click="checkLesson" class="mb-4" style="width: 80px;"> 查看已选择</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm" class="login-button">创建</el-button>
            </el-form-item>
            <el-alert id="error" title="未填写完整" type="error" v-if="wrong" @close="wrong = false" />
            <el-alert id="success" title="创建成功" type="success" v-if="success" @close="success = false" />
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
            course: {
                courseId: '',
                courseName: '',
            },
            schedules: [

            ]
            ,
            wrong: false,
            success: false,
            level: '',
            day: '',
            weeks: [
                {
                    value: '1',
                    label: '星期一'
                },
                {
                    value: '2',
                    label: '星期二'
                },
                {
                    value: '3',
                    label: '星期三'
                },
                {
                    value: '4',
                    label: '星期四'
                },
                {
                    value: '5',
                    label: '星期五'
                },
                {
                    value: '6',
                    label: '星期六'
                },
                {
                    value: '7',
                    label: '星期日'
                },
            ],
            days: [
                {
                    value: '1',
                    label: '第一节'
                },
                {
                    value: '2',
                    label: '第二节'
                },
                {
                    value: '3',
                    label: '第三节'
                },
                {
                    value: '4',
                    label: '第四节'
                },
                {
                    value: '5',
                    label: '第五节'
                },
                {
                    value: '6',
                    label: '第六节'
                },
                {
                    value: '7',
                    label: '第七节'
                },
                {
                    value: '8',
                    label: '第八节'
                },
                {
                    value: '9',
                    label: '第九节'
                },
                {
                    value: '10',
                    label: '第十节'
                },
            ],
            userId: this.store.state.user.userId
        }
    },
    setup: function () {
        const store = new useStore();
        return {
            store
        }
    },
    methods: {
        addLesson() {
            if (!this.level || !this.day) {
                this.wrong = true;
                return;
            }
            let schedule = {
                day: this.level,
                level: this.day
            }
            this.schedules = [...this.schedules, schedule]
            alert('添加成功')
        },
        checkLesson() {
            let message = ''
            this.schedules.map((schedule) => {
                message += "星期" + schedule.day + "  第" + schedule.level + "节课\n"
            })
            console.log(this.schedules)
            alert(message)
        },
        submitForm() {
            this.axios.post("http://127.0.0.1:8765/v1/course/new", {
                teacher: this.userId,
                courseName: this.course.courseName
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(
                res => {
                    this.course.courseId = res.data.course
                    console.log(this.schedules)
                    this.schedules.map((schedule) => {
                        this.axios.post("http://localhost:8765/v1/course/schedule", {
                            courseId: this.course.courseId,
                            level: schedule.level,
                            day: schedule.day
                        }, {
                            headers: {
                                "Content-Type": "application/json",
                            }
                        }).then(Response => {
                            this.success = true
                        }
                        )
                    })
                }
            )

        }
    }
}
</script>

<style scoped>
#openCourse {
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
    width: 480px;
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