<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Contact Information</h1>
      <button @click="saveContact" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
    </div>
    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>
    
    <div class="admin-card">
      <h3>Contact Details</h3>
      <div class="form-group"><label>Address</label><input v-model="contact.address" type="text"></div>
      <div class="form-row">
        <div class="form-group"><label>Email</label><input v-model="contact.email" type="email"></div>
        <div class="form-group"><label>Phone</label><input v-model="contact.phone" type="text"></div>
      </div>
      <div class="form-group"><label>WhatsApp</label><input v-model="contact.whatsapp" type="text"></div>
    </div>

    <div class="admin-card">
      <h3>Social Media</h3>
      <div class="form-row">
        <div class="form-group"><label>Instagram Handle</label><input v-model="contact.instagram" type="text" placeholder="@username"></div>
        <div class="form-group"><label>LinkedIn</label><input v-model="contact.linkedin" type="text"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const contact = ref({})
const saving = ref(false)
const message = ref('')
const success = ref(false)

const loadContact = async () => {
  const { data } = await api.get('/content/contact-info')
  contact.value = data
}

const saveContact = async () => {
  saving.value = true
  message.value = ''
  try {
    await api.put('/content/contact-info', contact.value)
    success.value = true
    message.value = 'Contact info updated!'
  } catch {
    success.value = false
    message.value = 'Failed to save.'
  }
  saving.value = false
}

onMounted(loadContact)
</script>
