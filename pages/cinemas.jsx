// CINEMA HERO ART — programmatic "photo-like" rendering for each cinema
function CinemaHeroArt({ id, height }) {
  // Each cinema gets a unique abstract dark-red lobby scene
  const variants = {
    sky: { hueA: 350, hueB: 0 },
    oc:  { hueA: 350, hueB: 20 },
    rt:  { hueA: 0,   hueB: 350 },
    rv:  { hueA: 340, hueB: 10 },
  };
  const v = variants[id] || variants.sky;
  return (
    <div style={{
      position:'relative', width:'100%', height: height || '100%', minHeight: 240,
      borderRadius: 18, overflow:'hidden',
      background: `
        radial-gradient(70% 90% at 30% 100%, hsla(${v.hueA},80%,40%,0.55), transparent 55%),
        radial-gradient(50% 70% at 80% 80%, hsla(${v.hueB},80%,35%,0.5), transparent 55%),
        linear-gradient(180deg, #0c0710 0%, #1a0a12 55%, #0a0508 100%)
      `,
    }}>
      {/* Ceiling lighting / vault */}
      <svg width="100%" height="100%" viewBox="0 0 1200 600" preserveAspectRatio="xMidYMid slice" style={{ position:'absolute', inset: 0 }}>
        <defs>
          <linearGradient id={'ceiling-'+id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#220a14" stopOpacity="1"/>
            <stop offset="1" stopColor="#0a0508" stopOpacity="0"/>
          </linearGradient>
          <radialGradient id={'spot-'+id} cx="0.5" cy="0.3" r="0.6">
            <stop offset="0" stopColor="#FF3340" stopOpacity="0.45"/>
            <stop offset="1" stopColor="#FF3340" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect width="1200" height="220" fill={`url(#ceiling-${id})`}/>
        {/* Vault arches */}
        <path d="M0 220 C 300 120, 900 120, 1200 220 L 1200 0 L 0 0 Z" fill="rgba(255,50,80,0.06)"/>
        <path d="M0 240 C 300 160, 900 160, 1200 240" stroke="rgba(255,50,80,0.25)" strokeWidth="1.5" fill="none"/>
        <path d="M0 260 C 300 200, 900 200, 1200 260" stroke="rgba(255,50,80,0.15)" strokeWidth="1" fill="none"/>

        {/* Floor reflection lines */}
        <path d="M0 460 L 1200 460" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
        <path d="M0 510 L 1200 510" stroke="rgba(255,255,255,0.03)" strokeWidth="1"/>

        {/* Big screen / sign on back wall */}
        <rect x="380" y="220" width="440" height="160" rx="6" fill="rgba(0,0,0,0.55)" stroke="rgba(255,50,80,0.5)" strokeWidth="2"/>
        <rect x="395" y="235" width="410" height="130" rx="3" fill="url(#spot-' + id + ')"/>
        <text x="600" y="320" fill="rgba(255,255,255,0.95)" fontFamily="system-ui, sans-serif"
              fontSize="44" fontWeight="800" letterSpacing="12" textAnchor="middle">LUMINA</text>

        {/* Floor red carpet */}
        <path d="M 480 600 L 720 600 L 700 380 L 500 380 Z" fill="rgba(229,20,42,0.35)"/>
        <path d="M 500 600 L 700 600 L 685 380 L 515 380 Z" fill="rgba(229,20,42,0.5)"/>

        {/* Column silhouettes */}
        <rect x="100" y="180" width="40" height="420" fill="rgba(0,0,0,0.45)"/>
        <rect x="1060" y="180" width="40" height="420" fill="rgba(0,0,0,0.45)"/>

        {/* Entry doors silhouettes */}
        <rect x="200" y="320" width="120" height="220" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,50,80,0.2)"/>
        <rect x="880" y="320" width="120" height="220" rx="6" fill="rgba(255,255,255,0.025)" stroke="rgba(255,50,80,0.2)"/>
        <line x1="260" y1="320" x2="260" y2="540" stroke="rgba(255,50,80,0.15)"/>
        <line x1="940" y1="320" x2="940" y2="540" stroke="rgba(255,50,80,0.15)"/>

        {/* Glow under screen */}
        <ellipse cx="600" cy="430" rx="280" ry="22" fill="rgba(255,50,80,0.18)"/>

        {/* Ambient stars */}
        {[[120,80],[200,40],[1050,60],[980,30],[640,90]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r={1.4} fill="rgba(255,255,255,0.4)"/>
        ))}
      </svg>

      {/* Bottom dim */}
      <div style={{ position:'absolute', inset: 0, background:'linear-gradient(180deg, transparent 60%, rgba(8,8,12,0.55))' }}/>
    </div>
  );
}

