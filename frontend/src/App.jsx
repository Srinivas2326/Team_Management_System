import { useState } from "react";
import Resolver from "./components/Resolver";
import Members from "./components/Members";
import Management from "./components/Management";
import Tasks from "./components/Tasks";
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
          </div>

          <h1>Team Access Control</h1>

          <p>
            Manage cross-team roles and granular
            permission resolution.
          </p>
        </div>

        <button
          className="quickBtn"
          onClick={goManagement}
        >
          Quick Create
        </button>
      </header>

      {/* NAVIGATION */}
      <nav className="tabs">
        <button
          className={
            tab === "resolver"
              ? "activeTab"
              : ""
          }
          onClick={() => setTab("resolver")}
        >
          Permission Resolver
        </button>

        <button
          className={
            tab === "members"
              ? "activeTab"
              : ""
          }
          onClick={() => setTab("members")}
        >
          Team Members
        </button>

        <button
          className={
            tab === "management"
              ? "activeTab"
              : ""
          }
          onClick={() => setTab("management")}
        >
          Management
        </button>

        <button
          className={
            tab === "tasks"
              ? "activeTab"
              : ""
          }
          onClick={() => setTab("tasks")}
        >
          Tasks
        </button>
      </nav>

      {/* MAIN CONTENT */}
      <main className="mainContent">
        {tab === "resolver" && <Resolver />}

        {tab === "members" && <Members />}

        {tab === "management" && (
          <Management />
        )}

        {tab === "tasks" && <Tasks />}
      </main>
    </div>
  );
}

export default App;