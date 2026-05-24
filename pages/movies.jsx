function MoviesPage({ navigate }) {
  const [tab, setTab] = React.useState('now'); // now | soon | presale
  const [search, setSearch] = React.useState('');
  const [genre, setGenre] = React.useState('Усі');
  const [format, setFormat] = React.useState('Усі');

  const allGenres = ['Усі', ...new Set(MOVIES.flatMap(m => m.genres))];
  const allFormats = ['Усі', '2D', '3D', 'IMAX', '4DX', 'Dolby Atmos', 'Premium'];

  let list = [];
  if (tab === 'now') list = MOVIES;
  else if (tab === 'soon') list = COMING_SOON.map(c => ({
    id: c.id, title: c.title, original: c.title, genres: c.genres, duration: '—',
    rating: '—', age: '—', lang: '', formats: [], poster: c.poster, short: `Прем’єра ${c.date}`,
  }));
  else if (tab === 'presale') list = MOVIES.slice(0, 3); // mock subset

  const visible = list.filter(m => {
    if (search && !(m.title + ' ' + (m.original||'')).toLowerCase().includes(search.toLowerCase())) return false;
    if (genre !== 'Усі' && !m.genres.includes(genre)) return false;
    if (format !== 'Усі' && !(m.formats||[]).includes(format)) return false;
    return true;
  });

  const tabs = [
    { id: 'now', label: 'Зараз у кіно', count: MOVIES.length },
    { id: 'soon', label: 'Незабаром', count: COMING_SOON.length },
    { id: 'presale', label: 'Передпродаж', count: 3 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Каталог"
        title="Фільми"
        subtitle="Зараз у прокаті, передпродаж та найочікуваніші прем’єри. Знайди фільм — обери сеанс — купи квиток."
      >
        <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
          {/* Tabs */}
          <div style={{ display:'flex', gap: 4, padding: 4, background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)', borderRadius: 14, width:'fit-content' }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                padding:'10px 18px', borderRadius: 10,
                background: tab === t.id ? 'linear-gradient(135deg, rgba(229,20,42,0.22), rgba(229,20,42,0.08))' : 'transparent',
                border:'none', color: tab === t.id ? '#FF8090' : 'var(--text-dim)',
                fontWeight: 600, fontSize: 14, cursor:'pointer',
                display:'inline-flex', alignItems:'center', gap: 8,
              }}>
                {t.label}
                <span style={{ fontSize: 11, color:'var(--text-mute)' }}>{t.count}</span>
              </button>
            ))}
          </div>

          <div style={{ display:'flex', gap: 10, flexWrap:'wrap', alignItems:'center' }}>
            <div style={{ position:'relative', flex: 1, minWidth: 240, maxWidth: 400 }}>
              <span style={{ position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)', color:'var(--text-mute)' }}>
                <Icon.search size={16}/>
              </span>
              <input className="input" placeholder="Пошук фільму" value={search} onChange={e => setSearch(e.target.value)}
                     style={{ paddingLeft: 40 }}/>
            </div>
          </div>
        </div>
      </PageHeader>

      <div className="container">
        <div style={{ display:'flex', gap: 14, flexWrap:'wrap', marginBottom: 24 }}>
          <div style={{ display:'flex', alignItems:'center', gap: 8, flexWrap:'wrap' }}>
            <span style={{ fontSize: 13, color:'var(--text-mute)' }}>Жанр</span>
            <div className="hrow" style={{ flexWrap:'wrap', gap: 6 }}>
              {allGenres.map(g => (
                <button key={g} onClick={() => setGenre(g)} className={'chip' + (g === genre ? ' active' : '')} style={{ height: 32, fontSize: 12 }}>{g}</button>
              ))}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 8, flexWrap:'wrap' }}>
            <span style={{ fontSize: 13, color:'var(--text-mute)' }}>Формат</span>
            <div className="hrow" style={{ flexWrap:'wrap', gap: 6 }}>
              {allFormats.map(f => (
                <button key={f} onClick={() => setFormat(f)} className={'chip' + (f === format ? ' active' : '')} style={{ height: 32, fontSize: 12 }}>{f}</button>
              ))}
            </div>
          </div>
          <div style={{ marginLeft:'auto', fontSize: 13, color:'var(--text-dim)', alignSelf:'center' }}>
            Знайдено: <strong style={{ color:'var(--text)' }}>{visible.length}</strong>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="card" style={{ padding: 60, textAlign:'center' }}>
            <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.4 }}>🎬</div>
            <h3 style={{ fontSize: 20 }}>Нічого не знайдено</h3>
            <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Спробуй змінити фільтри або пошуковий запит.</p>
            <button className="btn btn-ghost" style={{ marginTop: 16 }} onClick={() => { setSearch(''); setGenre('Усі'); setFormat('Усі'); }}>Скинути фільтри</button>
          </div>
        ) : (
          <div className="grid-5">
            {visible.map(m => (
              <div key={m.id} className="movie-card" style={{ display:'flex', flexDirection:'column' }}>
                <div style={{ cursor:'pointer' }} onClick={() => navigate('movie', { id: m.id })}>
                  <Poster movie={m}/>
                </div>
                <div style={{ marginTop: 12, flex: 1, display:'flex', flexDirection:'column' }}>
                  <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.2 }}>{m.title}</div>
                  {m.rating !== '—' && <div style={{ marginTop: 6 }}><MovieMeta movie={m} mute/></div>}
                  {m.rating === '—' && <div style={{ marginTop: 6, fontSize: 12, color:'var(--text-mute)' }}>{m.genres[0]} • <span style={{ color:'var(--accent-hi)' }}>{m.short.replace('Прем’єра ', '')}</span></div>}
                  <div style={{ marginTop: 12, display:'flex', gap: 8 }}>
                    {tab === 'now' ? (
                      <>
                        <button className="btn btn-primary btn-sm" style={{ flex: 1 }} onClick={() => navigate('seats', { id: m.id, time: (SHOWTIMES[m.id]||[])[0]?.time })}>
                          Купити квиток
                        </button>
                        <button className="btn btn-ghost btn-sm" onClick={() => navigate('movie', { id: m.id })}>
                          Детальніше
                        </button>
                      </>
                    ) : (
                      <button className="btn btn-ghost btn-sm" style={{ width:'100%' }}>
                        Нагадати про прем’єру
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

Object.assign(window, { MoviesPage });
