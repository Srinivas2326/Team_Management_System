const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROUTES */
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/teams", require("./routes/teamRoutes"));
app.use("/api/roles", require("./routes/roleRoutes"));
app.use("/api/membership", require("./routes/membershipRoutes"));
app.use("/api/permissions", require("./routes/permissionRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

/* DEFAULT ROUTE */
app.get("/", (req, res) => {
  res.send("Team Management System API Running...");
});

/* SERVER */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);