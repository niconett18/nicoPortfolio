"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { Code2, Globe, Maximize2, Play, Search } from "lucide-react";
import { projects, type Project } from "../../lib/projects";
import FadeIn from "../motion/FadeIn";
import ProjectModal from "../projects/ProjectModal";
import ProjectThumb from "../projects/ProjectThumb";
import SectionHead from "../ui/SectionHead";
import { TechList } from "../ui/TechIcon";

type Filter = {
  id: string;
  label: string;
  match: (p: Project) => boolean;
};

const TYPE_ORDER: Project["type"][] = ["Client", "Hackathon", "Academic", "Personal", "Community"];

const ALL_FILTERS: Filter[] = [
  { id: "all", label: "All projects", match: () => true },
  { id: "featured", label: "Featured", match: (p) => p.featured },
  ...TYPE_ORDER.map((type) => ({ id: type.toLowerCase(), label: type, match: (p: Project) => p.type === type })),
  { id: "finpro", label: "Final projects", match: (p) => Boolean(p.finalProject) },
];

/** Only offer filters that match at least one project. */
const FILTERS = ALL_FILTERS.filter((f) => projects.some(f.match));

const isGithub = (url: string) => /github\.com/i.test(url);

function matchesQuery(p: Project, q: string) {
  if (!q) return true;
  const haystack = [p.name, p.desc, p.role, p.type, p.year, p.finalProject ?? "", p.team ?? "", ...p.stack]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

function ProjectRow({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) {
  const open = () => onOpen(project);
  const hasDemo = Boolean(project.demo || project.video);
  return (
    <li className="proj">
      <button
        type="button"
        className="proj-thumb"
        onClick={open}
        aria-label={`Open ${project.name} details`}
      >
        <ProjectThumb project={project} />
      </button>

      <div className="proj-meta">
        <p className="proj-when">
          <span>{project.year}</span>
          <span className="status-dot" aria-hidden="true" />
          <span>{project.status}</span>
        </p>
        <h3 className="proj-title">
          <button type="button" onClick={open}>
            {project.name}
          </button>
        </h3>
        <p className="proj-org">
          {project.type} · {project.role}
        </p>
        {(project.finalProject || project.team) && (
          <p className="proj-note">
            {project.finalProject ? `Final project · ${project.finalProject}` : project.team}
          </p>
        )}
      </div>

      <div className="proj-detail">
        <p className="proj-desc">{project.desc}</p>
        <TechList items={project.stack} className="proj-stack" />
        <div className="proj-actions">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={
                isGithub(project.url)
                  ? `View ${project.name} source on GitHub`
                  : `Visit ${project.name}`
              }
              title={isGithub(project.url) ? "Source code" : "Visit site"}
            >
              {isGithub(project.url) ? (
                <Code2 size={17} strokeWidth={1.75} />
              ) : (
                <Globe size={17} strokeWidth={1.75} />
              )}
            </a>
          )}
          <button
            type="button"
            className="icon-btn"
            onClick={open}
            aria-label={hasDemo ? `Watch ${project.name} demo` : `Open ${project.name} details`}
            title={hasDemo ? "Watch demo" : "Details"}
          >
            {hasDemo ? (
              <Play size={16} strokeWidth={1.75} />
            ) : (
              <Maximize2 size={16} strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

export default function ProjectsSection({ standalone = false }: { standalone?: boolean }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [filterId, setFilterId] = useState(standalone ? "all" : "featured");
  const [query, setQuery] = useState("");
  const searchId = useId();
  const close = useCallback(() => setSelected(null), []);

  const filter = FILTERS.find((f) => f.id === filterId) ?? FILTERS[0];
  const visible = useMemo(
    () => projects.filter((p) => filter.match(p) && matchesQuery(p, query.trim())),
    [filter, query],
  );

  const clientCount = projects.filter((p) => p.type === "Client").length;
  const finproCount = projects.filter((p) => p.finalProject).length;

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead
          title="Designed and built"
          titleMuted="end to end."
          lead="Production work for real clients alongside self-initiated builds — every project designed, developed, and deployed end to end."
          level={standalone ? "h1" : "h2"}
          aside={
            <label className="search" htmlFor={searchId}>
              <Search size={16} strokeWidth={1.75} aria-hidden="true" />
              <span className="sr-only">Search projects</span>
              <input
                id={searchId}
                type="search"
                placeholder="Search all projects"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
          }
        />

        <FadeIn>
          <div className="tabs tabs--ruled" role="group" aria-label="Filter projects">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={f.id === filter.id}
                className={`tab${f.id === filter.id ? " is-active" : ""}`}
                onClick={() => setFilterId(f.id)}
              >
                {f.label}
                <span className="tab-count">{projects.filter(f.match).length}</span>
              </button>
            ))}
          </div>

          <p className="proj-count" aria-live="polite">
            {visible.length} {visible.length === 1 ? "project" : "projects"}
            {query.trim() && ` matching “${query.trim()}”`}
            <span className="proj-count-meta">
              {" "}
              · {clientCount} client builds · {finproCount} final projects
            </span>
          </p>

          {visible.length > 0 ? (
            <ul className="proj-list">
              {visible.map((p) => (
                <ProjectRow key={p.id} project={p} onOpen={setSelected} />
              ))}
            </ul>
          ) : (
            <p className="proj-empty">
              No projects match that search.{" "}
              <button type="button" className="link-btn" onClick={() => { setQuery(""); setFilterId("all"); }}>
                Show all projects
              </button>
            </p>
          )}
        </FadeIn>
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
