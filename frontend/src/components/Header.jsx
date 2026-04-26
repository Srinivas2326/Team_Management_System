function Header({ tab, setTab }) {
  return (
    <div className="header">
      <div>
        <span className="badge">v2.0 Stable</span>
        <h1>Team Access Control</h1>
        <p>Manage users, teams, and permission resolution.</p>
      </div>

      <div className="navButtons">
        <button
          className={tab === "dashboard" ? "active" : ""}
          onClick={() => setTab("dashboard")}
        >
          Dashboard
        </button>

        <button
          className={tab === "management" ? "active" : ""}
          onClick={() => setTab("management")}
        >
          Management
        </button>

        <button
          className={tab === "members" ? "active" : ""}
          onClick={() => setTab("members")}
        >
          Team Members
        </button>

        <button
          className={tab === "resolver" ? "active" : ""}
          onClick={() => setTab("resolver")}
        >
          Permission Resolver
        </button>
      </div>
    </div>
  );
}

export default Header;