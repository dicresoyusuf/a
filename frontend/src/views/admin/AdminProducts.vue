<template>
  <div>
    <div class="admin-header">
      <h1 class="admin-title">Products</h1>
      <button @click="openModal()" class="btn btn-primary">+ Add Product</button>
    </div>
    <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-error']">{{ message }}</div>
    
    <div class="admin-card">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td><strong>{{ product.title }}</strong></td>
            <td>{{ product.category }}</td>
            <td>{{ product.is_featured ? '⭐ Yes' : 'No' }}</td>
            <td class="admin-actions">
              <button @click="openModal(product)" class="btn btn-sm btn-outline">Edit</button>
              <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="showModal" style="position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div class="admin-card" style="width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
        <h3>{{ editingProduct.id ? 'Edit Product' : 'Add Product' }}</h3>
        <div class="form-group"><label>Title</label><input v-model="editingProduct.title" type="text"></div>
        <div class="form-group"><label>Category</label><input v-model="editingProduct.category" type="text"></div>
        <div class="form-group">
          <label>Image URL</label>
          <input v-model="editingProduct.image_url" type="text" placeholder="https://...">
          <small style="color: grey;">Enter direct image link</small>
        </div>
        <div class="form-group"><label>Description</label><textarea v-model="editingProduct.description" rows="3"></textarea></div>
        <div class="form-group"><label>Features (one per line)</label><textarea v-model="featuresText" rows="3"></textarea></div>
        <div class="form-row">
          <div class="form-group"><label>Badge Text (optional)</label><input v-model="editingProduct.badge_text" type="text"></div>
          <div class="form-group"><label>Sort Order</label><input v-model.number="editingProduct.sort_order" type="number"></div>
        </div>
        <div class="form-group">
          <label><input type="checkbox" v-model="editingProduct.is_featured"> Featured Product</label>
        </div>
        <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
          <button @click="saveProduct" class="btn btn-primary" :disabled="saving">{{ saving ? 'Saving...' : 'Save' }}</button>
          <button @click="showModal = false" class="btn btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'

const products = ref([])
const showModal = ref(false)
const editingProduct = ref({})
const saving = ref(false)
const message = ref('')
const success = ref(false)

const featuresText = computed({
  get: () => Array.isArray(editingProduct.value.features) ? editingProduct.value.features.join('\n') : '',
  set: (val) => editingProduct.value.features = val.split('\n').filter(f => f.trim())
})

const loadProducts = async () => {
  const { data } = await api.get('/content/products')
  products.value = data
}

const openModal = (product = null) => {
  editingProduct.value = product ? { ...product } : { title: '', category: '', image_url: '', description: '', features: [], badge_text: '', is_featured: false, sort_order: 0 }
  showModal.value = true
}

const saveProduct = async () => {
  saving.value = true
  try {
    if (editingProduct.value.id) {
      await api.put(`/content/products/${editingProduct.value.id}`, editingProduct.value)
    } else {
      await api.post('/content/products', editingProduct.value)
    }
    success.value = true
    message.value = 'Product saved!'
    showModal.value = false
    loadProducts()
  } catch {
    success.value = false
    message.value = 'Failed to save product.'
  }
  saving.value = false
}

const deleteProduct = async (id) => {
  if (!confirm('Delete this product?')) return
  try {
    await api.delete(`/content/products/${id}`)
    loadProducts()
  } catch {}
}

onMounted(loadProducts)
</script>
