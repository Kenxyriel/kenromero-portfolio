import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CalendarClock, Check, FileText, Github, Linkedin, Mail, MapPin, Pause, Play, RotateCcw, ShieldCheck, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import { imageProps } from "../../components/responsiveImage";
import SiteHeader, { type NavItem } from "../../components/SiteHeader";
import Timeline from "../../components/Timeline";
import usePageMeta from "../../components/usePageMeta";
import { bookingLink, profile } from "../../data/profile";
import { techContent as content } from "../../data/tech";
import { testimonials } from "../../data/testimonials";
import "./fonts";
import TechIntro, { INTRO_END_EVENT } from "./TechIntro";
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

const RUN_SEEN_KEY = "kr-test-run-seen";

// Play the hero run once per visit. Screenshots, reduced motion and repeat visits get the finished run.
const skipRun = () => {
  if (typeof window === "undefined" || prefersReducedMotion() || navigator.webdriver) return true;
  try {
    return sessionStorage.getItem(RUN_SEEN_KEY) === "1";
  } catch {
    return false;
  }
};

type RowState = "wait" | "run" | "pass" | "fail" | "retest";
const rowLabel: Record<RowState, string> = { wait: "·", run: "…", pass: "PASS", fail: "FAIL", retest: "RETEST" };

// A small bug drawn facing right; legs wiggle while it crawls.
function CrawlingBug({ phase }: { phase: "crawl" | "caught" }) {
  return (
    <span className={`tx-bug is-${phase}`} aria-hidden="true">
      <svg viewBox="0 0 24 18" width="26" height="19">
        <g className="tx-bug-legs" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" fill="none">
          <path d="M8 6 5 2M12 5.5 12 1.5M16 6 19 2M8 12 5 16M12 12.5 12 16.5M16 12 19 16" />
        </g>
        <path d="M21 7.5 23.5 5M21 10.5 23.5 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <ellipse cx="12" cy="9" rx="7" ry="4.6" fill="currentColor" />
        <circle cx="20" cy="9" r="2.6" fill="currentColor" />
        <path d="M12 4.6V13.4" stroke="#121518" strokeWidth="1" opacity=".5" />
      </svg>
    </span>
  );
}

