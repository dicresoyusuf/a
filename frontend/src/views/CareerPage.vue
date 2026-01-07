<template>
  <div class="career-page">
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
          <li><router-link to="/career" class="nav-link active">Career</router-link></li>
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
        <span class="section-subtitle">Join Our Team</span>
        <h1 class="section-title">Career <em>Oppurtunities</em></h1>
        <p class="section-description">Be Part of the Big Family of PT. International Leather Works</p>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="intro-section section">
      <div class="container">
        <div class="intro-content">
          <p>Sebagai identitas dari kelompok unit bisnis multisektor yang bergerak dalam enam pilar bisnis dengan pengalaman lebih dari 65 tahun, PT. International Leather Works memiliki berbagai peluang karir bagi Anda untuk bekerja di berbagai bidang dan industri.</p>
        </div>
      </div>
    </section>

    <!-- Job Openings -->
    <section class="jobs-section section">
      <div class="container">
        <h2 class="section-heading">Open Positions</h2>
        
        <div class="jobs-grid">
          <div v-for="(job, index) in jobs" :key="index" class="job-card">
            <div class="job-header" @click="toggleJob(index)">
              <div class="job-title-group">
                <h3>{{ job.title }}</h3>
                <span class="job-department">{{ job.department || 'General' }}</span>
              </div>
              <span class="toggle-icon">{{ job.isOpen ? '−' : '+' }}</span>
            </div>
            
            <div class="job-details" v-show="job.isOpen">
              <div class="job-content-wrapper">
                <p class="job-intro" v-if="job.intro">{{ job.intro }}</p>
                
                <div class="detail-group">
                  <h4>Qualifications:</h4>
                  <ul class="detail-list">
                    <li v-for="(req, rIdx) in job.requirements" :key="rIdx">{{ req }}</li>
                  </ul>
                </div>

                <div class="detail-group">
                  <h4>Job Description:</h4>
                  <ul class="detail-list">
                     <li v-for="(desc, dIdx) in job.descriptions" :key="dIdx">{{ desc }}</li>
                  </ul>
                </div>

                <div class="detail-group" v-if="job.benefits">
                   <h4>Benefits:</h4>
                   <p>{{ job.benefits }}</p>
                </div>
                
                <div class="apply-action">
                   <a :href="'mailto:recruitment.ileatherworks@gmail.com?subject=Application for ' + job.title" class="btn btn-primary btn-sm">Apply Now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Application Contact -->
    <section class="apply-contact section">
      <div class="container">
        <div class="apply-card">
          <h3>How to Apply</h3>
          <p>Please send your updated CV and Portfolio to our recruitment team.</p>
          
          <div class="contact-methods">
            <div class="method">
               <span class="icon">✉️</span>
               <strong>Email:</strong>
               <a href="mailto:recruitment.ileatherworks@gmail.com">recruitment.ileatherworks@gmail.com</a>
            </div>
            <div class="method">
               <span class="icon">📱</span>
               <strong>WhatsApp (Cindy):</strong>
               <a href="https://wa.me/6287743254630" target="_blank">+62 877-4325-4630</a>
            </div>
          </div>
          
          <p class="note">* PT International Leather Works emphasizes that all recruitment processes are free of charge.</p>
        </div>
      </div>
    </section>

    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import TheFooter from '../components/TheFooter.vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const jobs = ref([
 {
    title: 'Marketing (Staff)',
    department: 'Sales & Marketing',
    isOpen: true,
    intro: 'Proses strategis untuk mempromosikan, menjual, dan mendistribusikan produk kepada konsumen.',
    requirements: [
       'Experience in Online Marketing for 2 years',
       'Understand leather marketing',
       'Communicative and attractive appearance',
       'Extensive network',
       'Accustomed to working with targets',
       'High level of self-confidence'
    ],
    descriptions: [
       'Find local consumers to increase sales volume',
       'Maintain good relationships with consumers through routine visits and listening to complaints',
       'Follow up on payments offline and online'
    ],
    benefits: 'Basic Salary, Sales Bonus (based on achievement), THR'
 },
 {
    title: 'PPIC (SPV)',
    department: 'Production',
    isOpen: false,
    intro: 'Production, Planning and Inventory Control. Responsible for production from start to finish.',
    requirements: [
       'Minimum D3 (any major)',
       '2-3 years experience in PPIC/Factory Leader (Mandatory)',
       'Good mathematical skills',
       'Analytical and problem-solving skills',
       'Enjoys challenges and can work under pressure'
    ],
    descriptions: [
       'Responsible for the production process from start to finish',
       'Create work planning according to marketing targets',
       'Coordinate with production divisions to achieve desired results',
       'Monitor and evaluate team members'
    ]
 },
 {
    title: 'Audit (Staff)',
    department: 'Finance',
    isOpen: false,
    requirements: [
       'Minimum Bachelor\'s degree (Accounting/Finance)',
       'Experience in internal audit preferred',
       'Detail-oriented and analytical'
    ],
    descriptions: [
       'Conduct regular audits of financial and operational processes',
       'Ensure compliance with company policies and regulations'
    ]
 },
 {
    title: 'Management Trainee (Staff)',
    department: 'General',
    isOpen: false,
    requirements: [
       'Fresh graduates are welcome',
       'Strong leadership potential and learning agility',
       'Ability to adapt to various departments'
    ],
    descriptions: [
       'Undergo rotation in different divisions to understand business operations',
       'Assist in project management and operational improvements'
    ]
 },
 {
    title: 'International Marketing (Staff)',
    department: 'Sales & Marketing',
    isOpen: false,
    requirements: [
       'Fluent in English (written and spoken)',
       'Experience in export/import or international sales',
       'Ability to handle international clients'
    ],
    descriptions: [
       'Expand the market to international regions',
       'Manage communication with global distributors and customers'
    ]
 },
 {
    title: 'Marketing Teritory (Staff)',
    department: 'Sales & Marketing',
    isOpen: false,
    requirements: [
       'Knowledge of specific regional markets',
       'Willingness to travel',
       'Strong negotiation skills'
    ],
    descriptions: [
       'Manage and develop specific geographical territories',
       'Build relationships with local vendors and customers'
    ]
 }
])

