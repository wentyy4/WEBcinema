// Quick booking widget — fully working
function BookingWidget({ navigate, vertical }) {
  const [movieId, setMovieId] = React.useState('m4');
  const [dateId, setDateId] = React.useState('today');
  const [time, setTime]     = React.useState('19:10');

  const movie = MOVIES.find(m => m.id === movieId);
  const date  = DATES.find(d => d.id === dateId);
  const times = SHOWTIMES[movieId] || [];

  // Auto-correct time if movie has no current time
  React.useEffect(() => {
    if (!times.find(t => t.time === time)) setTime(times[0]?.time || '');
  }, [movieId]);

  const Field = ({ label, value, options, onPick }) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef(null);
    React.useEffect(() => {
      const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener('mousedown', onDoc);
      return () => document.removeEventListener('mousedown', onDoc);
    }, []);
    return (
      <div ref={ref} className="booking-field" style={{ position:'relative', flex: 1, minWidth: 0 }}>
        <button className="booking-field-button" onClick={() => setOpen(v => !v)} style={{
          width:'100%', textAlign:'left',
          height: 64, padding: '10px 16px',
          background: open ? 'rgba(229,20,42,0.06)' : 'rgba(255,255,255,0.03)',
          border:'1px solid ' + (open ? 'rgba(229,20,42,0.55)' : 'var(--border)'),
          borderRadius: 14, color:'var(--text)',
          display:'flex', flexDirection:'column', justifyContent:'center', gap: 2,
          cursor:'pointer',
        }}>
          <div style={{ fontSize: 11, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--text-mute)', fontWeight:600 }}>{label}</div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap: 8 }}>
            <span style={{ fontSize: 14, fontWeight: 600, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{value}</span>
            <span style={{ color:'var(--text-mute)', transform: open ? 'rotate(180deg)' : 'none', transition:'transform .15s' }}><Icon.chevron size={14}/></span>
          </div>
        </button>
        {open && (
          <div style={{
            position:'absolute', top: '100%', left: 0, right: 0, marginTop: 6, zIndex: 120,
            background:'#15171F', border:'1px solid var(--border-strong)', borderRadius: 14,
            boxShadow:'var(--shadow-md)', overflow:'hidden', maxHeight: 320, overflowY:'auto',
          }}>
            {options.map(o => (
              <button key={o.value} onClick={() => { onPick(o.value); setOpen(false); }} style={{
                width:'100%', textAlign:'left', padding:'12px 16px', fontSize: 14,
                background: o.value === value || o.label === value ? 'rgba(229,20,42,0.10)' : 'transparent',
                color: o.value === value || o.label === value ? '#FF8090' : 'var(--text)',
                border:'none', borderBottom:'1px solid var(--border)', cursor:'pointer',
              }}>{o.label}</button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const submit = () => {
    navigate('seats', { id: movieId, time: time });
  };

  return (
    <>
      <div className="glass booking-widget" style={{
        borderRadius: 22, padding: 16,
        display:'grid',
        gridTemplateColumns: vertical ? '1fr' : '1.7fr 1.1fr 0.9fr auto',
        gap: 10, alignItems:'center',
        boxShadow:'0 30px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}>
        <Field label="Фільм" value={movie?.title} onPick={setMovieId}
          options={MOVIES.map(m => ({ value: m.id, label: m.title }))}/>
        <Field label="Дата" value={`${date?.label}, ${date?.date}`} onPick={setDateId}
          options={DATES.map(d => ({ value: d.id, label: `${d.label}, ${d.date}` }))}/>
        <Field label="Час сеансу" value={time || '—'} onPick={setTime}
          options={times.map(t => ({ value: t.time, label: `${t.time} · ${t.format}` }))}/>
        <button className="btn btn-primary btn-lg booking-submit" style={{ height: 64, padding:'0 22px', borderRadius: 14 }} onClick={submit}>
          <Icon.search size={14}/>
          Знайти квитки
        </button>
      </div>
      <style>{`
        @media (max-width: 920px) {
          .booking-widget {
            grid-template-columns: 1fr 1fr !important;
          }
          .booking-submit {
            grid-column: 1 / -1;
            width: 100%;
          }
        }
        @media (max-width: 620px) {
          .booking-widget {
            grid-template-columns: 1fr !important;
            padding: 12px !important;
            border-radius: 18px !important;
            gap: 8px !important;
          }
          .booking-field-button,
          .booking-submit {
            height: 58px !important;
            border-radius: 12px !important;
          }
          .booking-submit {
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
}

Object.assign(window, { BookingWidget });
