import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import fs from "fs";
// const fs = require('fs');
import { fileURLToPath } from "url";
import { dirname } from "path";

const data = {
  key: "value",
};

const filePath = "path/to/db.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonData = JSON.stringify(data, null, 2);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

try {
  fs.writeFileSync(filePath, jsonData, "utf8");
  console.log("Data written to file successfully.");
} catch (err) {
  console.error("Error writing to file:", err);
}

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
