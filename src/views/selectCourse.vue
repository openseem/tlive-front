<template>
  <div id="selectCourse">
    <div label-width="0" class="login-form">
      <h3>选课</h3>
      <el-table
        :data="courseList"
        border
        style="width: 90%; margin: 21px; padding: 0px"
      >
        <el-table-column prop="courseName" label="课程" width="200" />
        <el-table-column prop="teacherName" label="老师" width="200" />
        <el-table-column prop="action" label="操作">
          <template #default="scope">
            <el-button size="small" type="primary" @click="goto(scope.$index)"
              >加入</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-alert
        id="success"
        title="注册成功"
        type="success"
        v-if="success"
        @close="success = false"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  name: "selectCourse",
  components: {},
  data() {
    return {
      courseList: [
        {
          courseId: 0,
          courseName: "",
          teacherId: 0,
          teacherName: "",
          action: "加入",
        },
      ],
      success: false,
    };
  },
  setup: function () {
    const store = new useStore();
    return {
      store,
    };
  },
  mounted() {
    this.getNotCourse();
    console.log(this.courseList);
  },
  methods: {
    getNotCourse() {
      this.axios
        .get(
          "http://localhost:8765/v1/course/getNotCourse?userId=" +
            this.store.state.user.userId
        )
        .then((Response) => {
          let courses = Response.data;
          console.log(courses);
          let cc = [];
          courses.map((course) => {
            let tmp = {
              courseId: course.course,
              courseName: course.courseName,
              teacherId: course.teacher,
              teacherName: course.teacherName,
              action: "加入",
            };
            cc = [...cc, tmp];
          });
          this.courseList = cc;
        });
    },
    goto(index) {
      let courseIds = this.courseList[index].courseId;
      this.axios
        .post(
          "http://localhost:8765/v1/course/add",
          {
            userId: this.store.state.user.userId,
            courseId: courseIds,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((Response) => {
          if (Response.data.stat == "ok") {
            this.success = true;
            let cc = [];
            this.courseList.map((course) => {
              if (!(course.courseId == courseIds)) {
                cc = [...cc, course];
              }
            });
            this.courseList = cc;
          }
        });
    },
  },
};
</script>

<style scoped>
#selectCourse {
  background: url("../assets/loginbackground.jpg") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

.login-form {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 5% auto;
  width: 600px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login-button {
  margin-top: 30px;
  width: 100%;
}
</style>