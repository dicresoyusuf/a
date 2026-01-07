<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand & Address -->
        <div class="footer-brand">
          <span class="footer-logo">International Leather Works</span>
          <p class="company-desc">Indonesia's premier exotic leather tannery. Bringing the treasure of Indonesia's nature to the global fashion stage.</p>
          
          <div class="footer-address">
            <h4>Head Office & Tannery</h4>
            <p>Kembang Kuning, Klapanunggal<br>Bogor Regency, West Java 16710<br>Indonesia</p>
            <p class="contact-line"><strong>Phone:</strong> +6221 823 3817</p>
            <p class="contact-line"><strong>Fax:</strong> +6221 823 3806</p>
          </div>

          <div class="cert-badges">
            <span class="badge-item">CITES Certified</span>
            <span class="badge-item">ISO 9001</span>
            <span class="badge-item">LWG Gold Rated</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-links">
          <h4>Quick Links</h4>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About Us</router-link>
          <router-link to="/career">Career</router-link>
          <router-link to="/products">Products</router-link>
          <router-link to="/#process">Process</router-link>
          <router-link to="/contact">Contact Us</router-link>
        </div>

        <!-- Sales Contact -->
        <div class="footer-contact-list">
          <h4>Sales Contacts</h4>
          
          <div class="contact-person">
            <span class="name">Juni Huang (中文)</span>
            <a href="https://wa.me/6281265352089" target="_blank" class="phone">+62812 6535 2089</a>
          </div>

          <div class="contact-person">
            <span class="name">Jimmy Saputra (EN)</span>
            <a href="https://wa.me/6281294932818" target="_blank" class="phone">+62812 9493 2818</a>
          </div>

          <div class="contact-person">
            <span class="name">Budi Pratama (EN)</span>
            <a href="https://wa.me/6282163960578" target="_blank" class="phone">+62821 6396 0578</a>
          </div>

          <div class="email-list">
            <h4>Email Us</h4>
            <a href="mailto:mkt01.intleatherworks@gmail.com">mkt01.intleatherworks@gmail.com</a>
            <a href="mailto:mkt02.intleatherworks@gmail.com">mkt02.intleatherworks@gmail.com</a>
          </div>
        </div>

        <!-- Social & WeChat -->
        <div class="footer-social">
          <h4>Connect With Us</h4>
          <div class="social-links">
            <a href="https://instagram.com/intleatherworks" target="_blank" class="social-link instagram">
              <span>Instagram</span>
            </a>
            <a href="#" class="social-link facebook">
              <span>Facebook</span>
            </a>
          </div>
          
          <div class="wechat-box">
            <span class="wechat-label">WeChat ID:</span>
            <span class="wechat-id">INTLEATHERWORKS</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© {{ new Date().getFullYear() }} International Leather Works. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: #0f0f0f;
  color: #fff;
  padding: 5rem 0 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 0.95rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1.5fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.footer-logo {
  font-family: var(--font-display);
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 1rem;
  display: block;
}

.company-desc {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  max-width: 300px;
}

.footer-address h4 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.footer-address p {
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.contact-line {
  color: var(--color-text-muted) !important;
}

.contact-line strong {
  color: #fff;
}

.cert-badges {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}

.badge-item {
  font-size: 0.75rem;
  padding: 4px 8px;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  border-radius: 4px;
}

.footer-links h4, .footer-contact-list h4, .footer-social h4 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #fff;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-links a, .email-list a {
  color: var(--color-text-secondary);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover, .email-list a:hover {
  color: var(--color-primary);
}

.contact-person {
  margin-bottom: 1rem;
}

.contact-person .name {
  display: block;
  font-weight: 600;
  color: #ddd;
  margin-bottom: 2px;
}

.contact-person .phone {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  text-decoration: none;
}

.contact-person .phone:hover {
  color: var(--color-primary);
}

.email-list {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.social-link {
  color: #fff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.05);
  border-radius: 4px;
  transition: background 0.3s;
}

.social-link:hover {
  background: var(--color-primary);
  color: #000;
}

.wechat-box {
  background: rgba(7, 193, 96, 0.1); /* WeChat Greenish tint */
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid rgba(7, 193, 96, 0.3);
}

.wechat-label {
  display: block;
  font-size: 0.85rem;
  color: #07c160;
  margin-bottom: 0.25rem;
}

.wechat-id {
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: #fff;
}

.footer-bottom {
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
</style>
