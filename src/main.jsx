import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Copy,
  ExternalLink,
  Flag,
  Lightbulb,
  Menu,
  Play,
  Search,
  Sparkles,
  Sprout,
  Terminal,
  X,
} from "lucide-react";
import "./styles.css";

const modules = import.meta.glob("../content/lessons/*.mdx", { eager: true });
const lessons = Object.entries(modules)
  .map(([path, module]) => ({
    ...module.meta,
    slug: path.split("/").pop().replace(".mdx", ""),
    Component: module.default,
  }))
  .sort((a, b) => a.order - b.order);
const STORAGE_KEY = "arduino-atolyesi-progress-v1";
const groups = [...new Set(lessons.map((lesson) => lesson.group))];

function readProgress() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(value)
      ? value.filter((slug) => lessons.some((lesson) => lesson.slug === slug))
      : [];
  } catch {
    return [];
  }
}

function ArduinoMark({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M20 20c-4-9-13-8-13 0s9 9 13 0c4-9 13-8 13 0s-9 9-13 0"
        stroke="currentColor"
        strokeWidth="2.4"
      />
      <path
        d="M10 20h5m10 0h5m-2.5-2.5v5"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function Board({ lit = false }) {
  return (
    <svg
      viewBox="0 0 410 280"
      role="img"
      aria-label="USB girişi, bağlantı pinleri ve mikrodenetleyicisiyle temsili Arduino Uno kartı"
      className="arduino-board"
    >
      <defs>
        <filter id="board-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow
            dx="0"
            dy="12"
            stdDeviation="10"
            floodColor="#004b46"
            floodOpacity=".15"
          />
        </filter>
        <pattern
          id="pin-pattern"
          width="17"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <rect x="4" y="4" width="6" height="7" rx="1" fill="#b9b7a8" />
        </pattern>
      </defs>
      <g
        transform="translate(39 43) rotate(-7 165 100)"
        filter="url(#board-shadow)"
      >
        <path
          d="M14 0H302L318 16V188L303 204H14Q0 204 0 190V14Q0 0 14 0Z"
          fill="#087f7e"
        />
        <path
          d="M16 6H297L312 20V185L300 198H16Q6 198 6 188V16Q6 6 16 6Z"
          stroke="#66c2b2"
          strokeOpacity=".45"
          fill="none"
        />
        {[
          [17, 17],
          [299, 23],
          [17, 186],
          [296, 181],
        ].map(([x, y]) => (
          <g key={x + "-" + y}>
            <circle cx={x} cy={y} r="7" fill="#e2d6ab" />
            <circle cx={x} cy={y} r="3.5" fill="#e8f4ec" />
          </g>
        ))}
        <path
          d="M40 45H104V67H151V102M44 134H93V110H156M184 45V62H264V114M155 165V185H248M225 134V158H279"
          stroke="#59b3a4"
          strokeWidth="1.2"
          fill="none"
          opacity=".6"
        />
        <rect x="-10" y="41" width="53" height="48" rx="3" fill="#d7ddda" />
        <rect x="-12" y="48" width="13" height="34" rx="1" fill="#a6b1af" />
        <rect x="-7" y="54" width="7" height="22" fill="#526967" />
        <path d="M9 42V88M35 42V88" stroke="#a3aeab" />
        <rect x="-5" y="141" width="43" height="29" rx="3" fill="#243e3c" />
        <rect x="-7" y="146" width="12" height="19" rx="3" fill="#152b29" />
        <rect x="67" y="11" width="111" height="17" rx="2" fill="#203e3a" />
        <rect x="190" y="11" width="94" height="17" rx="2" fill="#203e3a" />
        <rect x="67" y="11" width="111" height="17" fill="url(#pin-pattern)" />
        <rect x="190" y="11" width="94" height="17" fill="url(#pin-pattern)" />
        <rect x="86" y="177" width="94" height="17" rx="2" fill="#203e3a" />
        <rect x="198" y="177" width="85" height="17" rx="2" fill="#203e3a" />
        <rect x="86" y="177" width="94" height="17" fill="url(#pin-pattern)" />
        <rect x="198" y="177" width="85" height="17" fill="url(#pin-pattern)" />
        {Array.from({ length: 14 }, (_, i) => (
          <g key={i}>
            <rect
              x={126 + i * 10}
              y="119"
              width="4"
              height="9"
              fill="#b4c1b8"
            />
            <rect
              x={126 + i * 10}
              y="151"
              width="4"
              height="9"
              fill="#b4c1b8"
            />
          </g>
        ))}
        <rect x="120" y="126" width="145" height="27" rx="2" fill="#243a35" />
        <circle cx="128" cy="139" r="3" fill="#49594e" />
        <text
          x="145"
          y="143"
          fill="#91a59a"
          fontFamily="monospace"
          fontSize="7"
        >
          ATMEGA328P
        </text>
        <rect x="63" y="70" width="25" height="25" rx="2" fill="#c1ccc3" />
        <circle cx="75.5" cy="82.5" r="7" fill="#455c54" />
        <rect x="93" y="108" width="15" height="28" rx="5" fill="#c2cec5" />
        <path d="M98 113V131" stroke="#889b92" />
        <circle cx="60" cy="151" r="11" fill="#d3d9d0" />
        <circle cx="60" cy="151" r="7" fill="#657a6b" />
        <circle cx="85" cy="151" r="9" fill="#d3d9d0" />
        <rect x="281" y="82" width="9" height="6" rx="1" fill="#a7e590" />
        <text x="295" y="88" fill="#d7f1df" fontSize="7" fontFamily="monospace">
          ON
        </text>
        <rect
          x="106"
          y="43"
          width="8"
          height="5"
          rx="1"
          fill={lit ? "#fff27a" : "#d3cf9d"}
        />
        {lit && <circle cx="110" cy="45" r="12" fill="#ffe86a" opacity=".35" />}
        <text x="92" y="48" fill="#d7f1df" fontSize="7" fontFamily="monospace">
          L
        </text>
        <g
          transform="translate(165 66)"
          stroke="#e2f3e8"
          strokeWidth="3"
          fill="none"
        >
          <path d="M22 13C10-9-12-6-12 13s22 22 34 0C34-9 56-6 56 13S34 35 22 13Z" />
          <path d="M-4 13H7m30 0h11m-5.5-5.5v11" strokeWidth="2" />
        </g>
        <text
          x="244"
          y="89"
          fill="#e2f3e8"
          fontFamily="monospace"
          fontSize="19"
          fontWeight="700"
        >
          UNO
        </text>
        <text x="181" y="43" fill="#c2e7d8" fontFamily="monospace" fontSize="6">
          DIGITAL (PWM ~)
        </text>
        <text x="95" y="172" fill="#c2e7d8" fontFamily="monospace" fontSize="6">
          POWER
        </text>
        <text
          x="220"
          y="172"
          fill="#c2e7d8"
          fontFamily="monospace"
          fontSize="6"
        >
          ANALOG IN
        </text>
      </g>
    </svg>
  );
}

function BoardIntro() {
  return (
    <div className="board-intro">
      <div className="board-copy">
        <span className="mini-label">
          <span /> KÜÇÜK BİR KART, BÜYÜK FİKİRLER
        </span>
        <h2>
          Hayal et.
          <br />
          Kodla. <span>Hayata geçir.</span>
        </h2>
        <p>
          Bir ışık, bir robot, belki de kendi icadın.
          <br />
          Her şey küçük bir adımla başlar.
        </p>
        <span className="board-signature">
          <Sparkles size={15} /> İlk adımını birlikte atalım.
        </span>
      </div>
      <div className="board-visual">
        <div className="board-orbit" />
        <Board />
        <span className="board-caption">
          Merhaba, ben Arduino Uno! <span>↗</span>
        </span>
      </div>
    </div>
  );
}

function Callout({ children, title = "Aklında bulunsun", type = "tip" }) {
  return (
    <aside className={`callout ${type}`}>
      <Lightbulb size={20} />
      <div>
        <strong>{title}</strong>
        <div>{children}</div>
      </div>
    </aside>
  );
}

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const code = children?.props?.children || "";
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(String(code));
      setCopied(true);
      setError(false);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setError(true);
    }
  }
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>
          <Terminal size={14} /> Arduino
        </span>
        <button onClick={copy}>
          {copied ? <Check size={14} /> : <Copy size={14} />}{" "}
          {copied ? "Kopyalandı" : "Kodu kopyala"}
        </button>
      </div>
      <pre>{children}</pre>
      {error && (
        <p role="status">
          Kod otomatik kopyalanamadı. Kodu seçip kopyalayabilirsin.
        </p>
      )}
    </div>
  );
}

