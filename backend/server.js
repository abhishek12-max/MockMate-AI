const dotenv = require("dotenv");
dotenv.config();
const dNS= require("node:dns");
dNS.setServers(["1.1.1.1","8.8.8.8"]);
const app = require("./app");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();