<template>
  <div class="about-page">
    <!-- Header -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <nav class="nav container">
        <router-link to="/" class="nav-logo">
          <span class="logo-text">International</span>
          <span class="logo-accent">Leather Works</span>
        </router-link>
        <ul class="nav-menu">
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/products" class="nav-link">Products</router-link></li>
          <li><router-link to="/about" class="nav-link active">About Us</router-link></li>
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
        <span class="section-subtitle">Who We Are</span>
        <h1 class="section-title">About <em>Us</em></h1>
      </div>
    </section>

    <!-- Main Content -->
    <section class="about-content-section section">
      <div class="container">
        <div class="about-layout">
          <!-- Sidebar Menu -->
          <aside class="about-sidebar">
            <h3 class="sidebar-title">Menu</h3>
            <ul class="about-menu-list">
              <li v-for="page in pages" :key="page.id" 
                  :class="{ active: activePage?.slug === page.slug }"
                  @click="activePage = page">
                <span class="menu-icon"></span>
                {{ page.title }}
              </li>
            </ul>
          </aside>

          <!-- Content Display -->
          <main class="about-main" v-if="activePage">
            <div class="content-wrapper">
              <h2 class="content-title">{{ activePage.title }}</h2>
              
              <div class="content-image-wrapper" v-if="activePage.image_url && activePage.image_url !== 'Not found'">
                <img :src="activePage.image_url" :alt="activePage.title" class="content-image">
              </div>

              <div class="content-text">
                <p>{{ activePage.content }}</p>
              </div>
            </div>
          </main>
          
          <div v-else class="loading-state">
            Loading Content...
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import api from '../services/api'
import TheFooter from '../components/TheFooter.vue'

const pages = ref([])
const activePage = ref(null)
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const loadPages = async () => {
  try {
    const { data } = await api.get('/content/about-pages')
    pages.value = data
    if (data.length > 0) {
      activePage.value = data[0]
    }
  } catch (err) {
    console.error('Failed to load about pages:', err)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadPages()
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.about-page {
  background: var(--color-bg-dark);
  min-height: 100vh;
}

.page-header {
  padding: 12rem 0 4rem;
  background: radial-gradient(circle at top center, rgba(201, 169, 98, 0.1) 0%, transparent 60%);
  text-align: center;
}

.about-layout {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 4rem;
  align-items: start;
}

/* Sidebar Styling */
.about-sidebar {
  background: var(--color-bg-card);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  position: sticky;
  top: 100px;
}

.sidebar-title {
  font-family: var(--font-display);
  color: var(--color-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--color-border);
}

.about-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.about-menu-list li {
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  color: var(--color-text-secondary);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.about-menu-list li:hover {
  background: rgba(255, 255, 255, 0.03);
  color: var(--color-primary);
  transform: translateX(5px);
}

.about-menu-list li.active {
  background: var(--color-primary);
  color: #000;
  font-weight: 700;
}

.menu-icon {
  width: 6px;
  height: 6px;
  background: currentColor;
  border-radius: 50%;
  opacity: 0.5;
}

.about-menu-list li.active .menu-icon {
  opacity: 1;
  background: #000;
}

/* Main Content Styling */
.about-main {
  animation: fadeIn 0.5s ease-out;
}

.content-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-text-primary);
  margin-bottom: 2rem;
}

.content-image-wrapper {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2.5rem;
  border: 1px solid var(--color-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.content-image {
  width: 100%;
  height: auto;
  display: block;
  transform: scale(1.01);
  transition: transform 0.5s ease;
}

.content-image:hover {
  transform: scale(1.03);
}

.content-text {
  color: var(--color-text-secondary);
  font-size: 1.15rem;
  line-height: 1.8;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 968px) {
  .about-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .about-sidebar {
    position: static;
  }
}
</style>
