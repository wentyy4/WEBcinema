function MovieCard({ movie, navigate }) {
  const times = (SHOWTIMES[movie.id] || []).slice(0, 4);
  return (
    <div className="movie-card" onClick={() => navigate('movie', { id: movie.id })} style={{ cursor: 'pointer' }}>
      <Poster movie={movie} />
      <div style={{ paddingTop: 14 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, letterSpacing: '-0.01em' }}>{movie.title}</div>
        <MovieMeta movie={movie} mute />
        {times.length > 0 &&
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 12 }}>
            {times.map((t, i) =>
          <span key={i} className="timepill" style={{ minWidth: 'auto', padding: '5px 10px', fontSize: 13, borderRadius: 8 }}>
                {t.time}
              </span>
          )}
          </div>
        }
      </div>
    </div>);

}

function HeroSection({ navigate }) {
  const featured = MOVIES.find((m) => m.id === 'm4'); // Нейроніч
  return (
    <section style={{ position: 'relative', overflow: 'hidden', paddingBottom: 28 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(70% 80% at 70% 30%, hsla(260,80%,45%,0.45), transparent 60%),
          radial-gradient(60% 70% at 20% 80%, hsla(20,90%,50%,0.35), transparent 60%),
          linear-gradient(180deg, #0a0a14 0%, #08080C 80%)
        `,
        zIndex: 0
      }} />
      {/* film grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.5, mixBlendMode: 'overlay',
        backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 3px)',
        zIndex: 1
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, paddingTop: 56, paddingBottom: 36 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center' }} className="hero-grid">
          <div className="fade-up">
            <div className="eyebrow">Прем’єра тижня • {featured.original}</div>
            <h1 style={{ marginTop: 14, textWrap: 'balance' }}>
              Кіно, <br />
              <span style={{ background: 'linear-gradient(135deg, #FF5560 10%, #FF3340 50%, #C0142A)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                яке відчувається.
              </span>
            </h1>
            <p style={{ marginTop: 22, color: 'var(--text-dim)', fontSize: 17, lineHeight: 1.5, maxWidth: 560 }}>
              Обирай фільм, знаходь зручний сеанс і купуй квитки онлайн за кілька секунд — у IMAX, 4DX, Dolby Atmos та Premium-залах Lumina у Києві.
            </p>

            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary btn-lg" onClick={() => navigate('schedule')}>
                <Icon.ticket size={16} /> Купити квитки
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('schedule')}>
                Переглянути розклад
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('movie', { id: featured.id })}>
                <Icon.play size={12} /> Дивитися трейлер
              </button>
            </div>

            <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 22, color: 'var(--text-mute)', fontSize: 13, flexWrap: 'wrap' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-flex', width: 6, height: 6, borderRadius: 999, background: 'var(--success)', boxShadow: '0 0 10px var(--success)' }} />
                Бронювання за <strong style={{ color: 'var(--text)' }}>15 секунд</strong>
              </div>
              <div>{CINEMAS[0].address}</div>
              <div>34 сеанси сьогодні</div>
              <div>Цифрові квитки у профілі</div>
            </div>
          </div>

          {/* Featured poster card */}
          <div className="fade-up" style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <Poster movie={featured} />
              <div style={{
                position: 'absolute', inset: 0, borderRadius: 16,
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08), 0 40px 100px rgba(229,20,42,0.25)',
                pointerEvents: 'none'
              }} />
            </div>
            {/* Floating play button */}
            <button onClick={() => navigate('movie', { id: featured.id })} style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              width: 74, height: 74, borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF3340, #E5142A)',
              border: 'none', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 18px 40px rgba(229,20,42,0.45), inset 0 1px 0 rgba(255,255,255,0.3)'
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 3 }}><path d="M8 5v14l11-7z" /></svg>
            </button>

            {/* Floating chip with rating */}
            <div className="glass" style={{
              position: 'absolute', top: 16, left: -16, borderRadius: 14,
              display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, padding: "16px 14px 13px", lineHeight: "1.4", width: "214px", letterSpacing: "-1.3px", height: "78px"
            }}>
              <span style={{ color: 'var(--accent-hi)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.star size={14} /> <strong style={{ color: '#fff' }}>{featured.rating}</strong>
              </span>
              <span style={{ color: 'var(--text-mute)' }}>· {featured.duration} · {featured.age}</span>
            </div>

            {/* Floating bottom chip */}
            <div className="glass" style={{
              position: 'absolute', bottom: -18, right: -16, padding: 14, borderRadius: 16,
              display: 'flex', flexDirection: 'column', gap: 6, minWidth: 200
            }}>
              <div style={{ fontSize: 11, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>Найближчий сеанс</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>14:50 • IMAX</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)' }}>Lumina 11 SkyMall</div>
              <button className="btn btn-primary btn-sm" style={{ marginTop: 6 }} onClick={() => navigate('seats', { id: featured.id, time: '14:50' })}>
                Обрати місця <Icon.right size={12} />
              </button>
            </div>
          </div>
        </div>

        {/* Booking widget */}
        <div style={{ marginTop: 64 }} className="fade-up">
          <BookingWidget navigate={navigate} />
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>);

}

function NowShowingCarousel({ navigate }) {
  const scrollRef = React.useRef(null);
  const scrollLeft = () => scrollRef.current?.scrollBy({ left: -420, behavior: 'smooth' });
  const scrollRight = () => scrollRef.current?.scrollBy({ left: 420, behavior: 'smooth' });

  return (
    <section className="container" style={{ marginTop: 56 }}>
      <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap: 18, marginBottom: 24 }}>
        <div>
          <div className="eyebrow" style={{ marginBottom: 8 }}>У прокаті</div>
          <h2>Зараз у кіно</h2>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
          <button className="carousel-arrow" onClick={scrollLeft} aria-label="Прокрутити ліворуч">
            <Icon.left size={16} />
          </button>
          <button className="carousel-arrow" onClick={scrollRight} aria-label="Прокрутити праворуч">
            <Icon.right size={16} />
          </button>
          <a className="link all-movies-link" onClick={() => navigate('movies')} style={{ cursor: 'pointer' }}>Усі фільми <Icon.right size={12} /></a>
        </div>
      </div>

      <div className="movie-carousel-shell">
        <div className="movie-carousel" ref={scrollRef}>
          {MOVIES.map((movie) => {
            const times = (SHOWTIMES[movie.id] || []).slice(0, 4);
            const firstTime = times[0]?.time || '19:10';
            return (
              <article
                key={movie.id}
                className="movie-card carousel-movie-card"
                onClick={() => navigate('movie', { id: movie.id })}
              >
                <Poster movie={movie} noDim />
                <div style={{ padding: '14px 2px 0', display:'flex', flexDirection:'column', gap: 10 }}>
                  <div>
                    <h3 style={{ fontSize: 17, lineHeight: 1.16 }}>{movie.title}</h3>
                    <div style={{ marginTop: 7, display:'flex', flexWrap:'wrap', gap: 7, color:'var(--text-mute)', fontSize: 12.5 }}>
                      <span>{movie.genres.join(', ')}</span>
                      <span>•</span>
                      <span>{movie.duration}</span>
                      <span className="badge age">{movie.age}</span>
                    </div>
                  </div>

                  <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
                    {movie.formats.map((f) =>
                      <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : f === '4DX' ? 'dx4' : '')}>{f}</span>
                    )}
                  </div>

                  {times.length > 0 && (
                    <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
                      {times.map((t) =>
                        <button
                          key={t.time}
                          className={'timepill ' + (t.premium ? 'premium' : '')}
                          style={{ minWidth: 'auto', padding: '6px 9px', fontSize: 12.5, borderRadius: 9 }}
                          onClick={(e) => { e.stopPropagation(); navigate('seats', { id: movie.id, time: t.time }); }}
                        >
                          {t.time}
                          <span className="meta">{t.format}</span>
                        </button>
                      )}
                    </div>
                  )}

                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 8, marginTop: 'auto' }}>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={(e) => { e.stopPropagation(); navigate('seats', { id: movie.id, time: firstTime }); }}
                    >
                      Купити квиток
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={(e) => { e.stopPropagation(); navigate('movie', { id: movie.id }); }}
                    >
                      Детальніше
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>);

}

function TodaysBest({ navigate }) {
  const featured = [
  { movie: MOVIES[3], time: '14:50', hall: 'IMAX', price: 280 },
  { movie: MOVIES[0], time: '16:00', hall: 'Premium', price: 380, premium: true },
  { movie: MOVIES[1], time: '20:10', hall: 'Dolby', price: 290 },
  { movie: MOVIES[2], time: '15:30', hall: 'Premium', price: 360, premium: true }];

  return (
    <section className="container" style={{ marginTop: 72 }}>
      <SectionHeader
        eyebrow={DATE_TODAY + ' • ' + CITY}
        title="Найближчі сеанси сьогодні"
        action={<a className="link" onClick={() => navigate('schedule')} style={{ cursor: 'pointer' }}>Повний розклад <Icon.right size={12} /></a>} />
      
      <div className="grid-4">
        {featured.map((s, i) =>
        <div key={i} className="card" style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className={'badge ' + (s.hall === 'IMAX' ? 'imax' : s.hall === 'Premium' ? 'premium' : s.hall === 'Dolby' ? 'atmos' : '')}>{s.hall}</span>
              <span style={{ fontSize: 12, color: 'var(--text-mute)' }}>{s.movie.age}</span>
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.02em' }}>{s.time}</div>
              <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 2 }}>{CINEMA}</div>
            </div>
            <hr className="hr" />
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{ width: 50, height: 70, borderRadius: 8, ...posterStyle(s.movie.poster.h, s.movie.poster.h2), flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.movie.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-mute)', marginTop: 4 }}>{s.movie.genres[0]} • {s.movie.duration}</div>
                <div style={{ fontSize: 13, color: 'var(--text-dim)', marginTop: 6 }}>від <strong style={{ color: 'var(--accent-hi)' }}>{s.price} ₴</strong></div>
              </div>
            </div>
            <button className="btn btn-primary btn-sm" onClick={() => navigate('seats', { id: s.movie.id, time: s.time })}>
              Обрати місця
            </button>
          </div>
        )}
      </div>
    </section>);

}

function ComingSoonSection({ navigate }) {
  return (
    <section className="container" style={{ marginTop: 72 }}>
      <SectionHeader
        eyebrow="Скоро"
        title="Скоро на екранах"
        action={<a className="link" onClick={() => navigate('soon')} style={{ cursor: 'pointer' }}>Усі прем’єри <Icon.right size={12} /></a>} />
      
      <div className="grid-5">
        {COMING_SOON.map((m) =>
        <div key={m.id} className="movie-card" style={{ cursor: 'pointer' }}>
            <Poster movie={{ poster: m.poster, original: m.title, title: m.title, formats: [] }} />
            <div style={{ marginTop: 12 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{m.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 4 }}>{m.genres[0]} • <span style={{ color: 'var(--accent)' }}>{m.date}</span></div>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function PremiumBanner({ navigate }) {
  return (
    <section className="container" style={{ marginTop: 80 }}>
      <div className="fade-up" style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: 28,
        padding: '60px 56px',
        background: `
          radial-gradient(80% 90% at 90% 10%, rgba(229,20,42,0.32), transparent 60%),
          radial-gradient(60% 80% at 10% 100%, rgba(120,10,30,0.4), transparent 60%),
          linear-gradient(135deg, #1a0a10, #0a060a)
        `,
        border: '1px solid rgba(229,20,42,0.18)',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 60, alignItems: 'center'
      }}>
        <div>
          <div className="eyebrow" style={{ color: '#FF8090' }}>Premium</div>
          <h2 style={{ marginTop: 12 }}>Не просто кіно — <br /> вечір особливого комфорту.</h2>
          <p style={{ marginTop: 18, color: 'var(--text-dim)', fontSize: 16, maxWidth: 520 }}>
            Крісла з електроприводом, плед, столик і доставка їжі до місця. У Premium-залах Lumina перегляд триває довше за саму стрічку.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('premium')}>
              Забронювати Premium-місця
            </button>
            <button className="btn btn-ghost btn-lg" onClick={() => navigate('premium')}>
              Детальніше
            </button>
          </div>
        </div>
        <div className="premium-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
          ['Крісла з підвищеним комфортом', 'Електропривід • плед • столик'],
          ['1,2 м між рядами', 'Більше особистого простору'],
          ['Доставка їжі до місця', 'Замовлення з підлокітника'],
          ['Окрема зона очікування', 'Кава та закуски включені']].
          map(([t, s], i) =>
          <div key={i} style={{
            padding: 16, borderRadius: 14,
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(229,20,42,0.18)'
          }}>
              <Icon.diamond size={20} />
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10 }}>{t}</div>
              <div style={{ fontSize: 12, color: 'var(--text-mute)', marginTop: 4 }}>{s}</div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) { .fade-up { grid-template-columns: 1fr !important; padding: 40px 28px !important; } .premium-grid { grid-template-columns: 1fr 1fr !important; } }
      `}</style>
    </section>);

}

function FoodTeaser({ navigate }) {
  const items = FOOD_ITEMS.slice(0, 4);
  return (
    <section className="container" style={{ marginTop: 80 }}>
      <SectionHeader
        eyebrow="Їжа та напої"
        title="Замовляй просто з місця"
        action={<a className="link" onClick={() => navigate('food')} style={{ cursor: 'pointer' }}>Усе меню <Icon.right size={12} /></a>} />
      
      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 2fr', gap: 22 }} className="food-tease-grid">
        <div className="card" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 18, justifyContent: 'center',
          background: `radial-gradient(120% 90% at 0% 0%, rgba(229,20,42,0.18), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))` }}>
          <Icon.popcorn size={28} />
          <h3 style={{ fontSize: 22, lineHeight: 1.15 }}>Скануй QR на підлокітнику — отримай замовлення в залі.</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 13.5, color: 'var(--text-dim)' }}>
            {['Скануй QR-код на підлокітнику', 'Обирай їжу та напої', 'Оплачуй онлайн', 'Отримуй замовлення в залі'].map((s, i) =>
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                width: 22, height: 22, borderRadius: 999, background: 'rgba(229,20,42,0.15)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--accent-hi)'
              }}>{i + 1}</span>
                {s}
              </div>
            )}
          </div>
          <button className="btn btn-primary" style={{ marginTop: 4, alignSelf: 'flex-start' }} onClick={() => navigate('food')}>
            Замовити їжу
          </button>
        </div>
        <div className="grid-4" style={{ gap: 16 }}>
          {items.map((f) =>
          <div key={f.id} className="card" style={{ padding: 14 }}>
              <div style={{
              aspectRatio: '1/1', borderRadius: 14,
              background: `radial-gradient(70% 70% at 30% 30%, hsla(${f.hue},80%,55%,0.55), transparent 60%), linear-gradient(135deg, hsl(${f.hue},40%,18%), hsl(${f.hue},30%,10%))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                <div style={{ width: '60%', height: '60%', borderRadius: '50%',
                background: `radial-gradient(circle at 30% 30%, hsl(${f.hue},80%,65%), hsl(${f.hue},60%,40%) 60%, hsl(${f.hue},50%,25%))`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.35), inset 0 -8px 20px rgba(0,0,0,0.3)'
              }} />
              </div>
              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, lineHeight: 1.25 }}>{f.name}</div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'var(--text-mute)' }}>{f.desc}</div>
              <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent-hi)' }}>{f.price} ₴</span>
                <button className="btn btn-ghost btn-sm" style={{ height: 32 }}>
                  <Icon.plus size={12} /> Додати
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @media (max-width: 980px) { .food-tease-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>);

}

function OffersStrip({ navigate }) {
  const offers = [
  { tag: 'Студентам', title: '−30% з понеділка по четвер', sub: 'За ISIC або довідкою з вишу', hue: 24 },
  { tag: 'Для родини', title: 'Сімейний попкорн + 2 квитки', sub: 'Економія до 220 ₴ на сеанс', hue: 350 },
  { tag: 'Застосунок', title: 'Перший квиток у застосунку — −50%', sub: 'Бонус після реєстрації', hue: 280 }];

  return (
    <section className="container" style={{ marginTop: 80 }}>
      <SectionHeader
        eyebrow="Акції"
        title="Акції та пропозиції"
        action={<a className="link" onClick={() => navigate('news')} style={{ cursor: 'pointer' }}>Усі акції <Icon.right size={12} /></a>} />
      
      <div className="grid-3">
        {offers.map((o, i) =>
        <div key={i} className="card" style={{
          padding: 24, position: 'relative', overflow: 'hidden',
          background: `radial-gradient(80% 100% at 100% 0%, hsla(${o.hue},80%,40%,0.25), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))`
        }}>
            <span className="badge" style={{ background: `hsla(${o.hue},70%,40%,0.2)`, color: `hsl(${o.hue},80%,75%)`, borderColor: `hsla(${o.hue},70%,40%,0.35)` }}>{o.tag}</span>
            <h3 style={{ fontSize: 22, marginTop: 14, textWrap: 'balance' }}>{o.title}</h3>
            <p style={{ marginTop: 8, fontSize: 13.5, color: 'var(--text-dim)' }}>{o.sub}</p>
            <button className="btn btn-ghost btn-sm" style={{ marginTop: 18 }} onClick={() => navigate('news')}>Детальніше <Icon.right size={12} /></button>
          </div>
        )}
      </div>
    </section>);

}

function AppDownload() {
  return (
    <section className="container" style={{ marginTop: 80 }}>
      <div className="fade-up" style={{
        borderRadius: 28, padding: '52px 56px', overflow: 'hidden', position: 'relative',
        background: 'linear-gradient(135deg, #14151D, #0d0e14)',
        border: '1px solid var(--border)',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', alignItems: 'center', gap: 60
      }}>
        <div>
          <div className="eyebrow">Застосунок</div>
          <h2 style={{ marginTop: 12 }}>Lumina Theatres у твоїй кишені.</h2>
          <p style={{ marginTop: 16, color: 'var(--text-dim)', fontSize: 16, maxWidth: 460 }}>
            Швидке бронювання улюблених місць, push про прем’єри та персональні знижки. Перший квиток у застосунку — −50%.
          </p>
          <div style={{ marginTop: 24, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn btn-ghost btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.43c-.03-3.02 2.47-4.47 2.58-4.54-1.41-2.06-3.6-2.34-4.38-2.37-1.86-.19-3.64 1.1-4.59 1.1-.96 0-2.41-1.08-3.97-1.05-2.04.03-3.92 1.19-4.97 3-2.12 3.67-.54 9.1 1.52 12.08 1.01 1.46 2.21 3.09 3.78 3.03 1.52-.06 2.1-.98 3.94-.98 1.83 0 2.36.98 3.96.95 1.64-.03 2.67-1.48 3.66-2.95 1.16-1.69 1.64-3.34 1.67-3.43-.04-.02-3.2-1.23-3.23-4.84zM14.3 4.42c.84-1.02 1.41-2.43 1.25-3.84-1.21.05-2.68.81-3.55 1.82-.78.9-1.46 2.35-1.28 3.73 1.36.1 2.74-.69 3.58-1.71z" /></svg>
              App Store
            </button>
            <button className="btn btn-ghost btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M3.6 1.95c-.36.38-.57.96-.57 1.72v16.66c0 .75.21 1.34.57 1.71l.06.05L12 13.74v-.21L3.66 1.9zM15.5 16.5l-2.78-2.78V12.27l2.78-2.78.06.04 3.29 1.87c.94.53.94 1.4 0 1.94l-3.29 1.87zM12 13.74L3.6 22.15c.31.33.82.37 1.4.05l9.83-5.59L12 13.74zM4.99 1.82c-.58-.33-1.09-.29-1.4.04L12 10.27l2.83-2.83L4.99 1.82z" /></svg>
              Google Play
            </button>
          </div>
          <div style={{ marginTop: 22, display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-mute)', fontSize: 12.5 }}>
            <div style={{ display: 'flex', marginRight: 6 }}>
              {[24, 200, 320].map((h, i) =>
              <div key={i} style={{
                width: 28, height: 28, borderRadius: '50%',
                background: `linear-gradient(135deg, hsl(${h},60%,55%), hsl(${h},50%,30%))`,
                marginLeft: i ? -8 : 0, border: '2px solid #0e0f14'
              }} />
              )}
            </div>
            <strong style={{ color: 'var(--text)' }}>4.9</strong>
            <span>· 28 400+ оцінок</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: 220, aspectRatio: '9/19', borderRadius: 36,
            background: 'linear-gradient(180deg, #1a1c25, #0e0f14)',
            border: '8px solid #15161D',
            boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', width: 70, height: 18, borderRadius: 999, background: '#08080C' }} />
            <div style={{ position: 'absolute', top: 46, left: 14, right: 14, bottom: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text-mute)', letterSpacing: '0.1em' }}>LUMINA</div>
              <div style={{ fontSize: 14, fontWeight: 700 }}>Розклад</div>
              <div style={{ ...posterStyle(260, 320), aspectRatio: '2/3', borderRadius: 10, flex: 1 }} />
              <div style={{ display: 'flex', gap: 4 }}>
                {['14:50', '19:10', '22:00'].map((t) =>
                <div key={t} style={{ flex: 1, height: 28, borderRadius: 8, background: 'rgba(229,20,42,0.12)', color: '#FF8090', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t}</div>
                )}
              </div>
              <div style={{ height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #FF3340, #E5142A)', color: '#fff', fontWeight: 700, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Купити квитки</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 860px) { .fade-up { grid-template-columns: 1fr !important; padding: 40px 28px !important; } }
      `}</style>
    </section>);

}

