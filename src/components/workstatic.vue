<template>
    <el-table :data="works">
        <el-table-column prop="workName" label="作业名称" />
        <el-table-column prop="dueDate" label="截止日期" />
        <el-table-column prop="action" label="操作">
            <template #default="scope">
                <el-button size="small" type="primary" @click="goto(scope.$index)" v-if="true">查看此作业情况
                </el-button>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
export default {
    name: "workstatic",
    components: {
    },
    methods: {
        getWorkState() {
            this.axios.get("http://127.0.0.1:8765/v1/work/getWork?courseId=" + this.courseId).then(
                res => {
                    this.works = []
                    res.data.map(work => {
                        let tmp = {
                            workId: work.id,
                            workName: work.workName,
                            dueDate: work.dueDate
                        }
                        this.works = [...this.works, tmp]
                    })
                }
            )
        },
        goto(index) {
            this.$router.push("/course/" + this.courseId + "/workstudent/" + this.works[index].workId)
        }
    },
    created() {
    },
    mounted() {
        this.getWorkState()
    },
    data() {
        return {
            works: [
                {
                    workId: 0,
                    workName: '',
                    dueDate: '',
                }
            ],
            courseId: this.$route.params.courseId
        }
    }
};

</script>

<style scoped>
</style>