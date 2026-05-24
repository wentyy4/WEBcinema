// AuthContext + AuthModal — guest/logged-in state, login + register
const AuthContext = React.createContext({ user: null, login: () => {}, logout: () => {}, openAuth: () => {}, tickets: [], history: [], addTicket: () => {} });

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null); // null = guest
  const [authView, setAuthView] = React.useState(null); // 'login' | 'register' | null
  const [tickets, setTickets] = React.useState([]);    // upcoming
  const [history, setHistory] = React.useState([]);    // used / refunded

  const login = (data = {}) => {
    setUser({ ...DEMO_USER, ...data });
    // seed mock tickets
    setTickets(UPCOMING_TICKETS);
    setHistory(PAST_TICKETS);
    setAuthView(null);
  };
  const logout = () => { setUser(null); setTickets([]); setHistory([]); };
  const openAuth = (view = 'login') => setAuthView(view);
  const closeAuth = () => setAuthView(null);

  const addTicket = (t) => setTickets(arr => [t, ...arr]);

  return (
    <AuthContext.Provider value={{ user, login, logout, openAuth, tickets, history, addTicket }}>
      {children}
      {authView && <AuthModal view={authView} setView={setAuthView} onClose={closeAuth} login={login}/>}
    </AuthContext.Provider>
  );
}

function useAuth() { return React.useContext(AuthContext); }

