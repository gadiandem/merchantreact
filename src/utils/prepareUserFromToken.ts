// import jwt from 'jsonwebtoken'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
    id?: string
    sub: string // email
    aud: string // name
}

export default function prepareUserFromToken(
    token: string | null,
): JwtPayload | null {
    if (token) {
        const decoded = jwtDecode(token)
        return typeof decoded === 'object' ? (decoded as JwtPayload) : null
    } else {
        console.error(
            'ERROR: prepareUserFromToken did not receive a token:',
            token,
        )
        return null
    }
}
