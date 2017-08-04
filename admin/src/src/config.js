const Home = resolve => require(['./views/home/Home.vue'], resolve)
const Start = resolve => require(['./views/home/Start.vue'], resolve)
const Adduser = resolve => require(['./views/user/User.vue'], resolve)
const Userlist = resolve => require(['./views/user/UserList.vue'], resolve)
const Login = resolve => require(['./views/user/Login.vue'], resolve)
const WorldNews = resolve => require(['./views/news/WorldNews.vue'], resolve)

export  default[
    {
        path: '/home',
        component: Home,
        children: [
            {
                name: '首页',
                path: '',
                component: Start
            },
            {
                path: 'adduser',
                component: Adduser,
                name: "增加用户"
            },
            {
                path: 'userlist',
                component: Userlist,
                name: '用户管理'
            },
            {
                path: 'worldnews',
                component: WorldNews,
                name: '国内新闻'
            }
        ]
    },
    {
        path: '/login',
        components: {
            login:Login
        },
        name: '登录页面'
    },
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '*',
        redirect: '/home'
    }
];
