function CheckoutPage({ navigate, movieId, time }) {
  const { user, addTicket, openAuth } = useAuth();
  const movie = MOVIES.find(m => m.id === movieId) || MOVIES[3];
  const showtime = (SHOWTIMES[movie.id] || []).find(t => t.time === time) || (SHOWTIMES[movie.id] || [])[0] || { time: '19:10', hall: 'IMAX', format: 'IMAX', price: 280 };
  const [step, setStep] = React.useState(1); // 1 контакти, 2 оплата, 3 підтвердження, 4 QR
  const [form, setForm] = React.useState({
    name: user?.name || 'Марія К.',
    email: user?.email || 'maria@example.com',
    phone: user?.phone || '+380 67 123 45 67',
  });
  const [method, setMethod] = React.useState('apple');
  const [savedTicketId, setSavedTicketId] = React.useState(null);

  const total = 440; // mock from seat selection

  // Save ticket once when we land on step 4
  React.useEffect(() => {
    if (step === 4 && !savedTicketId && user) {
      const id = 'ut' + Date.now().toString().slice(-6);
      addTicket({
        id,
        movieId: movie.id,
        date: DATE_TODAY.replace('Сьогодні, ', '') + ' 2026',
        time: showtime.time,
        cinema: CINEMA,
        hall: showtime.hall + (showtime.format !== showtime.hall ? ', ' + showtime.format : ''),
        seats: 'Ряд F, місця 8–9',
        sum: total,
        status: 'active',
      });
      setSavedTicketId(id);
    }
  }, [step]);

  const steps = ['Місця', 'Контакти', 'Оплата', 'Підтвердження'];
  // current step index: 1=contacts(idx 1), 2=payment(2), 3=confirm(3), 4=qr(3, after pay)
  const idx = step === 4 ? 3 : step; // for indicator

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [step]);

  const Step = () => {
    if (step === 1) return (
      <div className="card" style={{ padding: 28 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Контакти</h2>
        <p style={{ color:'var(--text-mute)', fontSize: 13.5 }}>Надішлемо квиток на email і SMS.</p>
        <div style={{ marginTop: 24, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 14 }} className="form-grid">
          <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Ім’я</span>
            <input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})}/>
          </label>
          <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Телефон</span>
            <input className="input" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}/>
          </label>
          <label style={{ display:'flex', flexDirection:'column', gap: 6, gridColumn: '1 / -1' }}>
            <span style={{ fontSize: 12, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>Email</span>
            <input className="input" value={form.email} onChange={e => setForm({...form, email: e.target.value})}/>
          </label>
        </div>
        <label style={{ marginTop: 18, display:'flex', alignItems:'flex-start', gap: 10, fontSize: 13, color:'var(--text-dim)' }}>
          <input type="checkbox" defaultChecked style={{ accentColor:'#E5142A', marginTop: 2 }}/>
          <span>Згоден на обробку персональних даних та умови публічної оферти.</span>
        </label>
        <button className="btn btn-primary btn-lg" style={{ marginTop: 24, width:'100%' }} onClick={() => setStep(2)}>
          Далі: оплата <Icon.right size={14}/>
        </button>
        <style>{`@media (max-width: 560px) { .form-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    );

    if (step === 2) return (
      <div className="card" style={{ padding: 28 }}>
        <h2 style={{ fontSize: 22, marginBottom: 6 }}>Оплата</h2>
        <p style={{ color:'var(--text-mute)', fontSize: 13.5 }}>Безпечна оплата через захищений шлюз.</p>

        <div style={{ marginTop: 20, display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }} className="pay-grid">
          {[
            ['apple',  'Apple Pay'],
            ['google', 'Google Pay'],
            ['card',   'Картка'],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setMethod(id)} style={{
              padding:'16px 18px', borderRadius: 14,
              background: method === id ? 'rgba(229,20,42,0.08)' : 'rgba(255,255,255,0.03)',
              border:'1px solid ' + (method === id ? 'rgba(229,20,42,0.5)' : 'var(--border)'),
              color: method === id ? '#FF8090' : 'var(--text)',
              textAlign:'left', cursor:'pointer', fontWeight: 600, fontSize: 14,
              display:'flex', alignItems:'center', justifyContent:'space-between',
            }}>
              {label}
              <span style={{ width: 16, height: 16, borderRadius:'50%', border:'2px solid ' + (method === id ? 'var(--accent)' : 'var(--border-strong)'), background: method === id ? 'var(--accent)' : 'transparent' }}/>
            </button>
          ))}
        </div>

        {method === 'card' && (
          <div style={{ marginTop: 18, display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap: 12 }} className="card-grid">
            <input className="input" placeholder="Номер картки" defaultValue="4242 4242 4242 4242"/>
            <input className="input" placeholder="MM/YY" defaultValue="04/28"/>
            <input className="input" placeholder="CVV" defaultValue="•••"/>
            <style>{`@media (max-width: 560px) { .card-grid { grid-template-columns: 1fr !important; } }`}</style>
          </div>
        )}

        <div style={{ marginTop: 20, padding: 16, background:'rgba(255,255,255,0.02)', borderRadius: 12, border:'1px solid var(--border)', fontSize: 13, color:'var(--text-dim)', display:'flex', justifyContent:'space-between' }}>
          <span>Сума до сплати</span>
          <strong style={{ color:'var(--text)', fontSize: 18 }}>{total} ₴</strong>
        </div>

        <div style={{ marginTop: 18, display:'flex', gap: 10 }}>
          <button className="btn btn-ghost btn-lg" onClick={() => setStep(1)}><Icon.left size={12}/> Назад</button>
          <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => { setStep(3); setTimeout(() => setStep(4), 1100); }}>
            Сплатити {total} ₴ <Icon.right size={14}/>
          </button>
        </div>
        <style>{`@media (max-width: 560px) { .pay-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    );

    if (step === 3) return (
      <div className="card" style={{ padding: 60, textAlign:'center' }}>
        <div style={{ display:'inline-block', width: 60, height: 60, borderRadius:'50%', border:'3px solid rgba(229,20,42,0.2)', borderTopColor:'var(--accent)', animation:'spin 0.8s linear infinite' }}/>
        <h2 style={{ marginTop: 20 }}>Обробка платежу…</h2>
        <p style={{ marginTop: 8, color:'var(--text-mute)' }}>Не закривай сторінку.</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

    if (step === 4) return (
      <div className="card" style={{ padding: 40, textAlign:'center', background:'radial-gradient(50% 60% at 50% 0%, rgba(93,211,158,0.10), transparent 60%), linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.005))' }}>
        <div style={{ display:'inline-flex', width: 64, height: 64, borderRadius:'50%', background:'rgba(93,211,158,0.15)', alignItems:'center', justifyContent:'center', color:'var(--success)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
        </div>
        <h2 style={{ marginTop: 18 }}>Квитки успішно придбано</h2>
        <p style={{ marginTop: 8, color:'var(--text-mute)' }}>{user ? `Квиток надіслано на ${form.email} та збережено в «Профілі → Мої квитки».` : `Квиток надіслано на ${form.email}. Для збереження у профілі — увійди в акаунт.`}</p>

        {/* QR ticket */}
        <div style={{ marginTop: 28, maxWidth: 380, marginInline:'auto', padding: 24, background:'#fff', color:'#08080C', borderRadius: 18, textAlign:'left', position:'relative' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <div style={{ fontSize: 10, letterSpacing:'0.18em', color:'#888' }}>LUMINA CINEMA</div>
              <div style={{ marginTop: 4, fontSize: 18, fontWeight: 700 }}>{movie.title}</div>
            </div>
            <span style={{ padding:'4px 10px', borderRadius: 999, background:'#08080C', color:'#fff', fontSize: 11, fontWeight: 700 }}>{showtime.format}</span>
          </div>
          <hr style={{ margin:'16px 0', border:'none', borderTop:'1px dashed #ccc' }}/>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10, fontSize: 13 }}>
            <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Дата</div>{DATE_TODAY}</div>
            <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Час</div>{showtime.time}</div>
            <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Кінотеатр</div>{CINEMA}</div>
            <div><div style={{ fontSize: 10, color:'#999', textTransform:'uppercase' }}>Зал · Місця</div>{showtime.hall} · F-8, F-9</div>
          </div>
          {/* fake QR */}
          <div style={{ marginTop: 18, width: 160, height: 160, marginInline:'auto', background:
            `repeating-conic-gradient(#08080C 0 25%, #fff 0 50%) 0 0 / 16px 16px,
             radial-gradient(circle, #08080C 35%, transparent 36%) 0 0 / 24px 24px`,
            borderRadius: 8,
          }}/>
          <div style={{ marginTop: 12, fontSize: 11, color:'#999', textAlign:'center' }}>№ KP-{Date.now().toString().slice(-8)}</div>
        </div>

        <div style={{ marginTop: 28, display:'flex', gap: 10, justifyContent:'center', flexWrap:'wrap' }}>
          {user ? (
            <button className="btn btn-primary" onClick={() => navigate('profile-tickets')}>Переглянути квитки <Icon.right size={12}/></button>
          ) : (
            <button className="btn btn-primary" onClick={() => openAuth('register')}>Зберегти в акаунті</button>
          )}
          <button className="btn btn-ghost">Завантажити QR-квиток</button>
          <button className="btn btn-ghost" onClick={() => navigate('home')}>На головну</button>
        </div>
      </div>
    );
  };

  return (
    <section style={{ paddingTop: 32, paddingBottom: 60 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <button onClick={() => navigate('seats', { id: movie.id, time: showtime.time })} className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }}>
          <Icon.left size={12}/> Назад
        </button>

        {/* Step indicator */}
        <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 24, flexWrap:'wrap' }}>
          {steps.map((s, i) => (
            <React.Fragment key={s}>
              <div style={{
                display:'inline-flex', alignItems:'center', gap: 8,
                padding:'8px 14px', borderRadius: 999, fontSize: 13,
                background: i === idx ? 'rgba(229,20,42,0.12)' : i < idx ? 'rgba(93,211,158,0.08)' : 'rgba(255,255,255,0.04)',
                border:'1px solid ' + (i === idx ? 'rgba(229,20,42,0.45)' : i < idx ? 'rgba(93,211,158,0.3)' : 'var(--border)'),
                color: i === idx ? '#FF8090' : i < idx ? 'var(--success)' : 'var(--text-mute)',
                fontWeight: 600,
              }}>
                <span style={{ width: 18, height: 18, borderRadius:'50%', background:'currentColor', color:'#08080C', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight: 700 }}>
                  {i < idx ? '✓' : i+1}
                </span>
                {s}
              </div>
              {i < steps.length-1 && <Icon.right size={12}/>}
            </React.Fragment>
          ))}
        </div>

        {/* Movie summary */}
        <div className="card" style={{ padding: 16, marginBottom: 18, display:'flex', alignItems:'center', gap: 14 }}>
          <div style={{ width: 56, height: 78, borderRadius: 8, ...posterStyle(movie.poster.h, movie.poster.h2), flexShrink: 0 }}/>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{movie.title}</div>
            <div style={{ fontSize: 12, color:'var(--text-mute)', marginTop: 4 }}>{DATE_TODAY} • {showtime.time} • {showtime.hall} · {showtime.format} • F-8, F-9</div>
          </div>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em' }}>Сума</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{total} ₴</div>
          </div>
        </div>

        <Step/>
      </div>
    </section>
  );
}

Object.assign(window, { CheckoutPage });
