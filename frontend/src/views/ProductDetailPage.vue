<template>
  <div class="product-detail-page">
    <!-- Header -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <nav class="nav container">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">International</span>
          <span class="logo-accent">Leather Works</span>
        </router-link>
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/products" class="nav-link active">Products</router-link></li>
          <li><router-link to="/about" class="nav-link">About Us</router-link></li>
          <li><router-link to="/contact" class="nav-link">Contact</router-link></li>
        </ul>
        <div class="nav-actions">
          <router-link to="/contact" class="btn btn-primary">Get Quote</router-link>
        </div>
      </nav>
    </header>

    <div v-if="loading" class="loading-screen">
      <div class="loader"></div>
    </div>

    <div v-else-if="product" class="product-detail-container section">
      <div class="container">
        <!-- Breadcrumb -->
        <div class="breadcrumb">
          <router-link to="/products">Products</router-link>
          <span class="separator">/</span>
          <span class="current">{{ product.title }}</span>
        </div>

        <div class="product-layout">
          <!-- Image Section -->
          <div class="product-image-section">
            <div class="product-image-wrapper">
              <img v-if="product.image_url" :src="product.image_url" :alt="product.title" class="main-image">
              <div v-else class="image-placeholder">No Image Available</div>
              <div v-if="product.badge_text" class="product-badge">{{ product.badge_text }}</div>
            </div>
          </div>

          <!-- Info Section -->
          <div class="product-info-section">
            <span class="product-category">{{ product.category }}</span>
            <h1 class="product-title">{{ product.title }}</h1>
            
            <div class="product-divider"></div>

            <p class="product-description">{{ product.description }}</p>

            <div class="product-features" v-if="product.features && product.features.length">
              <h3>Specifications</h3>
              <ul class="feature-list">
                <li v-for="(feature, index) in product.features" :key="index">
                  <span class="feature-bullet">◈</span>
                  {{ feature }}
                </li>
              </ul>
            </div>

            <div class="product-actions">
              <router-link :to="{ path: '/contact', query: { interest: product.title } }" class="btn btn-primary btn-lg btn-full">
                Inquire This Product
              </router-link>
              <router-link to="/products" class="btn btn-outline btn-lg btn-full">
                Back to Catalog
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="error-state section">
        <div class="container">
            <h2>Product Not Found</h2>
            <router-link to="/products" class="btn btn-primary">Return to Catalog</router-link>
        </div>
    </div>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import TheFooter from '../components/TheFooter.vue'

const route = useRoute()
const product = ref(null)
const loading = ref(true)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const loadProduct = async () => {
    try {
        const { data } = await api.get(`/content/products/${route.params.id}`)
        product.value = data
    } catch (err) {
        console.error('Failed to load product', err)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadProduct()
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.product-detail-page {
  background: var(--color-bg-dark);
  min-height: 100vh;
}

.product-detail-container {
  padding-top: 150px;
  min-height: 80vh;
}

.breadcrumb {
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--color-text-muted);
  text-decoration: none;
  transition: color 0.3s;
}

.breadcrumb a:hover {
  color: var(--color-primary);
}

.breadcrumb .separator {
  margin: 0 0.5rem;
  color: var(--color-text-muted);
}

.breadcrumb .current {
  color: var(--color-primary);
}

.product-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.product-image-wrapper {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  box-shadow: 0 20px 40px rgba(0,0,0,0.5);
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-placeholder {
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(135deg, #1a1510 0%, #2a2015 50%, #1a1510 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}

.product-badge {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: var(--color-primary);
  color: #000;
  padding: 0.5rem 1rem;
  font-weight: 700;
  border-radius: 4px;
  text-transform: uppercase;
  font-size: 0.8rem;
  letter-spacing: 1px;
}

.product-info-section {
  padding: 1rem 0;
}

.product-category {
  display: block;
  font-family: var(--font-display);
  color: var(--color-primary);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  opacity: 0.8;
}

.product-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #fff, #bbb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.product-divider {
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin-bottom: 2rem;
}

.product-description {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 3rem;
}

.product-features h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #fff;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: 3rem;
}

.feature-list li {
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.feature-list li:last-child {
  border-bottom: none;
}

.feature-bullet {
  color: var(--color-primary);
  font-size: 0.8rem;
}

.product-actions {
  display: flex;
  gap: 1rem;
}

.btn-full {
  flex: 1;
  text-align: center;
  justify-content: center;
}

.loading-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  border: 3px solid rgba(201, 169, 98, 0.1);
  border-top: 3px solid var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

@media (max-width: 968px) {
  .product-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .product-title {
    font-size: 2.5rem;
  }

  .product-detail-container {
    padding-top: 120px;
  }
}
</style>
