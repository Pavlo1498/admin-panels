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
        name: 'create',
        component: () => import('pages/admin/AdminCreateNeuron.vue')
      },
      {
        path: 'lists',
        name: 'lists',
        component: () => import('pages/admin/AdminListsNeuron.vue')
      },
      {
        path: 'edit-neuron',
        name: 'edit-neuron',
        component: () => import('pages/admin/AdminEditNeuron.vue')
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
