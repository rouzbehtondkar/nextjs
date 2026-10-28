import { NextResponse } from "next/server";
import { demoProducts } from "../../features/home/domain/ProductDemo";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim().toLocaleLowerCase();

  // این تأخیر آزمایشی کمک می‌کند زمان ارسال درخواست را در Network واضح‌تر ببینی.
  await new Promise((resolve) => setTimeout(resolve, 350));

  const products = demoProducts
    .map((product) => ({
      id: product.name,
      name: product.name,
      category: product.category,
      price: product.price,
    }))
    .filter((product) => {
      const searchableText = `${product.name} ${product.category}`.toLocaleLowerCase();
      return searchableText.includes(query);
    });

  return NextResponse.json(products);
}
