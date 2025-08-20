import { GetUsersRepository, GetUserByEmailRepository, InsertRepository } from "../../application/repository/interface"
import { User } from "../../domain/entity/user";

export interface UserRepository extends GetUsersRepository, GetUserByEmailRepository, InsertRepository<User> { }