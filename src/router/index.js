import Vue from 'vue'
import VueRouter from 'vue-router'
const VuexDemo = () => import('@/views/VuexDemo')

const Index = () => import('@/views/index/Index') //首页

const Recommend = () => import('@/views/recommend/Recommend') //推荐
const Ranking = () => import('@/views/ranking/Ranking') //排行
const Playing = () => import('@/views/playing/Playing') //播放
const User = () => import('@/views/user/User') //我的
const Login = () => import('@/views/user/Login') //登录

const PlaylistDetail = () => import('@/views/playlistDetail/PlaylistDetail') //歌单详情


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/recommend',
    children: [{
        path: '/recommend',
        name: 'Recommend',
        component: Recommend,
        meta: {
          keepAlive: true // 需要缓存
        }
      },
      {
        path: '/ranking',
        name: 'Ranking',
        component: Ranking,
        meta: {
          keepAlive: true // 需要缓存
        }
      },
      {
        path: '/user',
        name: 'User',
        component: User,
        meta: {
          keepAlive: true // 需要缓存
        }
      },
      {
        path: '/playlistDetail',
        name: 'PlaylistDetail',
        component: PlaylistDetail,
        meta: {
          keepAlive: true // 需要缓存
        }
      },
      
    ]
  },
  {
    path: '/playing',
    name: 'Playing',
    component: Playing,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      keepAlive: true // 需要缓存
    }
  },
  {
    path: '/VuexDemo',
    name: 'VuexDemo',
    component: VuexDemo,
    meta: {
      keepAlive: false // 需要缓存
    }
  },
]

const router = new VueRouter({
  routes
})

export default router