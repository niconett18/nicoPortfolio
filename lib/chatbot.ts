import { projects } from "./projects";

const name = "Nicholas Edmund Tanaka";
const title = "Fullstack Developer / Computer Engineering student";
const location = "Jakarta, Indonesia";
const email = "nicholasedmund18@gmail.com";

const techStack = {
  Frontend: ["Next.js", "React", "Vite", "TypeScript", "TailwindCSS", "Framer Motion"],
  Backend: ["Node.js", "Express", "TypeScript", "PostgreSQL", "REST APIs"],
  DevOps: ["Git", "Docker", "Linux", "Vercel", "CI/CD"],
  Other: ["Figma", "UI/UX", "C", "C++", "Python", "Java"],
};

const experience = [
  {
    role: "Freelance Web Developer",
    org: "Independent",
    period: "2024 — Present",
    details: [
      "Designed and developed sumopower.id and cloudream.id from scratch — covering UI/UX, frontend, backend, and deployment.",
      "Managed full project lifecycle: client requirements gathering, implementation, and domain/hosting setup.",
      "Delivered all projects as solo builds — owning architecture, code quality, and production-readiness end-to-end.",
    ],
  },
  {
    role: "Vice Head of Creative Marketing",
    org: "EXERCISE FTUI, Universitas Indonesia",
    period: "Feb 2025 — Present",
    details: [
      "Promoted from Creative Marketing Staff based on strong performance; now mentor junior staff and oversee event promotions.",
      "Lead the creative team in digital marketing strategy, content planning, copywriting, and branding campaigns.",
    ],
  },
];

function findMatchingProjects(text: string) {
  const lower = text.toLowerCase();
  return projects.filter((p) => {
    const search = `${p.name} ${p.desc} ${p.type} ${p.stack.join(" ")} ${p.role}`.toLowerCase();
    return search.includes(lower) || lower.includes(p.name.toLowerCase());
  });
}

function getGreeting(): string {
  return (
    `Hi! I'm Nicholas's portfolio assistant. I can tell you about his projects, ` +
    `tech stack, experience, education, or how to get in touch. What would you like to know?`
  );
}

function getProjectSummary(): string {
  const client = projects.filter((p) => p.type === "Client").length;
  const personal = projects.filter((p) => p.type === "Personal").length;
  const community = projects.filter((p) => p.type === "Community").length;
  const techSet = new Set(projects.flatMap((p) => p.stack));
  const techs = [...techSet].slice(0, 6).join(", ");

  return (
    `Nicholas has built **${projects.length} projects** overall — ${client} client websites, ` +
    `${personal} personal concept builds, and ${community} community project. Every project was ` +
    `designed, developed, and deployed end to end as a solo build.\n\n` +
    `His core stack across projects is ${techs}, and he manages the full lifecycle from requirements ` +
    `through deployment and hosting.\n\n` +
    `The three most recent client projects are **[Prime Capital Ledger](https://primecapitaledger.site)**, ` +
    `**[sumopower.id](https://sumopower.id)**, and **[cloudream.id](https://cloudream.id)**. ` +
    `Want details on any specific project?`
  );
}

function getTechStackResponse(): string {
  const lines = Object.entries(techStack)
    .map(([cat, items]) => `- **${cat}:** ${items.join(", ")}`)
    .join("\n");

  return (
    `Nicholas works across the full stack:\n\n${lines}\n\n` +
    `He's strongest in the **Next.js + TypeScript + TailwindCSS** ecosystem for frontend work, ` +
    `and comfortable with Node.js, PostgreSQL, and REST APIs on the backend. ` +
    `He also knows C, C++, Python, and Java from his Computer Engineering studies.`
  );
}

