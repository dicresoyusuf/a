<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h1>Admin Panel</h1>
        <p>International Leather Works CMS</p>
      </div>
      <div v-if="error" class="alert alert-error">{{ error }}</div>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="admin@ilw.com" required>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Enter password" required>
        </div>
        <button type="submit" class="btn btn-primary btn-full" :disabled="loading">
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </form>
      <p style="text-align: center; margin-top: 2rem; color: var(--color-text-muted); font-size: 0.8rem;">
        <router-link to="/" style="color: var(--color-primary);">← Back to Website</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const result = await authStore.login(email.value, password.value)
  
  if (result.success) {
    const redirect = route.query.redirect || '/admin'
    router.push(redirect)
  } else {
    error.value = result.error
  }
  
  loading.value = false
}
</script>
