/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const maputils = {
  path: 'maputils',
  component: () => import('@/views/maps/maputils/index.vue'), // Parent router-view
  name: 'Maputils',
  meta: { title: '地图工具' },
  redirect: '/map/maputils/getlonlat',
  children: [
    {
      path: 'getlonlat',
      component: () => import('@/views/maps/maputils/getlonlat/index.vue'),
      name: 'Getlonlat',
      meta: { title: '坐标拾取' },
    //   children: [
    //     {
    //       path: 'menu1-2-1',
    //       component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
    //       name: 'Menu1-2-1',
    //       meta: { title: 'Menu 1-2-1' }
    //     },
    //   ]
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

export default maputils
