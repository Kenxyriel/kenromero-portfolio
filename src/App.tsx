import { useEffect, useState } from "react";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Braces,
  Bug,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  CircleSlash,
  Clock3,
  Crosshair,
  FileText,
  GitBranch,
  KeyRound,
  ListChecks,
  LockKeyhole,
  Menu,
  MessagesSquare,
  RefreshCw,
  RotateCcw,
  Shield,
  ShieldCheck,
  Sparkles,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import ApiTestingCaseStudy from "./ApiTestingCaseStudy";
import CaseStudyLayout from "./CaseStudyLayout";
import ContactForm from "./ContactForm";
import QAWorkflow from "./QAWorkflow";
import SectionHeading from "./SectionHeading";
import TestimonialsCarousel from "./TestimonialsCarousel";

type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  visualLabel: string;
  path: string;
  accent: "blue" | "slate";
};

const projects: Project[] = [
  {
    title: "Authentication & Proactive Lockout Testing",
    category: "Manual / Functional QA",
    description:
      "QA case study focused on authentication behavior, failed authentication attempts, proactive lockout, test execution, defect reporting, retesting, and regression.",
    tags: ["Authentication", "Lockout", "Test Cases", "Defects", "Regression"],
    visualLabel: "Authentication flow / lockout evidence",
    path: "/qa/projects/authentication-testing",
    accent: "blue",
  },
  {
    title: "API Testing and Validation",
    category: "API / Functional QA",
    description:
      "QA case study focused on API testing and validation, including request and response validation, positive and negative scenarios, test execution, defect identification, retesting, and regression.",
    tags: [
      "API Testing",
      "Request Validation",
      "Response Validation",
      "Defects",
      "Regression",
    ],
    visualLabel: "GET · POST · PUT · DELETE",
    path: "/qa/projects/api-testing",
    accent: "slate",
  },
];

const expertise = [
  {
    title: "Functional QA",
    icon: CheckCircle2,
    items: [
      "Manual Testing",
      "Functional Testing",
      "Positive & Negative Testing",
    ],
  },
  {
    title: "Test Design",
    icon: ClipboardCheck,
    items: [
      "Test Scenarios",
      "Test Cases",
      "Expected vs Actual Validation",
      "Test Execution & Result Tracking",
    ],
  },
  {
    title: "Defect Management",
    icon: Bug,
    items: [
      "Defect Identification",
      "Defect Reporting",
      "Retesting",
      "Regression Testing",
    ],
  },
  {
    title: "API & Authentication",
    icon: ShieldCheck,
    items: [
      "API Testing & Validation",
      "Request Validation",
      "Response Validation",
      "Authentication & Lockout Testing",
    ],
  },
];

const tools = [
  { name: "Azure DevOps", icon: Activity },
  { name: "Git", icon: GitBranch },
  { name: "Postman", icon: Braces },
];

const evidence = [
  {
    title: "Authentication Flow",
    type: "Authentication & Lockout Testing",
    icon: KeyRound,
  },
  {
    title: "Expected Lockout Matrix",
    type: "Authentication & Lockout Testing",
    icon: ShieldCheck,
  },
  { title: "API Test Flow", type: "API Testing and Validation", icon: Braces },
  { title: "Test Cases", type: "QA Evidence", icon: ClipboardCheck },
  { title: "Defect Example", type: "QA Evidence", icon: Bug },
  { title: "Regression", type: "QA Evidence", icon: RefreshCw },
];

const navItems = [
  "About",
  "Expertise",
  "Tools",
  "Projects",
  "Testimonials",
  "Contact",
];

const workflow = [
  "Expected Behavior",
  "Test Scenarios",
  "Test Cases",
  "Execute",
  "Expected vs Actual",
  "Defect",
  "Retest",
  "Regression",
];

const projectPreviewMap: Record<string, string> = {
  "Authentication & Proactive Lockout Testing":
    "/case-study-preview/case-study-one.png",
  "API Testing and Validation": "/case-study-preview/case-study-two.png",
};

