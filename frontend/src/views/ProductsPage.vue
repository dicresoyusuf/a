<template>
  <div class="products-page">
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

    <!-- Page Title -->
    <section class="page-header">
      <div class="container">
        <span class="section-subtitle">Our Collection</span>
        <h1 class="section-title">Exotic <em>Catalogue</em></h1>
        <p class="section-description">Explore our comprehensive range of high-quality exotic leathers, sourced and tanned with precision.</p>
      </div>
    </section>

    <!-- Product Groups -->
    <section class="products-list section">
      <div class="container">
        <div v-if="loading" class="loading-state">Loading premium collection...</div>
        
        <div v-else class="catalog-container">
          <!-- Category Loop -->
          <div v-for="(products, category) in groupedProducts" :key="category" class="category-section">
            <h2 class="category-title">{{ category }}</h2>
            <div class="category-divider"></div>

            <div class="products-grid-catalog">
              <div v-for="product in products" :key="product.id" class="product-card-catalog">
                <router-link :to="'/products/' + product.id" class="product-link">
                  <div class="card-image" :style="product.image_url ? { backgroundImage: `url(${product.image_url})` } : {}">
                    <div class="badge" v-if="product.badge_text">{{ product.badge_text }}</div>
                  </div>
                </router-link>
                <div class="card-content">
                  <h3><router-link :to="'/products/' + product.id">{{ product.title }}</router-link></h3>
                  <p class="card-desc">{{ product.description }}</p>
                  <div class="card-specs">
                    <span v-for="(feature, idx) in product.features" :key="idx" class="spec-mini">{{ feature.split(':')[0] }}</span>
                  </div>
                  <router-link :to="'/products/' + product.id" class="btn btn-sm btn-outline btn-full">View Details</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import api from '../services/api'
import TheFooter from '../components/TheFooter.vue'

const products = ref([])
const loading = ref(true)
const isScrolled = ref(false)

const groupedProducts = computed(() => {
  const groups = {}
  products.value.forEach(p => {
    if (!groups[p.category]) groups[p.category] = []
    groups[p.category].push(p)
  })
  return groups
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const loadProducts = async () => {
  try {
    const { data } = await api.get('/content/products')
    products.value = data
  } catch (err) {
    console.error('Failed to load products:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadProducts()
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.products-page {
  background: var(--color-bg-dark);
  min-height: 100vh;
}

.page-header {
  padding: 12rem 0 4rem;
  background: radial-gradient(circle at top center, rgba(201, 169, 98, 0.1) 0%, transparent 60%);
  text-align: center;
}

.section-description {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text-secondary);
  font-size: 1.1rem;
}

.catalog-container {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.category-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
}

.category-divider {
  width: 100px;
  height: 2px;
  background: var(--color-primary);
  margin-bottom: 3rem;
}

.products-grid-catalog {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
}

.product-card-catalog {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.product-card-catalog:hover {
  transform: translateY(-5px);
  border-color: var(--color-primary-dark);
}

.card-image {
  aspect-ratio: 1;
  background: linear-gradient(135deg, #1a1510 0%, #2a2015 50%, #1a1510 100%);
  position: relative;
  background-size: cover;
  background-position: center;
}

.badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: var(--color-primary);
  color: #000;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 4px;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  font-size: 1.25rem;
  font-family: var(--font-display);
  margin-bottom: 0.5rem;
}

.card-desc {
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.card-specs {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.spec-mini {
  font-size: 0.7rem;
  padding: 2px 6px;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  color: var(--color-text-muted);
}

.product-link {
  display: block;
  text-decoration: none;
}

.card-content h3 a {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s;
}

.card-content h3 a:hover {
  color: var(--color-primary);
}
</style>
