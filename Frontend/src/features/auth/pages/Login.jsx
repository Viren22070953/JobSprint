import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../auth.form.scss";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin({ email, password });
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
    <main className="auth-page auth-page--login">
      <section className="auth-hero">
        <Link className="brand" to="/">
          <span className="brand__mark">⚡</span>
          JobSprint
        </Link>
        <h1>Master your next interview with AI-powered calm and technical precision.</h1>
        <span className="auth-hero__line" />
      </section>

      <section className="auth-card">
        <h1>Welcome back</h1>
        <p>Access your AI interview coach session.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="field-shell">
              <span>✉</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="field-shell">
              <span>▣</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="••••••••"
              />
              <button type="button" onClick={() => setShowPassword((value) => !value)}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="form-row">
            <label className="check-row"><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button className="button primary-button" type="submit">
            Log In →
          </button>
        </form>

        <div className="auth-divider"><span>Or continue with</span></div>
        <div className="social-row">
          <button>Google</button>
          <button>GitHub</button>
        </div>
        <p className="switch-link">
          New to JobSprint? <Link to="/register">Create an account</Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
