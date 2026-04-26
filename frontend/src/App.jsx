import { useState } from "react";
import PermissionResolver from "./components/PermissionResolver";
import Members from "./components/Members";
import Management from "./components/Management";
import "./index.css";

function App() {
  const [tab, setTab] = useState("resolver");

  const goManagement = () => {
    setTab("management");
  };

  return (
    <div className="app">

      {/* HEADER */}
      <header className="topHeader">
        <div>
          <div className="badgeRow">
            <span className="badge">v2.4.0 Stable</span>
            <span className="badge light">Enterprise Edition</span>
          </div>

          <h1>Team Access Control</h1>
          <p>
            Manage cross-team roles and granular permission resolution.
          </p>
        </div>

        <button className="quickBtn" onClick={goManagement}>
          Quick Create
        </button>
      </header>

      {/* NAV */}
      <nav className="tabs">

        <button
          className={tab === "resolver" ? "activeTab" : ""}
          onClick={() => setTab("resolver")}
        >
          Permission Resolver
        </button>

        <button
          className={tab === "members" ? "activeTab" : ""}
          onClick={() => setTab("members")}
        >
          Team Members
        </button>

        <button
          className={tab === "management" ? "activeTab" : ""}
          onClick={() => setTab("management")}
        >
          Management
        </button>

      </nav>

      {/* CONTENT */}
      <main className="mainContent">
        {tab === "resolver" && <PermissionResolver />}
        {tab === "members" && <Members />}
        {tab === "management" && <Management />}
      </main>

    </div>
  );
}

export default App;