// Poster placeholder — abstract cinematic art with title overlay
function Poster({ movie, size = 'md', showTitle = true, noDim = false, children }) {
  const p = movie.poster;
  const style = posterStyle(p.h, p.h2);
  const noDimStyle = noDim ? {
    background: `
      linear-gradient(160deg, hsl(${p.h},86%,62%) 0%, hsl(${p.h2},82%,50%) 100%)
    `,
  } : {};
  return (
    <div className={'poster' + (noDim ? ' poster-no-dim' : '')} style={{ ...style, ...noDimStyle }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(${p.h * 1.7 % 180}deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 6px)`,
        mixBlendMode: 'overlay'
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '14px 14px 12px',
        zIndex: 2
      }}>
        {showTitle &&
        <>
            <div style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.55)', fontWeight: 600, marginBottom: 4 }}>
              {movie.original?.toUpperCase()}
            </div>
          </>
        }
      </div>
      <div style={{
        position: 'absolute', top: 10, left: 10, right: 10,
        display: 'flex', gap: 6, flexWrap: 'wrap', zIndex: 2
      }}>
        {movie.formats?.slice(0, 2).map((f) =>
        <span key={f} className={'badge ' + (f === 'IMAX' ? 'imax' : f === 'Premium' ? 'premium' : f === 'Dolby Atmos' ? 'atmos' : f === '3D' ? 'd3' : '')} style={{ margin: "0px", borderWidth: "0px", fontWeight: "600" }}>{f}</span>
        )}
      </div>
      {children}
    </div>);

}

// Lumina logo mark
function Logo({ size = 28 }) {
  const markSize = Math.max(size, 26);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text)' }}>
      <div
        aria-label="Lumina"
        style={{
          width: markSize,
          height: markSize,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          flex: '0 0 auto',
          background: 'linear-gradient(145deg, var(--accent-hi), var(--accent) 58%, var(--accent-lo))',
          color: '#fff',
          fontSize: Math.round(markSize * 0.54),
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: 0,
          boxShadow: '0 8px 24px rgba(229,20,42,0.34), inset 0 1px 0 rgba(255,255,255,0.2)'
        }}
      >
        L
      </div>
      <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '0.18em' }}>Lumina</div>
    </div>);

}

// Rating + meta line
function MovieMeta({ movie, mute }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: mute ? 'var(--text-mute)' : 'var(--text-dim)', flexWrap: 'wrap' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--accent-hi)' }}>
        <Icon.star size={12} /> {movie.rating}
      </span>
      <span>•</span>
      <span>{movie.genres.join(', ')}</span>
      <span>•</span>
      <span>{movie.duration}</span>
      <span className="badge age">{movie.age}</span>
    </div>);

}

// Stub navigation link
function NavLink({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        color: active ? 'var(--text)' : 'var(--text-dim)',
        padding: '10px 12px',
        height: 40,
        fontSize: 14,
        lineHeight: 1,
        fontWeight: active ? 600 : 500,
        position: 'relative',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        whiteSpace: 'nowrap'
      }}>
      
      {children}
      {active && <span style={{
        position: 'absolute', left: 10, right: 10, bottom: 2, height: 2,
        background: 'linear-gradient(90deg, #FF3340, #A60E20)',
        borderRadius: 2
      }} />}
    </button>);

}

// Section header
function SectionHeader({ eyebrow, title, action }) {
  return (
    <div className="section-title-row fade-up">
      <div>
        {eyebrow && <div className="eyebrow" style={{ marginBottom: 8 }}>{eyebrow}</div>}
        <h2>{title}</h2>
      </div>
      {action}
    </div>);

}

// City pill
function CityPill({ city = CITY, onClick }) {
  return (
    <button className="chip" onClick={onClick} style={{ height: 38 }}>
      <Icon.pin size={14} />
      {city}
      <Icon.chevron size={12} />
    </button>);

}

Object.assign(window, { Poster, Logo, MovieMeta, NavLink, SectionHeader, CityPill });
