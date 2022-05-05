<template>
  <div id="liveroom">
    <chat style="z-index: 10" :course-id="course" />
  </div>
  <el-container style="z-index: -1">
    <el-aside>
      <el-table border :data="tableData" style="width: 180px">
        <el-table-column prop="tname" label="在线人员" width="180px" />
      </el-table>
    </el-aside>
    <el-main>
      <live class="nopadding" :course-id="course" />
    </el-main>
  </el-container>
</template>

<script>
import live from "../components/live.vue";
import chat from "../components/chat.vue";

export default {
  name: "liveroom",
  components: {
    live,
    chat,
  },
  data() {
    return {
      course: this.$route.params.course,
      tableData: [],
    };
  },
  mounted() {
    this.timer = setInterval(this.getUserList, 1000);
  },
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
