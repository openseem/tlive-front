<template>
  <el-container style="z-index: 1">
    <div style="z-index: 10" id="liveroom">
      <chat style="z-index: 10" :course-id="course" />
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
      timer: '',
      userId: this.store.state.user.userId
    };
  },
  mounted() {
    this.timer = setInterval(this.getUserList, 1000);

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
    clearInterval(this.timer)
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
</style>
