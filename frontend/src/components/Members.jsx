import { useEffect, useState } from "react";
import API from "../api";

function Members() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);

  const roles = ["Admin", "Manager", "Viewer"];

  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      fetchMembers(selectedTeam);
    } else {
      setMembers([]);
    }
  }, [selectedTeam]);

  const fetchInitialData = async () => {
    try {
      const teamRes = await API.get("/teams");
      const userRes = await API.get("/users");

      setTeams(teamRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMembers = async (teamId) => {
    try {
      const res = await API.get("/membership");

      const filtered = res.data.filter(
        (item) =>
          item.team &&
          item.team._id &&
          item.team._id.toString() === teamId.toString()
      );

      setMembers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const assignRole = async () => {
    if (!selectedTeam || !selectedUser || !selectedRole) {
      alert("Please select team, user and role");
      return;
    }

    try {
      await API.post("/membership", {
        team: selectedTeam,
        user: selectedUser,
        role: selectedRole
      });

      alert("Updated Successfully");

      fetchMembers(selectedTeam);

      setSelectedUser("");
      setSelectedRole("");
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const editMember = (member) => {
    setSelectedUser(member.user._id);
    setSelectedRole(member.role);
  };

  const teamName =
    teams.find((t) => t._id === selectedTeam)?.name || "";

  return (
    <div className="dashboardPage">

      {/* LEFT PANEL */}
      <div className="contextCard">
        <h2>Add to Team</h2>
        <p>Assign users to teams with specific roles.</p>

        <label>Select Team</label>
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

        <label>Select User</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">Select User...</option>

          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        <label>Assign Roles</label>

        <div className="roleGrid">
          {roles.map((role) => (
            <button
              key={role}
              className={
                selectedRole === role
                  ? "roleBtn activeRole"
                  : "roleBtn"
              }
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <button className="mainBtn" onClick={assignRole}>
          Update Assignment
        </button>
      </div>

      {/* RIGHT PANEL */}
      <div className="permissionCard">
        <h2>Team Roster</h2>

        {selectedTeam ? (
          <p>Current members of {teamName}</p>
        ) : (
          <p>Select a team to view its members.</p>
        )}

        {!selectedTeam ? (
          <div className="emptyBox">
            <h3>Select a team</h3>
            <p>Select a team to see who's inside.</p>
          </div>
        ) : members.length === 0 ? (
          <div className="emptyBox">
            <h3>No Members</h3>
            <p>No users assigned yet.</p>
          </div>
        ) : (
          <div className="tableWrap">

            <div className="tableHead">
              <span>MEMBER</span>
              <span>ROLES</span>
              <span>ACTION</span>
            </div>

            {members.map((member) => (
              <div className="tableRow" key={member._id}>
                <div className="memberBox">

                  <div className="avatar">
                    {member.user?.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4>{member.user?.name}</h4>
                    <p>{member.user?.email}</p>
                  </div>

                </div>

                <span className="roleTag">
                  {member.role}
                </span>

                <button
                  className="editBtn"
                  onClick={() => editMember(member)}
                >
                  Edit Roles
                </button>
              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default Members;