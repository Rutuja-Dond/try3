import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync.js"; // Corrected import path

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFilePath = path.join(__dirname, "db.json");

// Check if the file exists, if not, create an empty database
if (!fs.existsSync(dbFilePath)) {
  fs.writeFileSync(dbFilePath, JSON.stringify({}));
}

// Create a lowdb instance using the FileSync adapter
const adapter = new FileSync(dbFilePath);
const db = low(adapter);

db.set("key", { value: "someValue" }).write(); // Replace "someValue" with the actual value

const server = jsonServer.create();
const router = jsonServer.router(dbFilePath);
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 3000; // Hardcoded port number

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
