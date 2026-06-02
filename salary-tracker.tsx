import { useState, useEffect, useCallback } from "react";

// ── TRANSLATIONS ──────────────────────────────────────────────────────────────
const T = {
  it: {
    appName: "MioStipendio",
    appTagline: "Il tuo stipendio, sotto controllo.",
    onboarding: [
      { emoji: "⏱️", title: "Registra le tue ore", desc: "Ogni giorno aggiungi le ore lavorate in pochi secondi." },
      { emoji: "💶", title: "Calcolo netto automatico", desc: "Vedi quanto guadagni davvero, dopo contributi e tasse." },
      { emoji: "📈", title: "Proiezione fine mese", desc: "Saprai il tuo stipendio prima ancora di riceverlo." },
      { emoji: "✦",  title: "30 giorni gratis", desc: "Prova tutto gratis. Nessun addebito subito." },
    ],
    next: "Avanti",
    skip: "Salta",
    getStarted: "Inizia",
    signInGoogle: "Continua con Google",
    signInPhone: "Continua con il telefono",
    orDivider: "oppure",
    phonePlaceholder: "Numero di telefono",
    phoneNext: "Invia codice",
    otpTitle: "Inserisci il codice",
    otpDesc: "Abbiamo inviato un codice al",
    otpPlaceholder: "Codice a 6 cifre",
    otpVerify: "Verifica",
    otpResend: "Rinvia codice",
    trialBanner: "✦ Prova gratuita · {d} giorni rimanenti",
    trialExpired: "La prova è scaduta",
    subscribeToContinue: "Abbonati per continuare",
    // profile setup
    setup: "Configura il profilo",
    name: "Il tuo nome",
    namePlaceholder: "Es. Sofia",
    jobTitle: "Titolo del lavoro",
    jobPlaceholder: "Es. Cassiere, Cameriere…",
    hourlyRate: "Tariffa oraria lorda (€)",
    contractType: "Tipo di contratto",
    fullTime: "Tempo pieno",
    partTime: "Part time",
    expectedHours: "Ore previste / giorno",
    country: "Paese",
    italy: "Italia", france: "Francia", belgium: "Belgio",
    switzerland: "Svizzera", germany: "Germania", spain: "Spagna",
    portugal: "Portogallo", netherlands: "Paesi Bassi", austria: "Austria",
    save: "Salva e inizia",
    // dashboard
    dashboard: "Pannello", logHours: "Aggiungi ore", history: "Storico", settings: "Impostazioni",
    today: "Oggi", hoursWorked: "Ore lavorate", earned: "Guadagnato",
    projected: "Proiezione fine mese", netSalary: "Stipendio netto stimato",
    addEntry: "Aggiungi un giorno", date: "Data", hours: "Ore lavorate",
    note: "Nota (opzionale)", notePlaceholder: "Es. giornata normale…",
    add: "Aggiungi", monthSummary: "Riepilogo", totalHours: "Ore totali",
    grossEarned: "Lordo", deductions: "Deduzioni", netEarned: "Netto stimato",
    onTrack: "In linea", behind: "In ritardo", ahead: "In anticipo",
    edit: "Modifica", delete: "Elimina", noEntries: "Nessuna voce",
    editProfile: "Modifica profilo", resetData: "Reimposta dati",
    confirmReset: "Confermare?", yes: "Sì", no: "No",
    welcome: "Ciao", daysLogged: "giorni registrati", avgPerDay: "Media/giorno",
    thisMonth: "Questo mese", lang: "Lingua", close: "Chiudi",
    hoursShort: "h", perHour: "/ ora", gross: "Lordo",
    cotisations: "Contributi", impots: "Tasse",
    // paywall
    subscribe: "Passa a Pro", proTitle: "MioStipendio Pro",
    proSubtitle: "Tutte le funzioni, senza limiti",
    planMonthly: "Mensile", planYearly: "Annuale", planLifetime: "A vita",
    perMonth: "/ mese", perYear: "/ anno", oneTime: "pagamento unico",
    savePercent: "Risparmia 33%", popular: "Popolare",
    startTrial: "Inizia la prova gratuita", alreadyPro: "Sei Pro ✦",
    proExpiry: "Abbonamento attivo", manageSubscription: "Gestisci abbonamento",
    featFree: ["Solo mese corrente", "Calcolo lordo semplice", "1 paese"],
    featPro: ["Storico illimitato", "Calcolo netto con deduzioni", "9 paesi europei", "Proiezione fine mese", "Esporta dati (presto)"],
    freeLabel: "Gratuito", proLabel: "Pro", currentPlan: "Piano attuale",
    restorePurchase: "Ripristina acquisto",
    legalNote: "Abbonamento rinnovato automaticamente. Cancellabile in qualsiasi momento.",
    signOut: "Disconnetti",
  },
  fr: {
    appName: "MonSalaire",
    appTagline: "Ton salaire, sous contrôle.",
    onboarding: [
      { emoji: "⏱️", title: "Note tes heures", desc: "Chaque jour, ajoute tes heures en quelques secondes." },
      { emoji: "💶", title: "Calcul net automatique", desc: "Vois combien tu gagnes vraiment, après cotisations et impôts." },
      { emoji: "📈", title: "Projection fin de mois", desc: "Connais ton salaire avant même de le recevoir." },
      { emoji: "✦",  title: "30 jours gratuits", desc: "Essaie tout gratuitement. Aucun débit immédiat." },
    ],
    next: "Suivant", skip: "Passer", getStarted: "Commencer",
    signInGoogle: "Continuer avec Google", signInPhone: "Continuer avec le téléphone",
    orDivider: "ou", phonePlaceholder: "Numéro de téléphone", phoneNext: "Envoyer le code",
    otpTitle: "Entre le code", otpDesc: "Nous avons envoyé un code au",
    otpPlaceholder: "Code à 6 chiffres", otpVerify: "Vérifier", otpResend: "Renvoyer le code",
    trialBanner: "✦ Essai gratuit · {d} jours restants", trialExpired: "L'essai a expiré",
    subscribeToContinue: "Abonne-toi pour continuer",
    setup: "Configurer le profil", name: "Ton prénom", namePlaceholder: "Ex: Sophie",
    jobTitle: "Intitulé du poste", jobPlaceholder: "Ex: Caissier…",
    hourlyRate: "Taux horaire brut (€)", contractType: "Type de contrat",
    fullTime: "Temps plein", partTime: "Temps partiel", expectedHours: "Heures / jour",
    country: "Pays", italy: "Italie", france: "France", belgium: "Belgique",
    switzerland: "Suisse", germany: "Allemagne", spain: "Espagne",
    portugal: "Portugal", netherlands: "Pays-Bas", austria: "Autriche",
    save: "Enregistrer et commencer",
    dashboard: "Tableau de bord", logHours: "Ajouter heures", history: "Historique", settings: "Paramètres",
    today: "Aujourd'hui", hoursWorked: "Heures", earned: "Gagné",
    projected: "Projection fin de mois", netSalary: "Salaire net estimé",
    addEntry: "Ajouter une journée", date: "Date", hours: "Heures travaillées",
    note: "Note (optionnel)", notePlaceholder: "Ex: journée normale…",
    add: "Ajouter", monthSummary: "Résumé", totalHours: "Total heures",
    grossEarned: "Brut", deductions: "Déductions", netEarned: "Net estimé",
    onTrack: "En bonne voie", behind: "En retard", ahead: "En avance",
    edit: "Modifier", delete: "Supprimer", noEntries: "Aucune entrée",
    editProfile: "Modifier profil", resetData: "Réinitialiser",
    confirmReset: "Confirmer ?", yes: "Oui", no: "Non",
    welcome: "Bonjour", daysLogged: "jours enregistrés", avgPerDay: "Moy./jour",
    thisMonth: "Ce mois", lang: "Langue", close: "Fermer",
    hoursShort: "h", perHour: "/ heure", gross: "Brut",
    cotisations: "Cotisations", impots: "Impôts",
    subscribe: "Passer à Pro", proTitle: "MonSalaire Pro",
    proSubtitle: "Toutes les fonctionnalités, sans limite",
    planMonthly: "Mensuel", planYearly: "Annuel", planLifetime: "À vie",
    perMonth: "/ mois", perYear: "/ an", oneTime: "paiement unique",
    savePercent: "Économisez 33%", popular: "Populaire",
    startTrial: "Commencer l'essai gratuit", alreadyPro: "Vous êtes Pro ✦",
    proExpiry: "Abonnement actif", manageSubscription: "Gérer l'abonnement",
    featFree: ["Mois en cours uniquement", "Calcul brut simple", "1 pays"],
    featPro: ["Historique illimité", "Calcul net avec déductions", "9 pays européens", "Projection fin de mois", "Export (bientôt)"],
    freeLabel: "Gratuit", proLabel: "Pro", currentPlan: "Plan actuel",
    restorePurchase: "Restaurer un achat",
    legalNote: "Abonnement renouvelé automatiquement. Annulable à tout moment.",
    signOut: "Déconnexion",
  },
  en: {
    appName: "MyWage",
    appTagline: "Your salary, under control.",
    onboarding: [
      { emoji: "⏱️", title: "Track your hours", desc: "Add your hours every day in just a few seconds." },
      { emoji: "💶", title: "Automatic net calculation", desc: "See how much you really earn, after tax and contributions." },
      { emoji: "📈", title: "End-of-month projection", desc: "Know your salary before you even receive it." },
      { emoji: "✦",  title: "30 days free", desc: "Try everything for free. No charge right away." },
    ],
    next: "Next", skip: "Skip", getStarted: "Get started",
    signInGoogle: "Continue with Google", signInPhone: "Continue with phone",
    orDivider: "or", phonePlaceholder: "Phone number", phoneNext: "Send code",
    otpTitle: "Enter the code", otpDesc: "We sent a code to",
    otpPlaceholder: "6-digit code", otpVerify: "Verify", otpResend: "Resend code",
    trialBanner: "✦ Free trial · {d} days left", trialExpired: "Trial expired",
    subscribeToContinue: "Subscribe to continue",
    setup: "Set up profile", name: "Your first name", namePlaceholder: "E.g. Sophie",
    jobTitle: "Job title", jobPlaceholder: "E.g. Cashier…",
    hourlyRate: "Gross hourly rate (€)", contractType: "Contract type",
    fullTime: "Full time", partTime: "Part time", expectedHours: "Hours / day",
    country: "Country", italy: "Italy", france: "France", belgium: "Belgium",
    switzerland: "Switzerland", germany: "Germany", spain: "Spain",
    portugal: "Portugal", netherlands: "Netherlands", austria: "Austria",
    save: "Save and start",
    dashboard: "Dashboard", logHours: "Log hours", history: "History", settings: "Settings",
    today: "Today", hoursWorked: "Hours", earned: "Earned",
    projected: "End-of-month projection", netSalary: "Estimated net salary",
    addEntry: "Add a day", date: "Date", hours: "Hours worked",
    note: "Note (optional)", notePlaceholder: "E.g. normal day…",
    add: "Add", monthSummary: "Summary", totalHours: "Total hours",
    grossEarned: "Gross", deductions: "Deductions", netEarned: "Estimated net",
    onTrack: "On track", behind: "Behind", ahead: "Ahead",
    edit: "Edit", delete: "Delete", noEntries: "No entries",
    editProfile: "Edit profile", resetData: "Reset data",
    confirmReset: "Confirm?", yes: "Yes", no: "No",
    welcome: "Hello", daysLogged: "days logged", avgPerDay: "Avg/day",
    thisMonth: "This month", lang: "Language", close: "Close",
    hoursShort: "h", perHour: "/ hour", gross: "Gross",
    cotisations: "Contributions", impots: "Tax",
    subscribe: "Go Pro", proTitle: "MyWage Pro",
    proSubtitle: "All features, no limits",
    planMonthly: "Monthly", planYearly: "Yearly", planLifetime: "Lifetime",
    perMonth: "/ month", perYear: "/ year", oneTime: "one-time payment",
    savePercent: "Save 33%", popular: "Popular",
    startTrial: "Start free trial", alreadyPro: "You're Pro ✦",
    proExpiry: "Active subscription", manageSubscription: "Manage subscription",
    featFree: ["Current month only", "Basic gross calculation", "1 country"],
    featPro: ["Unlimited history", "Net calc with deductions", "9 European countries", "End-of-month projection", "Export (soon)"],
    freeLabel: "Free", proLabel: "Pro", currentPlan: "Current plan",
    restorePurchase: "Restore purchase",
    legalNote: "Subscription renews automatically. Cancel anytime.",
    signOut: "Sign out",
  },
};

