import { useState } from "react";
import API from "../api";

function Management() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");

  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState([]);

  const togglePermission = (value) => {
    if (permissions.includes(value)) {
      setPermissions(
        permissions.filter((p) => p !== value)
      );
    } else {
      setPermissions([...permissions, value]);
    }
  };

  const createUser = async () => {
    await API.post("/users", { name, email });
    alert("User Created");
    setName("");
    setEmail("");
  };

  const createTeam = async () => {
    await API.post("/teams", { name: team });
    alert("Team Created");
    setTeam("");
  };

  const createRole = async () => {
    await API.post("/roles", {
      name: roleName,
      permissions
    });

    alert("Role Created");

    setRoleName("");
    setPermissions([]);
  };

  return (
    <div className="grid">

      {/* Create User */}
      <div className="card">
        <h2>Create User</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
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
          placeholder="Role Name"
          value={roleName}
          onChange={(e) =>
            setRoleName(e.target.value)
          }
        />

        <div className="roleButtons">
          <button
            onClick={() =>
              togglePermission("CREATE_TASK")
            }
          >
            CREATE_TASK
          </button>

          <button
            onClick={() =>
              togglePermission("EDIT_TASK")
            }
          >
            EDIT_TASK
          </button>

          <button
            onClick={() =>
              togglePermission("DELETE_TASK")
            }
          >
            DELETE_TASK
          </button>

          <button
            onClick={() =>
              togglePermission("VIEW_ONLY")
            }
          >
            VIEW_ONLY
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