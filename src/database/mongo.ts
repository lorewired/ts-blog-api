import { MongoClient as Mongo, Db } from 'mongodb'

export const MongoClient = {
    client: undefined as unknown as Mongo,
    db: undefined as unknown as Db,

    async connect(): Promise<void> {
        const url = process.env.MONGODB_URL;
        const username = process.env.MONGO_USER;
        const password = process.env.MONGO_PASSWORD;
        
        const client = new Mongo(url, { auth: {username, password}});
        const db = client.db("blog-db");

        this.client = client;
        this.db = db;
    }
}