<template>
  <el-table :data="works">
    <el-table-column prop="workName" label="作业名称" />
    <el-table-column prop="dueDate" label="截止日期" />
    <el-table-column prop="score" label="分数" />
    <el-table-column prop="isfinished" label="是否完成" />
    <el-table-column prop="action" label="操作">
      <template #default="scope">
        <el-button size="small" type="primary" @click="goto(scope.$index)" v-if="true">做作业
        </el-button>
        <el-button size="small" type="primary" @click="look(scope.$index)" v-if="true">查看作业
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "seework",
  components: {
  },
  methods: {
    getWorks() {
      this.works = []
      this.axios.get("http://127.0.0.1:8765/v1/work/getWork?courseId=" + this.courseId).then(
        res => {
          let i = 0;
          console.log(res.data);
          res.data.map(w => {
            let tmp = {
              workId: w.id,
              workName: w.workName,
              dueDate: w.dueDate,
              action: '做作业',
              isfinished: false,
              score: 0
            }
            this.works = [...this.works, tmp]
            this.getWorkStat(i++)
          })
        }
      )
    },
    getWorkStat(index) {
      let w = this.works[index]
      this.axios.get("http://127.0.0.1:8765/v1/work/getWorkStat?workId=" + w.workId + "&userId=" + this.userId).then(
        res => {
          let c = res.data
          this.works[index].isfinished = c.finished
          this.works[index].score = c.score
        }
      )
    },
    goto(index) {
      let date = new Date(this.works[index].dueDate)
      let now = new Date()
      console.log(date);
      console.log(now);
      if (this.works[index].isfinished) {
        alert("已完成作业")
        return
      } else if (now >= date) {
        alert("作业已过期")
        return
      }
      this.$router.push(`/course/${this.courseId}/dowork/${this.works[index].workId}`);
    },
    look(index) {
      if (this.works[index].isfinished) {
        this.$router.push(`/course/${this.courseId}/lookwork/${this.works[index].workId}`);
      } else {
        alert("还未完成作业")
      }
    }
  },
  created() {
    this.getWorks()
  }
  ,
  setup: function () {
    const store = new useStore();
    return {
      store,
    };
  },
  mounted() {
  },
  data() {
    return {
      works: [
        {
          workId: 0,
          workName: '',
          dueDate: '',
          scores: 0,
          isfinished: false,
        }
      ],
      courseId: this.$route.params.courseId,
      userId: this.store.state.user.userId,
    }
  }
};
</script>

<style scoped>
</style>