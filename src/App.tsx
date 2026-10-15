import { Navigate, Route, Routes } from "react-router-dom";
import NotFound from "./components/NotFound";
import ITHome from "./pages/it/ITHome";
import ApiTestingCaseStudy from "./pages/qa/ApiTestingCaseStudy";
import AuthenticationCaseStudy from "./pages/qa/AuthenticationCaseStudy";
import QAHome from "./pages/qa/QAHome";
import VAHome from "./pages/va/VAHome";

// One codebase, one domain, separate entry points per audience.
// The root URL keeps serving the QA portfolio, which is the live, finished section.
function App() {
  return (
    <Routes>
      <Route path="/" element={<QAHome />} />

      <Route path="/qa" element={<QAHome />} />
      <Route
        path="/qa/projects/authentication-testing"
        element={<AuthenticationCaseStudy />}
      />
      <Route path="/qa/projects/api-testing" element={<ApiTestingCaseStudy />} />

      <Route path="/it" element={<ITHome />} />
      <Route path="/va" element={<VAHome />} />

      {/* Legacy case-study URLs that may already have been shared. */}
      <Route
        path="/projects/authentication-testing"
        element={<Navigate to="/qa/projects/authentication-testing" replace />}
      />
      <Route
        path="/projects/api-testing"
        element={<Navigate to="/qa/projects/api-testing" replace />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
