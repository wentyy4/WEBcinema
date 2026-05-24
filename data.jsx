// Shared data + icons for LUMINA Cinema prototype
// All UI text in Ukrainian unless brand/format name.

const DATE_TODAY = 'Сьогодні, Сб, 16.05';
const CITY = 'Київ';
const CINEMA = 'Lumina 11 SkyMall';

const DATES = [
  { id: 'today',    label: 'Сьогодні',  dow: 'Сб', date: '16.05' },
  { id: 'tom',      label: 'Завтра',    dow: 'Нд', date: '17.05' },
  { id: 'mon',      label: 'Понеділок', dow: 'Пн', date: '18.05' },
  { id: 'tue',      label: 'Вівторок',  dow: 'Вт', date: '19.05' },
  { id: 'wed',      label: 'Середа',    dow: 'Ср', date: '20.05' },
  { id: 'thu',      label: 'Четвер',    dow: 'Чт', date: '21.05' },
  { id: 'fri',      label: 'П’ятниця',  dow: 'Пт', date: '22.05' },
];

// Poster art generator — abstract cinematic gradients (no fake brand art)
function posterStyle(hue, hue2, label) {
  return {
    background: `
      radial-gradient(120% 80% at 30% 20%, hsla(${hue},80%,55%,0.85), transparent 55%),
      radial-gradient(140% 100% at 80% 90%, hsla(${hue2},70%,40%,0.9), transparent 60%),
      linear-gradient(160deg, hsl(${hue},45%,18%), hsl(${hue2},50%,8%))
    `,
  };
}

const MOVIES = [
  {
    id: 'm1', title: 'Останній обрій', original: 'The Last Horizon',
    genres: ['Фантастика', 'Драма'], duration: '2 год 14 хв',
    rating: 8.4, age: '16+', lang: 'Українською',
    formats: ['IMAX', 'Premium', '2D'],
    poster: { h: 18, h2: 280, label: 'ОБРІЙ' },
    short: 'Космічна одіссея про межі людської пам’яті та шанс розпочати все спочатку.',
    director: 'Олена Демченко',
    cast: ['Андрій Сеітаблаєв', 'Ірма Вітовська', 'Олексій Тритенко', 'Дар’я Плахтій'],
    release: '15 травня 2026',
  },
  {
    id: 'm2', title: 'Темна гавань', original: 'Dark Harbor',
    genres: ['Триллер'], duration: '1 год 58 хв',
    rating: 7.9, age: '18+', lang: 'Мовою оригіналу • Укр субтитри',
    formats: ['Dolby Atmos', '2D'],
    poster: { h: 200, h2: 220, label: 'ГАВАНЬ' },
    short: 'Детектив повертається до рідного містечка, де минуле відмовляється лежати на дні.',
    director: 'Мирослав Слабошпицький',
    cast: ['Римма Зюбіна', 'Євген Нищук'],
    release: '8 травня 2026',
  },
  {
    id: 'm3', title: 'Літо у вишневому саду', original: 'Summer in the Cherry Orchard',
    genres: ['Драма', 'Романтика'], duration: '2 год 02 хв',
    rating: 8.1, age: '12+', lang: 'Українською',
    formats: ['Premium', '2D'],
    poster: { h: 340, h2: 10, label: 'ВИШНІ' },
    short: 'Тиха історія однієї родини, у якої залишилось одне останнє літо разом.',
    director: 'Антоніо Лукіч',
    cast: ['Наталка Сумська', 'Анатолій Хостікоєв'],
    release: '1 травня 2026',
  },
  {
    id: 'm4', title: 'Нейроніч', original: 'Neuronight',
    genres: ['Бойовик', 'Кіберпанк'], duration: '2 год 22 хв',
    rating: 8.6, age: '16+', lang: 'Українською',
    formats: ['IMAX', '4DX', 'Dolby Atmos', '3D'],
    poster: { h: 260, h2: 320, label: 'НЕЙРО' },
    short: 'У 2049-му пам’ять стала валютою. Дві хакерки вирішують пограбувати найбільший банк свідомості.',
    director: 'Юрій Речинський',
    cast: ['Даша Малахова', 'Тарас Цимбалюк'],
    release: '16 травня 2026',
  },
  {
    id: 'm5', title: 'Маленькі дракони', original: 'Little Dragons',
    genres: ['Анімація', 'Сім’я'], duration: '1 год 32 хв',
    rating: 8.0, age: '6+', lang: 'Українською',
    formats: ['2D', '3D'],
    poster: { h: 30, h2: 50, label: 'ДРАКОНИ' },
    short: 'Троє кошенят дракончиків шукають загублену маму через сім чарівних небес.',
    director: 'Студія «Літак»',
    cast: [],
    release: '10 травня 2026',
  },
  {
    id: 'm6', title: 'Поза кадром', original: 'Off Frame',
    genres: ['Комедія'], duration: '1 год 44 хв',
    rating: 7.5, age: '16+', lang: 'Українською',
    formats: ['2D'],
    poster: { h: 50, h2: 30, label: 'ПОЗА' },
    short: 'Знімальна група другорядного серіалу випадково знімає справжній злочин.',
    director: 'Любомир Левицький',
    cast: ['Дмитро Хоменко', 'Анна Кошмал'],
    release: '24 квітня 2026',
  },
  {
    id: 'm7', title: 'Скляне місто', original: 'Glass City',
    genres: ['Драма', 'Триллер'], duration: '2 год 08 хв',
    rating: 8.2, age: '16+', lang: 'Мовою оригіналу • Укр субтитри',
    formats: ['IMAX', '2D'],
    poster: { h: 210, h2: 195, label: 'СКЛО' },
    short: 'Архітектор будує ідеальне місто. Воно починає переписувати тих, хто в ньому живе.',
    director: 'Дені Вільнев (укр прокат)',
    cast: [],
    release: '22 травня 2026',
  },
  {
    id: 'm8', title: 'Гірський вітер', original: 'Mountain Wind',
    genres: ['Драма'], duration: '1 год 50 хв',
    rating: 7.8, age: '12+', lang: 'Українською',
    formats: ['Premium', '2D'],
    poster: { h: 130, h2: 160, label: 'ВІТЕР' },
    short: 'Гуцульське село, тиха правда і одна гора, з якої видно все.',
    director: 'Марина Степанська',
    cast: [],
    release: '29 травня 2026',
  },
];

