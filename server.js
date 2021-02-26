const path = require("path");
//LOAD ENV VARS
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "/config/config.env") });

const express = require("express");
require("colors");
require("./config/db");

const app = express();
const ErrorHandler = require("./middlewares/error");

app.use(express.json());

//importing routes
const UserRoutes = require("./routes/UserRoutes");

app.get("/", (req, res) => {
  res.json({
    title: "Welcome to Expense Tracker app backend",
  });
});

app.use("/api/users", UserRoutes);

app.use(ErrorHandler);

const PORT = process.env.PORT || "5000";
app.listen(PORT, console.log(`Server is listening on port ${PORT}`));
