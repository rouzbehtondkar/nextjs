const benefits = [
  { number: "۰۱", title: "انتخاب دقیق", text: "هر محصول با تمرکز روی کیفیت، طراحی و کاربرد واقعی انتخاب شده است." },
  { number: "۰۲", title: "تجربه ساده", text: "از پیدا کردن محصول تا ثبت سفارش، همه‌چیز کوتاه و بدون پیچیدگی است." },
  { number: "۰۳", title: "خرید مطمئن", text: "اطلاعات شفاف و پشتیبانی پاسخ‌گو، خرید را قابل‌اعتمادتر می‌کند." },
];

export default function Benefits() {
  return (
    <section id="features" className="bg-[#07111f] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-bold text-slate-500">چرا نُوا؟</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">کمتر جست‌وجو کن، بهتر انتخاب کن.</h2>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 md:grid-cols-3">
          {benefits.map((benefit) => (
            <article key={benefit.number} className="bg-[#0d1b2d] p-8 lg:p-10">
              <span className="text-xs font-black text-slate-500">{benefit.number}</span>
              <h3 className="mt-10 text-xl font-black text-white">{benefit.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{benefit.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
