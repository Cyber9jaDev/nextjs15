import { MongoClient, ServerApiVersion } from 'mongodb';

if (!process.env.DB_URI) {
  throw new Error('DB_URI must be defined')
}

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function getDB(dbName) {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client.db(dbName)
  } catch (err) {
    console.log(err);
  }
}

export async function getCollection(collectionName) {
  const db = await getDB("nextjs15");
  if (db) { return db.collection(collectionName) }

  return null
}