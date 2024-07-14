const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
const dbConnection = require("./config/dbConnection");
const router = express.Router();
const dotenv = require("dotenv").config();
const app = express();

dbConnection();

app.use(express.json());
app.use("/api/snippet/", require("./routes/snippetRoutes"));
app.use("/api/user/", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => {console.log(`Server started at port ${process.env.PORT}`);})