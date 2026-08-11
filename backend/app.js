const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const errorMiddleware = require("./middleware/error.middleware");
const apiLimiter = require("./middleware/rateLimit.middleware");
const authRoutes = require("./routes/auth.routes");
const interviewRoutes = require("./routes/interview.routes");
const resumeRoutes = require("./routes/resume.routes");
const app = express();


app.use(apiLimiter);
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/resumes", resumeRoutes);





app.use(errorMiddleware);


module.exports = app;