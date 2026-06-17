import { useRef, useState } from "react";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { AppSidebar } from "./Reports";

const Home = () => {
  const { loading, generateReport, reports } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resumeMode, setResumeMode] = useState("upload");
  const [selectedFile, setSelectedFile] = useState("");
  const hasResumeFile = Boolean(selectedFile);
  const resumeInputRef = useRef();
  const navigate = useNavigate();

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current?.files?.[0];
    const data = await generateReport({ jobDescription, selfDescription, resumeFile });
    if (data?._id) navigate(`/interview/${data._id}`);
  };

  return (
    <div className="app-shell">
      <AppSidebar active="analysis" />
      <main className="dashboard-page">
        <header className="dashboard-topbar">
          <div>
            <h1>Start a New Analysis</h1>
            <p>Sync your profile with job market requirements using our AI matching engine.</p>
          </div>
          <button className="button ghost-button" onClick={() => navigate("/reports")}>
            My Reports ({reports.length})
          </button>
        </header>

        <section className="analysis-stack">
          <article className="analysis-panel">
            <div className="panel-title">
              <span>▤</span>
              <div>
                <h2>Job Description</h2>
                <p>Paste the full job listing to identify key skills and requirements.</p>
              </div>
            </div>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Example: We are looking for a Senior Product Designer with 5+ years experience in Figma, React, and UX research..."
            />
          </article>

          <article className="analysis-panel">
            <div className="panel-title">
              <span>⇧</span>
              <div>
                <h2>Your Resume</h2>
                <p>Upload a PDF or DOCX, or paste your resume text instead.</p>
              </div>
              <div className="mode-toggle" aria-label="Resume input mode">
                <button className={resumeMode === "upload" ? "active" : ""} onClick={() => setResumeMode("upload")}>Upload</button>
                <button className={resumeMode === "paste" ? "active" : ""} onClick={() => setResumeMode("paste")}>Paste</button>
              </div>
            </div>

            {resumeMode === "upload" ? (
              <label className="dropzone" htmlFor="resume">
                <span className="dropzone__icon">☁</span>
                <strong>{selectedFile || "Drag and drop your PDF or DOCX"}</strong>
                <small>Maximum file size: 10MB</small>
                <span className="button ghost-button">Select File</span>
                <input
                  ref={resumeInputRef}
                  hidden
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0]?.name || "")}
                />
              </label>
            ) : (
              <textarea
                className="resume-paste"
                placeholder="Paste your resume content here. JobSprint will use this along with your self-description."
                onChange={(e) => setSelfDescription((current) => current || e.target.value)}
              />
            )}
          </article>

          <article className="analysis-panel">
            <div className="panel-title">
              <span>✺</span>
              <div>
                <h2>About Yourself</h2>
                <p>Add career goals, strengths, weak points, or interview concerns.</p>
              </div>
            </div>
            <textarea
              value={selfDescription}
              onChange={(e) => setSelfDescription(e.target.value)}
              placeholder="Tell us about your unique strengths or specific interview concerns..."
            />
          </article>
        </section>

        <button
          onClick={handleGenerateReport}
          className="button primary-button analyze-button"
          disabled={loading || !jobDescription.trim() || (!selfDescription.trim() && !hasResumeFile)}
        >
          {loading ? <><span className="mini-spinner" /> Analyzing your fit...</> : "Analyze with AI ✦"}
        </button>
      </main>
    </div>
  );
};

export default Home;
