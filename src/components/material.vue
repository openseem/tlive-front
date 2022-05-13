<template>
    <div label-width="0" class="login-form">
        <el-table :data="materialList" border style="width: 90%; margin: 21px; padding: 0px">
            <el-table-column prop="fileName" label="文件名" width="440px" />
            <el-table-column prop="action" label="操作">
                <template #default="scope">
                    <el-button size="small" type="primary" @click="downloadResult(scope.$index)">下载</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
import fileDownload from "js-file-download";

export default {
    name: "material",
    components: {
    },
    methods: {
        downloadResult(index) {
            let fileName = this.materialList[index].fileName
            this.axios.post("http://127.0.0.1:8765/v1/file/download", {
                fileName: fileName
            }).then(res => {
                fileDownload(res.data, fileName); // 使用js-file-download来接收二进制流然后下载
            }).catch(err => {
                this.$message.error(err);
            });
        },
    },
    data() {
        return {
            materialList: [],
            courseId: this.$route.params.courseId
        }
    },
    mounted() {
        this.axios.get('http://127.0.0.1:8765/v1/file/getMaterialList?courseId=' + this.courseId).then(
            res => {
                let ds = res.data
                let cc = []
                console.log(ds);
                ds.map(material => {
                    let tmp = {
                        fileName: material.fileName,
                        action: "下载",
                    }
                    cc = [...cc, tmp]
                })
                this.materialList = cc
            }
        )
    }
};
</script>

<style scoped>
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
</style>