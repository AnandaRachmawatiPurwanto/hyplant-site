import Image from "next/image";

export function Logo({ size = 28 }: { size?: number }) {
  return <Image src="/img/logo.png" alt="" width={size} height={size} />;
}

const stroke = { stroke: "currentColor", strokeWidth: 1.8, fill: "none", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function FeatureIcon({ name }: { name: string }) {
  const p = { width: 36, height: 36, viewBox: "0 0 24 24", "aria-hidden": true, style: { color: "var(--brand)" } };
  switch (name) {
    case "drop":
      return <svg {...p}><path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" {...stroke} /></svg>;
    case "sliders":
      return <svg {...p}><path d="M4 7h10M18 7h2M4 17h4M12 17h8" {...stroke} /><circle cx="16" cy="7" r="2.2" {...stroke} /><circle cx="10" cy="17" r="2.2" {...stroke} /></svg>;
    case "sprout":
      return <svg {...p}><path d="M12 20V10M12 13c-3 0-6-2-6-6 3 0 6 2 6 6zm0-2c0-3 2-6 6-6 0 3-2 6-6 6z" {...stroke} /></svg>;
    case "bell":
      return <svg {...p}><path d="M6 10a6 6 0 0 1 12 0v4l2 3H4l2-3v-4zM10 20h4" {...stroke} /></svg>;
    case "chart":
      return <svg {...p}><path d="M5 5h14M5 10h14M5 15h9M5 20h6" {...stroke} /></svg>;
    case "qr":
      return <svg {...p}><rect x="4" y="4" width="6" height="6" rx="1" {...stroke} /><rect x="14" y="4" width="6" height="6" rx="1" {...stroke} /><rect x="4" y="14" width="6" height="6" rx="1" {...stroke} /><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" {...stroke} /></svg>;
    default:
      return null;
  }
}
