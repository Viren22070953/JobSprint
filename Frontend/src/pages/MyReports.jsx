import { Search, Target, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
import { useInterview } from "../features/interview/hooks/useInterview.js";

const getBand = (score = 0) => {
  if (score >= 70) return "high";
  if (score >= 50) return "medium";
  return "low";
};

const MyReports = () => {
  const { reports, loading, deleteReport } = useInterview();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const confirmDelete = async () => {
    if (!pendingDelete?._id) return;
    setDeleteError("");
    try {
      await deleteReport(pendingDelete._id);
      setPendingDelete(null);
    } catch (error) {
      setDeleteError(error.response?.data?.message || "Could not delete this report. Please try again.");
    }
  };

  const filtered = useMemo(() => reports.filter((report) => {
    const score = report.matchScore || 0;
    const title = (report.title || "Untitled Role").toLowerCase();
    const queryMatch = title.includes(query.toLowerCase());
    const filterMatch = filter === "all" || getBand(score) === filter;
    return queryMatch && filterMatch;
  }), [reports, query, filter]);

  return (
    <AuthLayout title="My Analyses">
      <div className="reports-header">
        <h2>My Analyses <span>{reports.length}</span></h2>
        <div className="reports-search"><Search size={18} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search analyses..." /></div>
        <div className="filter-pills">
          {[
            ["all", "All"],
            ["high", "High Match (70+)"],
            ["medium", "Medium"],
            ["low", "Low"],
          ].map(([value, label]) => <button className={filter === value ? "is-active" : ""} key={value} onClick={() => setFilter(value)}>{label}</button>)}
        </div>
      </div>

      {loading ? (
        <div className="analysis-grid"><SkeletonLoader height={260} /><SkeletonLoader height={260} /><SkeletonLoader height={260} /></div>
      ) : filtered.length ? (
        <div className="analysis-grid">
          {filtered.map((report) => {
            const band = getBand(report.matchScore);
            return (
              <GlassCard className={`analysis-card analysis-card--${band}`} hover key={report._id}>
                <div className="analysis-card__line" />
                <h3>{report.title || "Untitled Role"}</h3>
                <p>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Recently generated"}</p>
                <div className="analysis-card__score">
                  <span>{report.matchScore || 0}%</span>
                  <em>Match</em>
                </div>
                <p className="gap-count"><Target size={16} /> {(report.skillGaps || []).length} gaps identified</p>
                <div className="analysis-card__actions">
                  <GradientButton onClick={() => navigate(`/report/${report._id}`)} type="button">View Report →</GradientButton>
                  <button className="icon-button delete-button" onClick={() => setPendingDelete(report)} type="button"><Trash2 size={18} /></button>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        <GlassCard className="empty-state">
          <Search size={54} />
          <h3>Start your first analysis!</h3>
          <p>Your AI preparation reports will appear here.</p>
          <GradientButton as={Link} to="/analyze">New Analysis</GradientButton>
        </GlassCard>
      )}

      {pendingDelete && (
        <div className="modal-overlay">
          <GlassCard className="confirm-modal">
            <h3>Delete this report?</h3>
            <p>This will permanently delete "{pendingDelete.title || "Untitled Role"}" from your reports.</p>
            {deleteError && <div className="auth-alert">{deleteError}</div>}
            <div>
              <GradientButton variant="outline" onClick={() => setPendingDelete(null)} type="button">Cancel</GradientButton>
              <GradientButton disabled={loading} onClick={confirmDelete} type="button">
                {loading ? <><span className="mini-spinner" /> Deleting...</> : "Confirm"}
              </GradientButton>
            </div>
          </GlassCard>
        </div>
      )}
    </AuthLayout>
  );
};

export default MyReports;
