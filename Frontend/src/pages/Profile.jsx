import { AtSign, BadgeCheck, CalendarDays, Mail, ShieldCheck, User } from "lucide-react";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const Profile = () => {
  const { user } = useAuth();
  const displayName = user?.username || user?.name || "JobSprint User";
  const email = user?.email || "No email available";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "JS";

  return (
    <AuthLayout title="Profile">
      <section className="profile-page">
        <GlassCard className="profile-hero">
          <div className="profile-avatar">{initials}</div>
          <div>
            <span className="profile-kicker"><BadgeCheck size={16} /> Active JobSprint profile</span>
            <h2>{displayName}</h2>
            <p>Sprint to your dream job with a profile ready for AI interview analysis.</p>
          </div>
          <GradientButton as="button" type="button" variant="outline">
            <ShieldCheck size={18} />
            Verified
          </GradientButton>
        </GlassCard>

        <div className="profile-grid">
          <GlassCard className="profile-panel">
            <h3><User size={20} /> Account Details</h3>
            <div className="profile-field">
              <span><User size={16} /> Full Name</span>
              <strong>{displayName}</strong>
            </div>
            <div className="profile-field">
              <span><Mail size={16} /> Email Address</span>
              <strong>{email}</strong>
            </div>
            <div className="profile-field">
              <span><AtSign size={16} /> Username</span>
              <strong>{user?.username || "Not set"}</strong>
            </div>
          </GlassCard>

          <GlassCard className="profile-panel">
            <h3><CalendarDays size={20} /> Preparation Status</h3>
            <div className="profile-status-card">
              <strong>Ready for analysis</strong>
              <p>Your account can submit job descriptions, resumes, and self descriptions to generate AI-powered reports.</p>
            </div>
            <div className="profile-status-card">
              <strong>Profile tip</strong>
              <p>Use a detailed self-description in New Analysis for stronger personalized questions and prep plans.</p>
            </div>
          </GlassCard>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Profile;
