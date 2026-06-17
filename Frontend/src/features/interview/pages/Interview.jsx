import { useEffect, useState } from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

const QuestionAccordion = ({ item, index, tone }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <article className={`question-accordion question-accordion--${tone}`}>
      <button className="question-accordion__trigger" onClick={() => setOpen((value) => !value)}>
        <span className="question-accordion__index">Q{index + 1}</span>
        <strong>{item.question}</strong>
        <span className="question-accordion__pill">Tests: {item.intention || "Role Fit"}</span>
        <span className={`chevron ${open ? "open" : ""}`}>⌄</span>
      </button>
      {open && (
        <div className="question-accordion__body">
          <span>Model Answer</span>
          <p>{item.answer || "Use your strongest project example, explain tradeoffs clearly, and connect the result to business impact."}</p>
        </div>
      )}
    </article>
  );
};

const Interview = () => {
  const { report, getReportById, loading, getResumePdf } = useInterview();
  const { interviewId } = useParams();

  useEffect(() => {
    if (interviewId) {
      getReportById(interviewId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  if (loading || !report) {
    return (
      <main className="loading-screen">
        <div className="loader" />
        <h1>Loading your interview report...</h1>
      </main>
    );
  }

  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behavioralQuestions || [];
  const skillGaps = report.skillGaps || [];
  const preparationPlan = report.preparationPlan || [];
  const score = report.matchScore || 0;
  const scoreClass = score >= 80 ? "high" : score >= 60 ? "mid" : "low";

  return (
    <main className="report-page">
      <header className="report-header">
        <div>
          <p>Mock interview session</p>
          <h1>{report.title || "Interview Report"}</h1>
          <span>Generated on {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : "today"} • AI-powered preparation plan</span>
        </div>
        <button className="button ghost-button" onClick={() => getResumePdf(interviewId)}>⇩ Download PDF</button>
      </header>

      <div className="report-layout">
        <aside className="report-summary">
          <section className="score-card">
            <h2>Match Score</h2>
            <div className={`score-ring ${scoreClass}`} style={{ "--score": score }}>
              <div>
                <strong>{score}</strong>
                <span>Exceptional</span>
              </div>
            </div>
            <p>You are in the top candidate band for this role when you focus on the gaps below.</p>
          </section>

          <section className="skill-card">
            <h2>Skill Analysis</h2>
            <div className="skill-pills">
              {skillGaps.map((gap, index) => (
                <span className={`severity-pill severity-pill--${gap.severity || "medium"}`} key={`${gap.skill}-${index}`}>
                  {gap.skill}
                </span>
              ))}
            </div>
          </section>
        </aside>

        <section className="report-main">
          <section className="report-section">
            <h2>▣ Technical Questions</h2>
            <div className="question-list">
              {technicalQuestions.map((question, index) => (
                <QuestionAccordion key={index} item={question} index={index} tone="technical" />
              ))}
            </div>
          </section>

          <section className="report-section">
            <h2>✺ Behavioral Questions</h2>
            <div className="question-list">
              {behavioralQuestions.map((question, index) => (
                <QuestionAccordion key={index} item={question} index={index} tone="behavioral" />
              ))}
            </div>
          </section>

          <section className="report-section">
            <h2>▤ Preparation Plan</h2>
            <div className="timeline">
              {preparationPlan.map((day) => (
                <article className="timeline-day" key={day.day}>
                  <span className="timeline-day__badge">{day.day}</span>
                  <div>
                    <h3>Day {day.day}: {day.focus}</h3>
                    <ul>
                      {(day.tasks || []).map((task, index) => (
                        <li key={index}><span />{task}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </section>
      </div>

      <footer className="site-footer report-footer">
        <strong>JobSprint</strong>
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

export default Interview;
