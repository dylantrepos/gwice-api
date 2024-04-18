import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGO_URI;
if (!uri) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const checkConnection = async () => {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("gwice").command({ ping: 1 });
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
};
