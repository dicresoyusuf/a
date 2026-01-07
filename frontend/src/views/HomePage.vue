<template>
  <div class="home-page">
    <!-- Header -->
    <header class="header" :class="{ scrolled: isScrolled }">
      <nav class="nav container">
        <a href="#" class="nav-logo">
          <span class="logo-text">International</span>
          <span class="logo-accent">Leather Works</span>
        </a>
        <ul class="nav-menu" :class="{ active: menuOpen }">
          <li><router-link to="/" class="nav-link">Home</router-link></li>
          <li><router-link to="/products" class="nav-link">Products</router-link></li>
          <li><router-link to="/about" class="nav-link">About Us</router-link></li>
          <li><a href="#process" class="nav-link" @click="scrollTo('process')">Process</a></li>
          <li><router-link to="/contact" class="nav-link">Contact</router-link></li>
        </ul>
        <div class="nav-actions">
          <router-link to="/contact" class="btn btn-primary">Get Quote</router-link>
          <button class="nav-toggle" @click="menuOpen = !menuOpen">
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
      <div class="hero-bg"></div>
      <div class="hero-content container">
        <div class="hero-text">
          <span class="hero-subtitle">{{ hero.subtitle }}</span>
          <h1 class="hero-title">
            <span>{{ hero.title_line1 }}</span>
            <span><em>{{ hero.title_line2 }}</em></span>
          </h1>
          <p class="hero-description">{{ hero.description }}</p>
          <div class="hero-buttons">
            <a href="#products" class="btn btn-primary btn-lg" @click="scrollTo('products')">{{ hero.btn_primary_text }}</a>
            <a href="#about" class="btn btn-outline btn-lg" @click="scrollTo('about')">{{ hero.btn_secondary_text }}</a>
          </div>
        </div>
      </div>
      <div class="hero-stats container">
        <div class="stat-item">
          <span class="stat-number">{{ hero.stat1_number }}</span>
          <span class="stat-label">{{ hero.stat1_label }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ hero.stat2_number }}</span>
          <span class="stat-label">{{ hero.stat2_label }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">{{ hero.stat3_number }}</span>
          <span class="stat-label">{{ hero.stat3_label }}</span>
        </div>
      </div>
    </section>

    <!-- Marquee -->
    <section class="marquee-section">
      <div class="marquee">
        <div class="marquee-content">
          <span>Python Leather ◆ Crocodile Skin ◆ Lizard Leather ◆ Premium Quality ◆ Sustainable Sourcing ◆ Python Leather ◆ Crocodile Skin ◆ Lizard Leather ◆ Premium Quality ◆ Sustainable Sourcing ◆</span>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about section" id="about">
      <div class="container">
        <div class="about-grid">
          <div class="about-images">
            <div class="about-image-main">
              <div class="image-placeholder">Tannery Workshop</div>
            </div>
            <div class="about-experience">
              <span class="exp-number">{{ about.experience_years }}</span>
              <span class="exp-text">{{ about.experience_text }}</span>
            </div>
          </div>
          <div class="about-content">
            <span class="section-subtitle">{{ about.subtitle }}</span>
            <h2 class="section-title"><em>{{ about.title }}</em></h2>
            <p>{{ about.paragraph1 }}</p>
            <p>{{ about.paragraph2 }}</p>
            <p>{{ about.paragraph3 }}</p>
            <div class="about-features">
              <div class="feature-item">
                <span class="feature-icon">✦</span>
                <div><h4>{{ about.feature1_title }}</h4><p>{{ about.feature1_desc }}</p></div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">◈</span>
                <div><h4>{{ about.feature2_title }}</h4><p>{{ about.feature2_desc }}</p></div>
              </div>
              <div class="feature-item">
                <span class="feature-icon">◇</span>
                <div><h4>{{ about.feature3_title }}</h4><p>{{ about.feature3_desc }}</p></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products Section -->
    <section class="products section" id="products">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Our Collection</span>
          <h2 class="section-title">Premium <em>Exotic Leathers</em></h2>
        </div>
        <div class="products-grid">
          <div v-for="product in products" :key="product.id" class="product-card" :class="{ featured: product.is_featured }">
            <div v-if="product.badge_text" class="product-badge">{{ product.badge_text }}</div>
            <div class="product-image"></div>
            <div class="product-content">
              <span class="product-category">{{ product.category }}</span>
              <h3>{{ product.title }}</h3>
              <p>{{ product.description }}</p>
              <ul>
                <li v-for="(feature, idx) in product.features" :key="idx">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="process section" id="process">
      <div class="container">
        <div class="section-header">
          <span class="section-subtitle">Our Process</span>
          <h2 class="section-title">From Raw to <em>Refined</em></h2>
        </div>
        <div class="process-timeline">
          <div v-for="step in processSteps" :key="step.id" class="process-item">
            <div class="process-number">{{ step.step_number }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Create <em>Something Extraordinary?</em></h2>
          <p>Partner with Indonesia's leading exotic leather tannery.</p>
          <a href="#contact" class="btn btn-primary btn-lg" @click="scrollTo('contact')">Request Samples</a>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact section" id="contact">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <span class="section-subtitle">Get in Touch</span>
            <h2 class="section-title">Let's <em>Connect</em></h2>
            <div class="contact-details">
              <div class="contact-item"><h4>📍 Location</h4><p>{{ contactInfo.address }}</p></div>
              <div class="contact-item"><h4>✉️ Email</h4><p>{{ contactInfo.email }}</p></div>
              <div class="contact-item"><h4>📞 Phone</h4><p>{{ contactInfo.phone }}</p></div>
            </div>
          </div>
          <form class="contact-form" @submit.prevent="submitContact">
            <div v-if="formMessage" :class="['alert', formSuccess ? 'alert-success' : 'alert-error']">{{ formMessage }}</div>
            <div class="form-group"><label>Full Name</label><input v-model="form.name" type="text" required></div>
            <div class="form-row">
              <div class="form-group"><label>Email</label><input v-model="form.email" type="email" required></div>
              <div class="form-group"><label>Phone</label><input v-model="form.phone" type="tel"></div>
            </div>
            <div class="form-group"><label>Company</label><input v-model="form.company" type="text"></div>
            <div class="form-group">
              <label>Product Interest</label>
              <select v-model="form.interest">
                <option value="python">Python Leather</option>
                <option value="crocodile">Crocodile Leather</option>
                <option value="lizard">Lizard Leather</option>
                <option value="multiple">Multiple Products</option>
              </select>
            </div>
            <div class="form-group"><label>Message</label><textarea v-model="form.message" rows="4"></textarea></div>
            <button type="submit" class="btn btn-primary btn-full" :disabled="submitting">
              {{ submitting ? 'Sending...' : 'Send Inquiry' }}
            </button>
          </form>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <TheFooter />

    <button class="back-to-top" :class="{ visible: showBackToTop }" @click="scrollToTop">↑</button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import api from '../services/api'
import TheFooter from '../components/TheFooter.vue'

const isScrolled = ref(false)
const showBackToTop = ref(false)
const menuOpen = ref(false)

const hero = ref({})
const about = ref({})
const products = ref([])
const processSteps = ref([])
const contactInfo = ref({})

const form = ref({ name: '', email: '', phone: '', company: '', interest: 'python', message: '' })
const submitting = ref(false)
const formMessage = ref('')
const formSuccess = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  showBackToTop.value = window.scrollY > 500
}

const scrollTo = (id) => {
  menuOpen.value = false
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const submitContact = async () => {
  submitting.value = true
  formMessage.value = ''
  try {
    await api.post('/content/contact', form.value)
    formSuccess.value = true
    formMessage.value = 'Thank you! We will contact you soon.'
    form.value = { name: '', email: '', phone: '', company: '', interest: 'python', message: '' }
  } catch (err) {
    formSuccess.value = false
    formMessage.value = 'Failed to send. Please try again.'
  }
  submitting.value = false
}

const loadContent = async () => {
  try {
    const [heroRes, aboutRes, productsRes, processRes, contactRes] = await Promise.all([
      api.get('/content/hero'),
      api.get('/content/about'),
      api.get('/content/products'),
      api.get('/content/process'),
      api.get('/content/contact-info')
    ])
    hero.value = heroRes.data
    about.value = aboutRes.data
    products.value = productsRes.data
    processSteps.value = processRes.data
    contactInfo.value = contactRes.data
  } catch (err) {
    console.error('Failed to load content:', err)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadContent()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
