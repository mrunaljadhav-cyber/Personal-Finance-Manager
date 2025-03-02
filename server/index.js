import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connect from "./database/mongodb.js";
import routes from "./routes/index.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ message: err.message || "Something went wrong!" });
});

// Start server
try {
  await connect();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
} catch (error) {
  console.error("Failed to start server:", error);
  process.exit(1);
}