function AuthModal({ view, setView, onClose, login }) {
  const isLogin = view === 'login';
  const [form, setForm] = React.useState({
    name: '', email: 'oleksandr.kovalenko@email.com', phone: '+380 67 123 45 67', password: '••••••••', confirm: '••••••••',
  });

  const submit = (e) => {
    e.preventDefault();
    login({ email: form.email, ...(form.name && { name: form.name }) });
  };

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset: 0, zIndex: 200,
      background:'rgba(8,8,12,0.78)', backdropFilter:'blur(10px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding: 20,
      animation:'fade-up .2s ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width:'100%', maxWidth: 440,
        background:'linear-gradient(180deg, #15171F, #0E0F15)',
        border:'1px solid var(--border-strong)',
        borderRadius: 22, padding: 32, position:'relative',
        boxShadow:'0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(229,20,42,0.08)',
      }}>
        <button onClick={onClose} style={{
          position:'absolute', top: 16, right: 16,
          width: 36, height: 36, borderRadius: 10,
          background:'rgba(255,255,255,0.04)', border:'1px solid var(--border)',
          color:'var(--text)', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
        }}>
          <Icon.close size={16}/>
        </button>

        <div style={{ display:'flex', alignItems:'center', gap: 12, marginBottom: 4 }}>
          <Logo size={26}/>
        </div>
        <h2 style={{ fontSize: 26, marginTop: 18 }}>
          {isLogin ? 'Увійти в акаунт' : 'Створити акаунт'}
        </h2>
        <p style={{ marginTop: 8, color:'var(--text-mute)', fontSize: 13.5 }}>
          {isLogin
            ? 'Швидке бронювання, цифрові квитки і твій кінотеатр.'
            : 'Створи профіль, щоб зберігати квитки та історію покупок.'}
        </p>

        <form onSubmit={submit} style={{ marginTop: 22, display:'flex', flexDirection:'column', gap: 12 }}>
          {!isLogin && (
            <Field label="Ім’я" value={form.name} onChange={v => setForm({...form, name: v})} placeholder="Олександр Коваленко"/>
          )}
          <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} type="email"/>
          {!isLogin && (
            <Field label="Телефон" value={form.phone} onChange={v => setForm({...form, phone: v})} type="tel"/>
          )}
          <Field label={isLogin ? 'Пароль' : 'Створи пароль'} value={form.password} onChange={v => setForm({...form, password: v})} type="password"/>
          {!isLogin && (
            <Field label="Повтори пароль" value={form.confirm} onChange={v => setForm({...form, confirm: v})} type="password"/>
          )}

          {isLogin && (
            <div style={{ textAlign:'right', marginTop: -4 }}>
              <a style={{ color:'var(--text-mute)', fontSize: 12, cursor:'pointer' }}>Забули пароль?</a>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-lg" style={{ width:'100%', marginTop: 6 }}>
            {isLogin ? 'Увійти' : 'Зареєструватися'}
          </button>
        </form>

        <div style={{ marginTop: 18, paddingTop: 18, borderTop:'1px solid var(--border)', textAlign:'center', fontSize: 13, color:'var(--text-mute)' }}>
          {isLogin ? (
            <>Ще не з нами? <a onClick={() => setView('register')} style={{ color:'var(--accent-hi)', cursor:'pointer', fontWeight: 600 }}>Створити акаунт</a></>
          ) : (
            <>Вже є акаунт? <a onClick={() => setView('login')} style={{ color:'var(--accent-hi)', cursor:'pointer', fontWeight: 600 }}>Увійти</a></>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <label style={{ display:'flex', flexDirection:'column', gap: 6 }}>
      <span style={{ fontSize: 11, color:'var(--text-mute)', textTransform:'uppercase', letterSpacing:'0.08em', fontWeight: 600 }}>{label}</span>
      <input className="input" value={value} type={type} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}/>
    </label>
  );
}

// Profile dropdown — used in header
function ProfileMenu({ navigate }) {
  const { user, openAuth, logout } = useAuth();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const onDoc = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const items = user ? [
    { label: 'Мої квитки', go: 'profile-tickets' },
    { label: 'Історія покупок', go: 'profile-history' },
    { label: 'Профіль', go: 'profile' },
    { label: 'Налаштування', go: 'profile-settings' },
    { divider: true },
    { label: 'Вийти', action: () => { logout(); setOpen(false); } },
  ] : [
    { label: 'Увійти', action: () => { openAuth('login'); setOpen(false); } },
    { label: 'Зареєструватися', action: () => { openAuth('register'); setOpen(false); } },
  ];

  return (
    <div ref={ref} style={{ position:'relative' }}>
      <button onClick={() => setOpen(v => !v)} className="btn btn-ghost btn-sm" style={{ height: 38, padding:'0 12px' }} title={user ? user.name : 'Профіль'}>
        {user ? (
          <span style={{
            width: 22, height: 22, borderRadius:'50%',
            background:'linear-gradient(135deg, #FF3340, #A60E20)', color:'#fff',
            display:'inline-flex', alignItems:'center', justifyContent:'center',
            fontSize: 10, fontWeight: 700,
          }}>{user.initials}</span>
        ) : (
          <Icon.user size={14}/>
        )}
        <span className="hide-md" style={{ maxWidth: 110, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
          {user ? user.name.split(' ')[0] : 'Профіль'}
        </span>
        <Icon.chevron size={12}/>
      </button>
      {open && (
        <div style={{
          position:'absolute', top: 'calc(100% + 8px)', right: 0, zIndex: 60,
          minWidth: 220, padding: 6,
          background:'rgba(15,17,25,0.95)', backdropFilter:'blur(20px)',
          border:'1px solid var(--border-strong)', borderRadius: 14,
          boxShadow:'0 20px 60px rgba(0,0,0,0.55)',
        }}>
          {user && (
            <div style={{ padding:'12px 12px 14px', borderBottom:'1px solid var(--border)', marginBottom: 6 }}>
              <div style={{ fontSize: 14, fontWeight: 700 }}>{user.name}</div>
              <div style={{ fontSize: 12, color:'var(--text-mute)', marginTop: 2 }}>{user.email}</div>
            </div>
          )}
          {items.map((it, i) => it.divider ? (
            <div key={i} style={{ height: 1, background:'var(--border)', margin:'4px 8px' }}/>
          ) : (
            <button key={i} onClick={() => { if (it.go) { navigate(it.go); setOpen(false); } else if (it.action) it.action(); }} style={{
              display:'block', width:'100%', textAlign:'left',
              padding:'10px 12px', borderRadius: 10,
              background:'transparent', border:'none', color:'var(--text)',
              fontSize: 13.5, cursor:'pointer',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(229,20,42,0.08)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

Object.assign(window, { AuthProvider, AuthContext, useAuth, ProfileMenu, AuthModal });
