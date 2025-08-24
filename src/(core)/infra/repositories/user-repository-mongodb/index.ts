import { User, UserFactory } from "../../../domain/entity/user";
import { DataSource } from "../../data-source/data-source.interface";
import { UserRepository } from "../user-repository.interface";
import { UserDto } from "../../../domain/entity/user/dto";

export class UserRepositoryMongodb implements UserRepository {
    constructor(
        readonly datasource: DataSource,
        readonly collectionName = 'users',
    ) { }

    getUsers = async (query: { [k: string]: unknown; } = {}) => {
        const result = await this.datasource.find<UserDto>(this.collectionName, query)
        const users = result.map(user => UserFactory.load(user))
        return users
    };

    getUserByEmail: (email: string) => Promise<User | null> = async (email) => {
        const [user] = await this.datasource.find<UserDto>(this.collectionName, { email })
        if (!user) return null
        return UserFactory.load(user)
    };
    async insert(user: User): Promise<{ insertedId: string; }> {
        const data: UserDto = {
            id: user.id,
            email: user.email,
            password: user.password
        }

        return await this.datasource.insertOne(this.collectionName, data)
    }

}