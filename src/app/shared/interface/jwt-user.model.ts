export interface UserJWT {
    email: string
    exp: number
    iat: number
    id: string
    permission: string
    username: string
}

export const userJWTdefualt:UserJWT = {
    email: "",
    exp: 0,
    iat: 0,
    id: "",
    permission: "",
    username: "",
}