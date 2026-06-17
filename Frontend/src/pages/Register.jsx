import { CheckCircle, Lock, Mail, User } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import InputField from "../components/ui/InputField.jsx";
import BackButton from "../components/layout/BackButton.jsx";
import BrandLogo from "../components/layout/BrandLogo.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const labels = ["Weak", "Fair", "Good", "Strong"];

const Register = () => {
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const strength = useMemo(() => {
    let value = 0;
    if (password.length >= 8) value += 1;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) value += 1;
    if (/\d/.test(password)) value += 1;
    if (/[^A-Za-z0-9]/.test(password) || password.length >= 12) value += 1;
    return Math.min(value, 4);
  }, [password]);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await handleRegister({ username, email, password });
      setTimeout(() => navigate("/dashboard"), 450);
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account");
    }
  };

  return (
    <main className="auth-page auth-page--register page-transition">
      <section className="auth-form-panel">
        <GlassCard className="auth-form-card">
          <BackButton className="auth-back-button" />
          <div className="auth-card-nav">
            <BrandLogo />
          </div>
          <h2>Create Your Account</h2>
          <p>Already have an account? <Link to="/login">Log in</Link></p>
          {error && <div className="auth-alert">{error}</div>}
          <form onSubmit={submit}>
            <label>Full Name</label>
            <InputField icon={User} value={username} onChange={(event) => setUsername(event.target.value)} placeholder="John Doe" required />
            <label>Email</label>
            <InputField icon={Mail} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" required />
            <label>Password</label>
            <InputField icon={Lock} type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Create password" required />
            <div className="strength-meter">
              {[1, 2, 3, 4].map((part) => <span className={strength >= part ? `active active-${part}` : ""} key={part} />)}
              <em>{labels[Math.max(strength - 1, 0)]}</em>
            </div>
            <label>Confirm Password</label>
            <div className="confirm-field">
              <InputField icon={Lock} type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" required />
              {confirmPassword && confirmPassword === password && <CheckCircle />}
            </div>
            <label className="terms-row"><input type="checkbox" required /> I agree to the Terms of Service</label>
            <GradientButton className="full-button" disabled={loading} type="submit">
              {loading ? <><span className="mini-spinner" /> Creating...</> : "Create Account"}
            </GradientButton>
          </form>
        </GlassCard>
      </section>
      <section className="auth-visual">
        <h1>Sprint to your dream job</h1>
        <p>Turn every application into a targeted, confidence-building practice plan.</p>
        <div className="floating-pills">
          <span>Resume Fit</span><span>Question Bank</span><span>Skill Gaps</span>
        </div>
      </section>
    </main>
  );
};

export default Register;
