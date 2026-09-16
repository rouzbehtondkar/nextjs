export default function SiteFooter() {
  return (
    <footer id="about" className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white text-sm font-black text-slate-950">ن</span>
            <span className="text-xl font-black text-white">نُوا</span>
          </div>
          <p className="max-w-sm text-sm leading-7 text-slate-400">
            فروشگاهی ساده، مدرن و دقیق برای انتخاب محصولاتی که قرار است هر روز از آن‌ها لذت ببرید.
          </p>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">خرید</h3>
          <div className="space-y-3 text-sm"><a href="#products" className="block hover:text-white">محصولات جدید</a><a href="#products" className="block hover:text-white">پرفروش‌ها</a><a href="#products" className="block hover:text-white">پیشنهادهای ویژه</a></div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">راهنما</h3>
          <div className="space-y-3 text-sm"><a href="#features" className="block hover:text-white">مزایای خرید</a><a href="#about" className="block hover:text-white">درباره نُوا</a><a href="#about" className="block hover:text-white">تماس با ما</a></div>
        </div>

        <div>
          <h3 className="mb-4 font-bold text-white">اعتماد شما</h3>
          <p className="text-sm leading-7 text-slate-400">پرداخت امن، ارسال سریع و پشتیبانی واقعی در تمام مسیر خرید.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center text-xs text-slate-500">© ۱۴۰۵ نُوا — تمامی حقوق محفوظ است.</div>
    </footer>
  );
}
