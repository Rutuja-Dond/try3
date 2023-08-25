import jsonServer from "json-server";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import AWS from "aws-sdk";

AWS.config.update({
  region: "ap-northeast-1",
  accessKeyId: "ASIA3MWOM5O5UUET53NL",
  secretAccessKey: "VjU8HcLHsNIa1Ej8yWO8hdFQsjpXQ81GMxZFy8X8",
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);
server.use(router);

const s3 = new AWS.S3();

server.get("/read-s3", async (req, res) => {
  try {
    const s3Response = await s3
      .getObject({
        Bucket: "cyclic-tan-funny-jaguar-ap-northeast-1",
        Key: "./db.json",
      })
      .promise();

    const jsonContent = JSON.parse(s3Response.Body.toString());
    res.json(jsonContent);
  } catch (error) {
    res.status(500).json({ error: "Error reading from S3" });
  }
});

server.post("/write-s3", async (req, res) => {
  try {
    await s3
      .putObject({
        Body: JSON.stringify(req.body),
        Bucket: "cyclic-tan-funny-jaguar-ap-northeast-1",
        Key: "./db.json",
      })
      .promise();

    res.json({ message: "Data written to S3" });
  } catch (error) {
    res.status(500).json({ error: "Error writing to S3" });
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
