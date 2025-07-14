import { beforeAll, beforeEach, describe, expect, it } from "vitest"
import { MongoDataSource } from "./mongo.data-source"

describe('MongoDataSource', () => {
    const uri = 'mongodb://root123:root123@localhost:27017'
    const dbName = 'myDatabase'
    const collectionName = "test"
    const mongoDataSource = new MongoDataSource(uri, dbName)

    beforeAll(async () => {
        await mongoDataSource.clearCollection(collectionName)
        expect(mongoDataSource).toBeInstanceOf(MongoDataSource)
    })

    beforeEach(async () => {
        await mongoDataSource.clearCollection(collectionName)
        const result = await mongoDataSource.find(collectionName)
        expect(result).toHaveLength(0)
    })

    it('should create a new document in the collection', async () => {
        const result = await mongoDataSource.insertOne(collectionName, { name: 'John Doe' })
        expect(result.insertedId).toBeDefined()
        const items = await mongoDataSource.find(collectionName)
        expect(items).toHaveLength(1)
        expect(items[0].name).toBe('John Doe')
    })

    it('should update an existing document in the collection', async () => {
        const { insertedId } = await mongoDataSource.insertOne(collectionName, { name: 'John Doe' })
        await mongoDataSource.update(collectionName, { id: insertedId }, { name: 'Jane Doe' })
        const [result] = await mongoDataSource.find(collectionName, { _id: insertedId })
        expect(result.name).toBe('Jane Doe')
        expect(result._id.toString()).toBe(insertedId)
    })
})