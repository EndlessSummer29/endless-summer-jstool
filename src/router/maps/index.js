/** When your routing table is too long, you can split it into small modules **/
import mapsearch from './mapsearch/index.js'
import maputils from './maputils/index.js'
import Layout from '@/layout'

const maps = {
  path: '/map',
  component: Layout,
  redirect: '/map/mapsearch/route',
  name: 'Map',
  meta: {
    title: '地图',
    icon: 'nested'
  },
  children: [
    mapsearch,
    maputils,
    // {
    //   path: 'menu2',
    //   name: 'Menu2',
    //   component: () => import('@/views/nested/menu2/index'),
    //   meta: { title: 'Menu 2' }
    // }
  ]
}

export default maps
