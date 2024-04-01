import dbConnect from "@/lib/database/connection"
import { Todo } from "@/lib/models/todoModal";
import { verifyToken } from "@/lib/verifyToken";
import mongoose from "mongoose";

dbConnect()

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {


        // Check if the ID is a valid ObjectID
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid ID format"
            }), {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const todo = await Todo.findOneAndDelete({ _id: params?.id })

        return new Response(JSON.stringify({
            success: true,
            message: "Todo deleted successfully",
            data: todo
        }))

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
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        if (!mongoose.Types.ObjectId.isValid(params.id)) {
            return new Response(JSON.stringify({
                success: false,
                message: "Invalid ID format"
            }), {
                status: 400, // Bad Request
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const { tasks, complete } = await req.json();
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

        const todo = await Todo.findOneAndUpdate({ _id: params?.id, userId: verifiedUser }, {
            tasks: tasks,
            complete: complete
        }, {
            new: true
        })
        return new Response(JSON.stringify({
            success: true,
            data: todo
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