
import dbConnect from "@/lib/database/connection";
import { Todo } from "@/lib/models/todoModal";
import { verifyToken } from "@/lib/verifyToken";
import mongoose from "mongoose";

dbConnect()

export async function GET(req: Request, { params }: { params: { id: string } }) {
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

        const verfiedId = verifyToken()

        const todo = await Todo.findOne({ _id: params?.id, userId: verfiedId })

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