import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const data = {
  key: "value",
};

const jsonData = JSON.stringify(data, null, 2);
const filePath = "./db.json";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

fs.writeFile(filePath, jsonData, "utf8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("Data written to file successfully.");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