const COMING_SOON = [
  { id: 'cs1', title: 'Орбіта 9', date: '30 травня', poster: { h: 220, h2: 260, label: 'ОРБІТА' }, genres: ['Фантастика'] },
  { id: 'cs2', title: 'Дві зими', date: '6 червня', poster: { h: 200, h2: 240, label: 'ЗИМИ' }, genres: ['Драма'] },
  { id: 'cs3', title: 'Кіт і компанія', date: '12 червня', poster: { h: 35, h2: 60, label: 'КІТ' }, genres: ['Сім’я'] },
  { id: 'cs4', title: 'Червоний пісок', date: '19 червня', poster: { h: 10, h2: 30, label: 'ПІСОК' }, genres: ['Триллер'] },
  { id: 'cs5', title: 'Хор', date: '26 червня', poster: { h: 280, h2: 320, label: 'ХОР' }, genres: ['Музична'] },
];

const SHOWTIMES = {
  m1: [
    { time: '10:40', hall: 'Зал 3', format: '2D', price: 180 },
    { time: '13:20', hall: 'IMAX',  format: 'IMAX', price: 260 },
    { time: '16:00', hall: 'Premium', format: 'Premium', price: 380, premium: true },
    { time: '19:10', hall: 'IMAX',  format: 'IMAX', price: 280 },
    { time: '22:00', hall: 'Зал 5', format: '2D', price: 210 },
  ],
  m4: [
    { time: '11:30', hall: 'Зал 2', format: '3D', price: 220 },
    { time: '14:50', hall: 'IMAX',  format: 'IMAX', price: 280 },
    { time: '17:00', hall: '4DX',  format: '4DX', price: 340 },
    { time: '18:00', hall: 'Premium', format: 'Premium', price: 420, premium: true },
    { time: '21:20', hall: 'Dolby', format: 'Dolby Atmos', price: 320 },
    { time: '00:10', hall: 'IMAX',  format: 'IMAX', price: 260 },
  ],
  m3: [
    { time: '12:00', hall: 'Зал 1', format: '2D', price: 180 },
    { time: '15:30', hall: 'Premium', format: 'Premium', price: 360, premium: true },
    { time: '18:40', hall: 'Зал 4', format: '2D', price: 200 },
  ],
  m2: [
    { time: '17:30', hall: 'Зал 6', format: '2D', price: 200 },
    { time: '20:10', hall: 'Dolby', format: 'Dolby Atmos', price: 290 },
    { time: '23:00', hall: 'Зал 6', format: '2D', price: 210 },
  ],
  m5: [
    { time: '09:30', hall: 'Зал 7', format: '2D', price: 160 },
    { time: '11:40', hall: 'Зал 7', format: '3D', price: 210 },
    { time: '14:00', hall: 'Зал 2', format: '2D', price: 180 },
  ],
  m6: [
    { time: '13:15', hall: 'Зал 4', format: '2D', price: 190 },
    { time: '19:50', hall: 'Зал 5', format: '2D', price: 220 },
  ],
  m7: [
    { time: '16:30', hall: 'IMAX', format: 'IMAX', price: 270 },
    { time: '21:00', hall: 'IMAX', format: 'IMAX', price: 290 },
  ],
  m8: [
    { time: '14:20', hall: 'Premium', format: 'Premium', price: 350, premium: true },
    { time: '19:30', hall: 'Premium', format: 'Premium', price: 380, premium: true },
  ],
};

