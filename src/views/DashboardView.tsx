import React from 'react';
import { UserProfile, Course, AppView } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  courses: Course[];
  onNavigate: (view: AppView) => void;
  onOpenCertificateModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  courses,
  onNavigate,
  onOpenCertificateModal,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 flex flex-col gap-5 antialiased">
      {/* Greeting & Corporate Identification */}
      <section className="pt-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 mb-1 text-slate-600">
              <span className="material-symbols-outlined text-[16px] text-blue-600">corporate_fare</span>
              <span className="text-xs font-bold uppercase tracking-wider">
                {user.company} • {user.department}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Hola, {user.name.split(' ')[0]}
            </h1>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
            Plan Corporativo Activo
          </span>
        </div>
      </section>

      {/* Executive Metric Summary Card (Bento Style) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">analytics</span>
            </div>
            <h2 className="text-sm font-bold text-slate-900">Cumplimiento Año 2026</h2>
          </div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Año 2026
          </span>
        </div>

        <div className="pt-4 flex flex-col gap-3.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-mono">
                {user.annualProgress}%
              </span>
              <span className="text-xs text-slate-500 font-semibold">de avance normativo</span>
            </div>
            <div className="text-right">
              <span className="text-base font-extrabold text-blue-600">{user.certifiedHours}h</span>
              <span className="text-xs text-slate-400"> / {user.targetHours}h meta</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${user.annualProgress}%` }}
            ></div>
          </div>

          {/* Micro KPI cluster */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-emerald-600 shadow-xs border border-emerald-100">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 leading-tight">{user.completedCourses}</p>
                <p className="text-[11px] text-slate-500 font-semibold">Completados</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-xs border border-blue-100">
                <span className="material-symbols-outlined text-[18px]">pending</span>
              </div>
              <div>
                <p className="text-lg font-extrabold text-slate-900 leading-tight">{user.inProgressCourses}</p>
                <p className="text-[11px] text-slate-500 font-semibold">En Progreso</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Continuar Aprendizaje (Hero Active Card) */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-800">
            <span className="material-symbols-outlined text-[20px] text-blue-600">play_circle</span>
            <h2 className="text-sm font-bold">Continuar Aprendizaje</h2>
          </div>
          <span className="text-[11px] font-bold text-blue-600">Prioridad Alta</span>
        </div>

        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md relative overflow-hidden flex flex-col justify-between gap-4 border border-slate-800">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none"></div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-600 text-white">
                Obligatorio SENCE
              </span>
              <span className="text-[11px] text-slate-300 font-medium">75% concluido</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              Nueva Ley de Protección de Datos Personales N° 21.719 en Chile
            </h3>

            <div className="mt-2.5 flex items-center gap-2 text-slate-300 text-xs">
              <span className="material-symbols-outlined text-[16px] text-blue-400">menu_book</span>
              <p className="truncate font-medium">Módulo 3: Derechos ARCO y Responsabilidad Proactiva</p>
            </div>

            {/* Mini Progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-3 overflow-hidden">
              <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3 border-t border-slate-800">
            <div className="flex items-center gap-1 text-xs text-slate-300">
              <span className="material-symbols-outlined text-[15px]">schedule</span>
              <span>18 min restantes</span>
            </div>

            <button
              onClick={() => onNavigate('leccion')}
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <span>Continuar Lección</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* Fast Access Actions (Dual Button Row) */}
      <section className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onNavigate('certificados')}
          className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-left shadow-xs hover:border-blue-300 hover:bg-blue-50/20 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">download</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">Certificados</span>
            <span className="text-[11px] text-slate-500 block">Descargar PDF</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('qr-sync')}
          className="bg-white border border-slate-200 rounded-2xl p-3.5 flex items-center gap-3 text-left shadow-xs hover:border-blue-300 hover:bg-blue-50/20 transition-all active:scale-95 group"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-900 block leading-tight">Escanear QR</span>
            <span className="text-[11px] text-slate-500 block">Asistencia Puesto</span>
          </div>
        </button>
      </section>

      {/* Sección Cursos Obligatorios Asignados */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-slate-900">
            <span className="material-symbols-outlined text-[20px]">assignment</span>
            <h2 className="text-sm font-bold">Cursos Asignados</h2>
          </div>
          <button
            onClick={() => onNavigate('catalogo')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5"
          >
            <span>Ver catálogo</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Course 2: Cyber Hygiene */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-all flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-red-600 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">alarm</span>
                  Vence en 12 días
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  Seguridad Cibernética e Higiene Informática
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 shrink-0">
                8 hrs
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Protocolos de ingeniería social, gestión de accesos corporativos y prevención de phishing bancario según ISO 27001.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-[11px] text-slate-500 font-medium">Sin iniciar</span>
              </div>
              <button
                onClick={() => onNavigate('leccion')}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
              >
                <span>Iniciar ahora</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Course 3: Tax Reform */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-blue-300 transition-all flex flex-col gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px]">verified_user</span>
                  Obligatorio SII
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  Gestión Tributaria y Reforma Fiscal 2026
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 shrink-0">
                12 hrs
              </span>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              Actualización sobre modificaciones tributarias, auditoría contable interna y régimen sancionatorio de compliance.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span className="text-[11px] text-slate-500 font-medium">Inscrito automáticamente</span>
              </div>
              <button
                onClick={() => onNavigate('catalogo')}
                className="text-xs font-bold text-slate-700 hover:text-slate-900 flex items-center gap-0.5"
              >
                <span>Detalles</span>
                <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="pt-2 pb-4 text-center text-xs text-slate-400 space-y-0.5">
        <p className="font-semibold text-slate-500">Viatech Capacita • Sistema de Gestión de Competencias</p>
        <p>SENCE Código OTEC Certificado N° 98231-CL</p>
      </footer>
    </div>
  );
};
