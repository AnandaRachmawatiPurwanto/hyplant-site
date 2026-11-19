// All copy and sample data for the site. Texts marked "from app" are copied from the iOS app
// (Berkelompok repo, iOS-app/DesignSystem/Strings.swift and supabase/functions/send-push).

export type PillTone = "ok" | "idle" | "act" | "crit" | "off";

export const contact = {
  email: "[EMAIL]",
  location: "[LOKASI]",
  instagram: "[INSTAGRAM]",
  instagramUrl: "#",
};

export const sensors = [
  { name: "TDS", value: "850", unit: "ppm", status: "Optimal" },
  { name: "pH", value: "6.1", unit: "", status: "Optimal" },
  { name: "Suhu air", value: "22", unit: "°C", status: "Optimal" },
  { name: "Level tandon", value: "78", unit: "%", status: "Normal" },
];

// Lock-screen push notifications. The last three are what send-push sends today;
// the first two come from the onboarding design.
export const pushNotifications = [
  { title: "Dosing Nutrisi Dimulai", body: "Nilai TDS di bawah target. Pompa sedang menambahkan nutrisi ke tandon pencampuran.", time: "Baru saja" },
  { title: "Nilai pH Greenhouse A Menurun", body: "Nilai pH mengalami penurunan. Periksa panduan penanganan.", time: "5 mnt lalu" },
  { title: "Nutrisi A Tidak Mencukupi", body: "Nutrisi A tidak dapat dipompakan. Isi ulang botol pekat Nutrisi A.", time: "1 jam lalu" },
  { title: "Sensor TDS Tidak Terhubung", body: "TDS tidak terdeteksi. Periksa langkah penanganan sensor.", time: "07.12" },
  { title: "Perangkat HyPlant Offline", body: "Perangkat tidak mengirim data. Periksa daya dan koneksi Wi-Fi.", time: "Kemarin" },
];

export const events: { tone: PillTone; label: string; title: string; desc: string }[] = [
  { tone: "act", label: "Dosing", title: "TDS turun di bawah target", desc: "Pompa mulai menambah nutrisi, dan Anda diberi tahu saat itu juga." },
  { tone: "crit", label: "Kritis", title: "pH atau suhu keluar ambang", desc: "Contoh: pH 4.5 pada Selada. Panduan menyarankan pH Up 4 mL, aduk, lalu tunggu 15–30 menit." },
  { tone: "crit", label: "Sensor", title: "Sensor TDS tidak terbaca", desc: "Dosing otomatis tertahan sampai bacaan valid lagi." },
  { tone: "idle", label: "Stok", title: "Botol pekat A atau B habis", desc: "Pompa tidak bisa mengalirkan nutrisi. Isi ulang botol yang disebut." },
  { tone: "off", label: "Terputus", title: "Perangkat berhenti mengirim data", desc: "Cek daya dan Wi-Fi. Nilai di app ditandai sebagai data terakhir, bukan kondisi saat ini." },
];

export const features = [
  { icon: "drop", title: "Dosing A/B otomatis", text: "Alat menambah Nutrisi A lalu B saat TDS di bawah batas dosis, menuju target yang Anda pilih." },
  { icon: "sliders", title: "Kalibrasi terpandu", text: "Satu buffer per sensor (TDS 500 ppm, pH 4.01). Alat yang membaca dan menyimpan hasilnya." },
  { icon: "sprout", title: "Ambang per umur tanam", text: "Pilih tanaman dan tanggal tanam. Rentang TDS ikut berganti dari bibit, vegetatif, sampai menjelang panen." },
  { icon: "bell", title: "Peringatan dan panduan", text: "Notifikasi saat nilai kritis atau ESP terputus, plus langkah penanganan yang bisa langsung diikuti." },
  { icon: "chart", title: "Riwayat dosis", text: "Log setiap siklus dosing beserta jumlah Nutrisi A dan B, dalam 24 jam, 7 hari, atau 30 hari." },
  { icon: "qr", title: "Pasang lewat QR", text: "Scan QR di perangkat untuk menghubungkan alat ke akun, lalu ikuti setup tandon, selang, dan kalibrasi." },
] as const;

export const appTabs = [
  { name: "Pantau", desc: "Sensor dan status ESP" },
  { name: "Tanaman", desc: "Jenis, umur, target TDS" },
  { name: "Dosing", desc: "Status pompa, jeda, lanjut" },
  { name: "Riwayat", desc: "Log dosing dan kalibrasi" },
];

