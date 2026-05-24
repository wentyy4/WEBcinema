function PremiumPage({ navigate }) {
  const benefits = [
    ['Крісла з підвищеним комфортом', 'Електропривід, плед, столик, USB зарядка.', '01'],
    ['Більше особистого простору', 'До 1,2 м між рядами та широкі підлокітники.', '02'],
    ['Доставка їжі до місця', 'Замовляй з підлокітника під час сеансу.', '03'],
    ['Окрема зона очікування', 'Кава, легкі закуски та преса включені.', '04'],
    ['Покращений звук і зображення', 'Лазерний проектор 4К та звук Dolby Atmos.', '05'],
    ['Тихий вхід та вихід', 'Окремий хол, без черг біля кас.', '06'],
  ];

  return (
    <>
      {/* Dark luxurious hero */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset: 0, background:
          'radial-gradient(60% 70% at 70% 30%, rgba(229,20,42,0.30), transparent 60%), radial-gradient(50% 60% at 20% 90%, rgba(120,10,30,0.35), transparent 60%), linear-gradient(180deg, #180a10, #0a0508)'
        }}/>
        <div style={{ position:'absolute', inset: 0, opacity:0.5, mixBlendMode:'overlay',
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 3px)' }}/>
        <div className="container" style={{ position:'relative', paddingTop: 80, paddingBottom: 80 }}>
          <div className="eyebrow" style={{ color:'#FF8090' }}>Premium</div>
          <h1 style={{ marginTop: 16, maxWidth: 880 }}>
            Premium-зали Lumina. <br/>
            <span style={{ background: 'linear-gradient(135deg, #FF8090, #FF3340 80%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip: 'text' }}>
              Більше комфорту. Менше зайвого.
            </span>
          </h1>
          <p style={{ marginTop: 22, color:'var(--text-dim)', fontSize: 18, maxWidth: 660 }}>
            Більше комфорту, простору та сервісу для особливого перегляду.
          </p>
          <div style={{ marginTop: 30, display:'flex', gap: 12, flexWrap:'wrap' }}>
            <button className="btn btn-primary btn-lg" onClick={() => navigate('schedule')}>
              Забронювати Premium-місця
            </button>
            <button className="btn btn-ghost btn-lg">Подивитися відео</button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="container" style={{ marginTop: 56 }}>
        <SectionHeader eyebrow="Що входить" title="Що ти отримуєш у Premium-залі"/>
        <div className="grid-3" style={{ gap: 18 }}>
          {benefits.map(([t, s, n], i) => (
            <div key={i} className="card" style={{
              padding: 26, position:'relative', overflow:'hidden',
              background: 'linear-gradient(180deg, rgba(229,20,42,0.06), rgba(255,255,255,0.005))',
              borderColor: 'rgba(229,20,42,0.18)',
            }}>
              <div style={{ position:'absolute', top: 14, right: 18, fontSize: 56, fontWeight: 700, color:'rgba(229,20,42,0.10)', letterSpacing:'-0.04em' }}>{n}</div>
              <div style={{ width: 44, height: 44, borderRadius: 12, background:'rgba(229,20,42,0.12)', display:'flex', alignItems:'center', justifyContent:'center', color:'#FF8090' }}>
                <Icon.diamond size={20}/>
              </div>
              <div style={{ marginTop: 18, fontSize: 18, fontWeight: 700 }}>{t}</div>
              <p style={{ marginTop: 8, fontSize: 13.5, color:'var(--text-dim)' }}>{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="container" style={{ marginTop: 72 }}>
        <SectionHeader eyebrow="Інтер’єри" title="Як це виглядає"/>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gridAutoRows:'min(28vw, 240px)', gap: 14 }} className="prem-gal">
          {[0,1,2,3,4,5].map(i => (
            <div key={i} style={{
              gridColumn: i === 0 ? 'span 2' : 'span 1', gridRow: i === 0 ? 'span 2' : 'span 1',
              borderRadius: 16,
              background: `
                radial-gradient(80% 80% at ${30+(i*15)%70}% ${30+(i*23)%60}%, rgba(201,162,75,${0.2+(i%3)*0.05}), transparent 60%),
                linear-gradient(${30+i*40}deg, #1a0a10, #0a0508)
              `,
              border:'1px solid rgba(229,20,42,0.12)',
            }}/>
          ))}
        </div>
        <style>{`@media (max-width: 760px) { .prem-gal { grid-template-columns: 1fr 1fr !important; grid-auto-rows: 36vw !important; } }`}</style>
      </section>

      {/* CTA */}
      <section className="container" style={{ marginTop: 80 }}>
        <div className="card" style={{
          padding: '48px 40px', textAlign:'center',
          background:'radial-gradient(80% 100% at 50% 0%, rgba(229,20,42,0.18), transparent 60%), linear-gradient(180deg, #1a0a10, #0a0508)',
          borderColor:'rgba(229,20,42,0.25)',
        }}>
          <div className="eyebrow" style={{ color:'#FF8090' }}>Готові спробувати?</div>
          <h2 style={{ marginTop: 14 }}>Premium-сеанси сьогодні у Lumina 11 SkyMall</h2>
          <div style={{ marginTop: 24, display:'flex', gap: 8, justifyContent:'center', flexWrap:'wrap' }}>
            {[
              { time:'16:00', movie:'Останній обрій' },
              { time:'15:30', movie:'Літо у вишневому саду' },
              { time:'18:00', movie:'Нейроніч' },
              { time:'14:20', movie:'Гірський вітер' },
              { time:'19:30', movie:'Гірський вітер' },
            ].map((s, i) => (
              <button key={i} className="timepill premium" onClick={() => navigate('schedule')}>
                {s.time}
                <span className="meta">{s.movie}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-lg" style={{ marginTop: 28 }} onClick={() => navigate('schedule')}>
            Забронювати Premium-місця
          </button>
        </div>
      </section>
    </>
  );
}

Object.assign(window, { PremiumPage });
