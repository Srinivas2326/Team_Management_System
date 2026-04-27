import { useState } from "react";
import API from "../api";

function Management() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");

  // Create User
  const createUser = async () => {
    try {
      if (!name.trim() || !email.trim()) {
        alert("Please enter full name and email");
        return;
      }

      await API.post("/users", {
        name: name.trim(),
        email: email.trim()
      });

      alert("User Created Successfully");

      setName("");
      setEmail("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create user"
      );
    }
  };

  // Create Team
  const createTeam = async () => {
    try {
      if (!team.trim()) {
        alert("Please enter team name");
        return;
      }

      await API.post("/teams", {
        name: team.trim()
      });

      alert("Team Created Successfully");

      setTeam("");

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create team"
      );
    }
  };

  return (
    <div className="grid">

      {/* Create User */}
      <div className="card">
        <h2>Create User</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button onClick={createUser}>
          Create User
        </button>
      </div>

      {/* Create Team */}
      <div className="card">
        <h2>Create Team</h2>

        <input
          type="text"
          placeholder="Team Name"
          value={team}
          onChange={(e) =>
            setTeam(e.target.value)
          }
        />

        <button onClick={createTeam}>
          Create Team
        </button>
      </div>

      {/* Fixed Roles Info */}
      <div className="card">
        <h2>Available Roles</h2>

        <p><strong>Admin</strong> → Create, Edit, Delete Tasks + Manage Users</p>

        <p><strong>Manager</strong> → Create, Edit, Delete Tasks</p>

        <p><strong>Viewer</strong> → View Tasks Only</p>

        <p style={{ marginTop: "15px", color: "#666" }}>
          Assign roles in Team Members page.
        </p>
      </div>

    </div>
  );
}

export default Management;