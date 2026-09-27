"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/products";

export function useProducts(shouldFail = false) {
  return useQuery({
    // queryKey اسم یکتای داده در Cache است.
    // با تغییر این مقدار، React Query یک Cache جدا برای آن Query می‌سازد.
    queryKey: ["products", { shouldFail }],
    queryFn: () => getProducts(shouldFail),
  });
}
