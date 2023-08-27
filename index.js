import express from "express";
import AWS from "aws-sdk";

const app = express();
const PORT = 3001;

// export AWS_REGION="us-west-1"
// export AWS_ACCESS_KEY_ID="ASIAYKRRCMGPEVE4MNOB"
// export AWS_SECRET_ACCESS_KEY="RO8ulhFidIK4roseZsWqDCDKhw0K7zamjdtVZDXX"
// export AWS_SESSION_TOKEN="IQoJb3JpZ2luX2VjEKr//////////wEaCmFwLXNvdXRoLTEiRzBFAiB9J/sX5kkINKg44TUy5xdaLt5G7h17CLMGbW+sU2218QIhAOxuVKONTevIu8xJvK3ZBZaI/deaDH2qBEEKnmbVVY0NKrQCCHMQABoMNTcyNDA3MzA4NzAyIgx7sBpSL1gfyOrD1d0qkQLRePnPhkbkGVH2tPcBCZ5QV2Ix7tWDBfyMYyOb7ib8swt/WYXgjG5oSUwiBpLFUfLreYa0ZWvhXUE/F42A7qZ8oQA8r0B0sfF+IUOroSe8J4jWdnpvikk6DFUDrqIteG8yKiIhUoAXt4kA56RYi0yILkxQg1ty8h5HV9I2kX9QoImgxlAiI9ACBluIsODF68LYjj/a3K15vDuCsVNz1ij/9RfyQYOiVfhDWzE/diae2Fo5jNvI0quwkkWYP3/Xf736jB/7YVn87PCybBTwWqApoZNz2MpLkvZrGXX9DRFtCfen30hxOsFUuJsoli3j2ifW2xjGJyd4UNBEO9Nl2ME/tRcA15aRqM5k7MIzLUuXxS4w8LWspwY6nQEC1iWLQxmzlJZUQxDOIXdn9uNBxOkkqYb8WNUbVxQ7W0DO+QVj2hXwNKgM+Eq3c+mvChsSAbOxv70fUQL94wTeEVufWAdcTVhftndwkZNEJJZmSJerv/TEtY5Ly6Qaf+7f4a6qI8qZQOGpcvRPTV+z998cnpb/zBTc7qw+eV7JN7P5xx4BdrbsJMawMshSfLFWxU9tF2oarGly6g4A"

AWS.config.update({
  region: "us-west-1",
  accessKeyId: "ASIAYKRRCMGPEVE4MNOB",
  secretAccessKey: "RO8ulhFidIK4roseZsWqDCDKhw0K7zamjdtVZDXX",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

app.use(express.static("public"));

app.get("/data", async (req, res) => {
  try {
    const params = {
      TableName: "combative-life-jacket-mothCyclicDB",
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