// Real screenshots from the app (Release build, sample data), branch pairing-link @ 4ccd1e2.
export const screens = [
  { src: "/img/screens/onboarding.png", tag: "Onboarding", title: "Kenalan dulu", desc: "Tiga halaman pembuka: pantau dari mana saja, tahu masalah sebelum layu, nutrisi diatur otomatis.", alt: "Halaman onboarding: Pantau Greenhouse dari mana saja" },
  { src: "/img/screens/setup.png", tag: "Setup", title: "Siapkan komponen", desc: "Tujuh langkah terpandu: komponen, QR, sensor, selang, tandon, sampai kalibrasi.", alt: "Layar setup Siapkan Komponen, langkah 1 dari 7" },
  { src: "/img/screens/plants.png", tag: "Tanaman", title: "Target per tanaman", desc: "Selada Hijau umur 18 hari, fase vegetatif. TDS, pH, dan suhu air direkomendasikan otomatis.", alt: "Tab Tanaman: Selada Hijau 18 hari vegetatif, TDS 560 sampai 840 ppm, pH 5,5 sampai 6,5, suhu air 20 sampai 25 derajat" },
  { src: "/img/screens/dosing.png", tag: "Dosing", title: "Kenapa alat dosing", desc: "Status pompa, alasan alat dosing atau tidak, dan tombol jeda atau lanjutkan otomasi.", alt: "Tab Dosing: TDS berada dalam range, otomasi dijeda, TDS saat ini 845 ppm" },
  { src: "/img/screens/history.png", tag: "Riwayat", title: "Log setiap siklus", desc: "Dosis Nutrisi A dan B per siklus, berhasil atau gagal.", alt: "Tab Riwayat: daftar dosing hari ini, tiga berhasil dan satu gagal" },
  { src: "/img/screens/monitor-offline.png", tag: "Peringatan", title: "Perangkat terputus", desc: "Kartu meredup, data ditandai sebagai data terakhir, dan panduan menyambung ulang langsung ditawarkan.", alt: "Tab Pantau saat perangkat offline dengan peringatan Koneksi Perangkat Terputus" },
  { src: "/img/screens/monitor-invalid.png", tag: "Peringatan", title: "Sensor TDS tidak terdeteksi", desc: "Sensor yang bermasalah ditandai Terputus, sensor lain tetap tampil normal.", alt: "Tab Pantau dengan peringatan Sensor TDS Tidak Terdeteksi" },
];

// From Plant.catalog in the app. TDS is capped at 980 ppm, the most the device accepts.
export const plants = [
  { name: "Selada Hijau", img: "/img/plants/selada.png", stages: "Bibit · Vegetatif · Menjelang panen", tds: "420–850 ppm" },
  { name: "Bayam Hijau", img: "/img/plants/bayam.png", stages: "Bibit · Vegetatif · Menjelang panen", tds: "420–980 ppm" },
  { name: "Kangkung", img: "/img/plants/kangkung.png", stages: "Bibit · Vegetatif", tds: "420–980 ppm" },
  { name: "Kale", img: "/img/plants/kale.png", stages: "Bibit · Vegetatif · Menjelang panen", tds: "420–980 ppm" },
  { name: "Tomat Cherry", img: "/img/plants/tomat.png", stages: "Bibit · Vegetatif · Generatif", tds: "420–980 ppm" },
  { name: "Paprika", img: "/img/plants/paprika.png", stages: "Bibit · Vegetatif · Generatif", tds: "420–980 ppm" },
];

export const tickerWords = ["TDS", "pH", "Suhu air", "Level tandon", "Nutrisi A", "Nutrisi B", "Kalibrasi", "Riwayat"];

// Team, grouped by area. Add `photo: "/img/team/<name>.jpg"` to show a photo instead of initials.
export const team: { group: string; members: { name: string; role: string; photo?: string }[] }[] = [
  { group: "Produk", members: [{ name: "Sabila", role: "Project Manager" }] },
  {
    group: "Desain",
    members: [
      { name: "Amanda", role: "Product Designer" },
      { name: "Rahmi", role: "UI/UX Designer · Aplikasi" },
    ],
  },
  {
    group: "Teknologi",
    members: [
      { name: "Clarissa", role: "Tech Lead" },
      { name: "Clarawita", role: "iOS Developer" },
      { name: "Ananda", role: "IoT Engineer" },
    ],
  },
];
