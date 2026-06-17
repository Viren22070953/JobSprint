import { FileText, LayoutDashboard, LogOut, Sparkles, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth.js";
import BrandLogo from "./BrandLogo.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/analyze", label: "New Analysis", icon: Sparkles },
  { to: "/reports", label: "My Reports", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();

  const logout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <BrandLogo className="sidebar__logo" to="/dashboard" />
      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink className={({ isActive }) => `sidebar__item ${isActive ? "is-active" : ""}`} key={item.to} to={item.to}>
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <button className="sidebar__item sidebar__logout" onClick={logout} type="button">
        <LogOut size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
