<template>
    <el-form :model="form" label-width="120px" class="login-form">
        <el-form-item label="问题名称">
            <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="选项A">
            <el-input v-model="form.optionA" />
        </el-form-item>
        <el-form-item label="选项B">
            <el-input v-model="form.optionB" />
        </el-form-item>
        <el-form-item label="选项C">
            <el-input v-model="form.optionC" />
        </el-form-item>
        <el-form-item label="选项D">
            <el-input v-model="form.optionD" />
        </el-form-item>
        <el-form-item label="答案">
            <el-radio-group v-model="form.resource">
                <el-radio label="A" />
                <el-radio label="B" />
                <el-radio label="C" />
                <el-radio label="D" />
            </el-radio-group>
        </el-form-item>
        <el-form-item label="分值">
            <el-input v-model="form.optionD" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "dowork",
    components: {
    },
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            }
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!')
        }
    }
};
</script>

<style scoped>
.login-form {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 80px;
    width: 80%;
    /* height: 800px; */
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>