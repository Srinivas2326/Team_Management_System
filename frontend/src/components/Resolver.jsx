import { useEffect, useState } from "react";
import API from "../api";

function Resolver() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const u = await API.get("/users");
    const t = await API.get("/teams");

    setUsers(u.data);
    setTeams(t.data);
  };

  useEffect(() => {
    if (user && team) {
      getPermissions();
    }
  }, [user, team]);

  const getPermissions = async () => {
    const res = await API.get(`/permissions/${user}/${team}`);
    setPermissions(res.data);
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>Context Selector</h2>

        <select onChange={(e) => setUser(e.target.value)}>
          <option>Select User</option>

          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setTeam(e.target.value)}>
          <option>Select Team</option>

          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        <h2>Resolved Permissions</h2>

        {permissions.length === 0 ? (
          <p>Select user and team.</p>
        ) : (
          permissions.map((p, i) => (
            <span className="pill" key={i}>
              {p}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default Resolver;