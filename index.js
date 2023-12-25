const express = require("express");
require("dotenv").config();
var cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = 3300;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server Running");
});

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSCODE}@cluster0.tc8xqsk.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    const taskCollection = client.db("SRtaskDB").collection("task");

    //
    app.get("/task", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });
    app.post("/task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      res.send(result);
    });
    app.patch("/task/:taskId", async (req, res) => {
      const id = req.params.taskId;
      const upateType = req.body;
      console.log(updatedType);
      const query = { _id: new ObjectId(id) };
      const updatedType = {
        $set: {
          $set: { type: upateType },
        },
      };

      // const result = await taskCollection.updateOne(query, updatedType);
      // res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server Running on ${port}`);
});
