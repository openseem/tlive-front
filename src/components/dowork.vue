<template>
    <el-form :model="form" label-width="120px" v-for="question in questions" v-bind:key="question.index" align="left">

        <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp第{{
                question.index
        }}题：{{ question.question }} (分值：{{ question.score }})</h4>
        <el-form-item>
            <el-radio-group style="display:block;" v-model="question.ans">
                <div>
                    <el-radio label="A">
                        {{ question.optionA }}
                    </el-radio>
                </div>
                <div>
                    <el-radio label="B">
                        {{ question.optionB }}
                    </el-radio>
                </div>
                <div>
                    <el-radio label="C">
                        {{ question.optionC }}
                    </el-radio>
                </div>
                <div>
                    <el-radio label="D">
                        {{ question.optionD }}
                    </el-radio>
                </div>
            </el-radio-group>
        </el-form-item>
    </el-form>
    <el-form>
        <el-form-item label-width="120px">
            <el-button type="primary" @click="onSubmit">提交作业</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { useStore } from "vuex";

export default {
    name: "dowork",
    components: {
    },
    data() {
        return {
            questions: [
                {
                    index: 0,
                    id: 0,
                    question: '',
                    optionA: '',
                    optionB: '',
                    optionC: '',
                    optionD: '',
                    score: 0,
                    answer: ''
                }
            ],
            answers: [
                {
                    index: 0,
                    answer: 'A'
                }
            ],
            userId: this.store.state.user.userId,
            workId: this.$route.params.workId,
        }
    },
    setup: function () {
        const store = new useStore();
        return {
            store,
        };
    },
    methods: {
        onSubmit() {
            this.axios.post("http://127.0.0.1:8765/v1/work/completeWork", {
                questionInfos: this.questions,
                userId: this.userId,
                workId: this.workId
            })
            this.$router.go(-1)
        },
        getwork() {
            this.questions = [];
            this.answers = [];
            this.axios.get("http://127.0.0.1:8765/v1/work/getToWork?workId=" + this.workId).then(
                res => {
                    let d = res.data
                    console.log(d);
                    let i = 1
                    d.map(question => {
                        let tmp = {
                            index: i,
                            id: question.id,
                            question: question.question,
                            optionA: question.optionA,
                            optionB: question.optionB,
                            optionC: question.optionC,
                            optionD: question.optionD,
                            score: question.score,
                            ans: ''
                        }
                        let t = {
                            index: i++,
                            answer: ''
                        }
                        this.answers = [...this.answers, t]
                        this.questions = [...this.questions, tmp]
                        console.log(this.questions);
                    })
                }
            )
            console.log(this.questions)
        }
    },
    mounted() {
        this.getwork()
    }
};
</script>

<style scoped>
.login-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 80px;
    width: 80%;
    /* height: 800px; */
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>