const toggleJob = (index) => {
  jobs.value[index].isOpen = !jobs.value[index].isOpen
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.scrollTo(0, 0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.career-page {
  background: var(--color-bg-dark);
  min-height: 100vh;
}

.page-header {
  padding: 12rem 0 4rem;
  background: radial-gradient(circle at top center, rgba(201, 169, 98, 0.1) 0%, transparent 60%);
  text-align: center;
}

.intro-section {
  text-align: center;
  margin-bottom: 2rem;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.2rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
}

.section-heading {
  font-family: var(--font-display);
  font-size: 2.5rem;
  color: var(--color-primary);
  margin-bottom: 2rem;
  text-align: center;
}

.jobs-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}

.job-card {
  background: var(--color-bg-card);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.job-card:hover {
  border-color: var(--color-primary);
}

.job-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: rgba(255,255,255,0.02);
}

.job-title-group h3 {
  font-family: var(--font-display);
  font-size: 1.4rem;
  color: #fff;
  margin-bottom: 0.25rem;
}

.job-department {
  font-size: 0.85rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.toggle-icon {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: bold;
}

.job-details {
  border-top: 1px solid var(--color-border);
  background: rgba(0,0,0,0.2);
  animation: slideDown 0.3s ease-out;
}

.job-content-wrapper {
  padding: 2rem;
}

.job-intro {
  margin-bottom: 1.5rem;
  font-style: italic;
  color: var(--color-text-muted);
}

.detail-group {
  margin-bottom: 1.5rem;
}

.detail-group h4 {
  color: #fff;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.detail-list {
  list-style: none;
  padding: 0;
}

.detail-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--color-text-secondary);
}

.detail-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

.apply-action {
  margin-top: 2rem;
  text-align: right;
}

.apply-contact {
  margin-top: 2rem;
}

.apply-card {
  background: linear-gradient(135deg, rgba(201, 169, 98, 0.1) 0%, rgba(0,0,0,0) 100%);
  border: 1px solid var(--color-primary);
  border-radius: 12px;
  padding: 3rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.apply-card h3 {
  font-family: var(--font-display);
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #fff;
}

.contact-methods {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.method {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.method .icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.method a {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 1.1rem;
}

.note {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  font-style: italic;
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .contact-methods {
    flex-direction: column;
    gap: 2rem;
  }
  
  .job-header {
    padding: 1.25rem;
  }
}
</style>
