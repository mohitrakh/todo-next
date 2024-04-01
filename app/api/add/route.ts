import dbConnect from "@/lib/database/connection";
import { Todo } from "@/lib/models/todoModal";
import { verifyToken } from "@/lib/verifyToken";

dbConnect(); // Assuming this establishes the database connection

interface reqbody {
    tasks: string;
    complete: boolean;
}

export async function POST(req: Request) {
    try {
        const { tasks, complete } = await req.json();
        if (!tasks) {
            return new Response(JSON.stringify({
                success: false,
                message: "Enter every data"
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const verifiedUser = verifyToken()
        if (!verifiedUser) {
            return new Response(JSON.stringify({
                success: false,
                message: "Un authorizes"
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const todo = await Todo.create({
            tasks: tasks,
            complete: complete,
            userId: verifiedUser
        });
        return new Response(JSON.stringify({
            success: true,
            data: todo,
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
