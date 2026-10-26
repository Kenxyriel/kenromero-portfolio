import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Code2, FileText, Github, Linkedin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import SiteHeader, { type NavItem } from "../../components/SiteHeader";
import usePageMeta from "../../components/usePageMeta";
import { profile } from "../../data/profile";
import { techContent as content } from "../../data/tech";
import { testimonials } from "../../data/testimonials";
// Self-hosted fonts: no request to Google servers, so no visitor data goes to a third party.
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./tech.css";

const navItems: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Fades sections in as they scroll into view.
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`tx-reveal ${shown ? "is-shown" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % words.length), 2400);
    return () => window.clearInterval(timer);
  }, [words.length]);

  return (
    <>
      <span className="tx-sr-only">{words.join(", ")}</span>
      <span className="tx-rotating" aria-hidden="true">
        <span key={index} className="tx-rotating-word">
          {words[index]}
        </span>
      </span>
    </>
  );
}

function TestWindow() {
  return (
    <div className="tx-window" aria-label="Sample API test cases from the API Testing case study">
      <div className="tx-window-bar">
        <span />
        <span />
        <span />
        <strong>api-testing / test-cases</strong>
      </div>
      <ol className="tx-window-body">
        {content.testWindow.map((test, index) => (
          <li key={test.id} style={{ animationDelay: `${300 + index * 300}ms` }}>
            <span className="tx-test-id">{test.id}</span>
            <span className={`tx-method tx-method-${test.method.toLowerCase()}`}>{test.method}</span>
            <span className="tx-test-name">{test.name}</span>
            <span className="tx-test-expected">→ {test.expected}</span>
          </li>
        ))}
      </ol>
      <div className="tx-window-foot">
        <ShieldCheck size={14} aria-hidden="true" /> Request &amp; response validated · regression covered
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="tx-browser" aria-hidden="true">
      <div className="tx-browser-bar">
        <span />
        <span />
        <span />
        <em>kenromerogoestdigital.space</em>
      </div>
      <div className="tx-browser-body">
        <div className="tx-browser-routes">
          <b>/qa</b>
          <b>/va</b>
        </div>
        <code>
          VITE_PORTFOLIO=<i>va</i>
          <br />
          npm run build
        </code>
        <Code2 className="tx-browser-icon" />
      </div>
    </div>
  );
}

type Filter = "all" | "qa" | "dev";

export default function QAHome() {
  usePageMeta(content.meta.title, content.meta.description);
  const [filter, setFilter] = useState<Filter>("all");
  const projects = content.projects.filter((project) => filter === "all" || project.type === filter);

  return (
    <div className="site-shell tech-theme">
      <SiteHeader brandRole="QA & SOFTWARE DEVELOPMENT" navItems={navItems} cta={{ label: "Let's Connect", href: "#contact" }} />

      <main id="top">
        {/* HERO */}
        <section className="tx-hero">
          <div className="tx-grid-bg" aria-hidden="true" />
          <div className="tx-glow tx-glow-a" aria-hidden="true" />
          <div className="tx-glow tx-glow-b" aria-hidden="true" />
          <div className="container tx-hero-grid">
            <div className="tx-hero-copy">
              <p className="tx-status">
                <span className="tx-dot" /> {content.hero.status}
              </p>
              <h1>
                Ken
                <br />
                Romero<span className="tx-cursor" aria-hidden="true" />
              </h1>
              <p className="tx-hero-role">
                <span className="tx-mono">&gt;</span> <RotatingWord words={content.hero.rotating} />
              </p>
              <p className="tx-hero-lead">{content.hero.lead}</p>
              <div className="tx-actions">
                <a className="tx-btn tx-btn-primary" href="#projects">
                  View projects <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a className="tx-btn tx-btn-ghost" href="#contact">
                  Let&apos;s connect
                </a>
                <a className="tx-icon-btn" href={profile.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a className="tx-icon-btn" href={profile.github.href} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
              </div>
              <ul className="tx-chips">
                {content.hero.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>

            <div className="tx-hero-visual">
              <div className="tx-orbit" aria-hidden="true" />
              <img className="tx-hero-photo" src="/ken-romero.webp" alt={profile.name} />
            </div>
          </div>
        </section>

        {/* TOOL MARQUEE */}
        <section className="tx-marquee" aria-label="Tools">
          <div className="tx-marquee-track">
            {[...content.tools, ...content.tools].map((tool, index) => (
              <span className="tx-tool" key={`${tool.name}-${index}`} aria-hidden={index >= content.tools.length}>
                <img src={tool.icon} alt="" />
                {tool.name}
              </span>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="tx-section tx-light">
          <div className="container tx-about">
            <Reveal className="tx-about-photo">
              <img src="/ken-romero-hero.webp" alt={`${profile.name}, casual portrait`} />
              <span className="tx-tag-float">QA mindset · developer hands</span>
            </Reveal>
            <Reveal className="tx-about-copy" delay={120}>
              <p className="tx-kicker">// about me</p>
              <h2 className="tx-h2">
                I look beyond the <span className="tx-hl">happy path.</span>
              </h2>
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <blockquote className="tx-quote">{content.about.quote}</blockquote>
              <div className="tx-stats">
                {content.about.stats.map((stat) => (
                  <div key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* DISCIPLINES */}
        <section id="skills" className="tx-section tx-dark">
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">// what I do</p>
              <h2 className="tx-h2">
                Two disciplines. <span className="tx-hl">One mindset.</span>
              </h2>
              <p>Testing taught me how software fails. Building taught me how to prevent it.</p>
            </Reveal>
            <div className="tx-disciplines">
              {content.disciplines.map((discipline, index) => (
                <Reveal key={discipline.key} className={`tx-discipline tx-discipline-${discipline.key}`} delay={index * 140}>
                  <p className="tx-mono tx-discipline-kicker">{discipline.kicker}</p>
                  <h3>{discipline.title}</h3>
                  <p>{discipline.text}</p>
                  {discipline.groups.map((group) => (
                    <div className="tx-skill-group" key={group.title}>
                      <span>{group.title}</span>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="tx-section tx-light">
          <div className="container">
            <Reveal className="tx-heading tx-heading-row">
              <div>
                <p className="tx-kicker">// selected work</p>
                <h2 className="tx-h2">
                  Projects with <span className="tx-hl">evidence.</span>
                </h2>
              </div>
              <div className="tx-filters" role="group" aria-label="Filter projects">
                {(
                  [
                    ["all", "All"],
                    ["qa", "QA"],
                    ["dev", "Development"],
                  ] as [Filter, string][]
                ).map(([value, label]) => (
                  <button
                    key={value}
                    className={filter === value ? "is-active" : ""}
                    aria-pressed={filter === value}
                    onClick={() => setFilter(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            <div className="tx-projects">
              {projects.map((project, index) => {
                const body = (
                  <>
                    <div className={`tx-project-visual tx-project-${project.visual}`}>
                      {project.visual === "tests" && <TestWindow />}
                      {project.visual === "browser" && <BrowserMock />}
                      {project.visual === "image" && <img src={project.image} alt={`${project.title} preview`} loading="lazy" />}
                    </div>
                    <div className="tx-project-body">
                      <span className="tx-mono tx-project-cat">
                        {project.category}
                        {"status" in project && project.status && <span className="tx-project-status">{project.status}</span>}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <ul className="tx-tags">
                        {project.tags.map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <span className="tx-link">
                        {project.link.label}{" "}
                        {"to" in project.link ? <ArrowRight size={16} aria-hidden="true" /> : <ArrowUpRight size={16} aria-hidden="true" />}
                      </span>
                    </div>
                  </>
                );
                return (
                  <Reveal key={project.title} delay={index * 100}>
                    {"to" in project.link && project.link.to ? (
                      <Link className="tx-project" to={project.link.to}>
                        {body}
                      </Link>
                    ) : (
                      <a className="tx-project" href={"href" in project.link ? project.link.href : "#"} target="_blank" rel="noreferrer">
                        {body}
                      </a>
                    )}
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="tx-section tx-dark tx-process-section">
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">// how I work</p>
              <h2 className="tx-h2">
                From expected behavior <span className="tx-hl">to regression.</span>
              </h2>
            </Reveal>
            <ol className="tx-process">
              {content.process.map((step, index) => (
                <li key={step.title}>
                  <Reveal delay={index * 80}>
                    <span className="tx-step-num">{String(index + 1).padStart(2, "0")}</span>
                    <strong>{step.title}</strong>
                    <span>{step.text}</span>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="tx-section tx-light">
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">// testimonials</p>
              <h2 className="tx-h2">
                What people <span className="tx-hl">say.</span>
              </h2>
            </Reveal>
            <div className="tx-testimonials">
              {testimonials.map((item, index) => (
                <Reveal key={item.id} delay={index * 120}>
                  <figure className="tx-testimonial">
                    <blockquote>“{item.quote}”</blockquote>
                    <figcaption>
                      <span className="tx-avatar" aria-hidden="true">
                        {item.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </span>
                      <span>
                        <strong>{item.name}</strong>
                        <small>{item.role}</small>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="tx-section tx-dark tx-contact">
          <div className="tx-grid-bg" aria-hidden="true" />
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">// let&apos;s connect</p>
              <h2 className="tx-h2">
                Let&apos;s build something <span className="tx-hl">reliable.</span>
              </h2>
              <div className="tx-actions tx-actions-center">
                <a className="tx-btn tx-btn-ghost" href={profile.github.href} target="_blank" rel="noreferrer">
                  <Github size={16} aria-hidden="true" /> GitHub
                </a>
                <a className="tx-btn tx-btn-ghost" href={`mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`}>
                  <FileText size={16} aria-hidden="true" /> Request my resume
                </a>
              </div>
            </Reveal>
            <ContactForm intro={content.contactIntro} />
          </div>
        </section>
      </main>

      <footer className="tx-footer">
        <div className="container tx-footer-inner">
          <div>
            <strong>
              KEN ROMERO<span className="tx-cursor" aria-hidden="true" />
            </strong>
            <span>QA Engineer · Web Developer</span>
          </div>
          <div className="tx-footer-links">
            <a href={profile.linkedin.href} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github.href} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
          <span>© {new Date().getFullYear()} {profile.name}</span>
        </div>
      </footer>
    </div>
  );
}
