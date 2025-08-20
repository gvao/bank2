import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

if (!process.env.MONGODB_URI) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}
const uri = process.env.MONGODB_URI || "mongodb://root123:root123@localhost:27017/bank"
const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}

let client: MongoClient

if (process.env.NODE_ENV !== 'development') {
    let globalWithMongoClient = global as typeof globalThis & {
        _mongoClient: MongoClient
    }

    if (!globalWithMongoClient._mongoClient) {
        client = new MongoClient(uri, options)
        globalWithMongoClient._mongoClient = new MongoClient(uri, options)
    }

    client = globalWithMongoClient._mongoClient
} else {
    client = new MongoClient(uri, options)
}

export default client