// ── DEDUCTIONS ────────────────────────────────────────────────────────────────
const DEDUCTIONS = {
  italy:       { cotisations: 0.10, impots: 0.23 },
  france:      { cotisations: 0.22, impots: 0.11 },
  belgium:     { cotisations: 0.135, impots: 0.135 },
  switzerland: { cotisations: 0.125, impots: 0.08 },
  germany:     { cotisations: 0.195, impots: 0.14 },
  spain:       { cotisations: 0.064, impots: 0.19 },
  portugal:    { cotisations: 0.11, impots: 0.145 },
  netherlands: { cotisations: 0.177, impots: 0.095 },
  austria:     { cotisations: 0.183, impots: 0.12 },
};
function calcNet(gross, country) {
  const d = DEDUCTIONS[country] || DEDUCTIONS.italy;
  const cotisations = gross * d.cotisations;
  const impots      = (gross - cotisations) * d.impots;
  return { gross, cotisations, impots, net: gross - cotisations - impots };
}

// ── STORAGE ───────────────────────────────────────────────────────────────────
const SK = "miostipendio_v3";
function load() { try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; } }
function save(data) { localStorage.setItem(SK, JSON.stringify(data)); }

// ── HELPERS ───────────────────────────────────────────────────────────────────
function todayStr() { return new Date().toISOString().slice(0,10); }
function daysInMonth(y,m) { return new Date(y,m,0).getDate(); }
function workdaysInMonth(y,m) {
  let c=0, days=daysInMonth(y,m);
  for(let d=1;d<=days;d++){const w=new Date(y,m-1,d).getDay();if(w!==0&&w!==6)c++;}
  return c;
}
function trialDaysLeft(startDate) {
  if(!startDate) return 0;
  const diff = 30 - Math.floor((Date.now()-new Date(startDate))/(1000*60*60*24));
  return Math.max(0, diff);
}

// ── ICONS ─────────────────────────────────────────────────────────────────────
const Icon = {
  clock:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  euro:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h8M4 8h8M18 5a7 7 0 1 0 0 14"/></svg>,
  chart:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  plus:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  list:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  gear:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06-.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  edit:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  check:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>,
  phone:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  back:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>,
};

// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  // screen: splash | onboarding | auth | phone | otp | setup | dashboard | log | history | settings | paywall
  const [screen, setScreen]   = useState("splash");
  const [lang, setLang]       = useState("it");
  const [obStep, setObStep]   = useState(0);
  const [profile, setProfile] = useState(null);
  const [entries, setEntries] = useState({});
  const [user, setUser]       = useState(null);   // { name, email|phone, trialStart, isPro }
  const [editEntry, setEditEntry] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [flash, setFlash]     = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [otp, setOtp]         = useState("");

  const t = T[lang];
  const isPro = user?.isPro || false;
  const trialLeft = user ? trialDaysLeft(user.trialStart) : 0;
  const trialExpired = user && !isPro && trialLeft === 0;

  // Load
  useEffect(() => {
    const d = load();
    if (d.lang)    setLang(d.lang);
    if (d.user)  { setUser(d.user); setScreen(d.profile ? "dashboard" : "setup"); }
    if (d.profile) setProfile(d.profile);
    if (d.entries) setEntries(d.entries);
  }, []);

  const persist = useCallback((u, p, e, l) => {
    save({ user: u, profile: p, entries: e, lang: l });
  }, []);

  function showFlash(msg) { setFlash(msg); setTimeout(() => setFlash(""), 2200); }

  // ── AUTH helpers ──────────────────────────────────────────────────────────
  function signIn(name, identifier) {
    const u = { name, identifier, trialStart: new Date().toISOString(), isPro: false };
    setUser(u);
    persist(u, profile, entries, lang);
    setScreen("setup");
  }

  // ── current month stats ───────────────────────────────────────────────────
  const now        = new Date();
  const curMonth   = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}`;
  const monthEntries = Object.entries(entries).filter(([d])=>d.startsWith(curMonth)).sort(([a],[b])=>a.localeCompare(b));
  const totalHours = monthEntries.reduce((s,[,v])=>s+Number(v.hours),0);
  const grossSoFar = profile ? totalHours * profile.rate : 0;
  const salaryData = profile ? calcNet(grossSoFar, profile.country) : null;
  const workdays   = workdaysInMonth(now.getFullYear(), now.getMonth()+1);
  let passedWd=0;
  for(let d=1;d<=now.getDate();d++){const w=new Date(now.getFullYear(),now.getMonth(),d).getDay();if(w!==0&&w!==6)passedWd++;}
  const expectedSoFar  = profile ? passedWd * profile.dailyHours : 0;
  const diff           = totalHours - expectedSoFar;
  const projectedGross = profile && passedWd>0 ? (totalHours/passedWd)*workdays*profile.rate : grossSoFar;
  const projectedNet   = profile ? calcNet(projectedGross, profile.country).net : 0;
  const avgPerDay      = monthEntries.length>0 ? totalHours/monthEntries.length : 0;

  // ══════════════════════════════════════════════════════════════════════════
  // SPLASH
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "splash") return (
    <Wrap>
      <div className="splash-screen">
        <div className="splash-blob blob1"/>
        <div className="splash-blob blob2"/>
        <div className="splash-content">
          <div className="splash-logo">💼</div>
          <h1 className="splash-title">{t.appName}</h1>
          <p className="splash-tagline">{t.appTagline}</p>
        </div>
        <div className="splash-lang-row">
          {["it","fr","en"].map(l=>(
            <button key={l} className={`splash-lang ${lang===l?"active":""}`} onClick={()=>setLang(l)}>
              {l==="it"?"🇮🇹":l==="fr"?"🇫🇷":"🇬🇧"}
            </button>
          ))}
        </div>
        <button className="btn-primary splash-btn" onClick={()=>setScreen("onboarding")}>{t.next} →</button>
      </div>
    </Wrap>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // ONBOARDING
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "onboarding") {
    const slides = t.onboarding;
    const isLast = obStep === slides.length - 1;
    return (
      <Wrap>
        <div className="ob-screen">
          <button className="ob-skip" onClick={()=>setScreen("auth")}>{t.skip}</button>
          <div className="ob-slides">
            {slides.map((s, i) => (
              <div key={i} className={`ob-slide ${i===obStep?"active":i<obStep?"past":"future"}`}>
                <div className="ob-emoji">{s.emoji}</div>
                <h2 className="ob-title">{s.title}</h2>
                <p className="ob-desc">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="ob-dots">
            {slides.map((_,i)=>(
              <div key={i} className={`ob-dot ${i===obStep?"active":""}`} onClick={()=>setObStep(i)}/>
            ))}
          </div>
          <button className="btn-primary ob-next" onClick={()=>{
            if(isLast) setScreen("auth");
            else setObStep(s=>s+1);
          }}>
            {isLast ? t.getStarted : t.next} {isLast ? "" : "→"}
          </button>
        </div>
      </Wrap>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // AUTH
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "auth") return (
    <Wrap>
      <div className="auth-screen">
        <div className="auth-top">
          <div className="auth-logo">💼</div>
          <h2 className="auth-title">{t.appName}</h2>
          <p className="auth-sub">{t.appTagline}</p>
        </div>
        <div className="auth-btns">
          <button className="btn-google" onClick={()=>signIn("Utente Google","google@example.com")}>
            <svg width="20" height="20" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.6 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.2C29.3 35.4 26.8 36 24 36c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C37.1 39 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>
            {t.signInGoogle}
          </button>
          <div className="or-divider"><span>{t.orDivider}</span></div>
          <button className="btn-phone" onClick={()=>setScreen("phone")}>
            <span className="btn-icon">{Icon.phone}</span>
            {t.signInPhone}
          </button>
        </div>
        <div className="trial-note">✦ 30 giorni gratis · nessuna carta richiesta</div>
      </div>
    </Wrap>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // PHONE
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "phone") return (
    <Wrap>
      <div className="form-wrap">
        <button className="back-btn" onClick={()=>setScreen("auth")}>{Icon.back}</button>
        <div className="form-header">
          <div className="form-icon">{Icon.phone}</div>
          <h2>{t.signInPhone}</h2>
        </div>
        <label>{t.phonePlaceholder}
          <input type="tel" value={phoneNum} onChange={e=>setPhoneNum(e.target.value)} placeholder="+39 333 000 0000"/>
        </label>
        <button className="btn-primary" onClick={()=>{ if(phoneNum) setScreen("otp"); }}>{t.phoneNext}</button>
      </div>
    </Wrap>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // OTP
  // ══════════════════════════════════════════════════════════════════════════
  if (screen === "otp") return (
    <Wrap>
      <div className="form-wrap">
        <button className="back-btn" onClick={()=>setScreen("phone")}>{Icon.back}</button>
        <div className="form-header">
          <div className="form-icon">📱</div>
          <h2>{t.otpTitle}</h2>
        </div>
        <p className="otp-desc">{t.otpDesc} <b>{phoneNum}</b></p>
        <div className="otp-input-wrap">
          <input
            className="otp-input"
            type="number" maxLength="6" value={otp}
            onChange={e=>setOtp(e.target.value.slice(0,6))}
            placeholder="000000"
          />
        </div>
        <button className="btn-primary" onClick={()=>{ if(otp.length>=4) signIn("Utente", phoneNum); }}>{t.otpVerify}</button>
        <button className="btn-ghost" onClick={()=>showFlash("✓")}>{t.otpResend}</button>
      </div>
    </Wrap>
  );

  // ══════════════════════════════════════════════════════════════════════════
  // TRIAL EXPIRED GATE
  // ══════════════════════════════════════════════════════════════════════════
  if (trialExpired && screen === "dashboard") {
    return (
      <Wrap>
        <div className="expired-screen">
          <div className="expired-icon">⏰</div>
          <h2>{t.trialExpired}</h2>
          <p>{t.subscribeToContinue}</p>
          <button className="btn-pro-cta" onClick={()=>setScreen("paywall")}>✦ {t.subscribe}</button>
        </div>
      </Wrap>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // MAIN APP (setup / dashboard / log / history / settings / paywall)
  // ══════════════════════════════════════════════════════════════════════════
  const showNav = !["setup","paywall"].includes(screen) && !editingProfile;

  // ── PROFILE FORM ─────────────────────────────────────────────────────────
  function ProfileForm({ existing }) {
    const [form, setForm] = useState(existing || {
      name: user?.name || "", job: "", rate: "", contract: "fullTime", dailyHours: "7", country: "italy",
    });
    const set = (k,v) => setForm(f=>({...f,[k]:v}));
    function submit() {
      if(!form.name||!form.rate) return;
      const p = {...form, rate: parseFloat(form.rate), dailyHours: parseFloat(form.dailyHours)};
      setProfile(p); persist(user,p,entries,lang); setScreen("dashboard"); setEditingProfile(false);
    }
    return (
      <div className="form-wrap">
        <div className="form-header"><div className="form-icon">👤</div><h2>{t.setup}</h2></div>
        <label>{t.name}<input value={form.name} onChange={e=>set("name",e.target.value)} placeholder={t.namePlaceholder}/></label>
        <label>{t.jobTitle}<input value={form.job} onChange={e=>set("job",e.target.value)} placeholder={t.jobPlaceholder}/></label>
        <label>{t.hourlyRate}<input type="number" min="0" step="0.01" value={form.rate} onChange={e=>set("rate",e.target.value)}/></label>
        <label>{t.contractType}
          <select value={form.contract} onChange={e=>set("contract",e.target.value)}>
            <option value="fullTime">{t.fullTime}</option>
            <option value="partTime">{t.partTime}</option>
          </select>
        </label>
        <label>{t.expectedHours}<input type="number" min="1" max="24" step="0.5" value={form.dailyHours} onChange={e=>set("dailyHours",e.target.value)}/></label>
        <label>{t.country}
          <select value={form.country} onChange={e=>set("country",e.target.value)}>
            <option value="italy">🇮🇹 {t.italy}</option>
            <option value="france">🇫🇷 {t.france}</option>
            <option value="belgium">🇧🇪 {t.belgium}</option>
            <option value="switzerland">🇨🇭 {t.switzerland}</option>
            <option value="germany">🇩🇪 {t.germany}</option>
            <option value="spain">🇪🇸 {t.spain}</option>
            <option value="portugal">🇵🇹 {t.portugal}</option>
            <option value="netherlands">🇳🇱 {t.netherlands}</option>
            <option value="austria">🇦🇹 {t.austria}</option>
          </select>
        </label>
        <button className="btn-primary" onClick={submit}>{t.save}</button>
        {existing && <button className="btn-ghost" onClick={()=>{setScreen("settings");setEditingProfile(false);}}>{t.close}</button>}
      </div>
    );
  }

  // ── LOG HOURS ─────────────────────────────────────────────────────────────
  function LogView() {
    const today = todayStr();
    const ex = editEntry ? entries[editEntry] : entries[today];
    const [form,setForm] = useState({date:editEntry||today,hours:ex?.hours||"",note:ex?.note||""});
    const set=(k,v)=>setForm(f=>({...f,[k]:v}));
    function submit() {
      if(!form.hours) return;
      const ne = {...entries,[form.date]:{hours:parseFloat(form.hours),note:form.note}};
      setEntries(ne); persist(user,profile,ne,lang); setEditEntry(null); showFlash("✓"); setScreen("dashboard");
    }
    return (
      <div className="form-wrap">
        <div className="form-header"><div className="form-icon">⏱️</div><h2>{t.addEntry}</h2></div>
        <label>{t.date}<input type="date" value={form.date} onChange={e=>set("date",e.target.value)} max={todayStr()}/></label>
        <label>{t.hours}<input type="number" min="0" max="24" step="0.5" value={form.hours} onChange={e=>set("hours",e.target.value)} placeholder="0"/></label>
        <label>{t.note}<input value={form.note} onChange={e=>set("note",e.target.value)} placeholder={t.notePlaceholder}/></label>
        {form.hours && profile && (()=>{
          const n=calcNet(parseFloat(form.hours)*profile.rate,profile.country);
          return <div className="preview-box"><span>{t.gross}: <b>{n.gross.toFixed(2)}€</b></span><span>{t.netEarned}: <b>{n.net.toFixed(2)}€</b></span></div>;
        })()}
        <button className="btn-primary" onClick={submit}>{t.add}</button>
        <button className="btn-ghost" onClick={()=>{setEditEntry(null);setScreen("dashboard");}}>{t.close}</button>
      </div>
    );
  }

  // ── DASHBOARD ─────────────────────────────────────────────────────────────
  function Dashboard() {
    const trackStatus = diff>=0?"ahead":"behind";
    const todayEntry  = entries[todayStr()];
    const d           = DEDUCTIONS[profile?.country]||DEDUCTIONS.italy;
    const daysOfMonth = daysInMonth(now.getFullYear(),now.getMonth()+1);

    return (
      <div className="dashboard">
        {/* Trial banner */}
        {!isPro && trialLeft > 0 && (
          <div className="trial-banner" onClick={()=>setScreen("paywall")}>
            {t.trialBanner.replace("{d}", trialLeft)}
          </div>
        )}

        {/* Welcome */}
        <div className="welcome-banner">
          <div>
            <div className="welcome-text">{t.welcome}, <span>{profile?.name}</span> 👋</div>
            <div className="job-text">{profile?.job} · {t[profile?.contract]}</div>
          </div>
          <div className="rate-badge">{profile?.rate?.toFixed(2)}€{t.perHour}</div>
        </div>

        {/* Today */}
        <div className="today-card" onClick={()=>setScreen("log")}>
          <div className="today-left">
            <div className="today-label">{t.today}</div>
            <div className="today-hours">{todayEntry?`${todayEntry.hours}${t.hoursShort}`:"—"}</div>
            {todayEntry&&<div className="today-net">≈ {calcNet(todayEntry.hours*profile.rate,profile.country).net.toFixed(2)}€ net</div>}
          </div>
          <div className="today-cta">{Icon.plus}<span>{todayEntry?t.edit:t.addEntry}</span></div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card accent"><div className="stat-icon">{Icon.clock}</div><div className="stat-value">{totalHours.toFixed(1)}{t.hoursShort}</div><div className="stat-label">{t.totalHours}</div></div>
          <div className="stat-card"><div className="stat-icon">{Icon.euro}</div><div className="stat-value">{salaryData?.gross.toFixed(0)}€</div><div className="stat-label">{t.gross}</div></div>
          <div className="stat-card green"><div className="stat-icon">{Icon.check}</div><div className="stat-value">{salaryData?.net.toFixed(0)}€</div><div className="stat-label">{t.netEarned}</div></div>
          <div className="stat-card"><div className="stat-icon">{Icon.chart}</div><div className="stat-value">{avgPerDay.toFixed(1)}{t.hoursShort}</div><div className="stat-label">{t.avgPerDay}</div></div>
        </div>

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-header">
            <span>{t.thisMonth}: {now.getDate()}/{daysOfMonth}</span>
            <span className={`status-badge ${trackStatus}`}>{diff>=0?"+":""}{diff.toFixed(1)}{t.hoursShort} · {t[trackStatus]}</span>
          </div>
          <div className="progress-bar"><div className="progress-fill" style={{width:`${Math.min(100,(totalHours/(workdays*(profile?.dailyHours||7)))*100)}%`}}/></div>
          <div className="progress-labels"><span>{totalHours.toFixed(1)}{t.hoursShort} / {(workdays*(profile?.dailyHours||7)).toFixed(0)}{t.hoursShort}</span><span>{Math.round((totalHours/(workdays*(profile?.dailyHours||7)))*100)}%</span></div>
        </div>

        {/* Projection */}
        <div className="projection-card">
          <div className="proj-title">{t.projected}</div>
          <div className="proj-row"><span>{t.gross}</span><b>{projectedGross.toFixed(0)}€</b></div>
          <div className="proj-row muted"><span>{t.cotisations} ({Math.round(d.cotisations*100)}%)</span><span>-{(projectedGross*d.cotisations).toFixed(0)}€</span></div>
          <div className="proj-row muted"><span>{t.impots} ({Math.round(d.impots*100)}%)</span><span>-{((projectedGross-projectedGross*d.cotisations)*d.impots).toFixed(0)}€</span></div>
          <div className="proj-divider"/>
          <div className="proj-row net-row"><span>{t.netSalary}</span><b>{projectedNet.toFixed(0)}€</b></div>
        </div>

        {/* Recent */}
        <div className="recent-list">
          {monthEntries.slice(-3).reverse().map(([date,val])=>(
            <div className="entry-row" key={date}>
              <div>
                <div className="entry-date">{new Date(date+"T12:00:00").toLocaleDateString(lang==="fr"?"fr-FR":lang==="it"?"it-IT":"en-GB",{weekday:"short",day:"numeric",month:"short"})}</div>
                {val.note&&<div className="entry-note">{val.note}</div>}
              </div>
              <div className="entry-right"><span className="entry-hours">{val.hours}{t.hoursShort}</span><span className="entry-net">≈{calcNet(val.hours*profile.rate,profile.country).net.toFixed(0)}€</span></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── HISTORY ───────────────────────────────────────────────────────────────
  function History() {
    const [dc, setDc] = useState(null);
    function del(date) {
      const e2={...entries}; delete e2[date]; setEntries(e2); persist(user,profile,e2,lang); setDc(null);
    }
    return (
      <div className="history-wrap">
        <h2 className="section-title">{t.history} — {now.toLocaleDateString(lang==="fr"?"fr-FR":lang==="it"?"it-IT":"en-GB",{month:"long",year:"numeric"})}</h2>
        {monthEntries.length===0&&<p className="empty">{t.noEntries}</p>}
        {monthEntries.slice().reverse().map(([date,val])=>(
          <div className="history-row" key={date}>
            {dc===date?(
              <div className="confirm-row">
                <span>{t.confirmReset}</span>
                <button className="btn-danger-sm" onClick={()=>del(date)}>{t.yes}</button>
                <button className="btn-ghost-sm" onClick={()=>setDc(null)}>{t.no}</button>
              </div>
            ):(
              <>
                <div>
                  <div className="entry-date">{new Date(date+"T12:00:00").toLocaleDateString(lang==="fr"?"fr-FR":lang==="it"?"it-IT":"en-GB",{weekday:"short",day:"numeric",month:"long"})}</div>
                  {val.note&&<div className="entry-note">{val.note}</div>}
                </div>
                <div className="entry-actions">
                  <span className="entry-hours">{val.hours}{t.hoursShort}</span>
                  <span className="entry-net">{calcNet(val.hours*profile.rate,profile.country).net.toFixed(0)}€</span>
                  <button className="icon-btn" onClick={()=>{setEditEntry(date);setScreen("log");}}>{Icon.edit}</button>
                  <button className="icon-btn danger" onClick={()=>setDc(date)}>{Icon.trash}</button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  }

  // ── PAYWALL ───────────────────────────────────────────────────────────────
  function Paywall() {
    const [sel, setSel] = useState("yearly");
    const plans = [
      {id:"monthly",price:"4,99€",sub:t.perMonth,label:t.planMonthly},
      {id:"yearly",price:"39,99€",sub:t.perYear,label:t.planYearly,badge:t.savePercent,popular:true},
      {id:"lifetime",price:"89,99€",sub:t.oneTime,label:t.planLifetime},
    ];
    function activate() {
      const u2={...user,isPro:true};
      setUser(u2); persist(u2,profile,entries,lang); showFlash("✦ Pro!"); setScreen("dashboard");
    }
    if(isPro) return (
      <div className="paywall-wrap">
        <div className="pro-active-card">
          <div className="pro-star">✦</div>
          <h2>{t.alreadyPro}</h2>
          <p>{t.proExpiry}</p>
          <button className="btn-ghost" onClick={()=>setScreen("settings")}>{t.manageSubscription}</button>
        </div>
      </div>
    );
    return (
      <div className="paywall-wrap">
        <button className="back-btn" onClick={()=>setScreen("dashboard")}>{Icon.back}</button>
        <div className="paywall-header">
          <div className="trial-badge">{t.trialBanner.replace("{d}",trialLeft)}</div>
          <h1 className="paywall-title">{t.proTitle}</h1>
          <p className="paywall-sub">{t.proSubtitle}</p>
        </div>
        <div className="compare-grid">
          <div className="compare-col free-col">
            <div className="compare-head">{t.freeLabel}</div>
            {t.featFree.map((f,i)=><div key={i} className="compare-row free-row"><span className="feat-x">✕</span><span>{f}</span></div>)}
          </div>
          <div className="compare-col pro-col">
            <div className="compare-head pro-head">Pro ✦</div>
            {t.featPro.map((f,i)=><div key={i} className="compare-row pro-row"><span className="feat-check">✓</span><span>{f}</span></div>)}
          </div>
        </div>
        <div className="plans-list">
          {plans.map(p=>(
            <div key={p.id} className={`plan-card ${sel===p.id?"selected":""} ${p.popular?"popular":""}`} onClick={()=>setSel(p.id)}>
              <div className="plan-left"><div className="plan-radio">{sel===p.id?"●":"○"}</div><div><div className="plan-label">{p.label}</div>{p.popular&&<div className="plan-popular-tag">{t.popular}</div>}</div></div>
              <div className="plan-right">{p.badge&&<div className="plan-badge">{p.badge}</div>}<div className="plan-price">{p.price}</div><div className="plan-sub">{p.sub}</div></div>
            </div>
          ))}
        </div>
        <button className="btn-pro-cta" onClick={activate}>{t.startTrial}</button>
        <div className="restore-row"><button className="btn-restore" onClick={activate}>{t.restorePurchase}</button></div>
        <p className="legal-note">{t.legalNote}</p>
      </div>
    );
  }

  // ── SETTINGS ─────────────────────────────────────────────────────────────
  function Settings() {
    return (
      <div className="settings-wrap">
        <h2 className="section-title">{t.settings}</h2>

        {/* Plan */}
        <div className={`settings-section ${isPro?"pro-section":""}`}>
          <div className="settings-label">{t.currentPlan}</div>
          {isPro?(
            <div className="pro-status-row"><span className="pro-badge-big">✦ Pro</span><span className="pro-active-text">{t.proExpiry}</span></div>
          ):(
            <>
              <div className="free-status-row"><span>{t.freeLabel}</span><span className="free-limits-hint">{trialLeft > 0 ? t.trialBanner.replace("{d}",trialLeft) : t.trialExpired}</span></div>
              <button className="btn-pro" onClick={()=>setScreen("paywall")}>✦ {t.subscribe}</button>
            </>
          )}
        </div>

        {/* Language */}
        <div className="settings-section">
          <div className="settings-label">{t.lang}</div>
          <div className="lang-btns">
            {["it","fr","en"].map(l=>(
              <button key={l} className={`lang-btn ${lang===l?"active":""}`} onClick={()=>{setLang(l);persist(user,profile,entries,l);}}>
                {l==="it"?"🇮🇹 Italiano":l==="fr"?"🇫🇷 Français":"🇬🇧 English"}
              </button>
            ))}
          </div>
        </div>

        {/* Profile */}
        {profile&&(
          <div className="settings-section">
            <div className="settings-label">{t.editProfile}</div>
            <div className="profile-summary"><b>{profile.name}</b> · {profile.job}<br/>{profile.rate}€/h · {t[profile.contract]} · {t[profile.country]}</div>
            <button className="btn-outline" onClick={()=>setEditingProfile(true)}>{Icon.edit} {t.editProfile}</button>
          </div>
        )}

        {/* Sign out / reset */}
        <div className="settings-section danger-zone">
          {showReset?(
            <div className="confirm-row">
              <span>{t.confirmReset}</span>
              <button className="btn-danger-sm" onClick={()=>{setEntries({});setProfile(null);setUser(null);setScreen("splash");save({});setShowReset(false);}}>{t.yes}</button>
              <button className="btn-ghost-sm" onClick={()=>setShowReset(false)}>{t.no}</button>
            </div>
          ):(
            <button className="btn-danger" onClick={()=>setShowReset(true)}>{Icon.trash} {t.signOut}</button>
          )}
        </div>
      </div>
    );
  }

  return (
    <Wrap>
      {flash&&<div className="flash">{flash}</div>}
      {/* Trial banner in nav area */}
      <div className="content-area" style={{paddingBottom: showNav?"100px":"24px"}}>
        {screen==="setup"&&!profile&&<ProfileForm/>}
        {screen==="setup"&&editingProfile&&<ProfileForm existing={profile}/>}
        {screen==="dashboard"&&profile&&<Dashboard/>}
        {screen==="log"&&<LogView/>}
        {screen==="history"&&profile&&<History/>}
        {screen==="paywall"&&<Paywall/>}
        {screen==="settings"&&(editingProfile?<ProfileForm existing={profile}/>:<Settings/>)}
      </div>
      {showNav&&(
        <nav className="bottom-nav">
          <button className={`nav-btn ${screen==="dashboard"?"active":""}`} onClick={()=>setScreen("dashboard")}>{Icon.chart}<span>{t.dashboard}</span></button>
          <button className={`nav-btn ${screen==="history"?"active":""}`} onClick={()=>setScreen("history")}>{Icon.list}<span>{t.history}</span></button>
          <button className="nav-btn add-btn" onClick={()=>{setEditEntry(null);setScreen("log");}}>{Icon.plus}<span>{t.logHours}</span></button>
          {!isPro&&<button className={`nav-btn pro-nav-btn ${screen==="paywall"?"active":""}`} onClick={()=>setScreen("paywall")}><span className="pro-star-icon">✦</span><span>Pro</span></button>}
          <button className={`nav-btn ${screen==="settings"?"active":""}`} onClick={()=>{setEditingProfile(false);setScreen("settings");}}>{Icon.gear}<span>{t.settings}</span></button>
        </nav>
      )}
    </Wrap>
  );
}

// ── WRAPPER ───────────────────────────────────────────────────────────────────
function Wrap({children}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        :root{
          --bg:#0f0f13;--surface:#18181f;--surface2:#21212a;--border:#2a2a35;
          --text:#f0f0f5;--muted:#7a7a90;--accent:#7c6fcd;--accent2:#a594f9;
          --green:#3ecf8e;--red:#f66;--yellow:#f5c542;--radius:14px;
          --font-h:'Syne',sans-serif;--font-b:'DM Sans',sans-serif;
        }
        body{background:var(--bg);color:var(--text);font-family:var(--font-b);min-height:100vh;overscroll-behavior:none;}
        .app-shell{max-width:430px;margin:0 auto;min-height:100vh;display:flex;flex-direction:column;position:relative;}
        .content-area{flex:1;overflow-y:auto;padding:20px 16px 24px;}

        /* FLASH */
        .flash{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--green);color:#000;padding:8px 20px;border-radius:100px;font-weight:600;z-index:999;animation:fadeInOut 2.2s ease forwards;}
        @keyframes fadeInOut{0%{opacity:0;transform:translateX(-50%) translateY(-8px);}15%{opacity:1;transform:translateX(-50%) translateY(0);}80%{opacity:1;}100%{opacity:0;}}

        /* SPLASH */
        .splash-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;position:relative;overflow:hidden;gap:24px;}
        .splash-blob{position:absolute;border-radius:50%;filter:blur(80px);opacity:0.25;}
        .blob1{width:300px;height:300px;background:var(--accent);top:-60px;right:-80px;}
        .blob2{width:250px;height:250px;background:#3ecf8e;bottom:-60px;left:-60px;}
        .splash-content{text-align:center;z-index:1;}
        .splash-logo{font-size:64px;margin-bottom:16px;}
        .splash-title{font-family:var(--font-h);font-size:36px;font-weight:800;margin-bottom:8px;}
        .splash-tagline{color:var(--muted);font-size:16px;}
        .splash-lang-row{display:flex;gap:12px;z-index:1;}
        .splash-lang{background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:10px 18px;font-size:20px;cursor:pointer;transition:border-color 0.2s;}
        .splash-lang.active{border-color:var(--accent);}
        .splash-btn{width:100%;max-width:320px;z-index:1;font-size:17px;padding:16px;}

        /* ONBOARDING */
        .ob-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:60px 24px 40px;position:relative;}
        .ob-skip{position:absolute;top:20px;right:20px;background:none;border:none;color:var(--muted);font-size:14px;cursor:pointer;font-family:var(--font-b);}
        .ob-slides{position:relative;width:100%;flex:1;display:flex;align-items:center;justify-content:center;}
        .ob-slide{position:absolute;width:100%;text-align:center;transition:all 0.4s ease;display:flex;flex-direction:column;align-items:center;gap:16px;}
        .ob-slide.active{opacity:1;transform:translateX(0);}
        .ob-slide.past{opacity:0;transform:translateX(-60px);pointer-events:none;}
        .ob-slide.future{opacity:0;transform:translateX(60px);pointer-events:none;}
        .ob-emoji{font-size:72px;}
        .ob-title{font-family:var(--font-h);font-size:26px;font-weight:800;}
        .ob-desc{color:var(--muted);font-size:16px;max-width:280px;line-height:1.6;}
        .ob-dots{display:flex;gap:8px;margin-bottom:32px;}
        .ob-dot{width:8px;height:8px;border-radius:50%;background:var(--border);cursor:pointer;transition:all 0.2s;}
        .ob-dot.active{width:24px;border-radius:4px;background:var(--accent);}
        .ob-next{width:100%;max-width:320px;font-size:17px;padding:16px;}

        /* AUTH */
        .auth-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 24px;gap:32px;}
        .auth-top{text-align:center;}
        .auth-logo{font-size:48px;margin-bottom:12px;}
        .auth-title{font-family:var(--font-h);font-size:28px;font-weight:800;margin-bottom:6px;}
        .auth-sub{color:var(--muted);font-size:14px;}
        .auth-btns{display:flex;flex-direction:column;gap:12px;width:100%;max-width:320px;}
        .btn-google{display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#333;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--font-b);transition:opacity 0.2s;}
        .btn-google:hover{opacity:0.9;}
        .or-divider{display:flex;align-items:center;gap:12px;color:var(--muted);font-size:13px;}
        .or-divider::before,.or-divider::after{content:"";flex:1;height:1px;background:var(--border);}
        .btn-phone{display:flex;align-items:center;justify-content:center;gap:10px;background:var(--surface2);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--font-b);}
        .btn-icon svg{width:18px;height:18px;}
        .trial-note{font-size:13px;color:var(--muted);text-align:center;}

        /* OTP */
        .otp-desc{font-size:14px;color:var(--muted);}
        .otp-input-wrap{display:flex;justify-content:center;}
        .otp-input{text-align:center;font-size:32px;font-family:var(--font-h);letter-spacing:8px;width:200px;background:var(--surface2);border:2px solid var(--accent);border-radius:14px;color:var(--text);padding:16px;outline:none;}

        /* BACK BTN */
        .back-btn{background:none;border:none;color:var(--muted);cursor:pointer;display:flex;align-items:center;margin-bottom:8px;padding:4px 0;}
        .back-btn svg{width:22px;height:22px;}

        /* TRIAL BANNER */
        .trial-banner{background:linear-gradient(135deg,rgba(124,111,205,0.2),rgba(245,197,66,0.15));border:1px solid var(--accent);border-radius:10px;padding:10px 14px;font-size:13px;font-weight:600;color:var(--accent2);cursor:pointer;text-align:center;}

        /* EXPIRED */
        .expired-screen{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px;gap:20px;text-align:center;}
        .expired-icon{font-size:64px;}
        .expired-screen h2{font-family:var(--font-h);font-size:26px;}
        .expired-screen p{color:var(--muted);font-size:15px;}

        /* FORMS */
        .form-wrap{display:flex;flex-direction:column;gap:16px;padding-top:12px;}
        .form-header{display:flex;align-items:center;gap:12px;margin-bottom:4px;}
        .form-icon{font-size:32px;}
        .form-header h2{font-family:var(--font-h);font-size:22px;}
        label{display:flex;flex-direction:column;gap:6px;font-size:13px;color:var(--muted);font-weight:500;}
        input,select{background:var(--surface2);border:1px solid var(--border);border-radius:10px;color:var(--text);padding:12px 14px;font-size:15px;font-family:var(--font-b);outline:none;transition:border-color 0.2s;width:100%;}
        input:focus,select:focus{border-color:var(--accent);}
        select option{background:var(--surface2);}
        .preview-box{display:flex;justify-content:space-between;background:rgba(124,111,205,0.1);border:1px solid var(--accent);border-radius:10px;padding:10px 14px;font-size:14px;color:var(--accent2);}

        /* BUTTONS */
        .btn-primary{background:var(--accent);color:white;border:none;border-radius:12px;padding:14px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--font-b);transition:background 0.2s,transform 0.1s;}
        .btn-primary:active{transform:scale(0.98);}
        .btn-primary:hover{background:var(--accent2);}
        .btn-ghost{background:none;color:var(--muted);border:1px solid var(--border);border-radius:12px;padding:12px;font-size:14px;cursor:pointer;font-family:var(--font-b);}
        .btn-outline{display:flex;align-items:center;gap:8px;background:none;color:var(--accent2);border:1px solid var(--accent);border-radius:10px;padding:10px 14px;font-size:14px;cursor:pointer;font-family:var(--font-b);}
        .btn-outline svg{width:16px;height:16px;}
        .btn-pro{background:linear-gradient(135deg,#7c6fcd,#a594f9);color:white;border:none;border-radius:12px;padding:13px;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--font-b);transition:opacity 0.2s;}
        .btn-pro:hover{opacity:0.88;}
        .btn-danger{display:flex;align-items:center;gap:8px;background:none;color:var(--red);border:1px solid var(--red);border-radius:10px;padding:10px 14px;font-size:14px;cursor:pointer;font-family:var(--font-b);}
        .btn-danger svg{width:16px;height:16px;}
        .btn-danger-sm,.btn-ghost-sm{padding:6px 14px;border-radius:8px;font-size:13px;cursor:pointer;font-family:var(--font-b);border:none;}
        .btn-danger-sm{background:var(--red);color:white;}
        .btn-ghost-sm{background:var(--border);color:var(--text);}
        .icon-btn{background:none;border:none;cursor:pointer;color:var(--muted);padding:6px;border-radius:8px;display:flex;align-items:center;transition:color 0.2s,background 0.2s;}
        .icon-btn:hover{background:var(--border);color:var(--text);}
        .icon-btn.danger:hover{color:var(--red);}
        .icon-btn svg{width:16px;height:16px;}

        /* BOTTOM NAV */
        .bottom-nav{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;background:rgba(24,24,31,0.92);backdrop-filter:blur(16px);border-top:1px solid var(--border);display:flex;z-index:100;}
        .nav-btn{flex:1;display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 4px 16px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:10px;font-family:var(--font-b);transition:color 0.2s;}
        .nav-btn svg{width:20px;height:20px;}
        .nav-btn.active{color:var(--accent2);}
        .nav-btn.add-btn{color:var(--bg);background:var(--accent);margin:-10px 8px 0;border-radius:14px;flex:1.2;}
        .nav-btn.add-btn:hover{background:var(--accent2);}
        .pro-nav-btn{color:var(--yellow)!important;}
        .pro-star-icon{font-size:18px;line-height:1;}

        /* DASHBOARD */
        .dashboard{display:flex;flex-direction:column;gap:16px;}
        .welcome-banner{display:flex;justify-content:space-between;align-items:center;background:linear-gradient(135deg,#1e1b38 0%,#1a1a26 100%);border:1px solid var(--accent);border-radius:var(--radius);padding:16px;}
        .welcome-text{font-size:18px;font-family:var(--font-h);}
        .welcome-text span{color:var(--accent2);}
        .job-text{font-size:12px;color:var(--muted);margin-top:4px;}
        .rate-badge{background:var(--accent);color:white;border-radius:100px;padding:6px 12px;font-size:13px;font-weight:600;white-space:nowrap;}
        .today-card{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;cursor:pointer;transition:border-color 0.2s;}
        .today-card:hover{border-color:var(--accent);}
        .today-label{font-size:12px;color:var(--muted);margin-bottom:4px;}
        .today-hours{font-size:28px;font-family:var(--font-h);font-weight:700;}
        .today-net{font-size:13px;color:var(--green);margin-top:2px;}
        .today-cta{display:flex;align-items:center;gap:8px;background:var(--accent);color:white;border-radius:10px;padding:10px 14px;font-size:13px;font-weight:600;}
        .today-cta svg{width:16px;height:16px;}
        .stats-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px;display:flex;flex-direction:column;gap:8px;}
        .stat-card.accent{border-color:var(--accent);background:rgba(124,111,205,0.07);}
        .stat-card.green{border-color:var(--green);background:rgba(62,207,142,0.07);}
        .stat-icon svg{width:18px;height:18px;color:var(--muted);}
        .stat-value{font-size:24px;font-family:var(--font-h);font-weight:700;}
        .stat-label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.04em;}
        .progress-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;}
        .progress-header{display:flex;justify-content:space-between;align-items:center;font-size:13px;color:var(--muted);margin-bottom:10px;}
        .status-badge{padding:3px 10px;border-radius:100px;font-size:12px;font-weight:600;}
        .status-badge.ahead{background:rgba(62,207,142,0.15);color:var(--green);}
        .status-badge.behind{background:rgba(255,102,102,0.15);color:var(--red);}
        .progress-bar{background:var(--surface2);border-radius:100px;height:8px;overflow:hidden;}
        .progress-fill{height:100%;background:linear-gradient(90deg,var(--accent),var(--accent2));border-radius:100px;transition:width 0.6s ease;}
        .progress-labels{display:flex;justify-content:space-between;font-size:12px;color:var(--muted);margin-top:6px;}
        .projection-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;display:flex;flex-direction:column;gap:8px;}
        .proj-title{font-family:var(--font-h);font-size:14px;font-weight:700;margin-bottom:4px;}
        .proj-row{display:flex;justify-content:space-between;font-size:14px;}
        .proj-row.muted{color:var(--muted);font-size:13px;}
        .proj-row.net-row b{color:var(--green);font-size:20px;font-family:var(--font-h);}
        .proj-divider{border-top:1px solid var(--border);margin:4px 0;}
        .recent-list{display:flex;flex-direction:column;gap:8px;}
        .entry-row{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}
        .entry-date{font-size:14px;font-weight:500;}
        .entry-note{font-size:12px;color:var(--muted);margin-top:2px;}
        .entry-right{display:flex;align-items:center;gap:10px;}
        .entry-hours{font-family:var(--font-h);font-weight:700;}
        .entry-net{color:var(--green);font-size:13px;}

        /* HISTORY */
        .history-wrap{display:flex;flex-direction:column;gap:10px;}
        .section-title{font-family:var(--font-h);font-size:20px;margin-bottom:8px;}
        .empty{color:var(--muted);font-size:14px;text-align:center;padding:32px 0;}
        .history-row{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:12px 14px;}
        .entry-actions{display:flex;align-items:center;gap:6px;}
        .confirm-row{display:flex;align-items:center;gap:8px;font-size:13px;width:100%;flex-wrap:wrap;}

        /* PAYWALL */
        .paywall-wrap{display:flex;flex-direction:column;gap:20px;padding-top:8px;}
        .paywall-header{text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;}
        .trial-badge{background:linear-gradient(135deg,#f5c542,#f59342);color:#000;font-weight:700;font-size:12px;padding:4px 14px;border-radius:100px;letter-spacing:0.04em;}
        .paywall-title{font-family:var(--font-h);font-size:26px;font-weight:800;}
        .paywall-sub{font-size:14px;color:var(--muted);}
        .compare-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
        .compare-col{border-radius:var(--radius);padding:14px;display:flex;flex-direction:column;gap:8px;}
        .free-col{background:var(--surface);border:1px solid var(--border);}
        .pro-col{background:rgba(124,111,205,0.1);border:1px solid var(--accent);}
        .compare-head{font-family:var(--font-h);font-size:15px;font-weight:700;margin-bottom:4px;}
        .pro-head{color:var(--accent2);}
        .compare-row{display:flex;align-items:flex-start;gap:6px;font-size:12px;line-height:1.4;}
        .free-row{color:var(--muted);}
        .feat-x{color:var(--red);font-weight:700;flex-shrink:0;}
        .feat-check{color:var(--green);font-weight:700;flex-shrink:0;}
        .plans-list{display:flex;flex-direction:column;gap:10px;}
        .plan-card{display:flex;justify-content:space-between;align-items:center;background:var(--surface);border:2px solid var(--border);border-radius:var(--radius);padding:14px 16px;cursor:pointer;transition:border-color 0.2s,background 0.2s;}
        .plan-card.selected{border-color:var(--accent);background:rgba(124,111,205,0.08);}
        .plan-card.popular{border-color:var(--yellow);}
        .plan-left{display:flex;align-items:center;gap:12px;}
        .plan-radio{font-size:20px;color:var(--accent2);line-height:1;}
        .plan-label{font-size:15px;font-weight:600;}
        .plan-popular-tag{font-size:11px;color:var(--yellow);font-weight:600;margin-top:2px;}
        .plan-right{text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:2px;}
        .plan-badge{background:rgba(245,197,66,0.15);color:var(--yellow);font-size:11px;font-weight:700;padding:2px 8px;border-radius:100px;}
        .plan-price{font-family:var(--font-h);font-size:18px;font-weight:700;}
        .plan-sub{font-size:12px;color:var(--muted);}
        .btn-pro-cta{background:linear-gradient(135deg,#7c6fcd 0%,#a594f9 100%);color:white;border:none;border-radius:14px;padding:16px;font-size:16px;font-weight:700;cursor:pointer;font-family:var(--font-h);letter-spacing:0.03em;box-shadow:0 4px 24px rgba(124,111,205,0.35);transition:opacity 0.2s,transform 0.1s;width:100%;}
        .btn-pro-cta:active{transform:scale(0.98);}
        .restore-row{text-align:center;}
        .btn-restore{background:none;border:none;color:var(--muted);font-size:13px;cursor:pointer;text-decoration:underline;font-family:var(--font-b);}
        .legal-note{font-size:11px;color:var(--muted);text-align:center;line-height:1.5;}
        .pro-active-card{display:flex;flex-direction:column;align-items:center;gap:16px;background:rgba(124,111,205,0.08);border:1px solid var(--accent);border-radius:var(--radius);padding:40px 24px;text-align:center;}
        .pro-star{font-size:48px;}
        .pro-active-card h2{font-family:var(--font-h);font-size:24px;}
        .pro-active-card p{color:var(--green);font-size:14px;}

        /* SETTINGS */
        .settings-wrap{display:flex;flex-direction:column;gap:20px;}
        .settings-section{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);padding:16px;display:flex;flex-direction:column;gap:12px;}
        .settings-section.danger-zone{border-color:rgba(255,102,102,0.3);}
        .settings-section.pro-section{border-color:var(--accent)!important;background:rgba(124,111,205,0.06)!important;}
        .settings-label{font-size:12px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em;}
        .lang-btns{display:flex;flex-direction:column;gap:8px;}
        .lang-btn{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:left;color:var(--text);cursor:pointer;font-size:14px;font-family:var(--font-b);transition:border-color 0.2s;}
        .lang-btn.active{border-color:var(--accent);color:var(--accent2);background:rgba(124,111,205,0.1);}
        .profile-summary{font-size:14px;color:var(--muted);line-height:1.6;}
        .pro-status-row{display:flex;align-items:center;gap:12px;}
        .pro-badge-big{background:linear-gradient(135deg,#7c6fcd,#f5c542);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:22px;font-family:var(--font-h);font-weight:800;}
        .pro-active-text{font-size:13px;color:var(--green);}
        .free-status-row{display:flex;justify-content:space-between;align-items:center;font-size:14px;}
        .free-limits-hint{font-size:12px;color:var(--muted);}

        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px;}
      `}</style>
      <div className="app-shell">{children}</div>
    </>
  );
}
