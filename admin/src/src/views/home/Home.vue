<template>
    <div>
  	    <NavHeader></NavHeader>
        <section class="page">
            <el-col :span="3" class="section-left">
                <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
                    <el-menu-item index="/home"><i class="el-icon-menu"></i>主页</el-menu-item>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>用户管理</template>
                        <el-menu-item  index="/home/adduser">增加用户</el-menu-item>
                        <el-menu-item  index="/home/userlist">用户操作</el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-col>
            <el-col :span="21" class="section-right">
                <keep-alive>
                    <router-view class="router-view"></router-view>
                </keep-alive>
            </el-col>
        </section>
    </div>
</template>
<script>
	import Vue from 'vue'
	import NavHeader from '../common/Nav.vue'
    import {mapState} from 'vuex'
    export default {
        name: 'home',
        data() {
            return {
               
            }
        },
        computed: {
            mapState(state){
                user:state.user.sessiondata
            },
            onRoutes(){
                return this.$route.path;
            }
        },
        mounted(){
            this.role();
            this.$http.post('session').then(res =>{
                if(!res.data.status){
                    this.$router.push("/");
                }
            })
        },
        watch: {
            $route(to){
                this.role();
            }
        },
        methods:{
            role(){
                this.$router.beforeEach(({meta, path}, from, next) => {
                    var {auth = true} = meta;
                    var isLogin = Boolean(this.$store.state.user.sessiondata.status) //true用户已登录， false用户未登录
                    if (auth && !isLogin && path !== '/login') {
                        return next({path: '/login'})
                    }
                    next();
                })
            }
        },
        components: {
            NavHeader
        }
    }
</script>
<style scoped>

</style>
