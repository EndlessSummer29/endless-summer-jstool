import Layout from '@/layout'
const live2d = {
  path: '/live2d',
  component: Layout,
  redirect: '/live2d/destinychild',
  name: 'Live2d',
  meta: {
    title: 'Live2d',
    icon: 'nested'
  },
  children: [
    {
      path: 'destinychild',
      name: 'DestinyChild',
      component: () => import('@/views/live2d/destinychild/destinychild.vue'),
      meta: { title: '天命之子' }
    }
  ]
}

export default live2d
