import { sensors } from "@/lib/content";
import { Notification } from "./Notifications";

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="wrap section" style={{ paddingBottom: 80 }}>
      <div className="reveal" style={{ maxWidth: 760, marginBottom: 56 }}>
        <p className="eyebrow">Cara kerja</p>
        <h2>Keputusan dosis dibuat di alat. <span style={{ color: "var(--brand)" }}>Tetap jalan walau internet putus.</span></h2>
      </div>

      <div className="steps">
        <article className="step">
          <div className="step-text">
            <span className="step-num">01</span>
            <h3>Sensor membaca larutan</h3>
            <p>Probe TDS, pH, sensor suhu DS18B20, dan ultrasonik HC-SR04 untuk level tandon. Bacaan dikirim ke server sekitar tiap 10 detik.</p>
          </div>
          <div className="step-visual sensor-grid">
            {sensors.map((s) => (
              <div key={s.name} className="panel sensor">
                <div className="sensor-top"><span>{s.name}</span><span className="pill pill-ok">{s.status}</span></div>
                <div className="sensor-value">{s.value}{s.unit && (s.unit === "%" ? s.unit : ` ${s.unit}`)}</div>
              </div>
            ))}
          </div>
        </article>

        <article className="step">
          <div className="step-text">
            <span className="step-num" style={{ color: "var(--brand-dark)" }}>02</span>
            <h3>ESP32-C6 memutuskan dosis</h3>
            <p style={{ color: "#2e3a3d" }}>Aturan berbasis ambang berjalan langsung di perangkat. Perintah dari aplikasi hanya meminta, dan selalu dicek ulang oleh pengaman lokal sebelum pompa menyala.</p>
          </div>
          <pre className="step-visual code" aria-label="Aturan dosing di perangkat"><code>
<span className="v">tanaman</span> = Selada Hijau · Vegetatif{"\n"}
<span className="v">rentang</span> = 560–840 ppm{"\n"}
<span className="k">if</span> TDS &lt; batas dosis <span className="m">→</span> pompa A, campur, pompa B{"\n"}
<span className="k">then</span> cooldown <span className="m">→</span> baca TDS lagi{"\n"}
<span className="k">max</span> 3 siklus, lalu berhenti dan lapor
          </code></pre>
        </article>

        <article className="step">
          <div className="step-text">
            <span className="step-num">03</span>
            <h3>Pompa A dan B bergantian</h3>
            <p>Paling banyak satu pompa menyala sekaligus. Ada jeda campur di antara A dan B, jadi larutan merata sebelum TDS dibaca ulang.</p>
          </div>
          <div className="step-visual pump-list">
            <div className="pump-head"><span>Dosing Nutrisi</span><span className="pill pill-act">Aktif</span></div>
            <div className="pump">
              <div className="pump-row"><b>Dosing nutrisi A</b><span style={{ color: "var(--ok)", fontWeight: 600 }}>Selesai</span></div>
              <div className="bar"><span className="fill" style={{ width: "100%", background: "var(--brand)" }} /></div>
              <span className="pump-sub">Pompa A mengalirkan nutrisi</span>
            </div>
            <div className="pump">
              <div className="pump-row"><b>Mixing nutrisi A</b><span style={{ color: "var(--act)", fontWeight: 600 }}>Sisa 0:02</span></div>
              <div className="bar"><span className="fill" style={{ width: "60%", background: "var(--teal-mid)" }} /></div>
              <span className="pump-sub">Jeda agar nutrisi A larut</span>
            </div>
            <div className="pump waiting">
              <div className="pump-row"><b>Dosing nutrisi B</b><span style={{ color: "var(--text-3)", fontWeight: 600 }}>Menunggu</span></div>
              <div className="bar" />
              <span className="pump-sub">Pompa B mengalirkan nutrisi</span>
            </div>
          </div>
        </article>

        <article className="step">
          <div className="step-text">
            <span className="step-num">04</span>
            <h3>Tahu masalah sebelum layu</h3>
            <p>Notifikasi push saat dosing berjalan atau saat nilai keluar ambang, lengkap dengan panduan penanganan di aplikasi.</p>
          </div>
          <div className="step-visual notif-stack">
            <Notification title="Dosing Nutrisi Dimulai" body="Nilai TDS di bawah target. Pompa sedang menambahkan nutrisi ke tandon pencampuran." time="Baru saja" />
            <Notification title="Nilai pH Greenhouse A Menurun" body="Nilai pH mengalami penurunan. Periksa panduan penanganan." time="Baru saja" className="pulse" />
          </div>
        </article>
      </div>
    </section>
  );
}
