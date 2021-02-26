const express = require("express");

const app = express();

app.use(express.json());

//importing routes
const UserRoutes = require("./routes/UserRoutes");

app.get("/", (req, res) => {
  res.json({
    title: "Welcome to Expense Tracker app backend",
  });
});

app.use("/api/users", UserRoutes);

const PORT = process.env.PORT || "5000";
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
