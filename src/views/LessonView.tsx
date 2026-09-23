import React, { useState } from 'react';
import { AppView, ChatMessage, ModuleItem } from '../types';
import { INITIAL_MODULES, INITIAL_CHAT_MESSAGES } from '../data/mockData';

interface LessonViewProps {
  onBack: () => void;
  onNavigate: (view: AppView) => void;
  onCompleteCourse: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  onBack,
  onNavigate,
  onCompleteCourse,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(860); // 14:20
  const totalSeconds = 1365; // 22:45
  const [playbackSpeed, setPlaybackSpeed] = useState('1.25x');
  const [showCaptions, setShowCaptions] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [modules, setModules] = useState<ModuleItem[]>(INITIAL_MODULES);
  const [openModuleId, setOpenModuleId] = useState<string>('mod-3');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [newQuestion, setNewQuestion] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSpeedToggle = () => {
    const speeds = ['1.0x', '1.25x', '1.5x', '2.0x'];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    setPlaybackSpeed(speeds[nextIdx]);
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleSendQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      author: 'Ingrid Oyarzún',
      initials: 'IO',
      role: 'student',
      timestamp: 'Justo ahora',
      question: newQuestion,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setNewQuestion('');

    // Simulate instructor response after 1.5s
    setTimeout(() => {
      setChatMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMsg.id
            ? {
                ...msg,
                answer: {
                  author: 'Dr. Roberto Valenzuela (Docente)',
                  text: 'Excelente consulta Ingrid. De acuerdo con el nuevo articulado de la Ley N° 21.719, las medidas de mitigación técnica deben estar documentadas con antelación a cualquier fiscalización formal.',
                  verified: true,
                },
              }
            : msg
        )
      );
    }, 1500);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-36 antialiased">
      {/* Contextual Sub-level Top Navigation Bar */}
      <header className="sticky top-0 left-0 w-full z-40 bg-white border-b border-slate-200 shadow-xs flex items-center justify-between px-4 h-16">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBack}
            aria-label="Atrás"
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex flex-col min-w-0">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
              Certificación Corporativa
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
              Compliance & Protección de Datos
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Enlace de la lección copiado al portapapeles');
              }
            }}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-blue-600 active:scale-95 transition-all"
            title="Compartir lección"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center active:scale-95 transition-all ${
              bookmarked ? 'text-blue-600 bg-blue-50' : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600'
            }`}
            title="Guardar lección"
          >
            <span className={`material-symbols-outlined text-[20px] ${bookmarked ? 'material-symbols-fill' : ''}`}>
              {bookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto px-4 space-y-4 pt-3">
        {/* Interactive Media Player Container */}
        <section className="rounded-2xl overflow-hidden bg-slate-950 text-white shadow-md relative group border border-slate-800">
          <div className="relative w-full aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
            {/* Backdrop graphic */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuByaxIrUar3Dl-UH4Wkbi_zB-d0NU0Ro42Kte0HuW4yXERZrE3fmNhWPrbBC2L_kgFW0BMYwAO0D_JDMs4xIxFii28fA4zMPzwdLB7JRT7UlrD4UNi0WYBNdRAFqNtPTioetBK1zwAVRpvGkuR4X1oVdNknMw3tcgD4F0a-kFWWpwPpXiK5p75Fyx37Id1hv1EjS9ngPnjcFKeEGj4M1s3cBVyFBXBNW1Cvu98cRlYPQr3f_A55DbYs"
              alt="Aula de Conferencia Legal"
              className="absolute inset-0 w-full h-full object-cover opacity-65 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/50"></div>

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="bg-slate-900/85 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold flex items-center gap-1.5 border border-white/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Lección 3 / 8
              </span>
            </div>

            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-white border border-white/10">
              <span className="material-symbols-outlined text-[13px] text-blue-300">hd</span>
              <span>1080p</span>
            </div>

            {/* Central Play/Pause Button */}
            <button
              onClick={togglePlay}
              className="relative z-10 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[32px] material-symbols-fill">
                {isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </button>

            {/* Subtitles Preview simulation */}
            {showCaptions && (
              <div className="absolute bottom-12 inset-x-4 text-center z-10">
                <span className="inline-block bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-md text-xs font-medium shadow-sm">
                  "...las transferencias transfronterizas sin garantías adecuadas conllevan sanciones de hasta 20.000 UTM..."
                </span>
              </div>
            )}

            {/* Player Controls Overlay Bottom */}
            <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950 to-transparent flex flex-col gap-1.5 z-20">
              {/* Scrubbing Timeline */}
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setProgressSeconds(Math.floor(ratio * totalSeconds));
                }}
                className="relative w-full h-2 bg-white/20 hover:h-2.5 rounded-full cursor-pointer overflow-hidden transition-all"
              >
                <div
                  className="absolute top-0 left-0 bottom-0 bg-blue-500 rounded-full"
                  style={{ width: `${(progressSeconds / totalSeconds) * 100}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-xs text-white/85 pt-1">
                <div className="flex items-center gap-1.5 font-mono">
                  <span className="font-bold text-white">{formatTime(progressSeconds)}</span>
                  <span className="text-white/40">/</span>
                  <span>{formatTime(totalSeconds)}</span>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <button
                    onClick={handleSpeedToggle}
                    className="hover:text-blue-300 font-bold text-xs"
                    title="Velocidad"
                  >
                    {playbackSpeed}
                  </button>
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`hover:text-blue-300 ${showCaptions ? 'text-blue-400' : 'text-white/60'}`}
                    title="Subtítulos"
                  >
                    <span className="material-symbols-outlined text-[18px]">closed_caption</span>
                  </button>
                  <button
                    onClick={() => alert('Modo pantalla completa activado')}
                    className="hover:text-blue-300"
                    title="Pantalla Completa"
                  >
                    <span className="material-symbols-outlined text-[18px]">fullscreen</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lesson Overview & Metadata */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3.5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                Módulo 3 • En curso
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                22 min lectivos
              </span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              Transferencias Internacionales de Datos y Régimen Sancionatorio
            </h2>
          </div>

          {/* Instructor Bio Pill */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-200 ring-2 ring-blue-500/20 shadow-xs">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGAMdlLy9zkTqx99rCzOhafnjJByI_aXcwVsXWfbAdBHmI1Wg6omw38BFtVuKTeD2HmkPjKc43B56c5jiUGYYj3nGA2taV49qYRUjFwK0FIHw2xAJj4YH_e-Wi3HNcMhfFZgdq276JdNuE9RXnxiBj7s9GLU5z1pF2bz6VXxF47USzbhcP3snSuTMFOPpFgJUTuCdAPGuLZeR45ZTZ-UsHSq3IizfckoM_d92DhdmHK3jpHwpt64RU"
                  alt="Dr. Roberto Valenzuela"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-snug">
                  Dr. Roberto Valenzuela
                </p>
                <p className="text-[11px] text-slate-500">
                  Especialista en Derecho Digital & RGPD
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Docente titular del Magíster en Derecho Corporativo. Más de 15 años asesorando a la banca nacional.')}
              className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
              title="Ver perfil docente"
            >
              <span className="material-symbols-outlined text-[20px]">badge</span>
            </button>
          </div>

          {/* Downloadable Course Resources */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 border border-red-100 shadow-xs">
                <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 truncate">
                  Guía Metodológica Oficial.pdf
                </p>
                <p className="text-[10px] text-slate-500">
                  Material didáctico anexo • 12 páginas (3.4 MB)
                </p>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="shrink-0 px-3 py-1.5 bg-white text-blue-600 border border-slate-300 rounded-lg text-xs font-bold flex items-center gap-1 hover:bg-blue-50 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[15px]">
                {downloadSuccess ? 'check' : 'download'}
              </span>
              <span>{downloadSuccess ? '¡Descargado!' : 'Descargar'}</span>
            </button>
          </div>
        </section>

        {/* Modular Course Curriculum (Accordion Architecture) */}
        <section className="space-y-2.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-900">Estructura Curricular</h3>
            <span className="text-xs text-slate-500 font-semibold">2 de 4 Módulos</span>
          </div>

          <div className="space-y-2">
            {modules.map((mod) => {
              const isOpen = openModuleId === mod.id;
              return (
                <div
                  key={mod.id}
                  className={`bg-white rounded-xl border transition-all overflow-hidden shadow-xs ${
                    mod.status === 'active' ? 'border-blue-500 ring-1 ring-blue-500/20' : 'border-slate-200'
                  }`}
                >
                  <div
                    onClick={() => setOpenModuleId(isOpen ? '' : mod.id)}
                    className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-slate-50 select-none transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          mod.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : mod.status === 'active'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {mod.status === 'completed' ? 'check' : mod.status === 'active' ? 'play_arrow' : 'lock'}
                        </span>
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-bold block ${
                            mod.status === 'completed'
                              ? 'text-emerald-700'
                              : mod.status === 'active'
                              ? 'text-blue-600'
                              : 'text-slate-400'
                          }`}
                        >
                          {mod.badge}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900">{mod.title}</h4>
                      </div>
                    </div>

                    <span
                      className={`material-symbols-outlined text-[18px] text-slate-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      expand_more
                    </span>
                  </div>

                  {isOpen && (
                    <div className="px-4 pb-3 pt-1 border-t border-slate-100 space-y-1 bg-slate-50/50">
                      {mod.lessons.map((lesson) => (
                        <div
                          key={lesson.id}
                          className={`flex items-center justify-between py-2 px-2.5 rounded-lg text-xs transition-colors ${
                            lesson.status === 'active'
                              ? 'bg-blue-50 text-blue-900 font-bold border-l-4 border-l-blue-600'
                              : 'text-slate-600 hover:bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-[16px] ${
                                lesson.status === 'completed'
                                  ? 'text-emerald-600'
                                  : lesson.status === 'active'
                                  ? 'text-blue-600 animate-pulse'
                                  : 'text-slate-300'
                              }`}
                            >
                              {lesson.status === 'completed'
                                ? 'check_circle'
                                : lesson.status === 'active'
                                ? 'play_circle'
                                : 'radio_button_unchecked'}
                            </span>
                            <span className={lesson.status === 'completed' ? 'line-through text-slate-400' : ''}>
                              {lesson.number} {lesson.title}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Collaborative Q&A Forum */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">forum</span>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Chat del Curso & Dudas al Docente
              </h3>
            </div>
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-blue-100">
              {chatMessages.length} activas
            </span>
          </div>

          {/* Messages list */}
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center justify-center">
                      {msg.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800">{msg.author}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5">• {msg.timestamp}</span>
                    </div>
                  </div>
                  {msg.answer && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      Respondido
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{msg.question}"
                </p>

                {msg.answer && (
                  <div className="bg-white rounded-lg p-2.5 border-l-2 border-l-blue-600 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                    <span className="material-symbols-outlined text-blue-600 text-[16px] shrink-0 mt-0.5">
                      verified
                    </span>
                    <div>
                      <span className="font-bold text-slate-900 block text-[11px]">
                        {msg.answer.author}:
                      </span>
                      <p className="text-xs mt-0.5 leading-relaxed">{msg.answer.text}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Fast Question Input */}
          <form onSubmit={handleSendQuestion} className="flex items-center gap-2 pt-1">
            <input
              type="text"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Escribe tu consulta para el docente..."
              className="w-full bg-white text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-xs"
            />
            <button
              type="submit"
              aria-label="Enviar pregunta"
              className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 active:scale-95 transition-all shrink-0 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </section>
      </main>

      {/* Sticky Bottom Action Footer: Complete lesson and unlock certification! */}
      <div className="fixed bottom-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => {
              onCompleteCourse();
              onNavigate('certificados');
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-[0.98] transition-all"
          >
            <span>Marcar como Completada y Siguiente Lección</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