function renderProjectVisual(project: Project) {
  const previewSrc = projectPreviewMap[project.title];

  if (!previewSrc) {
    return (
      <div className="artifact-placeholder">
        <span className="artifact-kicker">EVIDENCE PREVIEW</span>
        <strong>{project.visualLabel}</strong>
        <small>Artifact preview coming soon.</small>
      </div>
    );
  }

  return (
    <img
      src={previewSrc}
      alt={`${project.title} case study preview`}
      className="project-preview-image"
    />
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<QAHome />} />
      <Route
        path="/projects/authentication-testing"
        element={<ProjectPlaceholder title={projects[0].title} />}
      />
      <Route path="/projects/api-testing" element={<ApiTestingCaseStudy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function QAHome() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" onClick={closeMenu}>
            <span className="brand-name">KEN ROMERO</span>
            <span className="brand-role">TECHNICAL PORTFOLIO</span>
          </a>

          <button
            className="menu-toggle"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          <nav className={`nav-links ${menuOpen ? "nav-links-open" : ""}`}>
            {navItems.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>
                {item}
              </a>
            ))}
            <a className="nav-cta" href="#contact" onClick={closeMenu}>
              Let&apos;s Connect
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* SECTION: HERO */}
        <section className="hero editorial-hero section">
          <div className="container editorial-hero-inner">
            <div className="editorial-greeting" aria-hidden="true">
              <span className="greeting-hello">Hello,</span>
              <span className="greeting-there">there</span>
            </div>

            <div
              className="editorial-photo-wrap"
              aria-label="Professional photo placeholder"
            >
              <div className="editorial-photo">
                <div className="editorial-photo-glow" />
                <img
                  src="/ken-romero.JPG"
                  alt="Ken Romero"
                  className="editorial-photo-image"
                />
              </div>
            </div>

            <div className="editorial-badge">
              <span className="badge-dot" />
              Open for QA Work
            </div>

            <div className="editorial-intro">
              <span className="editorial-label">I AM</span>
              <h1>
                KEN
                <br />
                ROMERO
              </h1>
            </div>

            <div className="editorial-role">
              <div className="editorial-role-title">
                <span>QA Specialist</span>
                <span>APPLICATION SYSTEM ENGINEER</span>
              </div>

              <div className="editorial-role-details">
                <span>Manual &amp; Automation Testing</span>
                <span>
                  Web Applications&nbsp;&nbsp;·&nbsp;&nbsp;API Testing
                </span>
                <span>Quality Assurance&nbsp;&nbsp;·&nbsp;&nbsp;Agile</span>
              </div>
            </div>

            <div className="editorial-actions">
              <a className="editorial-link" href="#projects">
                View QA Projects <ArrowRight size={17} />
              </a>
              <a
                className="editorial-link editorial-link-muted"
                href="#contact"
              >
                Let&apos;s Connect
              </a>
            </div>
          </div>
        </section>

        {/* SECTION: ABOUT */}
        <section id="about" className="about-editorial-section">
          <div className="container">
            <div className="about-editorial">
              {/* LEFT: PHOTO */}
              <div className="about-photo-column">
                <div className="about-photo-card">
                  <img
                    src="/ken-romero-hero.JPG"
                    alt="Ken Romero"
                    className="about-photo"
                  />

                  <div className="about-photo-label">
                    <span className="about-photo-dot" />
                    <div>
                      <strong>KEN ROMERO</strong>
                      <small>QA SPECIALIST</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: INTRODUCTION */}
              <div className="about-content">
                <div className="about-intro-grid">
                  <div className="about-introduction">
                    <p className="eyebrow">Let's get to know</p>

                    <h2>
                      About <span>me</span>
                    </h2>

                    <div className="about-divider" />

                    <p>
                      I’m an IT professional and QA Analyst with 4+ years of
                      experience working with enterprise applications and
                      helping teams deliver reliable, quality software.
                    </p>

                    <p>
                      I enjoy understanding how a system is supposed to work,
                      breaking down requirements, and looking beyond the happy
                      path to find the cases that can easily be missed.
                    </p>

                    <p>
                      My QA experience covers manual and functional testing,
                      regression and retesting, negative and boundary testing,
                      test case design, defect reporting, API validation, and
                      release support.
                    </p>

                    <p className="about-personal-note">
                      What I enjoy most about QA is the investigation. I like
                      asking
                      <em> “What happens if...?”</em>, finding where things can
                      break, and making sure fixes solve the problem without
                      creating another one.
                    </p>
                  </div>

                  {/* CAREER HIGHLIGHTS */}
                  <div className="about-highlights">
                    <p className="about-subheading">CAREER HIGHLIGHTS</p>

                    <div className="highlight-item">
                      <strong>4+ YEARS</strong>
                      <span>IT EXPERIENCE</span>
                    </div>

                    <div className="highlight-item">
                      <strong>QA SPECIALIST</strong>
                      <span>ENTERPRISE APPLICATIONS</span>
                    </div>

                    <div className="highlight-item">
                      <strong>5+ PROJECTS</strong>
                      <span>IT / DIGITAL PROJECTS</span>
                    </div>

                    <div className="highlight-item">
                      <strong>MANUAL QA</strong>
                      <span>FUNCTIONAL · REGRESSION</span>
                    </div>

                    <div className="highlight-item">
                      <strong>API TESTING</strong>
                      <span>POSTMAN · SWAGGER</span>
                    </div>

                    <div className="highlight-item">
                      <strong>AUTOMATION</strong>
                      <span>PLAYWRIGHT · TYPESCRIPT</span>
                    </div>
                  </div>
                </div>

                {/* QA SPECIALIZATION */}
                <div className="qa-specialization">
                  <div className="qa-specialization-header">
                    <p className="about-subheading">QA SPECIALIZATION</p>
                  </div>

                  <div className="qa-category-grid">
                    <div className="qa-category">
                      <span className="qa-category-number">01</span>

                      <div>
                        <h3>QA Foundation</h3>

                        <ul>
                          <li>Software Testing</li>
                          <li>Manual &amp; Functional Testing</li>
                          <li>Regression &amp; Retesting</li>
                          <li>Negative &amp; Boundary Testing</li>
                          <li>Test Management</li>
                        </ul>
                      </div>
                    </div>

                    <div className="qa-category">
                      <span className="qa-category-number">02</span>

                      <div>
                        <h3>Quality &amp; Delivery</h3>

                        <ul>
                          <li>Test Cases &amp; Test Suites</li>
                          <li>Defect Reporting &amp; Tracking</li>
                          <li>Requirements &amp; Acceptance Criteria</li>
                          <li>Release Validation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="qa-category">
                      <span className="qa-category-number">03</span>

                      <div>
                        <h3>API &amp; Automation</h3>

                        <ul>
                          <li>API Testing</li>
                          <li>Postman &amp; Swagger</li>
                          <li>TypeScript &amp; Playwright</li>
                          <li>Selenium WebDriver</li>
                          <li>Git &amp; GitHub Actions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: EXPERTISE */}
        <section id="expertise" className="section section-muted">
          <div className="container">
            <div className="expertise-header">
              <p className="eyebrow">WHAT I BRING TO QA</p>

              <h2>
                A structured approach to testing, investigation, and quality
                validation.
              </h2>
            </div>

            <div className="expertise-editorial-grid">
              {/* 01 - FUNCTIONAL QA */}
              <article className="expertise-editorial-card">
                <div className="expertise-card-top">
                  <span className="expertise-number">01</span>

                  <span className="expertise-line" />
                </div>

                <h3>Functional QA</h3>

                <p>
                  I validate application behavior across expected, negative, and
                  edge-case scenarios, helping ensure features work as intended.
                </p>

                <div className="expertise-tags">
                  <span>MANUAL TESTING</span>
                  <span>FUNCTIONAL TESTING</span>
                  <span>POSITIVE / NEGATIVE</span>
                  <span>BOUNDARY TESTING</span>
                </div>
              </article>

              {/* 02 - TEST DESIGN */}
              <article className="expertise-editorial-card">
                <div className="expertise-card-top">
                  <span className="expertise-number">02</span>

                  <span className="expertise-line" />
                </div>

                <h3>Test Design</h3>

                <p>
                  I turn requirements into clear test scenarios and test cases,
                  with a focus on expected behavior, execution, and measurable
                  results.
                </p>

                <div className="expertise-tags">
                  <span>TEST SCENARIOS</span>
                  <span>TEST CASES</span>
                  <span>EXPECTED / ACTUAL</span>
                  <span>TEST EXECUTION</span>
                </div>
              </article>

              {/* 03 - DEFECT MANAGEMENT */}
              <article className="expertise-editorial-card">
                <div className="expertise-card-top">
                  <span className="expertise-number">03</span>

                  <span className="expertise-line" />
                </div>

                <h3>Defect Management</h3>

                <p>
                  I investigate unexpected behavior, document defects clearly,
                  and verify fixes through structured retesting and regression.
                </p>

                <div className="expertise-tags">
                  <span>DEFECT IDENTIFICATION</span>
                  <span>DEFECT REPORTING</span>
                  <span>RETESTING</span>
                  <span>REGRESSION</span>
                </div>
              </article>

              {/* 04 - API & AUTHENTICATION */}
              <article className="expertise-editorial-card expertise-card-featured">
                <div className="expertise-card-top">
                  <span className="expertise-number">04</span>

                  <span className="expertise-line" />
                </div>

                <h3>API &amp; Authentication</h3>

                <p>
                  I validate API behavior and authentication flows by checking
                  requests, responses, and security-related scenarios such as
                  failed login and lockout behavior.
                </p>

                <div className="expertise-tags">
                  <span>API VALIDATION</span>
                  <span>REQUEST VALIDATION</span>
                  <span>RESPONSE VALIDATION</span>
                  <span>AUTHENTICATION</span>
                  <span>LOCKOUT TESTING</span>
                </div>
              </article>
            </div>
          </div>
        </section>
        {/* SECTION: TOOLS */}
        <section id="tools" className="section tools-workflow-section">
          <div className="container">
            <div className="tools-workflow-grid">
              {/* LEFT: TOOLS */}
              <div className="tools-panel">
                <div className="tools-header">
                  <p className="eyebrow">HOW I WORK?</p>

                  <h2>
                    Tools behind the
                    <br />
                    QA workflow.
                  </h2>

                  <p>
                    Tools I use across manual testing, automation, API
                    validation, development, and QA workflows.
                  </p>
                </div>

                <div className="tool-groups">
                  {/* AUTOMATION */}
                  <div className="tool-group">
                    <div className="tool-group-label">AUTOMATION</div>

                    <div className="tech-marquee">
                      <div className="tech-marquee-track tech-marquee-left">
                        {/* SET 1 */}
                        <div className="tech-item">
                          <img
                            src="/icons/playwright-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Playwright</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/selenium-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Selenium WebDriver</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/typescript-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>TypeScript</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/playwright-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Playwright API Testing</span>
                        </div>

                        {/* SET 2 */}
                        <div className="tech-item" aria-hidden="true">
                          <img
                            src="/icons/playwright-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Playwright</span>
                        </div>

                        <div className="tech-item" aria-hidden="true">
                          <img
                            src="/icons/selenium-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Selenium WebDriver</span>
                        </div>

                        <div className="tech-item" aria-hidden="true">
                          <img
                            src="/icons/typescript-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>TypeScript</span>
                        </div>

                        <div className="tech-item" aria-hidden="true">
                          <img
                            src="/icons/playwright-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Playwright API Testing</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* API & DEVELOPMENT */}
                  <div className="tool-group">
                    <div className="tool-group-label">API & DEVELOPMENT</div>

                    <div className="tech-marquee">
                      <div className="tech-marquee-track tech-marquee-right">
                        <div className="tech-item">
                          <img
                            src="/icons/postman-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Postman</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/git-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Git</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/github-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>GitHub</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/github-actions-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>GitHub Actions</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QA MANAGEMENT */}
                  <div className="tool-group">
                    <div className="tool-group-label">QA MANAGEMENT</div>

                    <div className="tech-marquee">
                      <div className="tech-marquee-track tech-marquee-left">
                        <div className="tech-item">
                          <img
                            src="/icons/azure-devops-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Azure DevOps</span>
                        </div>

                        <div className="tech-item">
                          <img
                            src="/icons/jira-mono.svg"
                            alt=""
                            className="tech-logo"
                          />
                          <span>Jira</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: QA WORKFLOW */}
              <div className="tools-workflow-panel">
                <div className="tools-workflow-heading">
                  <p className="eyebrow">QA WORKFLOW</p>

                  <h3>
                    From expected behavior
                    <br />
                    to regression.
                  </h3>
                </div>

                <div className="tools-workflow-grid-inner">
                  {[
                    ["01", "Expected Behavior"],
                    ["02", "Test Scenarios"],
                    ["03", "Test Cases"],
                    ["04", "Execute"],
                    ["05", "Expected vs Actual"],
                    ["06", "Defect"],
                    ["07", "Retest"],
                    ["08", "Regression"],
                  ].map(([number, title]) => (
                    <div className="tools-workflow-card" key={number}>
                      <button className="tools-workflow-number">
                        {number}
                      </button>
                      <strong>{title}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* SECTION: PROJECTS */}
        <section id="projects" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="FEATURED QA PROJECTS"
              title="Testing work with supporting evidence"
              description="Two verified case studies form the core of this QA portfolio."
            />

            <div className="projects-grid">
              {projects.map((project) => (
                <article
                  className={`project-card project-${project.accent}`}
                  key={project.title}
                >
                  <div className="project-visual">
                    {renderProjectVisual(project)}
                  </div>
                  <div className="project-content">
                    <span className="project-category">{project.category}</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="tag-row">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <Link className="text-link" to={project.path}>
                      View Case Study <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION: TESTIMONIALS */}
        <section id="testimonials" className="section">
          <div className="container">
            <SectionHeading
              eyebrow="TESTIMONIALS"
              title="Client feedback"
              description="Feedback from people who have worked with me."
              compact
            />
            <TestimonialsCarousel />
          </div>
        </section>

        {/* SECTION: CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>Ken Romero</strong>
            <span>QA / Application System Engineer</span>
          </div>
          <div>
            <span>© 2024 Ken Romero. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProjectPlaceholder({ title }: { title: string }) {
  if (title === "Authentication & Proactive Lockout Testing")
    return <AuthenticationCaseStudy />;
  return (
    <main className="placeholder-page">
      <div className="container placeholder-page-inner">
        <p className="eyebrow">QA CASE STUDY</p>
        <h1>{title}</h1>
        <p>
          This case-study page is not populated yet. It will use the same
          evidence-safe approach when the verified source material is available.
        </p>
        <Link className="button button-primary" to="/qa">
          Back to QA Portfolio
        </Link>
      </div>
    </main>
  );
}

function AuthenticationCaseStudy() {
  const collaborators = [
    {
      role: "QA ANALYST",
      details: "Test execution, defect reporting, retesting, regression",
      icon: ClipboardCheck,
    },
    {
      role: "DEVELOPER",
      details: "Investigation and implementation of fixes",
      icon: Braces,
    },
    {
      role: "SCRUM MASTER",
      details: "Sprint coordination and tracking",
      icon: UsersRound,
    },
    {
      role: "RELEASE MANAGER / TECHNICAL PROJECT MANAGER",
      details: "Release coordination and project validation",
      icon: CalendarDays,
    },
  ];
  const regressionScope = [
    "Successful login",
    "Invalid credentials",
    "Login attempt tracking",
    "Progressive lockout",
    "Lockout duration",
    "Lockout messaging",
    "Session timeout",
    "Account recovery",
    "Authentication UI",
    "Existing login workflows",
  ];
  const qaSkills = [
    "Manual testing",
    "Functional testing",
    "Regression testing",
    "Negative testing",
    "Boundary testing",
    "Security testing",
    "Test case design",
    "Defect management",
    "Retesting",
    "Release validation",
  ];
  const validationSteps = [
    {
      title: "VERIFY THE FIX",
      description: "Confirm the reported defect is resolved.",
      icon: ClipboardCheck,
    },
    {
      title: "TEST BOUNDARIES",
      description: "Validate each progressive lockout threshold.",
      icon: Activity,
    },
    {
      title: "VALIDATE RELATED STATES",
      description: "Check session timeout, account state, and login behavior.",
      icon: LockKeyhole,
    },
    {
      title: "REGRESSION TEST",
      description:
        "Verify existing authentication workflows remain unaffected.",
      icon: RefreshCw,
    },
    {
      title: "RELEASE VALIDATION",
      description: "Confirm critical scenarios pass before release.",
      icon: ShieldCheck,
    },
  ];

  return (
    <CaseStudyLayout
      category="QA CASE STUDY · MANUAL / FUNCTIONAL QA"
      title="Authentication & Proactive Lockout Testing"
      lead="A QA case study focused on validating authentication behavior, failed authentication attempts, proactive lockout handling, test execution, defect reporting, retesting, and regression."
      heroImage={{
        src: "/case-study-preview/case-study-one.png",
        alt: "Authentication and proactive lockout testing case study preview",
      }}
      tags={[
        "Authentication",
        "Failed Attempts",
        "Lockout",
        "Test Cases",
        "Defects",
        "Regression",
      ]}
    >
      <section className="section section-muted">
        <div className="container">
          <div className="project-overview-grid">
            <div className="project-overview-panel">
              <div className="project-panel-heading">
                <h2>PROJECT OVERVIEW</h2>
              </div>
              <div className="project-overview-copy">
                <p>
                  The HR &amp; Payroll system included an existing account
                  lockout mechanism designed to protect user accounts from
                  repeated invalid login attempts.
                </p>
                <p>
                  The team introduced an enhancement that changed the existing
                  fixed lockout behavior to a progressive lockout model, where
                  the lockout duration increases as unsuccessful login attempts
                  continue.
                </p>
              </div>

              <div className="overview-support-grid">
                <div className="overview-support-card">
                  <ClipboardCheck aria-hidden="true" />
                  <strong>Test Design</strong>
                  <p>Created test suites and test cases</p>
                </div>
                <div className="overview-support-card">
                  <CheckCircle2 aria-hidden="true" />
                  <strong>Functional Testing</strong>
                  <p>Validated login and lockout behaviour</p>
                </div>
                <div className="overview-support-card">
                  <CircleSlash aria-hidden="true" />
                  <strong>Negative Testing</strong>
                  <p>Tested invalid credentials and edge cases</p>
                </div>
                <div className="overview-support-card">
                  <Bug aria-hidden="true" />
                  <strong>Defect Management</strong>
                  <p>Identified, documented and retested defects</p>
                </div>
                <div className="overview-support-card">
                  <RefreshCw aria-hidden="true" />
                  <strong>Regression Testing</strong>
                  <p>Validated related authentication workflows</p>
                </div>
                <div className="overview-support-card">
                  <UsersRound aria-hidden="true" />
                  <strong>Collaboration</strong>
                  <p>Worked with Dev, SM, RM and TPM</p>
                </div>
              </div>
            </div>

            <div className="feature-change-panel">
              <div className="project-panel-heading feature-heading">
                <h2>THE FEATURE CHANGE</h2>
              </div>
              <div className="before-after-heading">
                <span>BEFORE</span>
                <span>AFTER</span>
              </div>
              <div className="before-after-grid">
                <div className="before-column">
                  <span className="feature-badge">FIXED LOCKOUT</span>
                  <div className="before-flow">
                    <div className="feature-flow-card">
                      <UserRound aria-hidden="true" />
                      <strong>
                        INVALID
                        <br />
                        ATTEMPTS
                      </strong>
                    </div>
                    <ArrowDown
                      className="feature-flow-arrow"
                      aria-hidden="true"
                    />
                    <div className="feature-flow-card">
                      <CircleSlash aria-hidden="true" />
                      <strong>
                        REPEATED
                        <br />
                        FAILURES
                      </strong>
                    </div>
                    <ArrowDown
                      className="feature-flow-arrow"
                      aria-hidden="true"
                    />
                    <div className="feature-flow-card">
                      <ListChecks aria-hidden="true" />
                      <strong>
                        FIXED
                        <br />
                        THRESHOLD
                      </strong>
                    </div>
                    <ArrowDown
                      className="feature-flow-arrow"
                      aria-hidden="true"
                    />
                    <div className="feature-flow-card feature-flow-danger">
                      <LockKeyhole aria-hidden="true" />
                      <strong>
                        ACCOUNT
                        <br />
                        LOCKOUT
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="after-column">
                  <span className="feature-badge">PROGRESSIVE LOCKOUT</span>
                  <div className="progressive-flow">
                    <div className="progressive-step progressive-step-success">
                      <strong>1ST–3RD ATTEMPTS</strong>
                      <span>NO LOCKOUT</span>
                    </div>
                    <div className="progressive-step">
                      <strong>4TH ATTEMPT</strong>
                      <span>60 SECONDS</span>
                    </div>
                    <div className="progressive-step">
                      <strong>5TH ATTEMPT</strong>
                      <span>5 MINUTES</span>
                    </div>
                    <div className="progressive-step">
                      <strong>6TH ATTEMPT</strong>
                      <span>10 MINUTES</span>
                    </div>
                    <div className="progressive-step">
                      <strong>7TH ATTEMPT</strong>
                      <span>15 MINUTES</span>
                    </div>
                    <div className="progressive-step">
                      <strong>8TH ATTEMPT</strong>
                      <span>30 MINUTES</span>
                    </div>
                    <div className="progressive-step">
                      <strong>9TH ATTEMPT</strong>
                      <span>4 HOURS</span>
                    </div>
                    <div className="progressive-step progressive-step-danger">
                      <strong>10TH ATTEMPT</strong>
                      <span>INDEFINITE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lockout-matrix-panel">
              <div className="project-panel-heading">
                <h2>EXPECTED LOCKOUT MATRIX</h2>
              </div>
              <div className="lockout-table-wrapper">
                <table className="lockout-table">
                  <thead>
                    <tr>
                      <th>FAILED ATTEMPTS</th>
                      <th>EXPECTED BEHAVIOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1st–3rd</td>
                      <td>No lockout</td>
                    </tr>
                    <tr>
                      <td>4th</td>
                      <td>60 seconds lockout</td>
                    </tr>
                    <tr>
                      <td>5th</td>
                      <td>5 minutes lockout</td>
                    </tr>
                    <tr>
                      <td>6th</td>
                      <td>10 minutes lockout</td>
                    </tr>
                    <tr>
                      <td>7th</td>
                      <td>15 minutes lockout</td>
                    </tr>
                    <tr>
                      <td>8th</td>
                      <td>30 minutes lockout</td>
                    </tr>
                    <tr>
                      <td>9th</td>
                      <td>4 hours lockout</td>
                    </tr>
                    <tr>
                      <td>10th</td>
                      <td>Indefinite lockout</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="lockout-focus">
                <ShieldCheck aria-hidden="true" />
                <p>
                  <strong>QA Focus:</strong> Each transition point represented a
                  different authentication state and required independent
                  validation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="qa-challenge-strategy">
            <div className="qa-challenge-card">
              <p className="eyebrow">QA CHALLENGE</p>
              <p>The system needed to keep multiple states consistent</p>

              <div className="qa-challenge-flow">
                <div className="qa-challenge-step">
                  <div className="qa-challenge-icon">
                    <UserRound />
                  </div>
                  <span className="qa-challenge-label">
                    Failed Attempt Count
                  </span>
                </div>
                <div className="qa-challenge-step">
                  <div className="qa-challenge-icon">
                    <ListChecks />
                  </div>
                  <span className="qa-challenge-label">Lockout Rule</span>
                </div>
                <div className="qa-challenge-step">
                  <div className="qa-challenge-icon">
                    <Shield />
                  </div>
                  <span className="qa-challenge-label">
                    Actual Account State
                  </span>
                </div>
                <div className="qa-challenge-step">
                  <div className="qa-challenge-icon">
                    <MessagesSquare />
                  </div>
                  <span className="qa-challenge-label">Displayed Message</span>
                </div>
                <div className="qa-challenge-step">
                  <div className="qa-challenge-icon">
                    <Clock3 />
                  </div>
                  <span className="qa-challenge-label">Session State</span>
                </div>
              </div>

              <div className="qa-challenge-questions">
                <h3>KEY QA QUESTIONS:</h3>
                <ul className="qa-question-list">
                  <li>
                    Does the correct attempt count trigger the correct lockout?
                  </li>
                  <li>
                    Does the actual lockout duration match the configured
                    behaviour?
                  </li>
                  <li>Does the user see the correct lockout message?</li>
                  <li>What happens when the session expires?</li>
                  <li>Does fixing one lockout scenario affect another?</li>
                </ul>
              </div>
            </div>
            <div className="qa-strategy-card">
              <div className="qa-strategy-header">
                <p className="eyebrow">TEST STRATEGY</p>
                <h2>
                  A combination of test types
                  <br />
                  was used to ensure quality.
                </h2>
                <p>
                  A combination of test approaches was used to validate
                  authentication and lockout behavior across expected and
                  unexpected conditions.
                </p>
              </div>

              <div className="qa-strategy-grid">
                <div className="qa-strategy-item">
                  <div className="qa-strategy-icon">
                    <ShieldCheck />
                  </div>
                  <div>
                    <span className="qa-strategy-number">01</span>
                    <h3>Functional</h3>
                    <p>
                      Validated login behavior, failed attempts, lockout rules,
                      and recovery.
                    </p>
                  </div>
                </div>

                <div className="qa-strategy-item">
                  <div className="qa-strategy-icon">
                    <CircleSlash />
                  </div>
                  <div>
                    <span className="qa-strategy-number">02</span>
                    <h3>Negative</h3>
                    <p>
                      Tested invalid credentials, repeated failures, and
                      incorrect authentication conditions.
                    </p>
                  </div>
                </div>

                <div className="qa-strategy-item">
                  <div className="qa-strategy-icon">
                    <Crosshair />
                  </div>
                  <div>
                    <span className="qa-strategy-number">03</span>
                    <h3>Boundary</h3>
                    <p>
                      Focused on transition points around failed authentication
                      attempts and lockout behavior.
                    </p>
                  </div>
                </div>

                <div className="qa-strategy-item">
                  <div className="qa-strategy-icon">
                    <RotateCcw />
                  </div>
                  <div>
                    <span className="qa-strategy-number">04</span>
                    <h3>Regression</h3>
                    <p>
                      Validated related authentication workflows after the
                      change was implemented.
                    </p>
                  </div>
                </div>

                <div className="qa-strategy-item">
                  <div className="qa-strategy-icon">
                    <LockKeyhole />
                  </div>
                  <div>
                    <span className="qa-strategy-number">05</span>
                    <h3>Security</h3>
                    <p>
                      Verified account protection and authentication behavior
                      remained consistent.
                    </p>
                  </div>
                </div>
                <div className="qa-planning-artifact">
                  <strong>QA PLANNING ARTIFACT</strong>
                  <a
                    href="https://docs.google.com/spreadsheets/d/1vF7GaQ90-BFLyRIpLRBOWx0nLk4LTnho/edit?gid=1187394097#gid=1187394097"
                    target="_blank"
                    rel="noreferrer"
                  >
                    VIEW THE MASTER TEST PLAN
                    <ArrowRight aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <div className="case-study-two-column">
            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>PROGRESSIVE LOCKOUT TEST SCENARIOS</h2>
              </div>
              <div className="qa-table-wrapper">
                <table className="qa-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Scenario</th>
                      <th>Expected Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>TC-001</td>
                      <td>Valid login</td>
                      <td>User logs in successfully</td>
                    </tr>
                    <tr>
                      <td>TC-002</td>
                      <td>1 invalid attempt</td>
                      <td>Login rejected</td>
                    </tr>
                    <tr>
                      <td>TC-003</td>
                      <td>3 invalid attempts</td>
                      <td>No lockout</td>
                    </tr>
                    <tr>
                      <td>TC-004</td>
                      <td>4th invalid attempt</td>
                      <td>60-second lockout</td>
                    </tr>
                    <tr>
                      <td>TC-005</td>
                      <td>5th invalid attempt</td>
                      <td>5-minute lockout</td>
                    </tr>
                    <tr>
                      <td>TC-006</td>
                      <td>6th invalid attempt</td>
                      <td>10-minute lockout</td>
                    </tr>
                    <tr>
                      <td>TC-007</td>
                      <td>7th invalid attempt</td>
                      <td>15-minute lockout</td>
                    </tr>
                    <tr>
                      <td>TC-008</td>
                      <td>8th invalid attempt</td>
                      <td>30-minute lockout</td>
                    </tr>
                    <tr>
                      <td>TC-009</td>
                      <td>9th invalid attempt</td>
                      <td>4-hour lockout</td>
                    </tr>
                    <tr>
                      <td>TC-010</td>
                      <td>10th invalid attempt</td>
                      <td>Indefinite lockout</td>
                    </tr>
                    <tr>
                      <td>TC-011</td>
                      <td>Login during lockout</td>
                      <td>Login remains blocked</td>
                    </tr>
                    <tr>
                      <td>TC-012</td>
                      <td>Session timeout</td>
                      <td>Correct state and message</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="case-callout">
                <strong>BOUNDARY TESTING WAS PRIORITIZED</strong>
                <span>
                  because each threshold changed the expected behavior.
                </span>
              </div>
            </article>

            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>DEFECTS IDENTIFIED</h2>
                <p>During execution, key issues were discovered.</p>
              </div>
              <div className="defect-grid">
                <div className="defect-card">
                  <span className="defect-id">DEFECT 01</span>
                  <h3>Lockout Message Did Not Match Failed Attempt Count</h3>
                  <div className="defect-meta">
                    <span>Severity: High</span>
                    <span>Priority: High</span>
                  </div>
                  <p>
                    The displayed lockout message did not always correspond to
                    the current invalid-login attempt and expected lockout
                    duration.
                  </p>
                  <div className="defect-comparison">
                    <div>
                      <strong>EXPECTED</strong>
                      <span>Correct lockout message</span>
                    </div>
                    <b>VS</b>
                    <div>
                      <strong>ACTUAL</strong>
                      <span>Incorrect message displayed</span>
                    </div>
                  </div>
                  <div className="defect-impact">
                    <strong>IMPACT</strong>
                    <span>
                      Users could receive incorrect information about their
                      account status and recovery time.
                    </span>
                  </div>
                </div>
                <div className="defect-card">
                  <span className="defect-id">DEFECT 02</span>
                  <h3>Incorrect Lockout Message After Session Timeout</h3>
                  <div className="defect-meta">
                    <span>Severity: High</span>
                    <span>Priority: High</span>
                  </div>
                  <p>
                    When the user session timed out, the system could display an
                    incorrect lockout message instead of the appropriate
                    authentication state.
                  </p>
                  <div className="defect-impact">
                    <strong>IMPACT</strong>
                    <span>
                      Users could receive misleading information after session
                      expiration.
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="case-study-two-column">
            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>DEFECT LIFECYCLE</h2>
                <p>From detection to release validation.</p>
              </div>
              <div className="defect-lifecycle">
                {[
                  ["01", "TEST"],
                  ["02", "DEFECT\nIDENTIFIED"],
                  ["03", "AZURE\nDEVOPS"],
                  ["04", "DEVELOPER\nINVESTIGATION"],
                  ["05", "FIXED /\nIMPLEMENTED"],
                  ["06", "RETEST"],
                  ["07", "REGRESSION"],
                  ["08", "RELEASE\nVALIDATION"],
                ].map(([number, label]) => (
                  <div className="lifecycle-step" key={number}>
                    <span>{number}</span>
                    <strong>{label}</strong>
                  </div>
                ))}
              </div>
              <div className="case-callout case-callout-purple">
                <strong>
                  A defect was not considered complete after the initial fix.
                </strong>
                <span>
                  The affected scenario was retested, followed by regression
                  testing of related functionality.
                </span>
              </div>
            </article>

            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>
                  SAMPLE BUG REPORT <span>(AZURE DEVOPS TICKET)</span>
                </h2>
              </div>
              <div className="bug-report">
                <div className="bug-report-title">
                  <span>BUG-001</span>
                  <strong>
                    Lockout Message Did Not Match Failed Attempt Count
                  </strong>
                </div>
                <div className="bug-report-meta">
                  <span>
                    <strong>Severity</strong>
                    <small>High</small>
                  </span>
                  <span>
                    <strong>Priority</strong>
                    <small>High</small>
                  </span>
                  <span>
                    <strong>Environment</strong>
                    <small>UAT</small>
                  </span>
                  <span className="meta-failed">
                    <strong>Initial Test</strong>
                    <small>Failed</small>
                  </span>
                  <span className="meta-passed">
                    <strong>Retest</strong>
                    <small>Passed</small>
                  </span>
                  <span>
                    <strong>Status</strong>
                    <small>Resolved</small>
                  </span>
                </div>
                <div className="bug-report-grid">
                  <div>
                    <strong>REPRODUCTION STEPS</strong>
                    <ol>
                      <li>Open the login page.</li>
                      <li>Enter invalid credentials.</li>
                      <li>Repeat the failed attempt.</li>
                      <li>Observe the lockout message.</li>
                    </ol>
                  </div>
                  <div>
                    <strong>EXPECTED RESULT</strong>
                    <p>
                      Lockout duration and message should match the current
                      failed-attempt count.
                    </p>
                  </div>
                  <div>
                    <strong>ACTUAL RESULT</strong>
                    <p>Incorrect lockout information was displayed.</p>
                  </div>
                  <div>
                    <strong>ACCEPTANCE CRITERIA</strong>
                    <p>
                      Lockout behavior and displayed messaging should correspond
                      to the configured threshold.
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="case-study-two-column">
            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>SAMPLE RETEST TASK</h2>
                <p>
                  Verify that the reported lockout message defect was fixed and
                  the correct message is displayed for each progressive lockout
                  level.
                </p>
              </div>
              <div className="qa-table-wrapper">
                <table className="qa-table qa-table-retest">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Test</th>
                      <th>Expected Result</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "RT-001",
                        "Trigger 4th failed attempt",
                        "60-sec lockout message displayed",
                      ],
                      [
                        "RT-002",
                        "Trigger 5th failed attempt",
                        "5-min lockout message displayed",
                      ],
                      [
                        "RT-003",
                        "Trigger 6th failed attempt",
                        "10-min lockout message displayed",
                      ],
                      [
                        "RT-004",
                        "Trigger 7th failed attempt",
                        "15-min lockout message displayed",
                      ],
                      [
                        "RT-005",
                        "Trigger 8th failed attempt",
                        "30-min lockout message displayed",
                      ],
                      [
                        "RT-006",
                        "Trigger 9th failed attempt",
                        "4-hour lockout message displayed",
                      ],
                      [
                        "RT-007",
                        "Trigger 10th failed attempt",
                        "Indefinite lockout message displayed",
                      ],
                    ].map(([id, test, expected]) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{test}</td>
                        <td>{expected}</td>
                        <td>
                          <span className="pass-result">✓ Pass</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="case-callout">
                <strong>RETEST RESULT</strong>
                <span>
                  The lockout message correctly corresponded to the
                  failed-attempt count and configured lockout duration after the
                  fix.
                </span>
              </div>
            </article>

            <article className="case-study-panel">
              <div className="case-panel-heading">
                <h2>SAMPLE REGRESSION</h2>
                <p>
                  Verify that the lockout fix and implementation changes did not
                  negatively affect existing authentication functionality.
                </p>
              </div>
              <div className="qa-table-wrapper">
                <table className="qa-table qa-table-regression">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Regression Test</th>
                      <th>Expected Result</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "REG-001",
                        "Login with valid credentials",
                        "User logs in successfully",
                      ],
                      [
                        "REG-002",
                        "Login with invalid credentials",
                        "Login is rejected",
                      ],
                      [
                        "REG-003",
                        "Multiple invalid attempts",
                        "Attempts are tracked correctly",
                      ],
                      [
                        "REG-004",
                        "Progressive lockout",
                        "Correct lockout is applied",
                      ],
                      [
                        "REG-005",
                        "Login during lockout",
                        "Login remains blocked",
                      ],
                      [
                        "REG-006",
                        "Lockout message",
                        "Message matches lockout duration",
                      ],
                      [
                        "REG-007",
                        "Session timeout",
                        "Correct authentication state displayed",
                      ],
                      [
                        "REG-008",
                        "Account recovery",
                        "User can recover according to requirements",
                      ],
                      [
                        "REG-009",
                        "Existing login workflow",
                        "Existing functionality remains unaffected",
                      ],
                    ].map(([id, test, expected]) => (
                      <tr key={id}>
                        <td>{id}</td>
                        <td>{test}</td>
                        <td>{expected}</td>
                        <td>
                          <span className="pass-result">✓ Pass</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="case-callout">
                <strong>REGRESSION RESULT</strong>
                <span>
                  The updated lockout implementation and defect fixes did not
                  introduce regressions across the tested authentication
                  workflows.
                </span>
              </div>
            </article>
          </div>
        </div>
      </section>
      <QAWorkflow
        title="QA VALIDATION FLOW"
        validationSteps={validationSteps}
      />
      <section className="section section-muted case-summary-section">
        <div className="container">
          <div className="case-summary-grid">
            <article className="case-summary-panel collaboration-panel">
              <h2>COLLABORATION</h2>
              <div className="collaboration-list">
                {collaborators.map(({ role, details, icon: Icon }) => (
                  <div className="collaboration-item" key={role}>
                    <span className="collaboration-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <div>
                      <h3>{role}</h3>
                      <p>{details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="case-summary-panel resolution-panel">
              <h2>RESOLUTION</h2>
              <p className="resolution-kicker">
                Simplifying the lockout implementation
              </p>
              <p>
                The team simplified two lockout configurations into one
                mechanism while keeping the updated progressive lockout
                behavior.
              </p>
              <div className="resolution-change">
                <div className="resolution-before">
                  <strong>BEFORE</strong>
                  <span>TWO LOCKOUT CONFIGURATIONS</span>
                  <span className="resolution-negative">
                    <X aria-hidden="true" /> MORE COMPLEX
                  </span>
                </div>
                <ArrowDown className="resolution-arrow" aria-hidden="true" />
                <div className="resolution-after">
                  <strong>AFTER</strong>
                  <span>ONE PROGRESSIVE LOCKOUT MECHANISM</span>
                </div>
              </div>
              <ul className="resolution-benefits">
                <li>Simplified configuration</li>
                <li>Progressive lockout logic</li>
                <li>Correct lockout duration</li>
                <li>Correct user message</li>
                <li>Expected session behavior</li>
              </ul>
              <p className="resolution-summary">
                QA revalidated the complete authentication flow after the
                implementation was simplified.
              </p>
            </article>

            <article className="case-summary-panel regression-panel">
              <h2>REGRESSION SCOPE</h2>
              <p>Key areas validated after fixes</p>
              <ul className="regression-scope-list">
                {regressionScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <div className="regression-callout">
                <ShieldCheck aria-hidden="true" />
                <p>
                  A fix was not considered complete until the affected
                  functionality and related workflows were regression tested.
                </p>
              </div>
            </article>

            <article className="case-summary-panel skills-tools-panel">
              <h2>SKILLS AND TOOLS</h2>
              <h3>QA SKILLS</h3>
              <ul className="qa-skills-list">
                {qaSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <h3 className="tools-heading">TOOLS</h3>
              <div className="summary-tool-list">
                <div className="summary-tool">
                  <img src="/icons/azure-devops-mono.svg" alt="" />
                  <span>
                    <strong>AZURE DEVOPS</strong>
                    <small>TEST CASE AND DEFECT MANAGEMENT</small>
                  </span>
                </div>
                <div className="summary-tool">
                  <span className="summary-tool-icon swagger-icon">
                    <Braces aria-hidden="true" />
                  </span>
                  <span>
                    <strong>SWAGGER</strong>
                    <small>API DOCUMENTATION &amp; ANALYSIS</small>
                  </span>
                </div>
                <div className="summary-tool">
                  <img src="/icons/postman-mono.svg" alt="" />
                  <span>
                    <strong>POSTMAN</strong>
                    <small>API TESTING &amp; VALIDATION</small>
                  </span>
                </div>
                <div className="summary-tool">
                  <span className="summary-tool-icon cursor-icon">
                    <Sparkles aria-hidden="true" />
                  </span>
                  <span>
                    <strong>CURSOR AI</strong>
                    <small>AI-ASSISTED ANALYSIS &amp; PRODUCTIVITY</small>
                  </span>
                </div>
              </div>
            </article>

            <article className="case-summary-panel confidentiality-panel">
              <Shield className="confidentiality-shield" aria-hidden="true" />
              <h2>CONFIDENTIALITY</h2>
              <p>
                This case study is based on professional QA experience and has
                been anonymized for portfolio purposes. All company names,
                application names, screenshots, credentials, source code,
                proprietary workflows, internal data, and
                implementation-specific details have been excluded to protect
                confidential information.
              </p>
              <LockKeyhole
                className="confidentiality-lock"
                aria-hidden="true"
              />
            </article>
          </div>

          <div className="summary-pdf-action">
            <a
              href="/documents/case-study-one.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText aria-hidden="true" />
              View Full Case Study in PDF
            </a>
          </div>
        </div>
      </section>
    </CaseStudyLayout>
  );
}

export default App;