function CinemasPage({ navigate }) {
  const featureLabels = {
    premium: ['Premium-зали', Icon.diamond],
    food:    ['Фудкорт', Icon.food],
    access:  ['Доступне середовище', Icon.access],
    parking: ['Паркінг', Icon.parking],
  };

  return (
    <>
      <PageHeader
        eyebrow={CITY}
        title="Наш кінотеатр"
        subtitle={`${CINEMA} за адресою ${CINEMAS[0].address}. IMAX, 4DX, Dolby Atmos та Premium-зали в одній локації.`}
      >
      </PageHeader>

      <div className="container">
        <div style={{ display:'flex', flexDirection:'column', gap: 22 }}>
          {CINEMAS.map(c => (
            <div key={c.id} className="card movie-card" style={{ padding: 0, overflow:'hidden', cursor:'pointer' }}
                 onClick={() => navigate('cinema', { id: c.id })}>
              <div style={{ display:'grid', gridTemplateColumns:'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 0 }} className="cin-row">
                {/* Big hero photo */}
                <div style={{ position:'relative', minHeight: 320 }}>
                  <CinemaHeroArt id={c.id}/>
                  <div style={{ position:'absolute', top: 18, left: 18, display:'flex', gap: 6, flexWrap:'wrap' }}>
                    <span className="badge">{c.halls} залів</span>
                    {c.features.includes('premium') && <span className="badge premium">Premium</span>}
                  </div>
                  <div style={{ position:'absolute', bottom: 22, left: 22, right: 22 }}>
                    <h3 style={{ fontSize: 28, textShadow:'0 4px 20px rgba(0,0,0,0.6)' }}>{c.name}</h3>
                    <div style={{ marginTop: 6, fontSize: 13, color:'rgba(255,255,255,0.85)', display:'flex', alignItems:'center', gap: 8, textShadow:'0 2px 10px rgba(0,0,0,0.6)' }}>
                      <Icon.pin size={12}/> {c.address}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div style={{ padding: 28, display:'flex', flexDirection:'column', gap: 18 }}>
                  <div>
                    <div className="eyebrow">{CITY} · м. {c.metro}</div>
                    <div style={{ marginTop: 10, fontSize: 13, color:'var(--text-mute)', display:'flex', alignItems:'center', gap: 8 }}>
                      <Icon.clock size={14}/> Працює {c.hours}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, marginBottom: 8 }}>Формати</div>
                    <div style={{ display:'flex', gap: 6, flexWrap:'wrap' }}>
                      {c.formats.map(f => (
                        <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : f === '4DX' ? 'dx4' : '')}>{f}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight:600, marginBottom: 8 }}>Зручності</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap: 12, fontSize: 13, color:'var(--text-dim)' }}>
                      {c.features.map(f => {
                        const [label, IconC] = featureLabels[f];
                        return <span key={f} style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><IconC size={14}/> {label}</span>;
                      })}
                    </div>
                  </div>

                  <div style={{ marginTop:'auto', display:'flex', gap: 10, flexWrap:'wrap', paddingTop: 10 }}>
                    <button className="btn btn-primary btn-sm" onClick={e => { e.stopPropagation(); navigate('schedule'); }}>Переглянути розклад</button>
                    <button className="btn btn-ghost btn-sm" onClick={e => { e.stopPropagation(); navigate('cinema', { id: c.id }); }}>Детальніше</button>
                    <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}><Icon.pin size={12}/> Прокласти маршрут</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .cin-row { grid-template-columns: 1fr !important; } .cin-row > div:first-child { min-height: 260px !important; } }
      `}</style>
    </>
  );
}

function CinemaDetailPage({ navigate, cinemaId }) {
  const c = CINEMAS.find(x => x.id === cinemaId) || CINEMAS[0];
  const featureLabels = {
    premium: 'Premium-зали',
    food:    'Фудкорт',
    access:  'Доступне середовище',
    parking: 'Паркінг',
  };

  // Build a mini schedule preview for this cinema
  const schedulePreview = MOVIES.slice(0, 4).map(m => ({
    movie: m,
    times: (SHOWTIMES[m.id] || []).slice(0, 5),
  })).filter(g => g.times.length > 0);

  return (
    <>
      {/* HERO */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset: 0 }}>
          <CinemaHeroArt id={c.id}/>
        </div>
        <div style={{ position:'absolute', inset: 0, background:'linear-gradient(180deg, rgba(8,8,12,0.35) 0%, rgba(8,8,12,0.75) 70%, var(--bg-0))' }}/>
        <div className="container" style={{ position:'relative', paddingTop: 56, paddingBottom: 64, minHeight: 480, display:'flex', flexDirection:'column', justifyContent:'flex-end' }}>
          <div className="eyebrow" style={{ marginTop: 'auto' }}>{CITY} • м. {c.metro}</div>
          <h1 style={{ marginTop: 12, textShadow:'0 6px 30px rgba(0,0,0,0.7)' }}>{c.name}</h1>
          <div style={{ marginTop: 16, display:'flex', gap: 18, flexWrap:'wrap', fontSize: 14, color:'rgba(255,255,255,0.85)' }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.pin size={14}/> {c.address}</span>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}><Icon.clock size={14}/> {c.hours}</span>
            <span>{c.halls} залів</span>
          </div>
          <div style={{ marginTop: 24, display:'flex', gap: 10, flexWrap:'wrap' }}>
            {c.formats.map(f => (
              <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : f === '4DX' ? 'dx4' : '')} style={{ height: 28, fontSize: 12, padding:'0 12px' }}>{f}</span>
            ))}
            {c.features.map(f => (
              <span key={f} className="badge" style={{ height: 28, fontSize: 12, padding:'0 12px' }}>{featureLabels[f]}</span>
            ))}
          </div>
          <div style={{ marginTop: 28, display:'flex', gap: 12, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('schedule')}>
              <Icon.ticket size={14}/> Купити квитки
            </button>
            <button className="btn btn-ghost btn-lg"><Icon.pin size={14}/> Прокласти маршрут</button>
          </div>
        </div>
      </section>

      {/* About */}
      <div className="container" style={{ marginTop: 40 }}>
        <div style={{ display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 22 }} className="cin-detail-grid">
          <div className="card" style={{ padding: 26 }}>
            <h2 style={{ fontSize: 22 }}>Про кінотеатр</h2>
            <p style={{ marginTop: 14, color:'var(--text-dim)', fontSize: 14.5, lineHeight: 1.6 }}>
              {c.name} — сучасний кінотеатр у складі ТРЦ. {c.halls} залів з найкращими технологіями: лазерні проектори 4K, об’ємний звук Dolby Atmos та комфортні крісла. У холі — кінобар з попкорном, напоями та снеками.
            </p>

            <h3 style={{ marginTop: 26, fontSize: 16 }}>Зали</h3>
            <div style={{ marginTop: 12, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }} className="hall-list">
              {c.formats.map((f, i) => (
                <div key={i} style={{ padding:'12px 14px', border:'1px solid var(--border)', borderRadius: 12, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                  <span style={{ fontSize: 13.5, fontWeight: 600 }}>Зал {i+1}</span>
                  <span className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : f === '4DX' ? 'dx4' : '')}>{f}</span>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: 26, fontSize: 16 }}>Доступне середовище</h3>
            <p style={{ marginTop: 8, color:'var(--text-dim)', fontSize: 13.5 }}>
              Безбар’єрний вхід, ліфти, місця для людей на кріслах колісних у кожному залі, доступні санвузли. Допомога персоналу — за попередньою заявкою.
            </p>

            <h3 style={{ marginTop: 26, fontSize: 16 }}>Паркінг</h3>
            <p style={{ marginTop: 8, color:'var(--text-dim)', fontSize: 13.5 }}>
              Безкоштовний паркінг ТРЦ на 600+ місць. Перші 3 години — безкоштовно для відвідувачів кіно.
            </p>
            <style>{`@media (max-width: 600px) { .hall-list { grid-template-columns: 1fr !important; } }`}</style>
          </div>

          {/* Map */}
          <div className="card" style={{ padding: 0, overflow:'hidden', minHeight: 360, position:'sticky', top: 88, alignSelf:'flex-start' }} className="cin-detail-map">
            <div style={{
              position:'relative', height: 360,
              background:`radial-gradient(60% 60% at 30% 40%, rgba(229,20,42,0.18), transparent 60%), linear-gradient(135deg, #0d121c, #08090E)`,
            }}>
              <svg width="100%" height="100%" style={{ position:'absolute', inset: 0, opacity: 0.5 }}>
                <defs><pattern id="gg" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/></pattern></defs>
                <rect width="100%" height="100%" fill="url(#gg)"/>
                <path d="M 0 180 Q 200 160 400 200 T 800 180" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none"/>
                <path d="M 180 0 Q 200 200 160 400" stroke="rgba(255,255,255,0.08)" strokeWidth="4" fill="none"/>
              </svg>
              <div style={{ position:'absolute', left:'50%', top:'50%', transform:'translate(-50%, -100%)' }}>
                <div style={{
                  padding:'10px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                  background:'linear-gradient(135deg, #FF3340, #E5142A)', color:'#fff',
                  boxShadow:'0 12px 30px rgba(229,20,42,0.45)',
                }}>
                  {c.name}
                </div>
                <div style={{ width: 12, height: 12, borderRadius:'50%', background:'#FF3340', margin:'6px auto 0', boxShadow:'0 0 30px rgba(229,20,42,0.7)' }}/>
              </div>
              <div style={{ position:'absolute', bottom: 14, left: 14, right: 14, padding:'10px 14px', background:'rgba(8,8,12,0.7)', backdropFilter:'blur(10px)', borderRadius: 12, fontSize: 12, color:'var(--text-dim)' }}>
                {c.address}
              </div>
            </div>
          </div>
        </div>

        {/* Schedule preview */}
        <section style={{ marginTop: 48 }}>
          <SectionHeader eyebrow="Сеанси у цьому кінотеатрі" title="Розклад на сьогодні" action={<a className="link" onClick={() => navigate('schedule')} style={{ cursor:'pointer' }}>Повний розклад <Icon.right size={12}/></a>}/>
          <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
            {schedulePreview.map(g => (
              <div key={g.movie.id} className="card" style={{ padding: 16, display:'grid', gridTemplateColumns:'70px 1fr', gap: 16 }}>
                <div style={{ cursor:'pointer' }} onClick={() => navigate('movie', { id: g.movie.id })}>
                  <Poster movie={g.movie} showTitle={false}/>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
                  <div style={{ display:'flex', alignItems:'center', gap: 10, flexWrap:'wrap' }}>
                    <h3 style={{ fontSize: 16, cursor:'pointer' }} onClick={() => navigate('movie', { id: g.movie.id })}>{g.movie.title}</h3>
                    <span className="badge age">{g.movie.age}</span>
                    <span style={{ fontSize: 12, color:'var(--text-mute)' }}>{g.movie.duration}</span>
                  </div>
                  <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                    {g.times.map((t, i) => (
                      <button key={i} className={'timepill' + (t.premium ? ' premium' : '')} onClick={() => navigate('seats', { id: g.movie.id, time: t.time })}>
                        {t.time}<span className="meta">{t.format} · {t.price}₴</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        @media (max-width: 980px) { .cin-detail-grid { grid-template-columns: 1fr !important; } .cin-detail-map { position: static !important; } }
      `}</style>
    </>
  );
}

Object.assign(window, { CinemasPage, CinemaDetailPage, CinemaHeroArt });
