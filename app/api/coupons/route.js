import Coupons from "@/app/models/Coupons";
import { connectMongoDB } from "@/app/util/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  await connectMongoDB();
  const coupons = await Coupons.find();
  try {
    return NextResponse.json({ coupons }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function POST(request) {
  await connectMongoDB();
  const body = await request.json();

  try {
    const newCoupons = await new Coupons(body);
    await newCoupons.save();

    return NextResponse.json({ newCoupons }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