const CINEMAS = [
  {
    id: 'sky', name: 'Lumina 11 SkyMall',
    address: 'просп. Генерала Ватутіна, 2Т, Київ',
    hours: '09:00 — 02:00',
    halls: 11, formats: ['IMAX', '4DX', 'Dolby Atmos', 'Premium', '3D', '2D'],
    features: ['premium', 'food', 'access', 'parking'],
    metro: 'Лісова',
  },
];

const FOOD_CATEGORIES = ['Попкорн', 'Напої', 'Комбо', 'Бургери', 'Снеки', 'Десерти'];

const FOOD_ITEMS = [
  { id: 'f1', cat: 'Попкорн', name: 'Карамельний попкорн L', desc: 'Свіжообсмажений, з ноткою морської солі.', price: 145, hue: 38 },
  { id: 'f2', cat: 'Попкорн', name: 'Сирний попкорн M',     desc: 'Хрустка скоринка з пармезаном.',           price: 125, hue: 42 },
  { id: 'f3', cat: 'Попкорн', name: 'Класичний попкорн XL', desc: 'Той самий, тільки більший.',               price: 165, hue: 30 },
  { id: 'f4', cat: 'Напої',   name: 'Лимонад «Чорнобривці»', desc: 'Власна рецептура, 0,5 л.',                price: 95,  hue: 60 },
  { id: 'f5', cat: 'Напої',   name: 'Холодний еспресо тонік', desc: 'Подвійний еспресо, тонік, лід.',         price: 110, hue: 22 },
  { id: 'f6', cat: 'Напої',   name: 'Гаряча кава лате',     desc: 'Українська обсмажка, 300 мл.',             price: 90,  hue: 28 },
  { id: 'f7', cat: 'Комбо',   name: 'Комбо «Для двох»',     desc: '2 попкорни L + 2 напої 0,5 л.',            price: 320, hue: 38 },
  { id: 'f8', cat: 'Комбо',   name: 'Комбо «Сімейне»',      desc: 'XL попкорн + 4 напої + солодке.',          price: 540, hue: 36 },
  { id: 'f9', cat: 'Бургери', name: 'Бургер «Кіно класик»',  desc: 'Яловичина, сир чеддер, мариновані огірки.', price: 240, hue: 16 },
  { id: 'f10',cat: 'Бургери', name: 'Бургер «Веган»',       desc: 'Котлета з нуту, авокадо, томати чері.',   price: 220, hue: 90 },
  { id: 'f11',cat: 'Снеки',   name: 'Курячі стріпси',       desc: 'З соусом BBQ або медово-гірчичним.',      price: 195, hue: 26 },
  { id: 'f12',cat: 'Снеки',   name: 'Начос з сальсою',      desc: 'Хрусткі чіпси, сальса, гуакамоле.',        price: 175, hue: 18 },
  { id: 'f13',cat: 'Десерти', name: 'Шоколадний фондан',    desc: 'З кулькою морозива «вершки».',             price: 165, hue: 14 },
  { id: 'f14',cat: 'Десерти', name: 'Мак з малиною',        desc: 'Французський десерт, малинова начинка.',  price: 120, hue: 340 },
];

