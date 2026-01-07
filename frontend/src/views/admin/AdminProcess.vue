<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Process Steps</h1>
      <button @click="openModal()" class="btn btn-primary">+ Add Step</button>
    </div>
    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>
    
    <div class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Step</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="step in steps" :key="step.id">
            <td><strong style="color: var(--color-primary);">{{ step.step_number }}</strong></td>
            <td>{{ step.title }}</td>
            <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">{{ step.description }}</td>
            <td class="admin-actions">
              <button @click="openModal(step)" class="btn btn-sm btn-outline">Edit</button>
              <button @click="deleteStep(step.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div class="admin-card" style="width: 100%; max-width: 500px;">
        <h3>{{ editingStep.id ? 'Edit Step' : 'Add Step' }}</h3>
        <div class="form-row">
          <div class="form-group"><label>Step Number</label><input v-model="editingStep.step_number" type="text" placeholder="01"></div>
          <div class="form-group"><label>Sort Order</label><input v-model.number="editingStep.sort_order" type="number"></div>
        </div>
        <div class="form-group"><label>Title</label><input v-model="editingStep.title" type="text"></div>
        <div class="form-group"><label>Description</label><textarea v-model="editingStep.description" rows="3"></textarea></div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button @click="saveStep" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
          <button @click="showModal = false" class="btn btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const steps = ref([])
const showModal = ref(false)
const editingStep = ref({})
const saving = ref(false)
const message = ref('')
const success = ref(false)

const loadSteps = async () => {
  const { data } = await api.get('/content/process')
  steps.value = data
}

const openModal = (step = null) => {
  editingStep.value = step ? { ...step } : { step_number: '', title: '', description: '', sort_order: 0 }
  showModal.value = true
}

const saveStep = async () => {
  saving.value = true
  try {
    if (editingStep.value.id) {
      await api.put(`/content/process/${editingStep.value.id}`, editingStep.value)
    } else {
      await api.post('/content/process', editingStep.value)
    }
    success.value = true
    message.value = 'Step saved!'
    showModal.value = false
    loadSteps()
  } catch {
    success.value = false
    message.value = 'Failed to save.'
  }
  saving.value = false
}

const deleteStep = async (id) => {
  if (!confirm('Delete this step?')) return
  try {
    await api.delete(`/content/process/${id}`)
    loadSteps()
  } catch {}
}

onMounted(loadSteps)
</script>
