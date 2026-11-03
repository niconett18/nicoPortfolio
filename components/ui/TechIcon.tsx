import { createElement, type ComponentType, type SVGProps } from "react";
import {
  Activity,
  Binary,
  Bot,
  Braces,
  CircuitBoard,
  Code2,
  CreditCard,
  Gamepad2,
  Gauge,
  Globe,
  Layers,
  Network,
  PenTool,
  Radar,
  Router,
  ShieldCheck,
  Waypoints,
  Wifi,
  Workflow,
} from "lucide-react";
import { FaJava } from "react-icons/fa6";
import {
  SiAnsible,
  SiApachecassandra,
  SiC,
  SiCisco,
  SiCloudflare,
  SiCplusplus,
  SiDocker,
  SiExpress,
  SiFastapi,
  SiFigma,
  SiFramer,
  SiGit,
  SiGradle,
  SiIntel,
  SiJsonwebtokens,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiSpringboot,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/**
 * Brand logos where one exists (Simple Icons); otherwise a generic glyph that
 * fits the concept. Keys are lowercase stack names.
 */
const ICONS: Record<string, Icon> = {
  "next.js": SiNextdotjs,
  react: SiReact,
  supabase: SiSupabase,
  midtrans: CreditCard,
  cloudflare: SiCloudflare,
  python: SiPython,
  fastapi: SiFastapi,
  "scikit-learn": SiScikitlearn,
  typescript: SiTypescript,
  java: FaJava,
  libgdx: Gamepad2,
  "spring boot": SiSpringboot,
  postgresql: SiPostgresql,
  jwt: SiJsonwebtokens,
  gradle: SiGradle,
  vhdl: CircuitBoard,
  "intel quartus prime": SiIntel,
  modelsim: Activity,
  fsm: Workflow,
  microprogramming: Binary,
  "cisco ios": SiCisco,
  "packet tracer": SiCisco,
  vlan: Network,
  vlsm: Layers,
  dhcp: Router,
  dns: Globe,
  wlan: Wifi,
  vite: SiVite,
  express: SiExpress,
  "apache cassandra": SiApachecassandra,
  tailwindcss: SiTailwindcss,
  vercel: SiVercel,
  ospf: Waypoints,
  eigrp: Waypoints,
  "ipsec vpn": ShieldCheck,
  qos: Gauge,
  netflow: Activity,
  snmp: Radar,
  ansible: SiAnsible,
  vyos: Router,
  "framer motion": SiFramer,
  "node.js": SiNodedotjs,
  "rest apis": Braces,
  git: SiGit,
  docker: SiDocker,
  linux: SiLinux,
  "ci/cd": Workflow,
  figma: SiFigma,
  "ui/ux": PenTool,
  c: SiC,
  "c++": SiCplusplus,
};

function iconFor(name: string): Icon {
  const key = name.trim().toLowerCase();
  if (ICONS[key]) return ICONS[key];
  if (key.startsWith("qwen") || key.includes("llama")) return Bot;
  return Code2;
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  // iconFor only looks up a module-level icon component; nothing is created per render.
  return createElement(iconFor(name), { className, "aria-hidden": true });
}

/** Tech names, each with its logo. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`tech-list ${className}`.trim()} aria-label="Tech stack">
      {items.map((name) => (
        <li key={name}>
          <TechIcon name={name} className="tech-icon" />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
}
