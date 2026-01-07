# Panduan Deployment ke Vercel

Project ini telah dikonfigurasi untuk dapat dideploy ke **Vercel** dengan arsitektur:
- **Frontend:** Vercel Static/SPA Hosting.
- **Backend:** Vercel Serverless Function (via `api/index.js`).

## ⚠️ PENTING: Batasan Database
Project ini menggunakan **SQLite** (`ilw.db`) sebagai database. Vercel menggunakan sistem file yang *ephemeral* (sementara) dan *read-only* untuk serverless functions.

**Implikasinya:**
1.  Website akan berjalan normal dan bisa membaca data produk/konten yang sudah ada.
2.  **Perubahan via Admin Panel TIDAK AKAN PERMANEN.** Data yang Anda edit atau tambah mungkin hilang setelah beberapa saat atau saat deployment baru.
3.  **Solusi Permanen:** Jika Anda membutuhkan Admin Panel yang berfungsi penuh di Vercel, Anda perlu memigrasikan database ke layanan Cloud Database seperti **Turso** atau **Supabase**.

---

## Langkah Deployment

### 1. Push ke GitHub
Pastikan semua kode Anda sudah di-push ke repository GitHub.
File `.gitignore` sudah diset agar folder `node_modules` tidak ikut, tetapi `ilw.db` (database awal) IKUT terupload agar website memiliki konten awal.

### 2. Import di Vercel
1.  Buka dashboard Vercel (https://vercel.com).
2.  Klik "Add New..." -> "Project".
3.  Pilih repository GitHub Anda.
4.  Pada halaman **Configure Project**:
    *   **Framework Preset:** Pilih `Vite` (atau biarkan auto-detect).
    *   **Root Directory:** Biarkan kosong (`./`).
    *   **Build Command:** `npm run build` (ini sudah melingkupi install & build frontend sesuai `package.json` di root).
    *   **Output Directory:** `frontend/dist` (ini diset di `vercel.json` secara implisit, atau Anda bisa override di sini).
    *   **Environment Variables:** Tambahkan variable berikut:
        *   `JWT_SECRET`: (Isi dengan string acak yang aman, contoh: `rahasia12345`)

5.  Klik **Deploy**.

### 3. Verifikasi
Setelah deploy sukses:
-   Buka URL project Anda (misal `https://ilw-app.vercel.app`).
-   Cek halaman Home, Products, Career, dll.
-   Coba login ke Admin (`/admin`).

---

## Struktur Vercel
-   `vercel.json`: Mengatur agar request `/api/*` diarahkan ke backend, dan sisanya ke frontend.
-   `api/index.js`: Jembatan (bridge) agar Express App berjalan sebagai Serverless Function.
-   `package.json` (Root): Menginstal dependency backend dan frontend di root agar tersedia untuk Vercel.
