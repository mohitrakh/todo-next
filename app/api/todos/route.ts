import dbConnect from "@/lib/database/connection"
import { Todo } from "@/lib/models/todoModal";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken'
import { verifyToken } from "@/lib/verifyToken";

dbConnect()

interface reqbody {
    tasks: string,
    complete: boolean
}

export async function GET(req: Request) {
    try {
        const userId = verifyToken()
        const todos = await Todo.find({ userId: userId })
        return new Response(JSON.stringify({
            success: true,
            data: todos
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