import { Copy } from "lucide-react";
import AccordionCard from "../ui/AccordionCard.jsx";
import GradientButton from "../ui/GradientButton.jsx";

const getDifficulty = (answer = "") => {
  const lower = answer.toLowerCase();
  if (answer.length > 620 || /(architecture|scalability|distributed|tradeoff|complexity)/.test(lower)) return "Advanced";
  if (answer.length > 300 || /(optimize|design|pattern|testing|state)/.test(lower)) return "Intermediate";
  return "Beginner";
};

const QuestionAccordion = ({ question, index, open, onToggle, accent = "indigo", onCopy }) => {
  const difficulty = getDifficulty(question.answer);

  return (
    <AccordionCard
      accent={accent}
      badge={`Q${index + 1}`}
      meta={<><span><strong>Intention:</strong> {question.intention || "Role Fit"}</span><em>{difficulty}</em></>}
      open={open}
      title={question.question}
      onToggle={onToggle}
    >
      <div className="question-detail">
        <div>
          <span className="detail-label">Intention</span>
          <p>{question.intention || "Evaluate how clearly you reason through role-specific interview problems."}</p>
        </div>
        <div>
          <span className="detail-label">Suggested Answer</span>
          <pre>{question.answer || "Structure the answer with context, tradeoffs, implementation details, and measurable impact."}</pre>
        </div>
        <GradientButton className="copy-answer" variant="outline" type="button" onClick={() => onCopy(question.answer || question.question)}>
          <Copy size={15} />
          Copy Answer
        </GradientButton>
      </div>
    </AccordionCard>
  );
};

export default QuestionAccordion;
