// Sticky header — compact, no-wrap nav, overflow into "Ще" dropdown
function Header({ page, navigate, lang, setLang, city, toast }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [moreOpen, setMoreOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const ids = ['movies','schedule','soon','food','premium','news','faq'];
  const labels = T[lang].nav;
  const allNav = ids.map((id, i) => ({ id, label: labels[i] }));
  const primaryNav = allNav.slice(0, 5);
  const moreNav = allNav.slice(5);

  const moreRef = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => { if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: scrolled ? 'rgba(8,8,12,0.92)' : 'rgba(8,8,12,0.6)',
        backdropFilter: 'blur(20px) saturate(150%)',
        WebkitBackdropFilter: 'blur(20px) saturate(150%)',
        borderBottom: '1px solid ' + (scrolled ? 'var(--border)' : 'transparent'),
        transition: 'background .2s, border-color .2s',
      }}>
        <div className="container header-inner" style={{
          display: 'flex', alignItems: 'center', gap: 20, height: 72,
        }}>
          <button className="logo-button" onClick={() => navigate('home')} style={{ background:'none', border:'none', padding:0, flexShrink: 0, display:'inline-flex', alignItems:'center' }}>
            <Logo/>
          </button>

          <nav className="topnav" style={{ display: 'flex', alignItems:'center', justifyContent:'center', gap: 6, flex: 1, minWidth: 0, flexWrap:'nowrap', overflow:'visible' }}>
            {primaryNav.map(n => (
              <NavLink key={n.id} active={page === n.id || (n.id === 'movies' && page === 'home') || (n.id === 'schedule' && page === 'schedule')} onClick={() => navigate(n.id)}>{n.label}</NavLink>
            ))}
            <div ref={moreRef} style={{ position:'relative' }}>
              <button onClick={() => setMoreOpen(v => !v)} style={{
                background:'transparent', border:'none',
                color: moreNav.some(n => n.id === page) ? 'var(--text)' : 'var(--text-dim)',
                padding:'10px 12px', height: 40, lineHeight: 1, fontSize: 14, fontWeight: moreNav.some(n => n.id === page) ? 600 : 500,
                display:'inline-flex', alignItems:'center', justifyContent:'center', gap: 6, cursor:'pointer',
                whiteSpace:'nowrap',
              }}>
                {lang === 'UA' ? 'Ще' : 'More'}
                <Icon.chevron size={12}/>
              </button>
              {moreOpen && (
                <div style={{
                  position:'absolute', top:'calc(100% + 8px)', left: 0, zIndex: 60,
                  minWidth: 200, padding: 6,
                  background:'rgba(15,17,25,0.95)', backdropFilter:'blur(20px)',
                  border:'1px solid var(--border-strong)', borderRadius: 14,
                  boxShadow:'0 20px 60px rgba(0,0,0,0.55)',
                }}>
                  {moreNav.map(n => (
                    <button key={n.id} onClick={() => { navigate(n.id); setMoreOpen(false); }} style={{
                      display:'block', width:'100%', textAlign:'left',
                      padding:'10px 12px', borderRadius: 10,
                      background: page === n.id ? 'rgba(229,20,42,0.08)' : 'transparent',
                      border:'none', color: page === n.id ? '#FF8090' : 'var(--text)',
                      fontSize: 13.5, fontWeight: 500, cursor:'pointer', whiteSpace:'nowrap',
                    }}
                      onMouseEnter={e => { if (page !== n.id) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                      onMouseLeave={e => { if (page !== n.id) e.currentTarget.style.background = 'transparent'; }}>
                      {n.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="topright" style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <span className="chip" style={{ height: 38, cursor:'default' }}>{city}</span>

            <div style={{ display:'flex', alignItems:'center', gap: 2, padding: 3, background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)', borderRadius: 999 }}>
              {['UA','EN'].map(l => (
                <button key={l} onClick={() => {
                  setLang(l);
                  if (l === 'EN') toast && toast('English version is coming soon — interface stays Ukrainian.');
                }} style={{
                  height: 30, padding:'0 10px', borderRadius: 999, border:'none',
                  background: lang === l ? 'linear-gradient(135deg, rgba(229,20,42,0.28), rgba(229,20,42,0.10))' : 'transparent',
                  color: lang === l ? '#FF8090' : 'var(--text-dim)',
                  fontSize: 12, fontWeight: 600, letterSpacing:'0.06em', cursor:'pointer',
                }}>{l}</button>
              ))}
            </div>

            <ProfileMenu navigate={navigate}/>

            <button className="btn btn-primary btn-sm" style={{ height: 38 }} onClick={() => navigate('schedule')}>
              <Icon.ticket size={14}/>
              <span className="hide-sm">{T[lang].buyTickets}</span>
            </button>

            <button className="burger" onClick={() => setMenuOpen(true)} style={{
              display: 'none', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              width: 40, height: 40, borderRadius: 12, color: 'var(--text)', alignItems:'center', justifyContent:'center',
            }}>
              <Icon.burger/>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(8,8,12,0.96)', backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column',
        }}>
          <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height: 72 }}>
            <Logo/>
            <button onClick={() => setMenuOpen(false)} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
              width: 40, height: 40, borderRadius: 12, color: 'var(--text)', display:'inline-flex', alignItems:'center', justifyContent:'center',
            }}><Icon.close/></button>
          </div>
          <div className="container" style={{ paddingTop: 12, paddingBottom: 28, flex: 1, display:'flex', flexDirection:'column', gap: 6, overflow:'auto' }}>
            {allNav.map(n => (
              <button key={n.id} onClick={() => { navigate(n.id); setMenuOpen(false); }}
                style={{
                  textAlign:'left', padding: '18px 18px',
                  background: page === n.id ? 'rgba(229,20,42,0.10)' : 'rgba(255,255,255,0.02)',
                  border:'1px solid ' + (page === n.id ? 'rgba(229,20,42,0.4)' : 'var(--border)'),
                  borderRadius: 16, color: 'var(--text)',
                  fontSize: 18, fontWeight: 600,
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                <span>{n.label}</span>
                <Icon.right/>
              </button>
            ))}
            <div style={{ marginTop: 20, display:'flex', gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => { navigate('profile'); setMenuOpen(false); }}>
                <Icon.user size={14}/> Профіль
              </button>
              <button className="btn btn-primary" style={{ flex: 1.4 }} onClick={() => { navigate('schedule'); setMenuOpen(false); }}>
                <Icon.ticket size={14}/> {T[lang].buyTickets}
              </button>
            </div>
            <div style={{ marginTop: 20, display:'flex', alignItems:'center', justifyContent:'space-between', color:'var(--text-mute)', fontSize: 13 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
                <Icon.pin size={14}/> {city}
              </div>
              <div style={{ display:'flex', gap: 6 }}>
                {['UA','EN'].map(l => (
                  <button key={l} onClick={() => { setLang(l); if (l === 'EN') toast && toast('English version is coming soon.'); }} className="chip" style={{ height: 30, background: lang === l ? 'rgba(229,20,42,0.18)' : undefined, color: lang === l ? '#FF8090':undefined, borderColor: lang === l ? 'rgba(229,20,42,0.4)' : undefined }}>{l}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .header-inner { min-height: 72px; }
        .logo-button { min-width: 154px; }
        .topnav button { white-space: nowrap; }
        .topright { min-height: 40px; }
        .topright > * { flex-shrink: 0; }
        @media (max-width: 1280px) {
          .header-inner { gap: 14px !important; }
          .topnav { gap: 3px !important; }
          .topnav button { font-size: 13.5px !important; padding-left: 9px !important; padding-right: 9px !important; }
        }
        @media (max-width: 1200px) {
          .topnav { display: none !important; }
          .burger { display: inline-flex !important; }
          .logo-button { min-width: 0; }
        }
        @media (max-width: 820px) {
          .topright .chip { display: none; }
        }
        @media (max-width: 640px) {
          .hide-md, .hide-sm { display: none; }
          .topright > .btn-ghost > span:last-child { display: none; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { Header });
