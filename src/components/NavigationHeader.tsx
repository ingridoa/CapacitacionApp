import React from 'react';
import { AppView, UserRole, UserProfile } from '../types';

interface NavigationHeaderProps {
  currentView: AppView;
  currentRole: UserRole;
  user: UserProfile;
  onNavigate: (view: AppView) => void;
  onToggleRole: () => void;
  onOpenSiteMap: () => void;
  unreadNotificationsCount?: number;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  currentView,
  currentRole,
  user,
  onNavigate,
  onToggleRole,
  onOpenSiteMap,
  unreadNotificationsCount = 2,
}) => {
  // If in login view, return minimal header or nothing
  if (currentView === 'login') return null;

  // Sub-pages like 'leccion' or 'qr-sync' have their dedicated top bar
  const isSubPage = currentView === 'leccion' || currentView === 'qr-sync';

  if (isSubPage) {
    return null; // The views render their dedicated contextual sub-headers
  }

  const isAdminView = currentView === 'admin';

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-2.5 w-full max-w-4xl mx-auto">
        {/* Brand & Identity */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onNavigate(isAdminView ? 'admin' : 'dashboard')}
            className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[20px] text-blue-400">
              {isAdminView ? 'terminal' : 'corporate_fare'}
            </span>
          </button>
          <div className="text-left cursor-pointer" onClick={() => onNavigate(isAdminView ? 'admin' : 'dashboard')}>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                Viatech Capacita
              </span>
              {isAdminView ? (
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-extrabold tracking-wider uppercase bg-slate-900 text-white">
                  ADMIN
                </span>
              ) : (
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
                  CAMPUS
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 leading-none mt-0.5">
              {isAdminView ? 'Gestión de Cursos & Videos' : 'Banco de Chile • Legal & Compliance'}
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation cluster */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Interactive Site Map Link Button */}
          <button
            onClick={onOpenSiteMap}
            title="Ver mapa con todos los enlaces de la aplicación"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 transition-all active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span className="hidden sm:inline">Mapa de Enlaces</span>
          </button>

          {/* Role Switcher Button */}
          <button
            onClick={onToggleRole}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 transition-all active:scale-95"
            title={isAdminView ? 'Cambiar a Vista Colaborador (Ingrid)' : 'Cambiar a Consola Admin'}
          >
            <span className="material-symbols-outlined text-[15px] text-slate-600">swap_horiz</span>
            <span className="hidden md:inline">
              {isAdminView ? 'Vista Colaborador' : 'Vista Admin'}
            </span>
          </button>

          {/* Notification Button */}
          <button
            onClick={() => alert(`Tienes ${unreadNotificationsCount} notificaciones corporativas pendientes sobre cursos y plazos SENCE.`)}
            className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors active:scale-95"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {unreadNotificationsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white"></span>
            )}
          </button>

          {/* Profile Avatar / Initials */}
          <button
            onClick={() => onNavigate('perfil')}
            className="flex items-center"
            title="Ver Perfil y Credenciales"
          >
            {user.avatarUrl && currentRole === 'colaborador' ? (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-300 ring-2 ring-blue-500/20 shadow-sm hover:ring-blue-600 transition-all">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs ring-2 ring-blue-500/30 shadow-sm">
                {user.role === 'admin' ? 'EP' : 'IO'}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Sub-Banner for Administrative Console */}
      {isAdminView && (
        <div className="bg-slate-900 px-4 py-1.5 flex items-center justify-between border-t border-slate-800 text-white max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] text-slate-200 tracking-wide uppercase font-semibold">
              Consola Viatech
            </span>
          </div>
          <button
            onClick={onToggleRole}
            className="inline-flex items-center gap-1 text-[11px] text-blue-300 hover:text-white transition-colors font-semibold"
          >
            <span>Vista Colaborador (Ingrid)</span>
            <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
          </button>
        </div>
      )}
    </header>
  );
};
