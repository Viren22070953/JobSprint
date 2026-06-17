import { BrainCircuit, Briefcase, Check, CloudUpload, FileText, Sparkles, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import GlassCard from "../components/ui/GlassCard.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import { useInterview } from "../features/interview/hooks/useInterview.js";

const messages = [
  "Analyzing your resume...",
  "Matching skills to job requirements...",
  "Generating tailored questions...",
  "Building your preparation plan...",
];

const CharacterCount = ({ value, max = 1800, min = 80 }) => {
  const className = value.length < min ? "danger" : value.length > max * 0.8 ? "warning" : "";
  return <span className={`char-count ${className}`}>{value.length} characters</span>;
};

const NewAnalysis = () => {
  const { generateReport, loading } = useInterview();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [tab, setTab] = useState("paste");
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!loading) return undefined;
    const progressTimer = setInterval(() => setProgress((value) => Math.min(value + 12, 95)), 900);
    const messageTimer = setInterval(() => setMessageIndex((value) => (value + 1) % messages.length), 2000);
    return () => {
      clearInterval(progressTimer);
      clearInterval(messageTimer);
    };
  }, [loading]);

  const submit = async () => {
    const combinedSelf = resumeText ? `${selfDescription}\n\nResume text:\n${resumeText}` : selfDescription;
    const data = await generateReport({ jobDescription, selfDescription: combinedSelf, resumeFile: file });
    if (data?._id) navigate(`/report/${data._id}`);
  };

  const disabled = loading || jobDescription.length < 40 || (tab === "paste" && resumeText.length < 40 && !selfDescription.trim()) || (tab === "upload" && !file && !selfDescription.trim());

  return (
    <AuthLayout title="New Analysis">
      <header className="page-heading">
        <h2><Sparkles /> New Interview Analysis</h2>
        <p>Fill in all three sections for the best AI analysis.</p>
      </header>

      <div className="step-indicator">
        {["Job Details", "Your Resume", "About You"].map((label, index) => (
          <span className={index === 0 || (index === 1 && (resumeText || file)) || (index === 2 && selfDescription) ? "is-done" : ""} key={label}>
            {index === 0 || (index === 1 && (resumeText || file)) || (index === 2 && selfDescription) ? <Check size={14} /> : index + 1}
            {label}
          </span>
        ))}
      </div>

      <div className="analysis-form">
        <GlassCard className="analysis-section">
          <h3><Briefcase /> Job Details</h3>
          <textarea className="input-field" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} placeholder="Paste the full job description for best results..." />
          <CharacterCount value={jobDescription} />
          <p className="tip-text">Tip: Paste the full job description for best results.</p>
        </GlassCard>

        <GlassCard className="analysis-section">
          <h3><FileText /> Your Resume</h3>
          <div className="analysis-tabs">
            <button className={tab === "paste" ? "is-active" : ""} onClick={() => setTab("paste")} type="button">Paste Text</button>
            <button className={tab === "upload" ? "is-active" : ""} onClick={() => setTab("upload")} type="button">Upload PDF</button>
          </div>
          {tab === "paste" ? (
            <>
              <textarea className="input-field" value={resumeText} onChange={(event) => setResumeText(event.target.value)} placeholder="Paste your resume text here..." />
              <CharacterCount value={resumeText} min={120} />
            </>
          ) : (
            <button className="resume-dropzone" onClick={() => fileRef.current?.click()} type="button">
              <CloudUpload size={42} />
              {file ? <strong>{file.name} · {(file.size / 1024 / 1024).toFixed(2)}MB</strong> : <strong>Drag & drop your resume PDF here</strong>}
              <span>or click to browse</span>
              {file && <em onClick={(event) => { event.stopPropagation(); setFile(null); }}><X size={14} /> Remove</em>}
              <input hidden ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={(event) => setFile(event.target.files?.[0] || null)} />
            </button>
          )}
        </GlassCard>

        <GlassCard className="analysis-section">
          <h3><User /> About Yourself</h3>
          <textarea className="input-field" value={selfDescription} onChange={(event) => setSelfDescription(event.target.value)} placeholder="Tell the AI about your experience, strengths, and the role you're targeting..." />
          <CharacterCount value={selfDescription} min={30} max={700} />
        </GlassCard>
      </div>

      <GradientButton className="full-button analyze-submit" disabled={disabled} onClick={submit} type="button">
        {loading ? <><span className="mini-spinner" /> Analyzing...</> : "⚡ Analyze My Interview Fit"}
      </GradientButton>

      {loading && (
        <div className="analysis-overlay">
          <GlassCard className="analysis-loader match-loader">
            <div className="match-loader__header">
              <span><BrainCircuit size={22} /></span>
              <div>
                <h3>Comparing your fit</h3>
                <p>{messages[messageIndex]}</p>
              </div>
            </div>
            <div className="match-loader__stage">
              <div className="loader-profile">
                <strong>Resume</strong>
                <i style={{ "--bar": "86%" }} />
                <i style={{ "--bar": "64%" }} />
                <i style={{ "--bar": "92%" }} />
              </div>
              <div className="loader-orbit">
                <span>{Math.max(progress, 12)}%</span>
              </div>
              <div className="loader-profile">
                <strong>Job Role</strong>
                <i style={{ "--bar": "78%" }} />
                <i style={{ "--bar": "88%" }} />
                <i style={{ "--bar": "70%" }} />
              </div>
            </div>
            <div className="loader-signal-row">
              <span>Skills</span>
              <span>Experience</span>
              <span>Keywords</span>
            </div>
            <div className="progress-track progress-track--rainbow"><span style={{ width: `${progress}%` }} /></div>
          </GlassCard>
        </div>
      )}
    </AuthLayout>
  );
};

export default NewAnalysis;
