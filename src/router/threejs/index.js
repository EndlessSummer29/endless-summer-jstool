import Layout from '@/layout'
const threejs = {
  path: '/threejs',
  component: Layout,
  redirect: '/threejs/gltf',
  name: 'ThreeJs',
  meta: {
    title: 'ThreeJs',
    icon: 'nested'
  },
  children: [
    {
      path: 'gltf',
      name: 'Gltf',
      component: () => import('@/views/threejs/loaders/gltf.vue'),
      meta: { title: 'GLTF加载' }
    },
    {
      path: 'butterfly',
      name: 'Butterfly',
      component: () => import('@/views/threejs/butterfly/butterfly.vue'),
      meta: { title: '蝴蝶' }
    },
  ]
}

export default threejs
