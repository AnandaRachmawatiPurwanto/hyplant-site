import Image from "next/image";
import { appTabs, contact, features, plants, screens, tickerWords } from "@/lib/content";
import { FeatureIcon } from "./Icons";

export function Ticker() {
  const row = [...tickerWords, ...tickerWords];
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {row.map((w, i) => (
          <span key={i} style={{ display: "contents" }}>
            <span>{w}</span>
            <svg className="star" viewBox="0 0 24 24"><path d="M12 1c.9 6.5 4.5 10.1 11 11-6.5.9-10.1 4.5-11 11-.9-6.5-4.5-10.1-11-11 6.5-.9 10.1-4.5 11-11z" fill="currentColor" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="fitur" className="wrap section">
      <div className="section-head reveal">
        <h2 style={{ maxWidth: 680 }}>Pantau kondisi <span className="hl">hidroponik</span> dari mana saja.</h2>
        <p className="lead">Untuk petani hidroponik rumahan sampai greenhouse kecil.</p>
      </div>
      <div className="features">
        {features.map((f) => (
          <div key={f.title} className="panel feature reveal lift">
            <FeatureIcon name={f.icon} />
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function AppShowcase() {
  return (
    <section id="aplikasi" className="app">
      <div className="wrap app-inner">
        <div className="app-copy reveal">
          <p className="eyebrow on-dark">Aplikasi iOS</p>
          <h2>Satu layar untuk <span className="hl-dark">seluruh tandon</span>.</h2>
          <p>Tab Pantau menampilkan TDS, pH, suhu air, dan status dosing. Setiap status selalu punya label teks, jadi tidak bergantung pada warna saja.</p>
          <div className="legend">
            <span className="pill pill-ok">Optimal</span>
            <span className="pill pill-idle">Siaga</span>
            <span className="pill pill-act">Aktif</span>
            <span className="pill pill-crit">Kritis</span>
            <span className="pill pill-off">Terputus</span>
          </div>
          <div className="tabs">
            {appTabs.map((t) => <div key={t.name}><b>{t.name}</b><span>{t.desc}</span></div>)}
          </div>
        </div>
        <div className="app-phone">
          <div className="shot big parallax">
            <Image src="/img/screens/monitor.png" width={600} height={1304} sizes="320px" priority={false}
              alt="Tab Pantau di aplikasi HyPlant: Selada Hijau di Greenhouse A, ESP terhubung, TDS 845 ppm, pH 6,1, suhu air 21,4 derajat, semua optimal, Dosing Nutrisi siaga" />
          </div>
          <div className="float-card float" aria-hidden="true">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 600, fontSize: 13 }}>pH <span className="pill pill-crit">Kritis</span></div>
            <div className="v">4.5</div>
            <div style={{ fontSize: 12 }}>12 detik lalu</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Screens() {
  return (
    <section id="layar" className="wrap wrap-wide section" style={{ paddingBottom: 40 }}>
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">Di dalam aplikasi</p>
          <h2>Dari pasang alat sampai panen.</h2>
        </div>
        <p className="lead">Tangkapan layar asli aplikasi HyPlant untuk iOS, dijalankan dengan data contoh.</p>
      </div>
      <div className="screens">
        {screens.map((s) => (
          <figure key={s.src} className="screen reveal">
            <div className="shot lift">
              <Image src={s.src} alt={s.alt} width={600} height={1304} sizes="280px" />
            </div>
            <figcaption>
              <span className="tag">{s.tag}</span>
              <b>{s.title}</b>
              <span>{s.desc}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function Plants() {
  return (
    <section id="tanaman" className="wrap section">
      <div className="reveal" style={{ maxWidth: 720, marginBottom: 48 }}>
        <p className="eyebrow">Tanaman</p>
        <h2 style={{ marginBottom: 16 }}>Enam tanaman, ambang per fase tumbuh.</h2>
        <p className="lead">Rentang TDS diambil dari tabel EC hidroponik dan studi AB mix di Indonesia, dibatasi 980 ppm sesuai batas yang diterima alat.</p>
      </div>
      <div className="plants">
        {plants.map((p) => (
          <div key={p.name} className="plant reveal lift">
            <div className="plant-photo"><Image src={p.img} alt={p.name} width={400} height={300} sizes="240px" /></div>
            <div className="plant-info">
              <h3>{p.name}</h3>
              <span className="stages">{p.stages}</span>
              <span className="tds">{p.tds}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <>
      <section id="kontak" className="wrap" style={{ paddingBottom: 120 }}>
        <div className="cta reveal">
          <div className="cta-copy">
            <h2>Biarkan HyPlant yang <span className="hl-dark">menakar</span>.</h2>
            <p>Punya pertanyaan atau mau kerja sama? Ngobrol dengan tim kami.</p>
          </div>
          <div className="cta-actions">
            <a className="btn btn-lime" href={`mailto:${contact.email}`}>Hubungi kami</a>
            <a className="btn btn-ghost" href={contact.instagramUrl}>{contact.instagram}</a>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap">
          <span>© 2026 HyPlant · Autodosing hidroponik. Status: prototipe.</span>
          <span>{contact.email} · {contact.location}</span>
        </div>
      </footer>
    </>
  );
}