const FAQ = [
  { cat: 'Квитки та оплата', items: [
    { q: 'Як купити квиток онлайн?', a: 'Оберіть фільм, кінотеатр і сеанс на сайті, оберіть місця у залі та оплатіть карткою або Apple Pay / Google Pay. Квиток автоматично прийде на електронну пошту й буде у застосунку Lumina.' },
    { q: 'Які способи оплати ви приймаєте?', a: 'Visa, Mastercard, Apple Pay, Google Pay та подарункові сертифікати.' },
    { q: 'Чи можна купити квиток без реєстрації?', a: 'Так, для одноразового замовлення достатньо вказати email і телефон. Реєстрація додає історію переглядів і збереження цифрових квитків.' },
  ]},
  { cat: 'Повернення квитків', items: [
    { q: 'За скільки часу можна повернути квиток?', a: 'Не пізніше ніж за 4 години до початку сеансу. Кошти повертаються тим самим способом протягом 3 банківських днів.' },
    { q: 'Як повернути квиток?', a: 'У профілі або застосунку → «Квитки» → «Повернути». На касі — лише квитки, придбані готівкою.' },
  ]},
  { cat: 'Розклад сеансів', items: [
    { q: 'Коли з’являється розклад на новий тиждень?', a: 'Як правило, у середу ввечері публікується розклад на наступний тиждень (з п’ятниці).' },
    { q: 'Чому деякі сеанси зникають?', a: 'Зали іноді переплановують через технічні роботи. Якщо ваш сеанс скасовано — кошти повертаються автоматично.' },
  ]},
  { cat: 'Їжа та напої', items: [
    { q: 'Чи можна замовити їжу зі свого місця?', a: 'Так, відскануйте QR-код на підлокітнику в Premium-залах. У звичайних залах замовлення видається перед сеансом на барі.' },
    { q: 'Чи є вегетаріанські та безглютенові опції?', a: 'Так — є веганський бургер, начоси без глютену, фруктові десерти. Шукайте позначки в меню.' },
  ]},
  { cat: 'Premium-зали', items: [
    { q: 'Чим відрізняється Premium-зал?', a: 'Ширші крісла з електроприводом, до 1,2 м між рядами, плед і столик, окрема зона очікування, доставка їжі до місця.' },
    { q: 'Чи можна купити лише пару Premium-місць?', a: 'Так, мінімального замовлення немає — можна взяти навіть одне місце.' },
  ]},
  { cat: 'Доступність', items: [
    { q: 'Чи доступні зали для людей на кріслах колісних?', a: 'Так, у Lumina є місця для людей на кріслах колісних з безбар’єрним доступом і ліфтами.' },
    { q: 'Чи є сеанси з тифлокоментарем?', a: 'Так, окремі сеанси з тифлокоментарем і субтитрами помічені у фільтрах «Доступність».' },
  ]},
  { cat: 'Акаунт і застосунок', items: [
    { q: 'Що дає профіль Lumina?', a: 'Історію переглядів, цифрові квитки, швидке бронювання улюблених місць і збережені контактні дані.' },
    { q: 'Де завантажити застосунок?', a: 'У App Store і Google Play — шукайте «Lumina Cinema».' },
  ]},
];

// SVG icon set
const Icon = {
  search: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
    </svg>
  ),
  chevron: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  right: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 6 6 6-6 6"/>
    </svg>
  ),
  left: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m15 6-6 6 6 6"/>
    </svg>
  ),
  pin: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-6.5-7-12a7 7 0 0 1 14 0c0 5.5-7 12-7 12Z"/><circle cx="12" cy="9" r="2.5"/>
    </svg>
  ),
  user: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>
    </svg>
  ),
  ticket: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"/><path d="M9 6v12" strokeDasharray="2 2"/>
    </svg>
  ),
  play: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  ),
  star: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
  ),
  clock: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>
    </svg>
  ),
  globe: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>
    </svg>
  ),
  burger: (p={}) => (
    <svg width={p.size||22} height={p.size||22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 7h16M4 12h16M4 17h16"/>
    </svg>
  ),
  close: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 6l12 12M18 6L6 18"/>
    </svg>
  ),
  plus: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M12 5v14M5 12h14"/>
    </svg>
  ),
  minus: (p={}) => (
    <svg width={p.size||14} height={p.size||14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <path d="M5 12h14"/>
    </svg>
  ),
  popcorn: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M5 9h14l-1.5 12h-11Z"/><path d="M6 9a2.5 2.5 0 0 1 .5-4.9 2.5 2.5 0 0 1 4.7-1.2 2.5 2.5 0 0 1 4.6.7A2.5 2.5 0 0 1 18 9"/>
    </svg>
  ),
  parking: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <rect x="4" y="4" width="16" height="16" rx="3"/><path d="M10 17V8h3.5a2.5 2.5 0 0 1 0 5H10"/>
    </svg>
  ),
  access: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4.5" r="1.8"/><path d="M9 8h6l-1.5 5H11l3.5 7"/><path d="M8 14a5 5 0 1 0 6 6"/>
    </svg>
  ),
  food: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11h18l-2 9H5z"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  diamond: (p={}) => (
    <svg width={p.size||16} height={p.size||16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M2 9h20M9 3 7 9l5 12M15 3l2 6-5 12"/>
    </svg>
  ),
  qr: (p={}) => (
    <svg width={p.size||18} height={p.size||18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
      <path d="M14 14h3v3h-3zM20 14h1v1h-1zM14 20h3v1h-3zM20 17h1v4"/>
    </svg>
  ),
};

