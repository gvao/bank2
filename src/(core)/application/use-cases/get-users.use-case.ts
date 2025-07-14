import { User } from "../../domain/entity/user"
import { GetUsersRepository } from "../repository/interface"

export class GetUsersUseCase {
    constructor(private readonly userRepository: UserRepository) { }
    async execute(): Promise<User[]> {
        return this.userRepository.getUsers({})
    }
}

type UserRepository = GetUsersRepository