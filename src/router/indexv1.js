import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import maps from "./maps/index";
import animatecss from "./animate-css";
Vue.use(VueRouter);
/* 整体布局 */
import Layout from "@/layout";
import threejs from "./threejs";
import live2d from "./live2d";

export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/",
    // name: 'Home',
    component: Layout,
    redirect: "/about",
    meta: { title: "Home", icon: "el-icon-s-help" },
    children: [
      {
        path: "about",
        component: () => import("@/views/About.vue"),
        name: "About",
        meta: { title: "About", icon: "dashboard", affix: true },
      },
    ],
  },
  // {
  //   path: "/",
  //   component: () => import("@/views/huaxiaoyu/testpage.vue"),
  //   hidden: true,
  // },
  // {
  //   path: '/test',
  //   name: 'Test',
  //   component: Layout,
  //   redirect: '/test/threejs',
  //   // meta: { title: 'Test', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'threejs',
  //       name: 'Threejs',
  //       component: () => import('../views/threejsdemo/camera-ex/index.vue'),
  //       meta: { title: 'Threejs', icon: 'el-icon-s-help',affix:true },
  //     },
  //     {
  //       path: 'editormd',
  //       name: 'Editormd',
  //       component: () => import('../views/editors/editor-md.vue'),
  //       meta: { title: 'Editormd', icon: 'el-icon-s-help',affix:true },
  //     },
  //     {
  //       path: 'editorw',
  //       name: 'Editorw',
  //       component: () => import('../views/editors/editor-w.vue'),
  //       meta: { title: 'Editorw', icon: 'el-icon-s-help',affix:true },
  //     },
  //   ]
  // },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  maps,
  animatecss,
  threejs,
  live2d,
  {
    path: "/iconsinit",
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: { title: "Icon", icon: "icon", noCache: true },
    redirect: "/iconsinit/lottie",
    children: [
      {
        path: "lottie",
        component: () => import("@/views/iconsinit/lottie.vue"),
        name: "Lottie",
        meta: { title: "Lottie", noCache: true },
      },
    ],
  },
  {
    path: "/webworker",
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: { title: "Webworker", icon: "icon", noCache: true },
    redirect: "/webworker/loadingfile",
    children: [
      {
        path: "loadinfile",
        component: () => import("@/views/webworker/LoadingFile.vue"),
        name: "LoadingFile",
        meta: { title: "LoadingFile", noCache: true },
      },
    ],
  },
  {
    path: "/editors",
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: { title: "编辑器", icon: "icon", noCache: true },
    redirect: "/editors/editormd",
    children: [
      {
        path: "editormd",
        component: () => import("@/views/editors/editor-md.vue"),
        name: "MD",
        meta: { title: "MarkDown", noCache: true },
      },
      {
        path: "editorw",
        component: () => import("@/views/editors/editor-w.vue"),
        name: "W",
        meta: { title: "富文本", noCache: true },
      },
    ],
  },
  {
    path: "/home",
    component: Layout,
    alwaysShow: true, // will always show the root menu
    meta: { title: "HomeIndex", icon: "icon", noCache: true },
    children: [
      {
        path: "index",
        component: () => import("@/views/Home.vue"),
        name: "Index",
        meta: { title: "Index", noCache: true },
      },
    ],
  },
  // {
  //   path: '/home',
  //   component: () => import('@/views/Home.vue'),
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Home',
  //   meta: { title: 'Home' }
  // }
  // {
  //   path: '/permission',
  //   component: Layout,
  //   redirect: '/permission/page',
  //   alwaysShow: true, // will always show the root menu
  //   name: 'Permission',
  //   meta: {
  //     title: 'Permission',
  //     icon: 'lock',
  //     roles: ['admin', 'editor'] // you can set roles in root nav
  //   },
  //   children: [
  //     {
  //       path: 'page',
  //       component: () => import('@/views/permission/page'),
  //       name: 'PagePermission',
  //       meta: {
  //         title: 'Page Permission',
  //         roles: ['admin'] // or you can only set roles in sub nav
  //       }
  //     },
  //     {
  //       path: 'directive',
  //       component: () => import('@/views/permission/directive'),
  //       name: 'DirectivePermission',
  //       meta: {
  //         title: 'Directive Permission'
  //         // if do not set roles, means: this page does not require permission
  //       }
  //     },
  //     {
  //       path: 'role',
  //       component: () => import('@/views/permission/role'),
  //       name: 'RolePermission',
  //       meta: {
  //         title: 'Role Permission',
  //         roles: ['admin']
  //       }
  //     }
  //   ]
  // },

  // {
  //   path: '/icon',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/icons/index'),
  //       name: 'Icons',
  //       meta: { title: 'Icons', icon: 'icon', noCache: true }
  //     }
  //   ]
  // },

  // /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/list',
  //   name: 'Example',
  //   meta: {
  //     title: 'Example',
  //     icon: 'el-icon-s-help'
  //   },
  //   children: [
  //     {
  //       path: 'create',
  //       component: () => import('@/views/example/create'),
  //       name: 'CreateArticle',
  //       meta: { title: 'Create Article', icon: 'edit' }
  //     },
  //     {
  //       path: 'edit/:id(\\d+)',
  //       component: () => import('@/views/example/edit'),
  //       name: 'EditArticle',
  //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
  //       hidden: true
  //     },
  //     {
  //       path: 'list',
  //       component: () => import('@/views/example/list'),
  //       name: 'ArticleList',
  //       meta: { title: 'Article List', icon: 'list' }
  //     }
  //   ]
  // },

  // {
  //   path: '/tab',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/tab/index'),
  //       name: 'Tab',
  //       meta: { title: 'Tab', icon: 'tab' }
  //     }
  //   ]
  // },

  // {
  //   path: '/error',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ErrorPages',
  //   meta: {
  //     title: 'Error Pages',
  //     icon: '404'
  //   },
  //   children: [
  //     {
  //       path: '401',
  //       component: () => import('@/views/error-page/401'),
  //       name: 'Page401',
  //       meta: { title: '401', noCache: true }
  //     },
  //     {
  //       path: '404',
  //       component: () => import('@/views/error-page/404'),
  //       name: 'Page404',
  //       meta: { title: '404', noCache: true }
  //     }
  //   ]
  // },

  // {
  //   path: '/error-log',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'log',
  //       component: () => import('@/views/error-log/index'),
  //       name: 'ErrorLog',
  //       meta: { title: 'Error Log', icon: 'bug' }
  //     }
  //   ]
  // },

  // {
  //   path: '/excel',
  //   component: Layout,
  //   redirect: '/excel/export-excel',
  //   name: 'Excel',
  //   meta: {
  //     title: 'Excel',
  //     icon: 'excel'
  //   },
  //   children: [
  //     {
  //       path: 'export-excel',
  //       component: () => import('@/views/excel/export-excel'),
  //       name: 'ExportExcel',
  //       meta: { title: 'Export Excel' }
  //     },
  //     {
  //       path: 'export-selected-excel',
  //       component: () => import('@/views/excel/select-excel'),
  //       name: 'SelectExcel',
  //       meta: { title: 'Export Selected' }
  //     },
  //     {
  //       path: 'export-merge-header',
  //       component: () => import('@/views/excel/merge-header'),
  //       name: 'MergeHeader',
  //       meta: { title: 'Merge Header' }
  //     },
  //     {
  //       path: 'upload-excel',
  //       component: () => import('@/views/excel/upload-excel'),
  //       name: 'UploadExcel',
  //       meta: { title: 'Upload Excel' }
  //     }
  //   ]
  // },

  // {
  //   path: '/zip',
  //   component: Layout,
  //   redirect: '/zip/download',
  //   alwaysShow: true,
  //   name: 'Zip',
  //   meta: { title: 'Zip', icon: 'zip' },
  //   children: [
  //     {
  //       path: 'download',
  //       component: () => import('@/views/zip/index'),
  //       name: 'ExportZip',
  //       meta: { title: 'Export Zip' }
  //     }
  //   ]
  // },

  // {
  //   path: '/pdf',
  //   component: Layout,
  //   redirect: '/pdf/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/pdf/index'),
  //       name: 'PDF',
  //       meta: { title: 'PDF', icon: 'pdf' }
  //     }
  //   ]
  // },
  // {
  //   path: '/pdf/download',
  //   component: () => import('@/views/pdf/download'),
  //   hidden: true
  // },

  // {
  //   path: '/theme',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/theme/index'),
  //       name: 'Theme',
  //       meta: { title: 'Theme', icon: 'theme' }
  //     }
  //   ]
  // },

  // {
  //   path: '/clipboard',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/clipboard/index'),
  //       name: 'ClipboardDemo',
  //       meta: { title: 'Clipboard', icon: 'clipboard' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://github.com/PanJiaChen/vue-element-admin',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // // 404 page must be placed at the end !!!
  // { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
    // routes: asyncRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

export default router;
