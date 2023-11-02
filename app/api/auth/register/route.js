import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/app/util/dbConnect";
import User from "@/app/models/User";

export async function POST(request) {
  await connectMongoDB();
  const body = await request.json();
  let user = await User.findOne({ email: body.email });
  if (user) {
    return NextResponse.json(
      { message: "User already exits" },
      { status: 404 }
    );
  }
  try {
    const newUser = await new User(body);
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    await newUser.save();
    return NextResponse.json({ message: "Created", newUser }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
}
