import { ArrowRight, BarChart3, Flame, Lightbulb, Rocket, Sparkles, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";
import { useInterview } from "../features/interview/hooks/useInterview.js";

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const tips = [
  "Tailor your resume keywords to the job description.",
  "Practice the STAR method for behavioral questions.",
  "Research the company before the interview.",
  "Speak your answers out loud to improve clarity.",
];

const Dashboard = () => {
  const { user } = useAuth();
  const { reports, loading } = useInterview();
  const navigate = useNavigate();
  const name = user?.username || user?.name || "there";
  const average = reports.length ? Math.round(reports.reduce((sum, report) => sum + (report.matchScore || 0), 0) / reports.length) : 0;
  const recentReports = reports.slice(0, 3);

  return (
    <AuthLayout title="Dashboard">
      <GlassCard className="welcome-banner">
        <div>
          <h2>{greeting()}, {name}</h2>
          <p>Ready to prepare for your next interview?</p>
        </div>
        <GradientButton onClick={() => navigate("/analyze")} type="button"><Sparkles size={18} /> Start New Analysis</GradientButton>
      </GlassCard>

      <section className="stats-row">
        <GlassCard className="stat-card"><BarChart3 /><strong>{reports.length}</strong><span>Total Analyses Done</span></GlassCard>
        <GlassCard className="stat-card"><TrendingUp /><strong>{average}%</strong><span>Average Match Score</span></GlassCard>
        <GlassCard className="stat-card"><Flame /><strong>{Math.max(reports.length, 1)}</strong><span>Streak Days Preparing</span></GlassCard>
      </section>

      <section className="dashboard-section">
        <div className="section-row-title">
          <h2>Recent Analyses</h2>
          <Link to="/reports">View All <ArrowRight size={16} /></Link>
        </div>
        {loading ? (
          <div className="report-card-grid"><SkeletonLoader height={210} /><SkeletonLoader height={210} /><SkeletonLoader height={210} /></div>
        ) : recentReports.length ? (
          <div className="report-card-grid">
            {recentReports.map((report) => (
              <GlassCard className="mini-report-card" hover key={report._id} onClick={() => navigate(`/report/${report._id}`)}>
                <strong>{report.title || "Untitled Role"}</strong>
                <span>{report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "Recently"}</span>
                <em>{report.matchScore || 0}% Match</em>
              </GlassCard>
            ))}
          </div>
        ) : (
          <GlassCard className="empty-state">
            <Rocket size={54} />
            <h3>No analyses yet</h3>
            <p>Start your first analysis and get a tailored prep kit.</p>
            <GradientButton as={Link} to="/analyze">Create Analysis</GradientButton>
          </GlassCard>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Quick Tips</h2>
        <div className="tips-row">
          {tips.map((tip) => (
            <GlassCard className="tip-card" key={tip}><Lightbulb size={20} /><span>{tip}</span></GlassCard>
          ))}
        </div>
      </section>
    </AuthLayout>
  );
};

export default Dashboard;
