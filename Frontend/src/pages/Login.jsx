import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import InputField from "../components/ui/InputField.jsx";
import BackButton from "../components/layout/BackButton.jsx";
import BrandLogo from "../components/layout/BrandLogo.jsx";
import { useAuth } from "../features/auth/hooks/useAuth.js";

const Login = () => {
  const { handleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      await handleLogin({ email, password });
      setSuccess(true);
      setTimeout(() => navigate("/dashboard"), 450);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <main className="auth-page auth-page--login page-transition">
      <section className="auth-visual">
        <h1>Welcome Back</h1>
        <p>Your interview prep journey continues here.</p>
        <div className="floating-pills">
          <span>AI Analysis</span><span>Match Score</span><span>Prep Plan</span>
        </div>
        <GlassCard className="dashboard-preview">
          <strong>Today&apos;s Sprint</strong>
          <div><span />Resume keyword match improved by 18%</div>
          <div><span />3 behavioral questions ready</div>
        </GlassCard>
      </section>
      <section className="auth-form-panel">
        <GlassCard className="auth-form-card">
          <BackButton className="auth-back-button" />
          <div className="auth-card-nav">
            <BrandLogo />
          </div>
          <h2>Log in to JobSprint</h2>
          <p>Don&apos;t have an account? <Link to="/register">Sign up</Link></p>
          {error && <div className="auth-alert">{error}</div>}
          {success && <div className="auth-success">Success. Opening your dashboard...</div>}
          <form onSubmit={submit}>
            <label>Email</label>
            <InputField icon={Mail} type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" required />
            <label>Password</label>
            <div className="password-field">
              <InputField icon={Lock} type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>{showPassword ? <EyeOff /> : <Eye />}</button>
            </div>
            <div className="auth-row">
              <label><input type="checkbox" /> Remember me</label>
              <a href="#">Forgot password?</a>
            </div>
            <GradientButton className="full-button" disabled={loading} type="submit">
              {loading ? <><span className="mini-spinner" /> Logging in...</> : "Log In"}
            </GradientButton>
          </form>
        </GlassCard>
      </section>
    </main>
  );
};

export default Login;
