import { User, UserFactory } from "../../domain/entity/user"
import { UserRepository } from "./user-repository.interface"

export class UserRepositoryInMemory implements UserRepository {
    users: User[]
    constructor(users: User[] = []) {
        this.users = users
        const senhas = ["123", "456", "789"]
        senhas.forEach(password => {
            this.add(UserFactory.create({ email: `email${password}@email.com`, password }))
        })
    }
    async insert(user: User): Promise<void> {
        this.users.push(user)
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

