# Budget Monitoring & Approval System

Prototype website berdasarkan **Preparation Business Logic – Budget Monitoring & Approval System**.

## Stack
- React
- Vite
- Lucide React
- CSS
- LocalStorage untuk simulasi database/session

## Menjalankan di VS Code

Pastikan Node.js sudah terpasang.

```bash
npm install
npm run dev
```

Kemudian buka URL yang diberikan Vite, biasanya:

`http://localhost:5173`

## Akun Demo

### Admin Biro / Pengusul
- Username: `admin.biro`
- Password: `123456`
- Funds Center: `210 – BIRO INTERNAL AUDIT`

Akses:
- Dashboard budget biro
- Detail budget
- Buat request
- Melihat status request
- Melihat histori

### Admin Pusat / Approval
- Username: `admin.pusat`
- Password: `123456`

Akses:
- Dashboard seluruh budget
- Kelola budget
- Pembukaan budget
- Realokasi
- Review request
- Approve / Reject
- Laporan
- Audit trail

## Business Logic yang disimulasikan

### Formula
- Available Amount = Consumable Budget - Consumed Budget
- Approval Hold Amount = Current Budget - Consumable Budget
- Current Budget = Consumed Budget + Available Amount + Approval Hold Amount

### Validasi
- Current Budget >= Consumable Budget
- Consumable Budget >= Consumed Budget
- Consumed Budget >= 0
- Available Amount >= 0
- Approval Hold Amount >= 0

### Request
Request baru berstatus `Pending`.

### Approval
Jika `Approved`, Consumed Budget bertambah sesuai nominal request.
Jika `Rejected`, budget tidak berubah dan alasan penolakan disimpan.

### Pembukaan Budget
Opening Amount tidak boleh melebihi Approval Hold Amount.

### Realokasi
Prototype mensyaratkan Commitment Item sumber dan tujuan sama. Available Amount sumber harus mencukupi.

### Audit Trail
Aktivitas pengajuan, approval, rejection, pembukaan budget, dan realokasi dicatat ke histori.

## Catatan Penting

Ini adalah **prototype frontend yang sudah interaktif**, bukan production system. Password dan data masih berada di frontend/localStorage untuk keperluan demo.

Untuk implementasi production:
1. Gunakan backend/API.
2. Password wajib disimpan sebagai hash.
3. Gunakan database PostgreSQL/Supabase/MySQL sesuai arsitektur yang dipilih.
4. Authorization harus diperiksa di server, bukan hanya frontend.
5. Transaction update budget harus atomic/database transaction.
6. Audit trail sebaiknya append-only.
7. Tambahkan approval policy dan validasi realokasi sesuai aturan perusahaan.
8. Integrasikan source data SAP jika sudah tersedia.

## Struktur

```text
budget-monitoring-approval/
├── index.html
├── package.json
├── README.md
└── src/
    ├── main.jsx
    └── styles.css
```
