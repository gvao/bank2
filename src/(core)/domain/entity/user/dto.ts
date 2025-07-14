export type UserDto = { id: string, email: string, password: string }
export type UserCreateDto = Omit<UserDto, 'id'>
