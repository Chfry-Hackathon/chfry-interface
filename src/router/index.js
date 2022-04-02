import Vue from "vue"
import VueRouter from "vue-router"
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import Layout from "@/layout"
import {trace} from "../utils/tools";
import VueAnalytics from 'vue-analytics'
// import Ido from "../pages/ido/index"

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

NProgress.configure({showSpinner: false}) // NProgress Configuration


export const constantRoutes = [
    {
        path: '/',
        component: Layout,
        name: 'home',
        children: [{
            path: '',
            component: () => import('@/pages/home/index')
        },
        // {
        //     path: 'ido',
        //     component: () => import('@/pages/ido/index')
        // }
    ]
    },
    {
        path: "/",
        name: 'products',
        redirect: `products/fryer`,
        component: Layout,
        children: [
            {
                path: `fryer`,
                component: () => import('@/pages/products/fryer/index'),
            },
            {
                path: `fryer/deposit`,
                component: () => import('@/pages/products/fryer/main'),
            },
            {
                path: `ovenV1`,
                component: () => import('@/pages/products/oven/index'),
            },
            {
                path: `ovenV1/stake`,
                component: () => import('@/pages/products/oven/main'),
            },
            {
                path: `ovenV2`,
                component: () => import('@/pages/products/OvenV2/index'),
            },
            {
                path: `ovenV2/stake`,
                component: () => import('@/pages/products/OvenV2/main'),
            },
            {
                path: `oven`,
                component: () => import('@/pages/products/oven/index'),
            },
            {
                path: `oven/stake`,
                component: () => import('@/pages/products/oven/main'),
            },
            {
                path: `cheese`,
                component: () => import('@/pages/products/cheese/index'),
            },
            {
                path: `cheese/stake`,
                component: () => import('@/pages/products/cheese/main'),
            },
            {
                path: `flash/:id`,
                // component: () => import('@/pages/products/flash/index'),
                component: () => import('@/pages/products/NewFlash/index'),
            },
            {
                path: `newFlash`,
                component: () => import('@/pages/products/flash/index'),
            },
            {
                path: `leaderBoard`,
                component: () => import('@/pages/products/leaderBoard/index'),
            },
        ]
    },
    {
        path: '*',
        component: Layout,
        name: 'home',
        children: [{
            path: '',
            component: () => import('@/pages/home/index')
        },
    ]
    },
]


const createRouter = () => new VueRouter({
    // 设置路由高亮的全局calss名称
    // mode: 'history',
    linkActiveClass: "active",
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()
import global from "../common/Global"
router.beforeEach((to, from, next) => {
    // NProgress.start()
    // next()

    trace("router-change---from",from.path,  "to-path=",to.path)
    NProgress.start();
    if(global.isClose){
        if(to.path!="/"){
            next("/");
        }else{
            next();
        }
    }else {
        next()
    }

})

router.afterEach(route => {
    NProgress.done()
})

if (process.env.NODE_ENV === 'production') {
    Vue.use(VueAnalytics, {
        id: process.env.VUE_APP_GOOGLE_ANALYTICS_ID || 'UA-210115562-1',
        router
    })
}

export default router
