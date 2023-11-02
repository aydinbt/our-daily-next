import { NextResponse } from "next/server";
import Products from "../../models/Products";
import { connectMongoDB } from "../../util/dbConnect";

export async function GET(request) {
  try {
    await connectMongoDB();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const query = {};
    if (search) {
      query.name = new RegExp(search, "i");
    }
    if (category) {
      query.category = category;
    }
    const productFilter = await Products.find(query);
    return NextResponse.json({ productFilter }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Bir hata oluştu." }, { status: 500 });
  }
}

export async function POST(request) {
  await connectMongoDB();
  const body = await request.json();

  try {
    const newProduct = await new Products(body);
    await newProduct.save();

    return NextResponse.json({ newProduct }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