// Hero card: replays real cases from the Authentication case study, including the defect and its retest.
function TestRun() {
  const run = content.testRun;
  const allPassed = () => run.cases.map((): RowState => "pass");
  const [states, setStates] = useState<RowState[]>(() => (skipRun() ? allPassed() : run.cases.map((): RowState => "wait")));
  const [bugOpen, setBugOpen] = useState(false);
  // The bug that crawls out of the failing row, then gets caught when its retest passes.
  const [bugPhase, setBugPhase] = useState<"hidden" | "crawl" | "caught">("hidden");
  const [finished, setFinished] = useState(skipRun);
  const [runId, setRunId] = useState(0);

  useEffect(() => {
    if (runId === 0 && skipRun()) return;
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    const set = (index: number, state: RowState) => setStates((prev) => prev.map((value, i) => (i === index ? state : value)));
    setStates(run.cases.map(() => "wait"));
    setBugOpen(false);
    setBugPhase("hidden");
    setFinished(false);
    // The first run waits for the welcome intro to lift, so it is not played behind the cover.
    const waitForIntro = runId === 0 && document.querySelector(".tx-intro") !== null;
    const schedule = () => {
      let t = runId === 0 ? 450 : 120;
      run.cases.forEach((testCase, index) => {
        at(t, () => set(index, "run"));
        t += 220;
        if (testCase.bug) {
          at(t, () => {
            set(index, "fail");
            setBugOpen(true);
            setBugPhase("crawl");
          });
          t += 1000;
          at(t, () => set(index, "retest"));
          t += 360;
          at(t, () => setBugPhase("caught"));
          at(t + 420, () => setBugPhase("hidden"));
        }
        at(t, () => set(index, "pass"));
        t += 60;
      });
      at(t + 120, () => {
        setFinished(true);
        try {
          sessionStorage.setItem(RUN_SEEN_KEY, "1");
        } catch {
          // Storage can be blocked; the run just plays again next time.
        }
      });
    };
    if (waitForIntro) window.addEventListener(INTRO_END_EVENT, schedule, { once: true });
    else schedule();
    return () => {
      window.removeEventListener(INTRO_END_EVENT, schedule);
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [runId, run.cases]);

  const bug = run.cases.find((testCase) => testCase.bug);
  return (
    <div className="tx-run" aria-label={`Test run: ${run.title}`}>
      <div className="tx-run-head">
        <strong>Run · {run.title}</strong>
        <span>{run.system}</span>
      </div>
      <ol className="tx-run-rows">
        {run.cases.map((testCase, index) => (
          <li key={testCase.id} data-state={states[index]}>
            <span className="tx-run-id">{testCase.id}</span>
            <span>{testCase.name}</span>
            <span className="tx-run-state">{rowLabel[states[index]]}</span>
            {testCase.bug && bugPhase !== "hidden" && <CrawlingBug phase={bugPhase} />}
          </li>
        ))}
      </ol>
      <div className="tx-run-foot" aria-live="off">
        {finished ? (
          <p className="tx-run-totals">
            {run.totals.map((total) => (
              <span key={total.label}>
                <b>{total.value}</b> {total.label}
              </span>
            ))}
          </p>
        ) : bugOpen && bug ? (
          <p className="tx-run-bug">
            <b>{bug.id}</b> logged · {bug.bug}
          </p>
        ) : (
          <p>Running…</p>
        )}
        <div className="tx-run-actions">
          <Link to={run.link}>
            Read the case study <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <button type="button" onClick={() => setRunId((id) => id + 1)} disabled={!finished}>
            <RotateCcw size={14} aria-hidden="true" /> Run again
          </button>
        </div>
      </div>
    </div>
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

// The discovery call written as a test case: the tech-side twin of the creative site's queue ticket.
// Its steps tick off when it scrolls into view.
function BookingCase() {
  const call = content.bookingCase;
  const ref = useRef<HTMLDivElement>(null);
  const [checked, setChecked] = useState(() => (prefersReducedMotion() ? call.steps.length : 0));

  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion() || navigator.webdriver || !("IntersectionObserver" in window)) {
      setChecked(call.steps.length);
      return;
    }
    const timers: number[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        call.steps.forEach((_, i) => timers.push(window.setTimeout(() => setChecked(i + 1), 350 + i * 260)));
        observer.disconnect();
      },
      { threshold: 0.5 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [call.steps]);

  const ready = checked === call.steps.length;
  return (
    <div ref={ref} className="tx-case">
      <div className="tx-case-head">
        <span className="tx-case-id">{call.id}</span>
        <span className={`tx-case-status${ready ? " is-ready" : ""}`}>{ready ? "Ready to run" : "Checking…"}</span>
      </div>
      <h3>{call.title}</h3>
      <dl className="tx-case-fields">
        <div>
          <dt>Precondition</dt>
          <dd>{call.precondition}</dd>
        </div>
        <div>
          <dt>Steps</dt>
          <dd>
            <ol className="tx-case-steps">
              {call.steps.map((step, i) => (
                <li key={step} className={i < checked ? "is-done" : undefined}>
                  <span className="tx-case-check" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </dd>
        </div>
        <div>
          <dt>Expected result</dt>
          <dd>{call.expected}</dd>
        </div>
      </dl>
      <div className="tx-case-foot">
        <a
          className="tx-btn tx-case-run"
          href={bookingLink.href}
          {...(bookingLink.external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          <CalendarClock size={18} aria-hidden="true" /> {call.button} <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <span>{call.note}</span>
      </div>
    </div>
  );
}

type Filter = "all" | "qa" | "dev";

export default function QAHome() {
  usePageMeta(content.meta.title, content.meta.description);
  const [filter, setFilter] = useState<Filter>("all");
  const [toolsPaused, setToolsPaused] = useState(false);
  const projects = content.projects.filter((project) => filter === "all" || project.type === filter);

  return (
    <div className="site-shell tech-theme">
      <TechIntro />
      <SiteHeader brandRole="QA & SOFTWARE DEVELOPMENT" navItems={navItems} cta={{ label: "Book a Discovery Call", href: bookingLink.href }} />

      <main id="top">
        {/* HERO */}
        <section className="tx-hero">
          <div className="container tx-hero-grid">
            <div className="tx-hero-copy">
              <p className="tx-status">
                <span className="tx-dot" /> {content.hero.status}
              </p>
              <h1>
                {content.hero.promise.before} <mark>{content.hero.promise.mark}</mark> {content.hero.promise.after}
              </h1>
              <p className="tx-hero-lead">{content.hero.lead}</p>
              <div className="tx-actions">
                <a className="tx-btn tx-btn-primary" href="#projects">
                  See the test runs <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a
                  className="tx-btn tx-btn-ghost"
                  href={bookingLink.href}
                  {...(bookingLink.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  Book a discovery call
                </a>
                <a className="tx-icon-btn" href={profile.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
                <a className="tx-icon-btn" href={profile.github.href} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <Github size={18} />
                </a>
              </div>
              {/* Sits under the copy, never over the photo. */}
              <TestRun />
            </div>

            <div className="tx-hero-visual">
              <img className="tx-hero-photo" {...imageProps("/ken-romero.webp", "(max-width: 760px) 80vw, 520px")} alt={profile.name} />
            </div>
          </div>
        </section>

        {/* TOOL MARQUEE */}
        <section className={`tx-marquee${toolsPaused ? " is-paused" : ""}`} aria-label="Tools">
          {/* Moving content needs a pause control for keyboard and touch users (WCAG 2.2.2). */}
          <button
            className="tx-marquee-toggle"
            type="button"
            aria-label={toolsPaused ? "Play tools animation" : "Pause tools animation"}
            onClick={() => setToolsPaused((paused) => !paused)}
          >
            {toolsPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
          </button>
          <div className="tx-marquee-viewport">
            <div className="tx-marquee-track">
              {[...content.tools, ...content.tools].map((tool, index) => (
                <span className="tx-tool" key={`${tool.name}-${index}`} aria-hidden={index >= content.tools.length}>
                  <img src={tool.icon} alt="" />
                  {tool.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="tx-section tx-light">
          <div className="container tx-about">
            <Reveal className="tx-about-photo">
              <img {...imageProps("/ken-romero-hero.webp", "(max-width: 760px) 80vw, 440px")} alt={`${profile.name}, casual portrait`} />
            </Reveal>
            <Reveal className="tx-about-copy" delay={120}>
              <p className="tx-kicker">About me</p>
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
              <p className="tx-kicker">What I do</p>
              <h2 className="tx-h2">
                Two disciplines. <span className="tx-hl">One mindset.</span>
              </h2>
              <p>Testing taught me how software fails. Building taught me how to prevent it.</p>
            </Reveal>
            <div className="tx-disciplines">
              {content.disciplines.map((discipline, index) => (
                <Reveal key={discipline.key} delay={index * 140}>
                  <article className={`tx-discipline tx-discipline-${discipline.key}`}>
                    <p className="tx-discipline-kicker">{discipline.kicker}</p>
                    <h3>{discipline.title}</h3>
                    <p>{discipline.text}</p>
                    <dl className="tx-skill-groups">
                      {discipline.groups.map((group) => (
                        <div key={group.title}>
                          <dt>{group.title}</dt>
                          <dd>{group.items.join(", ")}</dd>
                        </div>
                      ))}
                    </dl>
                  </article>
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
                <p className="tx-kicker">Selected work</p>
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
                    <div className={`tx-project-visual tx-project-${project.visual}${project.type === "dev" ? " tx-project-build" : ""}`}>
                      {/* Dev projects draw as a wireframe first, then the real screenshot settles in. */}
                      {project.type === "dev" && (
                        <span className="tx-bones" aria-hidden="true">
                          <i />
                          <i />
                          <i />
                          <i />
                        </span>
                      )}
                      {project.visual === "tests" && <TestWindow />}
                      {project.visual === "image" && <img {...imageProps(project.image)} alt={`${project.title} preview`} loading="lazy" />}
                      <span className="tx-inspect" aria-hidden="true">
                        {project.evidence}
                      </span>
                      <div className="tx-project-stack">
                        <span>Tech stack</span>
                        <ul>
                          {project.tags.map((tag, i) => (
                            <li key={tag} style={{ transitionDelay: `${80 + i * 50}ms` }}>
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="tx-project-body">
                      <span className="tx-project-cat">
                        {project.category}
                        {"status" in project && project.status && <span className="tx-project-status">{project.status}</span>}
                      </span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
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
        <section id="process" className="tx-section tx-dark tx-ink tx-process-section">
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">How I test</p>
              <h2 className="tx-h2">
                From requirement <span className="tx-hl">to regression.</span>
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

            <Reveal className="tx-heading tx-working-head">
              <p className="tx-kicker">{content.workingWithMe.kicker}</p>
              <h2 className="tx-h2">
                From first message <span className="tx-hl">to handover.</span>
              </h2>
              <p className="tx-working-intro">{content.workingWithMe.description}</p>
            </Reveal>
            <Timeline className="tl-tech" steps={content.workingWithMe.steps} />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="testimonials" className="tx-section tx-light">
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">Testimonials</p>
              <h2 className="tx-h2">
                What people <span className="tx-hl">say.</span>
              </h2>
            </Reveal>
            <div className="tx-testimonials">
              {testimonials.map((item, index) => (
                <Reveal key={item.id} delay={index * 120}>
                  <figure className="tx-testimonial">
                    {item.highlight && <p className="tx-pull" aria-hidden="true">“…{item.highlight}…”</p>}
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
          <div className="container">
            <Reveal className="tx-heading">
              <p className="tx-kicker">Let&apos;s connect</p>
              <h2 className="tx-h2">
                Let&apos;s build something <span className="tx-hl">reliable.</span>
              </h2>
              <p>{content.contactIntro}</p>
            </Reveal>
          </div>
          {/* Two cards of equal height: book a call, or write. */}
          <div className="container tx-contact-grid">
            <BookingCase />

            <Reveal className="tx-contact-side" delay={120}>
              <h3>Prefer to write?</h3>
              <ContactForm showInfo={false} />
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="tx-footer">
        <div className="container tx-footer-inner">
          <div className="tx-footer-brand">
            <strong>KEN ROMERO</strong>
            <span>QA Engineer · Web Developer</span>
          </div>
          <ul className="tx-contact-links" aria-label="Contact details">
            <li>
              <Mail size={16} aria-hidden="true" />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
            <li>
              <Smartphone size={16} aria-hidden="true" />
              <a href={profile.whatsapp.href} target="_blank" rel="noreferrer">
                WhatsApp {profile.whatsapp.label}
              </a>
            </li>
            <li>
              <Linkedin size={16} aria-hidden="true" />
              <a href={profile.linkedin.href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <Github size={16} aria-hidden="true" />
              <a href={profile.github.href} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <FileText size={16} aria-hidden="true" />
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent("Resume request")}`}>Request my resume</a>
            </li>
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>{profile.location}</span>
            </li>
          </ul>
        </div>
        <div className="container tx-footer-base">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <div className="tx-footer-legal">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
