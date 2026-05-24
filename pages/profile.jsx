// Profile page — info, My Tickets, History, Settings
function TicketCard({ ticket, mode = 'upcoming', onShowQR }) {
  const movie = MOVIES.find(m => m.id === ticket.movieId) || MOVIES[3];
  const statusMap = {
    active:   ['Активний',  'rgba(93,211,158,0.16)',  'rgba(93,211,158,0.4)',  'var(--success)'],
    used:     ['Використаний','rgba(255,255,255,0.06)','var(--border-strong)', 'var(--text-mute)'],
    refunded: ['Скасований','rgba(255,160,154,0.12)', 'rgba(255,160,154,0.35)','var(--danger)'],
  };
  const [label, bg, bd, fg] = statusMap[ticket.status] || statusMap.used;

  return (
    <div className="card" style={{ padding: 0, overflow:'hidden', display:'grid', gridTemplateColumns:'auto 1fr auto', gap: 0, alignItems:'stretch' }} >
      {/* Stub */}
      <div style={{
        width: 92, position:'relative',
        background:`linear-gradient(180deg, hsl(${movie.poster.h},35%,18%), hsl(${movie.poster.h2},35%,10%))`,
        display:'flex', alignItems:'center', justifyContent:'center',
      }} className="ticket-stub">
        <div style={{
          width: 56, height: 80, borderRadius: 8,
          ...posterStyle(movie.poster.h, movie.poster.h2),
          boxShadow:'0 8px 18px rgba(0,0,0,0.4)',
        }}/>
      </div>
      {/* Body */}
      <div style={{ padding: 18, display:'flex', flexDirection:'column', gap: 10, minWidth: 0 }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10, flexWrap:'wrap' }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>{movie.title}</div>
          <span style={{
            display:'inline-flex', alignItems:'center', gap: 6,
            padding:'3px 10px', borderRadius: 999,
            background: bg, border:'1px solid '+bd, color: fg,
            fontSize: 11, fontWeight: 600,
          }}>
            <span style={{ width: 6, height: 6, borderRadius:999, background:'currentColor' }}/>
            {label}
          </span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap: 10, fontSize: 13 }} className="ticket-grid">
          <div>
            <div style={{ fontSize: 10, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Дата і час</div>
            <div style={{ color:'var(--text)', marginTop: 2 }}>{ticket.date} · <strong>{ticket.time}</strong></div>
          </div>
          <div>
            <div style={{ fontSize: 10, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Кінотеатр</div>
            <div style={{ color:'var(--text)', marginTop: 2 }}>{ticket.cinema}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Зал</div>
            <div style={{ color:'var(--text)', marginTop: 2 }}>{ticket.hall}</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Місця</div>
            <div style={{ color:'var(--text)', marginTop: 2 }}>{ticket.seats}</div>
          </div>
        </div>
        <div style={{ marginTop: 4, display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 12 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color:'var(--accent-hi)' }}>{ticket.sum} ₴</div>
          <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
            {ticket.status === 'active' && (
              <>
                <button className="btn btn-primary btn-sm" onClick={() => onShowQR(ticket)}>
                  <Icon.qr size={12}/> Показати QR-код
                </button>
                <button className="btn btn-ghost btn-sm">Завантажити квиток</button>
                <button className="btn btn-ghost btn-sm">Повернути квиток</button>
              </>
            )}
            {ticket.status !== 'active' && (
              <button className="btn btn-ghost btn-sm">Деталі</button>
            )}
          </div>
        </div>
      </div>
      {/* Perforation + mini QR */}
      <div style={{
        width: 110, padding: 14,
        borderLeft:'1px dashed var(--border-strong)',
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap: 8,
        background:'rgba(255,255,255,0.015)',
      }} className="ticket-qr">
        <div style={{
          width: 72, height: 72, borderRadius: 6,
          background: ticket.status === 'active'
            ? `repeating-conic-gradient(#fff 0 25%, #08080C 0 50%) 0 0 / 8px 8px`
            : `repeating-conic-gradient(#444 0 25%, #1a1a1a 0 50%) 0 0 / 8px 8px`,
          opacity: ticket.status === 'active' ? 1 : 0.5,
        }}/>
        <div style={{ fontSize: 9, color:'var(--text-mute)', letterSpacing:'0.08em' }}>№ KP-{ticket.id.toUpperCase()}</div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .card[style*="92px 1fr"], .card[style*="auto 1fr auto"] { grid-template-columns: 70px 1fr !important; }
          .ticket-qr { display: none !important; }
          .ticket-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function QRModal({ ticket, onClose }) {
  const movie = MOVIES.find(m => m.id === ticket.movieId) || MOVIES[3];
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset: 0, zIndex: 200,
      background:'rgba(8,8,12,0.85)', backdropFilter:'blur(10px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding: 20,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        maxWidth: 380, width:'100%', padding: 28,
        background:'#fff', color:'#08080C', borderRadius: 22, position:'relative',
        boxShadow:'0 30px 90px rgba(0,0,0,0.6), 0 0 60px rgba(229,20,42,0.15)',
      }}>
        <button onClick={onClose} style={{
          position:'absolute', top: 14, right: 14,
          width: 32, height: 32, borderRadius: 8,
          background:'#08080C', color:'#fff', border:'none', cursor:'pointer',
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <Icon.close size={14}/>
        </button>
        <div style={{ fontSize: 10, letterSpacing:'0.18em', color:'#888' }}>LUMINA CINEMA</div>
        <div style={{ marginTop: 6, fontSize: 20, fontWeight: 700 }}>{movie.title}</div>
        <hr style={{ margin:'16px 0', border:'none', borderTop:'1px dashed #ccc' }}/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12, fontSize: 13 }}>
          <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Дата</div>{ticket.date}</div>
          <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Час</div>{ticket.time}</div>
          <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Кінотеатр</div>{ticket.cinema}</div>
          <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Зал · Місця</div>{ticket.hall} · {ticket.seats}</div>
        </div>
        <div style={{ marginTop: 20, width: 220, height: 220, marginInline:'auto',
          background:`repeating-conic-gradient(#08080C 0 25%, #fff 0 50%) 0 0 / 16px 16px,
                       radial-gradient(circle, #08080C 35%, transparent 36%) 0 0 / 24px 24px`,
          borderRadius: 8,
        }}/>
        <div style={{ marginTop: 12, textAlign:'center', fontSize: 11, color:'#999' }}>№ KP-{ticket.id.toUpperCase()}</div>
        <button onClick={onClose} className="btn btn-primary btn-lg" style={{ marginTop: 18, width:'100%' }}>Готово</button>
      </div>
    </div>
  );
}

function ProfilePage({ navigate, initialTab = 'tickets' }) {
  const { user, tickets, history, openAuth, logout } = useAuth();
  const [tab, setTab] = React.useState(initialTab);
  const [qrTicket, setQrTicket] = React.useState(null);

  React.useEffect(() => { setTab(initialTab); }, [initialTab]);

  // Guest view
  if (!user) {
    return (
      <>
        <PageHeader eyebrow="Профіль" title="Увійди до акаунту"
          subtitle="Швидке бронювання улюблених місць, історія переглядів і цифрові квитки."/>
        <div className="container">
          <div className="card" style={{ padding: 40, maxWidth: 600, margin:'0 auto', textAlign:'center' }}>
            <div style={{ width: 64, height: 64, borderRadius:'50%', background:'rgba(229,20,42,0.12)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 18px', color:'var(--accent-hi)' }}>
              <Icon.user size={28}/>
            </div>
            <h2 style={{ fontSize: 22 }}>У тебе ще немає акаунту?</h2>
            <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Створи його за 30 секунд і отримай −50% на перший квиток у застосунку.</p>
            <div style={{ marginTop: 24, display:'flex', gap: 10, justifyContent:'center', flexWrap:'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => openAuth('login')}>Увійти</button>
              <button className="btn btn-ghost btn-lg" onClick={() => openAuth('register')}>Зареєструватися</button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const tabs = [
    { id: 'profile',  label: 'Профіль' },
    { id: 'tickets',  label: 'Мої квитки', count: tickets.length },
    { id: 'history',  label: 'Історія покупок', count: history.length },
    { id: 'settings', label: 'Налаштування' },
  ];

  return (
    <>
      {qrTicket && <QRModal ticket={qrTicket} onClose={() => setQrTicket(null)}/>}

      {/* Profile hero */}
      <section style={{ paddingTop: 48, paddingBottom: 28, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset: 0, background:'radial-gradient(60% 70% at 20% 0%, rgba(229,20,42,0.18), transparent 60%)' }}/>
        <div className="container" style={{ position:'relative' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 22, flexWrap:'wrap' }}>
            <div style={{
              width: 88, height: 88, borderRadius:'50%',
              background:'linear-gradient(135deg, #FF3340, #A60E20)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize: 32, fontWeight: 700, color:'#fff',
              boxShadow:'0 16px 40px rgba(229,20,42,0.35)',
            }}>{user.initials}</div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div className="eyebrow">Профіль</div>
              <h1 style={{ fontSize: 36, marginTop: 6 }}>{user.name}</h1>
              <div style={{ marginTop: 8, display:'flex', gap: 18, flexWrap:'wrap', fontSize: 13.5, color:'var(--text-dim)' }}>
                <span>{user.email}</span>
                <span>•</span>
                <span>{user.phone}</span>
                <span>•</span>
                <span>З нами з {user.member}</span>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ marginTop: 32, display:'flex', gap: 4, padding: 4, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius: 14, width:'fit-content', maxWidth:'100%', overflowX:'auto' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:'10px 18px', borderRadius: 10,
                background: tab === t.id ? 'linear-gradient(135deg, rgba(229,20,42,0.22), rgba(229,20,42,0.08))' : 'transparent',
                border:'none', color: tab === t.id ? '#FF8090' : 'var(--text-dim)',
                fontWeight: 600, fontSize: 14, cursor:'pointer', whiteSpace:'nowrap',
                display:'inline-flex', alignItems:'center', gap: 8,
              }}>
                {t.label}
                {t.count != null && <span style={{ fontSize: 11, color:'var(--text-mute)' }}>{t.count}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: 18 }}>
        {tab === 'tickets' && (
          tickets.length === 0 ? (
            <div className="card" style={{ padding: 60, textAlign:'center' }}>
              <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.4 }}>🎟️</div>
              <h3 style={{ fontSize: 20 }}>Поки що немає активних квитків</h3>
              <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Обери фільм, сеанс — і квиток зʼявиться тут.</p>
              <button className="btn btn-primary" style={{ marginTop: 18 }} onClick={() => navigate('schedule')}>Переглянути розклад</button>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              {tickets.map(t => <TicketCard key={t.id} ticket={t} onShowQR={setQrTicket}/>)}
            </div>
          )
        )}

        {tab === 'history' && (
          history.length === 0 ? (
            <div className="card" style={{ padding: 60, textAlign:'center' }}>
              <h3 style={{ fontSize: 20 }}>Історія порожня</h3>
              <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Тут зʼявляться твої минулі квитки.</p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              {history.map(t => <TicketCard key={t.id} ticket={t} mode="history" onShowQR={setQrTicket}/>)}
            </div>
          )
        )}

        {tab === 'profile' && (
          <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 18 }} className="prof-grid">
            <div className="card" style={{ padding: 28 }}>
              <div className="eyebrow">Особисті дані</div>
              <h2 style={{ fontSize: 22, marginTop: 8 }}>Контактна інформація</h2>
              <div style={{ marginTop: 20, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }} className="prof-fields">
                <Row label="Ім’я" value={user.name}/>
                <Row label="Email" value={user.email}/>
                <Row label="Телефон" value={user.phone}/>
                <Row label="Улюблений кінотеатр" value={user.favoriteCinema}/>
              </div>
              <button className="btn btn-ghost" style={{ marginTop: 20 }}>Редагувати профіль</button>
              <style>{`@media (max-width: 560px) { .prof-fields { grid-template-columns: 1fr !important; } }`}</style>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
              <div className="card" style={{ padding: 22 }}>
                <div className="eyebrow">Найближчий сеанс</div>
                {tickets[0] ? (
                  <>
                    <h3 style={{ fontSize: 18, marginTop: 8 }}>{(MOVIES.find(m => m.id === tickets[0].movieId)||{}).title}</h3>
                    <div style={{ marginTop: 6, fontSize: 12.5, color:'var(--text-dim)' }}>{tickets[0].date} · {tickets[0].time}</div>
                    <button className="btn btn-primary btn-sm" style={{ marginTop: 12 }} onClick={() => setTab('tickets')}>Показати квиток</button>
                  </>
                ) : (
                  <p style={{ marginTop: 8, fontSize: 13, color:'var(--text-mute)' }}>Активних квитків немає.</p>
                )}
              </div>
            </div>
            <style>{`@media (max-width: 880px) { .prof-grid { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        )}

        {tab === 'settings' && (
          <div className="card" style={{ padding: 28, maxWidth: 720 }}>
            <h2 style={{ fontSize: 22 }}>Налаштування</h2>
            <div style={{ marginTop: 20, display:'flex', flexDirection:'column' }}>
              {[
                ['Push про прем’єри', 'Сповіщення в застосунку про нові фільми', true],
                ['Розсилка про акції', 'Email з пропозиціями та знижками', true],
                ['SMS-нагадування', 'За годину до сеансу', false],
                ['Мовою інтерфейсу', 'Українська', null, 'select'],
              ].map(([t, s, on, type], i) => (
                <div key={i} style={{ padding:'18px 0', borderBottom: '1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'space-between', gap: 16 }}>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{t}</div>
                    <div style={{ fontSize: 12.5, color:'var(--text-mute)', marginTop: 2 }}>{s}</div>
                  </div>
                  {type === 'select' ? (
                    <button className="chip" style={{ height: 32 }}>UA <Icon.chevron size={12}/></button>
                  ) : (
                    <Toggle on={on}/>
                  )}
                </div>
              ))}
            </div>
            <button className="btn btn-ghost" style={{ marginTop: 22, color:'var(--danger)', borderColor:'rgba(255,160,154,0.3)' }} onClick={logout}>Вийти з акаунту</button>
          </div>
        )}
      </div>
    </>
  );
}

function Row({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 14.5, color:'var(--text)' }}>{value}</div>
    </div>
  );
}

function Toggle({ on }) {
  const [v, setV] = React.useState(!!on);
  return (
    <button onClick={() => setV(!v)} style={{
      width: 44, height: 26, borderRadius: 999, border:'none',
      background: v ? 'linear-gradient(135deg, #FF3340, #A60E20)' : 'rgba(255,255,255,0.08)',
      position:'relative', cursor:'pointer', transition:'background .2s',
    }}>
      <span style={{
        position:'absolute', top: 3, left: v ? 21 : 3, width: 20, height: 20, borderRadius:'50%',
        background:'#fff', transition:'left .2s',
        boxShadow:'0 2px 6px rgba(0,0,0,0.4)',
      }}/>
    </button>
  );
}

Object.assign(window, { ProfilePage, TicketCard, QRModal });
