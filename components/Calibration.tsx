"use client";

import { useEffect, useRef, useState } from "react";

// Flow from the app: Features/Calibration/CalibrationView.swift and Setup/SetupCalibrationView.swift.
// One buffer per sensor (TDS 500 ppm, pH 4.01). The device samples for about a minute and locks dosing meanwhile.
type Sensor = "tds" | "ph";

const SENSORS: Record<Sensor, { label: string; buffer: string; target: number; unit: string; decimals: number; start: number; steps: { title: string; text: string }[] }> = {
  tds: {
    label: "Sensor TDS",
    buffer: "500 ppm buffer",
    target: 500,
    unit: "ppm",
    decimals: 0,
    start: 430,
    steps: [
      { title: "Siapkan buffer", text: "Tuang larutan buffer TDS 500 ppm ke gelas bersih." },
      { title: "Celup probe", text: "Celupkan probe ke buffer dan biarkan diam sampai angkanya stabil." },
      { title: "Mulai kalibrasi", text: "Saat angka mendekati nilai buffer, tekan Mulai kalibrasi. Perintah dikirim ke alat." },
      { title: "Alat membaca", text: "Alat membaca sampel sekitar satu menit. Dosing dikunci selama itu." },
      { title: "Tersimpan", text: "Alat menerima kalibrasi dan menyimpannya. Angka TDS kini lebih akurat." },
    ],
  },
  ph: {
    label: "Sensor pH",
    buffer: "pH asam 4.01",
    target: 4.01,
    unit: "",
    decimals: 2,
    start: 4.6,
    steps: [
      { title: "Larutkan buffer", text: "Larutkan bubuk buffer pH 4.01 ke dalam air sesuai petunjuk kemasan." },
      { title: "Celup probe", text: "Celupkan probe pH ke buffer dan biarkan diam sampai angkanya stabil." },
      { title: "Mulai kalibrasi", text: "Saat angka mendekati 4.01, tekan Mulai kalibrasi. Perintah dikirim ke alat." },
      { title: "Alat membaca", text: "Alat membaca sampel sekitar satu menit. Dosing dikunci selama itu." },
      { title: "Tersimpan", text: "Alat menerima kalibrasi dan menyimpannya. Kemiringan pH diatur alat sendiri." },
    ],
  },
};

const STEP_MS = 3200;

