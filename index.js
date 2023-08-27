import jsonServer from "json-server";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import express from "express";

const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));

app.use(express.static("public"));
app.use(router);
app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, "db.json"));
// const middlewares = jsonServer.defaults();

// server.use(cors());
// server.use(jsonServer.bodyParser);
// server.use(middlewares);
// server.use(router);

// const PORT = 3000;

// server.listen(PORT, () => {
//   console.log(`JSON Server is running on :${PORT}`);
// });
