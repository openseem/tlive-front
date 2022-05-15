<template>
  <el-table :data="questions">
    <el-table-column prop="vision" label="已添加题目" :formatter="wrapText">
    </el-table-column>
  </el-table>
  <el-form :model="form" label-width="120px" class="form">
    <el-form-item label="作业名称">
      <el-input v-model="form.workName" />
    </el-form-item>
    <el-form-item label="截止时间">
      <el-date-picker v-model="form.dueDate" type="date" placeholder="Pick a date" style="width: 100%"
        format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
    </el-form-item>
    <el-button type="primary" @click="dialogVisible = true">增加题目</el-button>
    <el-button type="primary" @click="submit">提交作业</el-button>
  </el-form>
  <el-dialog v-model="dialogVisible" title="添加题目" width="30%" :before-close="handleClose">
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
  name: "postwork",
  components: {
  }, data() {
    return {
      form: {
        workName: '',
        dueDate: ''
      },
      questions: [
        // {
        //   question: '',
        //   optionA: '',
        //   optionB: '',
        //   optionC: '',
        //   optionD: '',
        //   answer: '',
        //   score: 0,
        //   vision: 'sada'
        // }
      ],
      question: {
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: '',
        score: '',
      },
      dialogVisible: false,
      workId: 0,
      courseId: this.$route.params.courseId,
      success: false
    }
  },
  mounted() {
    this.questions = []
  },
  methods: {
    addQuestion() {
      if (this.question.question == '' || this.question.optionA == '' || this.question.optionB == '' || this.question.optionC == '' || this.question.optionD == '' || this.question.answer == '' || this.question.score == '') {
        alert("消息不完整")
        return
      }
      let vision = `
        ${this.question.question} 
        A: ${this.question.optionA} 
        B: ${this.question.optionB}
        C: ${this.question.optionC}
        D: ${this.question.optionD}
        答案为: ${this.question.answer}
        分值为: ${this.question.score}
      `
      let q = {
        question: this.question.question,
        optionA: this.question.optionA,
        optionB: this.question.optionB,
        optionC: this.question.optionC,
        optionD: this.question.optionD,
        answer: this.question.answer,
        score: this.question.score,
        vision: vision
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
      this.questions = [...this.questions, q]
      this.dialogVisible = false
    },
    submitWork() {
      console.log(this.form.dueDate);
      this.axios.post("http://127.0.0.1:8765/v1/work/newWork", {
        courseId: this.courseId,
        workName: this.form.workName,
        dueDate: this.form.dueDate
      }).then(res => {
        this.workId = res.data.id;
        this.questions.map(ques => {
          this.submitQuesion(ques)
        })
      })
    },
    submitQuesion(quesion) {
      switch (quesion.answer) {
        case 'A': quesion.answer = 1; break;
        case 'B': quesion.answer = 2; break;
        case 'C': quesion.answer = 3; break;
        case 'D': quesion.answer = 4; break;
        default: return
      }
      let questionId;
      this.axios.post("http://127.0.0.1:8765/v1/work/newQuestion", quesion).then(
        res => {
          questionId = res.data.id;
          console.log(questionId);
          this.axios.post("http://127.0.0.1:8765/v1/work/addToWork", {
            workId: this.workId,
            questionId: questionId
          }).then(
            res => {
              this.success = true
            }
          )
        }
      )
    }
    ,
    submit() {
      this.submitWork()
      alert("添加成功")
      this.$router.go(-1)
    }
  }
};
</script>

<style scoped>
.form {
  margin: 80px;
}
</style>