export function Calibration() {
  const [sensor, setSensor] = useState<Sensor>("tds");
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reading, setReading] = useState<number | null>(null);
  const [percent, setPercent] = useState(0);
  const reduced = useRef(false);
  const cfg = SENSORS[sensor];

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Auto-advance through the steps, looping. Paused on hover/focus and with reduced motion.
  useEffect(() => {
    if (paused || reduced.current) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % cfg.steps.length), step === 4 ? STEP_MS * 1.3 : STEP_MS);
    return () => clearTimeout(t);
  }, [step, paused, cfg.steps.length]);

  // The live reading: nothing before the dip, drifting toward the buffer value once the probe is in.
  useEffect(() => {
    if (step === 0) { setReading(null); return; }
    if (step >= 2) { setReading(cfg.target + (step === 4 ? 0 : (cfg.decimals ? 0.03 : 4))); return; }
    let v = cfg.start;
    setReading(v);
    const id = setInterval(() => {
      v = v + (cfg.target - v) * 0.22 + (Math.random() - 0.5) * (cfg.decimals ? 0.04 : 6);
      setReading(v);
    }, 180);
    return () => clearInterval(id);
  }, [step, sensor, cfg.start, cfg.target, cfg.decimals]);

  // "Membaca x%" while the device samples.
  useEffect(() => {
    if (step !== 3) { setPercent(step > 3 ? 100 : 0); return; }
    setPercent(0);
    const started = performance.now();
    const id = setInterval(() => {
      const p = Math.min(100, Math.round(((performance.now() - started) / (STEP_MS - 300)) * 100));
      setPercent(p);
    }, 60);
    return () => clearInterval(id);
  }, [step, sensor]);

  const pick = (s: Sensor) => { setSensor(s); setStep(0); };
  const shown = reading === null ? "—" : reading.toFixed(cfg.decimals);
  const status =
    step === 0 ? { cls: "pill-off", text: "Belum dimulai" } :
    step === 1 ? { cls: "pill-idle", text: "Menunggu stabil" } :
    step === 2 ? { cls: "pill-act", text: "Mengirim ke alat" } :
    step === 3 ? { cls: "pill-act", text: `Membaca ${percent}%` } :
    { cls: "pill-ok", text: "Berhasil" };

  return (
    <section id="kalibrasi" className="wrap section calib">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">Kalibrasi</p>
          <h2>Kalibrasi sensor dalam lima langkah.</h2>
        </div>
        <p className="lead">Cukup satu buffer per sensor. Aplikasi memandu, alat yang membaca dan memutuskan hasilnya.</p>
      </div>

      <div className="calib-box" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
        <div className="calib-flow">
          <div className="seg" role="tablist" aria-label="Pilih sensor">
            {(Object.keys(SENSORS) as Sensor[]).map((s) => (
              <button key={s} role="tab" aria-selected={sensor === s} className={sensor === s ? "on" : ""} onClick={() => pick(s)}>{SENSORS[s].label}</button>
            ))}
          </div>

          <ol className="calib-steps">
            {cfg.steps.map((st, i) => (
              <li key={st.title} className={i === step ? "now" : i < step ? "done" : ""}>
                <button onClick={() => setStep(i)} aria-current={i === step ? "step" : undefined}>
                  <span className="dot">{i < step ? <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12l5 5L20 7" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg> : i + 1}</span>
                  <span className="txt"><b>{st.title}</b><span>{st.text}</span></span>
                </button>
                {i === step && !paused && <span key={`${sensor}-${step}`} className="timer" aria-hidden="true" />}
              </li>
            ))}
          </ol>
          <p className="calib-note">Kalau bacaan tidak stabil atau terlalu jauh dari buffer, alat menolak kalibrasi. Pastikan probe terendam, lalu cek ulang.</p>
        </div>

        <div className="calib-stage" aria-live="polite">
          <div className="calib-card">
            <div className="calib-top"><b>Kalibrasi {sensor === "tds" ? "TDS" : "pH"}</b><span className={`pill ${status.cls}`}>{status.text}</span></div>

            <svg className="beaker" viewBox="0 0 220 200" role="img" aria-label={`Ilustrasi probe ${step >= 1 ? "tercelup di" : "di atas"} ${cfg.buffer}`}>
              {/* probe: drops into the buffer from step 1 on */}
              <g className="probe" style={{ transform: `translateY(${step >= 1 ? 52 : 0}px)` }}>
                <path d="M110 -40 V30" stroke="#0e1a1c" strokeWidth="3" />
                <rect x="100" y="28" width="20" height="62" rx="8" fill="var(--ink)" />
                <rect x="104" y="84" width="12" height="16" rx="5" fill="var(--teal-mid)" />
              </g>
              {/* glass */}
              <path d="M52 70 V178 a14 14 0 0 0 14 14 H154 a14 14 0 0 0 14 -14 V70" fill="rgba(255,255,255,.55)" stroke="var(--active-border)" strokeWidth="3" />
              {/* liquid */}
              <path className={`liquid ${step >= 0 ? "in" : ""}`} d="M55 110 Q 82 102 110 110 T 165 110 V178 a11 11 0 0 1 -11 11 H66 a11 11 0 0 1 -11 -11 Z" fill={sensor === "tds" ? "var(--teal-soft)" : "#f4d97a"} opacity=".85" />
              {step >= 1 && step <= 3 && <g className="ripples"><circle cx="110" cy="112" r="10" /><circle cx="110" cy="112" r="10" /></g>}
              <text x="60" y="186" fontSize="11" fontWeight="700" fill="var(--ink)">{cfg.buffer}</text>
            </svg>

            <div className="calib-reading">
              <span className="num">{shown}</span>{cfg.unit && reading !== null && <span className="unit">{cfg.unit}</span>}
            </div>
            <div className="calib-bar"><span style={{ width: `${percent}%` }} /></div>

            <div className={`calib-btn ${step === 2 ? "press" : ""} ${step >= 3 ? "busy" : ""}`}>
              {step < 3 ? "Mulai kalibrasi" : step === 3 ? "Mengkalibrasi…" : "Konfirmasi Nilai"}
            </div>
            {step === 4 && (
              <div className="calib-ok">
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="var(--ok)" /><path d="M7 12.5l3.2 3.2L17 9" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Alat menerima kalibrasi dan menyimpannya.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
