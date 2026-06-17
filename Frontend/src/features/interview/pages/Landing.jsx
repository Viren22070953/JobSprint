import { Link } from "react-router-dom";
import "../style/home.scss";

const SparkIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2Z" />
  </svg>
);

const FeatureCard = ({ icon, title, children, wide }) => (
  <article className={`feature-card ${wide ? "feature-card--wide" : ""}`}>
    <span className="feature-card__icon">{icon}</span>
    <h3>{title}</h3>
    <p>{children}</p>
  </article>
);

const Landing = () => {
  return (
    <main className="landing-page">
      <nav className="marketing-nav">
        <Link className="brand" to="/">
          <span className="brand__mark"><SparkIcon /></span>
          JobSprint
        </Link>
        <div className="marketing-nav__links">
          <a href="#features">Features</a>
          <a href="#how">How it Works</a>
        </div>
        <div className="marketing-nav__actions">
          <Link to="/login">Log In</Link>
          <Link className="button primary-button" to="/register">Sign Up</Link>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-section__copy">
          <p className="eyebrow">Next-gen career intelligence</p>
          <h1>Walk into your interview already prepared</h1>
          <p>
            Upload a job description, your resume, and a few personal notes.
            JobSprint turns them into match scores, interview questions, skill
            gaps, and a day-by-day preparation sprint.
          </p>
          <div className="hero-section__actions">
            <Link className="button primary-button" to="/register">Get Started Free</Link>
            <Link className="button ghost-button" to="/login">Log In</Link>
          </div>
        </div>

        <div className="report-preview" aria-label="JobSprint report preview">
          <div className="verified-badge">AI Verified Profile</div>
          <div className="report-preview__header">
            <span className="report-preview__avatar"><SparkIcon /></span>
            <div>
              <p>Match Analysis</p>
              <span>Senior Product Designer</span>
            </div>
            <strong>92%</strong>
          </div>
          <div className="preview-bar"><span /></div>
          <div className="preview-grid">
            <div><span>Skill Gap</span><strong>System Design</strong></div>
            <div><span>Key Strength</span><strong>User Research</strong></div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <div className="section-heading">
          <h2>Master the art of interviewing</h2>
          <p>Specialized AI workflows cover the full interview preparation cycle.</p>
        </div>
        <div className="features-grid">
          <FeatureCard title="Resume Analysis" wide icon="▤">
            Deep semantic analysis of your career history against real job requirements.
          </FeatureCard>
          <FeatureCard title="Skill Gap Detection" icon="↗">
            Identify missing technical and soft skills with severity-based priorities.
          </FeatureCard>
          <FeatureCard title="AI-Generated Questions" icon="▣">
            Practice tailored technical and behavioral prompts for the role.
          </FeatureCard>
          <FeatureCard title="Personalized Prep Plan" wide icon="☑">
            Get a practical sprint plan that adapts to your weak points.
          </FeatureCard>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-heading">
          <h2>The 3-step success sprint</h2>
        </div>
        <div className="steps-line">
          {["Upload", "Analyze", "Prepare"].map((step, index) => (
            <div className="step" key={step}>
              <span>{index + 1}</span>
              <h3>{step}</h3>
              <p>
                {index === 0 && "Drop in your resume, job description, and goals."}
                {index === 1 && "AI maps fit, gaps, questions, and your score."}
                {index === 2 && "Practice with a focused plan and report insights."}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <h2>Stop guessing. Start practicing.</h2>
        <p>Join professionals using JobSprint AI coaching to prepare with precision.</p>
        <Link className="button primary-button" to="/register">Land Your Dream Job Now</Link>
      </section>

      <footer className="site-footer">
        <Link className="brand" to="/">JobSprint</Link>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Support</a>
        </div>
        <p>© 2026 JobSprint AI. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Landing;
