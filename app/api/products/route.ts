import { NextResponse } from "next/server";
import { demoProducts } from "../../features/home/domain/ProductDemo";

export async function GET(request: Request) {
  const url = new URL(request.url);

  // این پارامتر فقط برای تمرین Error Handling است.
  if (url.searchParams.get("fail") === "true") {
    return NextResponse.json(
      { message: "سرور عمداً برای تمرین خطا، 500 برگرداند." },
      { status: 500 },
    );
  }

  const products = demoProducts.map((product) => ({
    id: product.name,
    name: product.name,
    category: product.category,
    price: product.price,
    deliveryInfo: product.getDeliveryInfo(),
  }));

  return NextResponse.json(products);
}
