function AppShell() {
  const [page, setPage] = React.useState('home');
  const [params, setParams] = React.useState({});
  const [lang, setLang] = React.useState('UA');
  const [city] = React.useState(CITY);
  const [toastMsg, setToastMsg] = React.useState(null);

  const toast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const navigate = (target, p = {}) => {
    setPage(target);
    setParams(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  let body = null;
  switch (page) {
    case 'home':     body = <HomePage navigate={navigate}/>; break;
    case 'movies':   body = <MoviesPage navigate={navigate}/>; break;
    case 'today':    // legacy alias → schedule
    case 'schedule': body = <SchedulePage navigate={navigate}/>; break;
    case 'soon':     body = <SoonPage navigate={navigate}/>; break;
    case 'movie':    body = <MoviePage navigate={navigate} movieId={params.id}/>; break;
    case 'seats':    body = <SeatPage navigate={navigate} movieId={params.id} time={params.time}/>; break;
    case 'checkout': body = <CheckoutPage navigate={navigate} movieId={params.id} time={params.time}/>; break;
    case 'food':     body = <FoodPage navigate={navigate}/>; break;
    case 'cinemas':  body = <CinemasPage navigate={navigate}/>; break;
    case 'cinema':   body = <CinemaDetailPage navigate={navigate} cinemaId={params.id}/>; break;
    case 'premium':  body = <PremiumPage navigate={navigate}/>; break;
    case 'faq':      body = <FAQPage navigate={navigate}/>; break;
    case 'news':     body = <NewsPage navigate={navigate}/>; break;
    case 'access':   body = <AccessPage navigate={navigate}/>; break;
    case 'profile':         body = <ProfilePage navigate={navigate} initialTab="profile"/>; break;
    case 'profile-tickets': body = <ProfilePage navigate={navigate} initialTab="tickets"/>; break;
    case 'profile-history': body = <ProfilePage navigate={navigate} initialTab="history"/>; break;
    case 'profile-settings':body = <ProfilePage navigate={navigate} initialTab="settings"/>; break;
    default:         body = <HomePage navigate={navigate}/>;
  }

  return (
    <div data-screen-label={'00 ' + page}>
      <Header page={page} navigate={navigate} lang={lang} setLang={setLang} city={city} toast={toast}/>
      <main>{body}</main>
      <Footer navigate={navigate} lang={lang} setLang={setLang}/>

      {toastMsg && (
        <div style={{
          position:'fixed', bottom: 24, left:'50%', transform:'translateX(-50%)', zIndex: 200,
          padding:'12px 18px', borderRadius: 12,
          background:'rgba(8,8,12,0.95)', backdropFilter:'blur(20px)',
          border:'1px solid var(--border-strong)',
          color:'var(--text)', fontSize: 13.5,
          boxShadow:'0 20px 60px rgba(0,0,0,0.5)',
          maxWidth: 'calc(100vw - 32px)',
          animation:'fade-up .3s ease both',
        }}>
          <span style={{ marginRight: 6 }}>🌐</span>{toastMsg}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppShell/>
    </AuthProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
