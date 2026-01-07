import { defineStore } from 'pinia'
import api from '../services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: JSON.parse(localStorage.getItem('ilw_user') || 'null'),
        token: localStorage.getItem('ilw_token') || null
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async login(email, password) {
            try {
                const { data } = await api.post('/auth/login', { email, password })
                this.token = data.token
                this.user = data.user
                localStorage.setItem('ilw_token', data.token)
                localStorage.setItem('ilw_user', JSON.stringify(data.user))
                return { success: true }
            } catch (error) {
                return { success: false, error: error.response?.data?.error || 'Login failed' }
            }
        },

        logout() {
            this.token = null
            this.user = null
            localStorage.removeItem('ilw_token')
            localStorage.removeItem('ilw_user')
        },

        async checkAuth() {
            if (!this.token) return false
            try {
                const { data } = await api.get('/auth/me')
                this.user = data
                return true
            } catch {
                this.logout()
                return false
            }
        }
    }
})
