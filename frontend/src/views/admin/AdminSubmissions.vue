<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Contact Submissions</h1>
      <span style="color: var(--color-text-muted);">{{ submissions.length }} total, {{ unreadCount }} unread</span>
    </div>
    
    <div class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Email</th>
            <th>Interest</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="sub in submissions" :key="sub.id" :style="{ background: sub.is_read ? '' : 'rgba(201, 169, 98, 0.05)' }">
            <td>{{ formatDate(sub.created_at) }}</td>
            <td>
              <strong>{{ sub.name }}</strong>
              <span v-if="!sub.is_read" style="background: var(--color-primary); color: #000; padding: 2px 6px; border-radius: 4px; font-size: 0.6rem; margin-left: 0.5rem;">NEW</span>
            </td>
            <td>{{ sub.email }}</td>
            <td>{{ sub.interest }}</td>
            <td class="admin-actions">
              <button @click="viewSubmission(sub)" class="btn btn-sm btn-primary">View</button>
              <button @click="deleteSubmission(sub.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr v-if="submissions.length === 0">
            <td colspan="5" style="text-align: center; color: var(--color-text-muted);">No submissions yet</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- View Modal -->
    <div v-if="viewing" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div class="admin-card" style="width: 100%; max-width: 600px;">
        <h3>Message from {{ viewing.name }}</h3>
        <div style="margin: 1.5rem 0;">
          <p><strong>Email:</strong> {{ viewing.email }}</p>
          <p><strong>Phone:</strong> {{ viewing.phone || 'N/A' }}</p>
          <p><strong>Company:</strong> {{ viewing.company || 'N/A' }}</p>
          <p><strong>Interest:</strong> {{ viewing.interest }}</p>
          <p><strong>Date:</strong> {{ formatDate(viewing.created_at) }}</p>
        </div>
        <div style="background: var(--color-bg-dark); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
          <strong>Message:</strong><br>
          <p style="white-space: pre-wrap; margin-top: 0.5rem;">{{ viewing.message }}</p>
        </div>
        <button @click="viewing = null" class="btn btn-outline">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'

const submissions = ref([])
const viewing = ref(null)

const unreadCount = computed(() => submissions.value.filter(s => !s.is_read).length)

const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

const loadSubmissions = async () => {
  const { data } = await api.get('/content/submissions')
  submissions.value = data
}

const viewSubmission = async (sub) => {
  viewing.value = sub
  if (!sub.is_read) {
    await api.put(`/content/submissions/${sub.id}/read`)
    sub.is_read = 1
  }
}

const deleteSubmission = async (id) => {
  if (!confirm('Delete this submission?')) return
  await api.delete(`/content/submissions/${id}`)
  loadSubmissions()
}

onMounted(loadSubmissions)
</script>
