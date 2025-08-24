import client from "../lib/mongodb"
import { CreateUserUseCase, GetUserByEmail, GetUsersUseCase } from "./application/use-cases"
import { MongoDataSource } from "./infra/data-source/mongo.data-source"
import { UserRepositoryMongodb } from "./infra/repositories/user-repository-mongodb"

// const userRepository = new UserRepositoryInMemory()
const dbName = process.env.MONGO_DB_NAME || "myDatabase"
    
const dataSource = new MongoDataSource(client, dbName)
const userRepository = new UserRepositoryMongodb(dataSource)

export const getUsers = new GetUsersUseCase(userRepository)
export const getUserByEmail = new GetUserByEmail(userRepository)
export const createUser = new CreateUserUseCase(userRepository)