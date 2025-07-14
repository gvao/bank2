import { GetUserByEmail, GetUsersUseCase } from "./application/use-cases"
import { UserRepositoryInMemory } from "./infra/repositories/user-repository-in-memory"

const userRepository = new UserRepositoryInMemory()

export const getUsers = new GetUsersUseCase(userRepository)
export const getUserByEmail = new GetUserByEmail(userRepository)