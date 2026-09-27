export type ProductApiItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  deliveryInfo: string;
};

export async function getProducts(shouldFail = false): Promise<ProductApiItem[]> {
  // اینجا Browser به REST API خود همین Next.js درخواست GET می‌فرستد.
  const response = await fetch(
    shouldFail ? "/api/products?fail=true" : "/api/products",
  );

  if (!response.ok) {
    // React Query این throw را به state مربوط به error تبدیل می‌کند.
    const errorBody = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;

    throw new Error(errorBody?.message ?? "دریافت محصولات ناموفق بود.");
  }

  return response.json();
}
