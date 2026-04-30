function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-bold text-primary text-xl">
            Vietnam Airways
          </span>
          <p className="font-body-sm text-xs text-slate-500">
            © 2024 Vietnam Airways. Tất cả quyền được bảo lưu.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center gap-8">
          <a
            className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 hover:underline"
            href="#"
          >
            Về chúng tôi
          </a>
          <a
            className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 hover:underline"
            href="#"
          >
            Điều khoản sử dụng
          </a>
          <a
            className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 hover:underline"
            href="#"
          >
            Chính sách bảo mật
          </a>
          <a
            className="font-['Plus_Jakarta_Sans'] text-xs text-slate-500 hover:underline"
            href="#"
          >
            Trợ giúp
          </a>
        </nav>
        <div className="flex gap-4">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:bg-secondary-container transition-colors">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="language"
            >
              language
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white cursor-pointer hover:bg-secondary-container transition-colors">
            <span
              className="material-symbols-outlined text-lg"
              data-icon="mail"
            >
              mail
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
