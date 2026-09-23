import React, { useState, useEffect } from 'react';
import { AppView } from '../types';
import { OtpModal } from '../components/OtpModal';

interface QrSyncViewProps {
  onBack: () => void;
  onAuthorized: () => void;
  onOpenSiteMap: () => void;
}

export const QrSyncView: React.FC<QrSyncViewProps> = ({
  onBack,
  onAuthorized,
  onOpenSiteMap,
}) => {
  const [timeLeft, setTimeLeft] = useState(45);
  const [copied, setCopied] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 60 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRegenerate = () => {
    setTimeLeft(60);
  };

  const handleCopyLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateInstantScan = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      onAuthorized();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-12 antialiased">
      {/* Top Header */}
      <header className="bg-white shadow-xs sticky top-0 z-30 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              aria-label="Regresar"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[22px]">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-[18px] text-blue-400">corporate_fare</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 tracking-tight text-base">Viatech</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    CAPACITA
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-none">Enterprise Identity Suite</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSiteMap}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">account_tree</span>
              <span className="hidden sm:inline">Enlaces</span>
            </button>
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
              <span className="material-symbols-outlined text-emerald-600 text-[14px]">lock</span>
              <span className="text-xs font-bold text-slate-700">SSL 256-bit</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="max-w-4xl mx-auto w-full px-4 pt-6 flex-1">
        {/* Title and Badge */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 mb-3">
            <span className="material-symbols-outlined text-blue-700 text-[16px]">shield</span>
            <span className="text-xs text-blue-700 font-bold uppercase tracking-wider">
              Conexión Instantánea Segura
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Acceso y Sincronización QR
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Escanea este código desde la app o cámara de tu dispositivo para transferir tu sesión de forma segura sin contraseñas.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start max-w-3xl mx-auto">
          {/* Main QR Card */}
          <div className="md:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-md p-5 sm:p-6 flex flex-col items-center relative overflow-hidden">
            {/* Live Polling Status */}
            <div className="flex items-center justify-between w-full pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  Esperando escaneo en tiempo real...
                </span>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                Token Dinámico
              </span>
            </div>

            {/* QR Viewport */}
            <div className="relative my-4 p-4 bg-white rounded-xl border-2 border-dashed border-blue-300 shadow-inner flex items-center justify-center group">
              {/* Scanline */}
              <div className="absolute inset-x-3 h-[2px] bg-gradient-to-r from-transparent via-blue-600 to-transparent shadow-[0_0_10px_#2563eb] animate-scanline z-10 pointer-events-none"></div>

              {/* High-Contrast SVG QR code */}
              <div className="w-52 h-52 sm:w-56 sm:h-56 relative flex items-center justify-center p-2 bg-white rounded-lg">
                <svg className="w-full h-full text-slate-900" fill="currentColor" viewBox="0 0 200 200">
                  {/* Finder Pattern Top-Left */}
                  <rect x="10" y="10" width="50" height="50" rx="6" fill="#0f172a" />
                  <rect x="20" y="20" width="30" height="30" rx="3" fill="#ffffff" />
                  <rect x="26" y="26" width="18" height="18" rx="2" fill="#1d4ed8" />
                  {/* Finder Pattern Top-Right */}
                  <rect x="140" y="10" width="50" height="50" rx="6" fill="#0f172a" />
                  <rect x="150" y="20" width="30" height="30" rx="3" fill="#ffffff" />
                  <rect x="156" y="26" width="18" height="18" rx="2" fill="#1d4ed8" />
                  {/* Finder Pattern Bottom-Left */}
                  <rect x="10" y="140" width="50" height="50" rx="6" fill="#0f172a" />
                  <rect x="20" y="150" width="30" height="30" rx="3" fill="#ffffff" />
                  <rect x="26" y="156" width="18" height="18" rx="2" fill="#1d4ed8" />

                  {/* QR Matrix Blocks */}
                  <rect x="70" y="15" width="10" height="10" rx="1.5" />
                  <rect x="90" y="15" width="20" height="10" rx="1.5" />
                  <rect x="120" y="15" width="10" height="10" rx="1.5" />
                  <rect x="68" y="32" width="12" height="12" rx="1.5" />
                  <rect x="92" y="32" width="10" height="12" rx="1.5" />
                  <rect x="115" y="30" width="15" height="10" rx="1.5" />
                  <rect x="15" y="70" width="10" height="20" rx="1.5" />
                  <rect x="35" y="70" width="15" height="10" rx="1.5" />
                  <rect x="15" y="100" width="25" height="10" rx="1.5" />
                  <rect x="35" y="120" width="15" height="10" rx="1.5" />
                  <rect x="145" y="70" width="20" height="12" rx="1.5" />
                  <rect x="175" y="70" width="15" height="20" rx="1.5" />
                  <rect x="145" y="95" width="10" height="15" rx="1.5" />
                  <rect x="165" y="100" width="25" height="10" rx="1.5" />
                  <rect x="150" y="125" width="15" height="10" rx="1.5" />
                  <rect x="65" y="55" width="10" height="10" rx="1.5" />
                  <rect x="85" y="55" width="30" height="10" rx="1.5" />
                  <rect x="125" y="55" width="10" height="20" rx="1.5" />
                  <rect x="55" y="75" width="20" height="10" rx="1.5" />
                  <rect x="125" y="85" width="10" height="15" rx="1.5" />
                  <rect x="55" y="115" width="15" height="15" rx="1.5" />
                  <rect x="80" y="120" width="20" height="10" rx="1.5" />
                  <rect x="110" y="115" width="25" height="10" rx="1.5" />
                  <rect x="70" y="145" width="15" height="10" rx="1.5" />
                  <rect x="95" y="145" width="20" height="15" rx="1.5" />
                  <rect x="125" y="140" width="10" height="20" rx="1.5" />
                  <rect x="145" y="145" width="20" height="10" rx="1.5" />
                  <rect x="175" y="145" width="15" height="15" rx="1.5" />
                  <rect x="70" y="170" width="20" height="15" rx="1.5" />
                  <rect x="100" y="170" width="15" height="10" rx="1.5" />
                  <rect x="125" y="170" width="30" height="15" rx="1.5" />
                  <rect x="165" y="170" width="15" height="10" rx="1.5" />
                </svg>

                {/* Centered Badge */}
                <div className="absolute inset-0 m-auto w-11 h-11 rounded-lg bg-white border-2 border-blue-600 shadow-md flex items-center justify-center p-1">
                  <div className="w-full h-full rounded bg-slate-900 flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-[16px] text-blue-400">corporate_fare</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Countdown Tracker */}
            <div className="w-full max-w-xs mb-3">
              <div className="flex items-center justify-between mb-1.5 text-xs">
                <span className="text-slate-500 flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  El código se renueva en:
                </span>
                <span className="font-mono font-bold text-blue-600">{timeLeft}s</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(timeLeft / 60) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Rapid Actions */}
            <div className="grid grid-cols-2 gap-2 w-full pt-2">
              <button
                onClick={handleRegenerate}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-blue-600 text-[16px]">refresh</span>
                <span>Regenerar código</span>
              </button>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-lg text-xs font-semibold active:scale-95 transition-all"
              >
                <span className="material-symbols-outlined text-blue-600 text-[16px]">
                  {copied ? 'check' : 'link'}
                </span>
                <span>{copied ? '¡Copiado!' : 'Copiar enlace'}</span>
              </button>
            </div>

            {/* Instant scan simulator */}
            <div className="w-full mt-3 pt-3 border-t border-slate-100">
              <button
                onClick={handleSimulateInstantScan}
                disabled={isAuthorizing}
                className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
              >
                {isAuthorizing ? (
                  <>
                    <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                    <span>Sincronizando puesto de trabajo...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[16px]">smartphone</span>
                    <span>Simular Escaneo Móvil y Entrar a la Sesión</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Security Intelligence */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            {/* Cifrado End-to-End */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600 mt-0.5">
                  <span className="material-symbols-outlined text-[20px]">verified_user</span>
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 leading-tight">
                    Cifrado End-to-End
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Autenticación criptográfica de una sola vez certificada bajo estándar{' '}
                    <strong className="text-slate-800">ISO 27001</strong> y políticas de Zero-Trust corporativo.
                  </p>
                </div>
              </div>
            </div>

            {/* Dispositivo Solicitante */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs text-slate-500">
                <span className="uppercase tracking-wider font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">devices</span>
                  Dispositivo Solicitante
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  En Red Interna
                </span>
              </div>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">desktop_windows</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    Windows Workstation
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    Sala Comercial 4B • IP: 10.240.12.89
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50/50 rounded-xl border border-blue-100 p-4">
              <h3 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-blue-600 text-[16px]">help_outline</span>
                ¿Cómo sincronizar?
              </h3>
              <ol className="space-y-1.5 text-slate-600 text-xs list-decimal list-inside leading-relaxed">
                <li>Abre la aplicación móvil de Viatech en tu teléfono.</li>
                <li>Selecciona <strong className="text-slate-800">Escanear QR</strong> en el menú superior.</li>
                <li>Apunta al código para vincular tu puesto al instante.</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Métodos Alternativos */}
        <div className="max-w-3xl mx-auto mt-6 pt-5 border-t border-slate-200">
          <div className="flex items-center justify-center mb-4">
            <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-full">
              Métodos Alternativos de Entrada
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowOtpModal(true)}
              className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all active:scale-[0.99] text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">pin</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Código de 6 Dígitos</p>
                  <p className="text-[11px] text-slate-500">Ingresar clave temporal generada</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-0.5 transition-transform text-[18px]">
                chevron_right
              </span>
            </button>

            <button
              type="button"
              onClick={() => onAuthorized()}
              className="flex items-center justify-between p-3.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs transition-all active:scale-[0.99] text-left group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">vpn_key</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">SSO Corporativo</p>
                  <p className="text-[11px] text-slate-500">Microsoft 365 / Google Workspace</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-400 group-hover:translate-x-0.5 transition-transform text-[18px]">
                chevron_right
              </span>
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500">
              ¿Problemas con el escáner o no reconoces este puesto?{' '}
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Conectando con Mesa de Ayuda TI... Anexo interno: 4892'); }}
                className="font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5"
              >
                <span>Contactar a Soporte TI (Mesa de Ayuda)</span>
                <span className="material-symbols-outlined text-[12px]">open_in_new</span>
              </a>
            </p>
          </div>
        </div>
      </main>

      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSuccess={onAuthorized}
      />
    </div>
  );
};
