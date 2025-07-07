export type UserDto = { id: string, email: string, password: string }
export type UserCreateDto = Omit<UserDto, 'id'>

export class User {
    id: string
    email: string
    password: string

    constructor({ id, email, password }: UserDto) {
        this.id = id
        this.email = email
        this.password = password
    }
}

class UserFactory {
    static create({ email, password }: UserCreateDto) {
        const id = crypto.randomUUID()
        return new User({ id, email, password })
    }
}

export class UserRepository {
    users: User[]
    constructor(users: User[] = []) {
        this.users = users
        const senhas = ["123", "456", "789"]
        senhas.forEach(password => {
            this.add(UserFactory.create({ email: "email@email.com", password }))
        })
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.users.find(user => user.email === email)
    }

    async add(user: User) {
        this.users.push(user)
    }
}

export class GetUserByEmail {

    constructor(private readonly userRepository: UserRepository) { }
    execute = async ({ email }: { email: string }): Promise<Output> => {
        const errors = []
        const data = {} as DataOutput
        const user = await this.userRepository.findByEmail(email)
        if (!user) errors.push("User not found")
        if (user) {
            data.id = user?.id
            data.email = user?.email
            data.password = user?.password
        }
        return {
            errors,
            data
        } satisfies Output
    }
}

type DataOutput = {
    id: string
    email: string
    password: string
}
type Output = {
    errors: string[]
    data?: DataOutput
}

class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    execute = async (): Promise<User[]> => {
        return this.userRepository.users
    }
}

const userRepository = new UserRepository()
export const getUsers = new GetUsersUseCase(userRepository)
export const getUserByEmail = new GetUserByEmail(userRepository)