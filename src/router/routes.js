
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('components/auth/ForgotPassword.vue')
  },
  {
    path: '/no-internet',
    name: 'no-internet',
    component: () => import('pages/NoInternet.vue')
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    name: 'not-found',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
