import { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const strength = useMemo(() => {
    if (password.length >= 12) return "strong";
    if (password.length >= 8) return "medium";
    return "low";
  }, [password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await handleRegister({ username, email, password });
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid email or password");
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loader" />
        <h1>Loading...</h1>
      </main>
    );
  }

  return (
    <main className="auth-page auth-page--register">
      <section className="auth-hero">
        <p className="eyebrow">✦ Next-gen career intelligence</p>
        <h1>Master Your Next Interview</h1>
        <p>Join professionals using JobSprint's AI-driven feedback loops to land roles with stronger preparation.</p>
        <div className="auth-benefits">
          <article><strong>Real-time feedback</strong><span>Tone, pace, clarity, and answer structure.</span></article>
          <article><strong>Behavioral analysis</strong><span>Insights into emotional intelligence and soft skills.</span></article>
        </div>
      </section>

      <section className="auth-card">
        <Link className="brand" to="/">
          <span className="brand__mark">⚡</span>
          JobSprint
        </Link>
        <h1>Create your account</h1>
        <p>Start your 7-day free trial of JobSprint Pro.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Full Name</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              name="username"
              placeholder="John Doe"
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="name@company.com"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
            />
            <div className={`strength-bar strength-bar--${strength}`}><span /></div>
            <small>At least 8 characters</small>
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
            />
          </div>

          <label className="check-row">
            <input type="checkbox" required />
            I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </label>

          <button className="button primary-button">Create Account →</button>
        </form>

        <div className="auth-divider"><span>Or register with</span></div>
        <div className="social-row">
          <button>Google</button>
          <button>Apple</button>
        </div>
        <p className="switch-link">Already have an account? <Link to="/login">Log in</Link></p>
      </section>
    </main>
  );
};

export default Register;
