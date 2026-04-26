import { useState } from "react";
import API from "../api";

function Management() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");

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

  return (
    <div className="grid">
      <div className="card">
        <h2>Create User</h2>

        <input
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={createUser}>Create User</button>
      </div>

      <div className="card">
        <h2>Create Team</h2>

        <input
          placeholder="Team Name"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        />

        <button onClick={createTeam}>Initialize Team</button>
      </div>
    </div>
  );
}

export default Management;