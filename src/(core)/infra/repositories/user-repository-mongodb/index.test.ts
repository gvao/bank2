import { beforeAll, describe, expect, it } from "vitest";
import { UserRepositoryMongodb } from ".";
import { MongoDataSource } from "../../data-source/mongo.data-source";
import client from "../../../../lib/mongodb";
import { UserFactory } from "../../../domain/entity/user";

describe("UserRepositoryMongoDb", () => {
    const collectionName = "users-test"
    const dataSource = new MongoDataSource(client, "repository-test")
    const userRepositoryMongoDb = new UserRepositoryMongodb(dataSource, collectionName)

    beforeAll(async () => {
        await dataSource.clearCollection(collectionName)
        const result = await userRepositoryMongoDb.getUsers()
        expect(result).toHaveLength(0)
    })

    it("should create a new user", async () => {
        const user = UserFactory.create({ email: "any_email@email.com", password: "any_password" })
        await userRepositoryMongoDb.insert(user)
        const userReturned = await userRepositoryMongoDb.getUserByEmail("any_email@email.com")
        expect(userReturned!.email).toBe("any_email@email.com")
        expect(userReturned!.password).toBe("any_password")
    })
})