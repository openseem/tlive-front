<template>
  <el-container style="z-index: 1">
    <div style="z-index: 10" id="liveroom">
      <chat style="z-index: 10" :course-id="course" />
      <!-- <el-button type="primary" @click="queryQuestion">获得在线问题</el-button> -->

    </div>
    <el-aside>
      <el-table border :data="tableData" style="width: 180px">
        <el-table-column prop="tname" label="在线人员" width="180px" />
      </el-table>
    </el-aside>
    <el-main style="z-index: 1">
      <live class="nopadding" style="z-index: 0;" :course-id="course" />
    </el-main>
  </el-container>
  <el-dialog v-model="hasQuestion" title="在线问题限时一分钟" width="30%">
    <el-form :model="question" label-width="120px" align="left">

      <h4>
        &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp{{
            this.question.question
        }} (分值：{{ this.question.score }})</h4>
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
        <el-button type="primary" @click="submitQuestion">提交作业</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

</template>

<script>
import live from "../components/live.vue";
import chat from "../components/chat.vue";
import { useStore } from "vuex";


export default {
  name: "liveroom",
  components: {
    live,
    chat,
  },
  setup: function () {
    const store = new useStore();
    return {
      store,
    };
  },
  data() {
    return {
      course: this.$route.params.course,
      tableData: [],
      usertimer: '',
      questiontimer: '',
      userId: this.store.state.user.userId,
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
      hasQuestion: false,
      courseId: this.$route.params.courseId,
    };
  },
  mounted() {
    this.getUserList()
    this.usertimer = setInterval(this.getUserList, 1000);

    this.questiontimer = setInterval(this.queryQuestion, 1000)

    this.axios.post("http://127.0.0.1:8765/v1/live/enter", {
      courseId: this.course,
      userId: this.userId
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  },
  unmounted() {
    clearInterval(this.usertimer)
    clearInterval(this.questiontimer)
    this.axios.post("http://127.0.0.1:8765/v1/live/leave", {
      courseId: this.course,
      userId: this.userId
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  ,
  computed: {},
  methods: {
    getUserList() {
      this.axios
        .get("http://127.0.0.1:8765/v1/live/users?course=" + this.course)
        .then((Response) => {
          let users = Response.data;
          let tables = [];
          console.log(users);
          users.map((user) => {
            let tmp = {
              tname: user.name,
              tmp: user.role,
            };
            tables = [...tables, tmp];
          });
          this.tableData = tables;
        });
    },
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
        courseId: this.course
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
    },
    queryQuestion() {
      this.axios.get("http://127.0.0.1:8765/v1/limitQuestion/getQuestion?courseId=" + this.course).then(
        res => {
          if (res.data.message == "no") {
            return;
          }
          let q = res.data
          this.question.question = q.question
          this.question.optionA = q.optionA
          this.question.optionB = q.optionB
          this.question.optionC = q.optionC
          this.question.optionD = q.optionD
          this.question.score = q.score
          this.hasQuestion = true
          clearInterval(this.questiontimer)

          setTimeout(function () {
            this.questiontimer = setInterval(this.queryQuestion, 10000)
          }, 1000 * 70)
        }
      )
    },
    submitQuestion() {
      this.axios.post("http://127.0.0.1:8765/v1/limitQuestion/submitLimitQuestion", {
        userId: this.userId,
        courseId: this.course,
        ans: this.question.ans
      })
      this.hasQuestion = false
      alert("提交成功")
    }
  },
  // mounted() {
  //     console.log(this.$route.params.course)
  //     this.courseId = this.$route.params.course
  // }
};
</script>

<style scoped>
.nopadding {
  padding: 0 !important;
  margin: 0 !important;
}

.but {
  position: absolute;
  right: 20px;
}
</style>
