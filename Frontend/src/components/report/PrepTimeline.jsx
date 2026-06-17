import { Calendar } from "lucide-react";
import { useState } from "react";
import GlassCard from "../ui/GlassCard.jsx";

const DayCard = ({ day }) => {
  const [checked, setChecked] = useState({});
  const tasks = day.tasks || [];
  const completed = tasks.filter((_, index) => checked[index]).length;
  const complete = tasks.length > 0 && completed === tasks.length;

  return (
    <div className="timeline-item">
      <span className="timeline-item__dot">{day.day}</span>
      <GlassCard className={`timeline-card ${complete ? "is-complete" : ""}`}>
        <div className="timeline-card__top">
          <span>Day {day.day}</span>
          <em>{complete ? "Day Complete!" : `${completed}/${tasks.length} tasks done`}</em>
        </div>
        <h3 className="gradient-text">{day.focus}</h3>
        <ul className="task-list">
          {tasks.map((task, index) => (
            <li className={checked[index] ? "is-checked" : ""} key={task}>
              <button
                aria-label={`Mark ${task} complete`}
                className="task-check"
                onClick={() => setChecked((current) => ({ ...current, [index]: !current[index] }))}
                type="button"
              >
                {checked[index] && "✓"}
              </button>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </GlassCard>
    </div>
  );
};

const PrepTimeline = ({ plan = [] }) => (
  <section className="report-block">
    <div className="report-block__heading">
      <Calendar />
      <div>
        <h2>Preparation Plan</h2>
        <p>Check off each action as you finish your sprint.</p>
      </div>
    </div>
    <div className="prep-timeline">
      {plan.map((day) => <DayCard day={day} key={day.day} />)}
    </div>
  </section>
);

export default PrepTimeline;
