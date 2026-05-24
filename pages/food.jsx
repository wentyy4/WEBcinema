function FoodIcon({ hue, shape = 'cup' }) {
  // Abstract appetizing visual based on hue
  return (
    <div style={{
      aspectRatio:'1/1', borderRadius: 16, position:'relative', overflow:'hidden',
      background:`radial-gradient(80% 70% at 30% 30%, hsla(${hue},85%,60%,0.5), transparent 60%), linear-gradient(150deg, hsl(${hue},40%,18%), hsl(${hue+20},35%,10%))`,
    }}>
      <div style={{
        position:'absolute', left:'50%', top:'55%', transform:'translate(-50%, -50%)',
        width:'62%', height:'62%', borderRadius:'50%',
        background:`radial-gradient(circle at 30% 30%, hsl(${hue},80%,70%), hsl(${hue},65%,50%) 55%, hsl(${hue},55%,30%))`,
        boxShadow:'0 20px 40px rgba(0,0,0,0.45), inset 0 -10px 24px rgba(0,0,0,0.35), inset 0 8px 18px rgba(255,255,255,0.18)',
      }}/>
      <div style={{
        position:'absolute', left:'25%', top:'18%', width: '20%', height: '15%',
        borderRadius:'50%', background:'rgba(255,255,255,0.25)', filter:'blur(3px)',
      }}/>
    </div>
  );
}

