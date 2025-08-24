import { Db, MongoClient, ObjectId, UpdateResult, WithId } from 'mongodb'
import { DataSource } from "./data-source.interface"

export class MongoDataSource implements DataSource {
    private dbName: string
    private isConnected: boolean = false

    constructor(private _client: MongoClient, dbName: string) {
        this.dbName = dbName

        this._client.on('connectionReady', () => {
            console.log('Connected to MongoDB')
            this.isConnected = true
        })
        this._client.on('connectionClosed', () => {
            console.log('Disconnected from MongoDB')
            this.isConnected = false
        })
    }

    private async getDb(): Promise<Db> {
        if (!this.isConnected) await this._client.connect()
        return this._client.db(this.dbName)
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
        const result = await collection.updateOne(
            { _id: new ObjectId(query.id) },
            { $set: { ...updateData } },
        )
    }
}