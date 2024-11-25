export interface User {
    name: string
    email: string
    bio?: string
}
export interface UpdateUser{
    name?: string
    email?: string
    bio?: string
}