import { useState } from "react";
import API from "../api";

function Management() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  // Toggle Permissions
  const togglePermission = (value) => {
    if (permissions.includes(value)) {
      setPermissions(
        permissions.filter((p) => p !== value)
      );
    } else {
      setPermissions([...permissions, value]);
    }
  };

  // Create User
  const createUser = async () => {
    try {
      if (!name.trim() || !email.trim()) {
        alert("Please enter name and email");
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

  // Create Role
  const createRole = async () => {
    try {
      if (!roleName.trim()) {
        alert("Please enter role name");
        return;
      }

      if (permissions.length === 0) {
        alert("Select at least one permission");
        return;
      }

      await API.post("/roles", {
        name: roleName.trim(),
        permissions
      });

      alert("Role Created Successfully");

      setRoleName("");
      setPermissions([]);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to create role"
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

      {/* Create Role */}
      <div className="card">
        <h2>Create Role</h2>

        <input
          type="text"
          placeholder="Role Name"
          value={roleName}
          onChange={(e) =>
            setRoleName(e.target.value)
          }
        />

        <div className="roleButtons">

          <button
            className={
              permissions.includes("CREATE_TASK")
                ? "activeBtn"
                : ""
            }
            onClick={() =>
              togglePermission("CREATE_TASK")
            }
          >
            CREATE_TASK
          </button>

          <button
            className={
              permissions.includes("EDIT_TASK")
                ? "activeBtn"
                : ""
            }
            onClick={() =>
              togglePermission("EDIT_TASK")
            }
          >
            EDIT_TASK
          </button>

          <button
            className={
              permissions.includes("DELETE_TASK")
                ? "activeBtn"
                : ""
            }
            onClick={() =>
              togglePermission("DELETE_TASK")
            }
          >
            DELETE_TASK
          </button>

          <button
            className={
              permissions.includes("VIEW_TASK")
                ? "activeBtn"
                : ""
            }
            onClick={() =>
              togglePermission("VIEW_TASK")
            }
          >
            VIEW_TASK
          </button>

          <button
            className={
              permissions.includes("MANAGE_USERS")
                ? "activeBtn"
                : ""
            }
            onClick={() =>
              togglePermission("MANAGE_USERS")
            }
          >
            MANAGE_USERS
          </button>

        </div>

        <button onClick={createRole}>
          Create Role
        </button>
      </div>

    </div>
  );
}

export default Management;