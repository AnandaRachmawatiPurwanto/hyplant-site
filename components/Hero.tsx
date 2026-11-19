import { Logo } from "./Icons";

const WORD = "HyPlant".split("");

function Letters() {
  return WORD.map((c, i) => (
    <span key={i} className="ch" style={{ animationDelay: `${i * 60}ms` }}>{c}</span>
  ));
}

export function Nav() {
  return (
    <>
      <div className="progress" aria-hidden="true" />
      <header className="nav-shell">
        <nav className="nav" aria-label="Navigasi utama">
          <a className="nav-brand" href="#top"><Logo size={30} />HyPlant</a>
          <a className="nav-link hide-sm" href="#cara-kerja">Cara kerja</a>
          <a className="nav-link" href="#notifikasi">Notifikasi</a>
          <a className="nav-link hide-sm" href="#kalibrasi">Kalibrasi</a>
          <a className="nav-link hide-sm" href="#aplikasi">Aplikasi</a>
          <a className="nav-link hide-sm" href="#tanaman">Tanaman</a>
          <a className="btn btn-brand" href="#video">Tonton video</a>
        </nav>
      </header>
    </>
  );
}

/** Pinned intro: scrolling fills the tank, lights up the sensors, then opens the page. */
export function Hero() {
  return (
    <section id="top" className="intro" aria-label="Pembuka HyPlant">
      <div className="intro-pin">
        <div className="intro-grid" aria-hidden="true" />

        <div className="water" aria-hidden="true">
          <svg className="wave" viewBox="0 0 1200 24" preserveAspectRatio="none">
            <path d="M0 12 Q 75 0 150 12 T 300 12 T 450 12 T 600 12 T 750 12 T 900 12 T 1050 12 T 1200 12 V24 H0 Z" fill="var(--brand)" />
          </svg>
        </div>

        <div className="hoses" aria-hidden="true">
          <div className="hose hose-a">
            <span className="hose-label" style={{ color: "#9be07a" }}>NUTRISI A</span>
            <span className="drop drop-a" style={{ background: "var(--leaf)" }} />
          </div>
          <div className="hose hose-b">
            <span className="hose-label" style={{ color: "var(--teal-light)" }}>NUTRISI B</span>
            <span className="drop drop-b" style={{ background: "var(--teal-light)" }} />
          </div>
        </div>

        <div className="wordmark-box">
          <div className="wordmark">
            <div className="wordmark-outline" aria-hidden="true"><Letters /></div>
            <h1 className="wordmark-fill"><Letters /></h1>
          </div>
        </div>

        <div className="intro-tag">
          <div>HYPLANT / AUTODOSING HIDROPONIK</div>
          <div>ESP32-C6 · 4 SENSOR · POMPA A + B</div>
        </div>

        <dl className="readout" aria-label="Contoh pembacaan sensor: TDS 850 ppm, pH 6.1, suhu air 22 derajat, tandon 78 persen">
          {[["TDS", "850 ppm"], ["pH", "6.1"], ["SUHU AIR", "22°C"], ["TANDON", "78%"]].map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd><span className="boot-off">--.-</span><span className="boot-on">{v}</span></dd>
            </div>
          ))}
        </dl>

        <div className="hint">
          <span className="mouse bob"><span /></span>
          Scroll untuk mulai dosing
        </div>

        <div className="headline">
          <p className="headline-title">Nutrisi diatur <span className="hl-dark">otomatis</span>, sesuai umur tanam.</p>
          <div className="headline-side">
            <p>HyPlant membaca TDS, pH, suhu air, dan level tandon, lalu menambah Nutrisi A dan B sendiri saat TDS turun di bawah batas tanaman Anda.</p>
            <a className="btn btn-lime" href="#video">Tonton video</a>
          </div>
        </div>

        <div className="reveal-circle" aria-hidden="true">
          <p>Empat sensor. Dua pompa. <span className="hl">Nol tebakan.</span></p>
        </div>
      </div>
    </section>
  );
}
