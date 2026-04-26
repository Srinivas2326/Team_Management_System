import { useEffect, useState } from "react";
import API from "../api";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const createTask = async () => {
    await API.post("/tasks", {
      title,
      description: "New Task"
    });

    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    loadTasks();
  };

  return (
    <div className="grid">
      <div className="card">
        <h2>Create Task</h2>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button onClick={createTask}>
          Create Task
        </button>
      </div>

      <div className="card">
        <h2>All Tasks</h2>

        {tasks.map((task) => (
          <div key={task._id}>
            <p>{task.title}</p>

            <button
              onClick={() =>
                deleteTask(task._id)
              }
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;