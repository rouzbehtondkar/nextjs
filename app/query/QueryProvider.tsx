"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // QueryClient جعبه‌ای است که Cache و وضعیت درخواست‌های Server را نگه می‌دارد.
  // با useState فقط یک QueryClient در طول عمر این Provider ساخته می‌شود.
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // تا ۳۰ ثانیه داده را تازه فرض می‌کنیم و بی‌دلیل دوباره درخواست نمی‌فرستیم.
            staleTime: 30 * 1000,
            // داده‌ای که دیگر روی صفحه استفاده نمی‌شود تا ۵ دقیقه در Cache می‌ماند.
            gcTime: 5 * 60 * 1000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
