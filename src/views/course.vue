<template>
    <el-container class="layout-container-demo" style="height: 100%">
        <el-aside width="200px">
            <el-scrollbar>
                <el-menu>
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon>
                            </el-icon>资料共享
                        </template>
                        <el-menu-item-group>
                            <router-link :to="uploadURL" style="text-decoration:none">
                                <el-menu-item index="1-1">资料上传</el-menu-item>
                            </router-link>

                            <router-link :to="materalURL" style="text-decoration:none">
                                <el-menu-item index="1-2">资料下载</el-menu-item>
                            </router-link>

                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                            </el-icon>作业
                        </template>
                        <router-link :to="doworkURL" style="text-decoration:none">
                            <el-menu-item index="1-1">创建问题</el-menu-item>
                        </router-link>
                        <router-link :to="seeworkURL" style="text-decoration:none">
                            <el-menu-item index="1-2">发布作业</el-menu-item>
                        </router-link>
                        <router-link :to="postworkURL" style="text-decoration:none">
                            <el-menu-item index="1-3">查看作业</el-menu-item>
                        </router-link>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>Navigator Three
                        </template>
                        <el-menu-item-group>
                            <template #title>Group 1</template>
                            <el-menu-item index="3-1">Option 1</el-menu-item>
                            <el-menu-item index="3-2">Option 2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="Group 2">
                            <el-menu-item index="3-3">Option 3</el-menu-item>
                        </el-menu-item-group>
                        <el-sub-menu index="3-4">
                            <template #title>Option 4</template>
                            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <el-container>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    name: "course",
    components: {

    },
    data() {
        return {
            courseId: this.$route.params.courseId,
            uploadURL: "/course/" + this.$route.params.courseId + "/upload",
            materalURL: "/course/" + this.$route.params.courseId + "/material",
            doworkURL: "",
            seeworkURL: "",
            postworkURL: ""
        }
    },
    computed: {

    },
    mounted() {
        this.uploadURL = "/course/" + this.$route.params.courseId + "/upload"
        this.materalURL = "/course/" + this.$route.params.courseId + "/material"
        this.doworkURL = "/course/" + this.$route.params.courseId + "/dowork"
        this.seeworkURL = "/course/" + this.$route.params.courseId + "/seework"
        this.postworkURL = "/course/" + this.$route.params.courseId + "/postwork"
        console.log(this.materalURL);
    }
};
</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>