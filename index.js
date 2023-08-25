import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Custom authentication and authorization middleware
const authenticate = (req, res, next) => {
  const authToken = req.headers.authorization;

  // Check if authToken is valid (this is just a simple example)
  if (authToken === "mysecrettoken") {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    res.status(403).json({ message: "Forbidden: Authentication failed." });
  }
};

// Apply authentication middleware to specific routes
server.use("/api/protected", authenticate);

server.use(router);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
