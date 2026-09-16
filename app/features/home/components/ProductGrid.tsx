const products = [
  { name: "هدفون آوا", category: "صوت و تصویر", price: "۳٬۸۹۰٬۰۰۰ تومان", tone: "from-slate-900 to-slate-600" },
  { name: "ساعت نوا 02", category: "پوشیدنی هوشمند", price: "۵٬۴۵۰٬۰۰۰ تومان", tone: "from-indigo-950 to-indigo-500" },
  { name: "چراغ رومیزی لاین", category: "خانه و دکور", price: "۱٬۷۹۰٬۰۰۰ تومان", tone: "from-amber-900 to-orange-400" },
];

export default function ProductGrid() {
  return (
    <section id="products" className="bg-[#091626] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-slate-500">منتخب نُوا</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">محصولاتی که ارزش دیدن دارند</h2>
          </div>
          <a href="#products" className="text-sm font-bold text-slate-300 transition hover:text-white">مشاهده همه ←</a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product, index) => (
            <article key={product.name} className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d1b2d] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl hover:shadow-black/30">
              <div className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${product.tone}`}>
                <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,white_0,transparent_28%),radial-gradient(circle_at_80%_75%,white_0,transparent_24%)]" />
                <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">۰{index + ۱}</span>
                <div className="absolute bottom-5 left-5 right-5 h-28 rounded-3xl border border-white/15 bg-white/10 backdrop-blur-md transition duration-500 group-hover:scale-[1.03]" />
              </div>
              <div className="p-6">
                <p className="text-xs font-bold text-slate-500">{product.category}</p>
                <div className="mt-2 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-black text-white">{product.name}</h3>
                  <span className="whitespace-nowrap text-sm font-bold text-slate-300">{product.price}</span>
                </div>
                <button className="mt-6 w-full rounded-2xl border border-white/10 py-3 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white hover:text-slate-950">افزودن به سبد</button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
