import { Bell } from "lucide-react";
import { useAuth } from "../../features/auth/hooks/useAuth.js";

const Topbar = ({ title }) => {
  const { user } = useAuth();
  const name = user?.username || user?.name || user?.email || "JS";
  const initials = name
    .split(/\s|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "JS";

  return (
    <header className="topbar">
      <div className="topbar__left">
        <h1>{title}</h1>
      </div>
      <div className="topbar__actions">
        <button className="icon-button" type="button" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <span className="topbar__avatar">{initials}</span>
      </div>
    </header>
  );
};

export default Topbar;
