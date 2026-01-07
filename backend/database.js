const Database = require('better-sqlite3');
const path = require('path');
const bcrypt = require('bcryptjs');

const db = new Database(path.join(__dirname, 'ilw.db'));

// Initialize tables
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE NOT NULL,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS hero_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subtitle TEXT,
        title_line1 TEXT,
        title_line2 TEXT,
        description TEXT,
        btn_primary_text TEXT,
        btn_secondary_text TEXT,
        stat1_number TEXT,
        stat1_label TEXT,
        stat2_number TEXT,
        stat2_label TEXT,
        stat3_number TEXT,
        stat3_label TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS about_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        subtitle TEXT,
        title TEXT,
        paragraph1 TEXT,
        paragraph2 TEXT,
        paragraph3 TEXT,
        experience_years TEXT,
        experience_text TEXT,
        feature1_title TEXT,
        feature1_desc TEXT,
        feature2_title TEXT,
        feature2_desc TEXT,
        feature3_title TEXT,
        feature3_desc TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS about_pages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT UNIQUE,
        title TEXT,
        content TEXT,
        image_url TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        title TEXT NOT NULL,
        description TEXT,
        features TEXT,
        image_url TEXT,
        is_featured INTEGER DEFAULT 0,
        badge_text TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS process_steps (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        step_number TEXT,
        title TEXT NOT NULL,
        description TEXT,
        sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL,
        author_name TEXT,
        author_title TEXT,
        author_avatar TEXT,
        is_active INTEGER DEFAULT 1,
        sort_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contact_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT,
        email TEXT,
        phone TEXT,
        whatsapp TEXT,
        instagram TEXT,
        linkedin TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contact_submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        company TEXT,
        interest TEXT,
        message TEXT,
        is_read INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        category TEXT,
        image_url TEXT,
        size TEXT DEFAULT 'normal',
        sort_order INTEGER DEFAULT 0
    );
`);

// Create default admin user if not exists
const adminExists = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@ilw.com');
if (!adminExists) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (email, password, name, role) VALUES (?, ?, ?, ?)').run('admin@ilw.com', hashedPassword, 'Administrator', 'admin');
    console.log('✓ Default admin created: admin@ilw.com / admin123');
}

// Insert default content if not exists
const heroExists = db.prepare('SELECT id FROM hero_content WHERE id = 1').get();
if (!heroExists) {
    db.prepare(`INSERT INTO hero_content (subtitle, title_line1, title_line2, description, btn_primary_text, btn_secondary_text, stat1_number, stat1_label, stat2_number, stat2_label, stat3_number, stat3_label)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        'Premium Indonesian Tannery',
        'Crafting',
        'Exotic Excellence',
        'Specializing in the finest exotic leathers — lizard, python, and crocodile — for the world\'s most prestigious fashion houses.',
        'Explore Collection',
        'Our Story',
        '50+', 'Countries',
        '1000+', 'Clients',
        '15+', 'Years'
    );
}

