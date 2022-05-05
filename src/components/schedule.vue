<template>
  <el-container id="schedule">
    <el-aside width="400px">
      <el-table
        :data="inCourse"
        border
        style="width: 75%; margin: 21px; padding: 0px"
        @cell-mouse-enter="onHover"
      >
        <el-table-column prop="course" label="课程" width="200" />
        <el-table-column label="Actions">
          <template v-slot:default="table">
            <!-- <router-link
              :to="{
                name: 'liveroom',
                params: { course: inCourse[table.row._id].course },
              }"
              tag="span"
            > -->
            <el-button type="text" size="mini" @click="togo(table.row._id)">
              进入
              <i class="el-icon-edit" />
            </el-button>
            <!-- </router-link> -->
          </template>
        </el-table-column>
      </el-table>
    </el-aside>
    <el-main>
      <el-table :data="tableDatas" border style="width: 100%">
        <el-table-column prop="d" label="时间" />
        <el-table-column prop="d1" label="星期一" />
        <el-table-column prop="d2" label="星期二" />
        <el-table-column prop="d3" label="星期三" />
        <el-table-column prop="d4" label="星期四" />
        <el-table-column prop="d5" label="星期五" />
        <el-table-column prop="d6" label="星期六" />
        <el-table-column prop="d7" label="星期日" />
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import { useStore } from "vuex";

export default {
  name: "schedule",
  data() {
    return {
      tableDatas: [
        {
          d: "08:00-08:45",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "08:55-09:40",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "10:10-10:55",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "11:05-11:50",

          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "13:30-14:15",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "14:25-15:10",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "15:40-16:25",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "16:35-17:20",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "18:30-19:15",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
        {
          d: "19:25-20:10",
          d1: "",
          d2: "",
          d3: "",
          d4: "",
          d5: "",
          d6: "",
          d7: "",
        },
      ],
      inCourse: [
        {
          course: "1",
          courseId: "1",
        },
      ],
    };
  },
  methods: {
    getList() {
      this.axios
        .get(
          "http://127.0.0.1:8765/v1/course/getSchedule?userId=" +
            this.store.state.user.userId
        )
        .then((Response) => {
          let schedules = Response.data;
          schedules.map((schedule) => {
            this.tableDatas[schedule.level - 1]["d" + schedule.day] =
              schedule.courseName;
          });
        });
    },
    getCourse() {
      this.axios
        .get(
          "http://127.0.0.1:8765/v1/course/getCourse?userId=" +
            this.store.state.user.userId
        )
        .then((Response) => {
          let courses = Response.data;
          //   console.log(Response.data)
          let cc = [];
          courses.map((tcourse) => {
            let tmp = {
              course: tcourse.courseName,
              courseId: tcourse.course,
            };
            cc = [...cc, tmp];
          });
          this.inCourse = cc;
        });
      //   console.log(this.inCourse);
    },
    togo(courseId) {
      console.log(courseId);
      this.$router.push({ name: "liveroom", params: { course: courseId } });
    },
  },
  setup: function () {
    const store = new useStore();
    return {
      store,
    };
  },
  mounted() {
    this.getList();
    this.getCourse();
    // console.log(this.tableDatas);
  },
};
</script>

<style scoped>
#schedule {
  background: url("../assets/loginbackground.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
</style>