function FoodPage({ navigate }) {
  const [cat, setCat] = React.useState('Усі');
  const [cart, setCart] = React.useState({});

  const cats = ['Усі', ...FOOD_CATEGORIES];
  const visible = cat === 'Усі' ? FOOD_ITEMS : FOOD_ITEMS.filter(i => i.cat === cat);

  const add = id => setCart(c => ({ ...c, [id]: (c[id]||0)+1 }));
  const remove = id => setCart(c => { const n = {...c}; if (!n[id]) return n; n[id]--; if (n[id]<=0) delete n[id]; return n; });
  const cartCount = Object.values(cart).reduce((a,b) => a+b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + (FOOD_ITEMS.find(f=>f.id===id)?.price||0)*qty, 0);

  return (
    <>
      {/* Hero */}
      <section style={{ position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset: 0, background:
          'radial-gradient(60% 80% at 70% 20%, rgba(229,20,42,0.3), transparent 60%), radial-gradient(50% 60% at 20% 80%, rgba(255,80,40,0.25), transparent 60%)'
        }}/>
        <div className="container" style={{ position:'relative', paddingTop: 56, paddingBottom: 36 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1.3fr 1fr', gap: 60, alignItems:'center' }} className="food-hero">
            <div>
              <div className="eyebrow">Їжа та напої</div>
              <h1 style={{ marginTop: 14 }}>Кіно стає смачнішим.</h1>
              <p style={{ marginTop: 18, color:'var(--text-dim)', fontSize: 17, maxWidth: 540 }}>
                Свіжий попкорн, авторські напої, бургери і десерти — замовляй заздалегідь або просто з місця в Premium-залі.
              </p>
              <div style={{ marginTop: 24, display:'flex', gap: 12, flexWrap:'wrap' }}>
                <button className="btn btn-primary btn-lg">Замовити їжу</button>
                <button className="btn btn-ghost btn-lg" onClick={() => navigate('schedule')}>До розкладу</button>
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 12 }}>
              {[38, 22, 90, 340].map((h, i) => (
                <div key={i} style={{ aspectRatio:'1/1', borderRadius: 22 }}>
                  <FoodIcon hue={h}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR-order flow */}
      <section className="container" style={{ marginTop: 32 }}>
        <div className="card" style={{ padding: 28,
          background:'linear-gradient(135deg, rgba(229,20,42,0.08), rgba(229,20,42,0.02))',
          borderColor:'rgba(229,20,42,0.25)' }}>
          <div style={{ display:'flex', alignItems:'center', gap: 18, marginBottom: 20, flexWrap:'wrap' }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background:'rgba(229,20,42,0.15)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--accent-hi)' }}>
              <Icon.qr size={26}/>
            </div>
            <div>
              <h2 style={{ fontSize: 22 }}>Замовляй просто з місця</h2>
              <p style={{ fontSize: 13.5, color:'var(--text-dim)', marginTop: 4 }}>Доступно у Premium-залах · знайди QR-код на підлокітнику</p>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap: 14 }} className="qr-steps">
            {[
              ['Скануй QR-код на підлокітнику', 'Він є на боці крісла у Premium-залах'],
              ['Обирай їжу', 'Усе меню — у застосунку'],
              ['Оплачуй онлайн', 'Apple Pay, Google Pay, картка'],
              ['Отримуй замовлення в залі', 'Доставка до 5 хв'],
            ].map(([t, s], i) => (
              <div key={i} style={{
                padding: 16, borderRadius: 14,
                background:'rgba(255,255,255,0.03)', border:'1px solid var(--border)',
              }}>
                <div style={{ width: 28, height: 28, borderRadius:'50%', background:'rgba(229,20,42,0.15)', color:'var(--accent-hi)', display:'flex', alignItems:'center', justifyContent:'center', fontSize: 13, fontWeight: 700 }}>{i+1}</div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600 }}>{t}</div>
                <div style={{ marginTop: 4, fontSize: 12.5, color:'var(--text-mute)' }}>{s}</div>
              </div>
            ))}
          </div>
          <style>{`@media (max-width: 760px) { .qr-steps { grid-template-columns: 1fr 1fr !important; } }`}</style>
        </div>
      </section>

      {/* Categories */}
      <section className="container" style={{ marginTop: 56 }}>
        <div className="hrow">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={'chip' + (c === cat ? ' active' : '')} style={{ flexShrink: 0, height: 40, fontSize: 14 }}>{c}</button>
          ))}
        </div>

        <div className="grid-4" style={{ marginTop: 24 }}>
          {visible.map(f => (
            <div key={f.id} className="card movie-card food-card" style={{ padding: 14, display:'grid', gridTemplateRows:'auto 44px 42px auto', gap: 0 }}>
              <FoodIcon hue={f.hue}/>
              <div style={{ marginTop: 14, fontSize: 15, lineHeight: 1.2, fontWeight: 600 }}>{f.name}</div>
              <div style={{ marginTop: 4, fontSize: 12.5, lineHeight: 1.35, color:'var(--text-mute)' }}>{f.desc}</div>
              <div style={{ marginTop: 14, display:'flex', alignItems:'center', justifyContent:'space-between', gap: 10 }}>
                <span style={{ fontWeight: 700, fontSize: 16, color:'var(--accent-hi)' }}>{f.price} ₴</span>
                {cart[f.id] ? (
                  <div style={{ display:'flex', alignItems:'center', gap: 8, padding: 4, background:'rgba(229,20,42,0.12)', borderRadius: 999, border:'1px solid rgba(229,20,42,0.3)' }}>
                    <button onClick={() => remove(f.id)} className="btn-icon" style={{ height: 30, width: 30, borderRadius:'50%', background:'rgba(255,255,255,0.06)', border:'none', color:'var(--text)' }}><Icon.minus size={12}/></button>
                    <span style={{ minWidth: 18, textAlign:'center', fontWeight: 700, fontSize: 14 }}>{cart[f.id]}</span>
                    <button onClick={() => add(f.id)} className="btn-icon" style={{ height: 30, width: 30, borderRadius:'50%', background:'linear-gradient(135deg, #FF3340, #E5142A)', border:'none', color:'#fff' }}><Icon.plus size={12}/></button>
                  </div>
                ) : (
                  <button className="btn btn-ghost btn-sm" style={{ height: 34 }} onClick={() => add(f.id)}>
                    <Icon.plus size={12}/> Додати
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ block */}
      <section className="container" style={{ marginTop: 80 }}>
        <SectionHeader eyebrow="FAQ" title="Часті питання про замовлення"/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }} className="food-faq">
          {[
            ['За скільки часу можна замовити?', 'До 30 хвилин до початку сеансу — щоб ми встигли все приготувати свіжим.'],
            ['Як отримати замовлення?', 'У стандартних залах — на барі за чеком. У Premium — доставка до місця.'],
            ['Чи можна оплатити онлайн?', 'Так, оплатіть замовлення карткою, Apple Pay або Google Pay.'],
            ['Чи є опції без глютену та лактози?', 'Так — шукайте відповідні позначки у картках товарів.'],
          ].map(([q, a], i) => (
            <div key={i} className="card" style={{ padding: 20 }}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>{q}</div>
              <p style={{ marginTop: 8, fontSize: 13.5, color:'var(--text-dim)' }}>{a}</p>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 760px) { .food-faq { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* Floating cart bar */}
      {cartCount > 0 && (
        <div style={{
          position:'fixed', bottom: 24, left:'50%', transform:'translateX(-50%)', zIndex: 40,
          padding: 10, paddingLeft: 22,
          borderRadius: 999,
          background:'rgba(8,8,12,0.92)', backdropFilter:'blur(20px)',
          border:'1px solid rgba(229,20,42,0.3)',
          display:'flex', alignItems:'center', gap: 16,
          boxShadow:'0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(229,20,42,0.15)',
        }}>
          <div style={{ display:'flex', alignItems:'center', gap: 12 }}>
            <span style={{
              width: 28, height: 28, borderRadius:'50%',
              background:'linear-gradient(135deg, #FF3340, #E5142A)', color:'#fff',
              display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize: 12, fontWeight: 700,
            }}>{cartCount}</span>
            <span style={{ fontSize: 14 }}>У замовленні · <strong>{cartTotal} ₴</strong></span>
          </div>
          <button className="btn btn-primary" style={{ height: 40 }}>Оформити <Icon.right size={12}/></button>
        </div>
      )}

      <style>{`
        @media (max-width: 880px) { .food-hero { grid-template-columns: 1fr !important; gap: 36px !important; } }
        @media (max-width: 560px) { .food-card { grid-template-rows: auto auto auto auto !important; } }
      `}</style>
    </>
  );
}

Object.assign(window, { FoodPage });
