import { createRouter, createWebHistory } from 'vue-router'

import CounterPageOne from '@/counter/pages/CounterPageOne.vue'
import CounterPageTwo from '@/counter/pages/CounterPageTwo.vue'

import ClientsLayout from '@/clients/layout/ClientsLayout.vue'
import ListPage from '@/clients/pages/ListPage.vue'
import ClientPage from '@/clients/pages/ClientPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'counter-1',
      component: CounterPageOne
    },
    {
      path: '/counter-2',
      name: 'counter-2',
      component: CounterPageTwo
    },
    {
      path: '/clients',
      name: 'clients',
      component: ClientsLayout,
      redirect: { name: 'list' },
      children: [
        {
          path: 'list',
          name: 'list',
          component: ListPage
        },
        {
          path: ':id',
          name: 'client',
          component: ClientPage
        }
      ]
    }
  ]
})

export default router
