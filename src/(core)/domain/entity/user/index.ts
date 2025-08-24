import { UserCreateDto, UserDto } from "./dto"

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

export class UserFactory {
    static create({ email, password }: UserCreateDto) {
        const id = crypto.randomUUID()
        return new User({ id, email, password })
    }

    static load({ email, password, id }: UserDto) {
        return new User({ email, password, id })
    }
}