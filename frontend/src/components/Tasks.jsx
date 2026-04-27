import { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const [permissions, setPermissions] = useState([]);

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");

  useEffect(() => {
    loadInitialData();
    loadTasks();
  }, []);

  useEffect(() => {
    if (selectedUser && selectedTeam) {
      loadPermissions();
    } else {
      setPermissions([]);
    }
  }, [selectedUser, selectedTeam]);

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

  const loadTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const loadPermissions = async () => {
    try {
      const res = await API.get(
        `/permissions/${selectedUser}/${selectedTeam}`
      );

      setPermissions(res.data);

    } catch (error) {
      console.log(error);
      setPermissions([]);
    }
  };

  const createTask = async () => {
    if (!title.trim()) {
      alert("Enter task title");
      return;
    }

    try {
      await API.post("/tasks", {
        title,
        description: "New Task"
      });

      setTitle("");
      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditTitle(task.title);
  };

  const updateTask = async () => {
    if (!editTitle.trim()) {
      alert("Enter title");
      return;
    }

    try {
      await API.put(`/tasks/${editId}`, {
        title: editTitle
      });

      setEditId("");
      setEditTitle("");
      loadTasks();

    } catch (error) {
      console.log(error);
    }
  };

  // PERMISSIONS
  const canCreate =
    permissions.includes("CREATE_TASK");

  const canEdit =
    permissions.includes("EDIT_TASK");

  const canDelete =
    permissions.includes("DELETE_TASK");

  const canView =
    permissions.includes("VIEW_ONLY") ||
    canCreate ||
    canEdit ||
    canDelete;

  return (
    <div className="grid">

      {/* LEFT SIDE */}
      <div className="card">
        <h2>Task Access</h2>

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

        {/* Permissions */}
        {selectedUser &&
          selectedTeam &&
          permissions.length > 0 && (
            <div>
              <p
                style={{
                  marginTop: "15px",
                  fontWeight: "600"
                }}
              >
                Permissions
              </p>

              {permissions.map((item, i) => (
                <span
                  className="pill"
                  key={i}
                >
                  {item}
                </span>
              ))}
            </div>
          )}

        {/* Create Task */}
        {canCreate && (
          <>
            <h2
              style={{
                marginTop: "20px"
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

            <button
              onClick={createTask}
            >
              Create Task
            </button>
          </>
        )}
      </div>

      {/* RIGHT SIDE */}
      <div className="card">
        <h2>All Tasks</h2>

        {!selectedUser ||
        !selectedTeam ? (
          <p>Select user and team.</p>

        ) : !canView ? (
          <p>
            No permission to view tasks.
          </p>

        ) : tasks.length === 0 ? (
          <p>No tasks found.</p>

        ) : (
          tasks.map((task) => (
            <div
              key={task._id}
              style={{
                marginBottom: "20px"
              }}
            >
              {/* EDIT MODE */}
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

                  <button
                    onClick={updateTask}
                  >
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
                        deleteTask(
                          task._id
                        )
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