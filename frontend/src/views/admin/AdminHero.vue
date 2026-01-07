<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Hero Section</h1>
      <button @click="saveHero" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
    </div>
    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>
    
    <div class="admin-card">
      <h3>Hero Text</h3>
      <div class="form-group"><label>Subtitle</label><input v-model="hero.subtitle" type="text"></div>
      <div class="form-row">
        <div class="form-group"><label>Title Line 1</label><input v-model="hero.title_line1" type="text"></div>
        <div class="form-group"><label>Title Line 2 (italic)</label><input v-model="hero.title_line2" type="text"></div>
      </div>
      <div class="form-group"><label>Description</label><textarea v-model="hero.description" rows="3"></textarea></div>
    </div>

    <div class="admin-card">
      <h3>Buttons</h3>
      <div class="form-row">
        <div class="form-group"><label>Primary Button Text</label><input v-model="hero.btn_primary_text" type="text"></div>
        <div class="form-group"><label>Secondary Button Text</label><input v-model="hero.btn_secondary_text" type="text"></div>
      </div>
    </div>

    <div class="admin-card">
      <h3>Statistics</h3>
      <div class="form-row">
        <div class="form-group"><label>Stat 1 Number</label><input v-model="hero.stat1_number" type="text"></div>
        <div class="form-group"><label>Stat 1 Label</label><input v-model="hero.stat1_label" type="text"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Stat 2 Number</label><input v-model="hero.stat2_number" type="text"></div>
        <div class="form-group"><label>Stat 2 Label</label><input v-model="hero.stat2_label" type="text"></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label>Stat 3 Number</label><input v-model="hero.stat3_number" type="text"></div>
        <div class="form-group"><label>Stat 3 Label</label><input v-model="hero.stat3_label" type="text"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const hero = ref({})
const saving = ref(false)
const message = ref('')
const success = ref(false)

const loadHero = async () => {
  const { data } = await api.get('/content/hero')
  hero.value = data
}

const saveHero = async () => {
  saving.value = true
  message.value = ''
  try {
    await api.put('/content/hero', hero.value)
    success.value = true
    message.value = 'Hero section updated successfully!'
  } catch (err) {
    success.value = false
    message.value = 'Failed to save changes.'
  }
  saving.value = false
}

onMounted(loadHero)
</script>
