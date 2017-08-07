<template>
    <div>
        <h2>

            <template v-if="user.session">
                <span class="user">
                     Welcome：当前用户 {{user.session}}
                </span>
            </template>
            <template v-else="">
                <router-link to="/login" class="href">未登录状态点击登录</router-link>
            </template>

        </h2>
    </div>
</template>
<style scoped>
    .user{
        font-size: 25px;
    }
    .href {
        font-size: 18px;
        color: #ff002a;
    }

    h2 {
        text-align: left;
        font-size: 40px;
    }
</style>
<script>
    import {mapState} from 'vuex'
    export default {
        name: 'home',
        data() {
            return {};
        },
        computed: mapState({
            user: state => state.user.sessiondata
        }),
        methods: {}
    }
</script>
