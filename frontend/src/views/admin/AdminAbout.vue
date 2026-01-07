<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">About Section Management</h1>
    </div>
    
    <!-- Custom Tabs -->
    <div class="admin-tabs">
      <button :class="['tab-btn', { active: activeTab === 'main' }]" @click="activeTab = 'main'">Main Page Content</button>
      <button :class="['tab-btn', { active: activeTab === 'subpages' }]" @click="activeTab = 'subpages'">Sub Pages (Menu)</button>
    </div>

    <!-- MAIN PAGE CONTENT TAB -->
    <div v-if="activeTab === 'main'">
      <div class="admin-top-actions">
        <h3>Homepage "About Us" Section</h3>
        <button @click="saveAbout" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save Changes' }}</button>
      </div>
      <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>
      
      <div class="admin-card">
        <h3>Text Content</h3>
        <div class="form-row">
          <div class="form-group"><label>Subtitle</label><input v-model="about.subtitle" type="text" class="form-control"></div>
          <div class="form-group"><label>Title</label><input v-model="about.title" type="text" class="form-control"></div>
        </div>
        <div class="form-group"><label>Paragraph 1</label><textarea v-model="about.paragraph1" rows="3" class="form-control"></textarea></div>
        <div class="form-group"><label>Paragraph 2</label><textarea v-model="about.paragraph2" rows="3" class="form-control"></textarea></div>
        <div class="form-group"><label>Paragraph 3</label><textarea v-model="about.paragraph3" rows="3" class="form-control"></textarea></div>
      </div>

      <div class="admin-card">
        <h3>Experience Badge</h3>
        <div class="form-row">
          <div class="form-group"><label>Years (e.g. 15+)</label><input v-model="about.experience_years" type="text" class="form-control"></div>
          <div class="form-group"><label>Text</label><input v-model="about.experience_text" type="text" class="form-control"></div>
        </div>
      </div>

      <div class="admin-card">
        <h3>Features Grid</h3>
        <div class="form-row">
          <div class="form-group"><label>Feature 1 Title</label><input v-model="about.feature1_title" type="text" class="form-control"></div>
          <div class="form-group"><label>Feature 1 Desc</label><input v-model="about.feature1_desc" type="text" class="form-control"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Feature 2 Title</label><input v-model="about.feature2_title" type="text" class="form-control"></div>
          <div class="form-group"><label>Feature 2 Desc</label><input v-model="about.feature2_desc" type="text" class="form-control"></div>
        </div>
        <div class="form-row">
          <div class="form-group"><label>Feature 3 Title</label><input v-model="about.feature3_title" type="text" class="form-control"></div>
          <div class="form-group"><label>Feature 3 Desc</label><input v-model="about.feature3_desc" type="text" class="form-control"></div>
        </div>
      </div>
    </div>

    <!-- SUB PAGES TAB -->
    <div v-if="activeTab === 'subpages'">
      <div class="subpage-layout">
        <!-- List Sidebar -->
        <div class="subpage-list">
          <h3>Pages List</h3>
          <div v-for="page in pages" :key="page.id" 
               @click="selectPage(page)"
               :class="['page-item', { active: selectedPage?.id === page.id }]">
            {{ page.title }}
          </div>
        </div>

        <!-- Editor Area -->
        <div class="subpage-editor" v-if="selectedPage">
          <div class="editor-header">
            <h3>Editing: {{ selectedPage.title }}</h3>
            <button @click="saveSubPage" class="btn btn-primary" :disabled="savingPage">{{ savingPage ? 'Saving...' : 'Save Page' }}</button>
          </div>
          <div v-if="pageMessage" :class="['alert', pageSuccess ? 'alert-success' : 'alert-error']">{{ pageMessage }}</div>

          <div class="admin-card">
             <div class="form-group">
              <label>Page Title</label>
              <input v-model="selectedPage.title" type="text" class="form-control">
            </div>
             <div class="form-group">
              <label>Image URL</label>
              <input v-model="selectedPage.image_url" type="text" class="form-control">
              <small>Use a direct image link.</small>
              <div v-if="selectedPage.image_url" class="img-preview mb-2">
                <img :src="selectedPage.image_url" style="max-height: 100px; border-radius: 4px; margin-top: 10px;">
              </div>
            </div>
            <div class="form-group">
              <label>Content</label>
              <textarea v-model="selectedPage.content" rows="12" class="form-control"></textarea>
            </div>
          </div>
        </div>
        
        <div v-else class="subpage-placeholder">
          <p>Select a page from the list to edit its content.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

// General State
const activeTab = ref('main')
const saving = ref(false)
const message = ref('')
const success = ref(false)

// Main About Data
const about = ref({})

// Sub Pages Data
const pages = ref([])
const selectedPage = ref(null)
const cols = ref(false)
const savingPage = ref(false)
const pageMessage = ref('')
const pageSuccess = ref(false)

// Load Main About Content
const loadAbout = async () => {
  try {
    const { data } = await api.get('/content/about')
    about.value = data
  } catch (e) { console.error(e) }
}

// Save Main About Content
const saveAbout = async () => {
  saving.value = true
  message.value = ''
  try {
    await api.put('/content/about', about.value)
    success.value = true
    message.value = 'Homepage About section updated!'
  } catch {
    success.value = false
    message.value = 'Failed to save changes.'
  }
  saving.value = false
}

// Load Sub Pages
const loadPages = async () => {
  try {
    const { data } = await api.get('/content/about-pages')
    pages.value = data
  } catch (e) { console.error(e) }
}

// Select Page
const selectPage = (page) => {
  // Clone to avoid direct mutation of list before save
  selectedPage.value = { ...page }
  pageMessage.value = ''
}

// Save Sub Page Content
const saveSubPage = async () => {
  if (!selectedPage.value) return
  savingPage.value = true
  pageMessage.value = ''
  try {
    await api.put(`/content/about-pages/${selectedPage.value.id}`, selectedPage.value)
    pageSuccess.value = true
    pageMessage.value = 'Page updated successfully!'
    // Reload list to reflect changes in sidebar title if changed
    await loadPages() 
  } catch {
    pageSuccess.value = false
    pageMessage.value = 'Failed to update page.'
  }
  savingPage.value = false
}

onMounted(() => {
  loadAbout()
  loadPages()
})
</script>

<style scoped>
.admin-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.tab-btn {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  font-size: 1rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.tab-btn.active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: bold;
}

.admin-top-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.subpage-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.subpage-list {
  background: var(--color-bg-card);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  height: fit-content;
}

.subpage-list h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
}

.page-item {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 0.25rem;
  transition: background 0.2s;
}

.page-item:hover {
  background: rgba(255,255,255,0.05);
}

.page-item.active {
  background: var(--color-primary);
  color: #000;
  font-weight: 600;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.subpage-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-card);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  min-height: 300px;
  color: var(--color-text-muted);
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: white;
  margin-top: 0.25rem;
}

.form-control:focus {
  border-color: var(--color-primary);
  outline: none;
}
</style>
