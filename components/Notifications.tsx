import { events, pushNotifications } from "@/lib/content";
import { Logo } from "./Icons";

export function Notification({ title, body, time, className = "", style }: { title: string; body: string; time: string; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`notif ${className}`} style={style}>
      <div className="notif-icon"><Logo size={30} /></div>
      <div className="notif-body">
        <div className="notif-top"><span className="notif-title">{title}</span><span className="notif-time">{time}</span></div>
        <div className="notif-text">{body}</div>
      </div>
    </div>
  );
}

export function Notifications() {
  return (
    <section id="notifikasi" className="notify">
      <div className="wrap section">
        <div className="notify-head reveal">
          <p className="eyebrow">Notifikasi</p>
          <h2>Tahu <span className="hl">masalah</span> sebelum layu.</h2>
          <p className="lead">Alat hanya mengirim kode kejadian. Server menerjemahkannya jadi pesan berbahasa Indonesia, lalu mengirimnya ke iPhone lewat push notification. Setiap pesan mengarah ke langkah penanganan.</p>
        </div>

        <div className="notify-stage">
          <div className="lock" role="img" aria-label="Layar kunci iPhone dengan lima notifikasi HyPlant">
            <div className="lock-date">Kamis, 19 November</div>
            <div className="lock-time">09.41</div>
            {pushNotifications.map((n, i) => (
              <Notification key={n.title} {...n} className={`lock-notif lock-notif-${i + 1}`} />
            ))}
          </div>

          {events.map((e, i) => (
            <div key={e.title} className={`panel event orbit orbit-${i + 1}`}>
              <span className={`pill pill-${e.tone}`}>{e.label}</span>
              <div><b>{e.title}</b><span className="desc">{e.desc}</span></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
