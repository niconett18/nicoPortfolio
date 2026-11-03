"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

/** Live local time in Jakarta. Renders a placeholder until mounted so SSR and hydration agree. */
export default function JakartaClock({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="clock-time">{time ?? "--:--:-- --"}</span>
      <span className="clock-zone">WIB</span>
    </span>
  );
}
