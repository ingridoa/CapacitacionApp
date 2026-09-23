import React from 'react';
import { AppView, UserRole } from '../types';

interface SiteMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentView: AppView;
  currentRole: UserRole;
  onNavigate: (view: AppView, role?: UserRole) => void;
}

interface ViewNode {
  id: AppView;
  title: string;
  role: 'both' | 'colaborador' | 'admin';
  icon: string;
  description: string;
  connections: AppView[];
  tag: string;
}

export const SiteMapModal: React.FC<SiteMapModalProps> = ({
  isOpen,
  onClose,
  currentView,
  currentRole,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const viewNodes: ViewNode[] = [
    {
      id: 'login',
      title: 'Portal de Ingreso & SSO',
      role: 'both',
      icon: 'key',
      description: 'Acceso corporativo con cámara QR, Microsoft 365, Google Workspace, y selección de rol.',
      connections: ['dashboard', 'admin', 'qr-sync'],
      tag: 'Punto de Entrada',
    },
    {
      id: 'qr-sync',
      title: 'Acceso y Sincronización QR',
      role: 'both',
      icon: 'qr_code_scanner',
      description: 'Vinculación instantánea de puesto de trabajo (Windows Workstation) y token dinámico.',
      connections: ['login', 'dashboard'],
      tag: 'Identidad ISO 27001',
    },
    {
      id: 'dashboard',
      title: 'Colaborador (Cumplimiento Año 2026)',
      role: 'colaborador',
      icon: 'home',
      description: 'Métricas de Cumplimiento Año 2026 (68%), botón continuar lección, cursos asignados y accesos rápidos.',
      connections: ['leccion', 'catalogo', 'certificados', 'qr-sync', 'perfil'],
      tag: 'Vista Usuario',
    },
    {
      id: 'catalogo',
      title: 'Catálogo de Cursos',
      role: 'colaborador',
      icon: 'school',
      description: 'Buscador, filtros temáticos (Compliance, Tributario, Ciberseguridad) y tarjetas de curso.',
      connections: ['dashboard', 'leccion', 'certificados'],
      tag: 'Explorador',
    },
    {
      id: 'leccion',
      title: 'Aula Virtual & Lección Interactiva',
      role: 'colaborador',
      icon: 'play_circle',
      description: 'Reproductor de video interactivo, estructura curricular por módulos, chat docente y evaluación.',
      connections: ['dashboard', 'catalogo', 'certificados'],
      tag: 'Formación Activa',
    },
    {
      id: 'certificados',
      title: 'Acreditación & Certificados SENCE',
      role: 'colaborador',
      icon: 'verified',
      description: 'Diploma de aprobación 98%, descarga oficial PDF, habilidades validadas y rutas sugeridas.',
      connections: ['dashboard', 'catalogo', 'leccion', 'perfil'],
      tag: 'Acreditación',
    },
    {
      id: 'admin',
      title: 'Consola Viatech (Administrador)',
      role: 'admin',
      icon: 'admin_panel_settings',
      description: 'Consola Viatech para RRHH/TI: reporte de usuarios conectados y activos con totales para descarga, Distribución & Áreas y CDN.',
      connections: ['dashboard', 'login', 'catalogo'],
      tag: 'Consola Viatech',
    },
    {
      id: 'perfil',
      title: 'Perfil & Credenciales',
      role: 'both',
      icon: 'person',
      description: 'Gestión de cuenta, credenciales corporativas, historial SENCE y cambio de rol.',
      connections: ['dashboard', 'admin', 'login'],
      tag: 'Configuración',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400">
              <span className="material-symbols-outlined text-[22px]">account_tree</span>
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight">Mapa de Enlaces & Arquitectura</h2>
              <p className="text-xs text-slate-300">Todas las pantallas interconectadas de Viatech Capacita</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Legend / Filter info */}
        <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Página Actual: <strong className="text-slate-900 capitalize">{currentView}</strong>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Rol Activo: <strong className="text-slate-900 capitalize">{currentRole}</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500">Haz clic en cualquier página para ingresar de inmediato</span>
        </div>

        {/* Content list */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {viewNodes.map((node) => {
            const isCurrent = currentView === node.id;
            return (
              <div
                key={node.id}
                onClick={() => {
                  onNavigate(
                    node.id,
                    node.role === 'admin' ? 'admin' : node.role === 'colaborador' ? 'colaborador' : currentRole
                  );
                  onClose();
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 group ${
                  isCurrent
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">{node.icon}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                        {node.title}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                        {node.tag}
                      </span>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                        Viendo ahora
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{node.description}</p>

                  <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-600">Conectada con:</span>
                    {node.connections.map((c) => (
                      <span
                        key={c}
                        className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]"
                      >
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="self-center pl-2">
                  <span className="material-symbols-outlined text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-transform text-[18px]">
                    arrow_forward
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onNavigate('dashboard', 'colaborador');
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
            >
              Ir como Colaborador (Ingrid)
            </button>
            <button
              onClick={() => {
                onNavigate('admin', 'admin');
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold hover:bg-slate-800"
            >
              Ir como Admin (Eduardo)
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-slate-500 hover:text-slate-800 font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
