import { NextResponse } from "next/server";

import User from "@/app/models/User";
import { connectMongoDB } from "@/app/util/dbConnect";

export async function GET() {
  await connectMongoDB();
  const user = await User.find();
  try {
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
