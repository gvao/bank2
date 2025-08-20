import { User } from "../../domain/entity/user"

export type GetUserByEmailRepository = {
    getUserByEmail: (email: string) => Promise<User | null>
}

export type GetUsersRepository = {
    getUsers: ({}: RepositoryQuery) => Promise<User[]>
}

export type InsertRepository<T> = {
    insert(data: T): Promise<{ insertedId: string; }>
}

type RepositoryQuery = { [k: string]: unknown }