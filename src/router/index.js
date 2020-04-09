import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    alwaysShow: true, // will always show the root menu
    name: 'user',
    meta: {
      title: '用户管理',
      icon: 'user',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'),
        name: 'Index',
        meta: {
          title: '用户列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'comment',
        component: () => import('@/views/user/comment'),
        name: 'Comment',
        meta: {
          title: '评论列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'refer',
        component: () => import('@/views/user/refer'),
        name: 'Refer',
        meta: {
          title: '推广列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'accountLog',
        component: () => import('@/views/user/accountLog'),
        name: 'AccountLog',
        meta: {
          title: '账变记录',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'withdrawLog',
        component: () => import('@/views/user/withdrawLog'),
        name: 'WithdrawLog',
        meta: {
          title: '提现记录',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/user/profile'),
        hidden: true
      },
      {
        path: 'forget',
        component: () => import('@/views/user/forget'),
        hidden: true
      }
    ]
  },
  {
    path: '/content',
    component: Layout,
    redirect: '/content/video',
    alwaysShow: true, // will always show the root menu
    name: 'content',
    meta: {
      title: '内容管理',
      icon: 'component',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'video',
        component: () => import('@/views/content/video'),
        name: 'Video',
        meta: {
          title: '视频列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'article',
        component: () => import('@/views/content/article'),
        name: 'Article',
        meta: {
          title: '图文列表',
          roles: ['admin', 'editor']
        }
      },
      {
        path: 'category',
        component: () => import('@/views/content/category'),
        name: 'Category',
        meta: {
          title: '分类列表',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/advert',
    component: Layout,
    redirect: '/advert/index',
    alwaysShow: true, // will always show the root menu
    name: 'advert',
    meta: {
      title: '广告管理',
      icon: 'language',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        // component: () => import('@/views/video/index'),
        name: 'Index',
        meta: {
          title: '广告列表',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/index',
    alwaysShow: true, // will always show the root menu
    name: 'config',
    meta: {
      title: '站点配置',
      icon: 'example',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/config/index'),
        name: 'Index',
        meta: {
          title: '基础配置',
          roles: ['admin', 'editor']
        }
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'User',
        meta: {
          title: '管理员列表',
          roles: ['admin']
        }
      },
      {
        path: 'adminLog',
        component: () => import('@/views/user/adminLog'),
        name: 'AdminLog',
        meta: {
          title: '管理员日志',
          roles: ['admin']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role',
        meta: {
          title: '角色管理',
          roles: ['admin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
