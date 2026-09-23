import React, { useState } from 'react';
import { AppView, UserRole } from '../types';

interface LoginViewProps {
  onLogin: (role: UserRole) => void;
  onNavigate: (view: AppView) => void;
  onOpenSiteMap: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLogin, onNavigate, onOpenSiteMap }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('colaborador');
  const [showManualForm, setShowManualForm] = useState(true);
  const [email, setEmail] = useState('ingrid.oa@gmail.com');
  const [pin, setPin] = useState('••••••••');
  const [scanning, setScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('eduardo.pena@viatechcapacita.cl');
    } else {
      setEmail('ingrid.oa@gmail.com');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole);
  };

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      onLogin(selectedRole);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-4 px-3 sm:px-4 selection:bg-blue-600 selection:text-white">
      <main className="w-full max-w-md mx-auto flex flex-col bg-white px-4 py-5 shadow-sm border border-slate-200/80 rounded-2xl my-auto">
        {/* Top Header */}
        <header className="flex flex-col items-center text-center pt-1 pb-4">
          <div className="flex items-center justify-between w-full mb-3 px-1">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
                <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
              </div>
              <div className="text-left">
                <span className="font-extrabold text-slate-900 tracking-tight block leading-tight text-base">
                  Viatech Capacita
                </span>
                <span className="text-[11px] text-blue-600 uppercase tracking-wider font-bold">
                  ENTERPRISE HUB
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] text-blue-900 font-bold">Acreditado SENCE (SENSE)</span>
              </div>
              <button
                onClick={onOpenSiteMap}
                title="Ver mapa de enlaces"
                className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">account_tree</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500 px-2 max-w-xs leading-relaxed">
            Plataforma Corporativa de Aprendizaje Continuo y Certificación Laboral SENCE
          </p>
        </header>

        {/* Role Selector Segmented Control */}
        <div className="mb-4 bg-slate-100 p-1 rounded-xl flex border border-slate-200">
          <button
            type="button"
            onClick={() => handleRoleChange('colaborador')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'colaborador'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span>Colaborador</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleChange('admin')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              selectedRole === 'admin'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>Administrador</span>
          </button>
        </div>

        {/* Optical QR Scanner Module */}
        <section className="w-full bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs mb-4">
          <div className="flex items-center justify-between mb-2.5 border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-blue-600 text-[18px]">qr_code_scanner</span>
              <h2 className="text-xs font-bold text-slate-900">Acreditación Óptica Instantánea</h2>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
              Cámara Activa
            </span>
          </div>

          {/* Viewfinder simulation */}
          <div className="relative w-full aspect-[4/3.2] bg-slate-950 rounded-xl overflow-hidden flex flex-col items-center justify-center p-3 shadow-inner">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Corner Brackets */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br"></div>

              {/* Animated Laser Scanline */}
              <div className="absolute inset-x-2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-scanline z-10"></div>

              {/* Reticle / Focal Area */}
              <div className="w-36 h-36 border border-slate-700/60 rounded-lg flex flex-col items-center justify-center gap-2 p-3 bg-slate-900/50 backdrop-blur-[1px] text-center">
                <span className="material-symbols-outlined text-slate-400 text-[32px]">badge</span>
                <span className="text-[11px] font-medium text-slate-300 leading-tight">
                  Alinea el código QR de tu credencial o gafete digital
                </span>
              </div>
            </div>

            {/* Scanner Controls */}
            <div className="absolute bottom-2 inset-x-3 flex items-center justify-between px-2 text-white/90">
              <button
                type="button"
                onClick={() => setFlashOn(!flashOn)}
                className={`flex items-center gap-1 text-[10px] px-2 py-1 rounded border transition-colors ${
                  flashOn ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' : 'bg-white/10 hover:bg-white/20 border-white/10'
                }`}
              >
                <span className="material-symbols-outlined text-[13px]">flashlight_on</span>
                <span>Flash</span>
              </button>
              <div className="flex items-center gap-1 text-[10px] text-slate-300">
                <span className="material-symbols-outlined text-[13px] text-cyan-400">center_focus_strong</span>
                <span>Enfoque ISO/SENCE</span>
              </div>
              <button
                type="button"
                onClick={() => setFacingMode(facingMode === 'environment' ? 'user' : 'environment')}
                className="flex items-center gap-1 text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded border border-white/10"
              >
                <span className="material-symbols-outlined text-[13px]">flip_camera_ios</span>
                <span>Cambiar</span>
              </button>
            </div>
          </div>

          {/* Trigger Scan simulation button */}
          <div className="mt-2.5 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-emerald-600">check_circle</span>
              Válido para internos y contratistas
            </span>
            <button
              type="button"
              onClick={handleSimulateScan}
              disabled={scanning}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 underline underline-offset-2 flex items-center gap-1"
            >
              {scanning ? (
                <>
                  <span className="material-symbols-outlined text-[14px] animate-spin">progress_activity</span>
                  <span>Escaneando...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[14px]">qr_code_scanner</span>
                  <span>Escanear Credencial</span>
                </>
              )}
            </button>
          </div>
        </section>

        {/* Enterprise SSO Separator */}
        <div className="relative flex items-center justify-center my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative bg-white px-3">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              O Ingresa con tu cuenta corporativa
            </span>
          </div>
        </div>

        {/* Enterprise SSO Buttons */}
        <div className="space-y-2 mb-3">
          <button
            type="button"
            onClick={() => onLogin(selectedRole)}
            className="w-full flex items-center justify-center gap-3 h-10 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 transition-all text-slate-800 text-xs font-semibold shadow-xs active:scale-[0.99]"
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 21 21">
              <path d="M1 1H9.66667V9.66667H1V1Z" fill="#F25022" />
              <path d="M11.3333 1H20V9.66667H11.3333V1Z" fill="#7FBA00" />
              <path d="M1 11.3333H9.66667V20H1V11.3333Z" fill="#00A4EF" />
              <path d="M11.3333 11.3333H20V20H11.3333V11.3333Z" fill="#FFB900" />
            </svg>
            <span>Microsoft 365 / Entra ID</span>
          </button>

          <button
            type="button"
            onClick={() => onLogin(selectedRole)}
            className="w-full flex items-center justify-center gap-3 h-10 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 transition-all text-slate-800 text-xs font-semibold shadow-xs active:scale-[0.99]"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span>Google Workspace Corporativo</span>
          </button>
        </div>

        {/* Email & PIN Collapsible Box */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 mb-3">
          <div
            onClick={() => setShowManualForm(!showManualForm)}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-slate-600">lock</span>
              Acceso con Correo y Clave / PIN
            </span>
            <span
              className={`material-symbols-outlined text-[18px] text-slate-500 transition-transform ${
                showManualForm ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </div>

          {showManualForm && (
            <form onSubmit={handleManualSubmit} className="space-y-2.5 pt-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Correo Electrónico Corporativo
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-9 px-3 pl-8 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-[16px]">
                    mail
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-bold text-slate-600">
                    PIN de Capacitación / Contraseña
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert('Se ha enviado un enlace de restauración a tu correo.'); }} className="text-[11px] text-blue-600 hover:underline">
                    ¿Olvidaste tu PIN?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="w-full h-9 px-3 pl-8 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                  <span className="material-symbols-outlined absolute left-2 top-2 text-slate-400 text-[16px]">
                    key
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full h-10 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
                  selectedRole === 'admin' ? 'bg-slate-900 hover:bg-slate-800' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <span>Iniciar Sesión en Plataforma</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </form>
          )}
        </div>

        {/* Fast Link to Workstation QR Sync */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onNavigate('qr-sync')}
            className="w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-bold flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
            <span>Vincular Puesto de Trabajo (Acceso QR Workstation)</span>
          </button>
        </div>

        {/* Security assurance */}
        <footer className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-center">
          <div className="flex items-center justify-center gap-1.5 text-slate-600 text-[11px] bg-slate-50 py-1 px-2 rounded-lg border border-slate-200">
            <span className="material-symbols-outlined text-[14px] text-emerald-600">verified_user</span>
            <span>Cifrado TLS 1.3 • Compatible con SENCE y Biometría Móvil</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[11px] text-slate-500">
            <span>¿Problemas con tu credencial?</span>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); alert('Mesa de ayuda: soporte@viatechcapacita.cl • Anexo: 4892'); }}
              className="font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5"
            >
              <span>Mesa de Ayuda TI</span>
              <span className="material-symbols-outlined text-[12px]">support_agent</span>
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
};
