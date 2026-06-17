import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useInterview } from "../hooks/useInterview.js";
import { useAuth } from "../../auth/hooks/useAuth";
import "../style/home.scss";

const AppSidebar = ({ active }) => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const logout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <aside className="app-sidebar">
      <button className="brand app-sidebar__brand" onClick={() => navigate("/")}>
        <span className="brand__mark">⚡</span>
        JobSprint
      </button>
      <nav>
        <button className={active === "dashboard" ? "active" : ""} onClick={() => navigate("/dashboard")}>▦ Dashboard</button>
        <button className={active === "analysis" ? "active" : ""} onClick={() => navigate("/dashboard")}>✺ New Analysis</button>
        <button className={active === "reports" ? "active" : ""} onClick={() => navigate("/reports")}>▤ My Reports</button>
        <button>◉ Profile</button>
      </nav>
      <div className="app-sidebar__bottom">
        <div className="pro-card"><strong>Pro Plan</strong><span>Unlimited scans</span></div>
        <button onClick={logout}>↪ Logout</button>
      </div>
    </aside>
  );
};

const Reports = () => {
  const navigate = useNavigate();
  const { reports, loading } = useInterview();
  const [query, setQuery] = useState("");

  const filteredReports = useMemo(() => {
    return reports.filter((report) => {
      const title = report.title || "Untitled Position";
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }, [reports, query]);

  if (loading) {
    return <main className="loading-screen"><div className="loader" /><h1>Loading reports...</h1></main>;
  }

  return (
    <div className="app-shell">
      <AppSidebar active="reports" />
      <main className="reports-page">
        <header className="dashboard-topbar">
          <div>
            <h1>My Reports</h1>
            <p>Review your AI-powered performance insights.</p>
          </div>
          <div className="reports-toolbar">
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search reports..." />
            <button className="button ghost-button">Filter</button>
          </div>
        </header>

        <section className="reports-grid">
          {filteredReports.map((report) => (
            <article className="report-card" key={report._id}>
              <div className="report-card__top">
                <span className="report-card__icon">▣</span>
                <strong className={`score-badge ${report.matchScore >= 80 ? "high" : report.matchScore >= 60 ? "mid" : "low"}`}>
                  {report.matchScore || 0}%<small>Match</small>
                </strong>
              </div>
              <h2>{report.title || "Untitled Position"}</h2>
              <p>{report.company || "AI interview analysis"}</p>
              <div className="report-card__footer">
                <span>▣ {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Recently"}</span>
                <button className="button ghost-button" onClick={() => navigate(`/interview/${report._id}`)}>View Report</button>
              </div>
            </article>
          ))}
          <button className="new-report-card" onClick={() => navigate("/dashboard")}>
            <span>+</span>
            Start New Interview
          </button>
        </section>
      </main>
    </div>
  );
};

export { AppSidebar };
export default Reports;
