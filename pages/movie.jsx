function MoviePage({ navigate, movieId }) {
  const movie = MOVIES.find(m => m.id === movieId) || MOVIES[3];
  const [date, setDate] = React.useState('today');
  const times = SHOWTIMES[movie.id] || [];

  return (
    <>
      {/* Cinematic banner */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <div style={{
          position:'absolute', inset: 0,
          ...posterStyle(movie.poster.h, movie.poster.h2),
          filter: 'blur(50px) saturate(120%)',
          opacity: 0.85,
        }}/>
        <div style={{
          position:'absolute', inset: 0,
          background:'linear-gradient(180deg, rgba(8,8,12,0.55) 0%, rgba(8,8,12,0.85) 60%, var(--bg-0))',
        }}/>
        <div className="container" style={{ position:'relative', zIndex: 2, paddingTop: 56, paddingBottom: 56 }}>
          <button onClick={() => navigate('schedule')} className="btn btn-ghost btn-sm" style={{ marginBottom: 28 }}>
            <Icon.left size={12}/> До розкладу
          </button>

          <div style={{ display:'grid', gridTemplateColumns:'320px 1fr', gap: 48, alignItems:'flex-start' }} className="movie-grid">
            <div style={{ position:'relative' }}>
              <Poster movie={movie}/>
              <div style={{ position:'absolute', inset: 0, borderRadius: 16, boxShadow:'0 30px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(255,255,255,0.08)', pointerEvents:'none' }}/>
            </div>

            <div>
              <div className="eyebrow">{movie.original} • Прем’єра {movie.release}</div>
              <h1 style={{ marginTop: 14 }}>{movie.title}</h1>

              <div style={{ marginTop: 18, display:'flex', alignItems:'center', gap: 14, flexWrap:'wrap', fontSize: 14, color:'var(--text-dim)' }}>
                <span style={{ display:'inline-flex', alignItems:'center', gap: 6, fontSize: 16 }}>
                  <Icon.star size={16}/> <strong style={{ color:'var(--text)' }}>{movie.rating}</strong>
                  <span style={{ color:'var(--text-mute)', fontSize: 12 }}>/ 10</span>
                </span>
                <span>•</span>
                <span>{movie.genres.join(' • ')}</span>
                <span>•</span>
                <span style={{ display:'inline-flex', alignItems:'center', gap: 4 }}><Icon.clock size={14}/> {movie.duration}</span>
                <span className="badge age">{movie.age}</span>
                <span style={{ color:'var(--text-mute)' }}>{movie.lang}</span>
              </div>

              <div style={{ marginTop: 18, display:'flex', gap: 8, flexWrap:'wrap' }}>
                {movie.formats.map(f => (
                  <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : '')}>{f}</span>
                ))}
              </div>

              <p style={{ marginTop: 22, fontSize: 17, lineHeight: 1.55, color:'var(--text)', maxWidth: 720 }}>
                {movie.short}
              </p>

              <div style={{ marginTop: 14, fontSize: 13.5, color:'var(--text-dim)' }}>
                Режисер: <strong style={{ color:'var(--text)' }}>{movie.director}</strong>
                {movie.cast.length > 0 && <> • У ролях: {movie.cast.slice(0,3).join(', ')}</>}
              </div>

              <div style={{ marginTop: 30, display:'flex', gap: 12, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => navigate('seats', { id: movie.id, time: times[0]?.time || '19:10' })}>
                  <Icon.ticket size={16}/> Купити квитки
                </button>
                <button className="btn btn-ghost btn-lg">
                  <Icon.play size={12}/> Дивитися трейлер
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: 40 }}>
        {/* Showtimes — main goal */}
        <div className="card" style={{ padding: 28 }}>
          <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 20, flexWrap:'wrap', marginBottom: 20 }}>
            <div>
              <div className="eyebrow">Сеанси</div>
              <h2 style={{ fontSize: 28, marginTop: 8 }}>Обери час та формат</h2>
            </div>
            <div style={{ display:'flex', gap: 8, alignItems:'center', flexWrap:'wrap' }}>
              <span className="chip" style={{ height: 38, cursor:'default' }}>{CINEMA}</span>
            </div>
          </div>

          <DateTabs value={date} onChange={setDate}/>

          <div style={{ marginTop: 24, display:'flex', flexDirection:'column', gap: 14 }}>
            {['Стандартні зали', 'IMAX', 'Premium-зал'].map((cat, ci) => {
              const list = times.filter(t => {
                if (cat === 'IMAX') return t.format === 'IMAX';
                if (cat === 'Premium-зал') return t.premium;
                return !t.premium && t.format !== 'IMAX';
              });
              if (list.length === 0) return null;
              return (
                <div key={ci} style={{
                  padding: 18, borderRadius: 16,
                  background:'rgba(255,255,255,0.025)', border:'1px solid var(--border)',
                }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 10, marginBottom: 14, flexWrap:'wrap' }}>
                    <h3 style={{ fontSize: 16 }}>{cat}</h3>
                    <span style={{ fontSize: 12, color:'var(--text-mute)' }}>•</span>
                    <span style={{ fontSize: 12.5, color:'var(--text-mute)' }}>
                      {cat === 'IMAX' ? 'Екран 23 м · 12-канальний звук'
                        : cat === 'Premium-зал' ? 'Реклайнери, плед, доставка їжі до місця'
                        : 'Класична зала, зручні крісла'}
                    </span>
                  </div>
                  <div style={{ display:'flex', gap: 10, flexWrap:'wrap' }}>
                    {list.map((t, i) => (
                      <button key={i} className={'timepill' + (t.premium ? ' premium' : '')}
                              onClick={() => navigate('seats', { id: movie.id, time: t.time })}>
                        {t.time}
                        <span className="meta">{t.hall} · {t.price}₴</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cast */}
        {movie.cast.length > 0 && (
          <section style={{ marginTop: 56 }}>
            <SectionHeader eyebrow="У кадрі" title="Актори"/>
            <div className="grid-5">
              {[movie.director, ...movie.cast].slice(0, 5).map((name, i) => (
                <div key={i} style={{ display:'flex', flexDirection:'column', gap: 10 }}>
                  <div style={{
                    aspectRatio: '1/1', borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${(i*60+30)},40%,30%), hsl(${(i*60+30)},30%,15%))`,
                  }}/>
                  <div style={{ textAlign:'center' }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>{name}</div>
                    <div style={{ fontSize: 12, color:'var(--text-mute)', marginTop: 2 }}>{i === 0 ? 'Режисер' : 'Актор'}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gallery */}
        <section style={{ marginTop: 56 }}>
          <SectionHeader eyebrow="Кадри з фільму" title="Галерея"/>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap: 14, gridAutoRows:'min(28vw, 260px)' }} className="gallery-grid">
            {[0,1,2,3,4].map(i => (
              <div key={i} style={{
                gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1',
                borderRadius: 16,
                ...posterStyle((movie.poster.h + i*40) % 360, (movie.poster.h2 + i*20) % 360),
              }}/>
            ))}
          </div>
        </section>

        {/* Related */}
        <section style={{ marginTop: 56 }}>
          <SectionHeader eyebrow="Подивись також" title="Схожі фільми"/>
          <div className="grid-5">
            {MOVIES.filter(m => m.id !== movie.id).slice(0, 5).map(m => (
              <MovieCard key={m.id} movie={m} navigate={navigate}/>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom sticky CTA */}
      <div className="sticky-cta" style={{
        display: 'none',
        position:'sticky', bottom: 0, zIndex: 30,
        marginTop: 40,
        background:'rgba(10,10,16,0.92)', backdropFilter:'blur(20px)',
        borderTop:'1px solid var(--border)',
        padding:'12px 16px',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Найближчий</div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{times[0]?.time} • {times[0]?.format}</div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate('seats', { id: movie.id, time: times[0]?.time })}>
            Купити квиток <Icon.right size={12}/>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .movie-grid { grid-template-columns: 1fr !important; }
          .movie-grid > div:first-child { max-width: 240px; }
          .gallery-grid { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 38vw !important; }
        }
        @media (max-width: 720px) {
          .sticky-cta { display: block !important; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { MoviePage });
