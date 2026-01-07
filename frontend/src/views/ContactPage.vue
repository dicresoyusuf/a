<template>
  <div class="contact-page">
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
          <li><router-link to="/about" class="nav-link">About Us</router-link></li>
          <li><router-link to="/contact" class="nav-link active">Contact</router-link></li>
        </ul>
        <div class="nav-actions">
          <router-link to="/contact" class="btn btn-primary">Get Quote</router-link>
        </div>
      </nav>
    </header>

    <!-- Page Title -->
    <section class="page-header">
      <div class="container">
        <span class="section-subtitle">Get in Touch</span>
        <h1 class="section-title">Contact <em>Us</em></h1>
        <p class="section-description">We are ready to fulfill your exotic leather needs. Contact our sales team for inquiries and partnerships.</p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="contact-section section">
      <div class="container">
        <div class="contact-grid-page">
          
          <!-- Contact Info -->
          <div class="contact-info-card">
            <h3>Head Office & Tannery</h3>
            <p class="address">
              Kembang Kuning, Klapanunggal<br>
              Bogor Regency, West Java 16710<br>
              Indonesia
            </p>
            
            <div class="info-item">
              <span class="label">Phone:</span>
              <span class="value">+6221 823 3817</span>
            </div>
            <div class="info-item">
              <span class="label">Fax:</span>
              <span class="value">+6221 823 3806</span>
            </div>
            
            <div class="divider"></div>

            <h3>Sales Team</h3>
            <div class="sales-list">
              <div class="sales-person">
                <strong>Juni Huang (中文)</strong>
                <a href="https://wa.me/6281265352089" target="_blank">+62812 6535 2089</a>
              </div>
              <div class="sales-person">
                <strong>Jimmy Saputra (EN)</strong>
                <a href="https://wa.me/6281294932818" target="_blank">+62812 9493 2818</a>
              </div>
              <div class="sales-person">
                <strong>Budi Pratama (EN)</strong>
                <a href="https://wa.me/6282163960578" target="_blank">+62821 6396 0578</a>
              </div>
            </div>

            <div class="divider"></div>

            <h3>Email Us</h3>
            <div class="email-links">
               <a href="mailto:mkt01.intleatherworks@gmail.com">mkt01.intleatherworks@gmail.com</a>
               <a href="mailto:mkt02.intleatherworks@gmail.com">mkt02.intleatherworks@gmail.com</a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="contact-form-card">
            <h3>Send Inquiry</h3>
            <form class="contact-form" @submit.prevent="submitContact">
              <div v-if="formMessage" :class="['alert', formSuccess ? 'alert-success' : 'alert-error']">{{ formMessage }}</div>
              
              <div class="form-group">
                <label>Full Name</label>
                <input v-model="form.name" type="text" required class="form-control">
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>Email</label>
                  <input v-model="form.email" type="email" required class="form-control">
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input v-model="form.phone" type="tel" class="form-control">
                </div>
              </div>

              <div class="form-group">
                <label>Company</label>
                <input v-model="form.company" type="text" class="form-control">
              </div>

              <div class="form-group">
                <label>Product Interest</label>
                <input v-if="presetInterest" v-model="form.interest" type="text" class="form-control" readonly>
                <select v-else v-model="form.interest" class="form-control">
                  <option value="python">Python Leather</option>
                  <option value="crocodile">Crocodile Leather</option>
                  <option value="lizard">Lizard Leather</option>
                  <option value="multiple">Multiple Products</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div class="form-group">
                <label>Message</label>
                <textarea v-model="form.message" rows="5" class="form-control"></textarea>
              </div>

              <button type="submit" class="btn btn-primary btn-full" :disabled="submitting">
                {{ submitting ? 'Sending...' : 'Send Message' }}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>

    <!-- Map Section (Placeholder) -->
    <section class="map-section">
      <iframe 
        width="100%" 
        height="450" 
        style="border:0; filter: grayscale(100%) invert(92%) contrast(83%);" 
        loading="lazy" 
        allowfullscreen
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0553748206256!2d106.9647243749918!3d-6.386869993603612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6994787d544493%3A0x629538352528731e!2sPT.%20International%20Leather%20Works!5e0!3m2!1sen!2sid!4v1680000000000!5m2!1sen!2sid">
      </iframe>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'
import TheFooter from '../components/TheFooter.vue'

const route = useRoute()
const isScrolled = ref(false)
const submitting = ref(false)
const formMessage = ref('')
const formSuccess = ref(false)

const presetInterest = ref('')
const form = ref({ name: '', email: '', phone: '', company: '', interest: 'python', message: '' })

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const submitContact = async () => {
  submitting.value = true
  formMessage.value = ''
  try {
    await api.post('/content/contact', form.value)
    formSuccess.value = true
    formMessage.value = 'Thank you! We will contact you soon.'
    form.value = { name: '', email: '', phone: '', company: '', interest: 'python', message: '' }
    if (presetInterest.value) form.value.interest = presetInterest.value
  } catch (err) {
    formSuccess.value = false
    formMessage.value = 'Failed to send. Please try again.'
  }
  submitting.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.scrollTo(0, 0)
  
  if (route.query.interest) {
    presetInterest.value = route.query.interest
    form.value.interest = route.query.interest
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.contact-page {
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

.contact-grid-page {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
}

.contact-info-card, .contact-form-card {
  background: var(--color-bg-card);
  padding: 2.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.contact-info-card h3, .contact-form-card h3 {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

.address {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.05rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.info-item .label {
  color: var(--color-text-muted);
}

.info-item .value {
  color: #fff;
  font-weight: 500;
}

.divider {
  height: 1px;
  background: var(--color-border);
  margin: 2rem 0;
}

.sales-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sales-person {
  display: flex;
  flex-direction: column;
}

.sales-person strong {
  color: #ddd;
  margin-bottom: 0.25rem;
}

.sales-person a {
  color: var(--color-primary);
  text-decoration: none;
}

.email-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.email-links a {
  color: var(--color-text-secondary);
  text-decoration: none;
}

.email-links a:hover {
  color: var(--color-primary);
}

.form-control {
  width: 100%;
  background: rgba(0,0,0,0.2);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  border-radius: 6px;
  color: #fff;
  font-family: inherit;
  transition: border-color 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: var(--color-primary);
}

.map-section {
  height: 450px;
  width: 100%;
  margin-top: 4rem;
  position: relative;
  z-index: 1; /* Below header */
}

@media (max-width: 968px) {
  .contact-grid-page {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
