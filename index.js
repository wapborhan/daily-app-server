const express = require("express");
require("dotenv").config();
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = 3300;

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

    //
    app.get("/task", (req, res) => {
      res.send("Server Running");
    });
    app.post("/task", (req, res) => {
      res.send("Server Running");
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
