function Footer({ navigate, lang, setLang }) {
  const cols = [
  {
    title: 'Кіно', links: [
    ['Фільми', 'movies'],
    ['Розклад', 'schedule'],
    ['Незабаром', 'soon'],
    ['Купити подарунковий сертифікат', null]]

  },
  {
    title: 'Кінотеатр', links: [
    [CINEMA, 'cinemas'],
    ['Premium-зали', 'premium'],
    ['Їжа та напої', 'food'],
    ['Доступне середовище', 'access']]

  },
  {
    title: 'Допомога', links: [
    ['FAQ', 'faq'],
    ['Акції', 'news'],
    ['Повернення квитків', 'faq'],
    ['Контакти', null]]

  }];


  return (
    <footer style={{ marginTop: 80, borderTop: '1px solid var(--border)', background: 'linear-gradient(180deg, transparent, rgba(229,20,42,0.03))' }}>
      <div className="container" style={{ paddingTop: 64, paddingBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1.2fr', gap: 40 }} className="footer-grid">
          <div>
            <Logo size={28} />
            <p style={{ marginTop: 16, color: 'var(--text-mute)', fontSize: 13.5, lineHeight: 1.6, maxWidth: 280 }}>
              Lumina — сучасний кінотеатр у Києві. Великі екрани, преміальний звук, дбайливий сервіс і фільми, до яких хочеться повертатися.
            </p>
            <div style={{ marginTop: 18, display: 'flex', gap: 10 }}>
              {/* App store buttons */}
              <button className="btn btn-ghost btn-sm" style={{ height: 42, padding: '0 14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.43c-.03-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.59 1.1-.96 0-2.41-1.08-3.97-1.05-2.04.03-3.92 1.19-4.97 3-2.12 3.67-.54 9.1 1.52 12.08 1.01 1.46 2.21 3.09 3.78 3.03 1.52-.06 2.1-.98 3.94-.98 1.83 0 2.36.98 3.96.95 1.64-.03 2.67-1.48 3.66-2.95 1.16-1.69 1.64-3.34 1.67-3.43-.04-.02-3.2-1.23-3.23-4.84zM14.3 4.42c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.82-.78.9-1.46 2.35-1.28 3.73 1.36.1 2.74-.69 3.58-1.71z" /></svg>
                <div style={{ textAlign: 'left', lineHeight: 1 }}>
                  <div style={{ fontSize: 9, color: 'var(--text-mute)' }}>Завантажити в</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>App Store</div>
                </div>
              </button>
              <button className="btn btn-ghost btn-sm" style={{ height: 42, padding: '0 14px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.95c-.36.38-.57.96-.57 1.72v16.66c0 .75.21 1.34.57 1.71l.06.05L12 13.74v-.21L3.66 1.9zM15.5 16.5l-2.78-2.78V12.27l2.78-2.78.06.04 3.29 1.87c.94.53.94 1.4 0 1.94l-3.29 1.87zM12 13.74L3.6 22.15c.31.33.82.37 1.4.05l9.83-5.59L12 13.74zM4.99 1.82c-.58-.33-1.09-.29-1.4.04L12 10.27l2.83-2.83L4.99 1.82z" /></svg>
                <div style={{ textAlign: 'left', lineHeight: 1 }}>
                  <div style={{ fontSize: 9, color: 'var(--text-mute)' }}>Завантажити в</div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Google Play</div>
                </div>
              </button>
            </div>
          </div>

          {cols.map((col) =>
          <div key={col.title}>
              <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 16, fontWeight: 600 }}>{col.title}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {col.links.map(([label, target], i) =>
              <a key={i} onClick={() => target && navigate(target)} style={{ fontSize: 13.5, color: 'var(--text-dim)', cursor: target ? 'pointer' : 'default' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'} onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-dim)'}>
                    {label}
                  </a>
              )}
              </div>
            </div>
          )}

          <div>
            <div style={{ fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-mute)', marginBottom: 16, fontWeight: 600 }}>Контакти</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: 'var(--text-dim)' }}>
              <div>Підтримка <span style={{ color: 'var(--text)', fontWeight: 600 }}>0 800 50 12 12</span></div>
              <div>Щодня 09:00 — 23:00</div>
              <a href="mailto:hello@lumina.ua" style={{ color: 'var(--accent)' }}>hello@lumina.ua</a>
              <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                {['IG', 'FB', 'TG', 'YT'].map((s) =>
                <a key={s} style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', color: 'var(--text-dim)'
                }}>{s}</a>
                )}
              </div>
            </div>
          </div>
        </div>

        <hr className="hr" style={{ margin: '40px 0 22px' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--text-mute)' }}>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span>© 2026 Lumina Theatres</span>
            <a style={{ cursor: 'pointer' }}>Публічна оферта</a>
            <a style={{ cursor: 'pointer' }}>Політика конфіденційності</a>
            <a style={{ cursor: 'pointer' }}>Правила відвідування</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Icon.globe size={14} />
            {['UA', 'EN'].map((l) =>
            <button key={l} onClick={() => setLang(l)} style={{
              background: 'none', border: 'none',
              color: lang === l ? 'var(--accent)' : 'var(--text-mute)',
              fontSize: 12, fontWeight: 600, letterSpacing: '0.06em', padding: 0
            }}>{l}</button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) { .footer-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>);

}

Object.assign(window, { Footer });
