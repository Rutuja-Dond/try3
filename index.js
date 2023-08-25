import AWS from "aws-sdk";
import jsonServer from "json-server";
import cors from "cors";

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// Initialize DynamoDB
AWS.config.update({ region: "your-region" });
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = "your-dynamodb-table-name";

// Define custom routes
server.get("/data", async (req, res) => {
  try {
    const params = {
      TableName: tableName,
    };
    const result = await dynamoDB.scan(params).promise();
    res.json(result.Items);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

server.post("/data", async (req, res) => {
  try {
    const newItem = req.body;
    const params = {
      TableName: tableName,
      Item: newItem,
    };
    await dynamoDB.put(params).promise();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).json({ error: "Error adding data" });
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`JSON Server is running on :${PORT}`);
});