function WhyChooseUs() {
  const items = [
  ['Найбільший IMAX у місті', 'Екран 23 м у Lumina 11 SkyMall — справжнє занурення.', '23 м'],
  ['Dolby Atmos у 8 залах', 'Звук, який буквально оточує тебе.', '64.4'],
  ['Цифрові квитки', 'QR-квитки завжди доступні у профілі.', 'QR'],
  ['Доступне середовище', 'Місця та маршрути для людей з інвалідністю.', 'A11Y']];

  return (
    <section className="container" style={{ marginTop: 80 }}>
      <SectionHeader eyebrow="Чому ми" title="Чому обирають Lumina Theatres" />
      <div className="grid-4">
        {items.map(([t, s, big], i) =>
        <div key={i} className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 200 }}>
            <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--accent-hi)' }}>{big}</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>{t}</div>
            <p style={{ fontSize: 13, color: 'var(--text-mute)' }}>{s}</p>
          </div>
        )}
      </div>
    </section>);

}

function TechnologiesSection({ navigate }) {
  return (
    <section className="container" style={{ marginTop: 80 }}>
      <SectionHeader eyebrow="Технології" title="Кінотехнології Lumina"
      action={<a className="link" onClick={() => navigate('cinemas')} style={{ cursor: 'pointer' }}>Усі формати <Icon.right size={12} /></a>} />
      <div className="grid-3" style={{ gap: 18 }}>
        {TECH.map((t, i) =>
        <div key={t.id} className="card" style={{
          padding: 24, position: 'relative', overflow: 'hidden', minHeight: 200,
          background: `radial-gradient(80% 100% at 100% 0%, hsla(${t.hue},70%,40%,0.20), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))`
        }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <span className={'badge ' + t.badgeClass} style={{ fontSize: 13, height: 28, padding: '0 12px' }}>{t.name}</span>
              <span style={{ fontSize: 11, color: 'var(--text-mute)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t.tag}</span>
            </div>
            <div style={{ marginTop: 28, fontSize: 17, fontWeight: 700, textWrap: 'balance' }}>{t.desc}</div>
            <div style={{ position: 'absolute', right: 18, bottom: 14, fontSize: 70, fontWeight: 700, color: `hsla(${t.hue},70%,50%,0.06)`, letterSpacing: '-0.04em', lineHeight: 1 }}>
              {String(i + 1).padStart(2, '0')}
            </div>
          </div>
        )}
      </div>
    </section>);

}

function CinemasMini({ navigate }) {
  return (
    <section className="container" style={{ marginTop: 80 }}>
      <SectionHeader eyebrow="Карта міста" title="Наш кінотеатр у Києві" />
      <div className="grid-4">
        {CINEMAS.map((c) =>
        <div key={c.id} className="card movie-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => navigate('cinema', { id: c.id })}>
            <div style={{ aspectRatio: '16/10', position: 'relative' }}>
              <CinemaHeroArt id={c.id} />
              <span className="badge" style={{ position: 'absolute', top: 10, left: 10 }}>{c.halls} залів</span>
              <div style={{ position: 'absolute', bottom: 10, left: 12, right: 12 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', textShadow: '0 2px 12px rgba(0,0,0,0.7)' }}>{c.name}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.78)', marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon.pin size={10} /> {c.address}
                </div>
              </div>
            </div>
            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {c.formats.slice(0, 4).map((f) =>
              <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : f === '4DX' ? 'dx4' : '')}>{f}</span>
              )}
              </div>
              <button className="btn btn-ghost btn-sm" style={{ marginTop: 'auto' }} onClick={(e) => {e.stopPropagation();navigate('cinema', { id: c.id });}}>
                Детальніше <Icon.right size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>);

}

function HomePage({ navigate }) {
  return (
    <>
      <HeroSection navigate={navigate} />
      <NowShowingCarousel navigate={navigate} />
      <TodaysBest navigate={navigate} />
      <TechnologiesSection navigate={navigate} />
      <ComingSoonSection navigate={navigate} />
      <PremiumBanner navigate={navigate} />
      <FoodTeaser navigate={navigate} />
      <OffersStrip navigate={navigate} />
      <CinemasMini navigate={navigate} />
      <AppDownload />
      <WhyChooseUs />
    </>);

}

Object.assign(window, { HomePage, MovieCard, NowShowingCarousel });
