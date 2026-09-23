import React, { useState } from 'react';
import { UserProfile, Course, AppView } from '../types';
import { OfficialCertificateModal } from '../components/OfficialCertificateModal';

interface CertificateViewProps {
  user: UserProfile;
  courses: Course[];
  onNavigate: (view: AppView) => void;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  user,
  courses,
  onNavigate,
  onBack,
}) => {
  const [showOfficialModal, setShowOfficialModal] = useState(false);
  const [linkedInToast, setLinkedInToast] = useState(false);

  const handleShareLinkedIn = () => {
    setLinkedInToast(true);
    setTimeout(() => setLinkedInToast(false), 3000);
  };

  const skills = [
    'Cumplimiento Normativo Ley 21.719',
    'Gestión de Brechas de Seguridad',
    'Auditoría de Privacidad Corporativa',
    'Consentimiento Informado & Derechos ARCO',
  ];

  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 flex flex-col gap-4 antialiased">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between py-1">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-1.5 text-slate-700">
          <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
          <span className="text-xs font-bold uppercase tracking-wider">Acreditación Oficial SENCE</span>
        </div>
        <div className="w-9 h-9"></div>
      </div>

      {/* Celebration Hero Card with Ingrid Photo */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 text-white rounded-2xl p-6 text-center relative overflow-hidden shadow-lg border border-blue-600/30">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:12px_12px]"></div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Avatar with gold ring & verified checkmark */}
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-amber-300 shadow-lg ring-4 ring-white/20">
              <img
                src={user.avatarUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuATGOlC7pL5379f_o1Sd6a93WSxqUfnZe0-eZlu5Jsk0DaLCe1nLSjxnQje5_VUDExgShdlxoCHkdFLD-AuXxr1gKohnbkLapi0mYpV2b7Snu9Glq03M_0cqvPiGNIFc6tLDFFcUFT3Wy_B5xPT4-6Cw0Mi1wXG-QZaNMFPMnXls7DT6SAaYg3uAfFICbhpUH28J1wK1UYzSKKCzvA27-IunSIOXXJ9wcu2vu94H92knoLq0wLCRPCI'}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
              <span className="material-symbols-outlined text-[14px]">check</span>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold tracking-wider uppercase mb-1.5">
            <span className="material-symbols-outlined text-[13px]">military_tech</span>
            Acreditación Aprobada
          </span>

          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            ¡Felicitaciones, {user.name.split(' ')[0]}!
          </h1>
          <p className="text-xs text-blue-100 max-w-xs mt-1 leading-relaxed">
            Has completado exitosamente el programa con acreditación oficial SENCE y validación curricular para Banco de Chile.
          </p>
        </div>
      </section>

      {/* Official Certification Summary Box */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col gap-3.5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
              Programa Finalizado
            </span>
            <h2 className="text-sm font-bold text-slate-900 leading-snug">
              Nueva Ley de Protección de Datos Personales N° 21.719 en Chile
            </h2>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            SENCE #4892-CL
          </span>
        </div>

        {/* 4 Score Badges */}
        <div className="grid grid-cols-3 gap-2 text-center py-1">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Puntaje</p>
            <p className="text-base font-mono font-extrabold text-slate-900">98%</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Duración</p>
            <p className="text-base font-mono font-extrabold text-slate-900">16 hrs</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Asistencia</p>
            <p className="text-base font-mono font-extrabold text-emerald-600">100%</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setShowOfficialModal(true)}
            className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Descargar Certificado Oficial (PDF)</span>
          </button>

          <button
            onClick={handleShareLinkedIn}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 transition-all active:scale-[0.98]"
          >
            <svg className="w-3.5 h-3.5 fill-current text-[#0A66C2]" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>Compartir Credencial en LinkedIn</span>
          </button>
        </div>

        {linkedInToast && (
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs text-center font-semibold">
            ¡Enlace de validación listo para agregar a tu perfil de LinkedIn!
          </div>
        )}
      </section>

      {/* Competencias Adquiridas Validadas */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
          Competencias Adquiridas Validadas
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-emerald-600 text-[14px]">check_circle</span>
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Recommended Next Steps */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Recomendado para tu Perfil Legal & Compliance
          </h3>
        </div>

        <div className="space-y-2.5">
          {courses.slice(1, 4).map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl border border-slate-200 p-3.5 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition-all"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] text-blue-700 font-bold uppercase mb-0.5">
                  <span>{course.category}</span>
                  <span>•</span>
                  <span>{course.affinityPercent || 95}% afinidad</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 truncate">
                  {course.title}
                </h4>
                <p className="text-[11px] text-slate-500">{course.durationLabel}</p>
              </div>

              <button
                onClick={() => onNavigate('catalogo')}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-bold"
              >
                Explorar
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => onNavigate('catalogo')}
          className="w-full py-2.5 text-center text-xs font-bold text-blue-600 hover:text-blue-800"
        >
          Explorar Todo el Catálogo Corporativo →
        </button>
      </section>

      {/* Certificate Modal */}
      <OfficialCertificateModal
        isOpen={showOfficialModal}
        onClose={() => setShowOfficialModal(false)}
        studentName={user.name}
      />
    </div>
  );
};