const aboutExists = db.prepare('SELECT id FROM about_content WHERE id = 1').get();
if (!aboutExists) {
    db.prepare(`INSERT INTO about_content (subtitle, title, paragraph1, paragraph2, paragraph3, experience_years, experience_text, feature1_title, feature1_desc, feature2_title, feature2_desc, feature3_title, feature3_desc)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).run(
        'Our Story',
        'A Legacy of Craftsmanship',
        'International Leather Works is a premier Indonesian tannery that specializes in exotic leathers with the highest quality available in Indonesia.',
        'Located in Bogor near Jakarta, we started from the idea to develop native Indonesian products such as lizard, python, and crocodile skin to the world stage.',
        'With the best raw materials, extensive knowledge, and commitment to R&D, we\'ve become a trusted supplier for famous fashion houses worldwide.',
        '15+',
        'Years of Excellence',
        'Premium Quality', 'Highest grade exotic leathers',
        'Global Reach', 'Serving fashion houses worldwide',
        'CITES Certified', 'Sustainable and ethical sourcing'
    );
}

const contactExists = db.prepare('SELECT id FROM contact_info WHERE id = 1').get();
if (!contactExists) {
    db.prepare(`INSERT INTO contact_info (address, email, phone, whatsapp, instagram, linkedin) VALUES (?, ?, ?, ?, ?, ?)`).run(
        'Bogor, West Java, Indonesia',
        'info@ilw-leather.com',
        '+62 251 XXX XXXX',
        '+62 812 XXX XXXX',
        '@ilw_leather',
        'international-leather-works'
    );
}

// Insert default products
const productsExist = db.prepare('SELECT COUNT(*) as count FROM products').get();
if (productsExist.count === 0) {
    const insertProduct = db.prepare(`INSERT INTO products (category, title, description, features, image_url, is_featured, badge_text, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);

    // --- PYTHON SKIN VARIANTS ---
    const pythonDesc = 'Premium Reticulated Python skin with distinctive scale patterns.';
    const pythonFeat = 'Cut: Front/Back|Grade: 1, 2|Size: 28-35cm+';

    insertProduct.run('Python Skin', 'Highlight Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/highlight-1-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpeg', 1, 'Best Seller', 1);
    insertProduct.run('Python Skin', 'Brush Off Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/python-01-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpg', 0, null, 2);
    insertProduct.run('Python Skin', 'Glazed Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/python-01-1-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, null, 3);
    insertProduct.run('Python Skin', 'Matte Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/phyton-matte-new-1-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpeg', 0, null, 4);
    insertProduct.run('Python Skin', 'Multicolor Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/python-01-3-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, 'New', 5);
    insertProduct.run('Python Skin', 'Mystic Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/python-06-3-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpg', 0, null, 6);
    insertProduct.run('Python Skin', 'Nubuck Python', pythonDesc, pythonFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/python-01-2-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, null, 7);

    // --- LIZARD SKIN VARIANTS ---
    const lizardDesc = 'Exotic Water Monitor Lizard skin with elegant, fine grains.';
    const lizardFeat = 'Cut: Front/Back|Grade: 1, 2, 3|Size: 25-35cm+';

    insertProduct.run('Lizard Skin', 'Brush Off Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-01-1-2-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, null, 8);
    insertProduct.run('Lizard Skin', 'Degradation Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-01-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, null, 9);
    insertProduct.run('Lizard Skin', 'Matte Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-01-2-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 1, null, 10);
    insertProduct.run('Lizard Skin', 'Metallic Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-04-1-1-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpg', 0, 'Trending', 11);
    insertProduct.run('Lizard Skin', 'Mystic Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-01-1-1-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpg', 0, null, 12);
    insertProduct.run('Lizard Skin', 'Multicolor Lizard', lizardDesc, lizardFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/lizard-01-1-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpg', 0, null, 13);

    // --- CROCODILE SKIN VARIANTS ---
    const crocDesc = 'Luxurious New Guinea Crocodile skin for high-end fashion.';
    const crocFeat = 'Cut: Belly/Hornback|Grade: Premium|Size: Various';

    insertProduct.run('Crocodile Skin', 'Multicolor Crocodile', crocDesc, crocFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/multicolor-crocodile-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpeg', 1, null, 14);
    insertProduct.run('Crocodile Skin', 'Nubuck Crocodile', crocDesc, crocFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/nubuck-crocodile-r8z5xo8vaim3ti2b6w6ndq2vdtegm9zrx0jqycuj7c.jpeg', 0, null, 15);
    insertProduct.run('Crocodile Skin', 'Brush Off Crocodile', crocDesc, crocFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/croco-1-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, null, 16);
    insertProduct.run('Crocodile Skin', 'Matte Crocodile', crocDesc, crocFeat, 'https://ileatherworks.com/wp-content/uploads/elementor/thumbs/croco-1-1-r8z5xnb13okthw3ocds0t8besfj3ekw1kvw9h2vxdk.jpg', 0, 'Premium', 17);
}

// Insert default process steps
const stepsExist = db.prepare('SELECT COUNT(*) as count FROM process_steps').get();
if (stepsExist.count === 0) {
    const insertStep = db.prepare(`INSERT INTO process_steps (step_number, title, description, sort_order) VALUES (?, ?, ?, ?)`);
    insertStep.run('01', 'Sourcing', 'Ethically sourced materials from certified sustainable farms.', 1);
    insertStep.run('02', 'Selection', 'Rigorous quality control to select only the finest skins.', 2);
    insertStep.run('03', 'Tanning', 'Advanced techniques preserving natural beauty and durability.', 3);
    insertStep.run('04', 'Finishing', 'Expert dyeing, glazing, and conditioning for perfect results.', 4);
    insertStep.run('05', 'Delivery', 'Secure worldwide shipping with CITES certification.', 5);
}

// Seed about_pages if empty
const aboutPagesExist = db.prepare('SELECT COUNT(*) as count FROM about_pages').get();
if (aboutPagesExist.count === 0) {
    const insertPage = db.prepare('INSERT INTO about_pages (slug, title, content, image_url) VALUES (?, ?, ?, ?)');

    insertPage.run(
        'company-profile',
        'Company Profile',
        'International Leather Works is an Indonesian tannery that specializes in exotic leathers with the highest quality available in Indonesia. Located in Bogor near Jakarta, the capital city of Indonesia. International Leather Works started from the idea to develop the native product of Indonesia such as lizard, python and crocodile skin to the world stage. In such a young age, International Leather Works already supplies high quality exotic leather to famous fashion houses and customers around the Globe. We are proud of our high standard quality of materials, experienced team, Quality control and grant our customer with quality and sustainability of the best raw material supplies.',
        'https://ileatherworks.com/wp-content/uploads/2023/03/about-us-ileatherworks.jpg'
    );

    insertPage.run(
        'vision-mission',
        'Vision & Mission',
        'Based on the hidden treasure of nature and human resources from Indonesia, International Leather Works aim is to bring our finished exotic leather to be well known by worldwide as one of the leader in terms of creativity, originality and quality with return contribute to the nature, human and environment.',
        'https://ileatherworks.com/wp-content/uploads/2023/03/vision-mission.jpg'
    );

    insertPage.run(
        'facilities-machineries',
        'Facilities & Machineries',
        'International Leather Works utilizes advanced technology and specialized machinery to maintain its high quality standards. List of key facilities includes: Automatic Spray Machines, Glazing Machines, Light Box for color inspection, and Dying Machines to ensure consistent and premium finishes for all our exotic leathers.',
        'https://cloudindo.co.id/ileatherworks/wp-content/uploads/2023/03/Automatic-Spray-Machines.jpg'
    );

    insertPage.run(
        'traceability',
        'Traceability',
        'PT. International Leather Works is the first Lizard tannery in the world to implement an online traceability system. The system integrates information like geographical catching area, skin specification, CITES No, and color name. Customers can scan a QR code on the skins to access this data online, ensuring sustainability and authenticity.',
        'https://ileatherworks.com/wp-content/uploads/2023/03/Traceability-System.jpg'
    );

    insertPage.run(
        'achievement',
        'Achievement',
        'PT. International Leather Works has received excellent ratings with Gold awards, meaning the tannery has been audited and achieved at least the minimum scoring (85%) for a Gold medal classification – the highest rating from the Leather Working Group (LWG).',
        'https://ileatherworks.com/wp-content/uploads/2024/02/WhatsApp-Image-2024-02-06-at-12.29.00.jpeg'
    );
}

module.exports = db;
