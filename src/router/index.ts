import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home/Home.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/views/Layout/Layout.vue'),
    children: [
      // {
      //   path: '/periodos',
      //   name: 'Periods',
      //   component: () => import('@/views/Periods/Periods.vue')
      // },
      {
        path: '/clientes',
        name: 'Customers',
        component: () => import('@/views/Customers/Customers/Customers.vue'),
        meta: {
          module: 'customers'
        }
      },
      {
        path: '/registrar-cliente',
        name: 'RegisterCustomer',
        component: () => import('@/views/Customers/RegisterCustomer/RegisterCustomer.vue'),
        meta: {
          module: 'customers'
        }
      },
      {
        path: '/editar-cliente/:id',
        name: 'EditCustomer',
        component: () => import('@/views/Customers/EditCustomer/EditCustomer.vue'),
        meta: {
          module: 'customers'
        }
      },
      {
        path: '/compras',
        name: 'Purchases',
        component: () => import('@/views/Purchases/Purchases/Purchases.vue'),
        meta: {
          module: 'purchases'
        }
      },
      {
        path: '/registrar-compra',
        name: 'RegisterPurchase',
        component: () => import('@/views/Purchases/RegisterPurchase/RegisterPurchase.vue'),
        meta: {
          module: 'purchases'
        }
      },
      {
        path: '/editar-compra/:id',
        name: 'EditPurchase',
        component: () => import('@/views/Purchases/EditPurchase/EditPurchase.vue'),
        meta: {
          module: 'purchases'
        }
      },
      {
        path: '/ventas',
        name: 'Sales',
        component: () => import('@/views/Sales/Sales/Sales.vue'),
        meta: {
          module: 'saleRecords'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition): any {
    return { left: 0, top: 0}
  } 
})

export default router
