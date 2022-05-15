<template>
    <el-table :data="studentscore">
        <el-table-column prop="userId" label="学生编号" />
        <el-table-column prop="userName" label="学生姓名" />
        <el-table-column prop="workScore" label="作业分" />
        <el-table-column prop="watchScore" label="直播观看分" />
        <el-table-column prop="limitQuestionScore" label="抢答分" />
        <el-table-column prop="sumScore" label="总分" />
    </el-table>
    <el-button type="primary" @click="onSubmit">返回</el-button>
</template>

<script>
export default {
    name: "studentscore",
    components: {

    },
    data() {
        return {
            courseId: this.$route.params.courseId,
            studentscore: [
                {
                    userId: '',
                    userName: '',
                    sumScore: 0,
                    workScore: 0,
                    watchScore: 0,
                    limitQuestionScore: 0
                }
            ]
        }
    },
    methods: {
        getScores() {
            this.axios.get("http://127.0.0.1:8765/v1/score/getScores?courseId=" + this.courseId).then(
                res => {
                    this.studentscore = []
                    res.data.map(s => {
                        let tmp = {
                            userId: s.userId,
                            userName: s.userName,
                            sumScore: s.sumScore,
                            workScore: s.workScore,
                            watchScore: s.watchScore,
                            limitQuestionScore: s.limitQuestionScore
                        }
                        this.studentscore = [...this.studentscore, tmp]
                    })
                }
            )
        }
    },
    mounted() {
        this.getScores()
    }
};
</script>

<style scoped>
</style>