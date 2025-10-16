const socials = [
  { label: "Instagram", href: "https://www.instagram.com/kkhrmn66/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/erdem-kahraman-807415213/" },
  { label: "GitHub", href: "https://github.com/erdemKahramanDev" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="container py-10 grid gap-6 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-2 font-mono text-base sm:text-lg font-semibold">
            <img src="/icons/logo.png" alt="Logo" className="h-8 w-10 sm:h-9 sm:w-11" />
            <span className="text-sm sm:text-base">Ahmed Erdem Kahraman</span>
          </div>
          <p className="mt-2 text-xs sm:text-sm text-foreground/70">
            Modern web ve mobil çözümler. Yeni projeler için iletişime geçin.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border/60 px-3 py-1.5 text-foreground/80 hover:border-accent/50 hover:text-accent transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end justify-between">
          <div className="mt-6 md:mt-0 text-sm text-foreground/50">
            © {new Date().getFullYear()} Ahmed Erdem Kahraman. Tüm hakları saklıdır.
          </div>
        </div>
      </div>
    </footer>
  );
}
