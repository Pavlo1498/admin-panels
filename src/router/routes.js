const routes = [
  {
    path: '/',
    component: () => import('pages/AdminPages.vue'),
    redirect: {
        path: 'lists'
    },
    children: [
      {
        path: 'create',
        component: () => import('pages/admin/AdminCreateNeuron.vue')
      },
      {
        path: 'lists',
        component: () => import('pages/admin/AdminListsNeuron.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
];

export default routes;
