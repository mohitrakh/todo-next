import dbConnect from "@/lib/database/connection";
import { User } from "@/lib/models/userModal";
import bcrypt from 'bcryptjs'

dbConnect()

export async function POST(request: Request) {
    try {
        const { username, password, termsAndConditions, email } = await request.json();
        // Check if a user with the same email exists
        const userByEmail = await User.findOne({ email: email });
        // Check if a user with the same username exists
        const userByUsername = await User.findOne({ username: username });

        // If either a user with the same email or username exists, throw an error
        if (userByEmail || (userByUsername && userByUsername.email !== email)) {
            return new Response(JSON.stringify({
                success: false,
                message: "Email or username already exist."
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const hashedPass = await bcrypt.hash(password, 10)
        const user = await User.create({
            username, email, password: hashedPass, termsAndConditions,
        });
        return new Response(JSON.stringify({
            success: true,
            data: user
        }), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({
            success: false,
            message: "An error occurred."
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}