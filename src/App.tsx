import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LegalPage from "./components/LegalPage";
import NotFound from "./components/NotFound";
import ScrollManager from "./components/ScrollManager";
import ViewSwitcher from "./components/ViewSwitcher";
import { packagePageForHost } from "./packageHosts";

// One codebase, separate entry points per audience. VITE_PORTFOLIO decides
// which portfolios a deployment contains: "all" (default), "qa" (QA + development),
// or "va". These checks are written inline so the build drops every portfolio
// it does not serve: a VA-only site does not even contain the QA pages.
const mode = import.meta.env.VITE_PORTFOLIO;
// "it" is kept as an alias: the IT portfolio is now part of the QA + development one.
const HAS_QA = !mode || mode === "all" || mode === "qa" || mode === "it";
const HAS_VA = !mode || mode === "all" || mode === "va";
const SINGLE = mode === "qa" || mode === "it" || mode === "va";

const QAHome = HAS_QA ? lazy(() => import("./pages/qa/QAHome")) : null;
const AuthenticationCaseStudy = HAS_QA ? lazy(() => import("./pages/qa/AuthenticationCaseStudy")) : null;
const ApiTestingCaseStudy = HAS_QA ? lazy(() => import("./pages/qa/ApiTestingCaseStudy")) : null;
const SaripointCaseStudy = HAS_QA ? lazy(() => import("./pages/qa/SaripointCaseStudy")) : null;
const JjjWebsiteCaseStudy = HAS_QA ? lazy(() => import("./pages/qa/JjjWebsiteCaseStudy")) : null;
const SalinLibroCaseStudy = HAS_QA ? lazy(() => import("./pages/qa/SalinLibroCaseStudy")) : null;

const VAHome = HAS_VA ? lazy(() => import("./pages/va/VAHome")) : null;
const VADesignBranding = HAS_VA ? lazy(() => import("./pages/va/VADesignBranding")) : null;
const VASocialMedia = HAS_VA ? lazy(() => import("./pages/va/VASocialMedia")) : null;
const VAPodcastEditing = HAS_VA ? lazy(() => import("./pages/va/VAPodcastEditing")) : null;
const VAPodcastPackages = HAS_VA
  ? lazy(() => import("./pages/va/VAPackages").then((m) => ({ default: m.VAPodcastPackages })))
  : null;
const VALegal = HAS_VA ? lazy(() => import("./pages/va/VALegal")) : null;
const VASmmPackages = HAS_VA
  ? lazy(() => import("./pages/va/VAPackages").then((m) => ({ default: m.VASmmPackages })))
  : null;

// The root URL shows the QA portfolio on the combined site, or the only
// portfolio a single-audience site serves.
function rootElement() {
  // Package subdomains (smm-packages.creative..., etc.) show one price list.
  const packagePage = HAS_VA ? packagePageForHost() : null;
  if (packagePage === "smm-usd" && VASmmPackages) return <VASmmPackages currency="usd" />;
  if (packagePage === "smm-php" && VASmmPackages) return <VASmmPackages currency="php" />;
  if (packagePage === "podcast" && VAPodcastPackages) return <VAPodcastPackages />;

  if (mode === "va") return <Navigate to="/va" replace />;
  return QAHome ? <QAHome /> : <NotFound />;
}

function App() {
  return (
    <>
      <ScrollManager />
      <Suspense fallback={<div className="route-loading" />}>
        <Routes>
          <Route path="/" element={rootElement()} />

          {/* Legal pages. The VA-only site keeps them inside the creative theme. */}
          {mode === "va" ? (
            <>
              <Route path="/privacy" element={<Navigate to="/va/privacy" replace />} />
              <Route path="/terms" element={<Navigate to="/va/terms" replace />} />
            </>
          ) : (
            <>
              <Route path="/privacy" element={<LegalPage slug="privacy" />} />
              <Route path="/terms" element={<LegalPage slug="terms" />} />
            </>
          )}

          {QAHome && AuthenticationCaseStudy && ApiTestingCaseStudy && SaripointCaseStudy && JjjWebsiteCaseStudy && SalinLibroCaseStudy && (
            <>
              <Route path="/qa" element={<QAHome />} />
              <Route path="/qa/projects/authentication-testing" element={<AuthenticationCaseStudy />} />
              <Route path="/qa/projects/api-testing" element={<ApiTestingCaseStudy />} />
              <Route path="/qa/projects/saripoint" element={<SaripointCaseStudy />} />
              <Route path="/qa/projects/jjj-website" element={<JjjWebsiteCaseStudy />} />
              <Route path="/qa/projects/salinlibro-cms" element={<SalinLibroCaseStudy />} />

              {/* Legacy case-study URLs that may already have been shared. */}
              <Route
                path="/projects/authentication-testing"
                element={<Navigate to="/qa/projects/authentication-testing" replace />}
              />
              <Route path="/projects/api-testing" element={<Navigate to="/qa/projects/api-testing" replace />} />
              {/* The IT portfolio was merged into this one. */}
              <Route path="/it" element={<Navigate to="/qa" replace />} />
            </>
          )}

          {VAHome && VADesignBranding && VASocialMedia && VAPodcastEditing && VAPodcastPackages && VASmmPackages && VALegal && (
            <>
              <Route path="/va" element={<VAHome />} />
              <Route path="/va/design-branding" element={<VADesignBranding />} />
              <Route path="/va/social-media-content" element={<VASocialMedia />} />
              <Route path="/va/podcast-editing" element={<VAPodcastEditing />} />
              <Route path="/va/podcast-packages" element={<VAPodcastPackages />} />
              <Route path="/va/smm-packages" element={<VASmmPackages currency="usd" />} />
              <Route path="/va/smm-local-packages" element={<VASmmPackages currency="php" />} />
              <Route path="/va/privacy" element={<VALegal slug="privacy" />} />
              <Route path="/va/terms" element={<VALegal slug="terms" />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {!SINGLE && <ViewSwitcher />}
    </>
  );
}

export default App;
