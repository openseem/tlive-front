<template>
    <div class="upload">
        <el-upload :file-list="fileList" :auto-upload="false" :http-request="uploadHttpRequest" class="upload-demo"
            :on-change="fileChange" ref="upload" drag action="#">
            <i class="el-icon-upload" />
            <div class="el-upload__text">将文件拖到此处，或<em>点击选取文件</em></div>
            <div slot="tip" class="el-upload__tip">一次只能上传一个文件</div>
        </el-upload>
        <el-button type="success" @click="submitUpload" style="margin-left: 30px; margin-top: 20px">上传</el-button>
    </div>
</template>

<script>
export default {
    name: "upload",
    components: {
    },
    data() {
        return {
            FileList: [],
            courseId: this.$route.params.courseId
        }
    },
    methods: {
        fileChange(file, fileList) {
            // 因为是限制为只能上传一个文件，所以前端选取文件时，如果选取第二个文件时，要把第一个文件给覆盖掉。
            this.fileList = [fileList[fileList.length - 1]];
            // 也可以这样写：
            // this.fileList = [file]; 
        },
        closeUpload() {
            // 当对话框关闭时，清空已上传的文件列表，同时fileList重新设置为空数组
            this.$refs.upload.clearFiles(); // 这个是el-upload自带的清空文件列表方法
            this.fileList = [];
        },
        uploadHttpRequest() {
            // 检验用户是否未选取文件就上传
            if (this.fileList.length === 0) {
                console.log('请添加文件');
                return
            }
            const formData = new FormData();
            formData.append('file', this.fileList[0].raw); // 要上传的文件
            // ${server.url}/comp/uploadResult 这个是后端接收的接口
            // withCredentials: true一定要设置，否则可能会上传不成功，这是个坑
            formData.append('courseId', this.courseId)
            this.axios.post(`http://127.0.0.1:8765/v1/file/upload`, formData, {
                // withCredentials: true,
            }).then(res => {
                if (res.data.stat === 200) {
                    this.$message.success('上传成功');
                    this.fileList = []; // 上传成功就初始化文件列表
                } else {
                    console.log(res.data.message)
                }
            }).catch(err => {
                console.log(res.data.message)
            });
        },
        // 自定义上传功能
        submitUpload() {
            this.$refs.upload.submit(); // 这个会触发upload的http-request，手动上传文件
        },
    }
};
</script>

<style scoped>
.upload {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 15% auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>