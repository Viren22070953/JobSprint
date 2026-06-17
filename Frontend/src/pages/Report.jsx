import { Code2, Download, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout.jsx";
import MatchScoreGauge from "../components/report/MatchScoreGauge.jsx";
import PrepTimeline from "../components/report/PrepTimeline.jsx";
import QuestionAccordion from "../components/report/QuestionAccordion.jsx";
import SkillGapSection from "../components/report/SkillGapSection.jsx";
import GradientButton from "../components/ui/GradientButton.jsx";
import SkeletonLoader from "../components/ui/SkeletonLoader.jsx";
import Toast from "../components/ui/Toast.jsx";
import { useInterview } from "../features/interview/hooks/useInterview.js";

const QuestionSection = ({ title, accent, questions, onCopy }) => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="report-block">
      <div className="report-block__heading">
        <Code2 />
        <div>
          <h2>{title}</h2>
          <p>{questions.length} questions</p>
        </div>
      </div>
      <div className="question-stack">
        {questions.map((question, index) => (
          <QuestionAccordion
            accent={accent}
            index={index}
            key={`${question.question}-${index}`}
            onCopy={onCopy}
            onToggle={() => setOpenIndex((current) => current === index ? -1 : index)}
            open={openIndex === index}
            question={question}
          />
        ))}
      </div>
    </section>
  );
};

const Report = () => {
  const { interviewId } = useParams();
  const navigate = useNavigate();
  const { report, loading, getReportById, getResumePdf } = useInterview();
  const [toast, setToast] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (interviewId) getReportById(interviewId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interviewId]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total <= 0 ? 0 : (window.scrollY / total) * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const safeReport = useMemo(() => report || {}, [report]);
  const copyAnswer = async (text) => {
    await navigator.clipboard.writeText(text || "");
    setToast("Copied to clipboard");
    setTimeout(() => setToast(""), 2000);
  };

  if (loading || !report) {
    return (
      <AuthLayout title="Report">
        <SkeletonLoader height={280} />
        <div className="question-stack"><SkeletonLoader height={120} /><SkeletonLoader height={120} /><SkeletonLoader height={120} /></div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Interview Report">
      <div className="reading-progress" style={{ width: `${progress}%` }} />
      <header className="report-hero">
        <div>
          <h2>{safeReport.title || "Interview Report"}</h2>
          <p>Generated on {safeReport.createdAt ? new Date(safeReport.createdAt).toLocaleDateString() : "today"} · {safeReport.matchScore || 0}% Match</p>
        </div>
        <div>
          <GradientButton variant="outline" onClick={() => getResumePdf(interviewId)} type="button"><Download size={18} /> Download PDF</GradientButton>
          <GradientButton onClick={() => navigate("/analyze")} type="button"><Sparkles size={18} /> New Analysis</GradientButton>
        </div>
      </header>

      <MatchScoreGauge score={safeReport.matchScore || 0} />
      <QuestionSection accent="indigo" title="Technical Questions" questions={safeReport.technicalQuestions || []} onCopy={copyAnswer} />
      <QuestionSection accent="violet" title="Behavioral Questions" questions={safeReport.behavioralQuestions || []} onCopy={copyAnswer} />
      <SkillGapSection gaps={safeReport.skillGaps || []} />
      <PrepTimeline plan={safeReport.preparationPlan || []} />
      <Toast message={toast} />
    </AuthLayout>
  );
};

export default Report;