function getExperienceResponse(): string {
  return (
    `${name} is a ${title} based in ${location}.\n\n` +
    experience
      .map(
        (exp) =>
          `**${exp.role}** — ${exp.org} (${exp.period})\n` +
          exp.details.map((d) => `- ${d}`).join("\n")
      )
      .join("\n\n") +
    `\n\nHe's currently open to freelance work, internships, and interesting product collaborations.`
  );
}

function getProjectDetail(project: (typeof projects)[0]): string {
  return (
    `**[${project.name}](${project.url})** — ${project.desc}\n\n` +
    `**Role:** ${project.role}  \n**Type:** ${project.type}  \n**Year:** ${project.year}\n\n` +
    `**Stack:** ${project.stack.join(", ")}\n\n` +
    `**Highlights:**\n` +
    project.highlights.map((h) => `- ${h}`).join("\n")
  );
}

function getContactResponse(): string {
  return (
    `The best way to reach Nicholas is via email at **${email}**. ` +
    `He's based in ${location} and is open to freelance projects, internships, ` +
    `and interesting product work. You can also check out his GitHub and Instagram ` +
    `via the links in the site header.`
  );
}

export function respond(userMessage: string): string {
  const text = userMessage.trim().toLowerCase();

  if (!text || /^(hi|hello|hey|hai|halo|greetings)\b/.test(text)) {
    return getGreeting();
  }

  if (/\b(thank|thanks|terima kasih|makasih)\b/.test(text)) {
    return "You're welcome! Feel free to ask anything else about Nicholas's work, experience, or tech stack. I'm here to help.";
  }

  if (
    /\b(tech|stack|technology|framework|library|tool|language|programming)\b/.test(text) ||
    (text.includes("what") && /\b(use|using|build|built)\b/.test(text))
  ) {
    return getTechStackResponse();
  }

  if (/\b(contact|email|reach|hire|freelance|collaborate|intern)\b/.test(text)) {
    return getContactResponse();
  }

  if (/\b(project|build|website|site|app|application|product|work|portfolio)\b/.test(text)) {
    if (/\b(all|every|list|overview|summary|many|how many)\b/.test(text)) {
      return getProjectSummary();
    }

    const matches = findMatchingProjects(text);
    if (matches.length > 0) {
      return matches.map((p) => getProjectDetail(p)).join("\n\n---\n\n");
    }

    return getProjectSummary();
  }

  if (/\b(experience|background|work|job|career|history|about)\b/.test(text)) {
    return getExperienceResponse();
  }

  if (/\b(education|university|campus|study|student|major|degree)\b/.test(text)) {
    return (
      `${name} is currently pursuing a **B.Eng. in Computer Engineering** at ` +
      `**Universitas Indonesia** (2024 — 2028). He's engaged in academic projects, ` +
      `extracurricular activities, and research across computer engineering, with a focus ` +
      `on systems, software, and applied web technologies.`
    );
  }

  if (/\b(skill|expertise|competent|know|proficient)\b/.test(text)) {
    return getTechStackResponse();
  }

  const matchedTech = findMatchingProjects(text);
  if (matchedTech.length > 0) {
    const tech = matchedTech[0].stack[0];
    const usingProjects = projects.filter((p) =>
      p.stack.some((s) => s.toLowerCase() === tech.toLowerCase())
    );
    if (usingProjects.length > 0) {
      const projectLinks = usingProjects
        .map((p) => `[${p.name}](${p.url})`)
        .join(", ");
      return (
        `Nicholas uses **${tech}** in projects like ${projectLinks}. ` +
        `He's built production applications with this technology ` +
        `as part of his solo fullstack workflow.`
      );
    }
  }

  return (
    `I'm not sure I understand that question. Here's what I can tell you about:\n\n` +
    `- **Projects** — ask about specific projects or see a full overview\n` +
    `- **Tech stack** — what frameworks, languages, and tools Nicholas uses\n` +
    `- **Experience** — his work background and freelancing\n` +
    `- **Contact** — how to reach him for work or collaboration\n\n` +
    `What would you like to know?`
  );
}
