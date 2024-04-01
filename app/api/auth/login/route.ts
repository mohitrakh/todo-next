import dbConnect from "@/lib/database/connection";
import { User } from "@/lib/models/userModal";
import bcrypt from 'bcryptjs'; // Use bcrypt instead of bcrypts (common typo)
import jwt from 'jsonwebtoken';
import { cookies } from "next/headers";

dbConnect();

export async function POST(req: Request, res: Response) {
  try {
    const { email, password, termsAndConditions } = await req.json();

    const user = await User.findOne({ email: email });

    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        message: "User with this email doesn't exist"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const comparePass = await bcrypt.compare(password, user.password);

    if (!comparePass) {
      return new Response(JSON.stringify({
        success: false,
        message: "Wrong Credentials"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    cookies().set("access-token", token)
    return new Response(JSON.stringify({
      success: true,
      user
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({
      success: false,
      message: "An error occurred. bruh"
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