// Cinema technologies — strong UX focus
const TECH = [
  { id: 'imax',    name: 'IMAX',         tag: 'Найбільший екран', desc: 'Більший екран, глибше занурення. До 23 м заввишки.', hue: 220, badgeClass: 'imax' },
  { id: '4dx',     name: '4DX',          tag: 'Кіно як атракціон', desc: 'Рух крісел, вітер, вода та запахи — синхронно з фільмом.', hue: 350, badgeClass: 'dx4' },
  { id: 'atmos',   name: 'Dolby Atmos',  tag: 'Звук навколо тебе', desc: '64.4 канали об\u2019ємного звуку. Кожна деталь чути.', hue: 270, badgeClass: 'atmos' },
  { id: '3d',      name: '3D',           tag: 'Глибина зображення', desc: 'Яскраве та чітке 3D без втрати яскравості.', hue: 130, badgeClass: 'd3' },
  { id: 'premium', name: 'Premium-зали', tag: 'Більше комфорту', desc: 'Реклайнери, плед, доставка їжі до місця.', hue: 0, badgeClass: 'premium' },
  { id: 'comfort', name: 'Комфортні крісла', tag: 'Зручність у деталях', desc: 'Широкі підлокітники, підставки для напоїв, USB.', hue: 30, badgeClass: '' },
];

// Minimal real translation dictionary — applies to nav + key CTAs
const T = {
  UA: {
    nav: ['Фільми', 'Розклад', 'Незабаром', 'Їжа та напої', 'Premium-зали', 'Акції', 'FAQ'],
    buyTickets: 'Купити квитки',
    myAccount: 'Профіль',
    findTickets: 'Знайти квитки',
    todayMovies: 'Переглянути розклад',
    trailer: 'Дивитися трейлер',
    details: 'Детальніше',
    chooseSeats: 'Обрати місця',
    bookPremium: 'Забронювати Premium-місця',
    orderFood: 'Замовити їжу',
  },
  EN: {
    nav: ['Movies', 'Schedule', 'Coming soon', 'Food & Drinks', 'Premium halls', 'Offers', 'FAQ'],
    buyTickets: 'Buy tickets',
    myAccount: 'Profile',
    findTickets: 'Find tickets',
    todayMovies: 'View schedule',
    trailer: 'Watch trailer',
    details: 'Details',
    chooseSeats: 'Choose seats',
    bookPremium: 'Book Premium seats',
    orderFood: 'Order food',
  },
};

// Mock past purchase for logged-in user (recent history)
const PAST_TICKETS = [
  {
    id: 'pt1', movieId: 'm3', date: 'Чт, 8 травня 2026', time: '20:10', cinema: CINEMA, hall: 'Premium-зал', seats: 'Ряд H, місця 9–10', sum: 720, status: 'used',
  },
  {
    id: 'pt2', movieId: 'm1', date: 'Нд, 4 травня 2026', time: '19:10', cinema: CINEMA, hall: 'IMAX', seats: 'Ряд D, місце 7', sum: 280, status: 'used',
  },
  {
    id: 'pt3', movieId: 'm2', date: 'Сб, 26 квітня 2026', time: '17:30', cinema: CINEMA, hall: 'Зал 6', seats: 'Ряд F, місця 11–12', sum: 400, status: 'used',
  },
  {
    id: 'pt4', movieId: 'm6', date: 'Сб, 19 квітня 2026', time: '13:15', cinema: CINEMA, hall: 'Зал 4', seats: 'Ряд C, місце 5', sum: 190, status: 'refunded',
  },
];

// Mock upcoming active ticket (pre-purchased before user opens prototype)
const UPCOMING_TICKETS = [
  {
    id: 'ut1', movieId: 'm4', date: 'Сб, 16 травня 2026', time: '19:30', cinema: CINEMA, hall: 'Зал 4, Dolby Atmos', seats: 'Ряд 6, місця 7–8', sum: 520, status: 'active',
  },
];

const DEMO_USER = {
  name: 'Олександр Коваленко',
  initials: 'ОК',
  email: 'oleksandr.kovalenko@email.com',
  phone: '+380 67 123 45 67',
  favoriteCinema: CINEMA,
  member: '2024',
};

Object.assign(window, {
  DATE_TODAY, CITY, CINEMA, DATES, MOVIES, COMING_SOON, SHOWTIMES, CINEMAS, FOOD_CATEGORIES, FOOD_ITEMS, FAQ, TECH, T, Icon, posterStyle
});
