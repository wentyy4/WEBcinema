function SchedulePage({ navigate }) {
  const [date, setDate]     = React.useState('today');
  const [search, setSearch] = React.useState('');
  const [format, setFormat] = React.useState('Усі');
  const [lang, setLangFilter] = React.useState('Усі');
  const [tod, setTod]       = React.useState('Будь-який');
  const [sort, setSort]     = React.useState('earliest'); // earliest | latest | popular

  const formats = ['Усі', '2D', '3D', 'IMAX', '4DX', 'Dolby Atmos', 'Premium'];
  const langs = ['Усі', 'Українською', 'Мовою оригіналу', 'З субтитрами'];
  const tods = ['Будь-який', 'Ранок', 'День', 'Вечір', 'Ніч'];

  const timeBucket = (t) => {
    const h = parseInt(t.split(':')[0]);
    if (h < 12) return 'Ранок';
    if (h < 17) return 'День';
    if (h < 22) return 'Вечір';
    return 'Ніч';
  };

  let sessions = [];
  MOVIES.forEach(m => {
    if (search && !m.title.toLowerCase().includes(search.toLowerCase())) return;
    if (lang !== 'Усі') {
      if (lang === 'Українською' && !m.lang.startsWith('Українською')) return;
      if (lang === 'Мовою оригіналу' && !m.lang.includes('оригіналу')) return;
      if (lang === 'З субтитрами' && !m.lang.includes('субтитри')) return;
    }
    (SHOWTIMES[m.id]||[]).forEach(s => {
      if (format !== 'Усі' && s.format !== format && !(format === 'Premium' && s.premium)) return;
      if (tod !== 'Будь-який' && timeBucket(s.time) !== tod) return;
      sessions.push({ movie: m, ...s });
    });
  });

  // sort
  const toMin = t => { const [h, m] = t.split(':').map(Number); return h*60 + m; };
  if (sort === 'earliest') sessions.sort((a,b) => toMin(a.time) - toMin(b.time));
  else if (sort === 'latest') sessions.sort((a,b) => toMin(b.time) - toMin(a.time));
  else if (sort === 'popular') sessions.sort((a,b) => b.movie.rating - a.movie.rating);

  // group by movie
  const grouped = {};
  sessions.forEach(s => {
    if (!grouped[s.movie.id]) grouped[s.movie.id] = { movie: s.movie, items: [] };
    grouped[s.movie.id].items.push(s);
  });
  const groups = Object.values(grouped);

  return (
    <>
      <PageHeader
        eyebrow={`Розклад на ${DATES.find(d => d.id === date)?.label}, ${DATES.find(d => d.id === date)?.date}`}
        title="Розклад сеансів"
        subtitle={`Обирай фільм, дату і зручний час сеансу в ${CINEMA}.`}
      >
        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap: 10, maxWidth: 420 }} className="sched-filters">
          <div style={{ position:'relative' }}>
            <span style={{ position:'absolute', left: 14, top:'50%', transform:'translateY(-50%)', color:'var(--text-mute)' }}>
              <Icon.search size={14}/>
            </span>
            <input className="input" placeholder="Пошук фільму" value={search} onChange={e => setSearch(e.target.value)}
                   style={{ paddingLeft: 36, height: 38 }}/>
          </div>
        </div>
      </PageHeader>

      <div className="container">
        <DateTabs value={date} onChange={setDate}/>

        <div style={{ display:'flex', flexWrap:'wrap', gap: 18, marginTop: 22, paddingBottom: 14, borderBottom:'1px solid var(--border)' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', marginRight: 4 }}>Формат</span>
            {formats.map(f => (
              <button key={f} onClick={() => setFormat(f)} className={'chip' + (f === format ? ' active' : '')} style={{ height: 30, fontSize: 12 }}>{f}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', marginRight: 4 }}>Мова</span>
            {langs.map(f => (
              <button key={f} onClick={() => setLangFilter(f)} className={'chip' + (f === lang ? ' active' : '')} style={{ height: 30, fontSize: 12 }}>{f}</button>
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap' }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', marginRight: 4 }}>Час доби</span>
            {tods.map(f => (
              <button key={f} onClick={() => setTod(f)} className={'chip' + (f === tod ? ' active' : '')} style={{ height: 30, fontSize: 12 }}>{f}</button>
            ))}
          </div>
        </div>

        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap: 12, marginTop: 18 }}>
          <div style={{ fontSize: 14, color:'var(--text-dim)' }}>
            Знайдено: <strong style={{ color:'var(--text)' }}>{groups.length}</strong> фільмів • <strong style={{ color:'var(--text)' }}>{sessions.length}</strong> сеансів
          </div>
          <div style={{ display:'flex', alignItems:'center', gap: 8 }}>
            <span style={{ fontSize: 13, color:'var(--text-mute)' }}>Сортувати</span>
            {[
              ['earliest', 'Спочатку найближчі'],
              ['latest', 'Спочатку пізніші'],
              ['popular', 'Найпопулярніші'],
            ].map(([id, label]) => (
              <button key={id} onClick={() => setSort(id)} className={'chip' + (sort === id ? ' active' : '')} style={{ height: 30, fontSize: 12 }}>{label}</button>
            ))}
          </div>
        </div>

        {/* Groups */}
        <div style={{ marginTop: 28, display:'flex', flexDirection:'column', gap: 14 }}>
          {groups.length === 0 ? (
            <div className="card" style={{ padding: 60, textAlign:'center' }}>
              <div style={{ fontSize: 40, marginBottom: 14, opacity: 0.4 }}>🎬</div>
              <h3 style={{ fontSize: 20 }}>Сеансів не знайдено</h3>
              <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Спробуй змінити фільтри або обери інший день.</p>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('schedule')}>Переглянути розклад</button>
            </div>
          ) : groups.map(g => (
            <div key={g.movie.id} className="card" style={{ padding: 18, display:'grid', gridTemplateColumns:'80px 1fr', gap: 18 }}>
              <div style={{ cursor:'pointer' }} onClick={() => navigate('movie', { id: g.movie.id })}>
                <Poster movie={g.movie} showTitle={false}/>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap: 12 }}>
                <div style={{ display:'flex', alignItems:'center', gap: 10, flexWrap:'wrap' }}>
                  <h3 style={{ fontSize: 18, cursor:'pointer' }} onClick={() => navigate('movie', { id: g.movie.id })}>{g.movie.title}</h3>
                  <span className="badge age">{g.movie.age}</span>
                  <span style={{ fontSize: 12, color:'var(--text-mute)' }}>{g.movie.genres.join(' · ')} • {g.movie.duration} • {g.movie.lang}</span>
                </div>
                <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
                  {g.items.map((s, i) => (
                    <button key={i} className={'timepill' + (s.premium ? ' premium' : '')} onClick={() => navigate('seats', { id: g.movie.id, time: s.time })}>
                      {s.time}
                      <span className="meta">{s.format} · {s.price}₴</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .sched-filters { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { SchedulePage });
