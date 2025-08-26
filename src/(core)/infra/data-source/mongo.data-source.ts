import { Db, MongoClient, ObjectId } from 'mongodb'
import { DataSource } from "./data-source.interface"

export class MongoDataSource implements DataSource {
    private dbName: string
    private _clientPromise: Promise<MongoClient>

    constructor(clientPromise: Promise<MongoClient>, dbName: string) {
        this.dbName = dbName
        this._clientPromise = clientPromise
    }

    private async getClient(): Promise<MongoClient> {
        return this._clientPromise
    }

    private async getDb(): Promise<Db> {
        const client = await this.getClient()
        return client.db(this.dbName)
    }

    private async getCollection(collectionName: string) {
        const db = await this.getDb()
        return db.collection(collectionName)
    }

    async clearCollection(collectionName: string): Promise<void> {
        const db = await this.getDb()
        await db.collection(collectionName).deleteMany({})
    }

    async find<T>(collectionName: string, { id, ...query }: { id?: string, [k: string]: unknown } = {}): Promise<T[]> {
        const db = await this.getDb()
        const collection = db.collection(collectionName)
        if (!!id) query._id = new ObjectId(id)
        const result = await collection.find(query).toArray()
        return result.map(({ _id, ...item }) => ({ ...item, id: _id.toString() } as T))
    }

    async insertOne(collectionName: string, item: Record<string, unknown>): Promise<{ insertedId: string, }> {
        const db = await this.getDb()
        const result = await db.collection(collectionName).insertOne(item)
        return { insertedId: result.insertedId.toString(), }
    }

    async update(collectionName: string, query: { id: string, [k: string]: unknown }, updateData: Record<string, unknown>) {
        const collection = await this.getCollection(collectionName)
        await collection.updateOne(
            { _id: new ObjectId(query.id) },
            { $set: { ...updateData } },
        )
    }
}