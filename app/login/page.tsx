import LoginForm from "../features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="home-hero min-h-[calc(100vh-5rem)] px-6 py-12 sm:py-20">
      <div className="theme-surface mx-auto flex min-h-[600px] max-w-6xl items-center justify-center rounded-[2.5rem] border p-6 shadow-sm sm:p-10 lg:p-16" style={{ borderColor: "var(--border)" }}>
        <div className="hidden flex-1 pr-16 lg:block">
          <p className="theme-muted text-sm font-bold">حساب کاربری نُوا</p>
          <h2 className="theme-text mt-4 max-w-lg text-5xl font-black leading-tight tracking-tight">یک قدم تا تجربه خرید ساده‌تر.</h2>
          <p className="theme-muted mt-6 max-w-md leading-8">سفارش‌ها، اطلاعات حساب و انتخاب‌های مورد علاقه‌ات را یک‌جا مدیریت کن.</p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
