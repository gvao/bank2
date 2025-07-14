

import { GetUsersRepository, GetUserByEmailRepository } from "../../application/repository/interface"
import { User, UserFactory } from "../../domain/entity/user"

export class UserRepositoryInMemory implements GetUsersRepository, GetUserByEmailRepository {
    users: User[]
    constructor(users: User[] = []) {
        this.users = users
        const senhas = ["123", "456", "789"]
        senhas.forEach(password => {
            this.add(UserFactory.create({ email: `email${password}@email.com`, password }))
        })
    }

    async getUsers({ }) {
        return this.users
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null
    }

    async add(user: User) {
        this.users.push(user)
    }
}
