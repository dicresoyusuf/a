const express = require('express');
const db = require('../database');
const { authMiddleware } = require('./auth');

const router = express.Router();

// ===== PUBLIC ROUTES (for frontend) =====

// Get hero content
router.get('/hero', (req, res) => {
    const content = db.prepare('SELECT * FROM hero_content WHERE id = 1').get();
    res.json(content || {});
});

// Get about content
router.get('/about', (req, res) => {
    const content = db.prepare('SELECT * FROM about_content WHERE id = 1').get();
    res.json(content || {});
});

// Get all about pages (sub-pages)
router.get('/about-pages', (req, res) => {
    const pages = db.prepare('SELECT * FROM about_pages ORDER BY id ASC').all();
    res.json(pages);
});

// Get all products
router.get('/products', (req, res) => {
    const products = db.prepare('SELECT * FROM products ORDER BY sort_order ASC').all();
    res.json(products.map(p => ({ ...p, features: p.features ? p.features.split('|') : [] })));
});

// Get single product
router.get('/products/:id', (req, res) => {
    try {
        const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // Parse features
        if (product.features) {
            product.features = product.features.split('|');
        } else {
            product.features = [];
        }

        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get process steps
router.get('/process', (req, res) => {
    const steps = db.prepare('SELECT * FROM process_steps ORDER BY sort_order ASC').all();
    res.json(steps);
});

// Get testimonials
router.get('/testimonials', (req, res) => {
    const testimonials = db.prepare('SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC').all();
    res.json(testimonials);
});

// Get gallery
router.get('/gallery', (req, res) => {
    const gallery = db.prepare('SELECT * FROM gallery ORDER BY sort_order ASC').all();
    res.json(gallery);
});

// Get contact info
router.get('/contact-info', (req, res) => {
    const info = db.prepare('SELECT * FROM contact_info WHERE id = 1').get();
    res.json(info || {});
});

// Submit contact form (public)
router.post('/contact', (req, res) => {
    try {
        const { name, email, phone, company, interest, message } = req.body;
        db.prepare(`INSERT INTO contact_submissions (name, email, phone, company, interest, message) VALUES (?, ?, ?, ?, ?, ?)`).run(name, email, phone, company, interest, message);
        res.json({ success: true, message: 'Thank you! We will contact you soon.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== ADMIN ROUTES (protected) =====

// Update hero content
router.put('/hero', authMiddleware, (req, res) => {
    try {
        const { subtitle, title_line1, title_line2, description, btn_primary_text, btn_secondary_text, stat1_number, stat1_label, stat2_number, stat2_label, stat3_number, stat3_label } = req.body;
        db.prepare(`UPDATE hero_content SET subtitle=?, title_line1=?, title_line2=?, description=?, btn_primary_text=?, btn_secondary_text=?, stat1_number=?, stat1_label=?, stat2_number=?, stat2_label=?, stat3_number=?, stat3_label=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`).run(subtitle, title_line1, title_line2, description, btn_primary_text, btn_secondary_text, stat1_number, stat1_label, stat2_number, stat2_label, stat3_number, stat3_label);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update about content
router.put('/about', authMiddleware, (req, res) => {
    try {
        const data = req.body;
        db.prepare(`UPDATE about_content SET subtitle=?, title=?, paragraph1=?, paragraph2=?, paragraph3=?, experience_years=?, experience_text=?, feature1_title=?, feature1_desc=?, feature2_title=?, feature2_desc=?, feature3_title=?, feature3_desc=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`).run(data.subtitle, data.title, data.paragraph1, data.paragraph2, data.paragraph3, data.experience_years, data.experience_text, data.feature1_title, data.feature1_desc, data.feature2_title, data.feature2_desc, data.feature3_title, data.feature3_desc);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update specific about page (sub-page)
router.put('/about-pages/:id', authMiddleware, (req, res) => {
    try {
        const { title, content, image_url } = req.body;
        db.prepare(`UPDATE about_pages SET title=?, content=?, image_url=? WHERE id=?`).run(title, content, image_url, req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD Products
router.post('/products', authMiddleware, (req, res) => {
    try {
        const { category, title, description, features, image_url, is_featured, badge_text, sort_order } = req.body;
        const featuresStr = Array.isArray(features) ? features.join('|') : features;
        const result = db.prepare(`INSERT INTO products (category, title, description, features, image_url, is_featured, badge_text, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(category, title, description, featuresStr, image_url, is_featured ? 1 : 0, badge_text, sort_order || 0);
        res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/products/:id', authMiddleware, (req, res) => {
    try {
        const { category, title, description, features, image_url, is_featured, badge_text, sort_order } = req.body;
        const featuresStr = Array.isArray(features) ? features.join('|') : features;
        db.prepare(`UPDATE products SET category=?, title=?, description=?, features=?, image_url=?, is_featured=?, badge_text=?, sort_order=? WHERE id=?`).run(category, title, description, featuresStr, image_url, is_featured ? 1 : 0, badge_text, sort_order || 0, req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/products/:id', authMiddleware, (req, res) => {
    try {
        db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CRUD Process Steps
router.post('/process', authMiddleware, (req, res) => {
    try {
        const { step_number, title, description, sort_order } = req.body;
        const result = db.prepare(`INSERT INTO process_steps (step_number, title, description, sort_order) VALUES (?, ?, ?, ?)`).run(step_number, title, description, sort_order || 0);
        res.json({ success: true, id: result.lastInsertRowid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/process/:id', authMiddleware, (req, res) => {
    try {
        const { step_number, title, description, sort_order } = req.body;
        db.prepare(`UPDATE process_steps SET step_number=?, title=?, description=?, sort_order=? WHERE id=?`).run(step_number, title, description, sort_order || 0, req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/process/:id', authMiddleware, (req, res) => {
    try {
        db.prepare('DELETE FROM process_steps WHERE id = ?').run(req.params.id);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update contact info
router.put('/contact-info', authMiddleware, (req, res) => {
    try {
        const { address, email, phone, whatsapp, instagram, linkedin } = req.body;
        db.prepare(`UPDATE contact_info SET address=?, email=?, phone=?, whatsapp=?, instagram=?, linkedin=?, updated_at=CURRENT_TIMESTAMP WHERE id=1`).run(address, email, phone, whatsapp, instagram, linkedin);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get contact submissions (admin)
router.get('/submissions', authMiddleware, (req, res) => {
    const submissions = db.prepare('SELECT * FROM contact_submissions ORDER BY created_at DESC').all();
    res.json(submissions);
});

router.put('/submissions/:id/read', authMiddleware, (req, res) => {
    db.prepare('UPDATE contact_submissions SET is_read = 1 WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

router.delete('/submissions/:id', authMiddleware, (req, res) => {
    db.prepare('DELETE FROM contact_submissions WHERE id = ?').run(req.params.id);
    res.json({ success: true });
});

module.exports = router;
