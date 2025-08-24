import { User, UserFactory } from "../../domain/entity/user";
import { InsertRepository } from "../repository/interface";

export class CreateUserUseCase implements UseCase<Input, Output> {
    constructor(private readonly userRepository: InsertRepository<User>) { }
    async execute(input: Input): Promise<Output> {
        const user = UserFactory.create(input)
        await this.userRepository.insert(user)
        return {
            success: true,
            userId: user.id
        }
    }
}

interface UseCase<Input = void, Output = void> {
    execute(input: Input): Promise<Output>
}

type Input = {
    email: string
    password: string
}

type Output = {
    success: boolean
    userId: string
}