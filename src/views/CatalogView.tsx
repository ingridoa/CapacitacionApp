import React, { useState } from 'react';
import { Course, AppView } from '../types';

interface CatalogViewProps {
  courses: Course[];
  onNavigate: (view: AppView) => void;
  onSelectCourse: (course: Course) => void;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  courses,
  onNavigate,
  onSelectCourse,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');

  const filterOptions = [
    'Todos',
    'Obligatorios',
    'Compliance',
    'Tributario',
    'Ciberseguridad',
    'Liderazgo',
  ];

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'Todos') return true;
    if (activeFilter === 'Obligatorios') return c.mandatory;
    if (activeFilter === 'Compliance') return c.category.includes('Compliance') || c.category.includes('Legal');
    if (activeFilter === 'Tributario') return c.category.includes('Tributario') || c.category.includes('Finanzas');
    if (activeFilter === 'Ciberseguridad') return c.category.includes('Seguridad');
    if (activeFilter === 'Liderazgo') return c.category.includes('Ágiles') || c.category.includes('Liderazgo');
    return true;
  });

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 flex flex-col gap-4 antialiased">
      {/* Search and Tune Box */}
      <section className="flex gap-2 items-center pt-1">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar cursos, habilidades o normativas..."
            className="w-full h-11 pl-9 pr-4 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-all shadow-xs outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-700"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>
        <button
          onClick={() => alert('Filtro avanzado: Selecciona año 2025-2026, formato SENCE, o nivel')}
          className="h-11 w-11 shrink-0 bg-white border border-slate-300 rounded-xl flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">tune</span>
        </button>
      </section>

      {/* Filter Pills */}
      <section className="overflow-x-auto no-scrollbar -mx-4 px-4 flex gap-1.5 pb-1">
        {filterOptions.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all active:scale-95 flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {filter === 'Obligatorios' && (
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-red-500'}`}></span>
              )}
              <span>{filter}</span>
            </button>
          );
        })}
      </section>

      {/* Hero Highlight Card: Compliance Mandatory Course */}
      <section className="relative bg-slate-900 text-white rounded-2xl p-5 overflow-hidden shadow-md border border-slate-800">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-blue-600/25 blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600/30 border border-blue-400/40 text-blue-300 text-[10px] font-bold tracking-wide uppercase">
              <span className="material-symbols-outlined text-[13px]">verified_user</span>
              Requerido por Compliance
            </span>

            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2 py-0.5 rounded-md text-white text-[11px] font-bold">
              <span className="material-symbols-outlined text-[13px] text-amber-300">star</span>
              <span>4.9</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-blue-400 tracking-wider uppercase">
              Normativa Oficial 2026
            </span>
            <h2 className="text-base sm:text-lg font-extrabold text-white leading-tight mt-0.5">
              Nueva Ley de Protección de Datos Personales N° 21.719 en Chile
            </h2>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
            Marco legal sancionatorio, derechos ARCO ampliados y adecuación tecnológica obligatoria para empresas de servicios corporativos.
          </p>

          <div className="flex items-center gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800 font-medium">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-blue-400">schedule</span>
              <span>16 hrs cronológicas</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px] text-emerald-400">workspace_premium</span>
              <span>100% Código SENCE</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('leccion')}
            className="w-full mt-1 py-2.5 px-4 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-blue-500 active:scale-[0.98] transition-all"
          >
            <span>Iniciar / Ver Módulos</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Catálogo Disponible List */}
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Catálogo Disponible</h3>
          <span className="text-xs font-bold text-blue-600">
            {filteredCourses.length} Cursos Encontrados
          </span>
        </div>

        {filteredCourses.map((course) => {
          return (
            <article
              key={course.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300 transition-all flex flex-col"
            >
              <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
                <img
                  src={course.coverImage}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                <div className="absolute top-3 left-3">
                  {course.progressPercent > 0 && course.progressPercent < 100 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
                      En progreso
                    </span>
                  ) : course.progressPercent === 100 ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs">
                      Certificado
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
                      Disponible
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-medium">
                  <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">laptop_chromebook</span>
                    100% Online
                  </span>
                  <span className="bg-black/50 backdrop-blur-md px-2 py-0.5 rounded flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    {course.durationLabel}
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col gap-2.5">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-semibold">{course.category}</span>
                    {course.progressPercent > 0 && (
                      <span className="text-blue-600 font-bold font-mono">
                        {course.progressPercent}% completado
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {course.title}
                  </h4>
                </div>

                {course.progressPercent > 0 && (
                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-blue-600 h-1.5 rounded-full"
                      style={{ width: `${course.progressPercent}%` }}
                    ></div>
                  </div>
                )}

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-slate-500 text-[11px]">
                    <span className="material-symbols-outlined text-[15px] text-blue-600">
                      {course.progressPercent === 100 ? 'verified' : 'auto_stories'}
                    </span>
                    <span>
                      {course.progressPercent === 100
                        ? 'Diploma emitido'
                        : `${course.modulesCount} Módulos`}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      onSelectCourse(course);
                      if (course.progressPercent === 100) {
                        onNavigate('certificados');
                      } else {
                        onNavigate('leccion');
                      }
                    }}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold active:scale-95 transition-all shadow-xs"
                  >
                    {course.progressPercent > 0 && course.progressPercent < 100
                      ? 'Continuar'
                      : course.progressPercent === 100
                      ? 'Ver Diploma'
                      : 'Explorar Curso'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
