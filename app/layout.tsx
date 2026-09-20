import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import SiteFooter from "./components/layout/SiteFooter";
import SiteHeader from "./components/layout/SiteHeader";
import StoreProvider from "./store/StoreProvider";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "نُوا | انتخاب‌های بهتر، ساده‌تر",
  description: "فروشگاه مدرن نُوا برای انتخاب محصولات کاربردی و خوش‌ساخت.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {/* Redux را در بالاترین سطح قرار می‌دهیم تا Header و صفحات همگی به Store دسترسی داشته باشند. */}
        <StoreProvider>
          <div className="min-h-screen">
            <SiteHeader />
            {children}
            <SiteFooter />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
