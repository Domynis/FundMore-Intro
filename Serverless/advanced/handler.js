const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
  DeleteCommand,
} = require("@aws-sdk/lib-dynamodb");

const express = require("express");
const serverless = require("serverless-http");

const app = express();

const CUSTOMERS_TABLE = process.env.CUSTOMERS_TABLE;
const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

app.use(express.json());

app.get("/customers", async (req, res) => {
  const params = {
    TableName: CUSTOMERS_TABLE,
  };

  try {
    const command = new ScanCommand(params);
    const { Items } = await docClient.send(command);
    res.json(Items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve customers" });
  }
});

app.get("/customers/:id", async (req, res) => {
  const params = {
    TableName: CUSTOMERS_TABLE,
    Key: {
      customerId: req.params.id,
    }
  };

  try {
    const command = new GetCommand(params);
    const { Item } = await docClient.send(command);
    if (Item) {
      const { customerId, name, email } = Item;
      res.json({ customerId, name, email });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find customer with provided "customerId"' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Could not retrieve customer" });
  }
});

app.put("/customers/:id", async (req, res) => {
  const { name, email } = req.body;
  const customerId = req.params.id;
  if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  } else if (typeof email !== "string") {
    res.status(400).json({ error: '"email" must be a string' });
  }

  const params = {
    TableName: CUSTOMERS_TABLE,
    Key: {
      customerId: customerId,
    },
    UpdateExpression: "set #name = :name, email = :email",
    ExpressionAttributeNames: {
      "#name": "name",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
    },
  }

  try {
    const command = new UpdateCommand(params);
    await docClient.send(command);
    res.json({ customerId, name, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not update customer" });
  }
});

app.delete("/customers/:id", async (req, res) => {
  const params = {
    TableName: CUSTOMERS_TABLE,
    Key: {
      customerId: req.params.id,
    },
  };

  try {
    const command = new DeleteCommand(params);
    await docClient.send(command);
    res.json({ customerId: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not delete customer" });
  }
});

app.post("/customers", async (req, res) => {
  const { customerId, name, email } = req.body;
  if (typeof customerId !== "string") {
    res.status(400).json({ error: '"customerId" must be a string' });
  } else if (typeof name !== "string") {
    res.status(400).json({ error: '"name" must be a string' });
  } else if (typeof email !== "string") {
    res.status(400).json({ error: '"email" must be a string' });
  }

  const params = {
    TableName: CUSTOMERS_TABLE,
    Item: { customerId, name, email },
  };

  try {
    const command = new PutCommand(params);
    await docClient.send(command);
    res.json({ customerId, name, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not create customer" });
  }
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

exports.handler = serverless(app);
