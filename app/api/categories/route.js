import { NextResponse } from "next/server";
import { connectMongoDB } from "../../util/dbConnect";
import Category from "../../models/Category";

export async function GET() {
  await connectMongoDB();
  const category = await Category.find();
  try {
    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function POST(request) {
  await connectMongoDB();
  const body = await request.json();

  try {
    const newCategory = await new Category(body);
    await newCategory.save();

    return NextResponse.json({ newCategory }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Silindi" }, { status: 200 });
}
