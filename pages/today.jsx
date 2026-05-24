function PageHeader({ eyebrow, title, subtitle, children }) {
  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 24 }}>
      {eyebrow && <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>}
      <h1 style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>{title}</h1>
      {subtitle && <p style={{ marginTop: 14, color:'var(--text-dim)', fontSize: 16, maxWidth: 640 }}>{subtitle}</p>}
      {children && <div style={{ marginTop: 22 }}>{children}</div>}
    </div>
  );
}

function DateTabs({ value, onChange }) {
  return (
    <div className="hrow" style={{ gap: 8 }}>
      {DATES.map(d => (
        <button key={d.id} onClick={() => onChange(d.id)} style={{
          flexShrink: 0,
          padding: '12px 18px',
          borderRadius: 14,
          background: value === d.id ? 'linear-gradient(135deg, rgba(229,20,42,0.18), rgba(229,20,42,0.06))' : 'rgba(255,255,255,0.03)',
          border:'1px solid ' + (value === d.id ? 'rgba(229,20,42,0.5)' : 'var(--border)'),
          color: value === d.id ? '#FF8090' : 'var(--text)',
          minWidth: 100, textAlign:'center', cursor:'pointer',
        }}>
          <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>{d.dow}</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 4 }}>{d.label}</div>
          <div style={{ fontSize: 11, color:'var(--text-mute)', marginTop: 2 }}>{d.date}</div>
        </button>
      ))}
    </div>
  );
}

function TodayPage({ navigate }) {
  const [date, setDate] = React.useState('today');
  const [filter, setFilter] = React.useState('Усі');
  const [time, setTime] = React.useState('Будь-який');

  const filters = ['Усі', '2D', '3D', 'IMAX', '4DX', 'Premium', 'Українською', 'Мовою оригіналу', 'З субтитрами', 'Для сім’ї', 'Вечірні сеанси'];
  const timeOfDay = ['Будь-який', 'Ранок', 'День', 'Вечір', 'Ніч'];

  const visible = MOVIES.filter(m => {
    if (filter === 'Усі') return true;
    if (filter === 'Українською') return m.lang.startsWith('Українською');
    if (filter === 'Мовою оригіналу') return m.lang.includes('оригіналу');
    if (filter === 'З субтитрами') return m.lang.includes('субтитри');
    if (filter === 'Для сім’ї') return m.age === '6+' || m.age === '12+';
    if (filter === 'Вечірні сеанси') return true;
    return m.formats.includes(filter);
  });

  return (
    <>
      <PageHeader
        eyebrow={CITY + ' • ' + CINEMA}
        title="Розклад"
        subtitle="Обери фільм, сеанс і зручні місця в Lumina 11 SkyMall — і купуй квиток за хвилину."
      >
        <div style={{ display:'flex', flexWrap:'wrap', gap: 10 }}>
          <span className="chip" style={{ height: 38, cursor:'default' }}>{CINEMA}</span>
          <div style={{ flex: 1, minWidth: 220, position:'relative' }}>
            <span style={{ position:'absolute', left: 14, top: '50%', transform:'translateY(-50%)', color:'var(--text-mute)' }}>
              <Icon.search size={16}/>
            </span>
            <input className="input" placeholder="Пошук фільму" style={{ paddingLeft: 40, height: 38 }}/>
          </div>
        </div>
      </PageHeader>

      <div className="container">
        <DateTabs value={date} onChange={setDate}/>

        <div className="hrow" style={{ marginTop: 22 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} className={'chip' + (f === filter ? ' active' : '')} style={{ flexShrink: 0 }}>{f}</button>
          ))}
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 22, flexWrap:'wrap', gap: 12 }}>
          <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
            <span style={{ fontSize: 13, color:'var(--text-mute)', alignSelf:'center', marginRight: 4 }}>Час доби</span>
            {timeOfDay.map(t => (
              <button key={t} onClick={() => setTime(t)} className={'chip' + (t === time ? ' active' : '')} style={{ height: 30, fontSize: 12 }}>{t}</button>
            ))}
          </div>
          <div style={{ fontSize: 13, color:'var(--text-dim)' }}>
            Знайдено: <strong style={{ color:'var(--text)' }}>{visible.length}</strong> фільмів • <strong style={{ color:'var(--text)' }}>{visible.reduce((acc, m) => acc + (SHOWTIMES[m.id]?.length||0), 0)}</strong> сеансів
          </div>
        </div>

        <div style={{ marginTop: 28, display:'flex', flexDirection:'column', gap: 16 }}>
          {visible.map(m => {
            const times = SHOWTIMES[m.id] || [];
            return (
              <div key={m.id} className="card" style={{
                padding: 20,
                display:'grid', gridTemplateColumns:'120px 1fr', gap: 22,
              }}>
                <div style={{ cursor:'pointer' }} onClick={() => navigate('movie', { id: m.id })}>
                  <Poster movie={m} showTitle={false}/>
                </div>
                <div>
                  <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap: 18, flexWrap:'wrap' }}>
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap: 8, flexWrap:'wrap' }}>
                        <h2 style={{ fontSize: 24, cursor:'pointer' }} onClick={() => navigate('movie', { id: m.id })}>{m.title}</h2>
                        <span className="badge age">{m.age}</span>
                      </div>
                      <div style={{ marginTop: 8 }}>
                        <MovieMeta movie={m}/>
                      </div>
                      <div style={{ marginTop: 8, fontSize: 12.5, color:'var(--text-mute)' }}>
                        {m.lang}
                      </div>
                      <p style={{ marginTop: 12, fontSize: 13.5, color:'var(--text-dim)', maxWidth: 580 }}>{m.short}</p>
                    </div>
                    <div style={{ display:'flex', gap: 8 }}>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate('seats', { id: m.id, time: (SHOWTIMES[m.id]||[])[0]?.time })}>Купити квиток</button>
                      <button className="btn btn-ghost btn-sm" onClick={() => navigate('movie', { id: m.id })}>Детальніше</button>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed var(--border)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 10, flexWrap:'wrap' }}>
                      <span style={{ fontSize: 12, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Сеанси сьогодні</span>
                      <span style={{ fontSize: 12, color:'var(--text-mute)' }}>•</span>
                      <span style={{ fontSize: 12, color:'var(--text-dim)' }}>{CINEMA}</span>
                    </div>
                    <div style={{ display:'flex', gap: 10, flexWrap:'wrap' }}>
                      {times.map((t, i) => (
                        <button key={i} className={'timepill' + (t.premium ? ' premium' : '')}
                                onClick={() => navigate('seats', { id: m.id, time: t.time })}>
                          {t.time}
                          <span className="meta">{t.format} · {t.price}₴</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .card[style*="120px 1fr"] { grid-template-columns: 90px 1fr !important; gap: 14px !important; padding: 14px !important; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { TodayPage, PageHeader, DateTabs });
