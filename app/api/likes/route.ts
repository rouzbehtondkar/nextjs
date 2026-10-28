import { NextResponse } from "next/server";

// این API فقط برای تمرین Optimistic UI است؛ داده‌ها را در دیتابیس ذخیره نمی‌کند.
export async function POST(request: Request) {
  const body = (await request.json()) as {
    liked?: boolean;
    count?: number;
    simulateFailure?: boolean;
  };

  // تأخیر مصنوعی برای اینکه بتوانیم تغییر فوری UI را قبل از پاسخ ببینیم.
  await new Promise((resolve) => setTimeout(resolve, 1400));

  if (body.simulateFailure) {
    return NextResponse.json(
      { message: "خطای آزمایشی سرور؛ ثبت لایک انجام نشد." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    liked: Boolean(body.liked),
    count: Number(body.count ?? 0),
    message: "لایک با موفقیت از سمت سرور تأیید شد.",
  });
}
