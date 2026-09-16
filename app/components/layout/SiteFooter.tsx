export default function SiteFooter() {
  return (
    <footer id="about" className="site-footer border-t">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="site-footer-logo grid h-10 w-10 place-items-center rounded-2xl text-sm font-black">ن</span>
            <span className="site-footer-brand text-xl font-black">نُوا</span>
          </div>
          <p className="site-footer-muted max-w-sm text-sm leading-7">
            فروشگاهی ساده، مدرن و دقیق برای انتخاب محصولاتی که قرار است هر روز از آن‌ها لذت ببرید.
          </p>
        </div>

        <div>
          <h3 className="site-footer-heading mb-4 font-bold">خرید</h3>
          <div className="site-footer-muted space-y-3 text-sm"><a href="#products" className="site-footer-link block">محصولات جدید</a><a href="#products" className="site-footer-link block">پرفروش‌ها</a><a href="#products" className="site-footer-link block">پیشنهادهای ویژه</a></div>
        </div>

        <div>
          <h3 className="site-footer-heading mb-4 font-bold">راهنما</h3>
          <div className="site-footer-muted space-y-3 text-sm"><a href="#features" className="site-footer-link block">مزایای خرید</a><a href="#about" className="site-footer-link block">درباره نُوا</a><a href="#about" className="site-footer-link block">تماس با ما</a></div>
        </div>

        <div>
          <h3 className="site-footer-heading mb-4 font-bold">اعتماد شما</h3>
          <p className="site-footer-muted text-sm leading-7">پرداخت امن، ارسال سریع و پشتیبانی واقعی در تمام مسیر خرید.</p>
        </div>
      </div>
      <div className="site-footer-bottom border-t px-6 py-5 text-center text-xs">© ۱۴۰۵ نُوا — تمامی حقوق محفوظ است.</div>
    </footer>
  );
}
