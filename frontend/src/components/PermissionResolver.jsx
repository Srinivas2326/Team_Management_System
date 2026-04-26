import { useEffect, useState } from "react";
import API from "../api";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const usersRes = await API.get("/users");
      const teamsRes = await API.get("/teams");

      setUsers(usersRes.data);
      setTeams(teamsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (selectedUser && selectedTeam) {
      fetchPermissions();
    } else {
      setPermissions([]);
    }
  }, [selectedUser, selectedTeam]);

  const fetchPermissions = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/permissions/${selectedUser}/${selectedTeam}`
      );

      setPermissions(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const userObj = users.find((u) => u._id === selectedUser);
  const teamObj = teams.find((t) => t._id === selectedTeam);

  return (
    <div className="dashboardPage">

      {/* LEFT SIDE */}
      <div className="contextCard">
        <h2>Context Selector</h2>
        <p>Choose a user and team to see active permissions.</p>

        <label>Identity</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User...</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>

        <label>Environment</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          <option value="">Select Team...</option>

          {teams.map((team) => (
            <option key={team._id} value={team._id}>
              {team.name}
            </option>
          ))}
        </select>

        {userObj && teamObj && (
          <div className="miniProfile">
            <div className="avatar">
              {userObj.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h4>{userObj.name}</h4>
              <p>{teamObj.name} Access</p>
            </div>
          </div>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="permissionCard">
        <div className="permissionHeader">
          <div>
            <h2>Resolved Permissions</h2>

            {userObj && teamObj ? (
              <p>
                Active capabilities for{" "}
                <strong>{userObj.name}</strong> in{" "}
                <strong>{teamObj.name}</strong>
              </p>
            ) : (
              <p>Please select both a user and team.</p>
            )}
          </div>

          <span className="liveBadge">● Computed Live</span>
        </div>

        <div className="permissionBody">
          {loading ? (
            <p>Loading permissions...</p>
          ) : permissions.length === 0 ? (
            <div className="emptyBox">
              <h3>No permissions granted</h3>
              <p>
                This user has no roles assigned within this team environment.
              </p>
            </div>
          ) : (
            <div className="permissionList">
              {permissions.map((item, index) => (
                <span key={index} className="permissionPill">
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="logicSection">
          <h4>PERMISSION LOGIC</h4>

          <ul>
            <li>Permissions are derived from assigned roles.</li>
            <li>Multiple roles merge all available permissions.</li>
            <li>Selections are computed instantly from MongoDB data.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;