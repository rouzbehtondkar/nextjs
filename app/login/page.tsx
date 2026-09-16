import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-[calc(100vh-5rem)] bg-[#f7f7f4] px-6 py-12 sm:py-20">
      <div className="mx-auto flex min-h-[600px] max-w-6xl items-center justify-center rounded-[2.5rem] border border-slate-200 bg-white/60 p-6 shadow-sm backdrop-blur sm:p-10 lg:p-16">
        <div className="hidden flex-1 pr-16 lg:block">
          <p className="text-sm font-bold text-slate-400">حساب کاربری نُوا</p>
          <h2 className="mt-4 max-w-lg text-5xl font-black leading-tight tracking-tight text-slate-950">یک قدم تا تجربه خرید ساده‌تر.</h2>
          <p className="mt-6 max-w-md leading-8 text-slate-500">سفارش‌ها، اطلاعات حساب و انتخاب‌های مورد علاقه‌ات را یک‌جا مدیریت کن.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
