(() => {
  "use strict";

  // Luckornas plats i kalendern (blandad ordning, som en riktig julkalender)
  const ORDER = [7, 15, 1, 22, 10, 3, 18, 12, 5, 20, 9, 14, 24, 2, 17, 11, 23, 6, 13, 19, 4, 16, 8, 21];
  const COLORS = ["c-red", "c-green", "c-gold", "c-plum"];

  const KEY_OPENED = "tomteapp-opened";
  const KEY_TEST = "tomteapp-test";

  const $ = (id) => document.getElementById(id);
  const grid = $("grid");
  const statusEl = $("status");
  const finale = $("finale");
  const resetBtn = $("resetBtn");
  const letterBack = $("letterBack");
  const readBtn = $("readBtn");
  const readLabel = $("readLabel");
  const toastEl = $("toast");

  // ---------- Sparat läge ----------
  function load(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v === null ? fallback : JSON.parse(v);
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* ingen lagring, kör ändå */ }
  }

  let opened = new Set(load(KEY_OPENED, []));
  let testMode = load(KEY_TEST, false) || new URLSearchParams(location.search).has("test");

  // ---------- Datum ----------
  // Vilken är den högsta lucka man får öppna idag?
  function allowedUpTo() {
    if (testMode) return 24;
    const now = new Date();
    const m = now.getMonth(); // 0 = jan, 11 = dec
    if (m === 11) return Math.min(now.getDate(), 24);
    if (m === 0) return 24; // i januari får man fortfarande titta på alla brev
    return 0;
  }

  function todayNumber() {
    const now = new Date();
    return now.getMonth() === 11 && now.getDate() <= 24 ? now.getDate() : 0;
  }

  function daysUntilDecember() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 11, 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((start - today) / 86400000);
  }

  // ---------- Bygg luckorna ----------
  const doors = {};

  function build() {
    grid.innerHTML = "";
    ORDER.forEach((day, i) => {
      const letter = LETTERS[day - 1];
      const btn = document.createElement("button");
      btn.className = "door " + COLORS[(i + Math.floor(i / 4)) % COLORS.length];
      if (day === 24) btn.classList.add("special");
      btn.dataset.day = day;
      btn.setAttribute("aria-label", "Lucka " + day);
      btn.innerHTML =
        '<span class="inside" aria-hidden="true">' + letter.emoji + "</span>" +
        '<span class="panel"><span class="num">' + day + "</span></span>";
      btn.addEventListener("click", () => onDoor(day, btn));
      grid.appendChild(btn);
      doors[day] = btn;
    });
    refresh();
  }

  function refresh() {
    const upTo = allowedUpTo();
    const today = todayNumber();
    for (let d = 1; d <= 24; d++) {
      const el = doors[d];
      el.classList.toggle("opened", opened.has(d));
      el.classList.toggle("locked", d > upTo);
      el.classList.toggle("today", d === today);
    }

    // Statusraden
    let msg;
    if (opened.size === 24) {
      msg = "God jul! 🎄";
    } else if (testMode) {
      msg = "Testläge: alla luckor går att öppna";
    } else if (upTo === 0) {
      const n = daysUntilDecember();
      msg = n === 1 ? "Imorgon får du öppna första luckan! ✨"
                    : n + " dagar kvar till första luckan ✨";
    } else if (today && !opened.has(today)) {
      msg = "Idag får du öppna lucka " + today + "! 🎁";
    } else if (today && today < 24) {
      msg = "Kom tillbaka imorgon för lucka " + (today + 1) + " 🌙";
    } else {
      msg = "Nu är det jul! 🎅";
    }
    statusEl.textContent = msg;

    finale.hidden = opened.size < 24;
    resetBtn.hidden = !testMode;
  }

  // ---------- Tryck på en lucka ----------
  function onDoor(day, el) {
    unlockAudio();
    if (day > allowedUpTo()) {
      el.classList.remove("wiggle");
      void el.offsetWidth;
      el.classList.add("wiggle");
      setTimeout(() => el.classList.remove("wiggle"), 500);
      lockedToast(day);
      return;
    }

    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    if (opened.has(day)) {
      sky.burst(cx, cy, { confetti: 10, snow: 20 });
      showLetter(day);
      return;
    }

    opened.add(day);
    save(KEY_OPENED, [...opened]);
    el.classList.add("opened");
    jingle();
    setTimeout(() => sky.burst(cx, cy, { confetti: 90, snow: 70 }), 250);
    setTimeout(() => { showLetter(day); refresh(); }, 1150);
  }

  function lockedToast(day) {
    const now = new Date();
    let txt;
    if (now.getMonth() === 11) {
      const n = day - now.getDate();
      txt = n === 1 ? "Lucka " + day + " får du öppna imorgon! 😴"
                    : "Lucka " + day + " får du öppna om " + n + " dagar. Tomtenissen sover fortfarande! 😴";
    } else {
      txt = "Lucka " + day + " öppnas den " + day + " december. 😴";
    }
    toast(txt);
  }

  let toastTimer;
  function toast(txt) {
    toastEl.textContent = txt;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2800);
  }

  // ---------- Brevet ----------
  let currentLetter = null;

  function showLetter(day) {
    const l = LETTERS[day - 1];
    currentLetter = l;
    $("letterDay").textContent = "Lucka " + day;
    const t = $("letterType");
    t.textContent = l.typ;
    t.className = "badge badge-type t-" + l.typ.toLowerCase();
    $("letterEmoji").textContent = l.emoji;
    $("letterTitle").textContent = l.titel;
    const body = $("letterBody");
    body.innerHTML = "";
    l.text.forEach((p) => {
      const el = document.createElement("p");
      el.textContent = p;
      body.appendChild(el);
    });
    // Ny animation varje gång
    const card = $("letter");
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
    card.scrollTop = 0;
    letterBack.hidden = false;
  }

  function closeLetter() {
    stopReading();
    letterBack.hidden = true;
    currentLetter = null;
  }

  $("closeBtn").addEventListener("click", closeLetter);
  letterBack.addEventListener("click", (e) => { if (e.target === letterBack) closeLetter(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !letterBack.hidden) closeLetter(); });

  // ---------- Uppläsning ----------
  const synth = window.speechSynthesis;
  let svVoice = null;
  let reading = false;

  function pickVoice() {
    if (!synth) return;
    const voices = synth.getVoices();
    const sv = voices.filter((v) => /^sv/i.test(v.lang));
    // Föredra en kvinnlig/mjuk röst om den finns (Alva på iPhone), annars första svenska.
    svVoice = sv.find((v) => /alva|klara|sofie|astrid/i.test(v.name)) || sv[0] || null;
  }

  if (synth) {
    pickVoice();
    if ("onvoiceschanged" in synth) synth.addEventListener("voiceschanged", pickVoice);
  } else {
    readBtn.hidden = true;
  }

  function setReading(on) {
    reading = on;
    readBtn.classList.toggle("on", on);
    readLabel.textContent = on ? "Stoppa" : "Läs upp brevet";
    readBtn.querySelector(".ico").textContent = on ? "⏹️" : "🔊";
    if (!on) document.querySelectorAll(".letter-body p.reading").forEach((p) => p.classList.remove("reading"));
  }

  function stopReading() {
    if (synth) synth.cancel();
    setReading(false);
  }

  function readLetter() {
    if (!synth || !currentLetter) return;
    synth.cancel();
    const paras = [...document.querySelectorAll(".letter-body p")];
    const parts = [currentLetter.titel, ...currentLetter.text];
    let i = 0;
    setReading(true);

    const next = () => {
      if (!reading) return;
      paras.forEach((p) => p.classList.remove("reading"));
      if (i >= parts.length) { setReading(false); return; }
      // i = 0 är rubriken, sedan styckena
      const p = i > 0 ? paras[i - 1] : null;
      if (p) {
        p.classList.add("reading");
        p.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
      const u = new SpeechSynthesisUtterance(parts[i]);
      u.lang = "sv-SE";
      if (svVoice) u.voice = svVoice;
      u.rate = 0.88;
      u.pitch = 1.1;
      u.onend = () => { i++; setTimeout(next, 250); };
      u.onerror = () => setReading(false);
      synth.speak(u);
    };
    next();
  }

  readBtn.addEventListener("click", () => {
    unlockAudio();
    if (reading) stopReading(); else readLetter();
  });

  // ---------- Ljud (en liten bjällerklang) ----------
  let actx = null;
  function unlockAudio() {
    if (actx) { if (actx.state === "suspended") actx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try { actx = new AC(); } catch (e) { actx = null; }
  }

  function jingle() {
    if (!actx) return;
    const notes = [1318.5, 1568, 2093, 2637]; // E6 G6 C7 E7
    const t0 = actx.currentTime + 0.02;
    notes.forEach((f, i) => {
      const t = t0 + i * 0.11;
      const o = actx.createOscillator();
      const o2 = actx.createOscillator();
      const g = actx.createGain();
      o.type = "sine"; o.frequency.value = f;
      o2.type = "triangle"; o2.frequency.value = f * 2.01;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g); o2.connect(g); g.connect(actx.destination);
      o.start(t); o2.start(t);
      o.stop(t + 1); o2.stop(t + 1);
    });
  }

  // ---------- Snö och konfetti ----------
  const sky = (() => {
    const c = $("sky");
    const ctx = c.getContext("2d");
    const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, dpr = 1;
    const flakes = [];
    const parts = [];
    const CONF_COLORS = ["#d6312b", "#f0b429", "#1f9a5e", "#ffffff", "#5aa9e6", "#e86aa6"];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth; H = window.innerHeight;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = reduce ? 0 : Math.round(Math.min(90, (W * H) / 9000));
      while (flakes.length < target) flakes.push(newFlake(true));
      flakes.length = target;
    }

    function newFlake(anywhere) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : -10,
        r: 1 + Math.random() * 2.6,
        vy: 0.35 + Math.random() * 0.9,
        sway: Math.random() * Math.PI * 2,
        a: 0.45 + Math.random() * 0.5
      };
    }

    function burst(x, y, opts) {
      const nc = opts.confetti || 0, ns = opts.snow || 0;
      for (let i = 0; i < nc; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 4 + Math.random() * 9;
        parts.push({
          kind: "c", x, y,
          vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 6,
          w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
          rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
          col: CONF_COLORS[i % CONF_COLORS.length],
          life: 0, max: 140 + Math.random() * 60
        });
      }
      for (let i = 0; i < ns; i++) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1.5 + Math.random() * 6;
        parts.push({
          kind: "s", x, y,
          vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 3,
          r: 2 + Math.random() * 3.5,
          life: 0, max: 160 + Math.random() * 80
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);

      // Bakgrundssnö
      ctx.fillStyle = "#fff";
      for (const f of flakes) {
        f.sway += 0.012;
        f.y += f.vy;
        f.x += Math.sin(f.sway) * 0.4;
        if (f.y > H + 10) Object.assign(f, newFlake(false));
        ctx.globalAlpha = f.a;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Utbrott från luckan
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        const fade = Math.max(0, 1 - p.life / p.max);
        if (p.kind === "c") {
          p.vx *= 0.97; p.vy = p.vy * 0.97 + 0.28;
          p.x += p.vx; p.y += p.vy; p.rot += p.vr;
          ctx.save();
          ctx.globalAlpha = fade;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, Math.cos(p.life * 0.2));
          ctx.fillStyle = p.col;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        } else {
          p.vx *= 0.96; p.vy = p.vy * 0.96 + 0.06;
          p.x += p.vx + Math.sin(p.life * 0.08) * 0.5; p.y += p.vy;
          ctx.globalAlpha = fade;
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        if (p.life >= p.max || p.y > H + 40) parts.splice(i, 1);
      }
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize);
    resize();
    requestAnimationFrame(frame);
    return { burst };
  })();

  // ---------- Föräldraläge ----------
  // Håll fingret på rubriken i 3 sekunder för att slå på/av testläge
  // (alla luckor går att öppna). Bra för att prova appen innan december.
  (function parentMode() {
    const target = document.querySelector(".top");
    let timer = null;
    const start = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        testMode = !testMode;
        save(KEY_TEST, testMode);
        refresh();
        toast(testMode ? "Testläge på: alla luckor går att öppna" : "Testläge av");
      }, 3000);
    };
    const cancel = () => clearTimeout(timer);
    target.addEventListener("pointerdown", start);
    ["pointerup", "pointerleave", "pointercancel"].forEach((ev) => target.addEventListener(ev, cancel));
    target.addEventListener("contextmenu", (e) => e.preventDefault());
  })();

  resetBtn.addEventListener("click", () => {
    opened = new Set();
    save(KEY_OPENED, []);
    testMode = false;
    save(KEY_TEST, false);
    refresh();
    toast("Kalendern är nollställd");
  });

  // Uppdatera när appen öppnas igen (t.ex. nästa morgon)
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refresh(); });

  build();

  // ---------- Fungerar offline ----------
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