function Quiz({ question, options, answer, explanation }) {
  const [selected, setSelected] = useState(null);
  return (
    <section className="quiz">
      <span className="section-eyebrow">
        <CircleHelp size={16} /> KÜÇÜK BİR SORU
      </span>
      <h3>{question}</h3>
      <div className="quiz-options">
        {options.map((option, i) => (
          <button
            key={option}
            className={
              selected === i ? (i === answer ? "correct" : "incorrect") : ""
            }
            onClick={() => setSelected(i)}
            aria-pressed={selected === i}
          >
            <span>{String.fromCharCode(65 + i)}</span>
            {option}
            {selected === i && i === answer && <Check size={17} />}
          </button>
        ))}
      </div>
      {selected !== null && (
        <p className="quiz-feedback" role="status">
          {selected === answer
            ? `Harika! ${explanation}`
            : "Bir daha düşünelim. Başka bir seçeneği deneyebilirsin."}
        </p>
      )}
    </section>
  );
}

function BlinkLab() {
  const [running, setRunning] = useState(false);
  const [delay, setDelay] = useState(1000);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    if (!running) {
      setLit(false);
      return;
    }
    setLit(true);
    const timer = setInterval(() => setLit((value) => !value), delay);
    return () => clearInterval(timer);
  }, [running, delay]);
  return (
    <section className="blink-lab">
      <div className="lab-board">
        <Board lit={lit} />
        <span className={`led-status ${lit ? "on" : ""}`}>
          <i />
          {running ? (lit ? "LED yanıyor" : "LED söndü") : "Denemeye hazır"}
        </span>
      </div>
      <div className="lab-controls">
        <span className="section-eyebrow">SIRA SENDE</span>
        <h3>Işığın hızını değiştir</h3>
        <p>Bekleme süresi azalınca ne oluyor?</p>
        <label htmlFor="blink-delay">
          Bekleme süresi <strong>{delay} ms</strong>
        </label>
        <input
          id="blink-delay"
          type="range"
          min="200"
          max="2000"
          step="100"
          value={delay}
          onChange={(event) => setDelay(Number(event.target.value))}
        />
        <button
          className="primary-button"
          onClick={() => setRunning((value) => !value)}
        >
          <Play size={15} />
          {running ? "Durdur" : "Denemeyi başlat"}
        </button>
        <small>Bu, kart üzerindeki LED’in temsili bir gösterimidir.</small>
      </div>
    </section>
  );
}

