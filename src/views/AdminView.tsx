import React, { useState } from 'react';
import { Course, AreaDistribution, AppView } from '../types';
import { CreateCourseModal } from '../components/CreateCourseModal';

interface AdminViewProps {
  courses: Course[];
  areas: AreaDistribution[];
  onCourseCreated: (course: Course) => void;
  onNavigate: (view: AppView) => void;
  onSwitchToStudent: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  courses,
  areas: initialAreas,
  onCourseCreated,
  onNavigate,
  onSwitchToStudent,
}) => {
  const [areas, setAreas] = useState<AreaDistribution[]>(initialAreas);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'publicado' | 'borrador' | 'en_revision'>('todos');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [uploadingProgress, setUploadingProgress] = useState(65);
  const [isPaused, setIsPaused] = useState(false);
  const [showUploadItem, setShowUploadItem] = useState(true);
  const [aiTranscription, setAiTranscription] = useState(true);
  const [lessonTitle, setLessonTitle] = useState('Transferencias Internacionales de Datos');
  const [lessonDuration, setLessonDuration] = useState('22 min');
  const [syncToast, setSyncToast] = useState(false);
  const [scormToast, setScormToast] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  // Totals calculations
  const totalEnrolled = courses.reduce((acc, c) => acc + (c.enrolledCount || 0), 0);
  const totalConnected = courses.reduce(
    (acc, c) => acc + (c.connectedUsers ?? Math.floor((c.enrolledCount || 100) * 0.12)),
    0
  );
  const totalActive24h = courses.reduce(
    (acc, c) => acc + (c.activeUsers24h ?? Math.floor((c.enrolledCount || 100) * 0.65)),
    0
  );
  const globalProgress = courses.length
    ? Math.round(courses.reduce((acc, c) => acc + c.progressPercent, 0) / courses.length)
    : 78;

  // Real CSV File Export for Connected and Active Users with Totals
  const handleDownloadUsersReport = () => {
    const headers = [
      'Curso',
      'Código',
      'Categoría',
      'Código_SENCE',
      'Inscritos_Totales',
      'Usuarios_Conectados_En_Vivo',
      'Usuarios_Activos_24h',
      'Avance_Promedio_Pct',
      'Estado',
    ];

    const rows = courses.map((c) => {
      const conn = c.connectedUsers ?? Math.floor((c.enrolledCount || 100) * 0.12);
      const act = c.activeUsers24h ?? Math.floor((c.enrolledCount || 100) * 0.65);
      return [
        `"${c.title.replace(/"/g, '""')}"`,
        `"${c.code}"`,
        `"${c.category}"`,
        `"${c.senceCode || '#4892-CL'}"`,
        c.enrolledCount || 0,
        conn,
        act,
        `"${c.progressPercent}%"`,
        `"${c.status}"`,
      ];
    });

    const totalsRow = [
      '"TOTALES GENERALES"',
      '"EMPRESA-2026"',
      '"TODAS LAS ÁREAS"',
      '"SENCE N° 98231-CL"',
      totalEnrolled,
      totalConnected,
      totalActive24h,
      `"${globalProgress}%"`,
      '"ACTIVO"',
    ];

    const csvContent =
      '\uFEFF' +
      [headers.join(';'), ...rows.map((r) => r.join(';')), totalsRow.join(';')].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Consola_Viatech_Reporte_Usuarios_Conectados_y_Activos_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 4500);
  };

  // Toggle area checkbox
  const toggleArea = (id: string) => {
    setAreas((prev) =>
      prev.map((a) => (a.id === id ? { ...a, checked: !a.checked } : a))
    );
  };

  const handleAddNewDepartment = () => {
    const deptName = prompt('Nombre del nuevo departamento o cuadrilla:');
    if (!deptName?.trim()) return;

    const newDept: AreaDistribution = {
      id: `area-${Date.now()}`,
      name: deptName.trim(),
      collaboratorsCount: 95,
      activeRate: 85,
      checked: true,
      notes: '95 colaboradores • Cuadrilla activa',
    };
    setAreas((prev) => [...prev, newDept]);
  };

  const handleSyncLMS = () => {
    setSyncToast(true);
    setTimeout(() => setSyncToast(false), 3500);
  };

  const handleImportScorm = () => {
    setScormToast(true);
    setTimeout(() => setScormToast(false), 3500);
  };

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchSearch) return false;
    if (statusFilter === 'todos') return true;
    return c.status === statusFilter;
  });

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-3 pb-28 flex flex-col gap-5 antialiased">
      {/* Consola Viatech Top Identity Bar */}
      <section className="bg-slate-900 text-white p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[24px]">terminal</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Consola Viatech
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30 uppercase">
                ADMIN LMS SENCE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Panel Corporativo de Gestión, Analítica y Acreditación de Usuarios
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadUsersReport}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
            title="Descargar listado de usuarios conectados y activos con totales"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Descargar Reporte de Usuarios</span>
          </button>
          <button
            onClick={onSwitchToStudent}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
          >
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span className="hidden sm:inline">Vista Colaborador (Ingrid)</span>
          </button>
        </div>
      </section>

      {/* Executive KPIs Grid */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Cursos Activos</span>
            <span className="material-symbols-outlined text-blue-600 text-[18px]">school</span>
          </div>
          <p className="text-2xl font-mono font-extrabold text-slate-900 mt-1">24</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[13px]">arrow_upward</span>
            +3 este mes
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Videos en Cloud</span>
            <span className="material-symbols-outlined text-blue-600 text-[18px]">video_library</span>
          </div>
          <p className="text-2xl font-mono font-extrabold text-slate-900 mt-1">142</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">85 GB utilizados</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Colaboradores</span>
            <span className="material-symbols-outlined text-blue-600 text-[18px]">group</span>
          </div>
          <p className="text-2xl font-mono font-extrabold text-slate-900 mt-1">1,240</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Asignados en plataforma</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-semibold">Tasa Finalización</span>
            <span className="material-symbols-outlined text-emerald-600 text-[18px]">insights</span>
          </div>
          <p className="text-2xl font-mono font-extrabold text-slate-900 mt-1">78.4%</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            <span className="material-symbols-outlined text-[13px]">trending_up</span>
            +5.2% vs Q1
          </span>
        </div>
      </section>

      {/* Main Admin Actions Bar */}
      <section className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900">Gestión de Cursos & Módulos</h2>
          <p className="text-xs text-slate-500">Publica contenidos, administra cuadrillas y sincroniza con CDN corporativo.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleImportScorm}
            className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">upload_file</span>
            <span>Importar SCORM / Masivo</span>
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            <span>Crear Nuevo Curso</span>
          </button>
        </div>
      </section>

      {/* Reporte de Usuarios Conectados y Activos por Curso con Totales */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600 text-[22px]">group_work</span>
              <h3 className="text-base font-bold text-slate-900">
                Usuarios Conectados y Activos por Cursos
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitoreo en tiempo real de cuadrillas y colaboradores con totales consolidables SENCE.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadUsersReport}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px]">table_chart</span>
              <span>Descargar Reporte (CSV / Excel)</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="bg-emerald-50/80 border border-emerald-200 p-3 rounded-xl">
            <span className="text-[11px] text-emerald-800 font-semibold uppercase tracking-wider block">
              Conectados Ahora
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-xl font-mono font-extrabold text-emerald-950">{totalConnected}</span>
              <span className="text-[11px] text-emerald-700 font-medium">en vivo</span>
            </div>
          </div>

          <div className="bg-blue-50/80 border border-blue-200 p-3 rounded-xl">
            <span className="text-[11px] text-blue-800 font-semibold uppercase tracking-wider block">
              Activos (24h)
            </span>
            <p className="text-xl font-mono font-extrabold text-blue-950 mt-1">{totalActive24h}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider block">
              Total Inscritos
            </span>
            <p className="text-xl font-mono font-extrabold text-slate-900 mt-1">{totalEnrolled}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider block">
              Avance Global
            </span>
            <p className="text-xl font-mono font-extrabold text-slate-900 mt-1">{globalProgress}%</p>
          </div>
        </div>

        {/* Download confirmation feedback toast */}
        {downloadToast && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">check_circle</span>
              <span className="font-semibold">
                ¡Archivo CSV generado y descargado! Contiene {courses.length} cursos y la fila de Totales Generales ({totalEnrolled} inscritos, {totalConnected} conectados).
              </span>
            </div>
            <button
              onClick={() => setDownloadToast(false)}
              className="text-emerald-700 hover:text-emerald-900 text-xs font-bold"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Responsive Table with Totals */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-100/90 text-slate-600 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Curso & Código</th>
                <th className="py-2.5 px-3">Categoría / SENCE</th>
                <th className="py-2.5 px-3 text-right">Inscritos</th>
                <th className="py-2.5 px-3 text-right">Conectados (En Vivo)</th>
                <th className="py-2.5 px-3 text-right">Activos (24h)</th>
                <th className="py-2.5 px-3 text-center">Avance</th>
                <th className="py-2.5 px-3 text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courses.map((course) => {
                const conn = course.connectedUsers ?? Math.floor((course.enrolledCount || 100) * 0.12);
                const act = course.activeUsers24h ?? Math.floor((course.enrolledCount || 100) * 0.65);
                return (
                  <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900 truncate max-w-xs">{course.title}</div>
                      <div className="font-mono text-[10px] text-slate-400">Cod: {course.code}</div>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-semibold text-slate-700">{course.category}</span>
                      <span className="text-[10px] text-blue-600 block">{course.senceCode || 'Interno'}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900">
                      {course.enrolledCount.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        {conn}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-700 font-semibold">
                      {act}
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-800">{course.progressPercent}%</span>
                      <div className="w-14 mx-auto bg-slate-200 rounded-full h-1 mt-0.5">
                        <div
                          className="bg-blue-600 h-1 rounded-full"
                          style={{ width: `${course.progressPercent}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-center whitespace-nowrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          course.status === 'publicado'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {course.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Totales Generales Row */}
            <tfoot className="bg-slate-900 text-white font-bold border-t-2 border-slate-700">
              <tr>
                <td className="py-3 px-3">
                  <div className="text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-amber-400">functions</span>
                    <span>TOTALES GENERALES</span>
                  </div>
                  <div className="text-[10px] text-slate-300 font-normal">
                    {courses.length} Cursos Corporativos en Catálogo
                  </div>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-300">
                  Consolidado Empresa • SENCE N° 98231-CL
                </td>
                <td className="py-3 px-3 text-right font-mono text-white text-sm">
                  {totalEnrolled.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-right font-mono text-emerald-300 text-sm">
                  <span className="inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-500/50 px-2 py-0.5 rounded">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {totalConnected} en vivo
                  </span>
                </td>
                <td className="py-3 px-3 text-right font-mono text-white text-sm">
                  {totalActive24h.toLocaleString()}
                </td>
                <td className="py-3 px-3 text-center font-mono text-white text-sm">
                  {globalProgress}%
                </td>
                <td className="py-3 px-3 text-center">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30 uppercase">
                    100% SENCE
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>

      {scormToast && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-blue-600 text-[18px]">info</span>
          <span>Paquete SCORM 2004 4th Edition verificado. 12 lecciones listas para importar.</span>
        </div>
      )}

      {/* Módulo de Carga de Videos (CDN v3.2) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600 text-[22px]">cloud_upload</span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Subir Nueva Lección en Video</h3>
              <p className="text-xs text-slate-500">Almacenamiento Seguro Cloud CDN v3.2</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
            Transcodificación 4K/1080p
          </span>
        </div>

        {/* Dropzone */}
        <div className="border-2 border-dashed border-slate-300 hover:border-blue-500 rounded-xl p-6 text-center cursor-pointer bg-slate-50/50 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center gap-2 group">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[26px]">video_file</span>
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-slate-800">
              Arrastra tus videos aquí o <span className="text-blue-600 underline">Haz clic para explorar</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Formatos soportados: MP4, MOV o WebM • Máx 2 GB por video
            </p>
          </div>
        </div>

        {/* Active Upload Queue Card */}
        {showUploadItem && (
          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="material-symbols-outlined text-blue-600 text-[20px]">movie</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Ciberseguridad_Modulo3_Final.mp4
                  </p>
                  <p className="text-[10px] text-slate-400">
                    420 MB de 650 MB • {isPaused ? 'Pausado' : 'Subiendo a 12 MB/s'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 text-xs flex items-center"
                  title={isPaused ? 'Reanudar' : 'Pausar'}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isPaused ? 'play_arrow' : 'pause'}
                  </span>
                </button>
                <button
                  onClick={() => setShowUploadItem(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 text-xs flex items-center"
                  title="Cancelar"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>
            </div>

            {/* Progress line */}
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  isPaused ? 'bg-amber-500' : 'bg-blue-600'
                }`}
                style={{ width: `${uploadingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Lesson Metadata Form */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Título de la Lección
            </label>
            <input
              type="text"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Módulo Asignado
            </label>
            <select className="w-full h-9 px-2.5 text-xs rounded-lg border border-slate-300 bg-white focus:border-blue-600 outline-none">
              <option>Módulo 3: Medidas de Seguridad</option>
              <option>Módulo 1: Fundamentos y Ámbito</option>
              <option>Módulo 2: Principios Rectores</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              Duración Estimada
            </label>
            <input
              type="text"
              value={lessonDuration}
              onChange={(e) => setLessonDuration(e.target.value)}
              className="w-full h-9 px-3 text-xs rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Checkbox Options */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
            <input
              type="checkbox"
              checked={aiTranscription}
              onChange={(e) => setAiTranscription(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 border-slate-300"
            />
            <span>Generar Transcripción y Subtítulos Automáticos con IA</span>
          </label>

          <button
            onClick={() => alert('Selecciona el nuevo archivo PDF de la guía para reemplazarlo')}
            className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">attachment</span>
            <span>Adjuntar Guía Complementaria (PDF)</span>
          </button>
        </div>
      </section>

      {/* Catálogo de Cursos en Producción */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Catálogo de Cursos en Producción</h3>
            <p className="text-xs text-slate-500">Supervisa avance, modifica contenidos y reordena lecciones.</p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar curso o código..."
              className="w-full h-9 pl-8 pr-3 text-xs rounded-lg border border-slate-300 focus:border-blue-600 outline-none"
            />
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-slate-400 text-[16px]">
              search
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 flex-wrap">
          {(['todos', 'publicado', 'borrador', 'en_revision'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'todos'
                ? 'Todos'
                : st === 'publicado'
                ? 'Publicados'
                : st === 'borrador'
                ? 'Borradores'
                : 'En Revisión'}
            </button>
          ))}
        </div>

        {/* Course Cards List */}
        <div className="space-y-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/40"
            >
              <div className="flex items-start gap-3 min-w-0">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-16 h-12 rounded-lg object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        course.status === 'publicado'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {course.status}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Cod: {course.code}</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-md">
                    {course.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {course.modulesCount} módulos • {course.videosCount} videos • {course.enrolledCount} inscritos
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                <button
                  onClick={() => onNavigate('leccion')}
                  className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Ver Lección
                </button>
                <button
                  onClick={() => alert(`Gestionando videos y estructura para ${course.title}`)}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs"
                >
                  Gestionar Videos
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Distribución & Áreas */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Distribución & Áreas</h3>
            <p className="text-xs text-slate-500">Asigna obligatoriedad por gerencia o área de negocio.</p>
          </div>
          <button
            onClick={handleAddNewDepartment}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Añadir Departamento</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {areas.map((area) => (
            <div
              key={area.id}
              onClick={() => toggleArea(area.id)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                area.checked
                  ? 'bg-blue-50/50 border-blue-400 ring-1 ring-blue-400/30'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-bold text-slate-900">{area.name}</h4>
                <input
                  type="checkbox"
                  checked={area.checked}
                  onChange={() => toggleArea(area.id)}
                  className="w-4 h-4 rounded text-blue-600 border-slate-300"
                />
              </div>
              <p className="text-[11px] text-slate-500">{area.notes}</p>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Avance promedio</span>
                <span className="font-bold text-slate-900">{area.activeRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LMS Sync Floating Bar */}
      <div className="fixed bottom-16 sm:bottom-4 left-0 right-0 z-30 px-4 pointer-events-none">
        <div className="max-w-md mx-auto bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-800 flex items-center justify-between gap-3 pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-200">
              {syncToast ? '¡Sincronizado con éxito!' : '3 cambios pendientes de sincronizar'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onSwitchToStudent}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
            >
              Ver Ingrid
            </button>
            <button
              onClick={handleSyncLMS}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm active:scale-95"
            >
              Publicar Cambios
            </button>
          </div>
        </div>
      </div>

      <CreateCourseModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCourseCreated={onCourseCreated}
      />
    </div>
  );
};
