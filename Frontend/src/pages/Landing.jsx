import { ArrowRight, BrainCircuit, FileText, Lightbulb, Search, Sparkles, Target, Trophy, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import BrandLogo from "../components/layout/BrandLogo.jsx";
import useTypewriter from "../hooks/useTypewriter.js";

const steps = [
  { icon: Upload, title: "Share Your Details", text: "Upload your resume, paste the job, and add your goals." },
  { icon: Sparkles, title: "AI Analyzes Everything", text: "JobSprint maps your skills, gaps, and role fit." },
  { icon: Trophy, title: "Get Your Prep Kit", text: "Receive questions, answers, and a day-by-day plan." },
];

const features = [
  { icon: Target, title: "Match Score", text: "Know exactly how well you fit the role." },
  { icon: Lightbulb, title: "AI Questions", text: "Get technical and behavioral questions tailored to you." },
  { icon: Search, title: "Skill Gaps", text: "Discover what skills to build before the interview." },
  { icon: FileText, title: "Prep Plan", text: "Follow a day-by-day plan built just for you." },
];

const Landing = () => {
  const typed = useTypewriter("Land Your Dream Job", 38);

  return (
    <main className="landing-page page-transition">
      <nav className="landing-nav">
        <div className="landing-nav__left">
          <BrandLogo />
        </div>
        <div className="landing-nav__actions">
          <GradientButton as={Link} to="/login" variant="outline">Log In</GradientButton>
          <GradientButton as={Link} to="/register">Get Started</GradientButton>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-hero__copy">
          <span className="hero-badge">AI-Powered Interview Prep</span>
          <h1>
            <span>{typed}</span>
            <span className="gradient-text">With Confidence</span>
          </h1>
          <p>Upload your resume, paste the job description, and let AI build your personalized interview preparation kit in seconds.</p>
          <div className="hero-actions">
            <GradientButton as={Link} to="/register">Start Preparing Free <ArrowRight size={18} /></GradientButton>
            <GradientButton as="a" href="#how" variant="outline">See How It Works</GradientButton>
          </div>
          <small>Match scores · AI questions · Prep plans</small>
        </div>

        <GlassCard className="hero-mockup match-comparison-card">
          <div className="match-comparison-card__top">
            <span className="comparison-icon"><BrainCircuit size={20} /></span>
            <div>
              <strong>AI Match Comparison</strong>
              <small>Resume vs job requirements</small>
            </div>
            <em>Live</em>
          </div>
          <div className="comparison-score-ring">
            <div>
              <strong>92%</strong>
              <span>Role Fit</span>
            </div>
          </div>
          <div className="comparison-columns">
            <div>
              <span>Resume Signals</span>
              <p style={{ "--bar": "88%" }}><em>React</em><i /></p>
              <p style={{ "--bar": "78%" }}><em>System Design</em><i /></p>
              <p style={{ "--bar": "94%" }}><em>Projects</em><i /></p>
            </div>
            <div>
              <span>Role Needs</span>
              <p style={{ "--bar": "92%" }}><em>Frontend</em><i /></p>
              <p style={{ "--bar": "70%" }}><em>APIs</em><i /></p>
              <p style={{ "--bar": "84%" }}><em>Communication</em><i /></p>
            </div>
          </div>
          <div className="comparison-insights">
            <span>Strong fit</span>
            <span>2 gaps found</span>
            <span>7-day sprint ready</span>
          </div>
        </GlassCard>
        <span className="scroll-indicator">⌄</span>
      </section>

      <section className="landing-section" id="how">
        <div className="landing-section__heading">
          <h2>How JobSprint Works</h2>
          <p>Three focused steps turn raw career material into a role-specific preparation sprint.</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <GlassCard className="step-card" hover key={step.title}>
                <span className="step-card__number">{index + 1}</span>
                <Icon />
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <section className="stats-strip">
        <strong>10,000+<span>Analyses Done</span></strong>
        <strong>95%<span>User Satisfaction</span></strong>
        <strong>50+<span>Tech Stacks Covered</span></strong>
      </section>

      <section className="landing-section">
        <div className="landing-section__heading">
          <h2>Everything you need before the interview</h2>
        </div>
        <div className="feature-grid">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <GlassCard className="feature-tile" hover key={feature.title}>
                <span><Icon /></span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      <footer className="landing-footer">
        <BrandLogo />
        <div>
          <a href="#how">How it Works</a>
          <Link to="/login">Log In</Link>
          <Link to="/register">Get Started</Link>
        </div>
        <p>© 2026 JobSprint. All rights reserved.</p>
      </footer>
    </main>
  );
};

export default Landing;
