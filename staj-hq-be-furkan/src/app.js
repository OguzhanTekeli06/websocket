const express = require("express");
const cors = require("cors");
const setupSwagger = require("./config/swagger");

const app = express();

app.use(cors());
app.use(express.json());
setupSwagger(app);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/internship-periods", require("./routes/internshipRoutes"));
app.use("/api/interns", require("./routes/internRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/surveys", require("./routes/surveyRoutes"));
app.use("/api/leave-requests", require("./routes/leaveRoutes"));
app.use("/api/auth", require("./routes/loginRoutes"));

app.get("/", (req, res) => res.send("Staj Yönetim API Çalisiyor 🚀"));

module.exports = app;
