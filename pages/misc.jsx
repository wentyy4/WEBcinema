function FAQPage({ navigate }) {
  const [cat, setCat] = React.useState(FAQ[0].cat);
  const [open, setOpen] = React.useState({});

  const active = FAQ.find(c => c.cat === cat);

  return (
    <>
      <div className="container faq-page" style={{ maxWidth: 1180, margin:'0 auto', paddingTop: 48 }}>
        <div style={{ paddingBottom: 24 }}>
          <div className="eyebrow" style={{ marginBottom: 10 }}>Допомога</div>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>Часті питання</h1>
          <p style={{ marginTop: 14, color:'var(--text-dim)', fontSize: 16, lineHeight: 1.55, maxWidth: 640 }}>
            Швидкі відповіді про квитки, повернення, їжу та Premium-зали. Якщо не знайдете відповідь — напишіть нам, ми поряд.
          </p>
        </div>

        <div className="faq-grid" style={{ display:'grid', gridTemplateColumns:'280px minmax(0, 1fr)', gap: 32, alignItems:'flex-start' }}>
          <aside style={{ position:'sticky', top: 88, alignSelf:'flex-start' }} className="faq-side">
            <div style={{ fontSize: 12, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.12em', fontWeight: 600, marginBottom: 14 }}>Категорії</div>
            <div style={{ display:'flex', flexDirection:'column', gap: 6 }}>
              {FAQ.map(c => (
                <button key={c.cat} onClick={() => setCat(c.cat)} style={{
                  textAlign:'left', padding:'12px 14px', borderRadius: 12,
                  background: cat === c.cat ? 'rgba(229,20,42,0.10)' : 'transparent',
                  border:'1px solid ' + (cat === c.cat ? 'rgba(229,20,42,0.4)' : 'transparent'),
                  color: cat === c.cat ? '#FF8090' : 'var(--text-dim)',
                  fontSize: 14, fontWeight: 500, cursor:'pointer',
                  display:'flex', alignItems:'center', justifyContent:'space-between',
                }}>
                  {c.cat}
                  <span style={{ fontSize: 11, color:'var(--text-mute)' }}>{c.items.length}</span>
                </button>
              ))}
            </div>

            <div className="card" style={{ marginTop: 24, padding: 18 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Не знайшли відповідь?</div>
              <p style={{ marginTop: 6, fontSize: 12.5, color:'var(--text-mute)' }}>Підтримка щодня 09:00 — 23:00</p>
              <a href="tel:0800501212" style={{ marginTop: 10, display:'block', color:'var(--accent)', fontWeight: 600 }}>0 800 50 12 12</a>
              <a href="mailto:hello@lumina.ua" style={{ display:'block', color:'var(--text-dim)', fontSize: 13 }}>hello@lumina.ua</a>
            </div>
          </aside>

          <div className="faq-content" style={{ minWidth: 0 }}>
            <h2 style={{ marginBottom: 22, fontSize: 34 }}>{active.cat}</h2>
            <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
              {active.items.map((it, i) => {
                const isOpen = open[cat + i];
                return (
                  <div key={i} className="card" style={{ padding: 0, overflow:'hidden' }}>
                    <button onClick={() => setOpen(o => ({ ...o, [cat+i]: !isOpen }))} style={{
                      width:'100%', textAlign:'left', padding:'18px 22px',
                      background:'transparent', border:'none', color:'var(--text)',
                      display:'flex', alignItems:'center', justifyContent:'space-between', gap: 16,
                      fontSize: 15, fontWeight: 600, cursor:'pointer', lineHeight: 1.35,
                    }}>
                      <span style={{ paddingRight: 8 }}>{it.q}</span>
                      <span style={{ width: 28, height: 28, flex:'0 0 28px', borderRadius:'50%', background:'rgba(255,255,255,0.04)', display:'inline-flex', alignItems:'center', justifyContent:'center', color:'var(--text-dim)', transform: isOpen ? 'rotate(180deg)' : 'none', transition:'transform .2s' }}>
                        <Icon.chevron size={14}/>
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding:'0 22px 22px', fontSize: 14, lineHeight: 1.6, color:'var(--text-dim)' }}>
                        {it.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-side { position: static !important; }
          .faq-content h2 { font-size: 28px !important; }
        }
      `}</style>
    </>
  );
}

function NewsPage({ navigate }) {
  const items = [
    { tag:'Акція', title: 'Студентам — −30% у будні', sub: 'З понеділка по четвер. За ISIC або довідкою з вишу. Діє з 16 травня.', date:'до 30 червня', hue: 24, big: true },
    { tag:'Подія', title: 'Ніч українського кіно', sub: 'Три фільми поспіль із розмовою з режисером.', date:'24 травня, 21:00', hue: 0 },
    { tag:'Прем’єра', title: 'Прем’єрний показ «Останнього обрію»', sub: 'З червоною доріжкою у Lumina 11 SkyMall.', date:'17 травня, 19:00', hue: 280 },
    { tag:'Сім’я', title: 'Сімейний попкорн + 2 квитки', sub: 'Економія до 220 ₴ на сеанс. Кожні вихідні.', date:'постійна', hue: 350 },
    { tag:'Застосунок', title: 'Перший квиток у застосунку — −50%', sub: 'Бонус після реєстрації у профілі.', date:'постійна', hue: 200 },
    { tag:'Спеціально', title: 'Сеанси з тифлокоментарем', sub: 'Окремі сеанси для людей із порушенням зору.', date:'щотижня', hue: 160 },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Новини та акції"
        title="Що нового у Lumina"
        subtitle="Активні акції, прем’єри та події. Не пропусти знижки та особливі сеанси."
      >
        <div style={{ display:'flex', gap: 8, flexWrap:'wrap' }}>
          {['Усі', 'Акції', 'Події', 'Прем’єри', 'Сім’ї', 'Студентам', 'У застосунку'].map((t, i) => (
            <button key={t} className={'chip' + (i === 0 ? ' active' : '')}>{t}</button>
          ))}
        </div>
      </PageHeader>

      <div className="container">
        <div style={{ display:'grid', gridTemplateColumns:'repeat(12, 1fr)', gap: 18 }} className="news-grid">
          {items.map((o, i) => (
            <div key={i} className="card movie-card" style={{
              gridColumn: i === 0 ? 'span 8' : 'span 4',
              minHeight: i === 0 ? 360 : 260,
              padding: 0, overflow:'hidden', cursor:'pointer',
              background:`radial-gradient(80% 100% at 100% 0%, hsla(${o.hue},80%,40%,0.30), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))`,
              display:'flex', flexDirection:'column',
            }}>
              <div style={{
                flex: 1, position:'relative',
                background:`radial-gradient(60% 80% at 30% 30%, hsla(${o.hue},80%,55%,0.35), transparent 60%)`,
                minHeight: i === 0 ? 200 : 120,
              }}>
                <div style={{ position:'absolute', top: 18, left: 18 }}>
                  <span className="badge" style={{ background:`hsla(${o.hue},70%,40%,0.2)`, color:`hsl(${o.hue},85%,75%)`, borderColor:`hsla(${o.hue},70%,40%,0.4)` }}>{o.tag}</span>
                </div>
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontSize: i === 0 ? 26 : 18, textWrap:'balance' }}>{o.title}</h3>
                <p style={{ marginTop: 8, fontSize: 13.5, color:'var(--text-dim)' }}>{o.sub}</p>
                <div style={{ marginTop: 14, display:'flex', alignItems:'center', justifyContent:'space-between', fontSize: 12, color:'var(--text-mute)' }}>
                  <span><Icon.clock size={12}/> {o.date}</span>
                  <span style={{ color:'var(--accent)' }}>Детальніше <Icon.right size={10}/></span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 880px) { .news-grid > .card { grid-column: span 12 !important; } }
        `}</style>
      </div>
    </>
  );
}

function SoonPage({ navigate }) {
  // months grouping
  const byMonth = [
    { month: 'Травень 2026', items: [COMING_SOON[0]] },
    { month: 'Червень 2026', items: COMING_SOON.slice(1) },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Прем’єри"
        title="Скоро на екранах"
        subtitle="Найочікуваніші стрічки найближчих місяців у Lumina. Підпишись — і не пропусти старт продажів."
      />

      <div className="container">
        {byMonth.map(group => (
          <section key={group.month} style={{ marginBottom: 56 }}>
            <h2 style={{ marginBottom: 22, fontSize: 22, color:'var(--text-dim)' }}>{group.month}</h2>
            <div className="grid-5">
              {group.items.map(m => (
                <div key={m.id} className="movie-card" style={{ cursor:'pointer' }}>
                  <Poster movie={{ poster: m.poster, original: m.title, title: m.title, formats: [] }}/>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{m.title}</div>
                    <div style={{ fontSize: 12, color:'var(--text-mute)', marginTop: 4 }}>{m.genres[0]} • <span style={{ color:'var(--accent)' }}>{m.date}</span></div>
                  </div>
                  <button className="btn btn-ghost btn-sm" style={{ marginTop: 10, width:'100%' }}>
                    Нагадати про прем’єру
                  </button>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

function AccessPage({ navigate }) {
  const items = [
    ['Місця для людей на кріслах колісних', 'У кожному залі є місця у першому ряду партеру з безбар’єрним доступом.'],
    ['Безбар’єрне пересування', 'Пандуси, ліфти, широкі коридори та автоматичні двері в Lumina.'],
    ['Доступні санвузли', 'Окремі вбиральні з поручнями та простором для крісла колісного.'],
    ['Допомога персоналу', 'Адміністратори допоможуть з заходом, посадкою і виходом — попередьте, будь ласка, у застосунку або по телефону.'],
    ['Сеанси з тифлокоментарем', 'Окремі сеанси з тифлокоментарем для людей із порушенням зору, маркеровані у фільтрах.'],
    ['Сеанси з субтитрами', 'Розклад має фільтр «З субтитрами» для зручного пошуку.'],
  ];

  return (
    <>
      <PageHeader
        eyebrow="Доступність"
        title="Доступне середовище"
        subtitle="Lumina створює комфортні умови для глядачів з різними потребами. Якщо потрібна допомога — напишіть або зателефонуйте, ми завжди раді допомогти."
      />

      <div className="container">
        <div className="grid-3" style={{ gap: 18 }}>
          {items.map(([t, s], i) => (
            <div key={i} className="card" style={{ padding: 22 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background:'rgba(124,200,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', color:'#9ED8FF' }}>
                <Icon.access size={20}/>
              </div>
              <h3 style={{ marginTop: 16, fontSize: 18 }}>{t}</h3>
              <p style={{ marginTop: 8, fontSize: 13.5, color:'var(--text-dim)' }}>{s}</p>
            </div>
          ))}
        </div>

        <div className="card" style={{ marginTop: 36, padding: 28, display:'grid', gridTemplateColumns:'1.4fr 1fr', gap: 36, alignItems:'center' }} >
          <div>
            <div className="eyebrow">Фільтр у розкладі</div>
            <h2 style={{ marginTop: 12, fontSize: 26 }}>Шукай сеанси з доступним середовищем</h2>
            <p style={{ marginTop: 14, fontSize: 14.5, color:'var(--text-dim)', maxWidth: 460 }}>
              У розкладі є фільтр «Доступність», який показує сеанси у залах з безбар’єрним заходом, місцями для людей на кріслах колісних та сеансами з тифлокоментарем.
            </p>
            <div style={{ marginTop: 18, display:'flex', gap: 10, flexWrap:'wrap' }}>
              <button className="btn btn-primary" onClick={() => navigate('schedule')}>Перейти до розкладу</button>
              <a href="tel:0800501212" className="btn btn-ghost">0 800 50 12 12</a>
            </div>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
            {['♿ Доступні зали', '👁 Тифлокоментар', '💬 З субтитрами', '🤝 Допомога персоналу'].map((s, i) => (
              <div key={i} className="chip active" style={{ height: 44, fontSize: 14, justifyContent:'flex-start' }}>{s}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, { FAQPage, NewsPage, SoonPage, AccessPage });
