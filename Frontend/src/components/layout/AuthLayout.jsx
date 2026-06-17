import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";
import BackButton from "./BackButton.jsx";

const AuthLayout = ({ title, children }) => (
  <div className="page-shell">
    <Sidebar />
    <main className="main-content">
      <Topbar title={title} />
      <div className="back-row">
        <BackButton />
      </div>
      <div className="content-inner page-transition">{children}</div>
    </main>
  </div>
);

export default AuthLayout;
