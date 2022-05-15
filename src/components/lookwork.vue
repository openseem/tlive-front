<template>
    <el-form :model="form" label-width="120px" v-for="question in questions" v-bind:key="question.index" align="left">

        <h4>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp第{{
                question.index
        }}题：{{ question.question }} (分值：{{ question.score }})</h4>
        <el-form-item>
            <el-radio-group style="display:block;" v-model="question.answer" disabled="true">
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
        <el-form-item>
            您的答案：{{ question.ans }}
        </el-form-item>
    </el-form>
    <el-form>
        <el-form-item label-width="120px">
            <el-button type="primary" @click="onSubmit">返回</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { useStore } from "vuex";

export default {
    name: "lookwork",
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
            userId: this.store.state.user.userId,
            workId: this.$route.params.workId,
            score: 0,
            ans: ''
        }
    },
    setup: function () {
        const store = new useStore();
        return {
            store,
        };
    },
    methods: {
        getwork() {
            this.questions = [];
            this.answers = [];
            this.axios.get("http://127.0.0.1:8765/v1/work/getToWork?workId=" + this.workId).then(
                res => {
                    let d = res.data
                    console.log(d);
                    let i = 1
                    d.map(question => {
                        let a = ""
                        switch (question.answer) {
                            case 1:
                                a = "A"
                                break;
                            case 2:
                                a = "B"
                                break;
                            case 3:
                                a = "C"
                                break;
                            case 4:
                                a = "D"
                                break;
                            default:
                                break;
                        }
                        let tmp = {
                            index: i,
                            id: question.id,
                            question: question.question,
                            optionA: question.optionA,
                            optionB: question.optionB,
                            optionC: question.optionC,
                            optionD: question.optionD,
                            score: question.score,
                            answer: a,
                            ans: this.ans.charAt(i - 1)
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
        },
        getWorkStat() {
            this.axios.get("http://127.0.0.1:8765/v1/work/getWorkStat?workId=" + this.workId + "&userId=" + this.userId).then(
                res => {
                    let c = res.data
                    console.log(c);
                    this.ans = c.ans
                    this.score = c.score
                    this.getwork()
                }
            )
        },
        onSubmit() {
            this.$router.go(-1)
        }
    },
    mounted() {
        this.getWorkStat()
    }
};
</script>

<style scoped>
</style>