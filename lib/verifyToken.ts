import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
export function verifyToken() {
    const cookie = cookies().get("access-token")?.value;
    if (!cookie) {
        return new Response(JSON.stringify({
            success: false,
            message: "Not Authorized"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const verifiedUser = jwt.verify(cookie, process.env.JWT_SECRET);

    return verifiedUser.id
}