function SeatPage({ navigate, movieId, time }) {
  const movie = MOVIES.find(m => m.id === movieId) || MOVIES[3];
  const showtime = (SHOWTIMES[movie.id] || []).find(t => t.time === time) || (SHOWTIMES[movie.id] || [])[0] || { time: '19:10', hall: 'IMAX', format: 'IMAX', price: 280 };

  // Generate a hall with aisles, premium back rows and occupied seats.
  const rows = ['A','B','C','D','E','F','G','H','J','K','L'];
  const cols = 16;
  const occupiedSet = React.useMemo(() => {
    const s = new Set();
    // pseudo random but stable: fill ~30%
    rows.forEach((r, ri) => {
      for (let c = 1; c <= cols; c++) {
        const seed = (ri * 31 + c * 7) % 100;
        if (seed < 28) s.add(r + '-' + c);
      }
    });
    return s;
  }, []);
  const premiumRows = new Set(['J','K','L']);

  const [selected, setSelected] = React.useState(new Set(['F-8','F-9']));

  const seatPrice = (row, col) => {
    if (premiumRows.has(row)) return 380;
    if (['A','B'].includes(row)) return 160;
    return 220;
  };

  const toggle = (id, row, col) => {
    if (occupiedSet.has(id)) return;
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const selectedList = [...selected].sort();
  const total = selectedList.reduce((sum, id) => {
    const [r, c] = id.split('-');
    return sum + seatPrice(r, parseInt(c));
  }, 0);

  const seatColor = (row, col) => {
    const id = row + '-' + col;
    if (occupiedSet.has(id)) return { bg:'rgba(8,9,13,0.92)', border:'rgba(255,255,255,0.10)', color:'rgba(255,255,255,0.18)', cursor:'not-allowed' };
    if (selected.has(id))    return { bg:'linear-gradient(135deg, #FF3340, #E5142A)', border:'transparent', color:'#fff', cursor:'pointer', boxShadow:'0 6px 18px rgba(229,20,42,0.45)' };
    if (premiumRows.has(row)) return { bg:'rgba(229,20,42,0.10)', border:'rgba(229,20,42,0.4)', color:'#FF8090', cursor:'pointer' };
    return { bg:'rgba(255,255,255,0.06)', border:'var(--border-strong)', color:'var(--text-dim)', cursor:'pointer' };
  };

  const aisleAfter = new Set([4, 12]); // gap after cols

  return (
    <section style={{ paddingTop: 32, paddingBottom: 40 }}>
      <div className="container">
        <button onClick={() => navigate('movie', { id: movie.id })} className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
          <Icon.left size={12}/> Назад
        </button>

        {/* Header info */}
        <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap: 18, marginBottom: 28 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 16, minWidth: 0 }}>
            <div style={{ width: 64, height: 90, borderRadius: 10, ...posterStyle(movie.poster.h, movie.poster.h2), flexShrink: 0 }}/>
            <div style={{ minWidth: 0 }}>
              <div className="eyebrow">Крок 2 з 3 • Вибір місць</div>
              <h1 style={{ fontSize: 26, marginTop: 8 }}>{movie.title}</h1>
              <div style={{ marginTop: 6, fontSize: 13, color:'var(--text-dim)', display:'flex', gap: 14, flexWrap:'wrap' }}>
                <span>{DATE_TODAY}</span>
                <span>•</span>
                <span style={{ color:'var(--text)' }}>{showtime.time}</span>
                <span>•</span>
                <span>{showtime.hall} · {showtime.format}</span>
                <span>•</span>
                <span>{CINEMA}</span>
              </div>
            </div>
          </div>
          {/* Step indicator */}
          <div style={{ display:'flex', alignItems:'center', gap: 8, fontSize: 12 }}>
            {['Сеанс', 'Місця', 'Оплата'].map((s, i) => (
              <React.Fragment key={s}>
                <div style={{
                  display:'inline-flex', alignItems:'center', gap: 8,
                  padding:'8px 14px', borderRadius: 999,
                  background: i === 1 ? 'rgba(229,20,42,0.12)' : i < 1 ? 'rgba(93,211,158,0.1)' : 'rgba(255,255,255,0.04)',
                  border:'1px solid ' + (i === 1 ? 'rgba(229,20,42,0.4)' : i < 1 ? 'rgba(93,211,158,0.3)' : 'var(--border)'),
                  color: i === 1 ? '#FF8090' : i < 1 ? 'var(--success)' : 'var(--text-mute)',
                  fontWeight: 600,
                }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'currentColor', color: '#08080C', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight: 700 }}>{i+1}</span>
                  {s}
                </div>
                {i < 2 && <Icon.right size={12}/>}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ display:'grid', gridTemplateColumns: '1fr 360px', gap: 28 }} className="seat-grid">
          {/* Seat map */}
          <div className="card" style={{ padding: 28, paddingTop: 32 }}>
            {/* Screen */}
            <div style={{ textAlign:'center', marginBottom: 36 }}>
              <div style={{
                margin:'0 auto', width:'80%', height: 14,
                background:'linear-gradient(180deg, rgba(229,20,42,0.55), rgba(229,20,42,0))',
                borderRadius:'50% / 100% 100% 0 0 / 100%',
                clipPath:'polygon(8% 0, 92% 0, 100% 100%, 0% 100%)',
                filter:'blur(2px)',
              }}/>
              <div style={{
                margin:'0 auto', width:'78%', height: 4, marginTop: -8,
                background:'linear-gradient(90deg, transparent, #FF3340, transparent)',
                borderRadius: 999,
              }}/>
              <div style={{ marginTop: 14, fontSize: 11, letterSpacing:'0.4em', color:'var(--text-mute)', fontWeight: 600 }}>ЕКРАН</div>
            </div>

            {/* Seat grid */}
            <div style={{ display:'flex', flexDirection:'column', gap: 6, alignItems:'center', overflowX:'auto' }}>
              {rows.map((row, ri) => (
                <div key={row} style={{ display:'flex', alignItems:'center', gap: 6 }}>
                  <div style={{ width: 22, fontSize: 11, color:'var(--text-mute)', textAlign:'center', fontWeight: 600 }}>{row}</div>
                  {Array.from({ length: cols }, (_, ci) => {
                    const col = ci + 1;
                    const id = row + '-' + col;
                    const st = seatColor(row, col);
                    const isOccupied = occupiedSet.has(id);
                    return (
                      <React.Fragment key={col}>
                        <button className={isOccupied ? 'seat-occupied' : ''} onClick={() => toggle(id, row, col)} disabled={isOccupied} style={{
                          width: 26, height: 26, borderRadius: 6,
                          background: st.bg, border:'1px solid ' + st.border, color: st.color,
                          cursor: st.cursor, padding: 0,
                          fontSize: 10, fontWeight: 700,
                          display:'flex', alignItems:'center', justifyContent:'center',
                          boxShadow: st.boxShadow,
                          transition: 'transform .12s, background .12s, border-color .12s',
                          position: 'relative', overflow: 'hidden',
                        }}
                        onMouseEnter={e => { if (!isOccupied && !selected.has(id)) e.currentTarget.style.transform = 'scale(1.1)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
                        title={`Ряд ${row}, місце ${col}${isOccupied ? ' • зайняте' : premiumRows.has(row) ? ' • Premium' : ''}`}
                        >
                          {selected.has(id) ? '✓' : ''}
                        </button>
                        {aisleAfter.has(col) && <div style={{ width: 14 }}/>}
                      </React.Fragment>
                    );
                  })}
                  <div style={{ width: 22, fontSize: 11, color:'var(--text-mute)', textAlign:'center', fontWeight: 600 }}>{row}</div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div style={{ marginTop: 32, display:'flex', flexWrap:'wrap', gap: 16, justifyContent:'center', fontSize: 12, color:'var(--text-dim)' }}>
              {[
                ['Доступне',  'rgba(255,255,255,0.06)', 'var(--border-strong)'],
                ['Обране',    'linear-gradient(135deg, #FF3340, #E5142A)', 'transparent'],
                ['Зайняте',   'rgba(8,9,13,0.92)', 'rgba(255,255,255,0.10)', true],
                ['Premium',   'rgba(229,20,42,0.10)', 'rgba(229,20,42,0.4)'],
              ].map(([label, bg, bd, crossed], i) => (
                <div key={i} style={{ display:'flex', alignItems:'center', gap: 8 }}>
                  <span className={crossed ? 'seat-occupied' : ''} style={{ width: 18, height: 18, borderRadius: 5, background: bg, border:'1px solid ' + bd, position:'relative', overflow:'hidden' }}/>
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar summary */}
          <aside style={{ display:'flex', flexDirection:'column', gap: 14, position:'sticky', top: 88, alignSelf:'flex-start' }} className="seat-aside">
            <div className="card" style={{ padding: 22 }}>
              <div className="eyebrow" style={{ marginBottom: 14 }}>Обрані місця</div>

              {selectedList.length === 0 ? (
                <div style={{ padding:'18px 0', textAlign:'center', color:'var(--text-mute)', fontSize: 13 }}>
                  Натисніть на місце у залі, щоб обрати.
                </div>
              ) : (
                <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
                  {selectedList.map(id => {
                    const [r, c] = id.split('-');
                    const isP = premiumRows.has(r);
                    return (
                      <div key={id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding: '10px 12px', background:'rgba(255,255,255,0.03)', borderRadius: 12, border:'1px solid var(--border)' }}>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 600 }}>Ряд {r} · Місце {c}</div>
                          <div style={{ fontSize: 11, color: isP ? 'var(--premium)' : 'var(--text-mute)', marginTop: 2 }}>
                            {isP ? 'Premium-крісло' : 'Стандартне місце'}
                          </div>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
                          <span style={{ fontWeight: 700 }}>{seatPrice(r, parseInt(c))} ₴</span>
                          <button onClick={() => toggle(id)} style={{ background:'none', border:'none', color:'var(--text-mute)', cursor:'pointer' }}>
                            <Icon.close size={14}/>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <hr className="hr" style={{ margin:'18px 0' }}/>

              <div style={{ display:'flex', flexDirection:'column', gap: 8, fontSize: 13, color:'var(--text-dim)' }}>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span>Квитки ({selectedList.length})</span><span style={{ color:'var(--text)' }}>{total} ₴</span>
                </div>
                <div style={{ display:'flex', justifyContent:'space-between' }}>
                  <span>Сервісний збір</span><span style={{ color:'var(--text)' }}>0 ₴</span>
                </div>
              </div>

              <hr className="hr" style={{ margin:'18px 0' }}/>

              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Сума до сплати</span>
                <span style={{ fontSize: 28, fontWeight: 700, letterSpacing:'-0.02em' }}>{total} ₴</span>
              </div>

              <button className="btn btn-primary btn-lg" style={{ width:'100%' }} disabled={selectedList.length === 0}
                      onClick={() => navigate('checkout', { id: movie.id, time: showtime.time })}>
                Продовжити до оплати <Icon.right size={14}/>
              </button>

              <div style={{ marginTop: 14, fontSize: 11, color:'var(--text-mute)', textAlign:'center' }}>
                Безпечна оплата • Apple Pay · Google Pay · Visa · Mastercard
              </div>
            </div>

            {/* Suggest food */}
            <div className="card" style={{ padding: 16, display:'flex', gap: 12, alignItems:'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 12, flexShrink: 0,
                background: 'radial-gradient(circle at 30% 30%, #FFD089, #E68A2E 70%, #7a3e0c)',
              }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Додати попкорн і напій?</div>
                <div style={{ fontSize: 11.5, color:'var(--text-mute)', marginTop: 2 }}>Комбо «Для двох» — 320 ₴</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('food')}>
                <Icon.plus size={12}/>
              </button>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .seat-occupied::after {
          content: '';
          position: absolute;
          left: 4px;
          right: 4px;
          top: 50%;
          height: 2px;
          border-radius: 999px;
          background: rgba(255,255,255,0.32);
          transform: rotate(-35deg);
          transform-origin: center;
          pointer-events: none;
        }
        @media (max-width: 1080px) {
          .seat-grid { grid-template-columns: 1fr !important; }
          .seat-aside { position: static !important; }
        }
      `}</style>
    </section>
  );
}

Object.assign(window, { SeatPage });
