import { useEffect, useState } from "react";
import API from "../api";

function Resolver() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [user, setUser] = useState("");
  const [team, setTeam] = useState("");

  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const u = await API.get("/users");
      const t = await API.get("/teams");

      setUsers(u.data);
      setTeams(t.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && team) {
      setSelected(true);
      getPermissions();
    }
  }, [user, team]);

  const getPermissions = async () => {
    try {
      const res = await API.get(
        `/permissions/${user}/${team}`
      );

      setPermissions(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>Context Selector</h2>

        <select
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          <option value="">Select User</option>

          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.name}
            </option>
          ))}
        </select>

        <select
          value={team}
          onChange={(e) => setTeam(e.target.value)}
        >
          <option value="">Select Team</option>

          {teams.map((t) => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
      </div>

      <div className="card">
        <h2>Resolved Permissions</h2>

        {!selected ? (
          <p>Select user and team.</p>
        ) : permissions.length === 0 ? (
          <p>No permissions assigned.</p>
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