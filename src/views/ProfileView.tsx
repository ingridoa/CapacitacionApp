import React from 'react';
import { UserProfile, UserRole, AppView } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  currentRole: UserRole;
  onToggleRole: () => void;
  onNavigate: (view: AppView) => void;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  currentRole,
  onToggleRole,
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="w-full max-w-md mx-auto px-4 pt-3 pb-24 flex flex-col gap-4 antialiased">
      {/* Profile Header */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col items-center text-center relative overflow-hidden">
        <div className="relative mb-3">
          {user.avatarUrl && currentRole === 'colaborador' ? (
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-md ring-4 ring-blue-50">
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-bold shadow-md ring-4 ring-slate-100">
              {currentRole === 'admin' ? 'EP' : 'IO'}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-xs"></span>
        </div>

        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{user.name}</h1>
        <p className="text-xs text-blue-700 font-bold uppercase tracking-wider mt-0.5">
          {user.roleTitle}
        </p>
        <p className="text-xs text-slate-500 mt-1">{user.company} • {user.department}</p>
        <p className="text-xs font-mono text-slate-400 mt-0.5">{user.email}</p>

        {/* Role Switcher Pill */}
        <div className="mt-4 pt-3 border-t border-slate-100 w-full flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-slate-400 font-semibold block">Rol Activo en Sesión</span>
            <span className="text-xs font-bold text-slate-900 capitalize">{currentRole}</span>
          </div>
          <button
            onClick={onToggleRole}
            className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
            <span>Cambiar a {currentRole === 'admin' ? 'Colaborador' : 'Administrador'}</span>
          </button>
        </div>
      </section>

      {/* SENCE & Corporate Training Stats */}
      <section className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Historial & Acreditaciones Corporativas
        </h2>

        <div className="space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Acreditación SENCE Ley N° 21.719</p>
                <p className="text-[10px] text-slate-400">Certificado Oficial emitido • 98% de aprobación</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('certificados')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Ver
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-blue-600 text-[20px]">badge</span>
              <div>
                <p className="text-xs font-bold text-slate-900">Credencial Digital Viatech ID</p>
                <p className="text-[10px] text-slate-400">Token criptográfico activo • Vence dic 2026</p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('qr-sync')}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Sincronizar
            </button>
          </div>
        </div>
      </section>

      {/* Security & Access links */}
      <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <div
          onClick={() => onNavigate('qr-sync')}
          className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-600 text-[20px]">qr_code_scanner</span>
            <div>
              <p className="text-xs font-bold text-slate-900">Sincronización QR de Puesto</p>
              <p className="text-[11px] text-slate-400">Vincular terminales Windows Workstation</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
        </div>

        <div
          onClick={() => alert('Políticas de Seguridad: Cumplimiento estricto ISO 27001, doble factor habilitado.')}
          className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer border-b border-slate-100"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-slate-600 text-[20px]">security</span>
            <div>
              <p className="text-xs font-bold text-slate-900">Seguridad & Doble Factor (2FA)</p>
              <p className="text-[11px] text-slate-400">Gestionado por Entra ID / Microsoft 365</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[18px]">chevron_right</span>
        </div>

        <div
          onClick={onLogout}
          className="p-3.5 flex items-center justify-between hover:bg-red-50 text-red-600 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            <p className="text-xs font-bold">Cerrar Sesión Segura</p>
          </div>
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </div>
      </section>
    </div>
  );
};
