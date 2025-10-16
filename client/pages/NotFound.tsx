
const NotFound = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-8xl sm:text-9xl font-mono font-bold text-accent animate-pulse">404</h1>
        <p className="mt-4 text-xl sm:text-2xl text-foreground/80 font-medium">Aradığınız sayfa bulunamadı</p>
        <p className="mt-2 text-sm sm:text-base text-foreground/60">Sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.</p>
        <a 
          href="/" 
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-base font-semibold text-accent-foreground hover:opacity-90 transition-opacity"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Ana Sayfaya Dön
        </a>
      </div>
    </div>
  );
};

export default NotFound;
