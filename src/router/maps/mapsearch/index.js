/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const mapsearch = {
  path: 'mapsearch',
  component: () => import('@/views/maps/mapsearch/index.vue'), // Parent router-view
  name: 'Mapsearch',
  meta: { title: '地图查找功能' },
  redirect: '/map/mapsearch/route',
  children: [
    {
      path: 'route',
      component: () => import('@/views/maps/mapsearch/route/index.vue'),
      name: 'Route',
      meta: { title: '路线规划' },
      // children: [
      //   {
      //     path: 'menu1-2-1',
      //     component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
      //     name: 'Menu1-2-1',
      //     meta: { title: 'Menu 1-2-1' }
      //   },
      // ]
    },
    // {
    //   path: 'menu1-2',
    //   component: () => import('@/views/nested/menu1/menu1-2'),
    //   name: 'Menu1-2',
    //   redirect: '/nested/menu1/menu1-2/menu1-2-1',
    //   meta: { title: 'Menu 1-2' },
    //   children: [
    //     {
    //       path: 'menu1-2-1',
    //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //       name: 'Menu1-2-1',
    //       meta: { title: 'Menu 1-2-1' }
    //     },
    //     {
    //       path: 'menu1-2-2',
    //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
    //       name: 'Menu1-2-2',
    //       meta: { title: 'Menu 1-2-2' }
    //     }
    //   ]
    // },
    // {
    //   path: 'menu1-3',
    //   component: () => import('@/views/nested/menu1/menu1-3'),
    //   name: 'Menu1-3',
    //   meta: { title: 'Menu 1-3' }
    // }
  ]
}

export default mapsearch
