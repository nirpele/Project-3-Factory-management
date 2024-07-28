const express = require("express");
const cors = require("cors");
const connectDB = require("./configs/db");
const session = require('express-session');
const usersController = require("./controllers/usersController");
const authController = require("./controllers/authController");
const employeesController = require("./controllers/employeesController");
const shiftsController = require("./controllers/shiftsController");
const departmentsController = require("./controllers/departmentsController");

const app = express();
const PORT = 3000;

connectDB();

app.use(
  session({
    secret: 'secret',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
  })
);

app.use(
  cors({ credentials: true, origin: "http://localhost:5173" })
);

app.use(express.json()); // Parse incoming JSON requests

app.use("/auth", authController);
app.use("/users", usersController);
app.use("/employees", employeesController);
app.use("/departments", departmentsController);
app.use("/shifts", shiftsController);

app.listen(PORT, () => {
  console.log(`app is listening at http://localhost:${PORT}`);
});