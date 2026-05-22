'use client';

import dynamic from 'next/dynamic';

const Aurora = dynamic(() => import('./Aurora'), { ssr: false });

export default function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden>
      <Aurora
        colorStops={["#feffff","#5a5a5a","#ffffff"]}
        blend={1}
        amplitude={1.0}
        speed={2}
      />
      <div className="aurora-vignette" />
    </div>
  );
}
