<template>
    <div class="news">
        <el-button type="primary" :loading="loading" @click="submitForm">抓取当日国内新闻</el-button>
        <el-col :span="24" class="list">
            <el-table :data="pagelist" border v-loading="pagelist == undefined" element-loading-text="拼命加载中" style="width: 100%">
                <el-table-column property="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="title" label="标题">
                    <template scope="scope">
                        <p class="text">{{scope.row.title}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="description" label="描述（预览）">
                    <template scope="scope">
                        <a class="destext" target="_blank" :href="scope.row.link">{{scope.row.description}}</a>
                    </template>
                </el-table-column>
                <el-table-column prop="pubDate" label="时间" width="180"></el-table-column>
                <el-table-column property="flag" label="来源" width="90"></el-table-column>
            </el-table>
            <div class="page-block">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="page.limit" layout="total,prev, pager, next, jumper" :total="page.count"></el-pagination>
            </div>
        </el-col>
    </div>
</template>
<style scoped>
    .list {
        margin-top: 20px;
    }

    .destext {
        white-space: normal;
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        color: #1f2d3d;
    }

    .linktext {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c4c4c4;
        color: #1f2d3d;
        margin: 0;
        font-size: 14px;
        color: #1f2d3d;
        padding: 7px 9px;
        font-size: 12px;
        border-radius: 4px;
        margin-left: 10px;
    }

    .linktext:hover {
        color: #20a0ff;
        border-color: #20a0ff;
    }
</style>
<script>
    import {mapState} from 'vuex'
    export default {
        name: 'worldnews',
        data() {
            return {
                loading: false,
                currentPage: 1
            }
        },
        computed: mapState({
            page: state => state.news.newlist,
            pagelist (state) {
                var obj = Object.assign(state.news.newlist);
                if (obj.hasOwnProperty('list')) {
                    return obj.list.data;
                }
            }
        }),
        mounted(){
            this.getNews();
        },
        methods: {
            getNews(){
                this.$store.dispatch({
                    type: 'news',
                    queryStr: this.currentPage
                });
            },
            handleDelete(index, row){
                var self = this;
                this.$confirm('确定删除该条新闻嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    self.$http.post('deletenews', {
                        id: row.id
                    }).then((res) => {
                        if (res.data.status) {
                            this.$message({
                                type: 'success',
                                duration: 1000,
                                message: '删除成功!',
                                onClose: function () {
                                    self.getNews();
                                }
                            });
                        }
                    });
                }).catch(() => {
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.$store.dispatch({
                    type: 'news',
                    queryStr: this.currentPage
                });
            },
            submitForm(){
                var self = this;
                this.loading = true;
                this.$http.get('news').then((res) => {
                    if (res.data.status) {
                        self.getNews();
                        self.loading = false;
                    }else{
                        this.$message({
                            type: 'success',
                            duration: 1000,
                            message: '已经抓取了最新新闻'
                        });
                        self.getNews();
                        self.loading = false;
                    }
                })
            }
        }
    }
</script>
