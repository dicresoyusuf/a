# International Leather Works - Premium Company Website

Website perusahaan modern dan premium dengan **Vite + Vue 3** di frontend dan **Node.js + Express + SQLite** di backend.

## 🚀 Fitur Utama
- **Desain Premium:** UI/UX mewah dengan animasi halus dan tema dark.
- **Content Management System (CMS):** Admin panel lengkap untuk mengedit semua teks, produk, dan kontak tanpa coding.
- **Dynamic Content:** Semua data (Hero, About, Products, Process) diambil dari database.
- **Admin Authentication:** Sistem login aman untuk admin.
- **Contact Form Management:** Melihat pesan masuk dari calon klien langsung di admin panel.

## 🛠️ Teknologi
- **Frontend:** Vue 3, Vite, Pinia (State Management), Vue Router.
- **Backend:** Express.js, Better-SQLite3, JWT Auth, Multer (Uploads).
- **Database:** SQLite (File-based, cepat dan tanpa konfigurasi rumit).

## 📦 Cara Install & Menjalankan

### 1. Setup Backend
```bash
cd backend
npm install
npm run dev
```
Backend akan berjalan di: `http://localhost:3001`
*Admin Default:*
- Email: `admin@ilw.com`
- Password: `admin123`

### 2. Setup Frontend
Buka terminal baru:
```bash
cd frontend
npm install
npm run dev
```
Frontend akan berjalan di: `http://localhost:5173`

## 📂 Struktur Folder
```
ilw-app/
├── backend/         # API Server & Database
│   ├── routes/      # API Endpoints
│   ├── uploads/     # Gambar produk tersimpan di sini
│   └── ilw.db       # File database SQLite
├── frontend/        # Vue 3 App
│   ├── src/
│   │   ├── views/   # Halaman (Home & Admin Pages)
│   │   ├── stores/  # State management (Login state)
│   │   └── style.css # Styling global premium
```

## 🔐 Halaman Admin
Akses halaman admin di: `http://localhost:5173/admin`
Gunakan kredensial default di atas untuk masuk.
