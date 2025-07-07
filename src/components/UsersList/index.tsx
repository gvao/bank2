import { LiHTMLAttributes } from "react"
import { Card } from "../ui/card"
import { getUsers, User } from "@/src/core"

export async function UsersList() {
    const users = await getUsers.execute()
    return (
        <section>
            <ul className="gap-3 flex flex-col p-4 " >
                {users.map((user) => (
                    <UserItem key={user.id} user={user} />
                ))}
            </ul>
        </section>
    )
}

const UserItem = ({ user, ...props }: LiHTMLAttributes<HTMLLIElement> & { user: User }) => (
    <Card key={user.id} className="py-2 px-4" >
        <li {...props} >{user.email}</li>
    </Card>
)