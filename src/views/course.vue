<template>
    <el-container class="layout-container-demo" style="height: 100%">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                            </el-icon>资料共享
                        </template>
                        <el-menu-item-group>
                            <router-link :to="uploadURL" style="text-decoration:none">
                                <el-menu-item index="1-1">资料上传</el-menu-item>
                            </router-link>

                            <router-link :to="materalURL" style="text-decoration:none">
                                <el-menu-item index="1-2">资料下载</el-menu-item>
                            </router-link>

                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                            </el-icon>作业
                        </template>
                        <!-- <router-link :to="doworkURL" style="text-decoration:none">
                            <el-menu-item index="1-1">创建问题</el-menu-item>
                        </router-link> -->
                        <router-link :to="seeworkURL" style="text-decoration:none">
                            <el-menu-item index="2-1">查看作业</el-menu-item>
                        </router-link>
                        <router-link :to="postworkURL" style="text-decoration:none">
                            <el-menu-item index="2-2">发布作业</el-menu-item>
                        </router-link>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                            </el-icon>学习情况
                        </template>
                        <router-link :to="workstaticURL" style="text-decoration:none">
                            <el-menu-item index="3-1">作业情况</el-menu-item>
                        </router-link>
                        <router-link :to="studentscoreURL" style="text-decoration:none">
                            <el-menu-item index="3-2">学生分数</el-menu-item>
                        </router-link>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                            </el-icon>直播间
                        </template>
                        <router-link :to="liveURL" style="text-decoration:none">
                            <el-menu-item index="4-1">进入直播间</el-menu-item>
                        </router-link>
                        <el-menu-item index="4-2" @click="this.dialogVisible = true">发出在线问题</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
    <el-dialog v-model="dialogVisible" title="发出在线问题" width="30%">
        <el-form :model="question" label-width="120px">
            <el-form-item label="问题名称">
                <el-input v-model="question.question" />
            </el-form-item>
            <el-form-item label="选项A">
                <el-input v-model="question.optionA" />
            </el-form-item>
            <el-form-item label="选项B">
                <el-input v-model="question.optionB" />
            </el-form-item>
            <el-form-item label="选项C">
                <el-input v-model="question.optionC" />
            </el-form-item>
            <el-form-item label="选项D">
                <el-input v-model="question.optionD" />
            </el-form-item>
            <el-form-item label="答案">
                <el-radio-group v-model="question.answer">
                    <el-radio label="A" />
                    <el-radio label="B" />
                    <el-radio label="C" />
                    <el-radio label="D" />
                </el-radio-group>
            </el-form-item>
            <el-form-item label="分值">
                <el-input v-model="question.score" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="addQuestion">确认</el-button>
            </span>
        </template>
    </el-dialog>
</template>
<script>
export default {
    name: "course",
    components: {

    },
    data() {
        return {
            courseId: this.$route.params.courseId,
            uploadURL: "/course/" + this.$route.params.courseId + "/upload",
            materalURL: "/course/" + this.$route.params.courseId + "/material",
            doworkURL: "",
            seeworkURL: "",
            postworkURL: "",
            liveURL: "",
            workstaticURL: "",
            studentscoreURL: "",
            dialogVisible: false,
            question: {
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                answer: '',
                score: '',
                ans: ''
            },
        }
    },
    computed: {

    },
    mounted() {
        this.uploadURL = "/course/" + this.$route.params.courseId + "/upload"
        this.materalURL = "/course/" + this.$route.params.courseId + "/material"
        this.doworkURL = "/course/" + this.$route.params.courseId + "/dowork"
        this.seeworkURL = "/course/" + this.$route.params.courseId + "/seework"
        this.postworkURL = "/course/" + this.$route.params.courseId + "/postwork"
        this.liveURL = "/liveroom/" + this.$route.params.courseId
        this.workstaticURL = "/course/" + this.$route.params.courseId + "/workstatic"
        this.studentscoreURL = "/course/" + this.$route.params.courseId + "/studentscore"
    },
    methods: {
        addQuestion() {
            if (this.question.question == '' || this.question.optionA == '' || this.question.optionB == '' || this.question.optionC == '' || this.question.optionD == '' || this.question.answer == '' || this.question.score == '') {
                alert("消息不完整")
                return
            }
            switch (this.question.answer) {
                case 'A': this.question.answer = 1; break;
                case 'B': this.question.answer = 2; break;
                case 'C': this.question.answer = 3; break;
                case 'D': this.question.answer = 4; break;
                default: return
            }
            let q = {
                question: this.question.question,
                optionA: this.question.optionA,
                optionB: this.question.optionB,
                optionC: this.question.optionC,
                optionD: this.question.optionD,
                answer: this.question.answer,
                score: this.question.score,
                courseId: this.courseId
            }
            this.question = {
                question: '',
                optionA: '',
                optionB: '',
                optionC: '',
                optionD: '',
                answer: '',
                score: '',
            }
            console.log(q);
            this.axios.post("http://127.0.0.1:8765/v1/limitQuestion/newLimitQuestion", q).then(
                res => {
                    if (res.data.stat == "ok") {
                        alert("发送成功")
                    } else {
                        alert("发送失败")
                    }
                }
            )
            this.dialogVisible = false;
        }
    }
};
</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
    height: 1000px;
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>