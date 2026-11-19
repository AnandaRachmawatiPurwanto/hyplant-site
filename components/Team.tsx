"use client";

import Image from "next/image";
import { useState } from "react";
import { team } from "@/lib/content";

const ALL = "Semua";

/** Dark team block: title and group filter on the left, portrait cards on the right. */
export function Team() {
  const [group, setGroup] = useState(ALL);
  const groups = [ALL, ...team.map((g) => g.group)];
  const members = team.flatMap((g) => g.members.map((m) => ({ ...m, group: g.group })));

  return (
    <section id="tim" className="team-section">
      <div className="wrap team-inner">
        <div className="team-side reveal">
          <p className="eyebrow on-dark">Tim</p>
          <h2>Kenalan dengan tim kami.</h2>
          <div className="chips" role="group" aria-label="Saring tim">
            {groups.map((g) => (
              <button key={g} className={g === group ? "chip on" : "chip"} aria-pressed={g === group} onClick={() => setGroup(g)}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <ul className="team-grid">
          {members.map((m) => {
            const shown = group === ALL || m.group === group;
            return (
              <li key={m.name} className={`person ${shown ? "" : "dim"}`} data-group={m.group} aria-hidden={!shown}>
                <div className="portrait">
                  {m.photo
                    ? <Image src={m.photo} alt={m.name} fill sizes="(max-width: 700px) 50vw, 260px" />
                    : <span className="portrait-initial" aria-hidden="true">{m.name[0]}</span>}
                  <span className="portrait-tag">{m.group}</span>
                </div>
                <b>{m.name}</b>
                <span>{m.role}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
