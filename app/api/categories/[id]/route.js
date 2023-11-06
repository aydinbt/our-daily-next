import Category from "@/app/models/Category";
import { connectMongoDB } from "@/app/util/dbConnect";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { name: name } = await request.json();
  await connectMongoDB();
  await Category.findByIdAndUpdate(id, { name });
  return NextResponse.json(
    { message: "Kategori Güncellendi" },
    { status: 200 }
  );
}
