import Layout from '@/layout'
const animatecss = {
  path: '/animatecss',
  component: Layout,
  redirect: '/animatecss/wave',
  name: 'AnimateCss',
  meta: {
    title: '动画',
    icon: 'nested'
  },
  children: [
    {
      path: 'wave',
      name: 'Wave',
      component: () => import('@/views/animate-css/wave.vue'),
      meta: { title: '波纹' }
    }
  ]
}

export default animatecss
