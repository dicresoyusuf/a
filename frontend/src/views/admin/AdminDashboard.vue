<template>
  <div class="admin-layout">
    <aside class="admin-sidebar">
      <div class="admin-sidebar-header">
        <h2>ILW Admin</h2>
        <p>Content Management</p>
      </div>
      <nav class="admin-nav">
        <router-link to="/admin/hero" class="admin-nav-item" :class="{ active: $route.path === '/admin/hero' }">
          🏠 Hero Section
        </router-link>
        <router-link to="/admin/about" class="admin-nav-item" :class="{ active: $route.path === '/admin/about' }">
          📖 About
        </router-link>
        <router-link to="/admin/products" class="admin-nav-item" :class="{ active: $route.path === '/admin/products' }">
          🛍️ Products
        </router-link>
        <router-link to="/admin/process" class="admin-nav-item" :class="{ active: $route.path === '/admin/process' }">
          ⚙️ Process Steps
        </router-link>
        <router-link to="/admin/contact" class="admin-nav-item" :class="{ active: $route.path === '/admin/contact' }">
          📞 Contact Info
        </router-link>
        <router-link to="/admin/submissions" class="admin-nav-item" :class="{ active: $route.path === '/admin/submissions' }">
          📬 Submissions
          <span v-if="unreadCount > 0" style="background: var(--color-error); color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7rem; margin-left: auto;">{{ unreadCount }}</span>
        </router-link>
      </nav>
      <div style="padding: 1rem; margin-top: auto; border-top: 1px solid var(--color-border);">
        <p style="font-size: 0.8rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">{{ user?.email }}</p>
        <button @click="handleLogout" class="btn btn-outline btn-sm" style="width: 100%;">Logout</button>
      </div>
    </aside>
    <main class="admin-main">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import api from '../../services/api'

const router = useRouter()
const authStore = useAuthStore()

const user = computed(() => authStore.user)
const unreadCount = ref(0)

const handleLogout = () => {
  authStore.logout()
  router.push('/admin/login')
}

const loadUnreadCount = async () => {
  try {
    const { data } = await api.get('/content/submissions')
    unreadCount.value = data.filter(s => !s.is_read).length
  } catch {}
}

onMounted(() => {
  loadUnreadCount()
})
</script>
