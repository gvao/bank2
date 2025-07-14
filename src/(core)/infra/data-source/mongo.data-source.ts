import { Db, MongoClient, ObjectId } from 'mongodb'

export class MongoDataSource {
    private uri: string
    private dbName: string
    private _client: MongoClient
    private isConnected: boolean = false

    constructor(uri: string, dbName: string) {
        this.uri = uri
        this.dbName = dbName
        this._client = new MongoClient(this.uri, {})

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

    async find(collectionName: string, { _id, ...query }: { _id?: string, [k: string]: unknown } = {}): Promise<unknown[]> {
        const db = await this.getDb()
        const collection = db.collection(collectionName)
        if (!!_id) query._id = new ObjectId(_id)
        const result = await collection.find(query).toArray()
        return result
    }

    async insertOne(collectionName: string, item: Record<string, unknown>): Promise<{ insertedId: string, }> {
        const db = await this.getDb()
        const result = await db.collection(collectionName).insertOne(item)
        return { insertedId: result.insertedId.toString(), }
    }

    async update(collectionName: string, query: { id: string, [k: string]: unknown }, updateData: Record<string, unknown>) {
        const collection = await this.getCollection(collectionName)
        return await collection.updateOne(
            { _id: new ObjectId(query.id) },
            { $set: { ...updateData } },
        )
    }
}