function LearningGoals({ items }) {
  return (
    <div className="learning-goals">
      {items.map((item, i) => (
        <div key={item}>
          <span className="goal-number">0{i + 1}</span>
          <span>{item}</span>
          <Check size={15} />
        </div>
      ))}
    </div>
  );
}

const mdxComponents = {
  BoardIntro,
  Callout,
  Quiz,
  BlinkLab,
  LearningGoals,
  pre: CodeBlock,
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      {...props}
      {...(href?.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
      {href?.startsWith("http") && <ExternalLink size={12} />}
    </a>
  ),
};

function App() {
  const [slug, setSlug] = useState(
    () => window.location.hash.slice(1) || lessons[0].slug,
  );
  const [completed, setCompleted] = useState(readProgress);
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobile, setMobile] = useState(
    () => window.matchMedia("(max-width: 800px)").matches,
  );
  const [helpOpen, setHelpOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const titleRef = useRef(null);
  const helpRef = useRef(null);
  const helpButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  const initialNavigation = useRef(true);
  const index = lessons.findIndex((lesson) => lesson.slug === slug);
  const lesson = lessons[index >= 0 ? index : 0];
  const currentIndex = Math.max(0, index);
  const Content = lesson.Component;
  const done = completed.includes(lesson.slug);
  const percentage = Math.round((completed.length / lessons.length) * 100);
  useEffect(() => {
    const navigate = () => {
      setSlug(window.location.hash.slice(1));
      setMenuOpen(false);
    };
    window.addEventListener("hashchange", navigate);
    return () => window.removeEventListener("hashchange", navigate);
  }, []);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 800px)");
    const update = () => {
      setMobile(query.matches);
      if (!query.matches) setMenuOpen(false);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    document.title = `${lesson.title} · Arduino Atölyesi`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (initialNavigation.current) {
      initialNavigation.current = false;
    } else {
      titleRef.current?.focus({ preventScroll: true });
    }
  }, [lesson.slug, lesson.title]);
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [completed]);
  useEffect(() => {
    if (helpOpen) helpRef.current?.showModal();
    else helpRef.current?.close();
  }, [helpOpen]);
  useEffect(() => {
    document.body.classList.toggle("menu-is-open", menuOpen);
    const escape = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    if (menuOpen) document.addEventListener("keydown", escape);
    return () => {
      document.body.classList.remove("menu-is-open");
      document.removeEventListener("keydown", escape);
    };
  }, [menuOpen]);
  const visibleLessons = lessons.filter((lesson) =>
    `${lesson.title} ${lesson.group}`
      .toLocaleLowerCase("tr")
      .includes(search.toLocaleLowerCase("tr")),
  );
  function toggleCompleted() {
    setCompleted((value) =>
      done
        ? value.filter((item) => item !== lesson.slug)
        : [...value, lesson.slug],
    );
  }
  return (
    <>
      <a
        className="skip-link"
        href="#lesson-content"
        onClick={(event) => {
          event.preventDefault();
          titleRef.current?.focus();
        }}
      >
        Ders içeriğine geç
      </a>
      <header className="mobile-header">
        <a href={`#${lessons[0].slug}`} className="brand">
          <span className="brand-mark">
            <ArduinoMark />
          </span>
          <strong>Arduino Atölyesi</strong>
        </a>
        <button
          ref={menuButtonRef}
          className="icon-button"
          aria-label={menuOpen ? "Ders menüsünü kapat" : "Ders menüsünü aç"}
          aria-expanded={menuOpen}
          aria-controls="sidebar"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>
      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => {
            setMenuOpen(false);
            menuButtonRef.current?.focus();
          }}
        />
      )}
      <aside
        id="sidebar"
        className={`sidebar ${menuOpen ? "open" : ""}`}
        aria-label="Ders menüsü"
        inert={mobile && !menuOpen}
      >
        <a className="brand desktop-brand" href={`#${lessons[0].slug}`}>
          <span className="brand-mark">
            <ArduinoMark />
          </span>
          <span>
            <strong>Arduino Atölyesi</strong>
            <small>Merak et. Keşfet. Üret.</small>
          </span>
        </a>
        <div className="course-label">
          <span className="course-icon">
            <Sprout size={17} />
          </span>
          <div>
            <strong>Arduino’ya ilk adım</strong>
            <span>Başlangıç seviyesi</span>
          </div>
          <span className="course-badge">01</span>
        </div>
        <label className="search-box">
          <Search size={16} />
          <input
            type="search"
            placeholder="Derslerde ara..."
            aria-label="Derslerde ara"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <nav className="lesson-nav" aria-label="Dersler">
          <div className="nav-label">
            ÖĞRENME YOLCULUĞUN <span>{lessons.length} ders</span>
          </div>
          {groups.map((group, groupIndex) => {
            const grouped = visibleLessons.filter(
              (lesson) => lesson.group === group,
            );
            if (!grouped.length) return null;
            const hidden = !search && collapsed.includes(group);
            return (
              <div className="lesson-group" key={group}>
                <button
                  className="group-heading"
                  aria-expanded={!hidden}
                  aria-controls={`group-${groupIndex}`}
                  onClick={() =>
                    setCollapsed((value) =>
                      value.includes(group)
                        ? value.filter((item) => item !== group)
                        : [...value, group],
                    )
                  }
                >
                  <span className="group-number">
                    {String(groupIndex + 1).padStart(2, "0")}
                  </span>
                  {group}
                  <ChevronDown
                    size={14}
                    className={hidden ? "collapsed" : ""}
                  />
                </button>
                <div id={`group-${groupIndex}`} hidden={hidden}>
                  {grouped.map((item) => (
                    <a
                      key={item.slug}
                      href={`#${item.slug}`}
                      className={`lesson-link ${lesson.slug === item.slug ? "active" : ""}`}
                      aria-current={
                        lesson.slug === item.slug ? "page" : undefined
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      <span
                        className={`lesson-indicator ${completed.includes(item.slug) ? "is-complete" : ""}`}
                      >
                        {completed.includes(item.slug) ? (
                          <Check size={11} />
                        ) : lesson.slug === item.slug ? (
                          <span />
                        ) : null}
                      </span>
                      <span>{item.title}</span>
                      {lesson.slug === item.slug && <ChevronRight size={14} />}
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
          {!visibleLessons.length && (
            <p className="no-results">
              Bu isimde bir ders bulamadık. Başka bir kelime deneyebilirsin.
            </p>
          )}
        </nav>
        <div className="sidebar-footer">
          <div className="progress-card">
            <div className="progress-title">
              <span>Biraz daha, bir adım daha.</span>
              <Sprout size={18} />
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Ders ilerlemen"
              aria-valuenow={completed.length}
              aria-valuemin={0}
              aria-valuemax={lessons.length}
            >
              <span style={{ width: `${percentage}%` }} />
            </div>
            <p>
              <span>
                <strong>{completed.length}</strong> / {lessons.length} ders
                tamamlandı
              </span>
              <strong>%{percentage}</strong>
            </p>
            {storageError && (
              <small role="status">Tarayıcı ilerlemeni kaydedemedi.</small>
            )}
          </div>
          <button
            ref={helpButtonRef}
            className="help-button"
            onClick={() => setHelpOpen(true)}
          >
            <CircleHelp size={16} /> Atölye nasıl çalışır?
            <ArrowRight size={14} />
          </button>
          <span className="sidebar-note">
            Büyük fikirler, küçük adımlarla başlar.
          </span>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <BookOpen size={16} />
            <span>Arduino’ya ilk adım</span>
            <ChevronRight size={13} />
            <strong>{lesson.group}</strong>
          </div>
          <span className="topbar-note">
            <span /> Öğrenmek için güzel bir gün
          </span>
        </header>
        <main className="lesson-container" id="lesson-content">
          <div className="lesson-heading">
            <div className="lesson-meta">
              <span className="lesson-pill">
                DERS {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span>
                <Clock3 size={14} />
                {lesson.duration} dakika
              </span>
              <span>
                <span className="level-bars">
                  <i />
                  <i />
                  <i />
                </span>
                Başlangıç
              </span>
            </div>
            <h1 ref={titleRef} tabIndex={-1}>
              {lesson.title}
            </h1>
            <p>{lesson.description}</p>
          </div>
          <article className="lesson-prose" key={lesson.slug}>
            <Content components={mdxComponents} />
          </article>
          <div className="completion-panel">
            <span className={`completion-icon ${done ? "done" : ""}`}>
              {done ? <Check size={21} /> : <Flag size={21} />}
            </span>
            <div>
              <strong>
                {done
                  ? "Bir adım daha ilerledin!"
                  : "Bu adımı tamamlamaya hazır mısın?"}
              </strong>
              <p>
                {done
                  ? "Dilediğin zaman bu derse geri dönebilirsin."
                  : "Anladıysan işaretle, birlikte devam edelim."}
              </p>
            </div>
            <button
              className={`complete-button ${done ? "done" : ""}`}
              onClick={toggleCompleted}
              aria-pressed={done}
            >
              <Check size={16} />
              {done ? "Tamamlandı" : "Dersi tamamla"}
            </button>
          </div>
          {completed.length === lessons.length && (
            <p className="all-complete" role="status">
              <Sparkles size={18} /> Harika iş çıkardın! Tüm dersleri
              tamamladın. Şimdi kendi projeni tasarlama zamanı.
            </p>
          )}
          <nav
            className="lesson-pagination"
            aria-label="Dersler arasında gezinme"
          >
            {currentIndex > 0 ? (
              <a href={`#${lessons[currentIndex - 1].slug}`}>
                <ArrowLeft size={18} />
                <span>
                  <small>ÖNCEKİ DERS</small>
                  {lessons[currentIndex - 1].title}
                </span>
              </a>
            ) : (
              <span className="first-lesson-note">
                <Sprout size={17} /> Her yolculuk bir ilk adımla başlar.
              </span>
            )}
            {currentIndex < lessons.length - 1 ? (
              <a
                href={`#${lessons[currentIndex + 1].slug}`}
                className="next-lesson"
              >
                <span>
                  <small>SONRAKİ DERS</small>
                  {lessons[currentIndex + 1].title}
                </span>
                <ArrowRight size={18} />
              </a>
            ) : (
              <a href={`#${lessons[0].slug}`} className="next-lesson">
                <span>
                  <small>TEKRAR KEŞFET</small>İlk derse dön
                </span>
                <ArrowRight size={18} />
              </a>
            )}
          </nav>
          <footer className="page-footer">
            <span>
              <ArduinoMark /> Arduino Atölyesi
            </span>
            <span>Merakını yanında getir. Gerisini birlikte öğreniriz.</span>
          </footer>
        </main>
      </div>
      <dialog
        ref={helpRef}
        className="help-dialog"
        onCancel={() => setHelpOpen(false)}
        onClose={() => {
          setHelpOpen(false);
          helpButtonRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setHelpOpen(false);
        }}
      >
        <button
          className="icon-button dialog-close"
          aria-label="Yardımı kapat"
          onClick={() => setHelpOpen(false)}
        >
          <X size={20} />
        </button>
        <span className="help-illustration">
          <BookOpen size={26} />
        </span>
        <h2>Atölyeye hoş geldin!</h2>
        <p>Birlikte öğrenmek için ihtiyacın olan her şey burada.</p>
        <ol>
          <li>
            <strong>Bir ders seç.</strong> Soldaki dersleri sırayla takip et.
          </li>
          <li>
            <strong>Oku ve dene.</strong> Örnekleri incele, küçük soruları
            cevapla.
          </li>
          <li>
            <strong>Adımını işaretle.</strong> “Dersi tamamla” ile ilerlemeni
            kaydet.
          </li>
        </ol>
        <div className="help-note">
          İlerlemen bu tarayıcıda saklanır. Başka bir cihazda görünmez. Tarayıcı
          verilerini temizlersen sıfırlanır.
        </div>
        <button className="primary-button" onClick={() => setHelpOpen(false)}>
          Hadi başlayalım <ArrowRight size={16} />
        </button>
      </dialog>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
