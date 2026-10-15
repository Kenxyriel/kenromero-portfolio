import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "../../components/ContactForm";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader, { type NavItem } from "../../components/SiteHeader";
import SectionHeading from "../../components/SectionHeading";
import TestimonialsCarousel from "../../components/TestimonialsCarousel";
import usePageMeta from "../../components/usePageMeta";
import { testimonials } from "../../data/testimonials";

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

const navItems: NavItem[] = [
  "About",
  "Expertise",
  "Tools",
  "Projects",
  "Testimonials",
  "Contact",
].map((label) => ({ label, href: `#${label.toLowerCase()}` }));

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
export default function QAHome() {
  usePageMeta(
    "Ken Romero | QA / Application System Engineer",
    "Ken Romero - QA / Application System Engineer portfolio.",
  );

  return (
    <div className="site-shell">
      <SiteHeader brandRole="TECHNICAL PORTFOLIO" navItems={navItems} cta={{ label: "Let's Connect", href: "#contact" }} />

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
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* SECTION: CONTACT */}
        <section id="contact" className="section contact-section">
          <div className="container">
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter role="QA / Application System Engineer" />
    </div>
  );
}
