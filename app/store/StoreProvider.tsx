"use client";

import { Provider } from "react-redux";
import { store } from "./store";

// Provider باعث می‌شود تمام کامپوننت‌های داخل آن به Redux Store دسترسی داشته باشند.
// چون Provider یک کامپوننت Client است، این فایل باید "use client" داشته باشد.
export default function StoreProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
