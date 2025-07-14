import { GetUserByEmailRepository } from "../repository/interface"

export class GetUserByEmail {
    constructor(private readonly userRepository: UserRepository) { }
    execute = async ({ email }: { email: string }): Promise<Output> => {
        const errors = []
        const data = {} as DataOutput
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) errors.push("User not found")
        if (user) {
            data.id = user.id
            data.email = user.email
            data.password = user.password
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

type UserRepository = GetUserByEmailRepository 