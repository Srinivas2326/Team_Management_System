import { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [role, setRole] = useState("");
  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadInitialData();
    loadTasks();
  }, []);

  useEffect(() => {
    if (selectedUser && selectedTeam) {
      loadUserRole();
    } else {
      setRole("");
    }
  }, [selectedUser, selectedTeam]);

  // Load Users + Teams
  const loadInitialData = async () => {
    try {
      const usersRes = await API.get("/users");
      const teamsRes = await API.get("/teams");

      setUsers(usersRes.data);
      setTeams(teamsRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Tasks
  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Load Role
  const loadUserRole = async () => {
    try {
      const res = await API.get("/membership");

      const found = res.data.find(
        (item) =>
          item.user?._id === selectedUser &&
          item.team?._id === selectedTeam
      );

      if (found) {
        setRole(found.role?.name || found.role || "");
      } else {
        setRole("");
      }
    } catch (error) {
      console.log(error);
      setRole("");
    }
  };

  // Roles
  const isAdmin = role === "Admin";
  const isManager = role === "Manager";
  const isViewer = role === "Viewer";

  const canCreate = isAdmin || isManager;
  const canEdit = isAdmin || isManager;
  const canDelete = isAdmin || isManager;
  const canView = isAdmin || isManager || isViewer;

  // Create Task
  const createTask = async () => {
    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    try {
      await API.post("/tasks", {
        title: title.trim(),
        description: "New Task"
      });

      setTitle("");
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Start Edit
  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  // Update Task
  const updateTask = async () => {
    if (!editTitle.trim()) {
      alert("Enter task title");
      return;
    }

    try {
      await API.put(`/tasks/${editId}`, {
        title: editTitle.trim()
      });

      setEditId("");
      setEditTitle("");
      loadTasks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboardPage">

      {/* Left Side */}
      <div className="contextCard">
        <h2>Task Access</h2>

        {/* Select User */}
        <select
          value={selectedUser}
          onChange={(e) =>
            setSelectedUser(e.target.value)
          }
        >
          <option value="">
            Select User
          </option>

          {users.map((user) => (
            <option
              key={user._id}
              value={user._id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {/* Select Team */}
        <select
          value={selectedTeam}
          onChange={(e) =>
            setSelectedTeam(e.target.value)
          }
        >
          <option value="">
            Select Team
          </option>

          {teams.map((team) => (
            <option
              key={team._id}
              value={team._id}
            >
              {team.name}
            </option>
          ))}
        </select>

        {/* Show Role */}
        {role && (
          <>
            <p
              style={{
                marginTop: "18px",
                fontWeight: "600"
              }}
            >
              Assigned Role
            </p>

            <span className="pill">
              {role}
            </span>
          </>
        )}

        {/* Create Task */}
        {canCreate && (
          <>
            <h2
              style={{
                marginTop: "25px"
              }}
            >
              Create Task
            </h2>

            <input
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <button onClick={createTask}>
              Create Task
            </button>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="permissionCard">
        <h2>All Tasks</h2>

        {!selectedUser || !selectedTeam ? (
          <p>Select user and team.</p>
        ) : !canView ? (
          <p>No permission to view tasks.</p>
        ) : tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                marginBottom: "20px"
              }}
            >
              {editId === task._id ? (
                <>
                  <input
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(
                        e.target.value
                      )
                    }
                  />

                  <button onClick={updateTask}>
                    Save
                  </button>

                  <button
                    onClick={() =>
                      setEditId("")
                    }
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <p>{task.title}</p>

                  {canEdit && (
                    <button
                      onClick={() =>
                        startEdit(task)
                      }
                    >
                      Edit
                    </button>
                  )}

                  {canDelete && (
                    <button
                      onClick={() =>
                        deleteTask(task._id)
                      }
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}

export default Tasks;