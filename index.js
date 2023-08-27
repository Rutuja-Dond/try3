import express from "express";
import AWS from "aws-sdk";

const app = express();
const PORT = 3001;

AWS.config.update({
  region: "your-region",
  accessKeyId: "your-access-key",
  secretAccessKey: "your-secret-key",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(express.static("public"));

app.get("/data", async (req, res) => {
  try {
    const params = {
      TableName: "your-table-name",
    };
    const data = await dynamodb.scan(params).promise();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error reading data" });
  }
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
