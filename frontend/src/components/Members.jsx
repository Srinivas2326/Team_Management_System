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

  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState("");

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (selectedTeam) {
      loadMembers(selectedTeam);
    } else {
      setMembers([]);
    }
  }, [selectedTeam]);

  // Load Users + Teams
  const loadInitialData = async () => {
    try {
      const teamRes = await API.get("/teams");
      const userRes = await API.get("/users");

      setTeams(teamRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Team Members
  const loadMembers = async (teamId) => {
    try {
      const res = await API.get("/membership");

      const filtered = res.data.filter(
        (item) =>
          item.team &&
          item.team._id === teamId
      );

      setMembers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  // Assign / Update Role
  const assignMember = async () => {
    if (!selectedTeam || !selectedUser || !selectedRole) {
      alert("Please select team, user and role");
      return;
    }

    try {
      if (editMode) {
        await API.put(`/membership/${editId}`, {
          team: selectedTeam,
          user: selectedUser,
          role: selectedRole
        });

        alert("Updated Successfully");
      } else {
        await API.post("/membership", {
          team: selectedTeam,
          user: selectedUser,
          role: selectedRole
        });

        alert("Assigned Successfully");
      }

      resetForm();
      loadMembers(selectedTeam);

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  // Edit Member
  const editMember = (member) => {
    setSelectedUser(member.user._id);
    setSelectedRole(member.role);
    setEditId(member._id);
    setEditMode(true);
  };

  // Remove Member
  const removeMember = async (id) => {
    try {
      await API.delete(`/membership/${id}`);

      loadMembers(selectedTeam);

      if (editId === id) {
        resetForm();
      }

      alert("Removed Successfully");

    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  // Reset
  const resetForm = () => {
    setSelectedUser("");
    setSelectedRole("");
    setEditMode(false);
    setEditId("");
  };

  const teamName =
    teams.find((team) => team._id === selectedTeam)?.name || "";

  return (
    <div className="dashboardPage">

      {/* Left Card */}
      <div className="contextCard">
        <h2>
          {editMode ? "Edit Member Role" : "Add to Team"}
        </h2>

        <p>
          Assign Admin, Manager or Viewer role.
        </p>

        <label>Select Team</label>

        <select
          value={selectedTeam}
          onChange={(e) =>
            setSelectedTeam(e.target.value)
          }
        >
          <option value="">Select Team...</option>

          {teams.map((team) => (
            <option
              key={team._id}
              value={team._id}
            >
              {team.name}
            </option>
          ))}
        </select>

        <label>Select User</label>

        <select
          value={selectedUser}
          onChange={(e) =>
            setSelectedUser(e.target.value)
          }
        >
          <option value="">Select User...</option>

          {users.map((user) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <label>Assign Role</label>

        <div className="roleGrid">
          {roles.map((role) => (
            <button
              key={role}
              className={
                selectedRole === role
                  ? "roleBtn activeRole"
                  : "roleBtn"
              }
              onClick={() =>
                setSelectedRole(role)
              }
            >
              {role}
            </button>
          ))}
        </div>

        <button
          className="mainBtn"
          onClick={assignMember}
        >
          {editMode
            ? "Update Assignment"
            : "Assign User"}
        </button>

        {editMode && (
          <button
            className="cancelBtn"
            onClick={resetForm}
          >
            Cancel Edit
          </button>
        )}
      </div>

      {/* Right Card */}
      <div className="permissionCard">
        <h2>Team Roster</h2>

        {selectedTeam ? (
          <p>Current members of {teamName}</p>
        ) : (
          <p>Select team to view roster.</p>
        )}

        {!selectedTeam ? (
          <div className="emptyBox">
            <h3>Select Team</h3>
          </div>
        ) : members.length === 0 ? (
          <div className="emptyBox">
            <h3>No Members</h3>
          </div>
        ) : (
          <div className="tableWrap">

            <div className="tableHead">
              <span>MEMBER</span>
              <span>ROLE</span>
              <span>ACTION</span>
            </div>

            {members.map((member) => (
              <div
                key={member._id}
                className="tableRow"
              >
                <div className="memberBox">

                  <div className="avatar">
                    {member.user?.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </div>

                  <div>
                    <h4>{member.user?.name}</h4>
                    <p>{member.user?.email}</p>
                  </div>

                </div>

                <span className="roleTag">
                  {member.role}
                </span>

                <div className="actionBtns">

                  <button
                    className="editBtn"
                    onClick={() =>
                      editMember(member)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="deleteBtn"
                    onClick={() =>
                      removeMember(member._id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}

export default Members;