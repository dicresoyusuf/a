import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Public views
import HomePage from '../views/HomePage.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetailPage from '../views/ProductDetailPage.vue'
import AboutPage from '../views/AboutPage.vue'
import ContactPage from '../views/ContactPage.vue'
import CareerPage from '../views/CareerPage.vue'

// Admin views
import AdminLogin from '../views/admin/AdminLogin.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminHero from '../views/admin/AdminHero.vue'
import AdminAbout from '../views/admin/AdminAbout.vue'
import AdminProducts from '../views/admin/AdminProducts.vue'
import AdminProcess from '../views/admin/AdminProcess.vue'
import AdminContact from '../views/admin/AdminContact.vue'
import AdminSubmissions from '../views/admin/AdminSubmissions.vue'

const routes = [
    // Public routes
    { path: '/', name: 'Home', component: HomePage },
    { path: '/products', name: 'Products', component: ProductsPage },
    { path: '/products/:id', name: 'ProductDetail', component: ProductDetailPage },
    { path: '/about', name: 'About', component: AboutPage },
    { path: '/contact', name: 'Contact', component: ContactPage },
    { path: '/career', name: 'Career', component: CareerPage },

    // Admin routes
    { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
    {
        path: '/admin',
        name: 'Admin',
        component: AdminDashboard,
        meta: { requiresAuth: true },
        children: [
            { path: '', redirect: '/admin/hero' },
            { path: 'hero', name: 'AdminHero', component: AdminHero },
            { path: 'about', name: 'AdminAbout', component: AdminAbout },
            { path: 'products', name: 'AdminProducts', component: AdminProducts },
            { path: 'process', name: 'AdminProcess', component: AdminProcess },
            { path: 'contact', name: 'AdminContact', component: AdminContact },
            { path: 'submissions', name: 'AdminSubmissions', component: AdminSubmissions },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) return { el: to.hash, behavior: 'smooth' }
        if (savedPosition) return savedPosition
        return { top: 0 }
    }
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next({ name: 'AdminLogin', query: { redirect: to.fullPath } })
    } else {
        next()
    }
})

export default router
