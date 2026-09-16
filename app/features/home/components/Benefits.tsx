const benefits = [
  { number: "۰۱", title: "انتخاب دقیق", text: "هر محصول با تمرکز روی کیفیت، طراحی و کاربرد واقعی انتخاب شده است." },
  { number: "۰۲", title: "تجربه ساده", text: "از پیدا کردن محصول تا ثبت سفارش، همه‌چیز کوتاه و بدون پیچیدگی است." },
  { number: "۰۳", title: "خرید مطمئن", text: "اطلاعات شفاف و پشتیبانی پاسخ‌گو، خرید را قابل‌اعتمادتر می‌کند." },
];

export default function Benefits() {
  return (
    <section id="features" className="home-benefits py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="theme-muted text-sm font-bold">چرا نُوا؟</p>
          <h2 className="theme-text mt-2 text-3xl font-black tracking-tight sm:text-4xl">کمتر جست‌وجو کن، بهتر انتخاب کن.</h2>
        </div>

        <div className="theme-border mt-12 grid gap-px overflow-hidden rounded-[2rem] border md:grid-cols-3" style={{ background: "var(--border)" }}>
          {benefits.map((benefit) => (
            <article key={benefit.number} className="theme-surface p-8 lg:p-10">
              <span className="theme-muted text-xs font-black">{benefit.number}</span>
              <h3 className="theme-text mt-10 text-xl font-black">{benefit.title}</h3>
              <p className="theme-muted mt-3 text-sm leading-7">{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
