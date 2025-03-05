import { MongoClient, ServerApiVersion } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.URL
  ? process.env.DATABASE_URL
  : 'mongodb://localhost:27017';

class DBClient {
  constructor() {
    this.db = null;
    this.connect();
  }

  async connect() {
    try {
      const connectTimeoutMS = 60000;
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS,
      });
      await client.connect();
      this.db = client.db('busBookingDB');
      console.log('Connected to database!!!');
    } catch (error) {
      console.error('Could not connect to database\n', error);
    }
  }

  isAlive() {
    return !!this.db;
  }
}

const dbClient = new DBClient();

export default dbClient;
