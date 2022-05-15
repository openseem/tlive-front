<template>
    <el-table :data="userWorks">
        <el-table-column prop="userId" label="学生编号" />
        <el-table-column prop="userName" label="学生姓名" />
        <el-table-column prop="finished" label="是否完成" />
        <el-table-column prop="score" label="分数" />
    </el-table>
    <el-button type="primary" @click="onSubmit">返回</el-button>
</template>

<script>
export default {
    name: "workstudent",
    components: {
    },
    data() {
        return {
            courseId: this.$route.params.courseId,
            workId: this.$route.params.workId,
            userWorks: [
                {
                    userId: 0,
                    userName: '',
                    score: 0,
                    finished: false
                }
            ]
        }
    },
    mounted() {
        this.getworks()
    },
    methods: {
        getworks() {
            this.axios.get("http://127.0.0.1:8765/v1/work/getUserWorks?workId=" + this.workId).then(
                res => {
                    this.userWorks = []
                    res.data.map(w => {
                        let tmp = {
                            userId: w.userId,
                            userName: w.userName,
                            score: w.score,
                            finished: w.finished
                        }
                        this.userWorks = [...this.userWorks, tmp]
                    })

                }
            )
        },
        onSubmit() {
            this.$router.go(-1)
        }
    }
};
</script>

<style scoped>
</style>